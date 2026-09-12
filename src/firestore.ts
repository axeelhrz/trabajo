import { doc, getDoc, setDoc } from 'firebase/firestore'
import { buildSeed } from './storage'
import { db } from './firebase'
import type { Search } from './types'

function pipelineRef(uid: string) {
  if (!db) throw new Error('Firestore no configurado')
  return doc(db, 'users', uid, 'data', 'pipeline')
}

export async function loadPipeline(uid: string): Promise<Search[]> {
  const snap = await getDoc(pipelineRef(uid))
  if (!snap.exists()) {
    const seed = buildSeed()
    await savePipeline(uid, seed)
    return seed
  }
  const data = snap.data() as { searches?: Search[] }
  const searches = Array.isArray(data.searches) ? data.searches : []
  if (searches.length === 0) {
    const seed = buildSeed()
    await savePipeline(uid, seed)
    return seed
  }
  return searches.map((s) => ({
    ...s,
    contacts: Array.isArray(s.contacts) ? s.contacts : [],
  }))
}

export async function savePipeline(uid: string, searches: Search[]): Promise<void> {
  await setDoc(
    pipelineRef(uid),
    {
      searches,
      updatedAt: new Date().toISOString(),
    },
    { merge: true },
  )
}

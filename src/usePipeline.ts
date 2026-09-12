import { useEffect, useRef, useState } from 'react'
import { useAuth } from './auth'
import { loadPipeline, savePipeline } from './firestore'
import { buildSeed } from './storage'
import type { Search } from './types'

export function usePipeline() {
  const { user } = useAuth()
  const [searches, setSearches] = useState<Search[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [ready, setReady] = useState(false)
  const skipNextSave = useRef(true)

  useEffect(() => {
    if (!user) {
      setSearches([])
      setLoading(false)
      setReady(false)
      return
    }

    let cancelled = false
    setLoading(true)
    setError(null)
    skipNextSave.current = true

    loadPipeline(user.uid)
      .then((data) => {
        if (cancelled) return
        setSearches(data)
        setReady(true)
      })
      .catch((err: unknown) => {
        if (cancelled) return
        setError(err instanceof Error ? err.message : 'No se pudo cargar Firestore')
        setSearches(buildSeed())
        setReady(true)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [user])

  useEffect(() => {
    if (!user || !ready) return
    if (skipNextSave.current) {
      skipNextSave.current = false
      return
    }

    const timer = window.setTimeout(() => {
      setSaving(true)
      savePipeline(user.uid, searches)
        .catch((err: unknown) => {
          setError(err instanceof Error ? err.message : 'No se pudo guardar')
        })
        .finally(() => setSaving(false))
    }, 450)

    return () => window.clearTimeout(timer)
  }, [searches, user, ready])

  const resetToSeed = async () => {
    const seed = buildSeed()
    setSearches(seed)
    if (user) {
      skipNextSave.current = true
      await savePipeline(user.uid, seed)
      skipNextSave.current = false
    }
    return seed
  }

  return {
    searches,
    setSearches,
    loading,
    saving,
    error,
    resetToSeed,
  }
}

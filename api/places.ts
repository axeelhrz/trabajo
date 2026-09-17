import type { VercelRequest, VercelResponse } from '@vercel/node'
import { searchPlacesByQuery } from './_lib/places.js'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  const query = String(req.query.q || '').trim()
  if (!query) {
    res.status(400).json({ error: 'Falta el parámetro q' })
    return
  }

  try {
    const places = await searchPlacesByQuery(query)
    res.status(200).json({ places })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error al buscar lugares'
    res.status(500).json({ error: message })
  }
}

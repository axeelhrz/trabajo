import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'

function placesApiPlugin(): Plugin {
  return {
    name: 'places-api-dev',
    configureServer(server) {
      server.middlewares.use('/api/places', async (req, res, next) => {
        if (req.method !== 'GET') {
          next()
          return
        }

        try {
          const { searchPlacesByQuery } = await import('./api/_lib/places.js')
          const host = req.headers.host || 'localhost'
          const url = new URL(req.url || '/', `http://${host}`)
          const query = url.searchParams.get('q')?.trim() || ''
          if (!query) {
            res.statusCode = 400
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ error: 'Falta el parámetro q' }))
            return
          }

          const places = await searchPlacesByQuery(query)
          res.statusCode = 200
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ places }))
        } catch (error) {
          res.statusCode = 500
          res.setHeader('Content-Type', 'application/json')
          res.end(
            JSON.stringify({
              error: error instanceof Error ? error.message : 'Error al buscar lugares',
            }),
          )
        }
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), placesApiPlugin()],
})

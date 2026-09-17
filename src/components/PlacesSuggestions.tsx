import { useEffect, useState } from 'react'
import { MIN_REVIEWS, type PlaceSuggestion } from '../places'
import { emptyContact } from '../types'

interface PlacesSuggestionsProps {
  mapsQuery: string
  alreadyContacted: string[]
  onContact: (data: ReturnType<typeof emptyContact>) => void
}

export function PlacesSuggestions({
  mapsQuery,
  alreadyContacted,
  onContact,
}: PlacesSuggestionsProps) {
  const [places, setPlaces] = useState<PlaceSuggestion[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)

    fetch(`/api/places?q=${encodeURIComponent(mapsQuery)}`)
      .then(async (res) => {
        const data = (await res.json()) as { places?: PlaceSuggestion[]; error?: string }
        if (!res.ok) throw new Error(data.error || 'No se pudieron cargar empresas')
        if (!cancelled) setPlaces(data.places || [])
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setPlaces([])
          setError(err instanceof Error ? err.message : 'Error al cargar Google Places')
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [mapsQuery])

  const contactedSet = new Set(alreadyContacted.map((name) => name.trim().toLowerCase()))

  return (
    <section className="places-section">
      <div className="section-heading row">
        <h2>Empresas con muchas reseñas</h2>
        <span>{loading ? '…' : places.length}</span>
      </div>
      <p className="step-help">
        Ordenadas por cantidad de reseñas en Google (mín. {MIN_REVIEWS}). Tocá contactar para
        anotarlas.
      </p>

      {loading && (
        <div className="empty-state soft">
          <p>Buscando en Google…</p>
        </div>
      )}

      {!loading && error && (
        <div className="empty-state soft">
          <p>No se pudo cargar la lista de Google.</p>
          <p className="contact-notes">{error}</p>
          <p className="contact-notes">
            En Google Cloud activá <strong>Places API (New)</strong> para el proyecto Firebase.
          </p>
        </div>
      )}

      {!loading && !error && places.length === 0 && (
        <div className="empty-state soft">
          <p>No aparecieron empresas con {MIN_REVIEWS}+ reseñas para esta búsqueda.</p>
        </div>
      )}

      {!loading && !error && places.length > 0 && (
        <ul className="contact-list places-list">
          {places.map((place) => {
            const already = contactedSet.has(place.name.trim().toLowerCase())
            return (
              <li key={place.id} className="contact-item place-item">
                <div className="contact-main">
                  <div className="contact-top">
                    <strong>{place.name}</strong>
                    <span className="status-pill tone-info">
                      {place.reviews} reseñas
                      {place.rating != null ? ` · ${place.rating.toFixed(1)}★` : ''}
                    </span>
                  </div>
                  <p className="contact-meta">
                    {[place.address, place.phone].filter(Boolean).join(' · ') ||
                      'Sin teléfono público'}
                  </p>
                  {place.website && (
                    <p className="contact-notes">
                      Web: {place.website.replace(/^https?:\/\//, '')}
                    </p>
                  )}
                </div>
                <div className="contact-actions">
                  {place.mapsUrl && (
                    <a className="text-btn" href={place.mapsUrl} target="_blank" rel="noreferrer">
                      Ver en Maps
                    </a>
                  )}
                  <button
                    type="button"
                    className="btn-primary compact"
                    disabled={already}
                    onClick={() => {
                      onContact({
                        ...emptyContact(),
                        empresa: place.name,
                        telefono: place.phone,
                        status: 'contactado',
                        notas: [
                          `${place.reviews} reseñas`,
                          place.rating != null ? `${place.rating.toFixed(1)}★` : '',
                          place.address,
                          place.website ? `Web: ${place.website}` : '',
                          place.mapsUrl ? `Maps: ${place.mapsUrl}` : '',
                        ]
                          .filter(Boolean)
                          .join(' · '),
                      })
                    }}
                  >
                    {already ? 'Ya anotada' : 'Contactar'}
                  </button>
                </div>
              </li>
            )
          })}
        </ul>
      )}
    </section>
  )
}

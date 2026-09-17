const MIN_REVIEWS = 25

export type PlaceSuggestion = {
  id: string
  name: string
  address: string
  phone: string
  rating: number | null
  reviews: number
  mapsUrl: string
  website: string
}

const PLACES_KEY =
  process.env.GOOGLE_PLACES_API_KEY ||
  process.env.VITE_FIREBASE_API_KEY ||
  'AIzaSyCx3NHL2SoCnHqDtQh4AufxGz5kSqULUDg'

type GooglePlace = {
  id?: string
  displayName?: { text?: string }
  formattedAddress?: string
  nationalPhoneNumber?: string
  internationalPhoneNumber?: string
  rating?: number
  userRatingCount?: number
  googleMapsUri?: string
  websiteUri?: string
}

export async function searchPlacesByQuery(query: string): Promise<PlaceSuggestion[]> {
  const response = await fetch('https://places.googleapis.com/v1/places:searchText', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': PLACES_KEY,
      'X-Goog-FieldMask':
        'places.id,places.displayName,places.formattedAddress,places.nationalPhoneNumber,places.internationalPhoneNumber,places.rating,places.userRatingCount,places.googleMapsUri,places.websiteUri',
    },
    body: JSON.stringify({
      textQuery: query,
      languageCode: 'es',
      regionCode: 'UY',
      maxResultCount: 20,
    }),
  })

  if (!response.ok) {
    const detail = await response.text()
    throw new Error(`Places API ${response.status}: ${detail.slice(0, 280)}`)
  }

  const data = (await response.json()) as { places?: GooglePlace[] }
  const places = Array.isArray(data.places) ? data.places : []

  return places
    .map((place) => {
      const reviews = place.userRatingCount ?? 0
      return {
        id: place.id || `place-${reviews}-${place.displayName?.text || 'x'}`,
        name: place.displayName?.text?.trim() || 'Sin nombre',
        address: place.formattedAddress || '',
        phone: place.nationalPhoneNumber || place.internationalPhoneNumber || '',
        rating: typeof place.rating === 'number' ? place.rating : null,
        reviews,
        mapsUrl: place.googleMapsUri || '',
        website: place.websiteUri || '',
      } satisfies PlaceSuggestion
    })
    .filter((place) => place.reviews >= MIN_REVIEWS)
    .sort((a, b) => b.reviews - a.reviews || (b.rating ?? 0) - (a.rating ?? 0))
}

export { MIN_REVIEWS }

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

export const MIN_REVIEWS = 25

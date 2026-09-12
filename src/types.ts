export type ContactStatus =
  | 'contactado'
  | 'sin_respuesta'
  | 'respondieron'
  | 'rechazado'
  | 'aceptado'

export type Level = 'Alta' | 'Media' | 'Baja'

export interface Contact {
  id: string
  empresa: string
  persona: string
  telefono: string
  status: ContactStatus
  montoCobrado: number | null
  notas: string
  fecha: string
  createdAt: string
}

/** Una búsqueda de Google Maps (zona + rubro + ciudad). */
export interface Search {
  id: string
  mapsQuery: string
  rubro: string
  ciudad: string
  departamento: string
  probabilidadSinWeb: Level
  ticketUsd: number
  prioridad: Level
  notas: string
  contacts: Contact[]
  createdAt: string
  order: number
}

export interface StatusMeta {
  id: ContactStatus
  label: string
  short: string
  tone: 'info' | 'warn' | 'reply' | 'danger' | 'success'
}

export const CONTACT_STATUSES: StatusMeta[] = [
  { id: 'contactado', label: 'Contactado', short: 'Contactado', tone: 'info' },
  { id: 'sin_respuesta', label: 'Sin respuesta', short: 'Sin resp.', tone: 'warn' },
  { id: 'respondieron', label: 'Respondieron', short: 'Respondieron', tone: 'reply' },
  { id: 'rechazado', label: 'Rechazaron', short: 'Rechazaron', tone: 'danger' },
  { id: 'aceptado', label: 'Aceptaron', short: 'Aceptaron', tone: 'success' },
]

export const STATUS_MAP = Object.fromEntries(CONTACT_STATUSES.map((s) => [s.id, s])) as Record<
  ContactStatus,
  StatusMeta
>

export const LEVELS: Level[] = ['Alta', 'Media', 'Baja']

export function mapsSearchUrl(query: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`
}

export function emptyContact(): Omit<Contact, 'id' | 'createdAt'> {
  return {
    empresa: '',
    persona: '',
    telefono: '',
    status: 'contactado',
    montoCobrado: null,
    notas: '',
    fecha: new Date().toISOString().slice(0, 10),
  }
}

export function searchProgress(search: Search): {
  total: number
  aceptados: number
  pendientes: number
} {
  const total = search.contacts.length
  const aceptados = search.contacts.filter((c) => c.status === 'aceptado').length
  const pendientes = search.contacts.filter(
    (c) => c.status === 'contactado' || c.status === 'sin_respuesta' || c.status === 'respondieron',
  ).length
  return { total, aceptados, pendientes }
}

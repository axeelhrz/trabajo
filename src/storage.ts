import { SEED_LEADS } from './seedData'
import type { Search } from './types'

export function buildSeed(): Search[] {
  const now = Date.now()
  return SEED_LEADS.map((row, index) => ({
    ...row,
    id: crypto.randomUUID(),
    contacts: [],
    createdAt: new Date(now - (SEED_LEADS.length - index) * 60000).toISOString(),
    order: index,
  }))
}

export function exportCsv(searches: Search[]): string {
  const headers = [
    'Zona',
    'Rubro',
    'Ciudad',
    'Query Maps',
    'Empresa',
    'Persona',
    'Teléfono',
    'Estado',
    'Monto cobrado',
    'Fecha',
    'Notas contacto',
    'Notas búsqueda',
  ]

  const escape = (value: string | number) => {
    const text = String(value ?? '')
    if (/[",\n]/.test(text)) return `"${text.replace(/"/g, '""')}"`
    return text
  }

  const rows: string[] = []
  for (const search of [...searches].sort((a, b) => a.order - b.order)) {
    if (search.contacts.length === 0) {
      rows.push(
        [
          search.departamento,
          search.rubro,
          search.ciudad,
          search.mapsQuery,
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          search.notas,
        ]
          .map(escape)
          .join(','),
      )
      continue
    }
    for (const c of search.contacts) {
      rows.push(
        [
          search.departamento,
          search.rubro,
          search.ciudad,
          search.mapsQuery,
          c.empresa,
          c.persona,
          c.telefono,
          c.status,
          c.montoCobrado ?? '',
          c.fecha,
          c.notas,
          search.notas,
        ]
          .map(escape)
          .join(','),
      )
    }
  }

  return [headers.join(','), ...rows].join('\n')
}

import type { Level } from './types'

export type SeedRow = {
  mapsQuery: string
  rubro: string
  ciudad: string
  departamento: string
  probabilidadSinWeb: Level
  ticketUsd: number
  prioridad: Level
  notas: string
}


/** Excel completo deduplicado por query (filas 61–100 repetían 1–40). */
export const SEED_LEADS: SeedRow[] = [
  { mapsQuery: 'taller mecánico Montevideo Uruguay', rubro: 'Taller mecánico', ciudad: 'Montevideo', departamento: 'Montevideo', probabilidadSinWeb: 'Alta', ticketUsd: 450, prioridad: 'Alta', notas: 'Muchos solo tienen WhatsApp' },
  { mapsQuery: 'odontólogo Ciudad de la Costa Uruguay', rubro: 'Odontología', ciudad: 'Ciudad de la Costa', departamento: 'Canelones', probabilidadSinWeb: 'Media', ticketUsd: 800, prioridad: 'Alta', notas: 'Ticket alto, pedir turnos' },
  { mapsQuery: 'peluquería Las Piedras Uruguay', rubro: 'Peluquería', ciudad: 'Las Piedras', departamento: 'Canelones', probabilidadSinWeb: 'Alta', ticketUsd: 350, prioridad: 'Alta', notas: 'Agenda online + Instagram embed' },
  { mapsQuery: 'plomero Pando Uruguay', rubro: 'Plomería', ciudad: 'Pando', departamento: 'Canelones', probabilidadSinWeb: 'Alta', ticketUsd: 400, prioridad: 'Alta', notas: 'Leads de emergencia' },
  { mapsQuery: 'odontólogo Progreso Uruguay', rubro: 'Odontología', ciudad: 'Progreso', departamento: 'Canelones', probabilidadSinWeb: 'Media', ticketUsd: 800, prioridad: 'Alta', notas: 'Ticket alto, pedir turnos' },
  { mapsQuery: 'cerrajería Santa Lucía Uruguay', rubro: 'Cerrajería', ciudad: 'Santa Lucía', departamento: 'Canelones', probabilidadSinWeb: 'Alta', ticketUsd: 380, prioridad: 'Alta', notas: '24hs + WhatsApp' },
  { mapsQuery: 'escribanía Maldonado Uruguay', rubro: 'Escribanía', ciudad: 'Maldonado', departamento: 'Maldonado', probabilidadSinWeb: 'Media', ticketUsd: 650, prioridad: 'Media', notas: 'Confianza + formularios' },
  { mapsQuery: 'peluquería Punta del Este Uruguay', rubro: 'Peluquería', ciudad: 'Punta del Este', departamento: 'Maldonado', probabilidadSinWeb: 'Alta', ticketUsd: 350, prioridad: 'Alta', notas: 'Agenda online + Instagram embed' },
  { mapsQuery: 'panadería San Carlos Uruguay', rubro: 'Panadería', ciudad: 'San Carlos', departamento: 'Maldonado', probabilidadSinWeb: 'Alta', ticketUsd: 320, prioridad: 'Media', notas: 'Menú + pedidos' },
  { mapsQuery: 'panadería Salto Uruguay', rubro: 'Panadería', ciudad: 'Salto', departamento: 'Salto', probabilidadSinWeb: 'Alta', ticketUsd: 320, prioridad: 'Media', notas: 'Menú + pedidos' },
  { mapsQuery: 'plomero Paysandú Uruguay', rubro: 'Plomería', ciudad: 'Paysandú', departamento: 'Paysandú', probabilidadSinWeb: 'Alta', ticketUsd: 400, prioridad: 'Alta', notas: 'Leads de emergencia' },
  { mapsQuery: 'veterinaria Rivera Uruguay', rubro: 'Veterinaria', ciudad: 'Rivera', departamento: 'Rivera', probabilidadSinWeb: 'Media', ticketUsd: 550, prioridad: 'Alta', notas: 'Turnos + servicios' },
  { mapsQuery: 'constructora Tacuarembó Uruguay', rubro: 'Construcción', ciudad: 'Tacuarembó', departamento: 'Tacuarembó', probabilidadSinWeb: 'Media', ticketUsd: 900, prioridad: 'Alta', notas: 'Portfolio de obras' },
  { mapsQuery: 'taller mecánico Melo Uruguay', rubro: 'Taller mecánico', ciudad: 'Melo', departamento: 'Cerro Largo', probabilidadSinWeb: 'Alta', ticketUsd: 450, prioridad: 'Alta', notas: 'Muchos solo tienen WhatsApp' },
  { mapsQuery: 'veterinaria Durazno Uruguay', rubro: 'Veterinaria', ciudad: 'Durazno', departamento: 'Durazno', probabilidadSinWeb: 'Media', ticketUsd: 550, prioridad: 'Alta', notas: 'Turnos + servicios' },
  { mapsQuery: 'escribanía Florida Uruguay', rubro: 'Escribanía', ciudad: 'Florida', departamento: 'Florida', probabilidadSinWeb: 'Media', ticketUsd: 650, prioridad: 'Media', notas: 'Confianza + formularios' },
  { mapsQuery: 'cerrajería San José de Mayo Uruguay', rubro: 'Cerrajería', ciudad: 'San José de Mayo', departamento: 'San José', probabilidadSinWeb: 'Alta', ticketUsd: 380, prioridad: 'Alta', notas: '24hs + WhatsApp' },
  { mapsQuery: 'constructora Colonia del Sacramento Uruguay', rubro: 'Construcción', ciudad: 'Colonia del Sacramento', departamento: 'Colonia', probabilidadSinWeb: 'Media', ticketUsd: 900, prioridad: 'Alta', notas: 'Portfolio de obras' },
  { mapsQuery: 'mueblería Carmelo Uruguay', rubro: 'Mueblería', ciudad: 'Carmelo', departamento: 'Colonia', probabilidadSinWeb: 'Media', ticketUsd: 600, prioridad: 'Media', notas: 'Catálogo visual' },
  { mapsQuery: 'mueblería Nueva Helvecia Uruguay', rubro: 'Mueblería', ciudad: 'Nueva Helvecia', departamento: 'Colonia', probabilidadSinWeb: 'Media', ticketUsd: 600, prioridad: 'Media', notas: 'Catálogo visual' },
  { mapsQuery: 'taller mecánico Mercedes Uruguay', rubro: 'Taller mecánico', ciudad: 'Mercedes', departamento: 'Soriano', probabilidadSinWeb: 'Alta', ticketUsd: 450, prioridad: 'Alta', notas: 'Muchos solo tienen WhatsApp' },
  { mapsQuery: 'odontólogo Fray Bentos Uruguay', rubro: 'Odontología', ciudad: 'Fray Bentos', departamento: 'Río Negro', probabilidadSinWeb: 'Media', ticketUsd: 800, prioridad: 'Alta', notas: 'Ticket alto, pedir turnos' },
  { mapsQuery: 'peluquería Young Uruguay', rubro: 'Peluquería', ciudad: 'Young', departamento: 'Río Negro', probabilidadSinWeb: 'Alta', ticketUsd: 350, prioridad: 'Alta', notas: 'Agenda online + Instagram embed' },
  { mapsQuery: 'plomero Artigas Uruguay', rubro: 'Plomería', ciudad: 'Artigas', departamento: 'Artigas', probabilidadSinWeb: 'Alta', ticketUsd: 400, prioridad: 'Alta', notas: 'Leads de emergencia' },
  { mapsQuery: 'odontólogo Treinta y Tres Uruguay', rubro: 'Odontología', ciudad: 'Treinta y Tres', departamento: 'Treinta y Tres', probabilidadSinWeb: 'Media', ticketUsd: 800, prioridad: 'Alta', notas: 'Ticket alto, pedir turnos' },
  { mapsQuery: 'cerrajería Rocha Uruguay', rubro: 'Cerrajería', ciudad: 'Rocha', departamento: 'Rocha', probabilidadSinWeb: 'Alta', ticketUsd: 380, prioridad: 'Alta', notas: '24hs + WhatsApp' },
  { mapsQuery: 'escribanía Chuy Uruguay', rubro: 'Escribanía', ciudad: 'Chuy', departamento: 'Rocha', probabilidadSinWeb: 'Media', ticketUsd: 650, prioridad: 'Media', notas: 'Confianza + formularios' },
  { mapsQuery: 'peluquería Minas Uruguay', rubro: 'Peluquería', ciudad: 'Minas', departamento: 'Lavalleja', probabilidadSinWeb: 'Alta', ticketUsd: 350, prioridad: 'Alta', notas: 'Agenda online + Instagram embed' },
  { mapsQuery: 'panadería Trinidad Uruguay', rubro: 'Panadería', ciudad: 'Trinidad', departamento: 'Flores', probabilidadSinWeb: 'Alta', ticketUsd: 320, prioridad: 'Media', notas: 'Menú + pedidos' },
  { mapsQuery: 'panadería Dolores Uruguay', rubro: 'Panadería', ciudad: 'Dolores', departamento: 'Soriano', probabilidadSinWeb: 'Alta', ticketUsd: 320, prioridad: 'Media', notas: 'Menú + pedidos' },
  { mapsQuery: 'plomero Montevideo Uruguay', rubro: 'Plomería', ciudad: 'Montevideo', departamento: 'Montevideo', probabilidadSinWeb: 'Alta', ticketUsd: 400, prioridad: 'Alta', notas: 'Leads de emergencia' },
  { mapsQuery: 'veterinaria Ciudad de la Costa Uruguay', rubro: 'Veterinaria', ciudad: 'Ciudad de la Costa', departamento: 'Canelones', probabilidadSinWeb: 'Media', ticketUsd: 550, prioridad: 'Alta', notas: 'Turnos + servicios' },
  { mapsQuery: 'constructora Las Piedras Uruguay', rubro: 'Construcción', ciudad: 'Las Piedras', departamento: 'Canelones', probabilidadSinWeb: 'Media', ticketUsd: 900, prioridad: 'Alta', notas: 'Portfolio de obras' },
  { mapsQuery: 'taller mecánico Pando Uruguay', rubro: 'Taller mecánico', ciudad: 'Pando', departamento: 'Canelones', probabilidadSinWeb: 'Alta', ticketUsd: 450, prioridad: 'Alta', notas: 'Muchos solo tienen WhatsApp' },
  { mapsQuery: 'veterinaria Progreso Uruguay', rubro: 'Veterinaria', ciudad: 'Progreso', departamento: 'Canelones', probabilidadSinWeb: 'Media', ticketUsd: 550, prioridad: 'Alta', notas: 'Turnos + servicios' },
  { mapsQuery: 'escribanía Santa Lucía Uruguay', rubro: 'Escribanía', ciudad: 'Santa Lucía', departamento: 'Canelones', probabilidadSinWeb: 'Media', ticketUsd: 650, prioridad: 'Media', notas: 'Confianza + formularios' },
  { mapsQuery: 'cerrajería Maldonado Uruguay', rubro: 'Cerrajería', ciudad: 'Maldonado', departamento: 'Maldonado', probabilidadSinWeb: 'Alta', ticketUsd: 380, prioridad: 'Alta', notas: '24hs + WhatsApp' },
  { mapsQuery: 'constructora Punta del Este Uruguay', rubro: 'Construcción', ciudad: 'Punta del Este', departamento: 'Maldonado', probabilidadSinWeb: 'Media', ticketUsd: 900, prioridad: 'Alta', notas: 'Portfolio de obras' },
  { mapsQuery: 'mueblería San Carlos Uruguay', rubro: 'Mueblería', ciudad: 'San Carlos', departamento: 'Maldonado', probabilidadSinWeb: 'Media', ticketUsd: 600, prioridad: 'Media', notas: 'Catálogo visual' },
  { mapsQuery: 'mueblería Salto Uruguay', rubro: 'Mueblería', ciudad: 'Salto', departamento: 'Salto', probabilidadSinWeb: 'Media', ticketUsd: 600, prioridad: 'Media', notas: 'Catálogo visual' },
  { mapsQuery: 'taller mecánico Paysandú Uruguay', rubro: 'Taller mecánico', ciudad: 'Paysandú', departamento: 'Paysandú', probabilidadSinWeb: 'Alta', ticketUsd: 450, prioridad: 'Alta', notas: 'Muchos solo tienen WhatsApp' },
  { mapsQuery: 'odontólogo Rivera Uruguay', rubro: 'Odontología', ciudad: 'Rivera', departamento: 'Rivera', probabilidadSinWeb: 'Media', ticketUsd: 800, prioridad: 'Alta', notas: 'Ticket alto, pedir turnos' },
  { mapsQuery: 'peluquería Tacuarembó Uruguay', rubro: 'Peluquería', ciudad: 'Tacuarembó', departamento: 'Tacuarembó', probabilidadSinWeb: 'Alta', ticketUsd: 350, prioridad: 'Alta', notas: 'Agenda online + Instagram embed' },
  { mapsQuery: 'plomero Melo Uruguay', rubro: 'Plomería', ciudad: 'Melo', departamento: 'Cerro Largo', probabilidadSinWeb: 'Alta', ticketUsd: 400, prioridad: 'Alta', notas: 'Leads de emergencia' },
  { mapsQuery: 'odontólogo Durazno Uruguay', rubro: 'Odontología', ciudad: 'Durazno', departamento: 'Durazno', probabilidadSinWeb: 'Media', ticketUsd: 800, prioridad: 'Alta', notas: 'Ticket alto, pedir turnos' },
  { mapsQuery: 'cerrajería Florida Uruguay', rubro: 'Cerrajería', ciudad: 'Florida', departamento: 'Florida', probabilidadSinWeb: 'Alta', ticketUsd: 380, prioridad: 'Alta', notas: '24hs + WhatsApp' },
  { mapsQuery: 'escribanía San José de Mayo Uruguay', rubro: 'Escribanía', ciudad: 'San José de Mayo', departamento: 'San José', probabilidadSinWeb: 'Media', ticketUsd: 650, prioridad: 'Media', notas: 'Confianza + formularios' },
  { mapsQuery: 'peluquería Colonia del Sacramento Uruguay', rubro: 'Peluquería', ciudad: 'Colonia del Sacramento', departamento: 'Colonia', probabilidadSinWeb: 'Alta', ticketUsd: 350, prioridad: 'Alta', notas: 'Agenda online + Instagram embed' },
  { mapsQuery: 'panadería Carmelo Uruguay', rubro: 'Panadería', ciudad: 'Carmelo', departamento: 'Colonia', probabilidadSinWeb: 'Alta', ticketUsd: 320, prioridad: 'Media', notas: 'Menú + pedidos' },
  { mapsQuery: 'panadería Nueva Helvecia Uruguay', rubro: 'Panadería', ciudad: 'Nueva Helvecia', departamento: 'Colonia', probabilidadSinWeb: 'Alta', ticketUsd: 320, prioridad: 'Media', notas: 'Menú + pedidos' },
  { mapsQuery: 'plomero Mercedes Uruguay', rubro: 'Plomería', ciudad: 'Mercedes', departamento: 'Soriano', probabilidadSinWeb: 'Alta', ticketUsd: 400, prioridad: 'Alta', notas: 'Leads de emergencia' },
  { mapsQuery: 'veterinaria Fray Bentos Uruguay', rubro: 'Veterinaria', ciudad: 'Fray Bentos', departamento: 'Río Negro', probabilidadSinWeb: 'Media', ticketUsd: 550, prioridad: 'Alta', notas: 'Turnos + servicios' },
  { mapsQuery: 'constructora Young Uruguay', rubro: 'Construcción', ciudad: 'Young', departamento: 'Río Negro', probabilidadSinWeb: 'Media', ticketUsd: 900, prioridad: 'Alta', notas: 'Portfolio de obras' },
  { mapsQuery: 'taller mecánico Artigas Uruguay', rubro: 'Taller mecánico', ciudad: 'Artigas', departamento: 'Artigas', probabilidadSinWeb: 'Alta', ticketUsd: 450, prioridad: 'Alta', notas: 'Muchos solo tienen WhatsApp' },
  { mapsQuery: 'veterinaria Treinta y Tres Uruguay', rubro: 'Veterinaria', ciudad: 'Treinta y Tres', departamento: 'Treinta y Tres', probabilidadSinWeb: 'Media', ticketUsd: 550, prioridad: 'Alta', notas: 'Turnos + servicios' },
  { mapsQuery: 'escribanía Rocha Uruguay', rubro: 'Escribanía', ciudad: 'Rocha', departamento: 'Rocha', probabilidadSinWeb: 'Media', ticketUsd: 650, prioridad: 'Media', notas: 'Confianza + formularios' },
  { mapsQuery: 'cerrajería Chuy Uruguay', rubro: 'Cerrajería', ciudad: 'Chuy', departamento: 'Rocha', probabilidadSinWeb: 'Alta', ticketUsd: 380, prioridad: 'Alta', notas: '24hs + WhatsApp' },
  { mapsQuery: 'constructora Minas Uruguay', rubro: 'Construcción', ciudad: 'Minas', departamento: 'Lavalleja', probabilidadSinWeb: 'Media', ticketUsd: 900, prioridad: 'Alta', notas: 'Portfolio de obras' },
  { mapsQuery: 'mueblería Trinidad Uruguay', rubro: 'Mueblería', ciudad: 'Trinidad', departamento: 'Flores', probabilidadSinWeb: 'Media', ticketUsd: 600, prioridad: 'Media', notas: 'Catálogo visual' },
  { mapsQuery: 'mueblería Dolores Uruguay', rubro: 'Mueblería', ciudad: 'Dolores', departamento: 'Soriano', probabilidadSinWeb: 'Media', ticketUsd: 600, prioridad: 'Media', notas: 'Catálogo visual' },
]

export const ZONA_ORDER = [
  'Montevideo',
  'Canelones',
  'Maldonado',
  'Colonia',
  'Salto',
  'Paysandú',
  'Rivera',
  'Tacuarembó',
  'Cerro Largo',
  'Durazno',
  'Florida',
  'San José',
  'Soriano',
  'Río Negro',
  'Artigas',
  'Treinta y Tres',
  'Rocha',
  'Lavalleja',
  'Flores',
]

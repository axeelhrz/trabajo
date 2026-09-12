import { useMemo, useState } from 'react'
import { useAuth } from './auth'
import { LoginScreen } from './components/LoginScreen'
import { SearchWorkspace } from './components/SearchWorkspace'
import { SEED_LEADS, ZONA_ORDER } from './seedData'
import { exportCsv } from './storage'
import {
  STATUS_MAP,
  searchProgress,
  type Contact,
  type Search,
} from './types'
import { usePipeline } from './usePipeline'
import './App.css'

type Step = 'zona' | 'rubro' | 'lista' | 'detalle'

function sortZonas(zonas: string[]): string[] {
  return [...zonas].sort((a, b) => {
    const ia = ZONA_ORDER.indexOf(a)
    const ib = ZONA_ORDER.indexOf(b)
    if (ia === -1 && ib === -1) return a.localeCompare(b, 'es')
    if (ia === -1) return 1
    if (ib === -1) return -1
    return ia - ib
  })
}

function PipelineApp() {
  const { user, logout } = useAuth()
  const { searches, setSearches, loading, saving, error, resetToSeed } = usePipeline()
  const [step, setStep] = useState<Step>('zona')
  const [zona, setZona] = useState<string | null>(null)
  const [rubro, setRubro] = useState<string | null>(null)
  const [activeSearchId, setActiveSearchId] = useState<string | null>(null)

  const zonas = useMemo(
    () => sortZonas([...new Set(searches.map((s) => s.departamento))]),
    [searches],
  )

  const rubrosEnZona = useMemo(() => {
    if (!zona) return []
    return [...new Set(searches.filter((s) => s.departamento === zona).map((s) => s.rubro))].sort(
      (a, b) => a.localeCompare(b, 'es'),
    )
  }, [searches, zona])

  const searchesInView = useMemo(() => {
    if (!zona || !rubro) return []
    return searches
      .filter((s) => s.departamento === zona && s.rubro === rubro)
      .sort((a, b) => a.ciudad.localeCompare(b.ciudad, 'es'))
  }, [searches, zona, rubro])

  const activeSearch = searches.find((s) => s.id === activeSearchId) ?? null

  const totals = useMemo(() => {
    let contactos = 0
    let cobrado = 0
    for (const s of searches) {
      contactos += s.contacts.length
      for (const c of s.contacts) {
        if (c.status === 'aceptado' && c.montoCobrado != null) cobrado += c.montoCobrado
      }
    }
    return { contactos, cobrado, busquedas: searches.length }
  }, [searches])

  const zonaStats = (z: string) => {
    const list = searches.filter((s) => s.departamento === z)
    const contactos = list.reduce((n, s) => n + s.contacts.length, 0)
    return { busquedas: list.length, contactos }
  }

  const rubroStats = (r: string) => {
    if (!zona) return { busquedas: 0, contactos: 0 }
    const list = searches.filter((s) => s.departamento === zona && s.rubro === r)
    return {
      busquedas: list.length,
      contactos: list.reduce((n, s) => n + s.contacts.length, 0),
    }
  }

  const goZona = (z: string) => {
    setZona(z)
    setRubro(null)
    setActiveSearchId(null)
    setStep('rubro')
  }

  const goRubro = (r: string) => {
    setRubro(r)
    setActiveSearchId(null)
    setStep('lista')
  }

  const openSearch = (id: string) => {
    setActiveSearchId(id)
    setStep('detalle')
  }

  const addContact = (data: Omit<Contact, 'id' | 'createdAt'>) => {
    if (!activeSearchId) return
    const contact: Contact = {
      ...data,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    }
    setSearches((prev) =>
      prev.map((s) =>
        s.id === activeSearchId ? { ...s, contacts: [contact, ...s.contacts] } : s,
      ),
    )
  }

  const updateContact = (contactId: string, patch: Partial<Contact>) => {
    if (!activeSearchId) return
    setSearches((prev) =>
      prev.map((s) =>
        s.id !== activeSearchId
          ? s
          : {
              ...s,
              contacts: s.contacts.map((c) => (c.id === contactId ? { ...c, ...patch } : c)),
            },
      ),
    )
  }

  const deleteContact = (contactId: string) => {
    if (!activeSearchId) return
    setSearches((prev) =>
      prev.map((s) =>
        s.id !== activeSearchId
          ? s
          : { ...s, contacts: s.contacts.filter((c) => c.id !== contactId) },
      ),
    )
  }

  const downloadCsv = () => {
    const blob = new Blob([exportCsv(searches)], { type: 'text/csv;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'pipeline-contactos.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  if (loading) {
    return (
      <div className="auth-screen">
        <div className="auth-card">
          <p className="brand">Pipeline</p>
          <p className="auth-copy">Cargando tus datos…</p>
        </div>
      </div>
    )
  }

  return (
    <div className="app">
      <header className="hero">
        <div className="hero-copy">
          <p className="brand">Pipeline</p>
          <h1>Prospección</h1>
          <p className="lede">Zona → rubro → Maps → anotá la empresa y el resultado.</p>
        </div>
        <div className="hero-side">
          <div className="hero-stats">
            <div className="hero-stat">
              <span className="hero-stat-value">{totals.busquedas}</span>
              <span className="hero-stat-label">búsquedas</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-value">{totals.contactos}</span>
              <span className="hero-stat-label">empresas</span>
            </div>
            <div className="hero-stat accent">
              <span className="hero-stat-value">${totals.cobrado}</span>
              <span className="hero-stat-label">cobrado</span>
            </div>
          </div>
          <div className="account-row">
            <span className="account-email">{user?.email}</span>
            <span className={`sync-dot${saving ? ' saving' : ''}`}>
              {saving ? 'Guardando…' : 'Firestore'}
            </span>
            <button type="button" className="text-btn" onClick={() => logout()}>
              Salir
            </button>
          </div>
        </div>
      </header>

      {error && <p className="banner-error">{error}</p>}

      {step !== 'zona' && (
        <nav className="crumbs" aria-label="Ubicación">
          <button
            type="button"
            onClick={() => {
              setStep('zona')
              setZona(null)
              setRubro(null)
              setActiveSearchId(null)
            }}
          >
            Zonas
          </button>
          {zona && (
            <>
              <span>/</span>
              <button
                type="button"
                onClick={() => {
                  setStep('rubro')
                  setRubro(null)
                  setActiveSearchId(null)
                }}
              >
                {zona}
              </button>
            </>
          )}
          {rubro && (
            <>
              <span>/</span>
              <button
                type="button"
                onClick={() => {
                  setStep('lista')
                  setActiveSearchId(null)
                }}
              >
                {rubro}
              </button>
            </>
          )}
          {activeSearch && (
            <>
              <span>/</span>
              <span className="crumb-current">{activeSearch.ciudad}</span>
            </>
          )}
        </nav>
      )}

      {step === 'zona' && (
        <section>
          <div className="section-heading">
            <h2>Elegí una zona</h2>
          </div>
          <div className="choice-list">
            {zonas.map((z) => {
              const stats = zonaStats(z)
              return (
                <button key={z} type="button" className="choice-row" onClick={() => goZona(z)}>
                  <span className="choice-title">{z}</span>
                  <span className="choice-meta">
                    {stats.busquedas} búsquedas · {stats.contactos} empresas
                  </span>
                  <span className="choice-arrow">→</span>
                </button>
              )
            })}
          </div>
        </section>
      )}

      {step === 'rubro' && zona && (
        <section>
          <div className="section-heading">
            <h2>Rubro en {zona}</h2>
          </div>
          <div className="choice-list">
            {rubrosEnZona.map((r) => {
              const stats = rubroStats(r)
              return (
                <button key={r} type="button" className="choice-row" onClick={() => goRubro(r)}>
                  <span className="choice-title">{r}</span>
                  <span className="choice-meta">
                    {stats.busquedas} ciudades · {stats.contactos} empresas
                  </span>
                  <span className="choice-arrow">→</span>
                </button>
              )
            })}
          </div>
        </section>
      )}

      {step === 'lista' && zona && rubro && (
        <section>
          <div className="section-heading row">
            <h2>
              {rubro} · {zona}
            </h2>
            <span>{searchesInView.length}</span>
          </div>
          <p className="step-help">
            Entrá a una ciudad, abrí Maps y anotá cada empresa que contactes.
          </p>
          <div className="choice-list">
            {searchesInView.map((search: Search) => {
              const progress = searchProgress(search)
              return (
                <button
                  key={search.id}
                  type="button"
                  className="choice-row city-row"
                  onClick={() => openSearch(search.id)}
                >
                  <span className="choice-title">{search.ciudad}</span>
                  <span className="choice-meta">
                    Ticket ${search.ticketUsd}
                    {progress.total > 0
                      ? ` · ${progress.total} empresa${progress.total === 1 ? '' : 's'}`
                      : ' · sin contactos aún'}
                    {progress.aceptados > 0 ? ` · ${progress.aceptados} aceptaron` : ''}
                  </span>
                  {progress.total > 0 && (
                    <span className="contact-preview">
                      {search.contacts.slice(0, 3).map((c) => (
                        <span key={c.id} className={`mini-pill tone-${STATUS_MAP[c.status].tone}`}>
                          {c.empresa}
                        </span>
                      ))}
                    </span>
                  )}
                  <span className="choice-arrow">→</span>
                </button>
              )
            })}
          </div>
        </section>
      )}

      {step === 'detalle' && activeSearch && (
        <SearchWorkspace
          search={activeSearch}
          onBack={() => {
            setStep('lista')
            setActiveSearchId(null)
          }}
          onAddContact={addContact}
          onUpdateContact={updateContact}
          onDeleteContact={deleteContact}
        />
      )}

      {step === 'zona' && (
        <p className="footer-note">
          {SEED_LEADS.length} búsquedas · datos en Firebase ·{' '}
          <button type="button" className="text-btn" onClick={downloadCsv}>
            Exportar CSV
          </button>
          {' · '}
          <button
            type="button"
            className="text-btn"
            onClick={() => {
              if (confirm('Se pierden empresas anotadas. ¿Restaurar Excel base?')) {
                void resetToSeed().then(() => {
                  setStep('zona')
                  setZona(null)
                  setRubro(null)
                  setActiveSearchId(null)
                })
              }
            }}
          >
            Restaurar base
          </button>
        </p>
      )}
    </div>
  )
}

function App() {
  const { user, loading, configured } = useAuth()

  if (loading) {
    return (
      <div className="auth-screen">
        <div className="auth-card">
          <p className="brand">Pipeline</p>
          <p className="auth-copy">Cargando…</p>
        </div>
      </div>
    )
  }

  if (!configured || !user) return <LoginScreen />
  return <PipelineApp />
}

export default App

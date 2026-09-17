import { useMemo, useState } from 'react'
import {
  CONTACT_STATUSES,
  STATUS_MAP,
  emptyContact,
  mapsSearchUrl,
  type Contact,
  type ContactStatus,
  type Search,
} from '../types'
import { PlacesSuggestions } from './PlacesSuggestions'

interface SearchWorkspaceProps {
  search: Search
  onBack: () => void
  onAddContact: (contact: Omit<Contact, 'id' | 'createdAt'>) => void
  onUpdateContact: (contactId: string, patch: Partial<Contact>) => void
  onDeleteContact: (contactId: string) => void
}

export function SearchWorkspace({
  search,
  onBack,
  onAddContact,
  onUpdateContact,
  onDeleteContact,
}: SearchWorkspaceProps) {
  const [form, setForm] = useState(emptyContact())
  const [editingId, setEditingId] = useState<string | null>(null)

  const sorted = useMemo(
    () => [...search.contacts].sort((a, b) => b.createdAt.localeCompare(a.createdAt)),
    [search.contacts],
  )

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    const empresa = form.empresa.trim()
    if (!empresa) return

    if (editingId) {
      onUpdateContact(editingId, {
        ...form,
        empresa,
        montoCobrado: form.status === 'aceptado' ? form.montoCobrado : null,
      })
      setEditingId(null)
    } else {
      onAddContact({
        ...form,
        empresa,
        montoCobrado: form.status === 'aceptado' ? form.montoCobrado : null,
      })
    }
    setForm(emptyContact())
  }

  const startEdit = (contact: Contact) => {
    setEditingId(contact.id)
    setForm({
      empresa: contact.empresa,
      persona: contact.persona,
      telefono: contact.telefono,
      status: contact.status,
      montoCobrado: contact.montoCobrado,
      notas: contact.notas,
      fecha: contact.fecha,
    })
  }

  return (
    <div className="workspace">
      <button type="button" className="back-link" onClick={onBack}>
        ← Volver a {search.rubro}
      </button>

      <header className="workspace-head">
        <div>
          <p className="eyebrow">
            {search.departamento} · {search.rubro}
          </p>
          <h2>{search.ciudad}</h2>
          <p className="workspace-hint">{search.notas}</p>
        </div>
        <a
          className="btn-primary"
          href={mapsSearchUrl(search.mapsQuery)}
          target="_blank"
          rel="noreferrer"
        >
          Abrir Google Maps
        </a>
      </header>

      <p className="query-line">
        Query: <span>{search.mapsQuery}</span>
      </p>

      <PlacesSuggestions
        mapsQuery={search.mapsQuery}
        alreadyContacted={search.contacts.map((c) => c.empresa)}
        onContact={(data) => {
          onAddContact(data)
        }}
      />

      <section className="add-card">
        <h3>{editingId ? 'Editar empresa' : 'Anotar empresa manual'}</h3>
        <form className="contact-form" onSubmit={submit}>
          <label>
            Nombre de la empresa *
            <input
              required
              value={form.empresa}
              onChange={(e) => setForm({ ...form, empresa: e.target.value })}
              placeholder="Ej. Taller López"
            />
          </label>

          <div className="form-row">
            <label>
              Persona
              <input
                value={form.persona}
                onChange={(e) => setForm({ ...form, persona: e.target.value })}
                placeholder="Nombre"
              />
            </label>
            <label>
              Teléfono / WhatsApp
              <input
                value={form.telefono}
                onChange={(e) => setForm({ ...form, telefono: e.target.value })}
                placeholder="+598…"
              />
            </label>
          </div>

          <div className="form-row">
            <label>
              Resultado
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value as ContactStatus })}
              >
                {CONTACT_STATUSES.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.label}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Fecha
              <input
                type="date"
                value={form.fecha}
                onChange={(e) => setForm({ ...form, fecha: e.target.value })}
              />
            </label>
          </div>

          {form.status === 'aceptado' && (
            <label>
              ¿Cuánto cobraste? (USD)
              <input
                type="number"
                min={0}
                step={10}
                value={form.montoCobrado ?? search.ticketUsd}
                onChange={(e) =>
                  setForm({
                    ...form,
                    montoCobrado: Number(e.target.value) || 0,
                  })
                }
              />
            </label>
          )}

          <label>
            Notas
            <textarea
              rows={2}
              value={form.notas}
              onChange={(e) => setForm({ ...form, notas: e.target.value })}
              placeholder="Qué pedían, objeción, próximo paso…"
            />
          </label>

          <div className="form-actions">
            {editingId && (
              <button
                type="button"
                className="btn-ghost"
                onClick={() => {
                  setEditingId(null)
                  setForm(emptyContact())
                }}
              >
                Cancelar
              </button>
            )}
            <button type="submit" className="btn-primary">
              {editingId ? 'Guardar cambios' : 'Guardar en la lista'}
            </button>
          </div>
        </form>
      </section>

      <section className="contacts-section">
        <div className="section-heading row">
          <h2>Empresas que ya contactaste</h2>
          <span>{sorted.length}</span>
        </div>

        {sorted.length === 0 ? (
          <div className="empty-state soft">
            <p>Todavía no anotaste ninguna empresa.</p>
            <p>Usá la lista de reseñas de arriba o cargá una manual.</p>
          </div>
        ) : (
          <ul className="contact-list">
            {sorted.map((contact) => {
              const meta = STATUS_MAP[contact.status]
              return (
                <li key={contact.id} className="contact-item">
                  <div className="contact-main">
                    <div className="contact-top">
                      <strong>{contact.empresa}</strong>
                      <span className={`status-pill tone-${meta.tone}`}>{meta.label}</span>
                    </div>
                    <p className="contact-meta">
                      {[contact.persona, contact.telefono, contact.fecha]
                        .filter(Boolean)
                        .join(' · ') || 'Sin datos de contacto'}
                    </p>
                    {contact.notas && <p className="contact-notes">{contact.notas}</p>}
                    {contact.status === 'aceptado' && contact.montoCobrado != null && (
                      <p className="contact-money">Cobrado: ${contact.montoCobrado}</p>
                    )}
                  </div>
                  <div className="contact-actions">
                    <select
                      className="status-select"
                      value={contact.status}
                      aria-label={`Estado de ${contact.empresa}`}
                      onChange={(e) => {
                        const status = e.target.value as ContactStatus
                        onUpdateContact(contact.id, {
                          status,
                          montoCobrado:
                            status === 'aceptado'
                              ? (contact.montoCobrado ?? search.ticketUsd)
                              : null,
                        })
                      }}
                    >
                      {CONTACT_STATUSES.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.label}
                        </option>
                      ))}
                    </select>
                    <button type="button" className="text-btn" onClick={() => startEdit(contact)}>
                      Editar
                    </button>
                    <button
                      type="button"
                      className="text-btn danger"
                      onClick={() => {
                        if (confirm(`¿Borrar ${contact.empresa}?`)) onDeleteContact(contact.id)
                      }}
                    >
                      Borrar
                    </button>
                  </div>
                </li>
              )
            })}
          </ul>
        )}
      </section>
    </div>
  )
}

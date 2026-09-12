import { useState } from 'react'
import { useAuth } from '../auth'

export function LoginScreen() {
  const { login, register, configured } = useAuth()
  const [mode, setMode] = useState<'login' | 'register'>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  if (!configured) {
    return (
      <div className="auth-screen">
        <div className="auth-card">
          <p className="brand">Pipeline</p>
          <h1>Falta configurar Firebase</h1>
          <p className="auth-copy">
            Creá un archivo <code>.env</code> con las keys de Firebase (mirá{' '}
            <code>.env.example</code>) y reiniciá el servidor.
          </p>
        </div>
      </div>
    )
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setBusy(true)
    setError(null)
    try {
      if (mode === 'login') await login(email.trim(), password)
      else await register(email.trim(), password)
    } catch (err: unknown) {
      const message =
        err && typeof err === 'object' && 'code' in err
          ? String((err as { code: string }).code)
          : 'No se pudo entrar'
      setError(message)
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="auth-screen">
      <div className="auth-card">
        <p className="brand">Pipeline</p>
        <h1>{mode === 'login' ? 'Entrar' : 'Crear cuenta'}</h1>
        <p className="auth-copy">Solo vos. Los datos viven en Firebase.</p>

        <form className="auth-form" onSubmit={submit}>
          <label>
            Email
            <input
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label>
            Contraseña
            <input
              type="password"
              required
              minLength={6}
              autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          {error && <p className="auth-error">{error}</p>}
          <button type="submit" className="btn-primary" disabled={busy}>
            {busy ? 'Esperá…' : mode === 'login' ? 'Entrar' : 'Crear cuenta'}
          </button>
        </form>

        <button
          type="button"
          className="text-btn auth-switch"
          onClick={() => {
            setMode((m) => (m === 'login' ? 'register' : 'login'))
            setError(null)
          }}
        >
          {mode === 'login' ? 'Primera vez: crear cuenta' : 'Ya tengo cuenta'}
        </button>
      </div>
    </div>
  )
}

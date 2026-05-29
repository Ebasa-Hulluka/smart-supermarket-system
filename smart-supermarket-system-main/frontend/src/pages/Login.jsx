import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiLock } from 'react-icons/fi'
import { useAuth } from '../hooks/useAuth'
import Input from '../components/common/Input'
import Button from '../components/common/Button'
import storeBackground from '../assets/images/nathalia-rosa-rWMIbqmOxrY-unsplash.jpg'

export default function Login() {
  const navigate = useNavigate()
  const { user, login } = useAuth()
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (user) {
      navigate('/', { replace: true })
    }
  }, [user, navigate])

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')

    try {
      login(password)
      navigate('/', { replace: true })
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div
      className="relative min-h-screen overflow-hidden bg-slate-950 bg-cover bg-center px-4 py-8 text-white sm:px-6 lg:px-8"
      style={{ backgroundImage: `url(${storeBackground})` }}
    >
      <div className="absolute inset-0 bg-slate-950/70" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(34,197,94,0.24),transparent_32%),linear-gradient(120deg,rgba(15,23,42,0.88)_0%,rgba(15,23,42,0.5)_48%,rgba(15,23,42,0.76)_100%)]" />

      <div className="relative mx-auto grid min-h-[calc(100vh-4rem)] w-full max-w-6xl items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <section className="max-w-2xl py-8">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white/90 backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-emerald-300" />
            Staff-only access
          </div>

          <h1 className="max-w-2xl text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
            Gebeya Hub: Your Store's Command Center
          </h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-white/80 sm:text-lg">
            Track products, sales, and daily store movement from one focused dashboard built for your company team.
          </p>
        </section>

        <section className="w-full rounded-[28px] border border-white/20 bg-white/94 p-6 text-slate-950 shadow-2xl backdrop-blur-md sm:p-8 lg:ml-auto lg:max-w-md">
          <div className="mb-7 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-white">
              <FiLock className="h-5 w-5" aria-hidden="true" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-slate-950">Company login</h2>
              <p className="mt-1 text-sm text-slate-500">Enter the company password to continue.</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              label="Company password"
              type="password"
              showToggle={true}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter company password"
              autoComplete="current-password"
              required
              className="rounded-xl border-slate-300 bg-white/95 focus:border-emerald-700 focus:ring-emerald-100"
            />

            {error && <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</div>}

            <Button type="submit" className="w-full py-3">
              Enter dashboard
            </Button>
          </form>
        </section>
      </div>
    </div>
  )
}

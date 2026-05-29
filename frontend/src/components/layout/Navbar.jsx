import { useAuth } from '../../hooks/useAuth'
import Button from '../common/Button'

export default function Navbar() {
  const { user, logout } = useAuth()

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur-sm">
      <div className="flex h-[72px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 text-slate-900">
          <div>
            <p className="text-sm font-semibold">Gebeya Hub</p>
            <p className="text-xs text-slate-500">Inventory, checkout, and sales</p>
          </div>
        </div>
        <div className="flex items-center gap-3 text-slate-600">
          {user ? (
            <>
              <span className="hidden rounded-2xl border border-slate-200 bg-slate-100 px-3 py-2 text-sm sm:inline-flex">{user.name}</span>
              <Button variant="secondary" onClick={logout}>Logout</Button>
            </>
          ) : (
            <span className="rounded-2xl border border-slate-200 bg-slate-100 px-3 py-2 text-sm">Not signed in</span>
          )}
        </div>
      </div>
    </header>
  )
}

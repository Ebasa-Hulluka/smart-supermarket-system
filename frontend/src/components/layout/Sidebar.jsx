import { NavLink } from 'react-router-dom'
import { FiHome, FiPackage, FiPlusCircle, FiShoppingCart } from 'react-icons/fi'

const links = [
  { to: '/', label: 'Dashboard', icon: FiHome },
  { to: '/products', label: 'Products', icon: FiPackage },
  { to: '/sales', label: 'Sales', icon: FiShoppingCart },
  { to: '/sales/create', label: 'Checkout', icon: FiPlusCircle },
]

export default function Sidebar() {
  return (
    <>
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-72 overflow-hidden border-r border-slate-200 bg-white px-4 py-6 lg:flex lg:flex-col">
        <div className="mb-8 px-2">
          <p className="text-lg font-semibold text-slate-950">Gebeya Hub</p>
          <p className="mt-1 text-xs font-medium uppercase tracking-[0.2em] text-slate-400">Supermarket POS</p>
        </div>
        <nav className="space-y-2">
          {links.map(({ to, label, icon: Icon }) => (
            <NavItem key={to} to={to} label={label} icon={Icon} />
          ))}
        </nav>
        <div className="mt-auto rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
          <p className="font-semibold text-slate-900">Daily operations</p>
          <p className="mt-1">Track inventory, checkout sales, and restock low items.</p>
        </div>
      </aside>

      <nav className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-4 border-t border-slate-200 bg-white/95 px-2 py-2 shadow-lg backdrop-blur lg:hidden">
        {links.map(({ to, label, icon: Icon }) => (
          <NavItem key={to} to={to} label={label} icon={Icon} compact />
        ))}
      </nav>
    </>
  )
}

function NavItem({ to, label, icon: Icon, compact = false }) {
  return (
    <NavLink
      to={to}
      end={to === '/'}
      className={({ isActive }) =>
        compact
          ? `flex min-w-0 flex-col items-center justify-center gap-1 rounded-xl px-2 py-2 text-xs font-medium transition ${
              isActive ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
            }`
          : `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
              isActive ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-700 hover:bg-slate-100'
            }`
      }
    >
      <Icon className="h-5 w-5 shrink-0" />
      <span className={compact ? 'truncate text-[11px]' : ''}>{label}</span>
    </NavLink>
  )
}

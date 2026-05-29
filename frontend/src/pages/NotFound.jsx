import { Link } from 'react-router-dom'
import Button from '../components/common/Button'

export default function NotFound() {
  return (
    <div className="mx-auto max-w-2xl rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
      <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-400">404 • Page not found</p>
      <h1 className="mt-4 text-4xl font-semibold text-slate-900">We can’t find that page.</h1>
      <p className="mt-4 text-sm text-slate-500">The page you are looking for does not exist or has been moved.</p>
      <Link to="/">
        <Button className="mt-8" variant="secondary">Return home</Button>
      </Link>
    </div>
  )
}

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <div className="mx-auto flex min-h-screen max-w-6xl items-center justify-center p-6">
        {children}
      </div>
    </div>
  )
}

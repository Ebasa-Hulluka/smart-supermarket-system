export default function StatCard({ label, value, description, icon: Icon, tone = 'slate' }) {
  const toneClasses = {
    slate: 'bg-slate-100 text-slate-700',
    blue: 'bg-blue-50 text-blue-700',
    emerald: 'bg-emerald-50 text-emerald-700',
    amber: 'bg-amber-50 text-amber-700',
    rose: 'bg-rose-50 text-rose-700',
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500">{label}</p>
          <p className="mt-3 text-2xl font-semibold text-slate-950">{value}</p>
        </div>
        {Icon && (
          <span className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${toneClasses[tone] || toneClasses.slate}`}>
            <Icon className="h-5 w-5" />
          </span>
        )}
      </div>
      {description && <p className="mt-3 text-sm text-slate-500">{description}</p>}
    </div>
  )
}

export default function Table({ children }) {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <table className="min-w-full divide-y divide-slate-200 text-left text-sm text-slate-700">
        {children}
      </table>
    </div>
  )
}

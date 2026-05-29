import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSales } from '../hooks/useSales'
import SaleTable from '../components/sales/SaleTable'
import Loader from '../components/common/Loader'
import Button from '../components/common/Button'
import { saleService } from '../services/saleService'

export default function Sales() {
  const { sales, loading, error, refreshSales } = useSales()
  const [saving, setSaving] = useState(false)
  const [actionError, setActionError] = useState('')

  const handleDelete = async (id) => {
    const confirmed = window.confirm('Delete this sale and return the items to stock?')
    if (!confirmed) return

    try {
      setSaving(true)
      setActionError('')
      await saleService.deleteSale(id)
      await refreshSales()
    } catch (err) {
      setActionError(err.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold text-slate-900">Sales</h1>
          <p className="mt-2 text-sm text-slate-500">Review recorded sales and create new invoices.</p>
        </div>
        <Link to="/sales/create">
          <Button variant="primary">Create sale</Button>
        </Link>
      </header>

      {loading ? <Loader /> : error ? (
        <div className="rounded-2xl border border-rose-100 bg-rose-50 p-6 text-rose-700">{error}</div>
      ) : (
        <>
          {actionError && <div className="rounded-2xl border border-rose-100 bg-rose-50 p-4 text-sm text-rose-700">{actionError}</div>}
          <SaleTable sales={sales} onDelete={handleDelete} saving={saving} />
        </>
      )}
    </div>
  )
}

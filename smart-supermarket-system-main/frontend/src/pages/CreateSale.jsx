import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SaleForm from '../components/sales/SaleForm'
import Loader from '../components/common/Loader'
import { useProducts } from '../hooks/useProducts'
import { saleService } from '../services/saleService'

export default function CreateSale() {
  const navigate = useNavigate()
  const { products, loading, error } = useProducts()
  const [saving, setSaving] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const handleSubmit = async (sale) => {
    try {
      setSaving(true)
      setSubmitError('')
      await saleService.createSale(sale)
      navigate('/sales')
    } catch (err) {
      setSubmitError(err.message)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <Loader />
  }

  if (error) {
    return <div className="rounded-2xl border border-rose-100 bg-rose-50 p-6 text-rose-700">{error}</div>
  }

  return (
    <div className="space-y-6">
      <header className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-xl font-semibold text-slate-900">Checkout</h1>
        <p className="mt-2 text-sm text-slate-500">Record a sale from available inventory and reduce stock automatically.</p>
      </header>
      {submitError && <div className="rounded-2xl border border-rose-100 bg-rose-50 p-4 text-sm text-rose-700">{submitError}</div>}
      <SaleForm products={products} onSubmit={handleSubmit} submitLabel={saving ? 'Recording...' : 'Record sale'} />
    </div>
  )
}

import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useProducts } from '../hooks/useProducts'
import { productService } from '../services/productService'
import ProductTable from '../components/products/ProductTable'
import Loader from '../components/common/Loader'
import Button from '../components/common/Button'

export default function Products() {
  const { products, loading, error, refreshProducts } = useProducts()
  const [saving, setSaving] = useState(false)

  const handleDelete = async (id) => {
    const confirmed = window.confirm('Delete this product?')
    if (!confirmed) return

    try {
      setSaving(true)
      await productService.deleteProduct(id)
      await refreshProducts()
    } catch (err) {
      window.alert(err.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-3 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold text-slate-900">Products</h1>
          <p className="mt-2 text-sm text-slate-500">Manage inventory and update product details.</p>
        </div>
        <Link to="/products/add">
          <Button variant="primary">Add product</Button>
        </Link>
      </header>

      {loading ? (
        <Loader />
      ) : error ? (
        <div className="rounded-3xl border border-rose-100 bg-rose-50 p-6 text-rose-700">{error}</div>
      ) : (
        <ProductTable products={products} onDelete={handleDelete} />
      )}

      {saving && <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">Working...</div>}
    </div>
  )
}

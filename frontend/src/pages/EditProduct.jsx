import { useParams, useNavigate } from 'react-router-dom'
import { useProducts } from '../hooks/useProducts'
import ProductForm from '../components/products/ProductForm'
import { productService } from '../services/productService'
import Loader from '../components/common/Loader'

export default function EditProduct() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { products, loading, error } = useProducts()

  const product = products.find((item) => item._id === id)

  const handleSubmit = async (update) => {
    await productService.updateProduct(id, update)
    navigate('/products')
  }

  if (loading) {
    return <Loader />
  }

  if (error) {
    return <div className="rounded-3xl border border-rose-100 bg-rose-50 p-6 text-rose-700">{error}</div>
  }

  if (!product) {
    return <div className="rounded-3xl border border-slate-200 bg-white p-6 text-slate-700">Product not found.</div>
  }

  return (
    <div className="space-y-6">
      <header className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-xl font-semibold text-slate-900">Edit product</h1>
        <p className="mt-2 text-sm text-slate-500">Update product details before saving.</p>
      </header>
      <ProductForm initialData={product} onSubmit={handleSubmit} submitLabel="Save changes" />
    </div>
  )
}

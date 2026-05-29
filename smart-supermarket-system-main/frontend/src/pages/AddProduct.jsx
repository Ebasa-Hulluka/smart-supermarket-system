import { useNavigate } from 'react-router-dom'
import ProductForm from '../components/products/ProductForm'
import { productService } from '../services/productService'

export default function AddProduct() {
  const navigate = useNavigate()

  const handleSubmit = async (product) => {
    await productService.createProduct(product)
    navigate('/products')
  }

  return (
    <div className="space-y-6">
      <header className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-xl font-semibold text-slate-900">Add new product</h1>
        <p className="mt-2 text-sm text-slate-500">Create a product entry for your inventory.</p>
      </header>
      <ProductForm onSubmit={handleSubmit} submitLabel="Create product" />
    </div>
  )
}

import { useState } from 'react'
import Input from '../common/Input'
import Button from '../common/Button'
import { PRODUCT_CATEGORIES } from '../../constants'

export default function ProductForm({ initialData = {}, onSubmit, submitLabel = 'Save Product' }) {
  const [name, setName] = useState(initialData.name || '')
  const [price, setPrice] = useState(initialData.price ?? '')
  const [quantity, setQuantity] = useState(initialData.quantity ?? '')
  const [category, setCategory] = useState(initialData.category || PRODUCT_CATEGORIES[0])

  const handleSubmit = (event) => {
    event.preventDefault()
    onSubmit({
      name: name.trim(),
      price: Number(price),
      quantity: Number(quantity),
      category,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-900">Product details</h2>
      <Input label="Name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Product name" required />
      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          label="Price"
          type="number"
          min="0"
          step="0.01"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="0.00"
          required
        />
        <Input
          label="Quantity"
          type="number"
          min="0"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          placeholder="0"
          required
        />
      </div>
      <label className="block text-sm font-medium text-slate-700">
        Category
        <select
          className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {PRODUCT_CATEGORIES.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </label>
      <Button type="submit" variant="primary">
        {submitLabel}
      </Button>
    </form>
  )
}

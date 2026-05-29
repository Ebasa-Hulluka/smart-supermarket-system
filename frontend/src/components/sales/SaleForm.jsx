import { useMemo, useState } from 'react'
import { FiPlus, FiTrash2, FiX } from 'react-icons/fi'
import Input from '../common/Input'
import Button from '../common/Button'
import { calculateTotal } from '../../utils/calculateTotal'
import { currencyFormatter } from '../../utils/currencyFormatter'

export default function SaleForm({ products = [], onSubmit, submitLabel = 'Create Sale' }) {
  const [selectedProductId, setSelectedProductId] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [items, setItems] = useState([])
  const [formMessage, setFormMessage] = useState('')

  const defaultProductId = useMemo(() => {
    if (products.length === 0) return ''
    const firstAvailableProduct = products.find((product) => Number(product.quantity || 0) > 0)
    return firstAvailableProduct?._id || products[0]._id
  }, [products])
  const activeProductId = selectedProductId || defaultProductId

  const selectedProduct = useMemo(
    () => products.find((product) => product._id === activeProductId),
    [products, activeProductId],
  )
  const total = calculateTotal(items)
  const availableStock = Number(selectedProduct?.quantity || 0)
  const selectedCartQuantity = items.find((item) => item.productId === selectedProduct?._id)?.quantity || 0
  const remainingStock = Math.max(availableStock - selectedCartQuantity, 0)

  const handleAddItem = () => {
    setFormMessage('')

    if (!selectedProduct) {
      setFormMessage('Select a product first.')
      return
    }

    const nextQuantity = Number(quantity)

    if (nextQuantity < 1) {
      setFormMessage('Quantity must be at least 1.')
      return
    }

    if (nextQuantity > remainingStock) {
      setFormMessage(`${selectedProduct.name} has only ${remainingStock} unit(s) available for this cart.`)
      return
    }

    setItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.productId === selectedProduct._id)

      if (existingItem) {
        return currentItems.map((item) =>
          item.productId === selectedProduct._id
            ? { ...item, quantity: item.quantity + nextQuantity }
            : item,
        )
      }

      return [
        ...currentItems,
        {
          productId: selectedProduct._id,
          name: selectedProduct.name,
          quantity: nextQuantity,
          price: Number(selectedProduct.price || 0),
        },
      ]
    })
    setQuantity(1)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (items.length === 0) {
      setFormMessage('Add at least one item before recording the sale.')
      return
    }

    onSubmit({
      items,
      totalPrice: total,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-6 xl:grid-cols-[1fr_360px]">
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Checkout cart</h2>
            <p className="mt-1 text-sm text-slate-500">Select products from stock and add them to the sale.</p>
          </div>
          <Button type="button" variant="secondary" onClick={() => setItems([])} disabled={items.length === 0}>
            <span className="inline-flex items-center gap-2">
              <FiX className="h-4 w-4" />
              Clear
            </span>
          </Button>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_140px_auto] lg:items-end">
          <label className="block text-sm font-medium text-slate-700">
            Product
            <select
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
              value={activeProductId}
              onChange={(e) => {
                setSelectedProductId(e.target.value)
                setQuantity(1)
                setFormMessage('')
              }}
              required
            >
              <option value="" disabled>Select product</option>
              {products.map((product) => (
                <option key={product._id} value={product._id} disabled={Number(product.quantity || 0) < 1}>
                  {product.name} - {currencyFormatter(product.price)} - {product.quantity} in stock
                </option>
              ))}
            </select>
          </label>
          <Input
            label="Quantity"
            type="number"
            min="1"
            max={remainingStock || 1}
            value={quantity}
            onChange={(e) => {
              setQuantity(e.target.value)
              setFormMessage('')
            }}
            required
          />
          <Button type="button" variant="secondary" onClick={handleAddItem} disabled={!selectedProduct || remainingStock < 1}>
            <span className="inline-flex items-center gap-2">
              <FiPlus className="h-4 w-4" />
              Add
            </span>
          </Button>
        </div>

        {formMessage && <div className="mt-4 rounded-2xl border border-amber-100 bg-amber-50 p-3 text-sm text-amber-800">{formMessage}</div>}

        <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200">
          <div className="hidden grid-cols-[1fr_100px_120px_48px] bg-slate-50 px-4 py-3 text-sm font-medium text-slate-500 sm:grid">
            <span>Item</span>
            <span>Qty</span>
            <span>Total</span>
            <span></span>
          </div>
          <div className="divide-y divide-slate-200 bg-white">
            {items.map((item) => (
              <div key={item.productId} className="grid gap-3 px-4 py-4 sm:grid-cols-[1fr_100px_120px_48px] sm:items-center">
                <div>
                  <p className="font-medium text-slate-950">{item.name}</p>
                  <p className="text-sm text-slate-500">{currencyFormatter(item.price)} each</p>
                </div>
                <p className="text-sm text-slate-700">{item.quantity}</p>
                <p className="font-semibold text-slate-950">{currencyFormatter(item.quantity * item.price)}</p>
                <button
                  type="button"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl text-rose-600 hover:bg-rose-50"
                  onClick={() => setItems((currentItems) => currentItems.filter((currentItem) => currentItem.productId !== item.productId))}
                  aria-label={`Remove ${item.name}`}
                >
                  <FiTrash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
            {items.length === 0 && <p className="px-4 py-8 text-center text-sm text-slate-500">No items in the cart yet.</p>}
          </div>
        </div>
      </section>

      <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">Sale summary</h2>
        <div className="mt-6 space-y-4">
          <div className="flex items-center justify-between text-sm text-slate-600">
            <span>Items</span>
            <span>{items.reduce((sum, item) => sum + item.quantity, 0)}</span>
          </div>
          <div className="flex items-center justify-between border-t border-slate-200 pt-4">
            <span className="font-medium text-slate-700">Total</span>
            <span className="text-2xl font-semibold text-slate-950">{currencyFormatter(total)}</span>
          </div>
          <Button type="submit" className="w-full" disabled={items.length === 0}>
            {submitLabel}
          </Button>
        </div>
      </aside>
    </form>
  )
}

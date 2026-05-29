import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { FiAlertCircle, FiBox, FiDollarSign, FiLayers, FiPlus, FiShoppingCart } from 'react-icons/fi'
import { useProducts } from '../hooks/useProducts'
import { useSales } from '../hooks/useSales'
import Button from '../components/common/Button'
import Loader from '../components/common/Loader'
import StatCard from '../components/common/StatCard'
import { currencyFormatter } from '../utils/currencyFormatter'
import { dateFormatter } from '../utils/dateFormatter'
import { LOW_STOCK_LIMIT } from '../constants'

export default function Dashboard() {
  const { products, loading: productsLoading, error: productsError } = useProducts()
  const { sales, loading: salesLoading, error: salesError } = useSales()

  const totalSales = sales.length
  const totalProducts = products.length
  const totalRevenue = useMemo(
    () => sales.reduce((sum, sale) => sum + Number(sale.totalPrice || 0), 0),
    [sales],
  )
  const unitsInStock = useMemo(
    () => products.reduce((sum, product) => sum + Number(product.quantity || 0), 0),
    [products],
  )
  const inventoryValue = useMemo(
    () => products.reduce((sum, product) => sum + Number(product.price || 0) * Number(product.quantity || 0), 0),
    [products],
  )
  const lowStockItems = useMemo(
    () => products.filter((product) => Number(product.quantity || 0) <= LOW_STOCK_LIMIT),
    [products],
  )
  const recentProducts = useMemo(() => products.slice(0, 5), [products])
  const recentSales = useMemo(() => sales.slice(0, 5), [sales])
  const topCategory = useMemo(() => {
    const categoryCounts = products.reduce((counts, product) => {
      const category = product.category || 'Uncategorized'
      counts[category] = (counts[category] || 0) + 1
      return counts
    }, {})
    const topEntry = Object.entries(categoryCounts).sort((a, b) => b[1] - a[1])[0]
    return topEntry ? topEntry[0] : 'No category'
  }, [products])

  if (productsLoading || salesLoading) {
    return <Loader />
  }

  if (productsError || salesError) {
    return (
      <div className="rounded-2xl border border-rose-100 bg-rose-50 p-6 text-sm text-rose-700">
        {productsError || salesError}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <header className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">Business overview</p>
            <h1 className="mt-2 text-2xl font-semibold text-slate-950">Dashboard</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
              Track sales, inventory value, and stock risks from one clean operational view.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link to="/sales/create">
              <Button variant="primary">
                <span className="inline-flex items-center gap-2">
                  <FiPlus className="h-4 w-4" />
                  New sale
                </span>
              </Button>
            </Link>
            <Link to="/products/add">
              <Button variant="secondary">
                <span className="inline-flex items-center gap-2">
                  <FiBox className="h-4 w-4" />
                  Add product
                </span>
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Total revenue"
          value={currencyFormatter(totalRevenue)}
          description={`${totalSales} sales recorded`}
          icon={FiDollarSign}
          tone="emerald"
        />
        <StatCard
          label="Products"
          value={totalProducts}
          description={`${unitsInStock} units in stock`}
          icon={FiBox}
          tone="blue"
        />
        <StatCard
          label="Inventory value"
          value={currencyFormatter(inventoryValue)}
          description={`Top category: ${topCategory}`}
          icon={FiLayers}
          tone="slate"
        />
        <StatCard
          label="Low stock"
          value={lowStockItems.length}
          description={`Products with ${LOW_STOCK_LIMIT} or fewer units`}
          icon={FiAlertCircle}
          tone={lowStockItems.length ? 'amber' : 'emerald'}
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
        <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center justify-between gap-4 border-b border-slate-200 px-6 py-5">
            <div>
              <h2 className="text-base font-semibold text-slate-950">Recent sales</h2>
              <p className="mt-1 text-sm text-slate-500">Latest transactions and totals.</p>
            </div>
            <FiShoppingCart className="h-5 w-5 text-slate-400" />
          </div>
          <div className="divide-y divide-slate-100">
            {recentSales.map((sale) => (
              <div key={sale._id} className="grid gap-3 px-6 py-4 sm:grid-cols-[1fr_auto_auto] sm:items-center">
                <div>
                  <p className="font-medium text-slate-900">{dateFormatter(sale.createdAt)}</p>
                  <p className="text-sm text-slate-500">{sale.items?.length || 0} item(s)</p>
                </div>
                <p className="text-sm text-slate-500">Sale</p>
                <p className="font-semibold text-slate-950">{currencyFormatter(sale.totalPrice)}</p>
              </div>
            ))}
            {recentSales.length === 0 && <EmptyState message="No sales recorded yet." />}
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-6 py-5">
            <h2 className="text-base font-semibold text-slate-950">Stock attention</h2>
            <p className="mt-1 text-sm text-slate-500">Items that need restocking soon.</p>
          </div>
          <div className="space-y-3 p-6">
            {lowStockItems.slice(0, 5).map((product) => (
              <div key={product._id} className="rounded-xl border border-amber-100 bg-amber-50 p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-medium text-slate-950">{product.name}</p>
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-amber-700">
                    {product.quantity} left
                  </span>
                </div>
                <p className="mt-1 text-sm text-slate-600">{product.category || 'Uncategorized'}</p>
              </div>
            ))}
            {lowStockItems.length === 0 && <EmptyState message="Stock levels look healthy." />}
          </div>
        </section>
      </div>

      <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center justify-between gap-4 border-b border-slate-200 px-6 py-5">
          <div>
            <h2 className="text-base font-semibold text-slate-950">Recent products</h2>
            <p className="mt-1 text-sm text-slate-500">Newest inventory entries in the system.</p>
          </div>
          <Link to="/products" className="text-sm font-medium text-slate-700 hover:text-slate-950">
            View all
          </Link>
        </div>
        <div className="grid gap-4 p-6 md:grid-cols-2 xl:grid-cols-5">
          {recentProducts.map((product) => (
            <div key={product._id} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="truncate font-medium text-slate-950">{product.name}</p>
              <p className="mt-1 text-sm text-slate-500">{product.category || 'Uncategorized'}</p>
              <div className="mt-4 flex items-center justify-between gap-3 text-sm">
                <span className="text-slate-500">Stock</span>
                <span className="font-semibold text-slate-900">{product.quantity}</span>
              </div>
              <div className="mt-2 flex items-center justify-between gap-3 text-sm">
                <span className="text-slate-500">Price</span>
                <span className="font-semibold text-slate-900">{currencyFormatter(product.price)}</span>
              </div>
            </div>
          ))}
          {recentProducts.length === 0 && <EmptyState message="No products found." />}
        </div>
      </section>
    </div>
  )
}

function EmptyState({ message }) {
  return <p className="px-6 py-5 text-sm text-slate-500">{message}</p>
}

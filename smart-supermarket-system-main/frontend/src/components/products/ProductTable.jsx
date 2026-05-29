import { Link } from 'react-router-dom'
import { currencyFormatter } from '../../utils/currencyFormatter'
import Button from '../common/Button'

export default function ProductTable({ products = [], onDelete }) {
  return (
    <div className="space-y-4">
      <TableWrapper>
        <thead className="bg-slate-50 text-slate-500">
          <tr>
            <th className="px-6 py-4">Name</th>
            <th className="px-6 py-4">Price</th>
            <th className="px-6 py-4">Quantity</th>
            <th className="px-6 py-4">Category</th>
            <th className="px-6 py-4">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 bg-white">
          {products.map((product) => (
            <tr key={product._id}>
              <td className="px-6 py-4 text-slate-900">{product.name}</td>
              <td className="px-6 py-4 text-slate-700">{currencyFormatter(product.price)}</td>
              <td className="px-6 py-4 text-slate-700">{product.quantity}</td>
              <td className="px-6 py-4 text-slate-700">{product.category}</td>
              <td className="px-6 py-4 space-x-2">
                <Link to={`/products/edit/${product._id}`}>
                  <Button variant="secondary">Edit</Button>
                </Link>
                <Button variant="danger" onClick={() => onDelete(product._id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </TableWrapper>
      {products.length === 0 && <div className="rounded-3xl border border-slate-200 bg-white p-6 text-slate-600">No products available yet.</div>}
    </div>
  )
}

function TableWrapper({ children }) {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <table className="min-w-full text-left text-sm text-slate-700">{children}</table>
    </div>
  )
}

import { dateFormatter } from '../../utils/dateFormatter'
import { currencyFormatter } from '../../utils/currencyFormatter'
import Button from '../common/Button'

export default function SaleTable({ sales = [], onDelete, saving = false }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
      <table className="min-w-full text-left text-sm text-slate-700">
        <thead className="bg-slate-50 text-slate-500">
          <tr>
            <th className="px-6 py-4">Date</th>
            <th className="px-6 py-4">Products</th>
            <th className="px-6 py-4">Items</th>
            <th className="px-6 py-4">Total</th>
            <th className="px-6 py-4">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 bg-white">
          {sales.map((sale) => (
            <tr key={sale._id}>
              <td className="px-6 py-4">{dateFormatter(sale.createdAt)}</td>
              <td className="px-6 py-4 text-slate-900">
                {sale.items?.map((item) => item.name).join(', ') || '-'}
              </td>
              <td className="px-6 py-4">{sale.items?.reduce((sum, item) => sum + Number(item.quantity || 0), 0) || 0}</td>
              <td className="px-6 py-4 font-semibold text-slate-950">{currencyFormatter(sale.totalPrice)}</td>
              <td className="px-6 py-4">
                <Button variant="danger" onClick={() => onDelete?.(sale._id)} disabled={saving}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {sales.length === 0 && <div className="p-6 text-center text-slate-600">No sales recorded yet.</div>}
    </div>
  )
}

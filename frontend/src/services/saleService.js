import { api } from './api'

export const saleService = {
  getSales: () => api.get('/sales'),
  createSale: (sale) => api.post('/sales', sale),
  deleteSale: (id) => api.delete(`/sales/${id}`),
}

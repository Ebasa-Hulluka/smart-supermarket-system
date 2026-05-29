import { api } from './api'

export const productService = {
  getProducts: () => api.get('/products'),
  createProduct: (product) => api.post('/products', product),
  updateProduct: (id, product) => api.put(`/products/${id}`, product),
  deleteProduct: (id) => api.delete(`/products/${id}`),
}

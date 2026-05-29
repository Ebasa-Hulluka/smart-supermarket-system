import { useCallback, useEffect, useState } from 'react'
import { productService } from '../services/productService'

export function useProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true)
      setError('')
      const data = await productService.getProducts()
      setProducts(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    const timeoutId = window.setTimeout(fetchProducts, 0)
    return () => window.clearTimeout(timeoutId)
  }, [fetchProducts])

  return { products, loading, error, refreshProducts: fetchProducts }
}

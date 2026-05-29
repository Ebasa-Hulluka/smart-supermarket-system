import { useCallback, useEffect, useState } from 'react'
import { saleService } from '../services/saleService'

export function useSales() {
  const [sales, setSales] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchSales = useCallback(async () => {
    try {
      setLoading(true)
      setError('')
      const data = await saleService.getSales()
      setSales(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    const timeoutId = window.setTimeout(fetchSales, 0)
    return () => window.clearTimeout(timeoutId)
  }, [fetchSales])

  return { sales, loading, error, refreshSales: fetchSales }
}

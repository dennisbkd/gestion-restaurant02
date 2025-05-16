import { useEffect, useState } from 'react'

export function useFetchData(fetchFunction, dataExtractor = res => res.data) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [refreshTrigger, setRefreshTrigger] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const res = await fetchFunction()
        const extractedData = dataExtractor(res)
        setData(extractedData)
        setError(null)
      } catch (err) {
        console.error('Error al obtener datos:', err)
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [fetchFunction, dataExtractor, refreshTrigger])

  const refresh = () => setRefreshTrigger(prev => !prev)

  return { data, loading, error, refresh }
}

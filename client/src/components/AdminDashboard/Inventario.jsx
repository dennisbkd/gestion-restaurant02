import { useState, useMemo } from 'react'
import { useFetchData } from '../../hooks/useFetchData'
import { getInventarioRequest } from '../../api/inventario'
import {
  ChevronUpIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
  ExclamationTriangleIcon,
  CubeIcon,
  ArrowTrendingDownIcon
} from '@heroicons/react/24/outline'

const extractInventario = (res) => res.data.stock

export default function Inventario() {
  const { data } = useFetchData(getInventarioRequest, extractInventario)

  const [searchTerm, setSearchTerm] = useState('')
  const [sortConfig, setSortConfig] = useState({
    key: 'id',
    direction: 'ascending'
  })

  // Función para manejar el ordenamiento
  const requestSort = (key) => {
    let direction = 'ascending'
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending'
    }
    setSortConfig({ key, direction })
  }

  // Datos filtrados y ordenados
  const filteredAndSortedData = useMemo(() => {
    let filteredItems = [...data]

    // Filtrar por término de búsqueda
    if (searchTerm) {
      filteredItems = filteredItems.filter((item) =>
        item.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Ordenar los datos
    if (sortConfig.key) {
      filteredItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1
        }
        return 0
      })
    }

    return filteredItems
  }, [data, searchTerm, sortConfig])

  // Calcular estadísticas
  const stats = useMemo(() => {
    if (!data.length) return { total: 0, lowStock: 0, criticalStock: 0 }

    const lowStock = data.filter(
      (item) =>
        item.stockActual <= item.stockMinimo * 2 &&
        item.stockActual > item.stockMinimo
    ).length

    const criticalStock = data.filter(
      (item) => item.stockActual <= item.stockMinimo
    ).length

    return {
      total: data.length,
      lowStock,
      criticalStock
    }
  }, [data])

  // Renderizar el ícono de ordenamiento
  const renderSortIcon = (key) => {
    if (sortConfig.key !== key) return null
    return sortConfig.direction === 'ascending' ? (
      <ChevronUpIcon className='inline w-4 h-4' />
    ) : (
      <ChevronDownIcon className='inline w-4 h-4' />
    )
  }

  if (!data.length) {
    return (
      <div className='flex justify-center items-center h-64'>
        <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600'></div>
      </div>
    )
  }

  return (
    <div className='bg-white rounded-lg shadow-lg p-6'>
      <h2 className='text-2xl font-bold text-gray-800 mb-6'>
        Gestión de Inventario
      </h2>

      {/* Estadísticas */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-6'>
        <div className='bg-gray-50 p-4 rounded-lg border border-gray-200'>
          <div className='flex items-center'>
            <div className='p-3 rounded-full bg-blue-100 text-blue-600 mr-4'>
              <CubeIcon className='h-6 w-6' />
            </div>
            <div>
              <p className='text-sm text-gray-500'>Total de Productos</p>
              <p className='text-xl font-bold'>{stats.total}</p>
            </div>
          </div>
        </div>

        <div className='bg-gray-50 p-4 rounded-lg border border-gray-200'>
          <div className='flex items-center'>
            <div className='p-3 rounded-full bg-yellow-100 text-yellow-600 mr-4'>
              <ArrowTrendingDownIcon className='h-6 w-6' />
            </div>
            <div>
              <p className='text-sm text-gray-500'>Stock Bajo</p>
              <p className='text-xl font-bold'>{stats.lowStock}</p>
            </div>
          </div>
        </div>

        <div className='bg-gray-50 p-4 rounded-lg border border-gray-200'>
          <div className='flex items-center'>
            <div className='p-3 rounded-full bg-red-100 text-red-600 mr-4'>
              <ExclamationTriangleIcon className='h-6 w-6' />
            </div>
            <div>
              <p className='text-sm text-gray-500'>Stock Crítico</p>
              <p className='text-xl font-bold'>{stats.criticalStock}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Barra de búsqueda */}
      <div className='mb-6'>
        <div className='relative'>
          <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
            <MagnifyingGlassIcon className='h-5 w-5 text-gray-400' />
          </div>
          <input
            type='text'
            className='block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 sm:text-sm'
            placeholder='Buscar producto...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Tabla de inventario */}
      <div className='overflow-y-auto max-h-[400px] custom-scrollbar'>
        <table className='min-w-full divide-y divide-gray-200'>
          <thead className='bg-gray-50 sticky top-0 z-10'>
            <tr>
              <th
                scope='col'
                className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer'
                onClick={() => requestSort('id')}
              >
                ID {renderSortIcon('id')}
              </th>
              <th
                scope='col'
                className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer'
                onClick={() => requestSort('descripcion')}
              >
                Descripción {renderSortIcon('descripcion')}
              </th>
              <th
                scope='col'
                className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer'
                onClick={() => requestSort('stockActual')}
              >
                Stock Actual {renderSortIcon('stockActual')}
              </th>
              <th
                scope='col'
                className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer'
                onClick={() => requestSort('stockMinimo')}
              >
                Stock Mínimo {renderSortIcon('stockMinimo')}
              </th>
              <th
                scope='col'
                className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
              >
                Estado
              </th>
              <th
                scope='col'
                className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
              >
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className='bg-white divide-y divide-gray-200'>
            {filteredAndSortedData.map((item) => {
              // Determinar el estado del stock
              const isCritical = item.stockActual <= item.stockMinimo
              const isLow =
                item.stockActual <= item.stockMinimo * 2 &&
                item.stockActual > item.stockMinimo

              return (
                <tr
                  key={item.id}
                  className={
                    isCritical ? 'bg-red-50' : isLow ? 'bg-yellow-50' : ''
                  }
                >
                  <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                    {item.id}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                    {item.descripcion}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                    {item.stockActual}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                    {item.stockMinimo}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    {isCritical ? (
                      <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800'>
                        Crítico
                      </span>
                    ) : isLow ? (
                      <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800'>
                        Bajo
                      </span>
                    ) : (
                      <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800'>
                        Normal
                      </span>
                    )}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
                    <button className='text-red-600 hover:text-red-900 mr-3'>
                      Editar
                    </button>
                    <button className='text-gray-600 hover:text-gray-900'>
                      Reponer
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Mensaje si no hay resultados */}
      {filteredAndSortedData.length === 0 && (
        <div className='text-center py-4'>
          <p className='text-gray-500'>
            No se encontraron productos que coincidan con la búsqueda.
          </p>
        </div>
      )}
    </div>
  )
}

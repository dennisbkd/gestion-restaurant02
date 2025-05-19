import { useState } from 'react'
import { useFormHandler } from '../../hooks/useFormHandler'
import { obtenerProductos } from '../../api/cliente/productos'
import { useFetchData } from '../../hooks/useFetchData'
import { useCallback } from 'react'

const ModalCrearRol = ({
  isOpen,
  onClose,
  onGuardar,
  rol,
  context,
  list,
  Request
}) => {
  const extracProductos = useCallback((res) => res.data.producto, [])
  const { data: productos } = useFetchData(obtenerProductos, extracProductos)
  const { formData, handleInputChange, handleSubmit } = useFormHandler(
    { id: rol?.id || '', nombre: rol?.nombre || '' },
    async (formData) => {
      try {
        const dataAEnviar = {
          id: formData.id,
          dia: formData.nombre,
          productos: lista.map((id) => ({ id }))
        }

        await Request(dataAEnviar)
        onClose()
      } catch (error) {
        console.log(error)
      }
    }
  )
  const [lista, setLista] = useState(list || [])
  const [errores, setErrores] = useState({})

  const togglePermiso = (permiso) => {
    setLista((prev) =>
      prev.includes(permiso)
        ? prev.filter((p) => p !== permiso)
        : [...prev, permiso]
    )
  }
  const handleSaveClick = async () => {
    const nuevosErrores = {}
    if (!formData.nombre.trim()) {
      nuevosErrores.nombre = `El ${context.placeholder1} es obligatorio`
    }
    if (lista.length === 0) {
      nuevosErrores.productos = `Debe seleccionar los ${context.placeholder2}`
    }

    if (Object.keys(nuevosErrores).length > 0) {
      setErrores(nuevosErrores)
      return
    }

    setErrores({})
    await handleSubmit()
    onGuardar()
  }

  if (!isOpen) return null

  return (
    <div className='fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50'>
      <div className='bg-white rounded-lg p-6 w-full max-w-md shadow-lg'>
        <h2 className='text-xl font-bold text-gray-800 mb-4'>
          {context.title}
        </h2>

        <label className='block text-sm text-gray-700 mb-1'>{`Nombre del ${context.title}:`}</label>
        <input
          type='text'
          name='nombre'
          className='w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500'
          placeholder={context.placeholder1}
          value={formData.nombre}
          onChange={handleInputChange}
        />
        {errores.nombre && (
          <p className='text-red-500 text-sm'>{errores.nombre}</p>
        )}

        <div className='mb-4'>
          <label className='block text-sm text-gray-700 mb-1'>
            {context.placeholder2}
          </label>
          <div className='border rounded p-2 min-h-[40px]'>
            {lista.length === 0 && (
              <p className='text-sm text-gray-400'>
                Sin {context.placeholder2}
              </p>
            )}
            {lista.map((id) => {
              const producto = productos.find((p) => p.id === id)
              return (
                <span
                  key={id}
                  className='inline-block bg-indigo-100 text-indigo-700 text-sm rounded-full px-3 py-1 mr-2 mt-2'
                >
                  {producto?.nombre || 'Producto desconocido'}
                </span>
              )
            })}
          </div>
        </div>
        {errores.productos && (
          <p className='text-red-500 text-sm mt-1'>{errores.productos}</p>
        )}

        <div className='mb-4'>
          <label className='block text-sm text-gray-700 mb-1'>
            Añadir {context.placeholder2}:
          </label>
          <div className='flex flex-wrap gap-2'>
            {productos.map((producto) => (
              <button
                key={producto.id}
                type='button'
                onClick={() => togglePermiso(producto.id)}
                className={`px-3 py-1 rounded-full border text-sm ${
                  lista.includes(producto.id)
                    ? 'bg-green-100 text-green-700 border-green-300'
                    : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'
                }`}
              >
                {producto.nombre}
              </button>
            ))}
          </div>
        </div>

        <div className='flex justify-end gap-2'>
          <button
            onClick={onClose}
            className='px-4 py-2 rounded text-sm text-gray-700 border border-gray-300 hover:bg-gray-100'
          >
            Cancelar
          </button>
          <button
            onClick={handleSaveClick}
            className='px-4 py-2 rounded text-sm text-white bg-indigo-600 hover:bg-indigo-500'
          >
            {`Guardar ${context.title}`}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ModalCrearRol

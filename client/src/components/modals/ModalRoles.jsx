import { useState, useCallback } from 'react'
import { useFormHandler } from '../../hooks/useFormHandler'
import { getPermisosRequest } from '@/api/rol'
import { useFetchData } from '../../hooks/useFetchData'

const ModalCrearRol = ({
  isOpen,
  onClose,
  onGuardar,
  rol,
  context,
  list,
  Request,
  accion
}) => {
  const extraerPermisos = useCallback((res) => res.data, [])
  const { data: permisosDisponibles = [] } = useFetchData(
    getPermisosRequest,
    extraerPermisos
  )

  const [permisosSeleccionados, setPermisosSeleccionados] = useState(list || [])
  const [errores, setErrores] = useState({})

  const { formData, handleInputChange, handleSubmit } = useFormHandler(
    { nombre: rol?.nombre || '' },
    async (formData) => {
      try {
        let dataAEnviar

        if (accion === 'crear') {
          // Formato para crear rol
          dataAEnviar = {
            nombre: formData.nombre,
            permisos: permisosSeleccionados.map((id) => ({ id }))
          }
        } else {
          // Formato para editar rol
          const permisosOriginales = rol?.permisos?.map((p) => p.id) || []

          // Diferencia entre seleccionados nuevos y originales
          const permisosANuevos = permisosSeleccionados.filter(
            (id) => !permisosOriginales.includes(id)
          )
          const permisosAEliminar = permisosOriginales.filter(
            (id) => !permisosSeleccionados.includes(id)
          )

          dataAEnviar = {
            idRol: rol.id,
            permisosAEliminar: permisosAEliminar,
            permisosANuevos: permisosANuevos
          }
        }
        console.log('Enviando datos:', dataAEnviar)
        await Request(dataAEnviar)
        onClose()
      } catch (error) {
        console.error(error)
      }
    }
  )

  const togglePermiso = (id) => {
    setPermisosSeleccionados((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    )
  }

  const validar = () => {
    const nuevosErrores = {}
    if (!formData.nombre.trim()) {
      nuevosErrores.nombre = `El ${context.placeholder1} es obligatorio`
    }
    if (permisosSeleccionados.length === 0) {
      nuevosErrores.permisos = `Debe seleccionar los ${context.placeholder2}`
    }
    setErrores(nuevosErrores)
    return Object.keys(nuevosErrores).length === 0
  }

  const handleSaveClick = async () => {
    if (!validar()) return
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

        <label className='block text-sm text-gray-700 mb-1'>
          {`Nombre del ${context.title}:`}
        </label>
        <input
          type='text'
          name='nombre'
          className='w-full border border-gray-300 rounded px-3 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-indigo-500'
          placeholder={context.placeholder1}
          value={formData.nombre}
          onChange={handleInputChange}
        />
        {errores.nombre && (
          <p className='text-red-500 text-sm'>{errores.nombre}</p>
        )}

        <div className='mb-4'>
          <label className='block text-sm text-gray-700 mb-1'>
            {context.placeholder2} seleccionados:
          </label>
          <div className='border rounded p-2 min-h-[40px]'>
            {permisosSeleccionados.length === 0 ? (
              <p className='text-sm text-gray-400'>
                Sin {context.placeholder2}
              </p>
            ) : (
              permisosSeleccionados.map((id) => {
                const permiso = permisosDisponibles.find((p) => p.id === id)
                return (
                  <span
                    key={id}
                    className='inline-block bg-indigo-100 text-indigo-700 text-sm rounded-full px-3 py-1 mr-2 mt-2'
                  >
                    {permiso?.descripcion || 'Permiso desconocido'}
                  </span>
                )
              })
            )}
          </div>
          {errores.permisos && (
            <p className='text-red-500 text-sm mt-1'>{errores.permisos}</p>
          )}
        </div>

        <div className='mb-4'>
          <label className='block text-sm text-gray-700 mb-1'>
            Añadir {context.placeholder2}:
          </label>
          <div className='flex flex-wrap gap-2'>
            {permisosDisponibles.map((permiso) => (
              <button
                key={permiso.id}
                type='button'
                onClick={() => togglePermiso(permiso.id)}
                className={`px-3 py-1 rounded-full border text-sm ${
                  permisosSeleccionados.includes(permiso.id)
                    ? 'bg-green-100 text-green-700 border-green-300'
                    : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'
                }`}
              >
                {permiso.descripcion}
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

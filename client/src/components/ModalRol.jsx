import { useState } from 'react'

const permisosDisponibles = ['Permiso 1', 'Permiso 2', 'Permiso 3']

const ModalCrearRol = ({ isOpen, onClose, onGuardar, rol, context }) => {
  const [nombreRol, setNombreRol] = useState(rol?.nombre || '')
  const [permisosAsignados, setPermisosAsignados] = useState([])

  const togglePermiso = (permiso) => {
    setPermisosAsignados((prev) =>
      prev.includes(permiso)
        ? prev.filter((p) => p !== permiso)
        : [...prev, permiso]
    )
  }

  const handleGuardar = () => {
    onGuardar({ nombre: nombreRol, permisos: permisosAsignados })
    setNombreRol('')
    setPermisosAsignados([])
    onClose()
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
          className='w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500'
          placeholder={context.placeholder1}
          value={nombreRol}
          onChange={(e) => setNombreRol(e.target.value)}
        />

        <div className='mb-4'>
          <label className='block text-sm text-gray-700 mb-1'>
            {context.placeholder2}
          </label>
          <div className='border rounded p-2 min-h-[40px]'>
            {permisosAsignados.length === 0 && (
              <p className='text-sm text-gray-400'>
                Sin {context.placeholder2}
              </p>
            )}
            {permisosAsignados.map((permiso) => (
              <span
                key={permiso}
                className='inline-block bg-indigo-100 text-indigo-700 text-sm rounded-full px-3 py-1 mr-2 mt-2'
              >
                {permiso}
              </span>
            ))}
          </div>
        </div>

        <div className='mb-4'>
          <label className='block text-sm text-gray-700 mb-1'>
            Añadir {context.placeholder2}:
          </label>
          <div className='flex flex-wrap gap-2'>
            {permisosDisponibles.map((permiso) => (
              <button
                key={permiso}
                type='button'
                onClick={() => togglePermiso(permiso)}
                className={`px-3 py-1 rounded-full border text-sm ${
                  permisosAsignados.includes(permiso)
                    ? 'bg-green-100 text-green-700 border-green-300'
                    : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'
                }`}
              >
                {permiso}
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
            onClick={handleGuardar}
            className='px-4 py-2 rounded text-sm text-white bg-indigo-600 hover:bg-indigo-500'
          >
            Guardar Rol
          </button>
        </div>
      </div>
    </div>
  )
}

export default ModalCrearRol

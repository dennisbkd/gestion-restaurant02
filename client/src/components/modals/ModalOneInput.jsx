import { useState } from 'react'
import { useFormHandler } from '../../hooks/useFormHandler'

const ModalOneInput = ({
  isOpen,
  onClose,
  onGuardar,
  currentItem,
  context,
  Request
}) => {
  const { formData, handleInputChange, handleSubmit } = useFormHandler(
    { id: currentItem?.id || '', nombre: currentItem?.nombre || '' },
    async (formData) => {
      try {
        const dataAEnviar = {
          id: formData.id,
          dia: formData.nombre
        }

        await Request(dataAEnviar)
        onClose()
      } catch (error) {
        console.log(error)
      }
    }
  )
  const [errores, setErrores] = useState({})

  const handleSaveClick = async () => {
    const nuevosErrores = {}
    if (!formData.nombre.trim()) {
      nuevosErrores.nombre = `El ${context.placeholder1} es obligatorio`
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

export default ModalOneInput

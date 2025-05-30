import { useFormHandler } from '@/hooks/useFormHandler'
import { updateInventarioRequest } from '@/api/inventario'

export default function ModalEditarStockMinimo({
  onClose,
  currentItem,
  setSuccessModalOpen
}) {
  const { formData, handleInputChange, handleSubmit } = useFormHandler(
    {
      id: currentItem?.id || '',
      nuevoStockActual: currentItem?.stockActual || '',
      nuevoStockMinimo: currentItem?.stockMinimo || ''
    },
    updateInventarioRequest
  )
  return (
    <div className='fixed inset-0 backdrop-blur-sm bg-opacity-40 z-50 flex items-center justify-center'>
      <div className='bg-white p-6 rounded-xl shadow-lg w-full max-w-sm'>
        <h2 className='text-lg font-semibold mb-4 text-gray-800'>
          Editar Stock Mínimo
        </h2>

        <form
          onSubmit={async (e) => {
            await handleSubmit(e)
            setSuccessModalOpen() // <- esto cierra el modal y llama a refresh()
          }}
        >
          <label className='block mb-3'>
            <span className='text-sm font-medium text-gray-700'>
              Nuevo Stock Mínimo
            </span>
            <input
              type='number'
              name='nuevoStockMinimo'
              value={formData.nuevoStockMinimo}
              onChange={handleInputChange}
              className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-red-500 focus:border-red-500 sm:text-sm'
              required
              min={0}
            />
          </label>

          <div className='flex justify-end mt-4 gap-3'>
            <button
              type='button'
              onClick={onClose}
              className='px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300'
            >
              Cancelar
            </button>
            <button
              type='submit'
              className='px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700'
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

import { createProviderRequest } from '../../api/proveedor'
import { useFormHandler } from '../../hooks/useFormHandler'

const ModalEmployees = ({ onClose, setIsSuccessModalOpen }) => {
  const initialValues = {
    nombre: '',
    correo: '',
    direccion: '',
    telefono: ''
  }
  const { formData, handleInputChange, handleSubmit } = useFormHandler(
    initialValues, //se envia los valores iniciales a mostrar
    async (data) => {
      //obtienes los datos del formulario
      const dataSend = {
        ...data,
        idRol: parseInt(data.idRol, 10) //separamos el id para convertirlo en un entero
      }
      try {
        await createProviderRequest(dataSend) // se envian los datos
        setIsSuccessModalOpen(true)
        onClose()
      } catch (error) {
        console.log(error)
      }
    }
  )

  return (
    <>
      <div className='fixed inset-0 z-40 backdrop-blur-sm'></div>

      <div className='fixed inset-0 z-50 flex items-center justify-center'>
        <div className='bg-white rounded-lg shadow-md w-full max-w-md p-6 relative dark:bg-gray-700'>
          <button
            onClick={onClose}
            className='absolute top-2 right-2 text-gray-500 hover:text-gray-800 dark:hover:text-white text-xl'
          >
            ✕
          </button>

          <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
            Registrar Empleado
          </h3>

          <form onSubmit={handleSubmit} className='space-y-4'>
            <div>
              <label className='block text-sm font-medium text-gray-700 dark:text-white'>
                Nombre
              </label>
              <input
                type='text'
                name='nombre'
                value={formData.nombre}
                onChange={handleInputChange}
                placeholder='Nombre completo'
                className='mt-1 w-full p-2 border rounded-md dark:bg-gray-600 dark:text-white'
              />
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700 dark:text-white'>
                Correo
              </label>
              <input
                type='email'
                name='correo'
                value={formData.correo}
                onChange={handleInputChange}
                placeholder='Correo electrónico'
                className='mt-1 w-full p-2 border rounded-md dark:bg-gray-600 dark:text-white'
              />
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700 dark:text-white'>
                Dirección
              </label>
              <input
                type='text'
                name='direccion'
                value={formData.direccion}
                onChange={handleInputChange}
                placeholder='Dirección'
                className='mt-1 w-full p-2 border rounded-md dark:bg-gray-600 dark:text-white'
              />
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700 dark:text-white'>
                Teléfono
              </label>
              <input
                type='tel'
                name='telefono'
                value={formData.telefono}
                onChange={handleInputChange}
                pattern='[0-9]{8}'
                placeholder='Teléfono'
                className='mt-1 w-full p-2 border rounded-md dark:bg-gray-600 dark:text-white'
              />
            </div>

            <button
              type='submit'
              className='w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700'
            >
              Guardar Cambios
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default ModalEmployees

import { editUserRequest } from '../../api/user'
import { useFormHandler } from '../../hooks/useFormHandler'
const ModalEdit = ({ onClose, user, setIsSuccessModalOpen }) => {
  const { formData, handleInputChange, handleSubmit } = useFormHandler(
    user,
    async (formData) => {
      await editUserRequest(formData)
      setIsSuccessModalOpen(true)
      onClose()
    }
  )
  return (
    <>
      {/* Fondo desenfocado sin opacidad negra */}
      <div className='fixed inset-0 z-40 backdrop-blur-sm'></div>

      {/* Modal centrado */}
      <div className='fixed inset-0 z-50 flex items-center justify-center'>
        <div className='bg-white rounded-lg shadow-md w-full max-w-md p-6 relative dark:bg-gray-700'>
          {/* Botón cerrar */}
          <button
            onClick={onClose}
            className='absolute top-2 right-2 text-gray-500 hover:text-gray-800 dark:hover:text-white text-xl'
          >
            ✕
          </button>

          <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
            Editar Usuario
          </h3>

          {/* Formulario */}
          <form className='space-y-4'>
            <div>
              <label className='block text-sm font-medium text-gray-700 dark:text-white'>
                Nombre
              </label>
              <input
                type='text'
                placeholder='Nombre'
                name='nombreUsuario'
                value={formData.nombreUsuario}
                onChange={handleInputChange}
                className='mt-1 w-full p-2 border border-gray-300 rounded-md dark:bg-gray-600 dark:text-white'
              />
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700 dark:text-white'>
                Email
              </label>
              <input
                type='email'
                name='correo'
                value={formData.correo}
                onChange={handleInputChange}
                placeholder='Correo'
                className='mt-1 w-full p-2 border border-gray-300 rounded-md dark:bg-gray-600 dark:text-white'
              />
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700 dark:text-white'>
                Telefono
              </label>
              <input
                type='tel'
                name='telefono'
                value={formData.telefono}
                onChange={handleInputChange}
                pattern='[0-8]{8,8}' // Ajusta según tu formato requerido
                placeholder='Telefono'
                className='mt-1 w-full p-2 border border-gray-300 rounded-md dark:bg-gray-600 dark:text-white'
              />
            </div>
            <div>
              <label
                htmlFor='tipoUsuario'
                className='block text-sm font-medium text-gray-700 dark:text-white'
              >
                Tipo de Usuario
              </label>
              <select
                onChange={handleInputChange}
                required
                id='tipoUsuario'
                name='tipoUsuario'
                value={formData.tipoUsuario}
                className='mt-1 w-full p-2 border border-gray-300 rounded-md bg-white text-gray-700 dark:bg-gray-600 dark:border-gray-500 dark:text-white'
              >
                <option value=''>Selecciona una opción</option>
                <option value='Admin'>Administrador</option>
                <option value='Empleado'>Empleado</option>
                <option value='Cliente'>Cliente</option>
              </select>
            </div>

            <button
              type='submit'
              className='w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700'
              onClick={handleSubmit}
            >
              Guardar Cambios
            </button>
          </form>
        </div>
      </div>
    </>
  )
}
export default ModalEdit

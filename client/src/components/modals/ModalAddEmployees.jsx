import { registerEmployeeRequest } from '../../api/user'
import { useFormHandler } from '../../hooks/useFormHandler'
import { useFormValidator } from '../../hooks/useFormValidator'
const ModalEmployees = ({ onClose, setIsSuccessModalOpen }) => {
  const initialValues = {
    nombreUsuario: '',
    nombre: '',
    password: '',
    correo: '',
    telefono: '',
    idRol: '',
    ci: '',
    tipoUsuario: 'empleado'
  }

  const { errors, validate } = useFormValidator()
  const { formData, handleInputChange, handleSubmit } = useFormHandler(
    initialValues,
    async (data) => {
      if (!validate(data)) return

      const dataSend = {
        ...data,
        idRol: parseInt(data.idRol, 10)
      }

      try {
        await registerEmployeeRequest(dataSend)
        setIsSuccessModalOpen(true)
        onClose()
      } catch (error) {
        console.log(error)
      }
    }
  )

  return (
    <>
      {/* Fondo desenfocado sin opacidad negra */}
      <div className='fixed inset-0 z-40 backdrop-blur-sm'></div>

      {/* Modal centrado */}
      <div className='fixed inset-0 z-50 flex items-center justify-center'>
        <div className='bg-white rounded-lg shadow-md w-full max-w-md p-6 relative dark:bg-gray-700'>
          <button
            onClick={onClose}
            className='absolute top-2 right-2 text-gray-500 hover:text-gray-800 dark:hover:text-white text-xl'
          >
            ✕
          </button>

          <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
            Editar Usuario
          </h3>

          <form onSubmit={handleSubmit} className='space-y-4'>
            <div>
              <label className='block text-sm font-medium text-gray-700 dark:text-white'>
                Nombre de Usuario
              </label>
              <input
                type='text'
                name='nombreUsuario'
                value={formData.nombreUsuario}
                onChange={handleInputChange}
                placeholder='Nombre de Usuario'
                className='mt-1 w-full p-2 border rounded-md dark:bg-gray-600 dark:text-white'
              />
              {errors.nombreUsuario && (
                <p className='text-sm text-red-500'>{errors.nombreUsuario}</p>
              )}
            </div>

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
              {errors.nombre && (
                <p className='text-sm text-red-500'>{errors.nombre}</p>
              )}
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700 dark:text-white'>
                Contraseña
              </label>
              <input
                type='password'
                name='password'
                value={formData.password}
                onChange={handleInputChange}
                placeholder='Contraseña'
                className='mt-1 w-full p-2 border rounded-md dark:bg-gray-600 dark:text-white'
              />
              {errors.password && (
                <p className='text-sm text-red-500'>{errors.password}</p>
              )}
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
              {errors.correo && (
                <p className='text-sm text-red-500'>{errors.correo}</p>
              )}
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
              {errors.telefono && (
                <p className='text-sm text-red-500'>{errors.telefono}</p>
              )}
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700 dark:text-white'>
                CI
              </label>
              <input
                type='text'
                name='ci'
                value={formData.ci}
                onChange={handleInputChange}
                placeholder='Cédula de Identidad'
                className='mt-1 w-full p-2 border rounded-md dark:bg-gray-600 dark:text-white'
              />
              {errors.ci && <p className='text-sm text-red-500'>{errors.ci}</p>}
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700 dark:text-white'>
                Rol de Usuario
              </label>
              <select
                name='idRol'
                value={formData.idRol}
                onChange={handleInputChange}
                required
                className='mt-1 w-full p-2 border rounded-md bg-white text-gray-700 dark:bg-gray-600 dark:text-white'
              >
                <option value=''>Selecciona un rol</option>
                <option value='5'>Cajero</option>
                <option value='2'>Cocinero</option>
                <option value='3'>Mesero</option>
              </select>
              {errors.idRol && (
                <p className='text-sm text-red-500'>{errors.idRol}</p>
              )}
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

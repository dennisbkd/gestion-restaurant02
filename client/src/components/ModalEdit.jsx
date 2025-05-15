import { editUserRequest } from '../api/user'
import { useState } from 'react'
const ModalEdit = ({ onClose, user }) => {
  const [userInput, setUserInput] = useState({
    id: user.id,
    nombreUsuario: user.nombreUsuario,
    correo: user.correo,
    telefono: user.telefono,
    tipoUsuario: user.tipoUsuario
  })
  const handleInputChange = (event) => {
    setUserInput({
      ...userInput,
      [event.target.name]: event.target.value
    })
  }
  const handleSubmit = async () => {
    event.preventDefault()
    try {
      console.log(userInput)
      await editUserRequest(userInput)
      onClose()
    } catch (error) {
      console.log(error)
    }
  }
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
                value={userInput.nombreUsuario}
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
                value={userInput.correo}
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
                value={userInput.telefono}
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
                value={userInput.tipoUsuario}
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

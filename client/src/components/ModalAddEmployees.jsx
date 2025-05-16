import { registerEmployeeRequest } from '../api/user'
import { useState } from 'react'

const ModalEmployees = ({ onClose, setIsSuccessModalOpen }) => {
  const [userInput, setUserInput] = useState({
    nombreUsuario: '',
    nombre: '',
    password: '',
    correo: '',
    telefono: '',
    ci: '',
    idRol: ''
  })

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setUserInput((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      // Convertir idRol a número
      const dataToSend = {
        ...userInput,
        idRol: parseInt(userInput.idRol, 10)
      }

      console.log(dataToSend)
      await registerEmployeeRequest(dataToSend)
      setIsSuccessModalOpen(true)
      onClose()
    } catch (error) {
      console.log(error)
    }
  }

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
                value={userInput.nombreUsuario}
                onChange={handleInputChange}
                placeholder='Nombre de Usuario'
                className='mt-1 w-full p-2 border rounded-md dark:bg-gray-600 dark:text-white'
              />
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700 dark:text-white'>
                Nombre
              </label>
              <input
                type='text'
                name='nombre'
                value={userInput.nombre}
                onChange={handleInputChange}
                placeholder='Nombre completo'
                className='mt-1 w-full p-2 border rounded-md dark:bg-gray-600 dark:text-white'
              />
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700 dark:text-white'>
                Contraseña
              </label>
              <input
                type='password'
                name='password'
                value={userInput.password}
                onChange={handleInputChange}
                placeholder='Contraseña'
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
                value={userInput.correo}
                onChange={handleInputChange}
                placeholder='Correo electrónico'
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
                value={userInput.telefono}
                onChange={handleInputChange}
                pattern='[0-9]{8}'
                placeholder='Teléfono'
                className='mt-1 w-full p-2 border rounded-md dark:bg-gray-600 dark:text-white'
              />
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700 dark:text-white'>
                CI
              </label>
              <input
                type='text'
                name='ci'
                value={userInput.ci}
                onChange={handleInputChange}
                placeholder='Cédula de Identidad'
                className='mt-1 w-full p-2 border rounded-md dark:bg-gray-600 dark:text-white'
              />
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700 dark:text-white'>
                Rol de Usuario
              </label>
              <select
                name='idRol'
                value={userInput.idRol}
                onChange={handleInputChange}
                required
                className='mt-1 w-full p-2 border rounded-md bg-white text-gray-700 dark:bg-gray-600 dark:text-white'
              >
                <option value=''>Selecciona un rol</option>
                <option value='1'>Administrador</option>
                <option value='5'>Cajero</option>
                <option value='4'>Cliente</option>
                <option value='2'>Cocinero</option>
                <option value='3'>Mesero</option>
              </select>
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

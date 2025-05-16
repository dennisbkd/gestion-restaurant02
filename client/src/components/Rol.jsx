import { getRolesRequest } from '../api/rol'
import { useState, useEffect } from 'react'
import ModalCrearRol from './ModalRol'
const iconMap = {
  Administrador: (
    <svg
      className='w-8 h-8 text-indigo-600'
      fill='none'
      stroke='currentColor'
      strokeWidth='1.5'
      viewBox='0 0 24 24'
    >
      <path d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14c-4 0-8 2-8 4v2h16v-2c0-2-4-4-8-4z' />
    </svg>
  ),
  Cajero: (
    <svg
      className='w-8 h-8 text-green-600'
      fill='none'
      stroke='currentColor'
      strokeWidth='1.5'
      viewBox='0 0 24 24'
    >
      <path d='M3 10h18M9 16h6m-3-6v10m-5 0h10a2 2 0 002-2V8a2 2 0 00-2-2H6a2 2 0 00-2 2v10a2 2 0 002 2z' />
    </svg>
  ),
  Cliente: (
    <svg
      className='w-8 h-8 text-blue-600'
      fill='none'
      stroke='currentColor'
      strokeWidth='1.5'
      viewBox='0 0 24 24'
    >
      <path d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM6 21v-2a4 4 0 014-4h4a4 4 0 014 4v2' />
    </svg>
  ),
  Cocinero: (
    <svg
      className='w-8 h-8 text-red-600'
      fill='none'
      stroke='currentColor'
      strokeWidth='1.5'
      viewBox='0 0 24 24'
    >
      <path d='M12 3c-2.21 0-4 1.79-4 4v1H6v2h12V8h-2V7c0-2.21-1.79-4-4-4zM6 14v5h2v-5H6zm10 0v5h2v-5h-2z' />
    </svg>
  ),
  Mesero: (
    <svg
      className='w-8 h-8 text-yellow-600'
      fill='none'
      stroke='currentColor'
      strokeWidth='1.5'
      viewBox='0 0 24 24'
    >
      <path d='M4 4h16v2H4V4zm0 4h16v2H4V8zm2 4h12l-1 8H7l-1-8z' />
    </svg>
  ),
  default: (
    <svg
      className='w-8 h-8 text-gray-400'
      fill='none'
      stroke='currentColor'
      strokeWidth='1.5'
      viewBox='0 0 24 24'
    >
      <path d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM4 20v-2a4 4 0 014-4h8a4 4 0 014 4v2' />
    </svg>
  )
}

const Rol = () => {
  const [rol, setRol] = useState([])
  const [refresh, setRefresh] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentRol, setCurrentRol] = useState('')
  useEffect(() => {
    const fetchrol = async () => {
      try {
        const res = await getRolesRequest()
        const data = res.data.roles
        console.log(data)
        setRol(data)
      } catch (error) {
        console.error('Error cargando roles:', error)
      }
    }

    fetchrol()
  }, [refresh])

  return (
    <section className='py-16 mt-0 md:mt-35'>
      <div className='max-w-screen-xl mx-auto px-4 md:px-8 '>
        <div className='max-w-md md:max-w-full flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
          <div>
            <h1 className='text-gray-800 text-xl font-extrabold sm:text-2xl'>
              Roles
            </h1>
            <p className='text-gray-600 mt-2'>
              Mira los roles de los usuarios y los permisos que estos tienen
              acceso.
            </p>
          </div>
          <div>
            <button
              className='inline-block px-4 py-2 text-white duration-150 font-medium bg-indigo-600 rounded-lg hover:bg-indigo-500 active:bg-indigo-700 md:text-sm'
              onClick={() => setIsModalOpen(true)}
            >
              Añadir Rol
            </button>
          </div>
        </div>
        <ul className='mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3'>
          {rol.map((item, key) => (
            <li className='border rounded-lg' key={key}>
              <div className='flex items-start justify-between p-4'>
                <div className='space-y-2'>
                  {iconMap[item.nombre] || (
                    <div className='w-8 h-8 bg-gray-200 rounded-full' />
                  )}
                  <h4 className='text-gray-800 font-semibold'>{item.nombre}</h4>
                  <p className='text-gray-600 text-sm'>
                    {item.permisos?.[0]?.descripcion || 'Sin permisos'}
                  </p>
                </div>
                <button
                  className='text-gray-700 text-sm border rounded-lg px-3 py-2 duration-150 hover:bg-gray-100'
                  onClick={() => {
                    setIsModalOpen(true)
                    setCurrentRol(item)
                  }}
                >
                  Editar
                </button>
              </div>
              <div className='py-5 px-4 border-t text-right'>
                <a
                  href='#'
                  className='text-indigo-600 hover:text-indigo-500 text-sm font-medium'
                >
                  Ver detalles
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>
      {isModalOpen && (
        <ModalCrearRol
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onGuardar={(nuevoRol) => {
            // Aquí puedes guardar el nuevo rol con una petición POST si quieres
            console.log('Nuevo rol:', nuevoRol)
            setRefresh(!refresh) // refresca la lista de roles
            setIsModalOpen(false) // cierra el modal
            setCurrentRol('')
          }}
          rol={currentRol}
        />
      )}
    </section>
  )
}

export default Rol

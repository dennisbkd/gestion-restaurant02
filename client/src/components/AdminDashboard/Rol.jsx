import {
  getRolesRequest,
  editRolRequest,
  createRolRequest
} from '../../api/rol'
import { useFetchData } from '../../hooks/useFetchData'
import { useState } from 'react'
import { useModal } from '../../hooks/useModal'
import ModalCrearRol from '../modals/ModalRoles'
import SuccessModal from '../modals/SuccessModal'

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
const extractRoles = (res) => res.data.roles
const Rol = () => {
  const { data: roles, refresh } = useFetchData(getRolesRequest, extractRoles)
  const modal = useModal()
  const succes = useModal()
  const [currentRol, setCurrentRol] = useState('')
  const [accion, setAccion] = useState('')
  const [expandedRolId, setExpandedRolId] = useState(null)

  const toggleExpanded = (id) => {
    setExpandedRolId(expandedRolId === id ? null : id)
  }

  return (
    <section className='py-16'>
      <div className='max-w-screen-xl mx-auto px-4 md:px-8'>
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
              onClick={() => {
                modal.open()
                setAccion('crear')
              }}
            >
              Añadir Rol
            </button>
          </div>
        </div>

        <ul className='mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3'>
          {roles.map((item, key) => {
            const isExpanded = expandedRolId === item.id

            return (
              <li className='border rounded-lg' key={key}>
                <div className='flex items-start justify-between p-4'>
                  <div className='space-y-2'>
                    {iconMap[item.nombre] || iconMap.default}
                    <h4 className='text-gray-800 font-semibold'>
                      {item.nombre}
                    </h4>
                    {isExpanded ? (
                      <ul className='text-gray-600 text-sm list-disc ml-5'>
                        {item.permisos?.length ? (
                          item.permisos.map((permiso) => (
                            <li key={permiso.id}>{permiso.descripcion}</li>
                          ))
                        ) : (
                          <li>Sin permisos</li>
                        )}
                      </ul>
                    ) : (
                      <p className='text-gray-600 text-sm'>
                        {item.permisos?.[0]?.descripcion || 'Sin permisos'}
                      </p>
                    )}
                  </div>

                  <button
                    className='text-gray-700 text-sm border rounded-lg px-3 py-2 duration-150 hover:bg-gray-100'
                    onClick={() => {
                      modal.open()
                      setCurrentRol(item)
                      setAccion('editar')
                    }}
                  >
                    Editar
                  </button>
                </div>

                <div className='py-5 px-4 border-t text-right'>
                  <button
                    className='text-indigo-600 hover:text-indigo-500 text-sm font-medium'
                    onClick={() => toggleExpanded(item.id)}
                  >
                    {isExpanded ? 'Ocultar detalles' : 'Ver detalles'}
                  </button>
                </div>
              </li>
            )
          })}
        </ul>
      </div>

      {modal.isOpen && (
        <ModalCrearRol
          isOpen={modal.isOpen}
          onClose={() => {
            modal.close()
            setCurrentRol('')
          }}
          onGuardar={() => {
            refresh()
            modal.close()
            succes.open()
            setCurrentRol('')
          }}
          list={currentRol?.permisos?.map((p) => p.id) || []}
          rol={currentRol}
          context={{
            title: 'Rol',
            placeholder1: 'Nombre del Rol',
            placeholder2: 'Permisos'
          }}
          accion={accion}
          Request={accion === 'crear' ? createRolRequest : editRolRequest}
        />
      )}

      {succes.isOpen && (
        <SuccessModal
          setIsOpen={succes.toggle}
          refresh={refresh}
          message={'Rol guardado correctamente'}
        />
      )}
    </section>
  )
}

export default Rol

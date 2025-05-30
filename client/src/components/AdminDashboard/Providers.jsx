import { useState } from 'react'
import {
  getProviderRequest,
  deleteProviderRequest,
  restoreProviderRequest
} from '../../api/proveedor'
import { useFetchData } from '../../hooks/useFetchData'
import { useModal } from '../../hooks/useModal'
import SuccessModal from '../modals/SuccessModal'
import ModalProv from '../modals/ModalProv'
import ModalAddProv from '../modals/ModalAddProv'
import ModalDelete from '../modals/ModalDelete'

const extractUsuarios = (res) => res.data.providers

const ProviderTable = () => {
  const { data: users, refresh } = useFetchData(
    getProviderRequest,
    extractUsuarios
  )
  const editModal = useModal()
  const providerModal = useModal()
  const succesModal = useModal()
  const deleteModal = useModal()
  const [currentUser, setCurrentUser] = useState(null)
  const [showEliminados, setShowEliminados] = useState(false)

  const handleDelete = async () => {
    await deleteProviderRequest(currentUser.id)
    succesModal.open()
    refresh()
  }
  const handleEnable = async (id) => {
    await restoreProviderRequest(id)
    succesModal.open()
    refresh()
  }

  return (
    <div className='max-w-screen-xl mx-auto px-2 mt-4 md:mt-15 md:px-8 w-full'>
      <div className='items-start justify-between md:flex'>
        <div className='max-w-lg'>
          <h3 className='text-gray-800 text-xl font-bold sm:text-2xl'>
            Usuarios registrados
          </h3>
          <p className='text-gray-600 mt-2'>
            Lista dinámica de usuarios desde la base de datos.
          </p>
        </div>
        <div className='mt-3 md:mt-0'>
          <button
            className='inline-block px-4 py-2 text-white duration-150 font-medium bg-indigo-600 rounded-lg hover:bg-indigo-500 active:bg-indigo-700 md:text-sm'
            onClick={() => providerModal.open()}
          >
            Añadir Proveedor
          </button>
        </div>
      </div>

      {providerModal.isOpen && (
        <ModalAddProv
          onClose={() => providerModal.close()}
          setIsSuccessModalOpen={succesModal.open}
        />
      )}
      {/* switch selector  */}
      <div className='flex items-center mt-6'>
        <div className='inline-flex rounded-full bg-gray-200 p-1 transition duration-300'>
          <button
            onClick={() => setShowEliminados(false)}
            className={`px-4 py-1 rounded-full text-sm font-medium transition-all duration-300 ${
              !showEliminados
                ? 'bg-indigo-600 text-white shadow'
                : 'text-gray-600 hover:text-indigo-600'
            }`}
          >
            Habilitados
          </button>
          <button
            onClick={() => setShowEliminados(true)}
            className={`px-4 py-1 rounded-full text-sm font-medium transition-all duration-300 ${
              showEliminados
                ? 'bg-indigo-600 text-white shadow'
                : 'text-gray-600 hover:text-indigo-600'
            }`}
          >
            Eliminados
          </button>
        </div>
      </div>
      {/* tabla */}
      <div className='mt-12 shadow-sm border rounded-lg overflow-hidden'>
        <div className='max-h-[500px] overflow-y-auto'>
          <table className='w-full table-auto text-sm text-left'>
            <thead className='text-gray-600 font-medium border-b sticky top-0 z-10 bg-white'>
              <tr>
                <th className='py-3 px-6'>Nombre</th>
                <th className='py-3 px-6'>Email</th>
                <th className='py-3 px-6'>Dirección</th>
                <th className='py-3 px-6'>Teléfono</th>
                <th className='py-3 px-6'></th>
              </tr>
            </thead>
            <tbody className='text-gray-600 divide-y'>
              {users
                .filter((user) =>
                  showEliminados ? user.idEstado === 13 : user.idEstado !== 13
                )
                .map((user) => (
                  <tr key={user.id} className='odd:bg-gray-50 even:bg-white'>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      {user.nombre}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      {user.correo}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      {user.direccion}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      {user.telefono}
                    </td>
                    <td className='text-right px-6 whitespace-nowrap'>
                      {showEliminados ? (
                        <button
                          className='py-2 px-3 font-medium text-green-600 hover:text-green-500 duration-150 hover:bg-gray-50 rounded-lg'
                          onClick={() => {
                            handleEnable(user.id)
                            console.log('Habilitar proveedor:', user.id)
                          }}
                        >
                          Habilitar
                        </button>
                      ) : (
                        <>
                          <button
                            className='py-2 px-3 font-medium text-indigo-600 hover:text-indigo-500 duration-150 hover:bg-gray-50 rounded-lg'
                            onClick={() => {
                              editModal.open()
                              setCurrentUser(user)
                            }}
                          >
                            Editar
                          </button>
                          <button
                            className='py-2 leading-none px-3 font-medium text-red-600 hover:text-red-500 duration-150 hover:bg-gray-50 rounded-lg'
                            onClick={() => {
                              deleteModal.open()
                              setCurrentUser(user)
                            }}
                          >
                            Eliminar
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {editModal.isOpen && (
        <ModalProv
          onClose={editModal.close}
          user={currentUser}
          setIsSuccessModalOpen={succesModal.toggle}
        />
      )}

      {succesModal.isOpen && (
        <SuccessModal
          setIsOpen={succesModal.toggle}
          message={'Se han actualizado los datos correctamente'}
          refresh={refresh}
        />
      )}
      {deleteModal.isOpen && (
        <ModalDelete
          setIsOpen={deleteModal.toggle}
          handleDelete={handleDelete}
          refresh={refresh}
          message={
            'Estas seguro que deseas eliminar este proveedor? \n Si eliminas el proveedor podras luego volver a recuperarlo'
          }
        />
      )}
    </div>
  )
}

export default ProviderTable

import { getMenuRequest, deleteMenuRequest } from '../../api/menu'
import { useFetchData } from '../../hooks/useFetchData'
import ModalCrearRol from '../modals/ModalRol'
import SuccessModal from '../modals/SuccessModal'
import ModalDelete from '../modals/ModalDelete'
import { TrashIcon } from '@heroicons/react/24/outline'
import { useModal } from '../../hooks/useModal'
import { useState } from 'react'
import { editMenuRequest, createMenuRequest } from '../../api/menu'

const extracMenus = (res) => res.data.menus
const Menu = () => {
  const editModal = useModal()
  const creatModal = useModal()
  const successModal = useModal()
  const deleteModal = useModal()
  const { data: menus, refresh } = useFetchData(getMenuRequest, extracMenus)
  const [currentMenu, setCurrentMenu] = useState(null)
  const [currentlist, setCurrentList] = useState([])
  const [showEliminados, setShowEliminados] = useState(false)

  const handleDelete = async () => {
    await deleteMenuRequest(currentMenu.id)
    successModal.open()
    refresh()
  }

  return (
    <div className='w-full px-4 py-6'>
      <div className='flex items-center justify-between mb-4'>
        <h2 className='text-2xl font-bold text-gray-800'>Menú semanal</h2>
        <button
          onClick={() => creatModal.open()}
          className='bg-indigo-600 hover:bg-indigo-500 text-white font-medium px-4 py-2 rounded-lg shadow'
        >
          Crear menú
        </button>
      </div>
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
      <div
        className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-2'
        id={menus.id}
      >
        {menus
          .filter((menu) =>
            showEliminados ? menu.idEstado === 4 : menu.idEstado !== 4
          )
          .map((menu, index) => (
            <div
              key={index}
              className='min-w-[250px] bg-white border border-gray-200 rounded-2xl shadow-md p-4 flex-shrink-0'
            >
              <div className='flex justify-between items-center mb-3'>
                <h3 className='text-xl font-semibold text-indigo-600'>
                  {menu.dia}
                </h3>
                <button
                  onClick={() => {
                    deleteModal.open()
                    setCurrentMenu(menu)
                  }}
                  className='text-red-500 hover:text-red-600 p-1 rounded-full transition-colors duration-200 hover:cursor-pointer'
                  title='Eliminar menú'
                >
                  <TrashIcon className='w-5 h-5' />
                </button>
              </div>

              <hr className='my-3 border-gray-300' />
              <ul className='text-gray-700 space-y-1 list-disc list-inside mb-4'>
                {menu.DetalleMenus.map((prod, i) => (
                  <li key={i}>{prod.Producto.nombre}</li>
                ))}
              </ul>
              <button
                onClick={() => {
                  editModal.open()
                  setCurrentMenu(menu)
                  setCurrentList(menu.DetalleMenus.map((d) => d.Producto.id))
                }}
                className='mt-auto bg-gray-100 hover:bg-gray-200 text-sm text-gray-800 font-medium px-3 py-1.5 rounded-md'
              >
                Editar
              </button>
            </div>
          ))}
      </div>
      {(editModal.isOpen || creatModal.isOpen) && (
        <ModalCrearRol
          isOpen={editModal.isOpen || creatModal.isOpen}
          onClose={() => {
            editModal.isOpen ? editModal.close() : creatModal.close()
            setCurrentMenu(null)
            setCurrentList([])
          }}
          onGuardar={() => {
            editModal.isOpen ? editModal.close() : creatModal.close()
            successModal.open()
            setCurrentMenu(null)
            setCurrentList([])
          }}
          rol={{ nombre: currentMenu?.dia || '', id: currentMenu?.id || '' }}
          context={{
            title: 'menú',
            placeholder1: 'Día del Menú',
            placeholder2: 'Productos'
          }}
          list={currentlist || []}
          Request={editModal.isOpen ? editMenuRequest : createMenuRequest}
        />
      )}
      {successModal.isOpen && (
        <SuccessModal
          setIsOpen={successModal.toggle}
          message={'Se han actualizado los datos correctamente'}
          refresh={refresh}
        />
      )}
      {deleteModal.isOpen && (
        <ModalDelete
          setIsOpen={deleteModal.toggle}
          message={'Estas seguro de eliminar el menú?'}
          refresh={refresh}
          id={currentMenu?.id}
          handleDelete={handleDelete}
        />
      )}
    </div>
  )
}

export default Menu

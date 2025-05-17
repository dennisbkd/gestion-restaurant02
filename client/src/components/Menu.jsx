import { getMenuRequest } from '../api/menu'
import { useFetchData } from '../hooks/useFetchData'
import ModalCrearRol from './ModalRol'
import { useModal } from '../hooks/useModal'
const extracMenus = (res) => res.data.menus
const Menu = () => {
  const editModal = useModal()
  const creatModal = useModal()
  const { data: menus, refresh } = useFetchData(getMenuRequest, extracMenus)
  console.log(menus)
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

      <div
        className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'
        id={menus.id}
      >
        {menus
          .filter((menu) => menu.idEstado !== 4)
          .map((menu, index) => (
            <div
              key={index}
              className='min-w-[250px] bg-white border border-gray-200 rounded-2xl shadow-md p-4 flex-shrink-0'
            >
              <h3 className='text-xl font-semibold text-indigo-600'>
                {menu.dia}
              </h3>
              <hr className='my-3 border-gray-300' />
              <ul className='text-gray-700 space-y-1 list-disc list-inside mb-4'>
                {menu.DetalleMenus.map((prod, i) => (
                  <li key={i}>{prod.Producto.nombre}</li>
                ))}
              </ul>
              <button
                onClick={() => editModal.open()}
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
          }}
          onGuardar={() => {
            refresh()
            editModal.isOpen ? editModal.close() : creatModal.close()
          }}
          context={{
            title: 'menú',
            placeholder1: 'Día del Menú',
            placeholder2: 'Productos'
          }}
        />
      )}
    </div>
  )
}

export default Menu

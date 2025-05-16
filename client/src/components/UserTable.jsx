import { useEffect, useState } from 'react'
import { getUserRequest } from '../api/user'
import SuccessModal from './SuccessModal'
import ModalEdit from './ModalEdit'
import ModalAddEmployees from './ModalAddEmployees'

const UserTable = () => {
  const [users, setUsers] = useState([])
  const [areAllChecked, setAllChecked] = useState(false)
  const [checkboxItems, setCheckboxItem] = useState({})
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)
  const [refresh, setRefresh] = useState(false)
  const [isEmployeesOpen, setIsEmployeesOpen] = useState(false)
  // Cargar usuarios al montar el componente
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await getUserRequest()
        const data = res.data.usuarios // <-- aquí está el array
        setUsers(data) // Si setUsers espera un array
      } catch (error) {
        console.error('Error cargando usuarios:', error)
      }
    }

    fetchUsers()
  }, [refresh])

  // Verifica si todos están seleccionados
  useEffect(() => {
    const values = Object.values(checkboxItems)
    const allChecked = values.length > 0 && values.every(Boolean)
    setAllChecked(allChecked)
  }, [checkboxItems])

  // Marcar o desmarcar todos
  const handleCheckboxItems = () => {
    const newCheckedState = {}
    users.forEach((_, idx) => {
      newCheckedState[`checkbox${idx}`] = !areAllChecked
    })
    setCheckboxItem(newCheckedState)
    setAllChecked(!areAllChecked)
  }

  // Cambio individual
  const handleCheckboxChange = (e, idx) => {
    setCheckboxItem({
      ...checkboxItems,
      [`checkbox${idx}`]: e.target.checked
    })
  }

  return (
    <div className='max-w-screen-xl mx-auto px-2 mt-4 md:mt-40 md:px-8 w-full'>
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
            onClick={() => setIsEmployeesOpen(true)}
          >
            Añadir empleado
          </button>
        </div>
      </div>
      {/* Modal de empleados */}
      {isEmployeesOpen && (
        <ModalAddEmployees
          onClose={() => setIsEmployeesOpen(false)}
          setIsSuccessModalOpen={setIsSuccessModalOpen}
        />
      )}
      <div className='mt-12 shadow-sm border rounded-lg overflow-x-auto'>
        <table className='w-full table-auto text-sm text-left'>
          <thead className='text-gray-600 font-medium border-b'>
            <tr>
              <th className='py-3 px-6 flex items-center gap-x-4'>
                <div>
                  <input
                    type='checkbox'
                    id='checkbox-all-items'
                    className='checkbox-item peer hidden'
                    checked={areAllChecked}
                    onChange={handleCheckboxItems}
                  />
                  <label
                    htmlFor='checkbox-all-items'
                    className='relative flex w-5 h-5 bg-white peer-checked:bg-indigo-600 rounded-md border ring-offset-2 ring-indigo-600 duration-150 peer-active:ring cursor-pointer after:absolute after:inset-x-0 after:top-[3px] after:m-auto after:w-1.5 after:h-2.5 after:border-r-2 after:border-b-2 after:border-white after:rotate-45'
                  ></label>
                </div>
                Username
              </th>
              <th className='py-3 px-6'>Nombre</th>
              <th className='py-3 px-6'>Email</th>
              <th className='py-3 px-6'>TipoUsuario</th>
              <th className='py-3 px-6'>Telefono</th>
              <th className='py-3 px-6'></th>
            </tr>
          </thead>
          <tbody className='text-gray-600 divide-y'>
            {users.map((user, idx) => (
              <tr key={user.id} className='odd:bg-gray-50 even:bg-white'>
                <td className='px-6 py-4 whitespace-nowrap flex items-center gap-x-4'>
                  <div>
                    <input
                      type='checkbox'
                      id={`checkbox-${idx}`}
                      name={`checkbox-${idx}`}
                      className='checkbox-item peer hidden'
                      checked={checkboxItems[`checkbox${idx}`] || false}
                      onChange={(e) => handleCheckboxChange(e, idx)}
                    />
                    <label
                      htmlFor={`checkbox-${idx}`}
                      className='relative flex w-5 h-5 bg-white peer-checked:bg-indigo-600 rounded-md border ring-offset-2 ring-indigo-600 duration-150 peer-active:ring cursor-pointer after:absolute after:inset-x-0 after:top-[3px] after:m-auto after:w-1.5 after:h-2.5 after:border-r-2 after:border-b-2 after:border-white after:rotate-45'
                    ></label>
                  </div>
                  {user.nombreUsuario}
                </td>
                <td className='px-6 py-4 whitespace-nowrap'>{user.nombre}</td>
                <td className='px-6 py-4 whitespace-nowrap'>{user.correo}</td>
                <td className='px-6 py-4 whitespace-nowrap'>
                  {user.tipoUsuario}
                </td>
                <td className='px-6 py-4 whitespace-nowrap'>{user.telefono}</td>

                <td className='text-right px-6 whitespace-nowrap'>
                  <button
                    className='py-2 px-3 font-medium text-indigo-600 hover:text-indigo-500 duration-150 hover:bg-gray-50 rounded-lg'
                    onClick={() => {
                      setIsModalOpen(true)
                      setCurrentUser(user)
                    }}
                  >
                    Editar
                  </button>
                  <button className='py-2 leading-none px-3 font-medium text-red-600 hover:text-red-500 duration-150 hover:bg-gray-50 rounded-lg'>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Modal */}
      {isModalOpen && (
        <ModalEdit
          onClose={() => setIsModalOpen(false)}
          user={currentUser}
          setIsSuccessModalOpen={setIsSuccessModalOpen}
        />
      )}
      {isSuccessModalOpen && (
        <SuccessModal
          setIsOpen={setIsSuccessModalOpen}
          message={'Se han actualizado los datos correctamente'}
          refresh={() => setRefresh((prev) => !prev)}
        />
      )}
    </div>
  )
}

export default UserTable

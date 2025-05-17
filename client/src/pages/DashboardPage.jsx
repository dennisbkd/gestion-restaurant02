import SideBar from '../components/SideBar'
import UserTable from '../components/UserTable'
import Rol from '../components/Rol'
import Menu from '../components/Menu'
import { useState } from 'react'
export const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState('inicio')

  const renderContent = () => {
    switch (activeTab) {
      case 'usuarios':
        return <UserTable />
      case 'empleados':
        return <EmpleadosTable />
      case 'productos':
        return <ProductosTable />
      case 'roles':
        return <Rol />
      case 'menu':
        return <Menu />
      // Agrega los demás casos...
      default:
        return (
          <>
            <h2>Bienvenido al Sistema</h2>
            <p>Seleccione una opción del menú para comenzar.</p>
          </>
        )
    }
  }
  return (
    <div className='flex md:flex-row flex-col gap-2'>
      <SideBar setActiveTab={setActiveTab} />
      <div className='flex-1 justify-center items-center w-full'>
        {renderContent()}
      </div>
    </div>
  )
}

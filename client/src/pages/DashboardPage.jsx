import SideBar from '../components/SideBar'
import UserTable from '../components/UserTable'
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
      <div className='flex justify-center items-center w-full'>
        {renderContent()}
      </div>
    </div>
  )
}

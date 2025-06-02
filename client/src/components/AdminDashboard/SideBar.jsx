import {
  UsersIcon,
  ComputerDesktopIcon,
  ArchiveBoxIcon,
  ArrowLeftStartOnRectangleIcon,
  LockClosedIcon,
  UserIcon,
  Bars3Icon,
  XMarkIcon,
  ClipboardDocumentCheckIcon,
  UserGroupIcon,
  BookOpenIcon,
  BanknotesIcon,
  FolderOpenIcon,
  TruckIcon,
  DocumentTextIcon,
  ShoppingBagIcon
} from '@heroicons/react/24/outline'
import { NavLink } from 'react-router'
import { useState } from 'react'

const SideBar = ({ setActiveTab }) => {
  const [isOpen, setIsOpen] = useState({
    user: false,
    inventory: false,
    menu: false,
    ventas: false,
    pedidos: false
  })
  const [sidebarOpen, setSidebarOpen] = useState(false) // Sidebar móvil

  return (
    <>
      {/* Mobile menu button */}
      <div className='md:hidden p-4 bg-[#171717] text-white flex items-center justify-between'>
        <h1 className='text-sm font-bold'>Restaurante</h1>
        <button onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? (
            <XMarkIcon className='w-6 h-6' />
          ) : (
            <Bars3Icon className='w-6 h-6' />
          )}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed md:static top-0 left-0 w-72 bg-gradient-to-b from-[#162a3f] to-[#171717]
      text-white p-6 flex flex-col
        transform transition-transform duration-300 z-50
        h-screen
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0
        `}
      >
        {/* SidebarHeader */}
        <div
          className='flex gap-4 items-center border-b border-[#3a4b58] pb-6'
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <img
            src='https://png.pngtree.com/png-clipart/20220921/ourmid/pngtree-fire-logo-png-image_6209600.png'
            alt='Logo'
            className='w-10 h-10'
          />
          <h1 className='text-xl font-bold text-[#f8f9fa] tracking-wide'>
            Restaurante
          </h1>
        </div>

        {/* SidebarContent */}
        <div className='mt-6 overflow-y-automt-6 overflow-y-auto flex-1 pr-2 custom-scrollbar'>
          <label className='uppercase mb-4 block text-gray-400 text-xs font-semibold'>
            Secciones
          </label>

          <div className='space-y-5'>
            <h2 className='flex items-center gap-4 text-lg font-medium text-[#b0bec5] hover:text-[##615FFF] cursor-pointer transition-all duration-300'>
              <ComputerDesktopIcon className='w-8 h-8' />
              Dashboard
            </h2>

            <h2
              className='flex items-center gap-4 text-lg font-medium text-[#b0bec5] hover:text-[#615FFF] cursor-pointer transition-all duration-300'
              onClick={() => setIsOpen({ ...isOpen, user: !isOpen.user })}
            >
              <UsersIcon className='w-8 h-8' />
              Gestionar Usuarios
            </h2>

            {isOpen.user && (
              <div className='ml-8'>
                <NavLink
                  to='/dashboard/usuarios'
                  className={({ isActive }) =>
                    `flex items-center gap-4 text-sm font-medium ${
                      isActive ? 'text-[#615FFF]' : 'text-[#b0bec5]'
                    } hover:text-[#615FFF] transition-all duration-300 mt-2`
                  }
                >
                  <UserIcon className='w-8 h-8' />
                  Usuarios
                </NavLink>
                {/* <h2 className='flex items-center gap-4 text-sm font-medium text-[#b0bec5] hover:text-[#615FFF] cursor-pointer transition-all duration-300 mt-2'>
                  <UserIcon className='w-8 h-8' />
                  Empleados
                </h2>

                <h2 className='flex items-center gap-4 text-sm font-medium text-[#b0bec5] hover:text-[#615FFF] cursor-pointer transition-all duration-300 mt-2'>
                  <UserIcon className='w-8 h-8' />
                  ClienteWeb
                </h2> */}
                <NavLink
                  to='/dashboard/roles'
                  className={({ isActive }) =>
                    `flex items-center gap-4 text-sm font-medium ${
                      isActive ? 'text-[#615FFF]' : 'text-[#b0bec5]'
                    } hover:text-[#615FFF] transition-all duration-300 mt-2`
                  }
                  onClick={() => setSidebarOpen(false)}
                >
                  <ClipboardDocumentCheckIcon className='w-8 h-8' />
                  Roles y Permisos
                </NavLink>
              </div>
            )}

            <h2
              className='flex items-center gap-4 text-lg font-medium text-[#b0bec5] hover:text-[#615FFF] cursor-pointer transition-all duration-300'
              onClick={() => setIsOpen({ ...isOpen, menu: !isOpen.menu })}
            >
              <BookOpenIcon className='w-8 h-8' />
              Gestión de Menú
            </h2>
            {isOpen.menu && (
              <div className='ml-8'>
                <NavLink
                  to='/dashboard/menu'
                  className={({ isActive }) =>
                    `flex items-center gap-4 text-sm font-medium ${
                      isActive ? 'text-[#615FFF]' : 'text-[#b0bec5]'
                    } hover:text-[#615FFF] transition-all duration-300 mt-2`
                  }
                  onClick={() => setSidebarOpen(false)}
                >
                  <BookOpenIcon className='w-8 h-8' />
                  Gestionar menú
                </NavLink>

                <h2 className='flex items-center gap-4 text-sm font-medium text-[#b0bec5] hover:text-[#615FFF] cursor-pointer transition-all duration-300 mt-2'>
                  <TruckIcon className='w-8 h-8' />
                  Gestionar Productos
                </h2>
                <h2 className='flex items-center gap-4 text-sm font-medium text-[#b0bec5] hover:text-[#615FFF] cursor-pointer transition-all duration-300 mt-2'>
                  <DocumentTextIcon className='w-8 h-8' />
                  Gestionar Recetas
                </h2>
                <h2 className='flex items-center gap-4 text-sm font-medium text-[#b0bec5] hover:text-[#615FFF] cursor-pointer transition-all duration-300 mt-2'>
                  <ShoppingBagIcon className='w-8 h-8' />
                  Gestionar Ingredientes
                </h2>
              </div>
            )}
            <h2
              className='flex items-center gap-4 text-lg font-medium text-[#b0bec5] hover:text-[#615FFF] cursor-pointer transition-all duration-300'
              onClick={() =>
                setIsOpen({ ...isOpen, inventory: !isOpen.inventory })
              }
            >
              <ArchiveBoxIcon className='w-8 h-8' />
              Gestion de Inventario
            </h2>
            {isOpen.inventory && (
              <div className='ml-8'>
                <NavLink
                  to='/dashboard/proveedores'
                  className={({ isActive }) =>
                    `flex items-center gap-4 text-sm font-medium ${
                      isActive ? 'text-[#615FFF]' : 'text-[#b0bec5]'
                    } hover:text-[#615FFF] transition-all duration-300 mt-2`
                  }
                  onClick={() => setSidebarOpen(false)}
                >
                  <UserGroupIcon className='w-8 h-8' />
                  Gestionar Proveedores
                </NavLink>

                <h2 className='flex items-center gap-4 text-sm font-medium text-[#b0bec5] hover:text-[#615FFF] cursor-pointer transition-all duration-300 mt-2'>
                  <BanknotesIcon className='w-8 h-8' />
                  Gestionar Compras
                </h2>

                <NavLink
                  to='/dashboard/inventario'
                  className={({ isActive }) =>
                    `flex items-center gap-4 text-sm font-medium ${
                      isActive ? 'text-[#615FFF]' : 'text-[#b0bec5]'
                    } hover:text-[#615FFF] transition-all duration-300 mt-2`
                  }
                  onClick={() => setSidebarOpen(false)}
                >
                  <FolderOpenIcon className='w-8 h-8' />
                  Gestionar Inventario
                </NavLink>
              </div>
            )}
            {/* Gestión de Ventas */}
            <h2
              className='flex items-center gap-4 text-lg font-medium text-[#b0bec5] hover:text-[#615FFF] cursor-pointer transition-all duration-300'
              onClick={() => setIsOpen({ ...isOpen, ventas: !isOpen.ventas })}
            >
              <BanknotesIcon className='w-8 h-8' />
              Gestión de Ventas
            </h2>

            {isOpen.ventas && (
              <div className='ml-8'>
                <h2
                  className='flex items-center gap-4 text-sm font-medium text-[#b0bec5] hover:text-[#615FFF] cursor-pointer transition-all duration-300 mt-2'
                  onClick={() => {
                    setActiveTab('ventas')
                    setSidebarOpen(false)
                  }}
                >
                  <FolderOpenIcon className='w-8 h-8' />
                  Gestionar Ventas
                </h2>

                <h2
                  className='flex items-center gap-4 text-sm font-medium text-[#b0bec5] hover:text-[#615FFF] cursor-pointer transition-all duration-300 mt-2'
                  onClick={() => {
                    setActiveTab('pagos')
                    setSidebarOpen(false)
                  }}
                >
                  <BanknotesIcon className='w-8 h-8' />
                  Gestionar Pagos
                </h2>

                <h2
                  className='flex items-center gap-4 text-sm font-medium text-[#b0bec5] hover:text-[#615FFF] cursor-pointer transition-all duration-300 mt-2'
                  onClick={() => {
                    setActiveTab('descuentos')
                    setSidebarOpen(false)
                  }}
                >
                  <DocumentTextIcon className='w-8 h-8' />
                  Gestionar Descuentos
                </h2>
              </div>
            )}

            {/* Gestión de Pedidos */}
            <h2
              className='flex items-center gap-4 text-lg font-medium text-[#b0bec5] hover:text-[#615FFF] cursor-pointer transition-all duration-300'
              onClick={() => setIsOpen({ ...isOpen, pedidos: !isOpen.pedidos })}
            >
              <ShoppingBagIcon className='w-8 h-8' />
              Gestión de Pedidos
            </h2>

            {isOpen.pedidos && (
              <div className='ml-8'>
                <h2
                  className='flex items-center gap-4 text-sm font-medium text-[#b0bec5] hover:text-[#615FFF] cursor-pointer transition-all duration-300 mt-2'
                  onClick={() => {
                    setActiveTab('estadoPedidos')
                    setSidebarOpen(false)
                  }}
                >
                  <ClipboardDocumentCheckIcon className='w-8 h-8' />
                  Gestionar Estado de Pedidos
                </h2>

                <h2
                  className='flex items-center gap-4 text-sm font-medium text-[#b0bec5] hover:text-[#615FFF] cursor-pointer transition-all duration-300 mt-2'
                  onClick={() => {
                    setActiveTab('envios')
                    setSidebarOpen(false)
                  }}
                >
                  <TruckIcon className='w-8 h-8' />
                  Gestionar Envíos de Pedidos
                </h2>

                <h2
                  className='flex items-center gap-4 text-sm font-medium text-[#b0bec5] hover:text-[#615FFF] cursor-pointer transition-all duration-300 mt-2'
                  onClick={() => {
                    setActiveTab('puntosFidelidad')
                    setSidebarOpen(false)
                  }}
                >
                  <UserGroupIcon className='w-8 h-8' />
                  Gestionar Puntos de Fidelidad
                </h2>
              </div>
            )}
          </div>
          <NavLink
                  to='/dashboard/recetas'
                  className={({ isActive }) =>
                    `flex items-center gap-4 text-sm font-medium ${
                      isActive ? 'text-[#615FFF]' : 'text-[#b0bec5]'
                    } hover:text-[#615FFF] transition-all duration-300 mt-2`
                  }
                  onClick={() => setSidebarOpen(false)}
                >
                  <ClipboardDocumentCheckIcon className='w-8 h-8' />
                  recetas
                </NavLink>
        </div>

        {/* SidebarFooter */}
        <div className='mt-auto pt-6 border-t border-[#3a4b58]'>
          <button
            className='flex items-center gap-3 text-xl text-red-500 hover:text-red-400 font-semibold transition-all duration-300'
            onClick={() => {
              console.log('Cerrar sesión')
              setSidebarOpen(false) // Cierra sidebar en móvil
            }}
          >
            <ArrowLeftStartOnRectangleIcon className='w-8 h-8' />
            Cerrar sesión
          </button>
        </div>
      </div>
    </>
  )
}

export default SideBar

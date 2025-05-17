import {
  UsersIcon,
  ComputerDesktopIcon,
  ArchiveBoxIcon,
  ArrowLeftStartOnRectangleIcon,
  LockClosedIcon,
  UserIcon,
  Bars3Icon,
  XMarkIcon,
  ClipboardDocumentCheckIcon
} from '@heroicons/react/24/outline'
import { useState } from 'react'

const SideBar = ({ setActiveTab }) => {
  const [isOpen, setIsOpen] = useState(false) // Usuarios desplegable
  const [sidebarOpen, setSidebarOpen] = useState(false) // Sidebar móvil

  return (
    <>
      {/* Mobile menu button */}
      <div className='md:hidden p-4 bg-[#1f2833] text-white flex items-center justify-between'>
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
        className={`fixed md:static top-0 left-0 w-72 bg-gradient-to-b from-[#2c3e50] to-[#1f2833]
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
        <div className='mt-6'>
          <label className='uppercase mb-4 block text-gray-400 text-xs font-semibold'>
            Secciones
          </label>

          <div className='space-y-5'>
            <h2 className='flex items-center gap-4 text-lg font-medium text-[#b0bec5] hover:text-[#ff6f61] cursor-pointer transition-all duration-300'>
              <ComputerDesktopIcon className='w-8 h-8' />
              Dashboard
            </h2>

            <h2
              className='flex items-center gap-4 text-lg font-medium text-[#b0bec5] hover:text-[#ff6f61] cursor-pointer transition-all duration-300'
              onClick={() => setIsOpen(!isOpen)}
            >
              <UsersIcon className='w-8 h-8' />
              Administrar usuarios
            </h2>

            {isOpen && (
              <div className='ml-8'>
                <h2
                  className='flex items-center gap-4 text-sm font-medium text-[#b0bec5] hover:text-[#ff6f61] cursor-pointer transition-all duration-300 mt-2'
                  onClick={() => {
                    setActiveTab('usuarios')
                    setSidebarOpen(false) // Cierra en móvil
                  }}
                >
                  <UserIcon className='w-8 h-8' />
                  Usuarios
                </h2>
                <h2 className='flex items-center gap-4 text-sm font-medium text-[#b0bec5] hover:text-[#ff6f61] cursor-pointer transition-all duration-300 mt-2'>
                  <UserIcon className='w-8 h-8' />
                  Empleados
                </h2>

                <h2 className='flex items-center gap-4 text-sm font-medium text-[#b0bec5] hover:text-[#ff6f61] cursor-pointer transition-all duration-300 mt-2'>
                  <UserIcon className='w-8 h-8' />
                  ClienteWeb
                </h2>
              </div>
            )}
            <h2
              className='flex items-center gap-4 text-lg font-medium text-[#b0bec5] hover:text-[#ff6f61] cursor-pointer transition-all duration-300'
              onClick={() => {
                setActiveTab('roles')
              }}
            >
              <ClipboardDocumentCheckIcon className='w-8 h-8' />
              Roles y Permisos
            </h2>
            <h2 className='flex items-center gap-4 text-lg font-medium text-[#b0bec5] hover:text-[#ff6f61] cursor-pointer transition-all duration-300'>
              <ArchiveBoxIcon className='w-8 h-8' />
              Productos
            </h2>

            <h2 className='flex items-center gap-4 text-lg font-medium text-[#b0bec5] hover:text-[#ff6f61] cursor-pointer transition-all duration-300'>
              <LockClosedIcon className='w-8 h-8' />
              Cambiar Contraseña
            </h2>
          </div>
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

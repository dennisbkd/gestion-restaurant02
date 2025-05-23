import React from 'react'
import { Outlet } from 'react-router'
import { useAuth } from '@/context/AuthContext'
import { CargaDeEspera } from '@/components/loading/CargaDeEspera'
export const PerfilLayout = () => {
  const { isAuthenticated, user, editarUsuario } = useAuth()
  return (
    <>
      {isAuthenticated ? <Outlet context={{ user, editarUsuario }} /> : <CargaDeEspera />}
    </>
  )
}

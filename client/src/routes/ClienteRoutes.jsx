
import { Route } from 'react-router';
import { Suspense } from 'react';
import { CartLayout } from '@/Layouts/CartLayout';
import { PerfilLayout } from '@/Layouts/PerfilLayout';
import { CargaDeEspera } from '@/components/loading/CargaDeEspera';
import LoginPage from '@/pages/LoginPage'
import Menu from '@/components/usuario/Menu';
import Reserva from '@/pages/usuario/Reserva';
import { ModificarReserva } from '@/components/usuario/ModificarReserva';
import Perfil from '@/pages/usuario/Perfil';
import Editar from "@/pages/usuario/Editar"
import { lazy } from 'react';

const VerificarUsuario = lazy(() => import('@/pages/usuario/VerificarUsuario'))

export default function ClienteRoutes() {
  return (
    <>
      <Route element={<CartLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<Menu />} />
        <Route path='/reservar' element={<Reserva />} />
        <Route path='/editar' element={<ModificarReserva />} />
        <Route path="/checkout" element={<Suspense fallback={<CargaDeEspera
          text="Procesando tu pedido..."
          text2="Redirigiendo al método de pago" />}>
          <VerificarUsuario />
        </Suspense>} />
      </Route>
      <Route element={<PerfilLayout />}>
        <Route path="perfil" element={<Perfil />} />
        <Route path="/perfil/editar" element={<Editar />} />
      </Route>
    </>
  )
}

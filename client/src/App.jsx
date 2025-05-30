import { BrowserRouter, Routes, Route } from 'react-router'
import RegisterPage from './pages/RegisterPage.jsx'
import { AuthProvide } from './context/AuthContext'
import DashboardRoutes from './routes/AdminRoutes'
import { ProfilePage } from './pages/ProfilePage.jsx'
import { ProtectedRoute } from './ProtectedRoute.jsx'
import { ReservaProvider } from './context/Reserva/ReservaProvider'
import ClienteRoutes from './routes/ClienteRoutes.jsx'
import MeseroPedidos from '@/components/Mesero/Pedido.jsx'

export default function App() {
  // todas las rutas hijas tendran el contexto
  return (
    <AuthProvide>
      <BrowserRouter>
        <ReservaProvider>
          <Routes>
            <Route path='/register' element={<RegisterPage />} />
            <Route path='/profile' element={<ProfilePage />} />
            <Route path='/mesero/pedidos' element={<MeseroPedidos />} />

            <Route element={<ProtectedRoute />}>{DashboardRoutes()}</Route>

            {ClienteRoutes()}
          </Routes>
        </ReservaProvider>
      </BrowserRouter>
    </AuthProvide>
  )
}

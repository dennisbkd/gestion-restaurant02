
import { BrowserRouter, Routes, Route } from 'react-router'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import { AuthProvide } from './context/AuthContext'
import DashboardRoutes from './routes/AdminRoutes'
import { ProfilePage } from './pages/ProfilePage'
import { ProtectedRoute } from './ProtectedRoute'
import { Task } from './pages/task'
import Menu from './components/usuario/Menu'
import { lazy, Suspense } from 'react'
import { CartLayout } from './Layouts/CartLayout'
import { CargaDeEspera } from './components/loading/CargaDeEspera'
import Perfil from "./pages/usuario/Perfil"
import Editar from "./pages/usuario/Editar"
import { PerfilLayout } from "./Layouts/PerfilLayout"


const VerificarUsuario = lazy(() => import('./pages/usuario/VerificarUsuario'))

export default function App() {
  // todas las rutas hijas tendran el contexto
  return (
    <AuthProvide>
      <BrowserRouter>
        <Routes>

          <Route path='/register' element={<RegisterPage />} />
          <Route path='/profile' element={<ProfilePage />} />
          <Route path='/task' element={<Task />} />

          <Route element={<ProtectedRoute />}>{DashboardRoutes()}</Route>
          <Route element={<CartLayout />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<Menu />} />
            <Route path="/checkout" element={<Suspense fallback={<CargaDeEspera
              text="Procesando tu pedido..."
              text2="Redirigiendo al método de pago" />}>
              <VerificarUsuario />
            </Suspense>} />
          </Route>
          <Route element={<PerfilLayout />}>
            <Route path="/perfil" element={<Perfil />} />
            <Route path="/perfil/editar" element={<Editar />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvide>
  )
}

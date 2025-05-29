
import { BrowserRouter, Routes, Route } from 'react-router'
import RegisterPage from './pages/RegisterPage'
import { AuthProvide } from './context/AuthContext'
import DashboardRoutes from './routes/AdminRoutes'
import { ProfilePage } from './pages/ProfilePage'
import { ProtectedRoute } from './ProtectedRoute'
import { Task } from './pages/task'
import { ReservaProvider } from './context/Reserva/ReservaProvider'
import ClienteRoutes from './routes/ClienteRoutes'


export default function App() {
  // todas las rutas hijas tendran el contexto
  return (
    <AuthProvide>
      <BrowserRouter>
        <ReservaProvider>
          <Routes>
            <Route path='/register' element={<RegisterPage />} />
            <Route path='/profile' element={<ProfilePage />} />
            <Route path='/task' element={<Task />} />
            <Route element={<ProtectedRoute />}>{DashboardRoutes()}</Route>

            {ClienteRoutes()}

          </Routes>
        </ReservaProvider>
      </BrowserRouter>
    </AuthProvide>
  )
}

import { Route } from 'react-router'
import { DashboardPage } from '../pages/DashboardPage'
import UserTable from '../components/UserTable'
import Rol from '../components/Rol'
import Menu from '../components/Menu'
import ProviderTable from '../components/Providers'
import { RecetaPage } from '@/pages/recetas/RecetaPage'

export default function DashboardRoutes() {
  return (
    <Route path='dashboard' element={<DashboardPage />}>
      <Route index element={<h2>Bienvenido al Sistema</h2>} />
      <Route path='usuarios' element={<UserTable />} />
      <Route path='roles' element={<Rol />} />
      <Route path='proveedores' element={<ProviderTable />} />
      <Route path='menu' element={<Menu />} />
      <Route path='recetas' element={<RecetaPage />} />
    </Route>

  )
}

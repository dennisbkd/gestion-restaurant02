import { Route } from 'react-router'
import { DashboardPage } from '../pages/DashboardPage'

import UserTable from '../components/AdminDashboard/UserTable'
import Rol from '../components/AdminDashboard/Rol'
import Menu from '../components/AdminDashboard/Menu'
import ProviderTable from '../components/AdminDashboard/Providers'
import Inventario from '../components/AdminDashboard/Inventario'
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
      <Route path='inventario' element={<Inventario />} />
    </Route>
  )
}

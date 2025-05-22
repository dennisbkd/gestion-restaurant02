import { Outlet } from 'react-router'
import SideBar from '../components/AdminDashboard/SideBar'

export const DashboardPage = () => {
  return (
    <div className='flex md:flex-row flex-col gap-2'>
      <SideBar />
      <div className='flex-1 justify-center items-center w-full p-4'>
        <Outlet />
      </div>
    </div>
  )
}

export default DashboardPage

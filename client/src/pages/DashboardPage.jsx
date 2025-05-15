import SideBar from "../components/SideBar"

export const DashboardPage = () => {
  return (
    <div className="flex">
      <div className="w-1/4">
        <SideBar />
      </div>
      <div className="w-3/4">
        {/* Aquí puedes agregar el contenido principal */}
      </div>
    </div>
  )
}
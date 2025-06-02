import { Navigate, Outlet } from "react-router"
import { useAuth } from "./context/AuthContext"


export const ProtectedRoute = () => {
  const { isLoading, isAuthenticated } = useAuth()

  if (isLoading) {
    return <h1>Loading...</h1>
  }
  if (!isLoading && !isAuthenticated) return <Navigate to='/menu' replace />

  return (
    <Outlet />
  )
}

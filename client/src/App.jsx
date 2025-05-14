import { BrowserRouter, Routes, Route } from "react-router"
import RegisterPage from "./pages/RegisterPage"
import LoginPage from "./pages/LoginPage"
import { AuthProvide } from "./context/AuthContext"
import { DashboardPage } from "./pages/DashboardPage"
import { ProfilePage } from "./pages/ProfilePage"
import { HomePage } from "./pages/HomePage"
import { ProtectedRoute } from "./ProtectedRoute"
import { Task } from "./pages/task"
export default function App() {
  // todas las rutas hijas tendran el contexto
  return (
    <AuthProvide>
      <BrowserRouter >
        <Routes>
          <Route path="/" element={<h1><HomePage /></h1>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/profile" element={<h1><ProfilePage /></h1>} />
          <Route path="/task" element={<Task />} />


          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<h1><DashboardPage /></h1>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvide>
  )
}

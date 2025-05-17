import { BrowserRouter, Routes, Route } from "react-router"
import RegisterPage from "./pages/RegisterPage"
import LoginPage from "./pages/LoginPage"
import { AuthProvide } from "./context/AuthContext"
import { DashboardPage } from "./pages/DashboardPage"
import { ProfilePage } from "./pages/ProfilePage"
import { HomePage } from "./pages/HomePage"
import { ProtectedRoute } from "./ProtectedRoute"
import { Task } from "./pages/task"
import Menu from "./components/usuario/Menu"
import { CartLayout } from "./Layouts/CartLayout"


export default function App() {
  // todas las rutas hijas tendran el contexto
  return (
    <AuthProvide>
      <BrowserRouter>

        {/* CartSidebar fuera de Routes pero dentro del Router */}

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/task" element={<Task />} />


          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<DashboardPage />} />
          </Route>
          <Route element={<CartLayout />}>
            <Route path="/menu" element={<Menu />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvide>
  );
}

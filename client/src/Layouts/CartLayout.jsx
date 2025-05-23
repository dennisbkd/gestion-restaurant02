import { Outlet } from "react-router"
import { CartProvider } from "../context/CartContext"
import { Header } from "@/components/usuario/Header"
import { useAuth } from "@/context/AuthContext"


export const CartLayout = () => {
  const { isAuthenticated, user, signOut } = useAuth()
  return (
    <CartProvider>
      <div className="relative not-first:h-full">
        <Header isAuthenticated={isAuthenticated} user={user} signOut={signOut} />
        <Outlet />
      </div>
    </CartProvider>
  )
}

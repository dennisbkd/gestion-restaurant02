import { Outlet } from "react-router"
import CartSidebar from "../components/usuario/CartSidebar"
import { CartProvider } from "../context/CartContext"


export const CartLayout = () => {
  return (
    <CartProvider>
      <div className="relative not-first:h-full">
        <Outlet />
        <CartSidebar />
      </div>
    </CartProvider>
  )
}

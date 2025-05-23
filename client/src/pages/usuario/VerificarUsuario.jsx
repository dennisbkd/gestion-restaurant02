import { Navigate } from "react-router";
import { useAuth } from "@/context/AuthContext";
import CheckoutPage from "../procesoPago/CheckoutPage";



export default function VerificarUsuario() {
  const { isAuthenticated } = useAuth()
  return (
    <>
      {isAuthenticated ? (
        <CheckoutPage />
      ) : (
        <Navigate to="/login" />
      )}
    </>
  )
}

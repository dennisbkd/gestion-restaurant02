import { useForm } from "react-hook-form"
import { useAuth } from "../context/AuthContext"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link, useNavigate } from "react-router"
import { useEffect } from "react"



export default function LoginPage() {
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm()
  const { signIn, errors: LoginErrors, isAuthenticated } = useAuth()


  const onSubmit = handleSubmit(data => {
    signIn(data)
  })
  useEffect(() => {
    if (isAuthenticated) navigate("/")
  }, [isAuthenticated, navigate])

  return (
    <div className="flex items-center justify-center min-h-screen w-screen  bg-gray-100">
      <Card className="mb-100 w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <CardHeader>
          <CardTitle className="text-2xl text-center text-gray-800">
            Bienvenido
          </CardTitle>
          <p className="text-center text-gray-600">Por favor inicia sesión para continuar</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-4">
            {LoginErrors.map((error, i) => (
              <div key={i} className="bg-red-500 p-2 text-white rounded-md">
                {error.msg}
              </div>
            ))}

            <div className="space-y-2">
              <Label htmlFor="nombreUsuario" className="text-gray-700">
                Usuario
              </Label>
              <Input
                type="text"
                id="nombreUsuario"
                {...register("nombreUsuario", { required: true })}
                placeholder="Enter your userName"
                className="focus-visible:ring-blue-500"
              />
              {errors.nombreUsuario && (
                <p className="text-red-500 text-sm">Usuario es requerido</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700">
                Password
              </Label>
              <Input
                type="password"
                id="password"
                {...register("password", { required: true })}
                placeholder="Enter your password"
                className="focus-visible:bgring-black"
              />
              {errors.password && (
                <p className="text-red-500 text-sm">Password es requerido</p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full bg-black text-white hover:bg-gray-800 transition duration-300"
            >
              Login
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <p className="text-sm text-gray-700">¿No tienes una cuenta?</p>
          <Link
            to="/register"
            className="text-sm text-black hover:underline"
          >
            Regístrate aquí
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}



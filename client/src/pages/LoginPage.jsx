import { useForm } from "react-hook-form"
import { useAuth } from "../context/AuthContext"
import { Link, useNavigate } from "react-router"
import { useEffect } from "react"



export default function LoginPage() {
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm()
  const { signIn, errors: LoginErrors, isAuthenticated } = useAuth()

  useEffect(() => {
    if (isAuthenticated) navigate("/dashboard")
  }, [isAuthenticated, navigate])

  const onSubmit = handleSubmit(data => {
    signIn(data)
  })
  return (
    <div className="flex items-center justify-center min-h-screen w-screen bg-gradient-to-r from-blue-500 to-purple-600">
      <form
        onSubmit={onSubmit}
        className="bg-amber-100 p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Login
        </h2>
        {
          LoginErrors.map((error, i) => (
            <div key={i} className="bg-red-500 p-2 text-white">
              {error.msg}
            </div>
          ))
        }
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
            Usuario
          </label>
          <input
            type="text"
            id="nombreUsuario"
            {...register("nombreUsuario", { required: true })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your userName"
          />
          {errors.nombreUsuario && (
            <p className="text-red-500">Usuario es requerido</p>
          )}
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            {...register("password", { required: true })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your password"
          />
          {errors.password && (
            <p className="text-red-500">Password es requerido</p>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Login
        </button>
        <p className="flex gap-x-2 justify-between m-2">
          ¿No tienes una cuenta?{" "}
          <Link
            to="/register"
            className="text-blue-500 hover:underline "
          >
            Regístrate aquí
          </Link>
        </p>
      </form>
    </div>
  )
}



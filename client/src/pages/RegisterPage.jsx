
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext.jsx";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router";

export default function RegisterPage() {
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors }, } = useForm()
  const { signUp, isAuthenticated, errors: RegisterError } = useAuth()

  useEffect(() => {
    if (isAuthenticated) navigate("/dashboard")
  }, [isAuthenticated, navigate])

  const onSubmit = handleSubmit(async (values) => {
    signUp(values)
  })
  return (
    <div className="flex items-center justify-center min-h-screen w-screen bg-gradient-to-r from-blue-500 to-purple-600">
      <form
        onSubmit={onSubmit}
        className="bg-amber-100 p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Create an Account
        </h2>
        <div className="mb-4">
          {
            RegisterError.map((error, i) => (
              <div key={i} className="bg-red-500 p-2 text-white">
                {error.msg}
              </div>
            ))
          }
          <label className="block text-gray-700 font-medium mb-2" htmlFor="username">
            nombre
          </label>
          <input
            type="text"
            id="nombre"
            {...register("nombre", { required: true })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your username"
          />
          {
            errors.nombre && (
              <p className="text-red-500">nombre es requerido</p>
            )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2" htmlFor="username">
            nombreUsuario
          </label>
          <input
            type="text"
            id="nombreUsuario"
            {...register("nombreUsuario", { required: true })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your username"
          />
          {
            errors.nombreUsuario && (
              <p className="text-red-500">nombre de Usuario es requerido</p>
            )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
            correo
          </label>
          <input
            type="email"
            id="correo"
            {...register("correo", { required: true })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
          />
          {
            errors.correo && (
              <p className="text-red-500">Correo es requerido</p>
            )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2" htmlFor="address">
            direccion
          </label>
          <input
            type="text"
            id="direccion"
            {...register("direccion", { required: true })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your address"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2" htmlFor="phone">
            telefono
          </label>
          <input
            type="tel"
            id="telefono"
            {...register("telefono", { required: true })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your phone number"
          />
          {
            errors.telefono && (
              <p className="text-red-500">telefono es requerido</p>
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
          {
            errors.password && (
              <p className="text-red-500">password es requerido</p>
            )}
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2" htmlFor="confirm">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirm"
            {...register("confirm", { required: true })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Confirm your password"
          />
          {
            errors.confirm && (
              <p className="text-red-500">confirmar password</p>
            )}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Register
        </button>
        <p className="flex gap-x-2 justify-between m-2">
          ¿ya tienes una cuenta?{" "}
          <Link
            to="/login"
            className="text-blue-500 hover:underline "
          >
            Inicia Sesion
          </Link>
        </p>
      </form>
    </div>
  );
}

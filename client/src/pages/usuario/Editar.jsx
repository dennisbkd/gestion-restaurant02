"use client"

import React from "react"

import { useState } from "react"
import { useNavigate, useOutletContext } from "react-router"
import { Eye, EyeOff, Save, User, Mail, Lock, ArrowLeft, Phone } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"


// Avatares predeterminados
// const avatarOptions = [
//   { id: "avatar1", src: "/placeholder.svg?height=40&width=40&text=1", label: "Avatar 1" },
//   { id: "avatar2", src: "/placeholder.svg?height=40&width=40&text=2", label: "Avatar 2" },
//   { id: "avatar3", src: "/placeholder.svg?height=40&width=40&text=3", label: "Avatar 3" },
//   { id: "avatar4", src: "/placeholder.svg?height=40&width=40&text=4", label: "Avatar 4" },
// ]

export default function Editar() {
  const navigate = useNavigate()
  const { user, editarUsuario } = useOutletContext()
  const { id, userName, nombre, email, telefono } = user?.user || {}
  console.log(user)
  // Estado para los datos del formulario
  const [formData, setFormData] = useState({
    nombre: nombre,
    nombreUsuario: userName,
    email: email,
    telefono: telefono,
    password: "",
    confirmPassword: ""
  })

  // Estados para UI
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [passwordError, setPasswordError] = useState("")

  // Manejador de cambios en inputs
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Validar que las contraseñas coincidan
    if (name === "password" || name === "confirmPassword") {
      if (name === "password" && formData.confirmPassword && value !== formData.confirmPassword) {
        setPasswordError("Las contraseñas no coinciden")
      } else if (name === "confirmPassword" && formData.password && value !== formData.password) {
        setPasswordError("Las contraseñas no coinciden")
      } else {
        setPasswordError("")
      }
    }
  }

  // Manejador para cambio de avatar
  // const handleAvatarChange = (value) => {
  //   setFormData((prev) => ({ ...prev, avatar: value }))
  // }

  // Manejador para envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault()
    // Validar que las contraseñas coincidan si se está cambiando
    if (formData.password && formData.password !== formData.confirmPassword) {
      setPasswordError("Las contraseñas no coinciden")
      return
    }

    setIsLoading(true)
    try {
      const datosActualizacion = {
        nombreUsuario: formData.nombreUsuario,
        email: formData.email,
        telefono: formData.telefono,
        nombre: nombre,
        ...(formData.password && { password: formData.password })
      }

      const resultado = await editarUsuario(id, datosActualizacion)
      // 4. Verificar respuesta
      if (resultado?.error) {
        return console.error("Error al actualizar el perfil:", resultado.error)
      }
      navigate("/perfil")

    } catch (error) {
      // Manejo de errores
      console.error("Error al actualizar el perfil:", error);
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex container mx-auto min-h-screen flex-col">
      <main className="flex-1 container py-8">
        <div className="flex items-center mb-6">
          <Button variant="ghost" size="sm" className="mr-2" onClick={() => navigate("/perfil")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver al perfil
          </Button>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Editar perfil</CardTitle>
              <CardDescription>Actualiza tu información personal y preferencias</CardDescription>
            </CardHeader>

            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-6">
                {/* Sección de avatar */}
                {/* <div className="space-y-4">
                  <h3 className="text-lg font-medium">Foto de perfil</h3>
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage
                        src={avatarOptions.find((opt) => opt.id === formData.avatar)?.src || ""}
                        alt="Avatar"
                      />
                      <AvatarFallback>
                        <User className="h-8 w-8" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="text-sm text-muted-foreground">
                      Selecciona una de las imágenes predeterminadas para tu perfil
                    </div>
                  </div>

                  <RadioGroup
                    value={formData.avatar}
                    onValueChange={handleAvatarChange}
                    className="grid grid-cols-2 gap-4 sm:grid-cols-4"
                  >
                    {avatarOptions.map((option) => (
                      <div key={option.id} className="flex flex-col items-center space-y-2">
                        <div
                          className={`
                          relative rounded-md border-2 p-1 cursor-pointer transition-all
                          ${formData.avatar === option.id ? "border-primary" : "border-transparent hover:border-muted"}
                        `}
                        >
                          <Avatar className="h-14 w-14">
                            <AvatarImage src={option.src || "/placeholder.svg"} alt={option.label} />
                            <AvatarFallback>
                              <User className="h-6 w-6" />
                            </AvatarFallback>
                          </Avatar>
                          <RadioGroupItem value={option.id} id={option.id} className="sr-only" />
                        </div>
                        <Label htmlFor={option.id} className="text-xs cursor-pointer">
                          {option.label}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div> */}

                <Separator />

                {/* Sección de información personal */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Información personal</h3>

                  <div className="space-y-2">
                    <Label htmlFor="nombreUsuario">Nombre de usuario</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="nombreUsuario"
                        name="nombreUsuario"
                        value={formData.nombreUsuario}
                        onChange={handleChange}
                        className="pl-10"
                        disabled={isLoading}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Correo electrónico</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="pl-10"
                        disabled={isLoading}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="telefono">Telefono</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="telefono"
                        name="telefono"
                        type="tel"
                        value={formData.telefono}
                        onChange={handleChange}
                        className="pl-10"
                        disabled={isLoading}
                        required
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Sección de cambio de contraseña */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Cambiar contraseña</h3>
                  <p className="text-sm text-muted-foreground">
                    Deja estos campos en blanco si no deseas cambiar tu contraseña
                  </p>

                  <div className="space-y-2">
                    <Label htmlFor="password">Nueva contraseña</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={handleChange}
                        className="pl-10"
                        disabled={isLoading}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-1 top-1 h-8 w-8 text-muted-foreground"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        <span className="sr-only">{showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}</span>
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirmar nueva contraseña</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className={`pl-10 ${passwordError ? "border-destructive" : ""}`}
                        disabled={isLoading}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-1 top-1 h-8 w-8 text-muted-foreground"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        <span className="sr-only">
                          {showConfirmPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                        </span>
                      </Button>
                    </div>
                    {passwordError && <p className="text-sm text-destructive">{passwordError}</p>}
                  </div>
                </div>
              </CardContent>

              <CardFooter className="flex justify-between my-5">
                <Button variant="outline" type="button" onClick={() => navigate("/perfil")} disabled={isLoading}>
                  Cancelar
                </Button>
                <Button type="submit" disabled={isLoading || !!passwordError}>
                  {isLoading ? (
                    "Guardando cambios..."
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Guardar cambios
                    </>
                  )}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </main>
    </div>
  )
}

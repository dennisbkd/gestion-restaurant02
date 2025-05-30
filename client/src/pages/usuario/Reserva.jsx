"use client"

import { useContext, useEffect, useState } from "react"
import { CalendarIcon, Clock, Users, MapPin, Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner";
import { crearReserva } from "@/api/cliente/reserva.js"
import { useAuth } from "@/context/AuthContext"
import { ReservaContext } from "@/context/Reserva/ReservaContext"


// Horarios disponibles
const horariosDisponibles = [
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30"
]

export default function Reserva() {
  const { user } = useAuth()
  const { mesasDisponibles, mostrarMesasDisponibles, refrescarDatos } = useContext(ReservaContext)
  const [fecha, setFecha] = useState("")
  const [hora, setHora] = useState("")
  const [mesaSeleccionada, setMesaSeleccionada] = useState(null)
  const [paso, setPaso] = useState("seleccion")
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (fecha && hora) {
      mostrarMesasDisponibles(fecha, hora)
      console.log("Mesas disponibles actualizadas")
    }
  }, [fecha, hora])

  // Filtrar mesas disponibles


  // Función para confirmar la reserva
  const confirmarReserva = async () => {

    const { id: idClienteWeb } = user?.user || {}

    if (!idClienteWeb) {
      return toast.error("Debes iniciar sesión para hacer una reserva")
    }

    if (!fecha || !hora || !mesaSeleccionada) return
    try {
      await crearReserva({
        idClienteWeb,
        fecha,
        hora,
        idMesa: mesaSeleccionada,
        idEstado: 10 // Asumiendo que 10 es el ID de "Reservado"
      })
      toast.success("¡Reserva confirmada!", {
        description: `Tu mesa ha sido reservada para el ${fecha?.toLocaleDateString()} a las ${hora}.`,
      })
      refrescarDatos()
      setFecha(undefined)
      setHora("")
      setMesaSeleccionada(null)
      setPaso("seleccion")
      setIsLoading(true)
    } catch (error) {
      return toast.error("Error al crear reserva", error.msg)
    }
  }

  // Obtener información de la mesa seleccionada
  const mesaInfo = mesasDisponibles

  return (
    <div className="flex container mx-auto min-h-screen flex-col">
      <main className="flex-1 container py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold md:text-4xl">Reservar Mesa</h1>
            <p className="mt-2 text-muted-foreground">Selecciona la fecha, hora y mesa para tu reserva</p>
          </div>
          <Toaster richColors position="top-center" />
          {paso === "seleccion" && (
            <div className="grid gap-8 lg:grid-cols-2">
              {/* Panel de selección de fecha y hora */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CalendarIcon className="h-5 w-5" />
                    Fecha y Hora
                  </CardTitle>
                  <CardDescription>Selecciona cuándo quieres hacer tu reserva</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Selector de fecha */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Fecha</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !fecha && "text-muted-foreground",
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {fecha ? fecha.toLocaleDateString() : "Selecciona una fecha"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={fecha}
                          onSelect={setFecha}
                          disabled={(date) => date < new Date() || date < new Date("1900-01-01")}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  {/* Selector de hora */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Hora</label>
                    <Select value={hora} onValueChange={setHora} disabled={!fecha}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona una hora" />
                      </SelectTrigger>
                      <SelectContent>
                        {horariosDisponibles.map((horario) => (
                          <SelectItem key={horario} value={horario}>
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4" />
                              {horario}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {fecha && hora && (
                    <div className="p-4 bg-muted rounded-lg">
                      <div className="text-sm font-medium">Reserva seleccionada:</div>
                      <div className="text-sm text-muted-foreground">
                        {fecha ? fecha.toLocaleDateString() : "Selecciona una fecha"} a las {hora}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Panel de selección de mesa */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Mesas Disponibles
                  </CardTitle>
                  <CardDescription>
                    {fecha && hora
                      ? "Selecciona una mesa para tu reserva"
                      : "Primero selecciona fecha y hora para ver las mesas disponibles"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {fecha && hora ? (
                    <div className="grid gap-3 sm:grid-cols-2">
                      {mesasDisponibles.map((mesa) => (
                        <div
                          key={mesa.id}
                          className={cn(
                            "p-4 rounded-lg border-2 cursor-pointer transition-all hover:shadow-md",
                            mesaSeleccionada === mesa.id
                              ? "border-primary bg-primary/5"
                              : "border-border hover:border-primary/50",
                          )}
                          onClick={() => setMesaSeleccionada(mesa.id)}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="font-medium">Mesa {mesa.id}</div>
                            {mesaSeleccionada === mesa.id && <Check className="h-4 w-4 text-primary" />}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Users className="h-4 w-4" />
                            <span>{mesa.capacidad} personas</span>
                          </div>

                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <MapPin className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>Selecciona fecha y hora para ver las mesas disponibles</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}

          {paso === "confirmacion" && mesaInfo && fecha && hora && (
            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle className="text-center">Confirmar Reserva</CardTitle>
                <CardDescription className="text-center">
                  Revisa los detalles de tu reserva antes de confirmar
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <div className="text-sm font-medium text-muted-foreground">Fecha</div>
                    <div className="flex items-center gap-2">
                      <CalendarIcon className="h-4 w-4" />
                      {fecha ? fecha.toLocaleDateString() : "Selecciona una fecha"}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm font-medium text-muted-foreground">Hora</div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      {hora ? hora : "Selecciona una hora"}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm font-medium text-muted-foreground">Mesa</div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      Mesa {mesaInfo.id} - {mesaInfo.ubicacion}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm font-medium text-muted-foreground">Capacidad</div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      {mesaInfo.capacidad} personas
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-muted rounded-lg">
                  <div className="text-sm font-medium mb-2">Información importante:</div>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• La reserva se mantendrá por 15 minutos después de la hora programada</li>
                    <li>• Para cancelar o modificar, contacta al restaurante con 2 horas de anticipación</li>
                    <li>• Se requiere confirmación telefónica para grupos de más de 6 personas</li>
                  </ul>
                </div>

                <div className="flex gap-4">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => setPaso("seleccion")}
                    disabled={isLoading}
                  >
                    Volver
                  </Button>
                  <Button className="flex-1" onClick={confirmarReserva} disabled={isLoading}>
                    {isLoading ? "Confirmando..." : "Confirmar Reserva"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Botón para continuar a confirmación */}
          {paso === "seleccion" && fecha && hora && mesaSeleccionada && (
            <div className="mt-8 text-center">
              <Button size="lg" onClick={() => setPaso("confirmacion")}>
                Continuar con la Reserva
              </Button>
            </div>
          )}

          {/* Información adicional */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="text-lg">Información del Restaurante</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="text-center">
                <Clock className="h-8 w-8 mx-auto mb-2 text-primary" />
                <div className="font-medium">Horarios</div>
                <div className="text-sm text-muted-foreground">
                  Almuerzo: 12:00 - 15:00
                </div>
              </div>
              <div className="text-center">
                <MapPin className="h-8 w-8 mx-auto mb-2 text-primary" />
                <div className="font-medium">Ubicación</div>
                <div className="text-sm text-muted-foreground">
                  Av. Principal 123
                  <br />
                  Ciudad, País
                </div>
              </div>
              <div className="text-center">
                <Users className="h-8 w-8 mx-auto mb-2 text-primary" />
                <div className="font-medium">Capacidad</div>
                <div className="text-sm text-muted-foreground">
                  Mesas para 2-8 personas
                  <br />
                  Áreas interior y terraza
                </div>
              </div>
              <div className="text-center">
                <CalendarIcon className="h-8 w-8 mx-auto mb-2 text-primary" />
                <div className="font-medium">Reservas</div>
                <div className="text-sm text-muted-foreground">
                  Hasta 30 días
                  <br />
                  de anticipación
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}


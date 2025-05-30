import { Link } from "react-router"
import { Edit, User, Calendar, ShoppingBag, Clock, ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { useAuth } from "@/context/AuthContext"
import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { obtenerPedidoPorId } from "@/api/cliente/productos"
import { ModificarReserva } from "@/components/usuario/ModificarReserva"
import { ReservaContext } from "@/context/Reserva/ReservaContext"



export default function Perfil() {
  const { user, reloadUser } = useAuth()
  const [pedido, setPedido] = useState([])
  const { mesas, reservas } = useContext(ReservaContext)
  const navigate = useNavigate()
  const { id, nombre, email, userName, telefono } = user?.user || {}
  const Pedidos = pedido?.data || []
  const { totalPedidos } = Pedidos

  useEffect(() => {
    const loadData = async () => {
      await reloadUser(); // Implementa esta función en tu AuthProvider
      const response = await obtenerPedidoPorId(id);
      if (response.error) {
        console.error("Error al obtener el pedido:", response.error);
        return;
      }
      setPedido(response);
    };
    loadData();

  }, [setPedido]);



  // Datos de ejemplo del usuario
  const usuario = {
    nombre: "Juan Pérez",
    email: "juan@ejemplo.com",
    avatar: "/placeholder.svg?height=40&width=40&text=1",
    miembro_desde: "Enero 2023",
    pedidos: 12,
    //reservas: 5,
    nivel: "Cliente Frecuente",
  }

  // Datos de ejemplo para pedidos recientes
  // const pedidosRecientes = [
  //   { id: "ORD-1234", fecha: "15 mayo, 2023", total: "$45.80", estado: "entregado" },
  //   { id: "ORD-1198", fecha: "2 mayo, 2023", total: "$32.50", estado: "entregado" },
  //   { id: "ORD-1056", fecha: "18 abril, 2023", total: "$67.20", estado: "entregado" },
  // ]
  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-muted-foreground">Cargando perfil...</p>
      </div>
    )
  }

  return (
    <div className="flex container mx-auto min-h-screen flex-col">

      <main className="flex-1 container py-8">
        <div className="flex items-center mb-6">
          <Button variant="ghost" size="sm" className="mr-2" onClick={() => navigate("/")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver al perfil
          </Button>
        </div>
        <div className="max-w-5xl mx-auto">
          {/* Tarjeta de perfil */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={"/placeholder.svg?height=40&width=40&text=1"} alt={nombre} />
                  <AvatarFallback>
                    <User className="h-12 w-12" />
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 text-center md:text-left">
                  <h1 className="text-2xl font-bold">{nombre}</h1>
                  <p className="text-muted-foreground">{userName}</p>
                  <p className="text-muted-foreground">{email}</p>
                  <p className="text-muted-foreground">{telefono}</p>

                  <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-3">
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      Miembro desde {usuario.miembro_desde}
                    </Badge>
                    <Badge variant="outline" className="flex items-center gap-1">
                      <ShoppingBag className="h-3 w-3" />
                      {totalPedidos} pedidos
                    </Badge>
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {reservas.length} reservas
                    </Badge>
                    <Badge className="bg-primary/10 text-primary">{usuario.nivel}</Badge>
                  </div>
                </div>

                <Button asChild className="md:self-start">
                  <Link to="/perfil/editar">
                    <Edit className="mr-2 h-4 w-4" />
                    Editar perfil
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Pestañas de actividad */}
          <Tabs defaultValue="pedidos" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="pedidos" className="flex items-center gap-2">
                <ShoppingBag className="h-4 w-4" />
                <span>Pedidos</span>
              </TabsTrigger>
              <TabsTrigger value="reservas" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>Reservas</span>
              </TabsTrigger>
            </TabsList>

            {/* Contenido de pedidos */}
            {/* <TabsContent value="pedidos">
              <Card>
                <CardHeader>
                  <CardTitle>Mis pedidos</CardTitle>
                  <CardDescription>Historial de tus pedidos recientes</CardDescription>
                </CardHeader>
                <CardContent>
                  {pedidos?.length > 0 ? (
                    <div className="space-y-4">
                      {pedidos?.map((pedido) => (
                        <div
                          key={pedido.id}
                          className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg border"
                        >
                          <div>
                            <div className="font-medium">{pedido.id}</div>
                            <div className="text-sm text-muted-foreground">{pedido.fecha}</div>
                          </div>
                          <div className="mt-2 sm:mt-0 flex items-center gap-4">
                            <div className="font-medium">{ }</div>
                            <Badge variant={pedido.idEstado === "entregado" ? "outline" : "default"}>
                              {pedido.estado}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6 text-muted-foreground">No tienes pedidos recientes</div>
                  )}
                </CardContent>
                {pedidosRecientes.length > 0 && (
                  <CardFooter className="flex justify-center border-t p-4">
                    <Button variant="outline">Ver todos los pedidos</Button>
                  </CardFooter>
                )}
              </Card>
            </TabsContent> */}

            {/* Contenido de reservas */}
            <TabsContent value="reservas">
              <Card>
                <CardHeader>
                  <CardTitle>Mis reservas</CardTitle>
                  <CardDescription>Historial de tus reservas en el restaurante</CardDescription>
                </CardHeader>
                <CardContent>
                  {reservas.length > 0 ? (
                    <div className="space-y-4">
                      {reservas.map((reserva, i) => (
                        <div
                          key={reserva.id}
                          className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg border"
                        >
                          <div>
                            <div className="font-medium">ID: {reserva.id}</div>
                            <div className="text-sm text-muted-foreground">
                              {reserva.fecha} · {reserva.hora} · {mesas[i]?.capacidad || 0} personas . Mesa {mesas[i]?.nro || 0}

                            </div>
                          </div>
                          <div className="mt-2 sm:mt-0">
                            <Badge
                              variant={
                                reserva.idEstado === 6 ? "destructive" :
                                  reserva.idEstado === 7 ? "default" :
                                    "outline"
                              }
                            >
                              {reserva.idEstado === 6 ? "cancelado" :
                                reserva.idEstado === 7 ? "completado" :
                                  "pendiente"}
                            </Badge>
                            {reserva.idEstado === 10 && (
                              <ModificarReserva
                                reserva={reserva}
                                idClienteWeb={id}
                                nroMesa={mesas[i]}
                              />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6 text-muted-foreground">No tienes reservas recientes</div>
                  )}
                </CardContent>
                {reservas.length > 0 && (
                  <CardFooter className="flex justify-center border-t p-4">
                    <Button variant="outline">Ver todas las reservas</Button>
                  </CardFooter>
                )}
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      {/* <UserFooter /> */}
    </div>
  )
}

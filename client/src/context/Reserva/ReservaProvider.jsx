import { buscarMesasDisponibles, crearReserva, eliminarReserva, mostrarReservasPorUsuario } from "@/api/cliente/reserva"
import { useEffect, useState } from "react"
import { editarReserva } from "@/api/cliente/reserva"
import { ReservaContext } from "./ReservaContext"
import { useAuth } from "../AuthContext"

export const ReservaProvider = ({ children }) => {
  const [mesas, setMesas] = useState([])
  const [mesasDisponibles, setMesasDisponibles] = useState([])
  const [refreshTrigger, setRefreshTrigger] = useState(0)
  const [reservas, setReservas] = useState([])
  const { user } = useAuth()
  const { id } = user?.user || {}




  useEffect(() => {
    if (id) {
      const reservasPorUsuario = async () => {
        try {
          const response = await mostrarReservasPorUsuario(id)
          if (!response) {
            throw new Error("No se encontraron reservas")
          }
          const mesasCliente = response.data.flatMap(res => res.Mesas.map(mesa => {
            return {
              id: mesa.id,
              nro: mesa.nro,
              capacidad: mesa.capacidad,
              idEstado: mesa.idEstado
            }
          }))
          setMesas(mesasCliente)
          setReservas(response.data)
        } catch (error) {
          console.error("Error al cargar las reservas:", error)
        }
      }
      reservasPorUsuario()
    }
  }, [id, refreshTrigger])

  const mostrarMesasDisponibles = async (fecha, hora) => {
    try {
      const response = await buscarMesasDisponibles(fecha, hora)
      if (!response) {
        throw new Error("No se encontraron mesas disponibles")
      }
      setMesasDisponibles(response.data)
    } catch (error) {
      console.error("Error al buscar mesas disponibles:", error)
    }
  }

  const crearReservas = async (input) => {
    try {
      const response = await crearReserva(input)
      if (!response) {
        throw new Error("No se pudo crear la reserva")
      }
      setReservas(response.data)
      return { msj: "Reserva creada exitosamente" }
    } catch (error) {
      console.error("Error al crear la reserva:", error)
    }
  }

  const EditarReserva = async (input) => {
    try {
      const response = await editarReserva(input)
      if (!response) {
        throw new Error("No se pudo editar la reserva")
      }
      setReservas(response.data)
      return { msj: "Reserva editada exitosamente" }
    } catch (error) {
      console.error("Error al editar la reserva:", error)
    }
  }

  const EliminarReserva = async (id, idMesa) => {
    try {
      const response = await eliminarReserva(id, idMesa)
      if (!response) {
        throw new Error("No se pudo eliminar la reserva")
      }
      setReservas(prevReservas => prevReservas.filter(reserva => reserva.id !== id))
    } catch (e) {
      console.error("Error al eliminar la reserva:", e)
    }
  }

  const refrescarDatos = () => setRefreshTrigger(prev => prev + 1);

  return (
    <ReservaContext.Provider value={{
      mesas,
      reservas,
      mesasDisponibles,
      mostrarMesasDisponibles,
      crearReservas,
      EditarReserva,
      EliminarReserva,
      refrescarDatos
    }}>
      {children}
    </ReservaContext.Provider>
  )
}

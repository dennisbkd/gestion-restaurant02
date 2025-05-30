import { Router } from 'express'
import { ControladorReservas } from '../controllers/reservas.js'

export const crearRutasReservas = ({ modeloReserva }) => {
  const router = Router()
  const controlador = new ControladorReservas({ modeloReserva })

  router.post('/crear', controlador.crearReserva)
  router.put('/editar', controlador.editarReserva)
  router.put('/eliminar/:id', controlador.eliminarReserva)
  router.get('/mostrar', controlador.mostrarReservas)
  router.get('/mostrar/:idClienteWeb', controlador.mostrarReservasClienteWeb)
  router.post('/mesas', controlador.mostrarMesasDisponibles)

  return router
}

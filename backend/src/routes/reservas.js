import { Router } from 'express'
import { ControladorReservas } from '../controllers/reservas.js'

export const crearRutasReservas = ({ modeloReserva }) => {
  const router = Router()
  const controlador = new ControladorReservas({ modeloReserva })

  router.post('/crear/:id', controlador.crearReserva)
  router.put('/editar/:id', controlador.editarReserva)
  router.delete('/eliminar', controlador.eliminarReserva)
  router.get('/mostrar', controlador.mostrarReservas)
  router.post('/mostrarPorFechas', controlador.mostrarReservasFecha)

  return router
}

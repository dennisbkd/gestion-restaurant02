import { Router } from 'express';
import { ControladorReservas } from '../controllers/reservas.js';

export const crearRutasReservas = ({ modeloReserva }) => {
  const router = Router();
  const controlador = new ControladorReservas({ modeloReserva });

  router.post('/crear', controlador.crearReserva);
  router.put('/editar', controlador.editarReserva);
  router.delete('/eliminar/:id', controlador.eliminarReserva);
  router.get('/mostrar', controlador.mostrarReservas);
  router.get('/mostrar/:nombre', controlador.mostrarReservasNombre);

  return router;
};

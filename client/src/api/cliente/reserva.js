import instancia from "../axios";

export const crearReserva = (input) => {
  return instancia.post('/reservas/crear',  input );
}

export const mostrarReservasPorUsuario = (idClienteWeb) => {
  return instancia.get(`/reservas/mostrar/${idClienteWeb}`);
}

export const editarReserva = (input) => {
  return instancia.put('/reservas/editar', input);
}

export const eliminarReserva = (id, idMesa) => {
  return instancia.put(`/reservas/eliminar/${id}`, { idMesa });
}

export const buscarMesasDisponibles = (fecha, hora) => {
  return instancia.post('/reservas/mesas', { fecha, hora });
}

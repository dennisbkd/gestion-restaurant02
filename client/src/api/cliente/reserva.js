import instancia from "../axios";

export const crearReserva = (input) => {
  return instancia.post('/reservas/crear',  input );
}

export const buscarMesasDisponibles = (fecha, hora) => {
  return instancia.post('/reservas/mesas', { fecha, hora });
}

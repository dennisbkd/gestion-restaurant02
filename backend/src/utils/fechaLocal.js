export const obtenerFechaBolivia = (fecha) => {
  const opciones = { timeZone: 'America/La_Paz', hour12: false }
  const fechaBolivia = new Date(fecha).toLocaleString('es-BO', opciones)
  return fechaBolivia
}

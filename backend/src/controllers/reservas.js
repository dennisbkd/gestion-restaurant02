export class ControladorReservas {
  constructor({ modeloReserva }) {
    this.modeloReserva = modeloReserva;
  }
// Registrar Reserva
  crearReserva = async (req, res) => {
    try {
      const reserva = await this.modeloReserva.crearReserva({ input: req.body });
      if (reserva.error) return res.status(400).json({ error: reserva.error });
      return res.status(201).json(reserva);
    } catch (error) {
      return res.status(500).json({ error: 'Error interno del servidor' });
    }
  }
//Actualizar Reserva
  editarReserva = async (req, res) => {
    try {
      const reserva = await this.modeloReserva.editarReserva({ input: req.body });
      if (reserva.error) return res.status(400).json({ error: reserva.error });
      return res.status(200).json(reserva);
    } catch (error) {
      return res.status(500).json({ error: 'Error interno del servidor' });
    }
  }
//Cancelar Reserva
  eliminarReserva = async (req, res) => {
    try {
      const { id } = req.params;
      if (!id) return res.status(400).json({ error: 'ID de reserva no proporcionado' });
      const reserva = await this.modeloReserva.eliminarReserva(id);
      if (reserva.error) return res.status(400).json({ error: reserva.error });
      return res.status(200).json(reserva);
    } catch (error) {
      return res.status(500).json({ error: 'Error interno del servidor' });
    }
  }

  mostrarReservas = async (req, res) => {
    try {
      const reservas = await this.modeloReserva.mostrarReservas();
      if (reservas.error) return res.status(400).json({ error: reservas.error });
      return res.status(200).json(reservas);
    } catch (error) {
      return res.status(500).json({ error: 'Error interno del servidor' });
    }
  }
//mostrar Reserva por Nombre
mostrarReservasNombre = async (req, res) => {
  try {
    const { nombre } = req.params;
    if (!nombre) return res.status(400).json({ error: 'Nombre no proporcionado' });
    const reservas = await this.modeloReserva.mostrarReservasNombre(nombre);
    if (reservas.error) return res.status(400).json({ error: reservas.error });
    return res.status(200).json(reservas);
  } catch (error) {
    console.error('Error en mostrarReservasNombre:', error);
    return res.status(500).json({ error: error.message || 'Error interno del servidor' });
  }
}

}

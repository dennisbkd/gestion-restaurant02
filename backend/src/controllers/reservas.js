export class ControladorReservas {
  constructor ({ modeloReserva }) {
    this.modeloReserva = modeloReserva
  }

  // Registrar Reserva
crearReserva = async (req, res) => {
  try {
    const { id } = req.params
    const reserva = await this.modeloReserva.crearReserva(id , { input: req.body })

    if (reserva.error) return res.status(400).json({ error: reserva.error })
    return res.status(201).json(reserva)
  } catch (error) {
    return res.status(500).json({ error: 'Error interno del servidor' })
  }
}

  // Actualizar Reserva
  editarReserva = async (req, res) => {
    try {
      const  { id } = req.params
      const reserva = await this.modeloReserva.editarReserva(id , { input: req.body })
      if (reserva.error) return res.status(400).json({ error: reserva.error })
      return res.status(200).json(reserva)
    } catch (error) {
      return res.status(500).json({ error: 'Error interno del servidor' })
    }
  }

  // Cancelar Reserva
  eliminarReserva = async (req, res) => {
    try {
      const  { id } = req.body
      const reserva = await this.modeloReserva.eliminarReserva(id)
      if (reserva.error) return res.status(400).json({ error: reserva.error })
      return res.status(200).json(reserva)
    } catch (error) {
      return res.status(500).json({ error: 'Error interno del servidor' })
    }
  }

  // Mostrar todas las reservas
  mostrarReservas = async (req, res) => {
    try {
      const reservas = await this.modeloReserva.mostrarReservas()
      if (reservas.error) return res.status(400).json({ error: reservas.error })
      return res.status(200).json(reservas)
    } catch (error) {
      return res.status(500).json({ error: 'Error interno del servidor' })
    }
  }

  // mostrar Reserva por fecha
  mostrarReservasFecha = async (req, res) => {
    try {
      const { fecha } = req.body
      const reservas = await this.modeloReserva.mostrarReservasFecha(fecha)
      if (reservas.error) return res.status(400).json({ error: reservas.error })
      return res.status(200).json(reservas)
    } catch (error) {
      return res.status(500).json({ error: error.message || 'Error interno del servidor' })
    }
  }
}

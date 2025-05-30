import { extraerUsuarioDesdeToken } from '../utils/extraerUsuarioDesdeToken.js'
export class ControladorReservas {
  constructor ({ modeloReserva, modeloBitacora }) {
    this.modeloReserva = modeloReserva
    this.ModeloBitacora = modeloBitacora
  }

  // Registrar Reserva
  crearReserva = async (req, res) => {
    try {
      const reserva = await this.modeloReserva.crearReserva({ input: req.body })
      if (reserva.error) return res.status(400).json({ error: reserva.error })
      const autor = extraerUsuarioDesdeToken(req)
      if (autor) {
        await this.ModeloBitacora.registrarBitacora({
          usuario: autor,
          accion: 'Registrar Reserva',
          descripcion: 'Registró una reserva',
          ip: req.ip.replace('::ffff:', '')
        })
      }
      return res.status(201).json(reserva)
    } catch (error) {
      return res.status(500).json({ error: 'Error interno del servidor' })
    }
  }

  // Actualizar Reserva
  editarReserva = async (req, res) => {
    const reserva = await this.modeloReserva.editarReserva({ input: req.body })
    if (reserva.error) return res.status(400).json({ error: reserva.error })
    const autor = extraerUsuarioDesdeToken(req)
    if (autor) {
      await this.ModeloBitacora.registrarBitacora({
        usuario: autor,
        accion: 'Editar Reserva',
        descripcion: 'Editó la reserva con id : ' + req.body.id,
        ip: req.ip.replace('::ffff:', '')
      })
    }
    return res.status(200).json(reserva)
  }

  // Cancelar Reserva
  eliminarReserva = async (req, res) => {
    if (!req.params.id) return res.status(400).json({ error: 'ID de reserva no proporcionado' })
    const reserva = await this.modeloReserva.eliminarReserva({ id: req.params.id, idMesa: req.body.idMesa })
    if (reserva.error) return res.status(400).json({ error: reserva.error })
    const autor = extraerUsuarioDesdeToken(req)
    if (autor) {
      await this.ModeloBitacora.registrarBitacora({
        usuario: autor,
        accion: 'Cancelar Reserva',
        descripcion: 'Canceló la reserva con id : ' + req.params.id,
        ip: req.ip.replace('::ffff:', '')
      })
    }
    return res.status(200).json(reserva.mensaje)
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

  // mostrar Reserva por Cliente Web
  mostrarReservasClienteWeb = async (req, res) => {
    const { idClienteWeb } = req.params
    if (!idClienteWeb) return res.status(400).json({ error: 'ID de cliente no proporcionado' })
    const reservas = await this.modeloReserva.mostrarReservasClienteWeb({ idClienteWeb })
    if (reservas.error) return res.status(400).json({ error: reservas.error })
    return res.status(200).json(reservas)
  }

  mostrarMesasDisponibles = async (req, res) => {
    try {
      const { fecha, hora } = req.body
      if (!fecha || !hora) return res.status(400).json({ error: 'Fecha y hora no proporcionadas' })
      const mesas = await this.modeloReserva.mostrarMesasDisponibles(fecha, hora)
      if (mesas.error) return res.status(400).json({ error: mesas.error })
      return res.status(200).json(mesas)
    } catch (error) {
      console.error('Error en mostrarMesasDisponibles:', error)
      return res.status(500).json({ error: error.message || 'Error interno del servidor' })
    }
  }
}

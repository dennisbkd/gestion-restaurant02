import sequelize from '../config/db/config.js'
import { definicionMesa } from '../services/pedido.js'
import { definicionReserva, definicionReservaMesas } from '../services/reservas.js'

export class ModeloReserva {
  static Reserva = sequelize.define('Reserva', definicionReserva, {
    timestamps: false,
    freezeTableName: true
  })

  static Mesa = sequelize.define('Mesa', definicionMesa, {
    timestamps: false,
    freezeTableName: true
  })

  static ReservaMesa = sequelize.define('MesasReserva', definicionReservaMesas, {
    timestamps: false,
    freezeTableName: true
  })

  static asociar = () => {
    this.Reserva.belongsToMany(this.Mesa, {
      through: this.ReservaMesa,
      foreignKey: 'idReserva',
      otherKey: 'idMesa'
    })

    this.Mesa.belongsToMany(this.Reserva, {
      through: this.ReservaMesa,
      foreignKey: 'idMesa',
      otherKey: 'idReserva'
    })
  }

  // Registrar Reserva
  static async crearReserva ({ input }) {
    const {
      fecha, hora, idEstado, idClienteWeb, idMesa: id
    } = input
    try {
      const nuevaReserva = await this.Reserva.create({
        fecha,
        hora,
        idClienteWeb,
        idEstado
      })
      await nuevaReserva.addMesa(id)
      return { message: 'Reserva Creada' }
    } catch (error) {
      throw new Error('Error al crear la reserva: ' + error.message)
    }
  }

  // Actualizar Reserva
  static async editarReserva ({ input }) {
    const {
      id, fecha, hora, idEstado, idClienteWeb, idMesa
    } = input
    try {
      const reserva = await this.Reserva.findByPk(id)
      if (!reserva) {
        return { error: 'Reserva no encontrada' }
      }
      reserva.id = id
      reserva.fecha = fecha
      reserva.hora = hora
      reserva.idEstado = idEstado
      reserva.idClienteWeb = idClienteWeb

      await reserva.save()

      // Actualizar mesas asociadas
      if (idMesa) {
        await reserva.setMesas(idMesa)
      }

      return reserva
    } catch (error) {
      throw new Error('Error al actualizar la reserva: ' + error.message)
    }
  }

  // Cancelar Reserva
  static async eliminarReserva ({ id, idMesa }) {
    try {
      const reserva = await this.Reserva.findByPk(id)
      if (!reserva) {
        return { error: 'Reserva no encontrada' }
      }
      reserva.idEstado = 6 // Cambiar estado a cancelada
      await reserva.removeMesas(idMesa) // Eliminar mesas asociadas
      await reserva.save()
      return { mensaje: 'Reserva cancelada correctamente' }
    } catch (error) {
      throw new Error('Error al cancelar la reserva: ' + error.message)
    }
  }

  // Mostrar todas las reservas
  static async mostrarReservas () {
    try {
      const reservas = await sequelize.query(
        'EXEC get_Reservas',
        { type: sequelize.QueryTypes.SELECT }
      )
      return { reservas }
    } catch (error) {
      throw new Error('Error al obtener reservas: ' + error.message)
    }
  }

  // Mostrar reservas por cliente web
  static async mostrarReservasClienteWeb ({ idClienteWeb }) {
    try {
      const reservasCliente = await this.Reserva.findAll({
        where: { idClienteWeb },
        include: [{
          model: this.Mesa
        }],
        order: [['fecha', 'DESC'], ['hora', 'DESC']]
      })
      if (reservasCliente.length === 0) {
        return { error: 'No se encontraron reservas para este cliente' }
      }
      return reservasCliente
    } catch (error) {
      throw new Error('Error al obtener reservas por cliente: ' + error.message)
    }
  }

  static async mostrarMesasDisponibles (fecha, hora) {
    try {
      return await sequelize.query(`
      SELECT m.id, m.nro, m.capacidad, m.idEstado
      FROM Mesa m
      WHERE m.idEstado = 12
      AND m.id NOT IN (
        SELECT mr.idMesa
        FROM MesasReserva mr
        JOIN Reserva r ON mr.idReserva = r.id
        WHERE r.fecha = '${fecha}'
        AND r.hora = '${hora}'
        AND r.idEstado = 10
      )
    `, {
        type: sequelize.QueryTypes.SELECT,
        model: this.Mesa,
        mapToModel: true
      })
    } catch (error) {
      console.error('Error al obtener mesas disponibles:', error)
      throw error
    }
  }
}
ModeloReserva.asociar()

import sequelize from '../config/db/config.js'
import { definicionReserva,definicionMesa,mesasReserva } from '../services/reservas.js'
import { definicionEstado } from '../services/pedido.js'

export class ModeloReserva {
  static Reserva = sequelize.define('Reserva', definicionReserva, {
    timestamps: false,
    freezeTableName: true
  })

  static Mesa = sequelize.define('Mesa', definicionMesa, {
    timestamps: false,
    freezeTableName: true
  })

  static MesasReservas = sequelize.define('MesasReserva', mesasReserva, {
    timestamps: false,
    freezeTableName: true
  })

  static Estado = sequelize.define('Estado', definicionEstado, {
    timestamps: false,
    freezeTableName: true
  })

  // Asociaciones
  static asociar () {
    this.Reserva.belongsTo(this.Estado, { foreignKey: 'idEstado' })
    this.Estado.hasMany(this.Reserva, { foreignKey: 'idEstado' })

    this.Reserva.belongsToMany(this.Mesa, {
      through: this.MesasReservas,
      foreignKey: 'idReserva',
      otherKey: 'idMesa'
    })

    this.Mesa.belongsToMany(this.Reserva, {
      through: this.MesasReservas,
      foreignKey: 'idMesa',
      otherKey: 'idReserva'
    })
  }

  // Crear reserva
 static async crearReserva(id, { input }) {
  try {
    const { fecha, hora, idMesas } = input

    const estado = await this.Estado.findOne({
      where: { descripcion: 'No disponible' }
    })

    const nuevaReserva = await this.Reserva.create({
      fecha,
      hora,
      idClienteWeb: id,
      idEstado: estado.id
    })

    for (const { id } of idMesas) {
      await this.MesasReservas.create({
        idReserva: nuevaReserva.id,
        idMesa: id
      })
    }

    return {
      mensaje: 'Reserva creada correctamente',
      reserva: nuevaReserva
    }
  } catch (error) {
    throw new Error('Error al crear reserva: ' + error.message)
  }
}


  // Editar reserva
  static async editarReserva(id, { input }) {
  try {
    const { idReserva, fecha, hora, idMesas } = input

    const reserva = await this.Reserva.findByPk(idReserva)
    if (!reserva) return { error: 'Reserva no encontrada' }

    const estado = await this.Estado.findOne({
      where: { descripcion: 'No disponible' }
    })

    await reserva.update({
      fecha,
      hora,
      idClienteWeb:id,
      idEstado: estado.id
    })

    await this.MesasReservas.destroy({ where: { idReserva } })

    for (const  idMesa  of idMesas) {
      await this.MesasReservas.create({
        idReserva: idReserva,
        idMesa: idMesa.id
      })
    }

    return {
      mensaje: 'Reserva actualizada correctamente',
      reserva
    }
  } catch (error) {
    throw new Error('Error al editar reserva: ' + error.message)
  }
}


  // Eliminar reserva
  static async eliminarReserva (id) {
    try {
      const reserva = await this.Reserva.findByPk(id)
      if (!reserva) return { error: 'Reserva no encontrada' }

      const estado = await this.Estado.findOne({
      where: { descripcion: 'cancelado' }
    })

      await reserva.update({ idEstado: estado.id })

      return { mensaje: 'Reserva eliminada correctamente' }
    } catch (error) {
      throw new Error('Error al eliminar reserva: ' + error.message)
    }
  }

  // Mostrar todas las reservas
  static async mostrarReservas () {
    try {
      const reservas = await this.Reserva.findAll({
        include: [
          { model: this.Mesa, through: { attributes: [] } },
          { model: this.Estado }
        ]
      })
      return { reservas }
    } catch (error) {
      throw new Error('Error al obtener reservas: ' + error.message)
    }
  }

  // Buscar por nombre 
  static async mostrarReservasFecha (fecha) {
    try {
      const reservas = await sequelize.query(
        `SELECT * FROM Reserva WHERE fecha = :fecha`,
        {
          replacements: { fecha },
          type: sequelize.QueryTypes.SELECT
        }
      )
      return { reservas }
    } catch (error) {
      throw new Error('Error al buscar reservas por nombre: ' + error.message)
    }
  }
}
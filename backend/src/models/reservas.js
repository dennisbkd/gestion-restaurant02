import sequelize from '../config/db/config.js'
import { definicionMesa } from '../services/pedido.js'
import { definicionReserva } from '../services/reservas.js'
import { obtenerFechaBolivia } from '../utils/fechaLocal.js'

export class ModeloReserva {
  static Reserva = sequelize.define('Reserva', definicionReserva, {
    timestamps: false,
    freezeTableName: true
  })

  static Mesa = sequelize.define('Mesa', definicionMesa, {
    timestamps: false,
    freezeTableName: true
  })

  static asociar = () => {
    this.Reserva.belongsToMany(this.Mesa, {
      through: 'ReservasMesas',
      foreignKey: 'idReserva',
      otherKey: 'idMesa'
    })

    this.Mesa.belongsToMany(this.Reserva, {
      through: 'ReservasMesas',
      foreignKey: 'idMesa',
      otherKey: 'idReserva'
    })
  }

  // Registrar Reserva
  static async crearReserva ({ input }) {
    const {
      fecha, hora, idEstado, idClienteWeb,
      Mesa: { nro, capacidad, idEstadoMesa }
    } = input

    try {
      const nuevaReserva = await this.Reserva.create({
        fecha: obtenerFechaBolivia(fecha),
        hora,
        idClienteWeb,
        idEstado
      })
      const nuevaMesa = await this.Mesa.create({
        nro,
        capacidad,
        idEstado: idEstadoMesa
      })
    } catch (error) {
      throw new Error('Error al crear la reserva: ' + error.message)
    }
  }

  // Actualizar Reserva
  static async editarReserva ({ input }) {
    const { id, fecha, hora, idClienteWeb, idEstado } = input

    if (!id) {
      throw new Error('Se requiere el ID de la reserva para editar')
    }

    try {
      const result = await sequelize.query(
        `DECLARE @mensaje VARCHAR(200);
         EXEC set_ActualizarReserva 
           @id = :id, 
           @fecha = :fecha, 
           @hora = :hora, 
           @id_Cliente = :idClienteWeb, 
           @id_Estado = :idEstado, 
           @mensaje = @mensaje OUTPUT;
         SELECT @mensaje AS mensaje;`,
        {
          replacements: { id, fecha, hora, idClienteWeb, idEstado },
          type: sequelize.QueryTypes.SELECT
        }
      )

      const mensaje = result[0]?.mensaje || 'Sin mensaje'
      if (mensaje.includes('No se encontró')) {
        return { error: mensaje }
      }

      return { reserva: { id, fecha, hora, idClienteWeb, idEstado }, mensaje }
    } catch (error) {
      throw new Error('Error al editar la reserva: ' + error.message)
    }
  }

  // Cancelar Reserva
  static async eliminarReserva (id) {
    try {
      const result = await sequelize.query(
        `DECLARE @mensaje VARCHAR(200);
         EXEC set_CancelarReserva 
           @id = :id, 
           @mensaje = @mensaje OUTPUT;
         SELECT @mensaje AS mensaje;`,
        {
          replacements: { id },
          type: sequelize.QueryTypes.SELECT
        }
      )

      const mensaje = result[0]?.mensaje || 'Sin mensaje'
      if (mensaje.includes('No se encontró')) {
        return { error: mensaje }
      }

      return { mensaje }
    } catch (error) {
      return {
        error: 'Error al cancelar la reserva',
        detalles: error.message
      }
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

  // Mostrar reservas por nombre
  static async mostrarReservasNombre (nombre) {
    try {
      const reservas = await sequelize.query(
        'EXEC get_MostrarReservasNombre @nombre = :nombre',
        {
          replacements: { nombre },
          type: sequelize.QueryTypes.SELECT
        }
      )

      const zonaHoraria = 'America/La_Paz' // Puedes cambiarla según tu país

      const reserva = reservas.map(r => ({
        ...r,
        hora: r.hora instanceof Date
          ? r.hora.toLocaleTimeString('es-BO', {
            timeZone: zonaHoraria,
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
          })
          : r.hora,
        fecha: r.fecha instanceof Date
          ? r.fecha.toLocaleDateString('es-BO', {
            timeZone: zonaHoraria
          })
          : r.fecha
      }))

      return { reserva }
    } catch (error) {
      throw new Error('Error al obtener reservas por nombre: ' + error.message)
    }
  }
}
ModeloReserva.asociar()

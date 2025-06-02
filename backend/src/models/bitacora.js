import sequelize from '../config/db/config.js'
import { definicionBitacora } from '../services/bitacora.js'

export class ModeloBitacora {
  static Bitacora = sequelize.define('Bitacora', definicionBitacora, {
    timestamps: false,
    freezeTableName: true
  })

  // Registrar Bitácora
  static async registrarBitacora ({ usuario, accion, descripcion, ip }) {
    try {
      await sequelize.query(
        'EXEC registrarBitacora @usuario = :usuario, @accion = :accion, @descripcion = :descripcion, @ip = :ip',
        {
          replacements: { usuario, accion, descripcion, ip: ip.replace('::ffff:', '') }
        }
      )
      return { mensaje: 'Registro de bitácora exitoso' }
    } catch (error) {
      return {
        error: 'Error al registrar la bitácora',
        detalles: error.message
      }
    }
  }
}

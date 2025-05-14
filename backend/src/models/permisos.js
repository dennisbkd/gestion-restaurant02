import  sequelize  from '../config/db/config.js';
import { definicionPermiso } from '../services/permisos.js';

export class ModeloPermiso {

    static Permiso = sequelize.define('Permisos', definicionPermiso, {
        timestamps: false,
        freezeTableName: true
    })

  // Crear un nuevo permiso
  static async crearPermiso({ input }) {
    const { descripcion } = input;
    try {
      const [result] = await sequelize.query(
        'DECLARE @newID INT, @mensaje VARCHAR(200); ' +
        'EXEC p_CrearPermiso @descripcion = :descripcion, @newID = @newID OUTPUT, @mensaje = @mensaje OUTPUT; ' +
        'SELECT @newID AS newID, @mensaje AS mensaje;',
        {
          replacements: { descripcion },
          type: sequelize.QueryTypes.SELECT
        }
      );

      if (result.newID === -1) {
        return { error: result.mensaje };
      }

      return {
        permiso: {
          id: result.newID,
          descripcion
        },
        mensaje: result.mensaje
      };
    } catch (error) {
      console.error('Error detallado:', error); // Para debug
      return {
        error: 'Error al crear el permiso',
        detalles: error.message
      };
    }
}

  // Editar o actualizar un permiso 
  static async editarPermiso({ input }) {
    const { idPermiso, newDescripcion } = input;
    try {
      const [result] = await sequelize.query(
        'EXEC p_EditarPermiso @idPermiso = :idPermiso, @newDescripcion = :newDescripcion, @mensaje = OUTPUT',
        {
          replacements: { idPermiso, newDescripcion },
          type: sequelize.QueryTypes.SELECT
        }
      );

      if (result.mensaje.includes('Error') || result.mensaje.includes('No existe')) {
        return { error: result.mensaje };
      }

      return {
        permiso: {
          id: idPermiso,
          descripcion: newDescripcion
        },
        mensaje: result.mensaje
      };
    } catch (error) {
      return {
        error: 'Error al editar el permiso',
        detalles: error.message
      };
    }
  }

  // Eliminar un permiso
  static async eliminarPermiso(idPermiso) {
    try {
      const [result] = await sequelize.query(
        'EXEC p_EliminarPermiso @idPermiso = :idPermiso, @mensaje = OUTPUT',
        {
          replacements: { idPermiso },
          type: sequelize.QueryTypes.SELECT
        }
      );

      if (result.mensaje.includes('Error') || result.mensaje.includes('No existe')) {
        return { error: result.mensaje };
      }

      return {
        mensaje: result.mensaje,
        idPermiso
      };
    } catch (error) {
      return {
        error: 'Error al eliminar el permiso',
        detalles: error.message
      };
    }
  }

}
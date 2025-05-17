import sequelize from '../config/db/config.js'
import { definicionPermiso } from '../services/permisos.js'

export class ModeloPermiso {
  static Permiso = sequelize.define('Permisos', definicionPermiso, {
    timestamps: false,
    freezeTableName: true
  })

  // Crear un nuevo permiso
  static async crearPermiso ({ input }) {
    const { descripcion } = input
    try {
      const [resultado] = await sequelize.query(
        'DECLARE @newID INT, @mensaje VARCHAR(200); ' +
      'EXEC p_CrearPermiso @descripcion = :descripcion, @newID = @newID OUTPUT, @mensaje = @mensaje OUTPUT; ' +
      'SELECT @newID AS newID, @mensaje AS mensaje;',
        {
          replacements: { descripcion },
          type: sequelize.QueryTypes.SELECT
        }
      )

      if (resultado.newID === -1) {
        return { error: resultado.mensaje }
      }

      return {
        permiso: {
          id: resultado.newID,
          descripcion
        },
        mensaje: resultado.mensaje
      }
    } catch (error) {
      console.error('Error detallado:', error)
      return {
        error: 'Error al crear el permiso',
        detalles: error.message
      }
    }
  }

  // Editar o actualizar un permiso
  static async editarPermiso ({ input }) {
    const { idPermiso, newDescripcion } = input
    try {
      const [resultado] = await sequelize.query(
      `DECLARE @mensaje VARCHAR(200);
       EXEC p_EditarPermiso 
          @idPermiso = :idPermiso, 
          @newDescripcion = :newDescripcion, 
          @mensaje = @mensaje OUTPUT;
       SELECT @mensaje AS mensaje;`,
      {
        replacements: {
          idPermiso,
          newDescripcion
        },
        type: sequelize.QueryTypes.SELECT
      }
      )

      if (resultado.mensaje.includes('Error') || resultado.mensaje.includes('No existe')) {
        return { error: resultado.mensaje }
      }

      return {
        permiso: {
          id: idPermiso,
          descripcion: newDescripcion
        },
        mensaje: resultado.mensaje
      }
    } catch (error) {
      return {
        error: 'Error al editar el permiso',
        detalles: error.message
      }
    }
  }

  // Eliminar un permiso
  static async eliminarPermiso (id) {
    try {
      const result = await sequelize.query(
      `DECLARE @mensaje VARCHAR(200);
       EXEC p_EliminarPermiso @idPermiso = :idPermiso, @mensaje = @mensaje OUTPUT;
       SELECT @mensaje AS mensaje;`,
      {
        replacements: { idPermiso: Number(id) },
        type: sequelize.QueryTypes.SELECT
      }
      )

      const mensaje = result[result.length - 1].mensaje

      return { message: mensaje }
    } catch (error) {
      return {
        error: 'Error al eliminar el permiso',
        detalles: error.message
      }
    }
  }

  // Asignar un permiso a un rol
  static async asignarPermiso (input) {
    const { idRol, idPermiso } = input
    try {
      const [resultado] = await sequelize.query(
        `DECLARE @mensaje VARCHAR(200);
         EXEC set_AsignarPermiso 
            @idRol = :idRol, 
            @idPermiso = :idPermiso, 
            @mensaje = @mensaje OUTPUT;
         SELECT @mensaje AS mensaje;`,
        {
          replacements: { idRol, idPermiso },
          type: sequelize.QueryTypes.SELECT
        }
      )

      if (resultado.mensaje.includes('Error') || resultado.mensaje.includes('No existe')) {
        return { error: resultado.mensaje }
      }

      return {
        mensaje: resultado.mensaje
      }
    } catch (error) {
      return {
        error: 'Error al asignar el permiso',
        detalles: error.message
      }
    }
  }
}

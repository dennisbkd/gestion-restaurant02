import sequelize from "../config/db/config.js";
import { definicionRol } from '../services/roles.js';


export class ModeloRol {
  static Rol = sequelize.define('Rol', definicionRol, {
    timestamps: false,
    freezeTableName: true
  })

  // Crear un nuevo rol
  static async crearRol({ input }) {
    const { nombre } = input;
    try {
        // Corrección: Usar la sintaxis correcta para OUTPUT parameters
        const [result] = await sequelize.query(
            'DECLARE @newID INT, @mensaje VARCHAR(200); ' +
            'EXEC p_CrearRol @nombreRol = :nombre, @newID = @newID OUTPUT, @mensaje = @mensaje OUTPUT; ' +
            'SELECT @newID AS newID, @mensaje AS mensaje;',
            {
                replacements: { nombre },
                type: sequelize.QueryTypes.SELECT
            }
        );

        if (result.newID === -1) {
            return { error: result.mensaje };
        }

        return {
            rol: {
                id: result.newID,
                nombre: nombre
            },
            mensaje: result.mensaje
        };
    } catch (error) {
        throw new Error('Error al crear el rol: ' + error.message);
    }
}

  // Editar un rol 
  static async editarRol({ input }) {
    const { oldRol, newRol } = input
    try {
      const [result] = await sequelize.query(
        'EXEC p_EditarRol @oldRol = :oldRol, @newRol = :newRol, @mensaje = OUTPUT',
        {
          replacements: { oldRol, newRol },
          type: sequelize.QueryTypes.SELECT
        }
      )

      if (result.mensaje.includes('Error') || result.mensaje.includes('No existe')) {
        return { error: result.mensaje }
      }

      return {
        rol: {
          oldRol,
          newRol
        },
        mensaje: result.mensaje
      }
    } catch (error) {
      throw new Error('Error al editar el rol: ' + error.message)
    }
  }

  // Eliminar un rol
  static async eliminarRol({ id }) {
    try {
      const [rol] = await sequelize.query(
        'SELECT nombre FROM Rol WHERE id = :id',
        {
          replacements: { id },
          type: sequelize.QueryTypes.SELECT
        }
      )

      if (!rol) {
        return { error: 'Rol no encontrado' }
      }

      const [result] = await sequelize.query(
        'EXEC p_EliminarRol @nombreRol = :nombreRol, @mensaje = OUTPUT',
        {
          replacements: { nombreRol: rol.nombre },
          type: sequelize.QueryTypes.SELECT
        }
      )

      if (result.mensaje.includes('Error') || result.mensaje.includes('No existe')) {
        return { error: result.mensaje }
      }

      return {
        mensaje: result.mensaje
      }
    } catch (error) {
      throw new Error('Error al eliminar el rol: ' + error.message)
    }
  }

  // Mostrar roles y permisos
  static async mostrarRolesYPermisos() {
    try {
      const rolesYPermisos = await sequelize.query(
        'EXEC p_MostrarRolesYPermisos',
        {
          type: sequelize.QueryTypes.SELECT
        }
      )

      const roles = {}
      rolesYPermisos.forEach(row => {
        if (!roles[row.idRol]) {
          roles[row.idRol] = {
            id: row.idRol,
            nombre: row.nombreRol,
            permisos: []
          }
        }
        roles[row.idRol].permisos.push({
          descripcion: row.descripcionPermiso
        })
      })

      return {
        roles: Object.values(roles)
      }
    } catch (error) {
      throw new Error('Error al obtener roles y permisos: ' + error.message)
    }
  }

  // Asignar permiso a rol
  static async asignarPermisoARol({ idRol, idPermiso }) {
    try {
      const [result] = await sequelize.query(
        'EXEC p_AsignarPermisoARol @idRol = :idRol, @idPermiso = :idPermiso, @mensaje = OUTPUT',
        {
          replacements: { idRol, idPermiso },
          type: sequelize.QueryTypes.SELECT
        }
      )

      if (result.mensaje.includes('Error') || result.mensaje.includes('No existe')) {
        return { error: result.mensaje }
      }

      return {
        mensaje: result.mensaje
      }
    } catch (error) {
      throw new Error('Error al asignar permiso: ' + error.message)
    }
  }

  // Obtener permisos de un rol
  static async obtenerPermisosDeRol({ idRol }) {
    try {
      const permisos = await sequelize.query(
        'EXEC p_ObtenerPermisosDeRol @idRol = :idRol',
        {
          replacements: { idRol },
          type: sequelize.QueryTypes.SELECT
        }
      )

      return {
        permisos
      }
    } catch (error) {
      throw new Error('Error al obtener permisos del rol: ' + error.message)
    }
  }
}
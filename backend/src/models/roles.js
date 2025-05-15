import sequelize from '../config/db/config.js'
import { definicionRol } from '../services/roles.js'

export class ModeloRol {
  static Rol = sequelize.define('Rol', definicionRol, {
    timestamps: false,
    freezeTableName: true
  })

  // Crear un nuevo rol
  static async crearRol ({ input }) {
    const { nombre } = input
    try {
      const [result] = await sequelize.query(
        'DECLARE @newID INT, @mensaje VARCHAR(200); ' +
            'EXEC p_CrearRol @nombreRol = :nombre, @newID = @newID OUTPUT, @mensaje = @mensaje OUTPUT; ' +
            'SELECT @newID AS newID, @mensaje AS mensaje;',
        {
          replacements: { nombre },
          type: sequelize.QueryTypes.SELECT
        }
      )

      if (result.newID === -1) {
        return { error: result.mensaje }
      }

      return {
        rol: {
          id: result.newID,
          nombre
        },
        mensaje: result.mensaje
      }
    } catch (error) {
      throw new Error('Error al crear el rol: ' + error.message)
    }
  }

  // Editar un rol
  static async editarRol ({ input }) {
    const { oldRol, newRol } = input

    // Validación
    if (!oldRol || !newRol) {
      throw new Error('Se requieren oldRol y newRol')
    }

    try {
      const [result] = await sequelize.query(
            `DECLARE @mensaje VARCHAR(200);
             EXEC p_EditarRol @oldRol = :oldRol, @newRol = :newRol, @mensaje = @mensaje OUTPUT;
             SELECT @mensaje AS mensaje;`,
            {
              replacements: { oldRol, newRol },
              type: sequelize.QueryTypes.SELECT
            }
      )

      if (result.mensaje.includes('Error') || result.mensaje.includes('No existe')) {
        return { error: result.mensaje }
      }

      return {
        rol: { oldRol, newRol },
        mensaje: result.mensaje
      }
    } catch (error) {
      throw new Error('Error al editar el rol: ' + error.message)
    }
  }

  // Función para eliminar (marcar como no disponible) un rol
  static eliminarRol = async (nombreRol) => {
    try {
      // Asumimos que el estado de los roles está representado por una columna, por ejemplo 'idEstado'
      const updated = await this.Rol.update(
        { idEstado: 13 }, // "No disponible" o el valor de estado que utilices
        { where: { nombre: nombreRol } }
      )

      if (updated[0] === 0) {
        return { error: `No se encontró un rol con nombre ${nombreRol}` }
      }

      return { message: `Rol con nombre ${nombreRol} marcado como no disponible` }
    } catch (error) {
      return {
        error: 'Error al eliminar el rol',
        detalles: error.message
      }
    }
  }

  // Mostrar roles y permisos
  static async mostrarRolesYPermisos () {
    try {
      const rolesYPermisos = await sequelize.query(
        'EXEC p_MostrarRolesYPermisos',
        { type: sequelize.QueryTypes.SELECT }
      )

      // Procesamiento más seguro
      const rolesMap = new Map()

      rolesYPermisos.forEach(row => {
        if (!rolesMap.has(row.idRol)) {
          rolesMap.set(row.idRol, {
            id: row.idRol,
            nombre: row.nombreRol,
            permisos: []
          })
        }
        if (row.descripcionPermiso) {
          rolesMap.get(row.idRol).permisos.push({
            descripcion: row.descripcionPermiso
          })
        }
      })

      return {
        roles: Array.from(rolesMap.values())
      }
    } catch (error) {
      throw new Error('Error al obtener roles y permisos: ' + error.message)
    }
  }

  // Obtener permisos de un rol
  static async obtenerPermisosDeRol ({ idRol }) {
    // Validación
    if (!idRol || isNaN(idRol)) {
      throw new Error('ID de rol inválido')
    }

    try {
      const permisos = await sequelize.query(
        'EXEC p_ObtenerPermisosDeRol @idRol = :idRol',
        { replacements: { idRol }, type: sequelize.QueryTypes.SELECT }
      )

      return { permisos }
    } catch (error) {
      throw new Error('Error al obtener permisos del rol: ' + error.message)
    }
  }
}

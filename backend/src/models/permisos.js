import sequelize from '../config/db/config.js'
import { definicionPermiso, DetallePermiso } from '../services/rolesYPermiso.js'

export class ModeloPermiso {
  static Permiso = sequelize.define('Permisos', definicionPermiso, {
    timestamps: false,
    freezeTableName: true
  })
  static DetallePermiso = sequelize.define('DetallePermiso', DetallePermiso, {
    timestamps: false,
    freezeTableName: true
  })

  // Crear un nuevo permiso 
  static async crearPermiso ({ input }) {
    const { descripcion } = input
    try {
      const existe = await this.Permiso.findOne({ where: { descripcion } })
      if (existe) {
        return { error: 'Ya existe un permiso con esa descripción' }
      }

      const nuevoPermiso = await this.Permiso.create({ descripcion })

      return {
        permiso: {
          id: nuevoPermiso.id,
          descripcion: nuevoPermiso.descripcion
        },
        mensaje: 'Permiso creado correctamente'
      }
    } catch (error) {
      return {
        error: 'Error al crear el permiso',
        detalles: error.message
      }
    }
  }

  // Editar o actualizar un permiso sin procedimiento almacenado
  static async editarPermiso ({ input }) {
    const { idPermiso, newDescripcion } = input
    try {
      const permiso = await this.Permiso.findByPk(idPermiso)
      if (!permiso) {
        return { error: 'El permiso no existe' }
      }

      const existe = await this.Permiso.findOne({
        where: {
          descripcion: newDescripcion,
          id: { [sequelize.Sequelize.Op.ne]: idPermiso }
        }
      })

      if (existe) {
        return { error: 'Ya existe un permiso con esa descripción' }
      }

      permiso.descripcion = newDescripcion
      await permiso.save()

      return {
        permiso: {
          id: permiso.id,
          descripcion: permiso.descripcion
        },
        mensaje: 'Permiso actualizado correctamente'
      }
    } catch (error) {
      return {
        error: 'Error al editar el permiso',
        detalles: error.message
      }
    }
  }

  // Eliminar un permiso sin procedimiento almacenado
  static async eliminarPermiso (id) {
    try {
      const permiso = await this.Permiso.findByPk(id)
      if (!permiso) {
        return { error: 'El permiso no existe' }
      }

      await permiso.destroy()

      return { message: 'Permiso eliminado correctamente' }
    } catch (error) {
      return {
        error: 'Error al eliminar el permiso',
        detalles: error.message
      }
    }
  }

  // Asignar un permiso a un rol sin procedimiento almacenado
static async asignarPermiso({ input }) {
  const { idRol, idPermisos } = input;
  try {
    const existe = await this.DetallePermiso.findOne({
      where: { idRol, idPermisos }
    });

    if (existe) {
      return { mensaje: 'La relación permiso-rol ya existe' };
    }

    await this.DetallePermiso.create({ idRol, idPermisos });

    return { mensaje: 'Permiso asignado correctamente' };
  } catch (error) {
    return { error: 'Error al asignar el permiso', detalles: error.message };
  }
}

}

import sequelize from '../config/db/config.js'
import { definicionRol, definicionPermiso, DetallePermiso, definicionUsuario } from '../services/rolesYPermiso.js'
import { definicionEstado } from '../services/pedido.js'

export class ModeloRol {
  static Rol = sequelize.define('Rol', definicionRol, {
    timestamps: false,
    freezeTableName: true
  })

  static Permisos = sequelize.define('Permisos', definicionPermiso, {
    timestamps: false,
    freezeTableName: true
  })

  static DetallePermiso = sequelize.define('DetallePermiso', DetallePermiso, {
    timestamps: false,
    freezeTableName: true
  })

  static Usuario = sequelize.define('Usuario', definicionUsuario, {
    timestamps: false,
    freezeTableName: true
  })

  static Estado = sequelize.define('Estado', definicionEstado, {
    timestamps: false,
    freezeTableName: true
  })

  // Definir las relaciones
  static asociar () {
    this.Rol.belongsToMany(this.Permisos, {
      through: this.DetallePermiso,
      foreignKey: 'idRol',
      otherKey: 'idPermisos'
    })

    this.Permisos.belongsToMany(this.Rol, {
      through: this.DetallePermiso,
      foreignKey: 'idPermisos',
      otherKey: 'idRol'
    })

    this.Usuario.belongsTo(this.Rol, {
      foreignKey: 'idRol'

    })

    this.Rol.hasMany(this.Usuario, {
      foreignKey: 'idRol'
    })

    this.Usuario.belongsTo(this.Estado, {
      foreignKey: 'idEstado'
    })

    this.Estado.hasMany(this.Usuario, {
      foreignKey: 'idEstado'
    })
  }

  // Crear un nuevo rol y sus permisos
  static async crearRol (nombre, { permisos }) {
    this.asociar()
    try {
      const existe = await this.Rol.findOne({ where: { nombre } })
      if (existe) {
        return { error: 'Ya existe un rol con ese nombre' }
      }

      const nuevoRol = await this.Rol.create({ nombre })

      for (const permiso of permisos) {
        await this.DetallePermiso.create({
          idRol: nuevoRol.id,
          idPermisos: permiso.id
        })
      }

      return {
        rol: {
          id: nuevoRol.id,
          nombre: nuevoRol.nombre
        },
        mensaje: 'Rol creado correctamente'
      }
    } catch (error) {
      throw new Error('Error al crear el rol: ' + error.message)
    }
  }

  // Editar un rol (Asignar otro rol a un usuario)
  // Editar un rol: nombre y asignación/eliminación de permisos
  static async editarRol (input) {
    this.asociar()
    const { idRol, permisosAEliminar = [], permisosANuevos = [] } = input

    try {
      const rol = await this.Rol.findByPk(idRol)
      if (!rol) {
        return { error: 'El rol no existe' }
      }

      if (permisosAEliminar.length > 0) {
        await this.DetallePermiso.destroy({
          where: {
            idRol,
            idPermisos: permisosAEliminar
          }
        })
      }

      for (const idPermiso of permisosANuevos) {
        const existe = await this.DetallePermiso.findOne({
          where: {
            idRol,
            idPermisos: idPermiso
          }
        })

        if (!existe) {
          await this.DetallePermiso.create({
            idRol,
            idPermisos: idPermiso
          })
        }
      }

      return {
        mensaje: 'Rol actualizado correctamente',
        rol: {
          id: rol.id,
          nombre: rol.nombre,
          permisosEliminados: permisosAEliminar,
          permisosAñadidos: permisosANuevos
        }
      }
    } catch (error) {
      throw new Error('Error al actualizar el rol: ' + error.message)
    }
  }

  // Eliminar un rol o Deshabilitarlo
  static eliminarRol = async (id) => {
    this.asociar()
    try {
      const rol = await this.Rol.findByPk(id)

      if (!rol) {
        return { error: 'El rol no existe' }
      }

      const estadoNoDisponible = await sequelize.query(
        'SELECT id FROM Estado WHERE descripcion = \'No disponible\'',
        { type: sequelize.QueryTypes.SELECT }
      )

      const idEstadoNoDisponible = estadoNoDisponible[0].id

      await this.Usuario.update(
        { idEstado: idEstadoNoDisponible },
        { where: { idRol: id } }
      )

      return { message: 'Rol deshabilitado correctamente' }
    } catch (error) {
      return {
        error: 'Error al intentar deshabilitar el rol',
        detalles: error.message
      }
    }
  }

  // Mostrar roles y permisos
  static async mostrarRolesYPermisos () {
    this.asociar()
    try {
      const roles = await this.Rol.findAll({
        include: [
          {
            model: this.Permisos,
            through: { attributes: [] },
            attributes: ['id', 'descripcion']
          }
        ],
        attributes: ['id', 'nombre']
      })

      const resultado = roles.map(rol => ({
        id: rol.id,
        nombre: rol.nombre,
        permisos: rol.Permisos.map(permiso => ({
          id: permiso.id,
          descripcion: permiso.descripcion
        }))
      }))

      return { roles: resultado }
    } catch (error) {
      console.error('Error en mostrarRolesYPermisos:', error)
      throw new Error('Error al obtener roles y permisos: ' + error.message)
    }
  }

  // Obtener permisos de un rol
  static async mostrarRecetaPorProducto (idProducto) {
    try {
      const producto = await this.Producto.findOne({
        where: { id: idProducto },
        attributes: ['id', 'nombre', 'precio', 'descripcion', 'tiempoPreparacion', 'idCategoria', 'idStock'],
        include: [
          {
            model: this.Receta,
            attributes: ['cantidad'],
            include: [
              {
                model: this.Ingrediente,
                attributes: ['nombre']
              }
            ]
          }
        ]
      })

      if (!producto) {
        return { error: 'Producto no encontrado' }
      }

      return {
        producto: {
          id: producto.id,
          nombre: producto.nombre,
          precio: producto.precio,
          descripcion: producto.descripcion,
          tiempoPreparacion: producto.tiempoPreparacion,
          idCategoria: producto.idCategoria,
          idStock: producto.idStock,
          ingredientes: producto.Receta.map(r => ({
            nombre: r.Ingrediente.nombre,
            cantidad: r.cantidad
          }))
        }
      }
    } catch (error) {
      return {
        error: 'Error al mostrar la receta',
        detalles: error.message
      }
    }
  }
}
import sequelize from '../config/db/config.js'

import { definicionMenu } from '../services/menu.js'
import { definicionDetalleMenu } from '../services/detalleMenu.js'
import { definicionProducto } from '../services/producto.js'

// Definición de modelos
export class ModeloMenu {
  static initModelos () {
    this.Menu = sequelize.define('Menu', definicionMenu, {
      timestamps: false,
      freezeTableName: true
    })

    this.Producto = sequelize.define('Producto', definicionProducto, {
      timestamps: false,
      freezeTableName: true
    })

    this.DetalleMenu = sequelize.define('DetalleMenu', definicionDetalleMenu, {
      timestamps: false,
      freezeTableName: true
    })
  }

  static asociar () {
    // Verifica que los modelos estén definidos
    if (!this.Menu || !this.Producto || !this.DetalleMenu) {
      throw new Error('Primero debes llamar a initModelos()')
    }

    // Relaciones muchos a muchos
    this.Menu.belongsToMany(this.Producto, {
      through: this.DetalleMenu,
      foreignKey: 'idMenu',
      otherKey: 'idProducto'
    })

    this.Producto.belongsToMany(this.Menu, {
      through: this.DetalleMenu,
      foreignKey: 'idProducto',
      otherKey: 'idMenu'
    })

    // Relaciones directas con DetalleMenu
    this.DetalleMenu.belongsTo(this.Menu, { foreignKey: 'idMenu' })
    this.DetalleMenu.belongsTo(this.Producto, { foreignKey: 'idProducto' })

    this.Menu.hasMany(this.DetalleMenu, { foreignKey: 'idMenu' })
    this.Producto.hasMany(this.DetalleMenu, { foreignKey: 'idProducto' })
  }

  // Crear un nuevo menú
  static async crearMenu ({ input }) {
    ModeloMenu.initModelos()
    ModeloMenu.asociar()
    const { dia, productos } = input

    try {
      const menuExistente = await this.Menu.findOne({ where: { dia, idEstado: 3 } })
      if (menuExistente) return { error: `Ya existe un menú para el día ${dia}` }

      const nuevoMenu = await this.Menu.create({ dia, idEstado: 3 })

      for (const producto of productos) {
        await this.DetalleMenu.create({
          idMenu: nuevoMenu.id,
          idProducto: producto.id
        })
      }

      return { message: 'Menú creado correctamente', menu: nuevoMenu }
    } catch (error) {
      return {
        error: 'Error al crear el menú',
        detalles: error.message
      }
    }
  }

  // Obtener todos los menús con sus productos
  static async obtenerMenus () {
    ModeloMenu.initModelos()
    ModeloMenu.asociar()
    try {
      const menus = await this.Menu.findAll({
        include: {
          model: ModeloMenu.DetalleMenu,
          include: this.Producto
        }
      })

      return { menus }
    } catch (error) {
      return {
        error: 'Error al obtener los menús',
        detalles: error.message
      }
    }
  }

  // Obtener todos los menús con sus productos por día
  static async obtenerMenuPorDia (dia) {
    ModeloMenu.initModelos()
    ModeloMenu.asociar()
    try {
      const menu = await this.Menu.findAll({
        where: { dia },
        include: {
          model: this.DetalleMenu,
          include: this.Producto
        }
      })
      if (!menu) return { error: 'Menú no encontrado para el día ' + dia }
      return { menu }
    } catch (error) {
      return {
        error: 'Error al obtener el menú por día',
        detalles: error.message
      }
    }
  }

  // Editar un menú
  static async editarMenu ({ id, input }) {
    ModeloMenu.initModelos()
    ModeloMenu.asociar()
    const { dia, productos } = input
    console.log(input)
    try {
      const menu = await this.Menu.findByPk(id)
      if (!menu) return { error: 'Menú no encontrado' }

      menu.dia = dia
      await menu.save()

      await this.DetalleMenu.destroy({ where: { idMenu: id } })
      for (const producto of productos) {
        await this.DetalleMenu.create({
          idMenu: id,
          idProducto: producto.id
        })
      }

      return { message: 'Menú actualizado correctamente' }
    } catch (error) {
      return {
        error: 'Error al editar el menú',
        detalles: error.message
      }
    }
  }

  // Eliminar un menú
  static async eliminarMenu (id) {
    ModeloMenu.initModelos()
    ModeloMenu.asociar()
    try {
      const menu = await this.Menu.findByPk(id)
      if (!menu) return { error: 'Menú no encontrado' }
      await menu.update({ idEstado: 4 })

      return { message: 'Menú eliminado correctamente' }
    } catch (error) {
      return {
        error: 'Error al eliminar el menú',
        detalles: error.message
      }
    }
  }
}

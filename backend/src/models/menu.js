import sequelize from '../config/db/config.js'

import { definicionMenu } from '../services/menu.js'
import { definicionProducto } from '../services/product.js'
import { definicionDetalleMenu } from '../services/detalleMenu.js'

// Definición de modelos
export const Menu = sequelize.define('Menu', definicionMenu, {
  timestamps: false,
  freezeTableName: true
})

export const Producto = sequelize.define('Producto', definicionProducto, {
  timestamps: false,
  freezeTableName: true
})

export const DetalleMenu = sequelize.define('DetalleMenu', definicionDetalleMenu, {
  timestamps: false,
  freezeTableName: true
})

// Relaciones
Menu.hasMany(DetalleMenu, { foreignKey: 'idMenu' })
Producto.hasMany(DetalleMenu, { foreignKey: 'idProducto' })

DetalleMenu.belongsTo(Menu, { foreignKey: 'idMenu' })
DetalleMenu.belongsTo(Producto, { foreignKey: 'idProducto' })

// claseeee
export class ModeloMenu {
  // Crear un nuevo menú
  static crearMenu = async ({ input }) => {
    const { dia, idEstado, productos } = input.data

    try {
      const menuExistente = await Menu.findOne({ where: { dia, idEstado } })
      if (menuExistente) return { error: `Ya existe un menú para el día ${dia} con ese estado.` }

      const nuevoMenu = await Menu.create({ dia, idEstado })

      for (const producto of productos) {
        await DetalleMenu.create({
          idMenu: nuevoMenu.id,
          idProducto: producto.id,
          cantidad: producto.cantidad
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
  static obtenerMenus = async () => {
    try {
      const menus = await Menu.findAll({
        include: {
          model: DetalleMenu,
          include: Producto
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

  // Obtener todos los menús con sus productos por día y estado
  static obtenerMenuPorDiaYEstado = async (dia, idEstado) => {
    try {
      const menu = await Menu.findOne({
        where: { dia, idEstado },
        include: {
          model: DetalleMenu,
          include: Producto
        }
      })
      if (!menu) return { error: `No se encontró menú para el día ${dia} con el estado indicado.` }
      return { menu }
    } catch (error) {
      return {
        error: 'Error al obtener el menú por día y estado',
        detalles: error.message
      }
    }
  }

  // Obtener el menú activo del día actual
  static obtenerMenuPorDiaHoy = async () => {
    const hoy = new Date().toISOString().split('T')[0]
    return ModeloMenu.obtenerMenuPorDiaYEstado(hoy, 1) // Estado activo
  }

  // Editar un menú
  static editarMenu = async ({ idMenu, input }) => {
    const { dia, idEstado, productos } = input.data
    try {
      const menu = await Menu.findByPk(idMenu)
      if (!menu) return { error: 'Menú no encontrado' }

      menu.dia = dia
      menu.idEstado = idEstado
      await menu.save()

      await DetalleMenu.destroy({ where: { idMenu } })

      for (const producto of productos) {
        await DetalleMenu.create({
          idMenu,
          idProducto: producto.id,
          cantidad: producto.cantidad
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
  static eliminarMenu = async (idMenu) => {
    try {
      const menu = await Menu.findByPk(idMenu)
      if (!menu) return { error: 'Menú no encontrado' }

      await DetalleMenu.destroy({ where: { idMenu } })
      await Menu.destroy({ where: { id: idMenu } })

      return { message: 'Menú eliminado correctamente' }
    } catch (error) {
      return {
        error: 'Error al eliminar el menú',
        detalles: error.message
      }
    }
  }
}

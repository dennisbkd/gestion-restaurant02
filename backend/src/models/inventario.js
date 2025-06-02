import sequelize from '../config/db/config.js'
import { definicionInventario } from '../services/inventario.js'

export class ModeloInventario {
  static Stock = sequelize.define('Stock', definicionInventario, {
    timestamps: false,
    freezeTableName: true
  })

  // Agregar nuevo producto al inventario
  static async agregarStock({ input }) {
    const { descripcion, stockActual, stockMinimo } = input
    try {
      const existente = await this.Stock.findOne({ where: { descripcion } })
      if (existente) {
        return { error: 'Error: ya existe un producto con esa descripción' }
      }

      const producto = await this.Stock.create({ descripcion, stockActual, stockMinimo })

      return {
        producto,
        mensaje: 'Producto agregado correctamente'
      }
    } catch (error) {
      throw new Error('Error al agregar producto: ' + error.message)
    }
  }

  // Disminuir stock
  static async disminuirStock({ input }) {
    const { id, cantidad } = input
    try {
      const producto = await this.Stock.findByPk(id)

      if (!producto) {
        return { error: 'Error: el producto no existe' }
      }

      if (producto.stockActual < cantidad) {
        return { error: 'Error: no hay suficiente stock disponible' }
      }

      producto.stockActual -= cantidad
      await producto.save()

      return {
        producto,
        mensaje: 'Stock disminuido correctamente'
      }
    } catch (error) {
      throw new Error('Error al disminuir stock: ' + error.message)
    }
  }

  // Actualizar stock
  static async actualizarStock({ input }) {
    const { id, nuevoStockActual, nuevoStockMinimo } = input
    try {
      const producto = await this.Stock.findByPk(id)

      if (!producto) {
        return { error: 'Error: el producto no existe' }
      }

      producto.stockActual = nuevoStockActual
      producto.stockMinimo = nuevoStockMinimo

      await producto.save()

      return {
        producto,
        mensaje: 'Stock actualizado correctamente'
      }
    } catch (error) {
      throw new Error('Error al actualizar producto: ' + error.message)
    }
  }

  // Mostrar todos los productos del inventario
  static async mostrarStocks() {
    try {
      const stock = await this.Stock.findAll()
      return { stock }
    } catch (error) {
      throw new Error('Error al consultar inventario: ' + error.message)
    }
  }

  // Mostrar un producto del inventario por ID
  static async mostrarStockPorId(id) {
    try {
      const producto = await this.Stock.findByPk(id)

      if (!producto) {
        return { error: `No se encontró producto con ID ${id}` }
      }
      return { stock: producto }
    } catch (error) {
      throw new Error('Error al consultar stock por ID: ' + error.message)
    }
  }
}

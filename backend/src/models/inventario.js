import sequelize from '../config/db/config.js'
import definicionStock from '../services/stock.js'

export class modeloStock {
  static Stock = sequelize.define('Stock', definicionStock, {
    timestamps: false,
    freezeTableName: true
  })

  // Función para registrar un nuevo stock
  static registrarStock = async ({ input }) => {
    const { descripcion, stockActual, stockMinimo } = input.data
    try {
      const buscarStock = await this.Stock.findOne({
        where: { descripcion }
      })
      // Si ya existe un stock con la misma descripción
      if (buscarStock) {
        return { error: 'El stock con esa descripción ya existe' }
      }
      await this.Stock.create({ descripcion, stockActual, stockMinimo })
      return { stock: { descripcion, stockActual, stockMinimo } }
    } catch (error) {
      return {
        error: 'Error al registrar el stock',
        detalles: error.message
      }
    }
  }

  // Función para obtener todos los stocks
  static obtenerStocks = async () => {
    try {
      const stocks = await this.Stock.findAll()
      return { stocks }
    } catch (error) {
      return {
        error: 'Error al obtener los stocks',
        detalles: error.message
      }
    }
  }

  // Función para obtener un stock por ID
  static obtenerStockPorId = async (idStock) => {
    try {
      const stock = await this.Stock.findByPk(idStock)
      if (!stock) {
        return { error: 'Stock no encontrado' }
      }
      return { stock }
    } catch (error) {
      return {
        error: 'Error al obtener el stock',
        detalles: error.message
      }
    }
  }

  // Función para actualizar un stock
  static actualizarStock = async ({ input }) => {
    const { id, cantidad } = input.data
    try {
      const [updatedRows] = await this.Stock.update(
        { stockActual: sequelize.literal(`stockActual + ${cantidad}`) },
        { where: { id } }
      )

      if (updatedRows === 0) {
        return { error: `No se encontró un stock con id ${id} para actualizar.` }
      }

      return { message: `Stock con id ${id} actualizado correctamente` }
    } catch (error) {
      return {
        error: 'Error al actualizar el stock',
        detalles: error.message
      }
    }
  }

  // Función para eliminar un stock
  static eliminarStock = async (idStock) => {
    try {
      const updated = await this.Stock.update(
        { stockMinimo: 0 }, // Marca el stock como "no disponible" o lo elimina lógicamente
        { where: { id: idStock } }
      )

      if (updated[0] === 0) {
        return { error: `No se encontró un stock con id ${idStock}` }
      }

      return { message: `Stock con id ${idStock} marcado como no disponible` }
    } catch (error) {
      return {
        error: 'Error al eliminar el stock',
        detalles: error.message
      }
    }
  }
}

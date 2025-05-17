import sequelize from '../config/db/config.js'
import { definicionInventario } from '../services/inventario.js'

export class ModeloInventario {
  static Stock = sequelize.define('Stock', definicionInventario, {
    timestamps: false,
    freezeTableName: true
  })

  static async agregarStock ({ descripcion, stockActual, stockMinimo }) {
    try {
      const [result] = await sequelize.query(
        'DECLARE @mensaje VARCHAR(100); ' +
                'EXEC p_AgregarStock @descripcion = :descripcion, @stockActual = :stockActual, ' +
                '@stockMinimo = :stockMinimo, @mensaje = @mensaje OUTPUT; ' +
                'SELECT @mensaje AS mensaje;',
        {
          replacements: { descripcion, stockActual, stockMinimo },
          type: sequelize.QueryTypes.SELECT
        }
      )

      if (result.mensaje.includes('Error') || result.mensaje.includes('ya existe')) {
        return { error: result.mensaje }
      }

      return {
        producto: { descripcion, stockActual, stockMinimo },
        mensaje: result.mensaje
      }
    } catch (error) {
      throw new Error('Error al agregar producto: ' + error.message)
    }
  }

  // Disminuir stock
  static async disminuirStock ({ id, cantidad }) {
    try {
      const [result] = await sequelize.query(
        'DECLARE @mensaje VARCHAR(100); ' +
                'EXEC p_DisminuirStock @id = :id, @cantidad = :cantidad, @mensaje = @mensaje OUTPUT; ' +
                'SELECT @mensaje AS mensaje;',
        {
          replacements: { id, cantidad },
          type: sequelize.QueryTypes.SELECT
        }
      )

      if (result.mensaje.includes('Error') || result.mensaje.includes('no existe')) {
        return { error: result.mensaje }
      }

      return {
        producto: { id, cantidad },
        mensaje: result.mensaje
      }
    } catch (error) {
      throw new Error('Error al disminuir stock: ' + error.message)
    }
  }

  // Actualizar producto en el inventario
  static async actualizarStock (input) {
    const { id, nuevoStockActual, nuevoStockMinimo } = input
    try {
      const [result] = await sequelize.query(
      `DECLARE @mensaje VARCHAR(100);
       EXEC p_ActualizarStock 
         @id = :id,
         @nuevoStockActual = :nuevoStockActual,
         @nuevoStockMinimo = :nuevoStockMinimo,
         @mensaje = @mensaje OUTPUT;
       SELECT @mensaje AS mensaje;`,
      {
        replacements: {
          id,
          nuevoStockActual,
          nuevoStockMinimo
        },
        type: sequelize.QueryTypes.SELECT
      }
      )

      if (result.mensaje.includes('Error') || result.mensaje.includes('no existe')) {
        return { error: result.mensaje }
      }

      return {
        producto: { id, nuevoStockActual, nuevoStockMinimo },
        mensaje: result.mensaje
      }
    } catch (error) {
      throw new Error('Error al actualizar producto: ' + error.message)
    }
  }

  // Consultar todo el inventario (STOCKS)
  static async mostrarStocks () {
    try {
      const stock = await sequelize.query(
        'EXEC get_MostrarStocks',
        { type: sequelize.QueryTypes.SELECT }
      )

      return { stock }
    } catch (error) {
      throw new Error('Error al consultar inventario: ' + error.message)
    }
  }

  // mostrar stock por id
  static async mostrarStockPorId (id) {
    try {
      const stock = await sequelize.query(
        'exec get_MostrarStockID @id = :id',
        {
          replacements: { id },
          type: sequelize.QueryTypes.SELECT
        }
      )

      if (!stock) {
        return { error: `No se encontró producto con ID ${id}` }
      }

      return { stock }
    } catch (error) {
      throw new Error('Error al consultar stock por ID: ' + error.message)
    }
  }
}

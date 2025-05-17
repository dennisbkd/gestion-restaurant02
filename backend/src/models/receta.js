import sequelize from '../config/db/config.js'
import { definicionReceta } from '../services/receta.js'

export class ModeloReceta {
  static Receta = sequelize.define('Recetas', definicionReceta, {
    timestamps: false,
    freezeTableName: true
  })

  static async crearReceta ({ input }) {
    const { idProducto, idIngrediente, cantidad } = input
    try {
      const [resultado] = await sequelize.query(
        `DECLARE @mensaje VARCHAR(200);
         EXEC set_RegistrarReceta 
           @idProducto = :idProducto, 
           @idIngrediente = :idIngrediente, 
           @cantidad = :cantidad, 
           @mensaje = @mensaje OUTPUT;
         SELECT @mensaje AS mensaje;`,
        {
          replacements: { idProducto, idIngrediente, cantidad },
          type: sequelize.QueryTypes.SELECT
        }
      )

      if (resultado.mensaje.includes('Error')) {
        return { error: resultado.mensaje }
      }

      return {
        receta: {
          idProducto,
          idIngrediente,
          cantidad
        },
        mensaje: resultado.mensaje
      }
    } catch (error) {
      return {
        error: 'Error al crear la receta',
        detalles: error.message
      }
    }
  }

  static async editarReceta ({ input }) {
    const { idProducto, idIngrediente, nuevaCantidad } = input
    try {
      const [resultado] = await sequelize.query(
        `DECLARE @mensaje VARCHAR(200);
         EXEC set_ActualizarReceta 
           @idProducto = :idProducto, 
           @idIngrediente = :idIngrediente, 
           @cantidad = :nuevaCantidad, 
           @mensaje = @mensaje OUTPUT;
         SELECT @mensaje AS mensaje;`,
        {
          replacements: { idProducto, idIngrediente, nuevaCantidad },
          type: sequelize.QueryTypes.SELECT
        }
      )

      if (resultado.mensaje.includes('Error')) {
        return { error: resultado.mensaje }
      }

      return {
        receta: {
          idProducto,
          idIngrediente,
          cantidad: nuevaCantidad
        },
        mensaje: resultado.mensaje
      }
    } catch (error) {
      return {
        error: 'Error al editar la receta',
        detalles: error.message
      }
    }
  }

  static async eliminarIngredienteDeReceta ({ idProducto, idIngrediente }) {
    try {
      const [resultado] = await sequelize.query(
        `DECLARE @mensaje VARCHAR(200);
         EXEC set_EliminarIngredienteDeReceta 
           @idProducto = :idProducto, 
           @idIngrediente = :idIngrediente, 
           @mensaje = @mensaje OUTPUT;
         SELECT @mensaje AS mensaje;`,
        {
          replacements: { idProducto, idIngrediente },
          type: sequelize.QueryTypes.SELECT
        }
      )

      if (resultado.mensaje.includes('Error')) {
        return { error: resultado.mensaje }
      }

      return { mensaje: resultado.mensaje }
    } catch (error) {
      return {
        error: 'Error al eliminar ingrediente de la receta',
        detalles: error.message
      }
    }
  }

  static async mostrarRecetaPorProducto ({ idProducto }) {
    try {
      const receta = await sequelize.query(
        'EXEC get_ProductoYReceta @idProducto = :idProducto',
        {
          replacements: { idProducto },
          type: sequelize.QueryTypes.SELECT
        }
      )

      return receta
    } catch (error) {
      return {
        error: 'Error al mostrar la receta',
        detalles: error.message
      }
    }
  }
}

import sequelize from '../config/db/config.js';
import { definicionProducto } from '../services/productos.js';

export class ModeloProducto {
  static Producto = sequelize.define('Productos', definicionProducto, {
    timestamps: false,
    freezeTableName: true
  });

  // Crear producto
  static async crearProducto({ input }) {
    const { nombre, precio, descripcion, time, idCategoria, idStock } = input;
    try {
      const [resultado] = await sequelize.query(
        `DECLARE @mensaje VARCHAR(200);
         EXEC set_RegistrarProducto 
           @nombre = :nombre, 
           @precio = :precio, 
           @descripcion = :descripcion, 
           @time = :time, 
           @idCategoria = :idCategoria, 
           @idStock = :idStock, 
           @mensaje = @mensaje OUTPUT;
         SELECT @mensaje AS mensaje;`,
        {
          replacements: { nombre, precio, descripcion, time, idCategoria, idStock },
          type: sequelize.QueryTypes.SELECT
        }
      );

      if (resultado.mensaje.includes('Error')) {
        return { error: resultado.mensaje };
      }

      return {
        producto: { nombre, precio, descripcion, time, idCategoria, idStock },
        mensaje: resultado.mensaje
      };
    } catch (error) {
      return {
        error: 'Error al crear el producto',
        detalles: error.message
      };
    }
  }

  // Editar producto
  static async editarProducto({ input }) {
    const { idProducto, nombre, precio } = input;
    try {
      const [resultado] = await sequelize.query(
        `DECLARE @mensaje VARCHAR(200);
         EXEC p_EditarProducto 
           @idProducto = :idProducto, 
           @nombre = :nombre, 
           @precio = :precio, 
           @mensaje = @mensaje OUTPUT;
         SELECT @mensaje AS mensaje;`,
        {
          replacements: { idProducto, nombre, precio },
          type: sequelize.QueryTypes.SELECT
        }
      );

      if (resultado.mensaje.includes('Error')) {
        return { error: resultado.mensaje };
      }

      return {
        producto: { idProducto, nombre, precio },
        mensaje: resultado.mensaje
      };
    } catch (error) {
      return {
        error: 'Error al editar el producto',
        detalles: error.message
      };
    }
  }

  // Eliminar producto
  static async eliminarProducto(idProducto) {
    try {
      const [resultado] = await sequelize.query(
        `DECLARE @mensaje VARCHAR(200);
         EXEC p_EliminarProducto 
           @idProducto = :idProducto, 
           @mensaje = @mensaje OUTPUT;
         SELECT @mensaje AS mensaje;`,
        {
          replacements: { idProducto: Number(idProducto) },
          type: sequelize.QueryTypes.SELECT
        }
      );

      if (resultado.mensaje.includes('Error')) {
        return { error: resultado.mensaje };
      }

      return { mensaje: resultado.mensaje };
    } catch (error) {
      return {
        error: 'Error al eliminar el producto',
        detalles: error.message
      };
    }
  }

  // Obtener todos los productos
  static async obtenerProductos() {
    try {
      const productos = await sequelize.query(
        'EXEC get_MostrarProductos',
        { type: sequelize.QueryTypes.SELECT }
      );
      return productos;
    } catch (error) {
      return {
        error: 'Error al obtener productos',
        detalles: error.message
      };
    }
  }

  // Obtener producto por ID
  static async obtenerProductoPorId(idProducto) {
    try {
      const [resultado] = await sequelize.query(
        `DECLARE @mensaje VARCHAR(200);
         EXEC get_MostrarProductoPorId 
           @idProducto = :idProducto, 
           @mensaje = @mensaje OUTPUT;
         SELECT @mensaje AS mensaje;`,
        {
          replacements: { idProducto: Number(idProducto) },
          type: sequelize.QueryTypes.SELECT
        }
      );

      if (resultado.mensaje && resultado.mensaje.includes('Error')) {
        return { error: resultado.mensaje };
      }

      return resultado;
    } catch (error) {
      return {
        error: 'Error al obtener producto por ID',
        detalles: error.message
      };
    }
  }
}

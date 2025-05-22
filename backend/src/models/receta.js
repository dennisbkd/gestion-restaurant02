import sequelize from '../config/db/config.js'
import { definicionReceta, definicionIngrediente, definicionProducto } from '../services/receta.js'
import { definicionEstado } from '../services/pedido.js'

export class ModeloReceta {
  static Receta = sequelize.define('Receta', definicionReceta, {
    timestamps: false,
    freezeTableName: true
  })

  static Producto = sequelize.define('Producto', definicionProducto, {
    timestamps: false,
    freezeTableName: true
  })

  static Ingrediente = sequelize.define('Ingrediente', definicionIngrediente, {
    timestamps: false,
    freezeTableName: true
  })

  static Estado = sequelize.define('Estado', definicionEstado, {
    timestamps: false,
    freezeTableName: true
  })

  // Asociaciones
  static asociar () {
  this.Producto.belongsToMany(this.Ingrediente, {
    through: this.Receta,
    foreignKey: 'idProducto',
    otherKey: 'idIngrediente'
  });

  this.Ingrediente.belongsToMany(this.Producto, {
    through: this.Receta,
    foreignKey: 'idIngrediente',
    otherKey: 'idProducto'
  });

  


  this.Producto.hasMany(this.Receta, { foreignKey: 'idProducto' });
  this.Receta.belongsTo(this.Producto, { foreignKey: 'idProducto' });
  this.Producto.belongsTo(this.Estado, { foreignKey: 'idEstado' })
  this.Estado.hasMany(this.Producto, { foreignKey: 'idEstado' })
  this.Receta.belongsTo(this.Ingrediente, { foreignKey: 'idIngrediente' });
}


  // Crear un Producto y con sus ingredientes (receta)
  static async crearProductoReceta ({ input }) {
  const { nombreProducto, descripcion,precio, tiempoPreparacion, idCategoria, idStock, ingredientes } = input

  try {
    const existeProducto = await this.Producto.findOne({ where: { nombre: nombreProducto } })
    if (existeProducto) {
      return { error: 'Ya existe un producto con ese nombre' }
    }

    const estado = await this.Estado.findOne({ where: { descripcion: 'Activo' } })

    const nuevoProducto = await this.Producto.create({
      nombre: nombreProducto,
      precio,
      descripcion,
      tiempoPreparacion,
      idCategoria,
      idStock,
      idEstado: estado.id
    })

    for (const ingrediente of ingredientes) {
      const { idIngrediente, cantidad } = ingrediente
      await this.Receta.create({
        idProducto: nuevoProducto.id,
        idIngrediente,
        cantidad
      })
    }

    return {
      mensaje: 'Producto y receta registrados correctamente',
      producto: {
        id: nuevoProducto.id,
        nombre: nuevoProducto.nombre,
        precio: nuevoProducto.precio
      }
    }

  } catch (error) {
    console.error('Error al crear el producto y su receta:', error)
    return {
      error: 'Error al crear el producto y su receta',
      detalles: error.message
    }
  }
}


  // Editar la receta de un producto
  static async editarReceta({ input }) {
  const {
    idProducto,
    precio,
    descripcion,
    tiempoPreparacion,
    idCategoria,
    idStock ,
    ingredientesAEliminar ,
    ingredientesANuevos ,
  } = input;

  try {
    const producto = await this.Producto.findByPk(idProducto);
    if (!producto) {
      return { error: 'El producto no existe' };
    }

   const estado = await this.Estado.findOne({ where: { descripcion: 'Activo' } });

   await producto.update({
      precio,
      descripcion,
      tiempoPreparacion,
      idCategoria,
      idStock,
      idEstado: estado.id
    });

   if (ingredientesAEliminar.length > 0) {
  const idsAEliminar = ingredientesAEliminar.map(i => i.idIngrediente);
  
  await this.Receta.destroy({
    where: {
      idProducto,
      idIngrediente: idsAEliminar
    }
  });
}

    for (const { idIngrediente, cantidad } of ingredientesANuevos) {
      await this.Receta.create({
        idProducto,
        idIngrediente,
        cantidad
      });
    }

    return {
      mensaje: 'Receta y producto actualizados correctamente',
      receta: {
        idProducto,
        ingredientesEliminados: ingredientesAEliminar,
        ingredientesAñadidos: ingredientesANuevos
      },
      productoActualizado: {
        precio: producto.precio,
        descripcion: producto.descripcion,
        tiempoPreparacion: producto.tiempoPreparacion,
        idCategoria: producto.idCategoria,
        idStock: producto.idStock,
        idEstado: producto.idEstado
      }
    };

  } catch (error) {
    return {
      error: 'Error al editar la receta',
      detalles: error.message
    };
  }
}


  // Eliminar Producto (Desahabilitar)
 static async eliminarProductoReceta(idProducto ) {
  try {
    

    const estado = await this.Estado.findOne({ where: { descripcion: 'No Disponible' } });

    await this.Producto.update(
      { idEstado: estado.id }, 
      { where: { id: idProducto } }
    );
   
    return {
      mensaje: 'Receta de Producto eliminada correctamente',
    };
  } catch (error) {
    return {
      error: 'Error al eliminar ingredientes o el producto',
      detalles: error.message
    };
  }
}



  // Mostrar todos los ingredientes de un producto (receta completa)
 static async mostrarRecetaPorProducto(idProducto) {
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
    });

    if (!producto) {
      return { error: 'Producto no encontrado' };
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
    };
  } catch (error) {
    return {
      error: 'Error al mostrar la receta',
      detalles: error.message
    };
  }
 }
}

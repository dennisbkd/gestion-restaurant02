import sequelize from '../config/db/config.js'
import { definicionReceta } from '../services/receta.js'
import { definicionProducto } from '../services/producto.js'
import { definicionIngrediente } from '../services/ingrediente.js'

export class ModeloReceta {
  static Receta = sequelize.define('Receta', definicionReceta, {
    timestamps: false,
    freezeTableName: true
  })

  static Producto = sequelize.define('Producto', definicionProducto, {
    timestamps: false,
    freezeTableName: true
  })

  static Ingredientes = sequelize.define('Ingrediente', definicionIngrediente, {
    timestamps: false,
    freezeTableName: true
  })

  static asociar = () => {
  // Asociaciones Many-to-Many
    this.Producto.belongsToMany(this.Ingredientes, {
      through: this.Receta,
      foreignKey: 'idProducto',
      otherKey: 'idIngrediente'
    })

    this.Ingredientes.belongsToMany(this.Producto, {
      through: this.Receta,
      foreignKey: 'idIngrediente',
      otherKey: 'idProducto'
    })

    // Relaciones desde Receta (IMPORTANTE)
    this.Receta.belongsTo(this.Producto, {
      foreignKey: 'idProducto'

    })

    this.Receta.belongsTo(this.Ingredientes, {
      foreignKey: 'idIngrediente'
    })
  }

  static async crearReceta ({ input }) {
    const { idProducto, Ingrediente } = input
    try {
      const datosReceta = Ingrediente.map(({ idIngrediente, cantidad }) => ({
        idProducto,
        idIngrediente,
        cantidad
      }))

      await this.Receta.bulkCreate(datosReceta)

      const recetaActualizada = await this.Receta.findAll({
        where: { idProducto },
        attributes: ['idProducto', 'idIngrediente', 'cantidad']
      })

      return {
        mensaje: 'Receta creada exitosamente',
        receta: recetaActualizada
      }
    } catch (error) {
      return {
        error: 'Error al crear la receta',
        detalles: error.message
      }
    }
  }

  static async editarReceta ({ input }) {
    const { idProducto, Ingrediente } = input
    try {
      const resultado = await this.Producto.findByPk(idProducto)
      if (!resultado) {
        return { error: 'Producto no encontrado' }
      }
      await Promise.all(
        Ingrediente.map(({ idIngrediente, cantidad }) =>
          this.Receta.upsert({ idProducto, idIngrediente, cantidad })
        )
      )

      const ingredientesActuales = await this.Receta.findAll({
        where: { idProducto },
        attributes: ['idIngrediente']
      })

      const idsActuales = ingredientesActuales.map(i => i.idIngrediente)
      const idsNuevos = Ingrediente.map(i => i.idIngrediente)

      const ingredientesAEliminar = idsActuales.filter(id => !idsNuevos.includes(id))

      if (ingredientesAEliminar.length > 0) {
        await this.Receta.destroy({
          where: { idProducto, idIngrediente: ingredientesAEliminar }
        })
      }

      const recetaActualizada = await this.Receta.findAll({
        where: { idProducto },
        attributes: ['idProducto', 'idIngrediente', 'cantidad']
      })

      return {
        mensaje: 'Receta editada exitosamente',
        receta: recetaActualizada
      }
    } catch (error) {
      return {
        error: 'Error al editar la receta',
        detalles: error.message
      }
    }
  }

  static async eliminarReceta ({ idProducto }) {
    try {
      const resultado = await this.Receta.destroy({ where: { idProducto } })
      if (resultado === 0) {
        return { error: 'No se encontró la receta para eliminar' }
      }
      return { mensaje: 'Receta eliminada exitosamente' }
    } catch (error) {
      return {
        error: 'Error al eliminar la receta',
        detalles: error.message
      }
    }
  }

  static async mostrarRecetaPorProducto () {
    try {
      const recetas = await this.Receta.findAll({
        include: [
          {
            model: this.Producto,
            attributes: ['nombre']
          },
          {
            model: this.Ingredientes,
            attributes: ['nombre']
          }
        ],
        attributes: ['idProducto', 'idIngrediente', 'cantidad']
      })
      const productosAgrupados = recetas.reduce((acumulador, receta) => {
        const productoId = receta.idProducto

        // Si el producto no existe en el acumulador, lo agregamos
        if (!acumulador[productoId]) {
          acumulador[productoId] = {
            idProducto: productoId,
            nombre: receta.Producto.nombre,
            Ingredientes: []
          }
        }

        // Agregamos el ingrediente a la lista del producto
        acumulador[productoId].Ingredientes.push({
          idIngrediente: receta.idIngrediente,
          nombre: receta.Ingrediente.nombre,
          cantidad: receta.cantidad
        })

        return acumulador
      }, {})

      // 3. Convertimos el objeto a array
      const resultado = Object.values(productosAgrupados)

      return resultado
    } catch (error) {
      return {
        error: 'Error al mostrar la receta',
        detalles: error.message
      }
    }
  }
}
ModeloReceta.asociar()

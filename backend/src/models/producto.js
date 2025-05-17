import sequelize from '../config/db/config.js'
import { definicionCategoria } from '../services/categoria.js'
import { definicionProducto } from '../services/producto.js'

export class ModeloProducto {
  static Producto = sequelize.define('producto', definicionProducto, {
    timestamps: false,
    freezeTableName: true
  })

  static Categoria = sequelize.define('Categoria', definicionCategoria, {
    timestamps: false,
    freezeTableName: true
  })

  static asociacion () {
    this.Producto.belongsTo(this.Categoria, { foreignKey: 'idCategoria' })
    this.Categoria.hasMany(this.Producto, { foreignKey: 'idCategoria' })
  }

  static async ObtenerProductos ({ tipo }) {
    let resultado
    try {
      if (tipo) {
        const productos = await this.Producto.findAll({
          where: { idCategoria: tipo },
          include: [{ model: this.Categoria }]
        })
        console.log('sadsadad', productos.length)
        if (!productos.length) {
          return { error: `No se encontraron productos con el filtro ${tipo || 'ninguno'}` }
        }
        resultado = productos
      } else {
        const productos = await this.Producto.findAll({
          include: [{ model: this.Categoria }]
        })
        resultado = productos
        if (!productos.length) {
          return { error: 'No se encontraron productos' }
        }
      }
      const productosLimpios = resultado.map(producto => ({
        id: producto.id,
        nombre: producto.nombre,
        precio: producto.precio,
        descripcion: producto.descripcion,
        tiempoPreparacion: producto.tiempoPreparacion,
        categoria: producto.Categorium.descripcion
      }))
      return productosLimpios
    } catch (error) {
      console.error('Hubo un error al obtener los productos:', error)
      throw new Error('Error en la base de datos, intente más tarde.')
    }
  }
}

ModeloProducto.asociacion()

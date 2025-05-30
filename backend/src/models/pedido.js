import sequelize from '../config/db/config.js'
import { definicionPedido, definicionDetallePedido, definicionMesa, definicionMesasPedido, definicionIngrediente, definicionExclusionIngrediente, definicionEstado } from '../services/pedido.js'
import { definicionProducto } from '../services/producto.js'

export class ModeloPedido {
  static Pedido = sequelize.define('Pedido', definicionPedido, {
    timestamps: false,
    freezeTableName: true
  })

  static Producto = sequelize.define('Producto', definicionProducto, {
    timestamps: false,
    freezeTableName: true
  })

  static DetallePedido = sequelize.define('DetallePedido', definicionDetallePedido, {
    timestamps: false,
    freezeTableName: true
  })

  static Mesa = sequelize.define('Mesa', definicionMesa, {
    timestamps: false,
    freezeTableName: true
  })

  static MesasPedido = sequelize.define('MesasPedido', definicionMesasPedido, {
    timestamps: false,
    freezeTableName: true
  })

  static Ingrediente = sequelize.define('Ingrediente', definicionIngrediente, {
    timestamps: false,
    freezeTableName: true
  })

  static ExclusionIngrediente = sequelize.define('ExclusionIngrediente', definicionExclusionIngrediente, {
    timestamps: false,
    freezeTableName: true
  })

  static Estado = sequelize.define('Estado', definicionEstado, {
    timestamps: false,
    freezeTableName: true
  })

  static asociar () {
    // Relación: Pedido tiene muchos DetallePedido
    this.Pedido.hasMany(this.DetallePedido, {
      foreignKey: 'idPedido',
      sourceKey: 'id'
    })

    this.DetallePedido.belongsTo(this.Pedido, {
      foreignKey: 'idPedido',
      targetKey: 'id'
    })

    // Relación: Producto tiene muchos DetallePedido
    this.Producto.hasMany(this.DetallePedido, {
      foreignKey: 'idProducto',
      sourceKey: 'id'
    })

    this.DetallePedido.belongsTo(this.Producto, {
      foreignKey: 'idProducto',
      targetKey: 'id'
    })
    this.Mesa.belongsTo(this.Estado, {
      foreignKey: 'idEstado'
    })
    this.Estado.hasMany(this.Mesa, {
      foreignKey: 'idEstado'
    })
    this.Producto.belongsToMany(this.Ingrediente, {
      through: this.ExclusionIngrediente,
      foreignKey: 'idProducto',
      otherKey: 'idIngrediente'
    })
    this.Ingrediente.belongsToMany(this.Producto, {
      through: this.ExclusionIngrediente,
      foreignKey: 'idIngrediente',
      otherKey: 'idProducto'
    })
    this.ExclusionIngrediente.belongsTo(this.Producto, { foreignKey: 'idProducto' })
    this.ExclusionIngrediente.belongsTo(this.Ingrediente, { foreignKey: 'idIngrediente' })

    this.Producto.hasMany(this.ExclusionIngrediente, { foreignKey: 'idProducto' })
    this.Ingrediente.hasMany(this.ExclusionIngrediente, { foreignKey: 'idIngrediente' })
    this.DetallePedido.hasMany(this.ExclusionIngrediente, {
      foreignKey: 'idPedido',
      sourceKey: 'idPedido',
      constraints: false // evitar conflictos por clave compuesta
    })

    this.ExclusionIngrediente.belongsTo(this.DetallePedido, {
      foreignKey: 'idPedido',
      targetKey: 'idPedido',
      constraints: false
    })
  }

  static async registrarPedido (idMesero, { mesas }, { productos }) {
    ModeloPedido.asociar()
    try {
      const resultado = await sequelize.query(
    `DECLARE @NuevoID INT;
    EXEC set_RegistrarPedidoPresencial
    @idEmpleado = :idEmpleado,
    @NuevoID = @NuevoID OUTPUT;

    SELECT @NuevoID AS nuevoPedidoID;`,
    {
      replacements: { idEmpleado: idMesero },
      type: sequelize.QueryTypes.SELECT
    })
      const idPedido = resultado[0].nuevoPedidoID
      for (const idMesa of mesas) {
        await this.MesasPedido.create({
          idPedido,
          idMesa: idMesa.id
        })
      }

      for (const producto of productos) {
        await this.DetallePedido.create({
          idPedido,
          idProducto: producto.id,
          cantidad: producto.cantidad,
          precio: producto.precio
        })

        for (const ingrediente of producto.exclusiones) {
          await this.ExclusionIngrediente.create({
            idPedido,
            idProducto: producto.id,
            idIngrediente: ingrediente.idIngrediente
          })
        }
      }

      return { message: 'Pedido registrado correctamente' }
    } catch (error) {
      console.error('Error detallado:', error) // Para debug
      return {
        error: 'Error al registrar el pedido',
        detalles: error.message
      }
    }
  }

  static async obtenerPedidosPendientes () {
    this.asociar()
    try {
      const estado = await this.Estado.findOne({
        where: {
          descripcion: 'Cancelado'
        }
      })
      const pedidos = await this.Pedido.findAll({
        where: {
          idEstado: estado.id
        },
        attributes: ['id', 'hora'],
        include: [
          {
            model: this.DetallePedido,
            attributes: ['cantidad'],
            include: {
              model: this.Producto,
              attributes: ['nombre']
            }
          },
          {
            model: this.DetallePedido,
            attributes: [],
            include: {
              model: this.ExclusionIngrediente,
              attributes: ['idIngrediente'],
              include: {
                model: this.Ingrediente,
                attributes: ['nombre']
              }
            }
          }
        ]
      })
      return { pedidos }
    } catch (error) {
      console.error('Error detallado:', error) // Para debug
      return {
        error: 'Error al obtener los pedidos pendientes',
        detalles: error.message
      }
    }
  }

  static async obtenerPedidoClienteWeb (id) {
    this.asociar()
    try {
      const { count: totalPedidos, rows: pedidos } = await this.Pedido.findAndCountAll({
        where: { idClienteWeb: id },
        include: [
          {
            model: this.DetallePedido,
            include: {
              model: this.Producto
            }
          }
        ],
        distinct: true
      })
      if (!pedidos) {
        return { error: 'Pedido no encontrado' }
      }
      return { pedidos, totalPedidos }
    } catch (error) {
      console.error('Error detallado:', error) // Para debug
      return {
        error: 'Error al obtener el pedido',
        detalles: error.message
      }
    }
  }
}

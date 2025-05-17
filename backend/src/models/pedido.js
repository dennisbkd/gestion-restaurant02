import sequelize from '../config/db/config.js'
import { definicionPedido, definicionProducto, definicionDetallePedido, definicionMesa, definicionMesasPedido, definicionIngrediente, definicionExclusionIngrediente, definicionEstado } from '../services/pedido.js'

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
}

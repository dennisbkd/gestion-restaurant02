import { DataTypes } from 'sequelize'

export const definicionDetalleMenu = {
  cantidad: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  idMenu: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Menu',
      key: 'id'
    }
  },
  idProducto: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Producto',
      key: 'id'
    }
  }
}

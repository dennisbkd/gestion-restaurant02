import { DataTypes } from 'sequelize'

const definicionDetalleMenu = {
  idMenu: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    references: {
      model: 'Menu',
      key: 'id'
    }
  },
  idProducto: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    references: {
      model: 'Producto',
      key: 'id'
    }
  }
}

export default definicionDetalleMenu

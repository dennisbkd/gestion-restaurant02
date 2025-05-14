import { DataTypes } from 'sequelize'
export const definicionDetalleMenu = {
  idMenu: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  idProducto: {
    type: DataTypes.INTEGER,
    primaryKey: true
  }
}

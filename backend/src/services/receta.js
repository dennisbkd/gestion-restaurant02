import { DataTypes } from 'sequelize'

export const definicionReceta = {
  idProducto: {
    type: DataTypes.INTEGER,
    foreignKey: true,
    allowNull: false
  },
  idIngrediente: {
    type: DataTypes.INTEGER,
    foreignKey: true,
    allowNull: false
  },
  cantidad: {
    type: DataTypes.FLOAT,
    allowNull: false
  }
}

import { DataTypes } from 'sequelize'

export const definicionInventario = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  descripcion: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  stockActual: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0
  },
  stockMinimo: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0
  }
}

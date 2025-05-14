import { DataTypes } from 'sequelize'

export const definicionMenu = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  dia: {
    type: DataTypes.STRING(100),
    allowNull: false
  }
}

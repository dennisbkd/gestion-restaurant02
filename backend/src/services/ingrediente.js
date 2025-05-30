import { DataTypes } from 'sequelize'

export const definicionIngrediente = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  idUnidadMedida: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  idStock: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  idEstado: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}

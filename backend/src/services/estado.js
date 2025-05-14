import { DataTypes } from 'sequelize'

const definicionEstado = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  descripcion: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true
  }
}

export default definicionEstado

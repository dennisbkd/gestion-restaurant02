import { DataTypes } from 'sequelize'

const definicionCategoria = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  descripcion: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true
  },
  idCategoria: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
}

export default definicionCategoria

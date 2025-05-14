import { DataTypes } from 'sequelize'

const definicionProducto = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true
  },
  precio: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  descripcion: {
    type: DataTypes.STRING,
    allowNull: true
  },
  tiempoPreparacion: {
    type: DataTypes.TIME,
    allowNull: true
  },
  idCategoria: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  idStock: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
}

export default definicionProducto

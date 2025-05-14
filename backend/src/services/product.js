import { DataTypes } from 'sequelize'
export const definicionProducto = {
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
  descripcion: DataTypes.TEXT,
  tiempoPreparacion: DataTypes.TIME,
  idCategoria: DataTypes.INTEGER,
  idStock: DataTypes.INTEGER
}

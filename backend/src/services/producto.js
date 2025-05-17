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
  descripcion: {
    type: DataTypes.TEXT
  },
  tiempoPreparacion: {
    type: DataTypes.TIME
  },
  idCategoria: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Categoria',
      key: 'id'
    }
  },
  idStock: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Stock',
      key: 'id'
    }
  }
}

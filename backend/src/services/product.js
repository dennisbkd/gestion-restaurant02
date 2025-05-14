import { DataTypes } from 'sequelize'

export const definicionProducto = {
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
  precio: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  descripcion: {
    type: DataTypes.TEXT, // VARCHAR(MAX) se mapea mejor como TEXT
    allowNull: true
  },
  tiempoPreparacion: {
    type: DataTypes.TIME,
    allowNull: true
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
    allowNull: true,
    references: {
      model: 'Stock',
      key: 'id'
    }
  }
}

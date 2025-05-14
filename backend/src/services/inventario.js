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

export const definicionIngrediente = {
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

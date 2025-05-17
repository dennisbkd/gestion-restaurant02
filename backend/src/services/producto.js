import { DataTypes } from 'sequelize';

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
    type: DataTypes.TEXT,
    allowNull: true
  },
  time: {
    type: DataTypes.TIME,
    allowNull: true
  },
  idCategoria: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  idStock: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
};

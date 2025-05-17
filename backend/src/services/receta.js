import { DataTypes } from 'sequelize';

export const definicionReceta = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descripcion: {
    type: DataTypes.STRING,
    allowNull: false
  },
  tiempoPreparacion: {
    type: DataTypes.INTEGER, // en minutos
    allowNull: false
  },
  idCategoria: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
};

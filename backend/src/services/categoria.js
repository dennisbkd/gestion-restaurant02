import { DataTypes } from 'sequelize'

export const definicionCategoria = {
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
    references: {
      model: 'Categoria',
      key: 'id'
    }
  }
}

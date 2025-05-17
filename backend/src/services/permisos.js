import { DataTypes } from 'sequelize'

export const definicionPermiso = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  descripcion: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
}

export const DetallePermiso = {
  idRol: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: 'Rol',
      key: 'id'
    }
  },
  idPermiso: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: 'Permisos',
      key: 'id'
    }
  }
}

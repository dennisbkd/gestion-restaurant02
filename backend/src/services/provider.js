import { DataTypes } from 'sequelize'

const definicionProveedor = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  telefono: {
    type: DataTypes.STRING(20),
    allowNull: false
  },
  correo: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  direccion: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  idEstado: {
    type: DataTypes.INTEGER,
    defaultValue: 3,
    allowNull: false
  }
}

export default definicionProveedor

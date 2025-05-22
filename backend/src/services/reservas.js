import { DataTypes } from 'sequelize'

export const definicionReserva = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  fecha: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  hora: {
    type: DataTypes.TIME,
    allowNull: false
  },
  idClienteWeb: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  idEstado: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}

export const definicionReservaMesas = {
  idReserva: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  idMesa: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}

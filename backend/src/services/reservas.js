import { DataTypes } from 'sequelize';

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
};

export const definicionMesa = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nro: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  capacidad: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  idEstado: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
};

export const mesasReserva = {
  idReserva: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: 'Reserva',
      key: 'id'
    }
  },
  idMesa: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: 'Mesas',
      key: 'id'
    }
  }
};
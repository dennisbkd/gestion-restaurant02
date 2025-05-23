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
<<<<<<< HEAD
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
=======
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
>>>>>>> b200e8d3d2399d2b69af4d1955d9fc909e6ed3a1

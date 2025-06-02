import { DataTypes } from 'sequelize'

export const definicionRol = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
}

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
  idPermisos: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: 'Permisos',
      key: 'id'
    }
  }
}

export const definicionUsuario = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombreUsuario: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true
  },
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  correo: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true
  },
  telefono: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  tipoUsuario: {
    type: DataTypes.STRING(20),
    allowNull: false,
    validate: {
      isIn: [['cliente', 'empleado', 'administrador']]
    }
  },
  idRol: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Rol',
      key: 'id'
    }
  },
  idEstado: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Estado',
      key: 'id'
    }
  }
}

import { DataTypes } from 'sequelize'

export const definicionPedido = {
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
    type: DataTypes.TIME(0),
    allowNull: false
  },
  idClienteWeb: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  idEstado: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  idEmpleado: {
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: {
      notSameAsCliente (value) {
        if (value && value === this.idClienteWeb) {
          throw new Error('El empleado no puede ser el mismo que el cliente')
        }
      }
    }
  },
  idTipoPedido: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  idDescuento: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  idReserva: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
}

export const definicionDetallePedido = {
  idPedido: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  idProducto: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  cantidad: {
    type: DataTypes.SMALLINT,
    allowNull: false
  },
  precio: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  }
}

export const definicionMesasPedido = {
  idPedido: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  idMesa: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  }
}

export const definicionMesa = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nro: {
    type: DataTypes.TINYINT,
    allowNull: false
  },
  capacidad: {
    type: DataTypes.TINYINT,
    allowNull: false
  },
  idEstado: {
    type: DataTypes.INTEGER,
    allowNull: false
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

export const definicionExclusionIngrediente = {
  idPedido: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  idProducto: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  idIngrediente: {
    type: DataTypes.INTEGER,
    primaryKey: true
  }
}

// export const definicionProducto = {
//   id: {
//     type: DataTypes.INTEGER,
//     primaryKey: true,
//     autoIncrement: true
//   },
//   nombre: {
//     type: DataTypes.STRING(100),
//     allowNull: false,
//     unique: true
//   },
//   precio: {
//     type: DataTypes.DECIMAL(10, 2),
//     allowNull: false
//   },
//   descripcion: DataTypes.TEXT,
//   tiempoPreparacion: DataTypes.TIME,
//   idCategoria: DataTypes.INTEGER
// }

export const definicionEstado = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  descripcion: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true
  }
}

import { DataTypes } from 'sequelize';

export const definicionReceta = {
idProducto: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: 'Producto',
      key: 'id'
    }
  },
  idIngrediente: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: 'Ingrediente',
      key: 'id'
    }
  },
  cantidad: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  }
};

export const definicionIngrediente = {
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
  },
};

export const definicionProducto = {
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
  precio: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  tiempoPreparacion: {
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
}

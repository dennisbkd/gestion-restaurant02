import { DataTypes } from 'sequelize'
export const definicionMenu = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  dia: {
    type: DataTypes.STRING(20),
    allowNull: false,
    validate: {
      isIn: [['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo']]
    }
  },
  idEstado: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}

import { Sequelize } from 'sequelize'

const sequelize = new Sequelize('restauranteP3', 'sa', '2004', {
  host: 'localhost',
  dialect: 'mssql',
  dialectOptions: {
    options: {
      encrypt: true,
      trustServerCertificate: true
    }
  }
})

export default sequelize

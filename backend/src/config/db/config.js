import { Sequelize } from 'sequelize'

const sequelize = new Sequelize('Restaurante', 'sa', 'CObuchan8', {
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

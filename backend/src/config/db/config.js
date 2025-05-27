import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'
dotenv.config()
// console.log("name: " + process.env.DB_NAME, "user: " + process.env.DB_USER, "pass: " + process.env.DB_PASSWORD, "host: " + process.env.DB_HOST)
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST || 'localhost',
  dialect: 'mssql',
  port: parseInt(process.env.DB_PORT, 10),
  dialectOptions: {
    options: {
      encrypt: false, // Si necesitas encriptación
      trustServerCertificate: true // Para evitar problemas con certificados
    }
  }
})

export default sequelize

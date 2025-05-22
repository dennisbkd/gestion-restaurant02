import { Sequelize } from 'sequelize'

const sequelize = new Sequelize('RestauranteP3', 'sa', '2004', {
  host: 'localhost',
  dialect: 'mssql',
  dialectOptions: {
    options: {
      encrypt: true, // Si necesitas encriptación
      trustServerCertificate: true // Para evitar problemas con certificados
    }
  }
})

export default sequelize

import { Sequelize } from 'sequelize'

const sequelize = new Sequelize('Restaurante', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql'
})

export default sequelize

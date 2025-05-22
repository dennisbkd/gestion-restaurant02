import { Sequelize } from 'sequelize'

const sequelize = new Sequelize('restaurante', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql'
})

export default sequelize

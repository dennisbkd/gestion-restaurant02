import sequelize from './config/db/config.js'

export const db = async () => {
  try {
    await sequelize.authenticate()
    console.log('base de datos en linea')
  } catch (error) {
    throw new Error('Error al levantar el servido', error)
  }
}

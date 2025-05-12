import express, { json } from 'express'
import { PORT } from './config/config.js'
import { db } from './connection.js'
import { crearAuthRutas } from './routes/auth.js'

export const CreateApp = async ({ modeloAuth }) => {
  const app = express()
  app.use(json())
  app.get('/', (req, res) => {
    res.send('servidor en linea')
  })

  db()

  app.use('/auth', crearAuthRutas({ modeloAuth }))

  app.listen(PORT, () => {
    console.log('servidor activo en el puerto:', PORT)
  })
}

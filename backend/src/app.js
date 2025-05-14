import express, { json } from 'express'
import { PORT } from './config/config.js'
import { db } from './connection.js'

import { crearAuthRutas } from './routes/auth.js'
import cookieParser from 'cookie-parser'


import { crearRutaAdministrador } from './routes/administrador.js'
import { crearRutasRoles } from './routes/roles.js'
import { crearRutasPermisos } from './routes/permisos.js'

import { PALABRA_SECRETA } from './config/authConfig.js'
import { Token } from './utils/authToken.js'

export const CreateApp = async ({ modeloAuth, modeloAdministrador,modeloRol,modeloPermiso }) => {
  const app = express()
  const token = new Token(PALABRA_SECRETA)

  app.use(cookieParser())
  app.use(json())

  db()

  modeloAuth.token = token

  app.use('/auth', crearAuthRutas({ modeloAuth }))
  app.use('/admin', crearRutaAdministrador({ modeloAdministrador, token }))
  app.use('/roles', crearRutasRoles({ modeloRol }))
  app.use('/permisos', crearRutasPermisos({ modeloPermiso })) 

  app.listen(PORT, () => {
    console.log('servidor activo en el puerto:', PORT)
  })
}

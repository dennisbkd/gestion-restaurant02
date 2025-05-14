import express, { json } from 'express'
import { PORT } from './config/config.js'
import { db } from './connection.js'

import { crearAuthRutas } from './routes/auth.js'
import { crearProveedorRutas } from './routes/provider.js'
import { crearRutaAdministrador } from './routes/administrador.js'
import { crearStockRutas } from './routes/inventario.js'//

import { crearMenuRutas } from './routes/menu.js' //

import cookieParser from 'cookie-parser'
import { PALABRA_SECRETA } from './config/authConfig.js'
import { Token } from './utils/authToken.js'

export const CreateApp = async ({ modeloAuth, modeloAdministrador, modeloProveedor, modeloMenu, modeloStock }) => { //
  const app = express()
  const token = new Token(PALABRA_SECRETA)

  app.use(cookieParser())
  app.use(json())

  db()

  modeloAuth.token = token

  app.use('/auth', crearAuthRutas({ modeloAuth }))
  app.use('/admin', crearRutaAdministrador({ modeloAdministrador, token }))

  app.use('/proveedor', crearProveedorRutas({ modeloProveedor }))

  app.use('/api/menus', crearMenuRutas({ modeloMenu })) //
  app.use('/api/inventario', crearStockRutas({ modeloStock })) //

  app.listen(PORT, () => {
    console.log('servidor activo en el puerto:', PORT)
  })
}

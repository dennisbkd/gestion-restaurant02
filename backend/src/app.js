import express, { json } from 'express'
import { PORT } from './config/config.js'
import { db } from './connection.js'

import { crearAuthRutas } from './routes/auth.js'

import { crearRutasRoles } from './routes/roles.js'
import { crearRutasPermisos } from './routes/permisos.js'
import { crearRutasInventario } from './routes/inventario.js'
import { crearProveedorRutas } from './routes/provider.js'
import { crearRutaAdministrador } from './routes/administrador.js'
import { crearRutaUsuarios } from './routes/usuario.js'

import { crearMenuRutas } from './routes/menu.js' //

import cookieParser from 'cookie-parser'
import { PALABRA_SECRETA } from './config/authConfig.js'
import { Token } from './utils/authToken.js'
import cors from 'cors'
import { crearProductoRutas } from './routes/producto.js'

export const CreateApp = async ({
  modeloAuth,
  modeloAdministrador,
  modeloProveedor,
  modeloMenu,
  modeloUsuario,
  modeloRol,
  modeloPermiso,
  modeloInventario,
  modeloProducto
}) => {
  const app = express()
  const token = new Token(PALABRA_SECRETA)

  app.use(cookieParser())
  app.use(json())
  app.use(express.json())

  app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
  }))

  db()

  modeloAuth.token = token

  app.use('/auth', crearAuthRutas({ modeloAuth }))
  app.use('/user', crearRutaUsuarios({ modeloUsuario }))
  app.use('/admin', crearRutaAdministrador({ modeloAdministrador, token }))
  app.use('/roles', crearRutasRoles({ modeloRol }))
  app.use('/inventario', crearRutasInventario({ modeloInventario }))
  app.use('/permisos', crearRutasPermisos({ modeloPermiso }))
  app.use('/proveedor', crearProveedorRutas({ modeloProveedor }))

  app.use('/menus', crearMenuRutas({ modeloMenu })) //
  app.use('/productos', crearProductoRutas({ modeloProducto }))

  app.listen(PORT, () => {
    console.log('servidor activo en el puerto:', PORT)
  })
}

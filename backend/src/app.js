import express, { json } from 'express'
import dotenv from 'dotenv'
import { PORT } from './config/config.js'
import { db } from './connection.js'
import { crearAuthRutas } from './routes/auth.js'

import { crearRutasRoles } from './routes/roles.js'
import { crearRutasPermisos } from './routes/permisos.js'
import { crearRutasInventario } from './routes/inventario.js'
import { crearProveedorRutas } from './routes/provider.js'
import { crearRutaAdministrador } from './routes/administrador.js'
import { crearRutaUsuarios } from './routes/usuario.js'
import { crearRutasPedido } from './routes/pedido.js'
import { crearRutasReservas } from './routes/reservas.js'
import { crearMenuRutas } from './routes/menu.js' //
import { crearRutasReceta } from './routes/receta.js'
import { crearRutasProducto } from './routes/producto.js'
import { crearRutaIngrediente } from './routes/ingrediente.js'

import cookieParser from 'cookie-parser'
import { PALABRA_SECRETA } from './config/authConfig.js'
import { Token } from './utils/authToken.js'
import cors from 'cors'

export const CreateApp = async ({
  modeloAuth, modeloAdministrador,
  modeloProveedor, modeloMenu,
  modeloUsuario, modeloRol,
  modeloPermiso, modeloInventario,
  modeloReserva, modeloReceta,
  modeloProducto, modeloIngrediente,
  modeloPedido
}) => {
  dotenv.config()
  const app = express()

  const token = new Token(PALABRA_SECRETA)
  modeloAuth.token = token

  app.use(cookieParser())
  app.use(json())
  app.use(express.json())

  app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
  }))

  db()

  app.use('/auth', crearAuthRutas({ modeloAuth }))
  app.use('/user', crearRutaUsuarios({ modeloUsuario }))
  app.use('/admin', crearRutaAdministrador({ modeloAdministrador, token }))
  app.use('/permisos', crearRutasPermisos({ modeloPermiso }))
  app.use('/roles', crearRutasRoles({ modeloRol }))

  app.use('/inventario', crearRutasInventario({ modeloInventario }))
  app.use('/proveedor', crearProveedorRutas({ modeloProveedor }))

  app.use('/productos', crearRutasProducto({ modeloProducto }))
  app.use('/ingredientes', crearRutaIngrediente({ modeloIngrediente }))

  app.use('/menus', crearMenuRutas({ modeloMenu }))
  app.use('/pedido', crearRutasPedido({ modeloPedido }))
  app.use('/reservas', crearRutasReservas({ modeloReserva }))
  app.use('/recetas', crearRutasReceta({ modeloReceta }))

  app.listen(PORT, () => {
    console.log('servidor activo en el puerto:', PORT)
  })
}

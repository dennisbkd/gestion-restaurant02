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
import { crearMenuRutas } from './routes/menu.js' 
import { crearRutasReceta } from './routes/receta.js'
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
  modeloPedido, modeloBitacora
}) => {
  dotenv.config()
  const app = express()

  const token = new Token(PALABRA_SECRETA)
  modeloAuth.token = token

  app.use(cookieParser())
  app.use(json())
  app.use(express.json())

  app.use(cors({
    origin: 'http://52.90.8.51:5173',
    credentials: true
  }))

  db()

  app.use('/auth', crearAuthRutas({ modeloAuth }))
  app.use('/user', crearRutaUsuarios({ modeloUsuario, modeloBitacora })) // Hecho
  app.use('/admin', crearRutaAdministrador({ modeloAdministrador, token }))
  app.use('/permisos', crearRutasPermisos({ modeloPermiso, modeloBitacora })) // Hecho
  app.use('/roles', crearRutasRoles({ modeloRol, modeloBitacora })) // Hecho

  app.use('/inventario', crearRutasInventario({ modeloInventario, modeloBitacora })) // Hecho
  app.use('/proveedor', crearProveedorRutas({ modeloProveedor, modeloBitacora })) // Hecho

  // app.use('/productos', crearRutasProducto({ modeloProducto })) // Haciendo, Ciclo 3
  app.use('/ingredientes', crearRutaIngrediente({ modeloIngrediente, modeloBitacora })) // Hecho

  app.use('/menus', crearMenuRutas({ modeloMenu, modeloBitacora })) // Hecho
  app.use('/pedido', crearRutasPedido({ modeloPedido, modeloBitacora })) // Hecho
  app.use('/reservas', crearRutasReservas({ modeloReserva, modeloBitacora })) // Hecho
  app.use('/recetas', crearRutasReceta({ modeloReceta, modeloBitacora })) // Hecho

  app.listen(PORT, '0.0.0.0', () => {
  console.log('servidor activo en el puerto:', PORT)
})

}

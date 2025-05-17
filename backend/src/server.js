import { CreateApp } from './app.js'

import { ModeloAuth } from './models/auth.js'
import { ModeloRol } from './models/roles.js'
import { ModeloPermiso } from './models/permisos.js'
import { ModeloInventario } from './models/inventario.js'
import { ModeloProveedor } from './models/provider.js'
import { ModeloUsuario } from './models/usuario.js'
import { ModeloMenu } from './models/menu.js'
import { ModeloProducto } from './models/producto.js'

CreateApp({
  modeloAuth: ModeloAuth,
  modeloProveedor: ModeloProveedor,
  modeloUsuario: ModeloUsuario,
  modeloMenu: ModeloMenu,
  modeloPermiso: ModeloPermiso,
  modeloInventario: ModeloInventario,
  modeloRol: ModeloRol,
  modeloProducto: ModeloProducto
})

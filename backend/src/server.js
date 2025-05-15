import { CreateApp } from './app.js'

import { ModeloAuth } from './models/auth.js'

import { ModeloRol } from './models/roles.js'
import { ModeloPermiso } from './models/permisos.js'
import { ModeloInventario } from './models/inventario.js'

CreateApp({ modeloAuth: ModeloAuth, modeloRol: ModeloRol, modeloPermiso: ModeloPermiso,modeloInventario: ModeloInventario
    , modeloProveedor: ModeloProveedor, modeloUsuario: ModeloUsuario, modeloMenu: ModeloMenu
 })

import { ModeloProveedor } from './models/provider.js'
import { ModeloUsuario } from './models/usuario.js'
import { ModeloMenu } from './models/menu.js'




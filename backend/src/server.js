import { CreateApp } from './app.js'

import { ModeloAuth } from './models/auth.js'
import { ModeloProveedor } from './models/provider.js'
import { ModeloUsuario } from './models/usuario.js'
import { ModeloMenu } from './models/menu.js'

CreateApp({ modeloAuth: ModeloAuth, modeloProveedor: ModeloProveedor, modeloUsuario: ModeloUsuario, modeloMenu: ModeloMenu })

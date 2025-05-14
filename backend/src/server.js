import { CreateApp } from './app.js'

import { ModeloAuth } from './models/auth.js'
import { ModeloRol } from './models/roles.js'
import { ModeloPermiso } from './models/permisos.js'

CreateApp({ modeloAuth: ModeloAuth, modeloRol: ModeloRol, modeloPermiso: ModeloPermiso })

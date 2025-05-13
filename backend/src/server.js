import { CreateApp } from './app.js'
import { ModeloAuth } from './models/auth.js'
import { ModeloProveedor } from './models/provider.js'

CreateApp({ modeloAuth: ModeloAuth, modeloProveedor: ModeloProveedor })

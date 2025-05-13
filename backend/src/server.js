import { CreateApp } from './app.js'
import { ModeloAuth } from './models/auth.js'
import { ModeloProvider } from './models/provider.js'

CreateApp({ modeloAuth: ModeloAuth, modeloProvider: ModeloProvider })

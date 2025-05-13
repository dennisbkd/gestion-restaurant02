import { Router } from 'express'
import { ControladorProvider } from '../controllers/provider.js'

export const crearProviderRutas = ({ modeloProvider }) => {
  const Providerruta = Router()
  const controladorProvider = new ControladorProvider({ modeloProvider })
  // Registrar proveedor
  Providerruta.post('/register', controladorProvider.registerProvider)

  // Obtener proveedores
  Providerruta.get('/get', controladorProvider.getProviders)

  // Actualizar proveedor
  Providerruta.put('/update', controladorProvider.updateProvider)

  // Eliminar proveedor
  Providerruta.delete('/delete', controladorProvider.deleteProvider)

  // Restaurar proveedor
  Providerruta.patch('/restore', controladorProvider.restoreProvider)
  return Providerruta
}

import { Router } from 'express'
import { ControladorProveedor } from '../controllers/provider.js'

export const crearProveedorRutas = ({ modeloProveedor }) => {
  const Proveedorruta = Router()
  const controladorProveedor = new ControladorProveedor({ modeloProveedor })
  // Registrar proveedor
  Proveedorruta.post('/register', controladorProveedor.registrarProveedor)

  // Obtener proveedores
  Proveedorruta.get('/get', controladorProveedor.obtenerProveedor)

  // Actualizar proveedor
  Proveedorruta.put('/update', controladorProveedor.actualizarProveedor)

  // Eliminar proveedor
  Proveedorruta.delete('/delete', controladorProveedor.eliminarProveedor)

  // Restaurar proveedor
  Proveedorruta.patch('/restore', controladorProveedor.restaurarProveedor)
  return Proveedorruta
}

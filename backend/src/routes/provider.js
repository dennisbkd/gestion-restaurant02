import { Router } from 'express'
import { ControladorProveedor } from '../controllers/provider.js'

export const crearProveedorRutas = ({ modeloProveedor, modeloBitacora }) => {
  const Proveedorruta = Router()
  const controladorProveedor = new ControladorProveedor({ modeloProveedor, modeloBitacora })
  // Registrar proveedor
  Proveedorruta.post('/registrar', controladorProveedor.registrarProveedor)

  // Obtener proveedores
  Proveedorruta.get('/proveedores', controladorProveedor.obtenerProveedor)

  // Actualizar proveedor
  Proveedorruta.put('/actualizar', controladorProveedor.actualizarProveedor)

  // Eliminar proveedor
  Proveedorruta.delete('/eliminar', controladorProveedor.eliminarProveedor)

  // Restaurar proveedor
  Proveedorruta.patch('/restaurar', controladorProveedor.restaurarProveedor)
  return Proveedorruta
}

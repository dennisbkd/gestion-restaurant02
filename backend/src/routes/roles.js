import { Router } from 'express'
import { ControladorRoles } from '../controllers/roles.js'

export const crearRutasRoles = ({ modeloRol, modeloBitacora }) => {
  const router = Router()
  const controlador = new ControladorRoles({ modeloRol, modeloBitacora })

  router.post('/crear', controlador.crearRol)
  router.put('/editar', controlador.editarRol)
  router.delete('/eliminar/:id', controlador.eliminarRol.bind(controlador))
  router.get('/permisos', controlador.mostrarRolesYPermisos)
  router.get('/permisos/:id', controlador.mostrarPermisoRol.bind(controlador))

  return router
}

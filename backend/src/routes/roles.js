import { Router } from 'express';
import { ControladorRoles } from '../controllers/roles.js';

export const crearRutasRoles = ({ modeloRol }) => {
  const router = Router();
  const controlador = new ControladorRoles({ modeloRol });

  router.post('/crear', controlador.crearRol);
  router.put('/editar', controlador.editarRol);
  router.delete('/eliminar', controlador.eliminarRol); 
  router.get('/permisos', controlador.mostrarRolesYPermisos);

  return router;
};

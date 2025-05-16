import { Router } from 'express';
import { ControladorRoles } from '../controllers/roles.js';

export const crearRutasRoles = ({ modeloRol }) => {
  const router = Router();
  const controlador = new ControladorRoles({ modeloRol });

  router.post('/crear', controlador.crearRol);
  router.put('/editar', controlador.editarRol);
  router.delete('/eliminar/:id', controlador.eliminarRol.bind(controlador)); 
  router.get('/permisos', controlador.mostrarRolesYPermisos);
  router.get('/permisos/:id', controlador.mostrarPermisoRol.bind(controlador));

  return router;
};

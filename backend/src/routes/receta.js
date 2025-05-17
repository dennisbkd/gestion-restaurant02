import { Router } from 'express';
import { ControladorRecetas } from '../controllers/recetas.js';

export const crearRutasRecetas = ({ modeloReceta }) => {
  const router = Router();
  const controlador = new ControladorRecetas({ modeloReceta });

  router.post('/crear', controlador.crearReceta);
  router.put('/editar', controlador.editarReceta);
  router.delete('/eliminar', controlador.eliminarIngredienteDeReceta); 
  router.get('/mostrar/:idProducto', controlador.mostrarRecetaPorProducto.bind(controlador));

  return router;
};

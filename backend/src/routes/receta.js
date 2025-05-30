import { Router } from 'express'
import { ControladorRecetas } from '../controllers/receta.js'

export const crearRutasReceta = ({ modeloReceta, modeloBitacora }) => {
  const router = Router()
  const controlador = new ControladorRecetas({ modeloReceta, modeloBitacora })

  router.post('/crear', controlador.crearReceta)
  router.put('/editar', controlador.editarReceta)
  router.delete('/eliminar', controlador.eliminarReceta)
  router.get('/mostrar', controlador.mostrarRecetaPorProducto)

  return router
}

import { Router } from 'express'
import { ControladorRecetas } from '../controllers/receta.js'

export const crearRutasReceta = ({ modeloReceta }) => {
  const router = Router()
  const controlador = new ControladorRecetas({ modeloReceta })

  router.post('/crear', controlador.crearReceta)
  router.put('/editar', controlador.editarReceta)
  router.delete('/eliminar', controlador.eliminarIngredienteDeReceta)
  router.get('/mostrar/:idProducto', controlador.mostrarRecetaPorProducto.bind(controlador))

  return router
}

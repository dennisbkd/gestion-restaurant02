import { Router } from 'express'
import { ControladorProducto } from '../controllers/productos.js'

export const crearRutasProducto = ({ modeloProducto }) => {
  const router = Router()
  const controlador = new ControladorProducto({ modeloProducto })

  router.post('/crear', controlador.crearProducto)
  router.put('/editar', controlador.editarProducto)
  router.delete('/eliminar/:id', controlador.eliminarProducto.bind(controlador))
  router.get('/mostrar', controlador.obtenerProductos)
  router.get('/mostrar/:id', controlador.obtenerProductoPorId)

  return router
}

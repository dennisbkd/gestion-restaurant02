import { Router } from 'express'
import { ControladorProducto } from '../controllers/producto.js'

export const crearRutasProducto = ({ modeloProducto }) => {
  const ProductoRuta = Router()
  const controlador = new ControladorProducto({ modeloProducto })

  ProductoRuta.post('/crear', controlador.crearProducto)
  ProductoRuta.put('/editar', controlador.editarProducto)
  ProductoRuta.delete('/eliminar/:id', controlador.eliminarProducto.bind(controlador))
  ProductoRuta.get('/mostrar', controlador.obtenerProductos)
  ProductoRuta.get('/mostrar/:id', controlador.obtenerProductoPorId)

  return ProductoRuta
}

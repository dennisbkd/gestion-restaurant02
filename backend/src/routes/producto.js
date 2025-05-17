import { Router } from 'express'
import { ControladorProducto } from '../controllers/producto.js'

export const crearProductoRutas = ({ modeloProducto }) => {
  const ProductoRuta = Router()
  const controladorProducto = new ControladorProducto({ modeloProducto })

  ProductoRuta.get('/obtener', controladorProducto.obtenerProductos)

  return ProductoRuta
}

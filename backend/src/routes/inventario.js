import { Router } from 'express'
import { ControladorInventario } from '../controllers/inventario.js'

export const crearRutasInventario = ({ modeloInventario }) => {
  const InventarioRuta = Router()
  const controladorInventario = new ControladorInventario({ modeloInventario })

  InventarioRuta.post('/agregar', controladorInventario.agregarStock)

  InventarioRuta.get('/disminuir', controladorInventario.disminuirStock)

  InventarioRuta.patch('actualizar', controladorInventario.actualizarStock)
 
  InventarioRuta.get('/mostrarStock', controladorInventario.mostrarStocks)
  InventarioRuta.get('/mostrarStock/:id', controladorInventario.mostrarStock)

  return InventarioRuta
}
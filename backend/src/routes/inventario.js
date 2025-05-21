import { Router } from 'express'
import { ControladorInventario } from '../controllers/inventario.js'

export const crearRutasInventario = ({ modeloInventario }) => {
  const InventarioRuta = Router()
  const controladorInventario = new ControladorInventario({ modeloInventario })

  InventarioRuta.post('/agregar', controladorInventario.agregarStock)
  InventarioRuta.put('/actualizar', controladorInventario.actualizarStock)
  InventarioRuta.get('/mostrarStocks', controladorInventario.mostrarStocks)
  InventarioRuta.get('/mostrarStock/:id', controladorInventario.mostrarStockPorId)
  InventarioRuta.post('/disminuir', controladorInventario.disminuirStock) 
  return InventarioRuta
}

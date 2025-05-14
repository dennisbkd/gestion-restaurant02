import { Router } from 'express'
import { ControladorStock } from '../controllers/inventario.js'

export const crearStockRutas = ({ modeloStock }) => {
  const StockRuta = Router()
  const controladorStock = new ControladorStock({ modeloStock })

  // Registrar nuevo stock
  StockRuta.post('/registrar', controladorStock.registrarStock)

  // Obtener todos los stocks
  StockRuta.get('/stocks', controladorStock.obtenerStocks)

  // Obtener stock por ID
  StockRuta.get('/stock/:id', controladorStock.obtenerStockPorId)

  // Actualizar stock
  StockRuta.put('/actualizar', controladorStock.actualizarStock)

  // Eliminar stock
  StockRuta.delete('/eliminar', controladorStock.eliminarStock)

  return StockRuta
}

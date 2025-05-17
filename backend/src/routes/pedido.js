import { Router } from 'express'
import { ControladorPedido } from '../controllers/pedido.js'

export const crearRutasPedido = ({ modeloPedido }) => {
  const crearRutasPedido = Router()
  const controladorPedido = new ControladorPedido({ modeloPedido })

  // Registrar pedido
  crearRutasPedido.post('/registrar/:idMesero', controladorPedido.registrarPedido)
  /*
  // Obtener pedidos por cliente
  crearRutasPedido.get('/cliente/:idCliente', controladorPedido.obtenerPedidosPorCliente)

  // Obtener pedidos por estado
  crearRutasPedido.get('/estado/:estado', controladorPedido.obtenerPedidosPorEstado)

  // Editar pedido
  crearRutasPedido.patch('/editar/:id', controladorPedido.editarPedido)

  // Eliminar pedido
  crearRutasPedido.delete('/eliminar/:id', controladorPedido.eliminarPedido)
*/
  return crearRutasPedido
}

import { Router } from 'express'
import { ControladorPedido } from '../controllers/pedido.js'

export const crearRutasPedido = ({ modeloPedido }) => {
  const crearRutasPedido = Router()
  const controladorPedido = new ControladorPedido({ modeloPedido })

  // Registrar pedido restringido a solo meseros
  crearRutasPedido.post('/registrar/:idMesero', controladorPedido.registrarPedido)

  // Obtener pedidos por cliente
  crearRutasPedido.get('/cliente/:idCliente', controladorPedido.obtenerPedidoClienteWeb)

  // Obtener pedidos a realizar, restringido a cocineros
  crearRutasPedido.get('/pendientes', controladorPedido.obtenerPedidosPendientes)

  /* // Editar pedido
  crearRutasPedido.patch('/editar/:id', controladorPedido.editarPedido)
*/
  // Completar pedido, restringido al cocinero
  // crearRutasPedido.patch('/completar/:id', controladorPedido.completarPedido)

  return crearRutasPedido
}

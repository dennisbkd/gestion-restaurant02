import instancia from "./axios";
export const registrarPedidoRequest = async (idUsuario, data) => {
  return instancia.post(`/pedido/registrar/${idUsuario}`, data);
};

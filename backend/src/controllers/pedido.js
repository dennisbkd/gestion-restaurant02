export class ControladorPedido {
  constructor ({ modeloPedido }) {
    this.ModeloPedido = modeloPedido
  }

  // registrarPedido
  registrarPedido = async (req, res) => {
    const { idMesero } = req.params
    const resultado = await this.ModeloPedido.registrarPedido(idMesero, { mesas: req.body.mesas }, { productos: req.body.productos })
    if (resultado.error) return res.status(400).json({ error: resultado.error, detalles: resultado.detalles })
    return res.status(201).json(resultado)
  }
}

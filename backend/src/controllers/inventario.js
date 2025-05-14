export class ControladorStock {
  constructor ({ modeloStock }) {
    this.ModeloStock = modeloStock
  }

  // Registrar un nuevo stock
  registrarStock = async (req, res) => {
    const resultado = await this.ModeloStock.registrarStock({ input: req.body })
    if (resultado.error) {
      return res.status(400).json({ error: resultado.error, detalles: resultado.detalles })
    }
    return res.status(201).json(resultado)
  }

  // Obtener todos los stocks
  obtenerStocks = async (req, res) => {
    const resultado = await this.ModeloStock.obtenerStocks()
    if (resultado.error) {
      return res.status(400).json({ error: resultado.error, detalles: resultado.detalles })
    }
    return res.status(200).json(resultado)
  }

  // Obtener un stock por ID
  obtenerStockPorId = async (req, res) => {
    const { id } = req.params
    const resultado = await this.ModeloStock.obtenerStockPorId(id)
    if (resultado.error) {
      return res.status(404).json({ error: resultado.error, detalles: resultado.detalles })
    }
    return res.status(200).json(resultado)
  }

  // Actualizar stock (sumar o restar cantidad)
  actualizarStock = async (req, res) => {
    const resultado = await this.ModeloStock.actualizarStock({ input: req.body })
    if (resultado.error) {
      return res.status(400).json({ error: resultado.error, detalles: resultado.detalles })
    }
    return res.status(200).json(resultado)
  }

  // Eliminar stock (marcar como no disponible o similar)
  eliminarStock = async (req, res) => {
    const { id } = req.body
    const resultado = await this.ModeloStock.eliminarStock(id)
    if (resultado.error) {
      return res.status(400).json({ error: resultado.error, detalles: resultado.detalles })
    }
    return res.status(200).json(resultado)
  }
}

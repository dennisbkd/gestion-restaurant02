export class ControladorInventario {
  constructor ({ modeloInventario }) {
    this.ModeloInventario = modeloInventario
  }

  // Agregar Stock
  agregarStock = async (req, res) => {
    try {
      const stock = await this.ModeloInventario.agregarStock(req.body)
      if (stock.error) return res.status(400).json({ error: stock.error })
      return res.status(200).json(stock)
    } catch (error) {
      return res.status(500).json({ error: 'Error interno del servidor' })
    }
  }

  // Disminuir stock
  disminuirStock = async (req, res) => {
  try {
    const resultado = await this.ModeloInventario.disminuirStock(req.body);
    if (resultado.error) return res.status(400).json({ error: resultado.error });
    return res.status(200).json(resultado);
  } catch (error) {
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
}


  // Actualizar producto existente
  actualizarStock = async (req, res) => {
  try {
    if (!req.body.id || !req.body.nuevoStockActual || !req.body.nuevoStockMinimo) {
      return res.status(400).json({ error: 'ID del producto, nuevo stock actual y nuevo stock mínimo son requeridos' });
    }
    const stock = await this.ModeloInventario.actualizarStock(req.body);
    if (stock.error) return res.status(400).json({ error: stock.error });
    return res.status(200).json(stock);
  } catch (error) {
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
}

  // Obtener todo el inventario
  mostrarStocks = async (req, res) => {
    try {
      const { stock } = await this.ModeloInventario.mostrarStocks()
      return res.status(200).json({ stock })
    } catch (error) {
      return res.status(500).json({
        error: 'Error al obtener inventario',
        detalles: error.message
      })
    }
  }

  mostrarStockPorId = async (req, res) => {
  try {
    const resultado = await this.ModeloInventario.mostrarStockPorId(req.params.id);
    if (resultado.error) return res.status(400).json({ error: resultado.error });
    return res.status(200).json(resultado);
  } catch (error) {
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
}

}

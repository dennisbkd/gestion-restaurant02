export class ControladorRecetas {
  constructor ({ modeloReceta }) {
    this.modeloReceta = modeloReceta
  }

  crearProductoReceta = async (req, res) => {
    try {
      const receta = await this.modeloReceta.crearProductoReceta({ input: req.body })
      if (receta.error) return res.status(400).json({ error: receta.error })
      return res.status(201).json(receta)
    } catch (error) {
      return res.status(500).json({ error: 'Error interno del servidor' })
    }
  }

  editarReceta = async (req, res) => {
    try {
      const receta = await this.modeloReceta.editarReceta({ input: req.body })
      if (receta.error) return res.status(400).json({ error: receta.error })
      return res.status(200).json(receta)
    } catch (error) {
      return res.status(500).json({ error: 'Error interno del servidor' })
    }
  }

  eliminarproductoReceta = async (req, res) => {
    try {
      const { idProducto } = req.params
      const resultado = await this.modeloReceta.eliminarProductoReceta(idProducto )
      if (resultado.error) return res.status(400).json({ error: resultado.error })
      return res.status(200).json(resultado)
    } catch (error) {
      return res.status(500).json({ error: 'Error interno del servidor' })
    }
  }

  mostrarRecetaPorProducto = async (req, res) => {
    try {
      const { idProducto } = req.params
      const receta = await this.modeloReceta.mostrarRecetaPorProducto(idProducto )
      return res.status(200).json(receta)
    } catch (error) {
      return res.status(500).json({ error: 'Error interno del servidor' })
    }
  }
}

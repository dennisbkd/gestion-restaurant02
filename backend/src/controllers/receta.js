export class ControladorRecetas {
  constructor ({ modeloReceta }) {
    this.modeloReceta = modeloReceta
  }

  crearReceta = async (req, res) => {
    const receta = await this.modeloReceta.crearReceta({ input: req.body })
    if (receta.error) return res.status(400).json({ error: receta.error })
    return res.status(201).json(receta)
  }

  editarReceta = async (req, res) => {
    const receta = await this.modeloReceta.editarReceta({ input: req.body })
    if (receta.error) return res.status(400).json({ error: receta.error })
    return res.status(200).json(receta)
  }

  eliminarReceta = async (req, res) => {
    const { idProducto } = req.body
    const receta = await this.modeloReceta.eliminarReceta({ idProducto })
    if (receta.error) return res.status(400).json({ error: receta.error })
    return res.status(200).json(receta)
  }

  mostrarRecetaPorProducto = async (req, res) => {
    const receta = await this.modeloReceta.mostrarRecetaPorProducto()
    if (receta.error) return res.status(400).json({ error: receta.detalles })
    return res.status(200).json(receta)
  }
}

export class ControladorIngrediente {
  constructor ({ modeloIngrediente }) {
    this.modeloIngrediente = modeloIngrediente
  }

  crearIngrediente = async (req, res) => {
    try {
      const ingrediente = await this.modeloIngrediente.crearIngrediente({ input: req.body })
      if (ingrediente.error) return res.status(400).json({ error: ingrediente.error })
      return res.status(201).json(ingrediente)
    } catch (error) {
      return res.status(500).json({ error: 'Error interno del servidor' })
    }
  }

  editarIngrediente = async (req, res) => {
    try {
      const ingrediente = await this.modeloIngrediente.editarIngrediente({ input: req.body })
      if (ingrediente.error) return res.status(400).json({ error: ingrediente.error })
      return res.status(200).json(ingrediente)
    } catch (error) {
      return res.status(500).json({ error: 'Error interno del servidor' })
    }
  }

  eliminarIngrediente = async (req, res) => {
    try {
      const { id } = req.params
      if (!id || isNaN(Number(id))) return res.status(400).json({ error: 'ID de ingrediente no válido' })
      const resultado = await this.modeloIngrediente.eliminarIngrediente(id)
      if (resultado.error) return res.status(400).json({ error: resultado.error })
      return res.status(200).json(resultado)
    } catch (error) {
      return res.status(500).json({ error: 'Error interno del servidor' })
    }
  }

  obtenerIngredientes = async (req, res) => {
    try {
      const ingredientes = await this.modeloIngrediente.obtenerIngredientes()
      return res.status(200).json(ingredientes)
    } catch (error) {
      return res.status(500).json({ error: 'Error al obtener ingredientes' })
    }
  }

  obtenerIngredientePorId = async (req, res) => {
    try {
      const { id } = req.params
      if (!id || isNaN(Number(id))) return res.status(400).json({ error: 'ID de ingrediente no válido' })
      const ingrediente = await this.modeloIngrediente.obtenerIngredientePorId(id)
      if (!ingrediente) return res.status(404).json({ error: 'Ingrediente no encontrado' })
      return res.status(200).json(ingrediente)
    } catch (error) {
      return res.status(500).json({ error: 'Error al obtener el ingrediente' })
    }
  }
}

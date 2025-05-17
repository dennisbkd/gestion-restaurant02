export class ControladorRecetas {
  constructor({ modeloReceta }) {
    this.modeloReceta = modeloReceta;
  }

  crearReceta = async (req, res) => {
    try {
      const receta = await this.modeloReceta.crearReceta({ input: req.body });
      if (receta.error) return res.status(400).json({ error: receta.error });
      return res.status(201).json(receta);
    } catch (error) {
      return res.status(500).json({ error: 'Error interno del servidor' });
    }
  }

  editarReceta = async (req, res) => {
    try {
      const receta = await this.modeloReceta.editarReceta({ input: req.body });
      if (receta.error) return res.status(400).json({ error: receta.error });
      return res.status(200).json(receta);
    } catch (error) {
      return res.status(500).json({ error: 'Error interno del servidor' });
    }
  }

  eliminarIngredienteDeReceta = async (req, res) => {
    try {
      const { idProducto, idIngrediente } = req.body;
      if (!idProducto || !idIngrediente) {
        return res.status(400).json({ error: 'idProducto e idIngrediente son requeridos' });
      }
      const resultado = await this.modeloReceta.eliminarIngredienteDeReceta({ idProducto, idIngrediente });
      if (resultado.error) return res.status(400).json({ error: resultado.error });
      return res.status(200).json(resultado);
    } catch (error) {
      return res.status(500).json({ error: 'Error interno del servidor' });
    }
  }

  mostrarRecetaPorProducto = async (req, res) => {
    try {
      const { idProducto } = req.params;
      if (!idProducto || isNaN(Number(idProducto))) {
        return res.status(400).json({ error: 'ID de producto inválido' });
      }
      const receta = await this.modeloReceta.mostrarRecetaPorProducto({ idProducto });
      if (!receta || receta.length === 0) {
        return res.status(404).json({ error: 'No se encontró receta para este producto' });
      }
      return res.status(200).json(receta);
    } catch (error) {
      return res.status(500).json({ error: 'Error interno del servidor' });
    }
  }
}

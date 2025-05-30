import { extraerUsuarioDesdeToken } from '../utils/extraerUsuarioDesdeToken.js'
export class ControladorIngrediente {
  constructor ({ modeloIngrediente, modeloBitacora }) {
    this.modeloIngrediente = modeloIngrediente
    this.ModeloBitacora = modeloBitacora
  }

  crearIngrediente = async (req, res) => {
    try {
      const ingrediente = await this.modeloIngrediente.crearIngrediente({ input: req.body })
      if (ingrediente.error) return res.status(400).json({ error: ingrediente.error })
      const autor = extraerUsuarioDesdeToken(req)
      if (autor) {
        await this.ModeloBitacora.registrarBitacora({
          usuario: autor,
          accion: 'Crear Ingrediente',
          descripcion: 'Agregó el Ingrediente : ' + ingrediente.nombre,
          ip: req.ip.replace('::ffff:', '')
        })
      }
      return res.status(201).json(ingrediente)
    } catch (error) {
      return res.status(500).json({ error: 'Error interno del servidor' })
    }
  }

  editarIngrediente = async (req, res) => {
    try {
      const ingrediente = await this.modeloIngrediente.editarIngrediente({ input: req.body })
      if (ingrediente.error) return res.status(400).json({ error: ingrediente.error })
      const autor = extraerUsuarioDesdeToken(req)
      if (autor) {
        await this.ModeloBitacora.registrarBitacora({
          usuario: autor,
          accion: 'Editar Ingrediente',
          descripcion: 'Editó el Ingrediente con id: ' + ingrediente.id,
          ip: req.ip.replace('::ffff:', '')
        })
      }
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
      const autor = extraerUsuarioDesdeToken(req)
      if (autor) {
        await this.ModeloBitacora.registrarBitacora({
          usuario: autor,
          accion: 'EliminarIngrediente',
          descripcion: 'Eliminó el Ingrediente con id: ' + id,
          ip: req.ip.replace('::ffff:', '')
        })
      }
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
      if (!id || isNaN(Number(id))) {
        return res.status(400).json({ error: 'ID de ingrediente no válido' })
      }

      const resultado = await this.modeloIngrediente.obtenerIngredientePorId(id)

      if (!resultado || resultado.ingrediente.length === 0) {
        return res.status(404).json({ error: 'Ingrediente no encontrado' })
      }

      return res.status(200).json(resultado)
    } catch (error) {
      return res.status(500).json({ error: 'Error al obtener el ingrediente' })
    }
  }
}

export class ControladorProducto {
  constructor ({ modeloProducto }) {
    this.modeloProducto = modeloProducto
  }

  crearProducto = async (req, res) => {
    try {
      const producto = await this.modeloProducto.crearProducto({ input: req.body })
      if (producto.error) return res.status(400).json({ error: producto.error })
      return res.status(201).json(producto)
    } catch (error) {
      return res.status(500).json({ error: 'Error interno del servidor' })
    }
  }

  editarProducto = async (req, res) => {
    try {
      const producto = await this.modeloProducto.editarProducto({ input: req.body })
      if (producto.error) return res.status(400).json({ error: producto.error })
      return res.status(200).json(producto)
    } catch (error) {
      return res.status(500).json({ error: 'Error interno del servidor' })
    }
  }

  eliminarProducto = async (req, res) => {
    try {
      const { id } = req.params
      if (!id || isNaN(Number(id))) return res.status(400).json({ error: 'ID de producto no válido' })
      const resultado = await this.modeloProducto.eliminarProducto(id)
      if (resultado.error) return res.status(400).json({ error: resultado.error })
      return res.status(200).json(resultado)
    } catch (error) {
      return res.status(500).json({ error: 'Error interno del servidor' })
    }
  }

  obtenerProductos = async (req, res) => {
    const { tipo } = req.query
    const productos = await this.modeloProducto.ObtenerProductos({ tipo })
    if (productos.error) return res.status(401).json({ error: productos.error })
    return res.status(201).json({ producto: productos })
  }

  obtenerProductoPorId = async (req, res) => {
    try {
      const { id } = req.params
      if (!id || isNaN(Number(id))) return res.status(400).json({ error: 'ID de producto no válido' })
      const producto = await this.modeloProducto.obtenerProductoPorId(id)
      if (!producto) return res.status(404).json({ error: 'Producto no encontrado' })
      return res.status(200).json(producto)
    } catch (error) {
      return res.status(500).json({ error: 'Error al obtener el producto' })
    }
  }
}

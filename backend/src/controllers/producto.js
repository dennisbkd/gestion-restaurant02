export class ControladorProducto {
  constructor ({ modeloProducto }) {
    this.ModeloProducto = modeloProducto
  }

  obtenerProductos = async (req, res) => {
    const { tipo } = req.query
    const productos = await this.ModeloProducto.ObtenerProductos({ tipo })
    if (productos.error) return res.status(401).json({ error: productos.error })
    return res.status(201).json({ producto: productos })
  }
}

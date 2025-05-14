export class ControladorInventario {
  constructor ({ modeloInventario }) {
    this.ModeloInventario = modeloInventario
  }

  // Agregar Stock
  agregarStock = async (req, res) => {
    try {
      const { descripcion, stockActual, stockMinimo } = req.body

      if (!descripcion || !stockActual || !stockMinimo) {
        return res.status(400).json({ error: 'Faltan campos obligatorios' })
      }

      const resultado = await this.ModeloInventario.agregarStock({
        descripcion,
        stockActual,
        stockMinimo
      })

      if (resultado.error) {
        return res.status(400).json({ error: resultado.error })
      }

      return res.status(201).json(resultado)
    } catch (error) {
      return res.status(500).json({
        error: 'Error interno del servidor',
        detalles: error.message
      })
    }
  }

  disminuirStock = async (req, res) => {
    try {
      const { id } = req.params
      const { cantidad } = req.body

      if (!id || !cantidad) {
        return res.status(400).json({ error: 'ID de producto y cantidad son requeridos' })
      }

      const resultado = await this.ModeloInventario.disminuirStock({ id, cantidad })

      if (resultado.error) {
        return res.status(400).json({ error: resultado.error })
      }

      return res.status(200).json(resultado)
    } catch (error) {
      return res.status(500).json({
        error: 'Error interno del servidor',
        detalles: error.message
      })
    }
  }

  // Actualizar producto existente
  actualizarStock = async (req, res) => {
    try {
      const { id } = req.params
      const { nuevoStockActual, nuevoStockMinimo, nuevaDescripcion } = req.body

      if (!id) {
        return res.status(400).json({ error: 'ID de producto es requerido' })
      }

      const resultado = await this.ModeloInventario.actualizarStock({
        id,
        nuevoStockActual,
        nuevoStockMinimo,
        nuevaDescripcion
      })

      if (resultado.error) {
        return res.status(400).json({ error: resultado.error })
      }

      return res.status(200).json(resultado)
    } catch (error) {
      return res.status(500).json({
        error: 'Error interno del servidor',
        detalles: error.message
      })
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
      const { id } = req.params

      if (!id) {
        return res.status(400).json({ error: 'ID de producto es requerido' })
      }

      const resultado = await this.ModeloInventario.mostrarStockPorId(id)

      if (resultado.error) {
        return res.status(400).json({ error: resultado.error })
      }

      return res.status(200).json(resultado)
    } catch (error) {
      return res.status(500).json({
        error: 'Error interno del servidor',
        detalles: error.message
      })
    }
  }
}

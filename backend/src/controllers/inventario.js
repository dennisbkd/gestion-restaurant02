

export class ControladorInventario {
    constructor({ modeloInventario }) {
    this.modeloInevntario = modeloInevntario;
  }
    // Agregar Stock
    static agregarStock = async (req, res) => {
        try {
            const { descripcion, stockActual, stockMinimo } = req.body;
            
            if (!descripcion || !stockActual || !stockMinimo) {
                return res.status(400).json({ error: 'Faltan campos obligatorios' });
            }

            const resultado = await StockModel.agregarStock({ 
                descripcion, 
                stockActual, 
                stockMinimo 
            });

            if (resultado.error) {
                return res.status(400).json({ error: resultado.error });
            }

            return res.status(201).json(resultado);
        } catch (error) {
            return res.status(500).json({ 
                error: 'Error interno del servidor',
                detalles: error.message 
            });
        }
    }

    // Actualizar producto existente
    static actualizarStock = async (req, res) => {
        try {
            const { id } = req.params;
            const { nuevoStockActual, nuevoStockMinimo, nuevaDescripcion } = req.body;

            if (!id) {
                return res.status(400).json({ error: 'ID de producto es requerido' });
            }

            const resultado = await StockModel.actualizarStock({ 
                id, 
                nuevoStockActual, 
                nuevoStockMinimo, 
                nuevaDescripcion 
            });

            if (resultado.error) {
                return res.status(400).json({ error: resultado.error });
            }

            return res.status(200).json(resultado);
        } catch (error) {
            return res.status(500).json({ 
                error: 'Error interno del servidor',
                detalles: error.message 
            });
        }
    }

    // Obtener todo el inventario
    static mostrarStocks = async (req, res) => {
        try {
            const { stock } = await ModeloStock.consultarStocks();
            return res.status(200).json({ stock });
        } catch (error) {
            return res.status(500).json({ 
                error: 'Error al obtener inventario',
                detalles: error.message 
            });
        }
    }


}
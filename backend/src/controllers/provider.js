export class ControladorProveedor {
  constructor ({ modeloProveedor }) {
    this.ModeloProvider = modeloProveedor
  }

  // registrar proveedor
  registrarProveedor = async (req, res) => {
    const provider = await this.ModeloProvider.registrarProveedor({
      input: req.body
    })
    if (provider.error) return res.status(400).json({ error: provider.error })
    return res.status(201).json(provider)
  }

  // obtener proveedores
  obtenerProveedor = async (req, res) => {
    const providers = await this.ModeloProvider.obtenerProveedor()
    if (providers.error) return res.status(400).json({ error: providers.error })
    return res.status(201).json(providers)
  }

  // Eliminar proveedor
  eliminarProveedor = async (req, res) => {
    const { id } = req.body
    const provider = await this.ModeloProvider.eliminarProveedor(id)
    if (provider.error) return res.status(400).json({ error: provider.error })
    return res.status(201).json(provider)
  }

  // Actualizar proveedor
  actualizarProveedor = async (req, res) => {
    const provider = await this.ModeloProvider.actualizarProveedor({
      input: req.body
    })
    if (provider.error) return res.status(400).json({ error: provider.error })
    return res.status(201).json(provider)
  }

  // Restaurar proveedor
  restaurarProveedor = async (req, res) => {
    const { id } = req.body
    const provider = await this.ModeloProvider.restaurarProveedor(id)
    if (provider.error) return res.status(400).json({ error: provider.error })
    return res.status(201).json(provider)
  }
}

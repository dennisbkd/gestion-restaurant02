export class ControladorProvider {
  constructor ({ modeloProvider }) {
    this.ModeloProvider = modeloProvider
  }

  // registrar proveedor
  registerProvider = async (req, res) => {
    const provider = await this.ModeloProvider.registerProvider({
      input: req.body
    })
    if (provider.error) return res.status(400).json({ error: provider.error })
    return res.status(201).json(provider)
  }

  // obtener proveedores
  getProviders = async (req, res) => {
    const providers = await this.ModeloProvider.getProviders()
    if (providers.error) return res.status(400).json({ error: providers.error })
    return res.status(201).json(providers)
  }

  // Eliminar proveedor
  deleteProvider = async (req, res) => {
    const { id } = req.body
    const provider = await this.ModeloProvider.deleteProvider(id)
    if (provider.error) return res.status(400).json({ error: provider.error })
    return res.status(201).json(provider)
  }

  // Actualizar proveedor
  updateProvider = async (req, res) => {
    const provider = await this.ModeloProvider.updateProvider({
      input: req.body
    })
    if (provider.error) return res.status(400).json({ error: provider.error })
    return res.status(201).json(provider)
  }

  // Restaurar proveedor
  restoreProvider = async (req, res) => {
    const { id } = req.body
    const provider = await this.ModeloProvider.restoreProvider(id)
    if (provider.error) return res.status(400).json({ error: provider.error })
    return res.status(201).json(provider)
  }
}

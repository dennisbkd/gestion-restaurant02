import { extraerUsuarioDesdeToken } from '../utils/extraerUsuarioDesdeToken.js'
export class ControladorProveedor {
  constructor ({ modeloProveedor, modeloBitacora }) {
    this.ModeloProvider = modeloProveedor
    this.ModeloBitacora = modeloBitacora
  }

  // registrar proveedor
  registrarProveedor = async (req, res) => {
    const provider = await this.ModeloProvider.registrarProveedor({
      input: req.body
    })
    if (provider.error) return res.status(400).json({ error: provider.error })
    const autor = extraerUsuarioDesdeToken(req)
    if (autor) {
      await this.ModeloBitacora.registrarBitacora({
        usuario: autor,
        accion: 'Registrar Proveedor',
        descripcion: 'Registró al Proveedor : ' + provider.nombre,
        ip: req.ip.replace('::ffff:', '')
      })
    }
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
    const autor = extraerUsuarioDesdeToken(req)
    if (autor) {
      await this.ModeloBitacora.registrarBitacora({
        usuario: autor,
        accion: 'Eliminar Proveedor',
        descripcion: 'Eliminó al Proveedor con id: ' + id,
        ip: req.ip.replace('::ffff:', '')
      })
    }
    return res.status(201).json(provider)
  }

  // Actualizar proveedor
  actualizarProveedor = async (req, res) => {
    const provider = await this.ModeloProvider.actualizarProveedor({
      input: req.body
    })
    if (provider.error) return res.status(400).json({ error: provider.error })
    const autor = extraerUsuarioDesdeToken(req)
    if (autor) {
      await this.ModeloBitacora.registrarBitacora({
        usuario: autor,
        accion: 'Eliminar Proveedor',
        descripcion: 'Actualizó al Proveedor : ' + req.body.nombre,
        ip: req.ip.replace('::ffff:', '')
      })
    }
    return res.status(201).json(provider)
  }

  // Restaurar proveedor
  restaurarProveedor = async (req, res) => {
    const { id } = req.body
    const provider = await this.ModeloProvider.restaurarProveedor(id)
    if (provider.error) return res.status(400).json({ error: provider.error })
    const autor = extraerUsuarioDesdeToken(req)
    if (autor) {
      await this.ModeloBitacora.registrarBitacora({
        usuario: autor,
        accion: 'Restaurar Proveedor',
        descripcion: 'Restauró al Proveedor con id: ' + id,
        ip: req.ip.replace('::ffff:', '')
      })
    }
    return res.status(201).json(provider)
  }
}

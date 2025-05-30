import { extraerUsuarioDesdeToken } from '../utils/extraerUsuarioDesdeToken.js'
export class ControladorPermisos {
  constructor ({ modeloPermiso, modeloBitacora }) {
    this.modeloPermiso = modeloPermiso
    this.ModeloBitacora = modeloBitacora
  }

  crearPermiso = async (req, res) => {
    try {
      const permiso = await this.modeloPermiso.crearPermiso({ input: req.body })
      if (permiso.error) return res.status(400).json({ error: permiso.error })
      const autor = extraerUsuarioDesdeToken(req)
      if (autor) {
        await this.ModeloBitacora.registrarBitacora({
          usuario: autor,
          accion: 'Crear Permiso',
          descripcion: 'Creó el permiso : ' + permiso.nombre,
          ip: req.ip.replace('::ffff:', '')
        })
      }
      return res.status(201).json(permiso)
    } catch (error) {
      return res.status(500).json({ error: 'Error interno del servidor' })
    }
  }

  editarPermiso = async (req, res) => {
    try {
      const permiso = await this.modeloPermiso.editarPermiso({ input: req.body })
      if (permiso.error) return res.status(400).json({ error: permiso.error })
      const autor = extraerUsuarioDesdeToken(req)
      if (autor) {
        await this.ModeloBitacora.registrarBitacora({
          usuario: autor,
          accion: 'Editar Permiso',
          descripcion: 'Editó el permiso : ' + permiso.nombre,
          ip: req.ip.replace('::ffff:', '')
        })
      }
      return res.status(200).json(permiso)
    } catch (error) {
      return res.status(500).json({ error: 'Error interno del servidor' })
    }
  }

  eliminarPermiso = async (req, res) => {
    try {
      const { id } = req.params
      if (!id || isNaN(Number(id))) return res.status(400).json({ error: 'ID de permiso no proporcionado' })
      const permiso = await this.modeloPermiso.eliminarPermiso(id)
      if (permiso.error) return res.status(400).json({ error: permiso.error })
      const autor = extraerUsuarioDesdeToken(req)
      if (autor) {
        await this.ModeloBitacora.registrarBitacora({
          usuario: autor,
          accion: 'Eliminar Permiso',
          descripcion: 'Eliminó el permiso : ' + permiso.nombre,
          ip: req.ip.replace('::ffff:', '')
        })
      }
      return res.status(200).json(permiso)
    } catch (error) {
      return res.status(500).json({ error: 'Error interno del servidor' })
    }
  }

  asignarPermiso = async (req, res) => {
    try {
      const permiso = await this.modeloPermiso.asignarPermiso(req.body)
      if (permiso.error) return res.status(400).json({ error: permiso.error })
      return res.status(200).json(permiso)
    } catch (error) {
      return res.status(500).json({ error: 'Error interno del servidor' })
    }
  }
}

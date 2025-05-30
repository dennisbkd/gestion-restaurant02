import { extraerUsuarioDesdeToken } from '../utils/extraerUsuarioDesdeToken.js'
// controladores/roles.js
export class ControladorRoles {
  constructor ({ modeloRol, modeloBitacora }) {
    this.modeloRol = modeloRol
    this.modeloBitacora = modeloBitacora
  }

  crearRol = async (req, res) => {
    try {
      const rol = await this.modeloRol.crearRol({ input: req.body })
      if (rol.error) return res.status(400).json({ error: rol.error })
      const autor = extraerUsuarioDesdeToken(req)
      if (autor) {
        await this.ModeloBitacora.registrarBitacora({
          usuario: autor,
          accion: 'Crear Rol',
          descripcion: 'Creó el rol : ' + rol.nombre,
          ip: req.ip.replace('::ffff:', '')
        })
      }
      return res.status(201).json(rol)
    } catch (error) {
      return res.status(500).json({ error: 'Error interno del servidor' })
    }
  }

  editarRol = async (req, res) => {
    try {
      const rol = await this.modeloRol.editarRol({ input: req.body })
      if (rol.error) return res.status(400).json({ error: rol.error })
      const autor = extraerUsuarioDesdeToken(req)
      if (autor) {
        await this.ModeloBitacora.registrarBitacora({
          usuario: autor,
          accion: 'Editar Rol',
          descripcion: 'Editó el rol : ' + rol.nombre,
          ip: req.ip.replace('::ffff:', '')
        })
      }
      return res.status(200).json(rol)
    } catch (error) {
      return res.status(500).json({ error: 'Error interno del servidor' })
    }
  }

  eliminarRol = async (req, res) => {
    try {
      const { id } = req.params
      if (!id || isNaN(Number(id))) return res.status(400).json({ error: 'ID de rol no proporcionado' })
      const rol = await this.modeloRol.eliminarRol(id)
      if (rol.error) return res.status(400).json({ error: rol.error })
      const autor = extraerUsuarioDesdeToken(req)
      if (autor) {
        await this.ModeloBitacora.registrarBitacora({
          usuario: autor,
          accion: 'Eliminar Rol',
          descripcion: 'Eliminó el rol : ' + rol.nombre,
          ip: req.ip.replace('::ffff:', '')
        })
      }
      return res.status(200).json(rol)
    } catch (error) {
      return res.status(500).json({ error: 'Error interno del servidor' })
    }
  }

  mostrarRolesYPermisos = async (req, res) => {
    try {
      const roles = await this.modeloRol.mostrarRolesYPermisos()
      if (roles.error) return res.status(400).json({ error: roles.error })
      return res.status(200).json(roles)
    } catch (error) {
      return res.status(500).json({ error: 'Error interno del servidor' })
    }
  }

  mostrarPermisoRol = async (req, res) => {
    try {
      const { id } = req.params
      const permisos = await this.modeloRol.mostrarPermisoRol(id)
      if (permisos.error) return res.status(400).json({ error: permisos.error })
      return res.status(200).json(permisos)
    } catch (error) {
      return res.status(500).json({ error: 'Error interno del servidor' })
    }
  }
}

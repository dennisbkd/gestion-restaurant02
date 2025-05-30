export class ControladorPermisos {
  constructor ({ modeloPermiso }) {
    this.modeloPermiso = modeloPermiso
  }

  crearPermiso = async (req, res) => {
    try {
      const permiso = await this.modeloPermiso.crearPermiso({ input: req.body })
      if (permiso.error) return res.status(400).json({ error: permiso.error })
      return res.status(201).json(permiso)
    } catch (error) {
      return res.status(500).json({ error: 'Error interno del servidor' })
    }
  }

  editarPermiso = async (req, res) => {
    try {
      const permiso = await this.modeloPermiso.editarPermiso({ input: req.body })
      if (permiso.error) return res.status(400).json({ error: permiso.error })
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

  mostrarPermisos = async (req, res) => {
    try {
      const permisos = await this.modeloPermiso.mostrarPermisos()
      if (permisos.error) return res.status(400).json({ error: permisos.error })
      return res.status(200).json(permisos)
    } catch (error) {
      return res.status(500).json({ error: 'Error interno del servidor' })
    }
  }
}

 // controladores/roles.js
export class ControladorRoles {
  constructor({ modeloRol }) {
    this.modeloRol = modeloRol;
  }

  crearRol = async (req, res) => {
    try {
      const rol = await this.modeloRol.crearRol({ input: req.body });
      if (rol.error) return res.status(400).json({ error: rol.error });
      return res.status(201).json(rol);
    } catch (error) {
      return res.status(500).json({ error: 'Error interno del servidor' });
    }
  }

  editarRol = async (req, res) => {
    try {
      const rol = await this.modeloRol.editarRol({ input: req.body });
      if (rol.error) return res.status(400).json({ error: rol.error });
      return res.status(200).json(rol);
    } catch (error) {
      return res.status(500).json({ error: 'Error interno del servidor' });
    }
  }

  eliminarRol = async (req, res) => {
    try {
      const { id } = req.params;
      if (!id || isNaN(Number(id))) return res.status(400).json({ error: 'ID de rol no proporcionado' }); 
      const rol = await this.modeloRol.eliminarRol(id);
      if (rol.error) return res.status(400).json({ error: rol.error });
      return res.status(200).json(rol);
    } catch (error) {
      return res.status(500).json({ error: 'Error interno del servidor' });
    }
  }

  mostrarRolesYPermisos = async (req, res) => {
    try {
      const roles = await this.modeloRol.mostrarRolesYPermisos();
      if (roles.error) return res.status(400).json({ error: roles.error });
      return res.status(200).json(roles);
    } catch (error) {
      return res.status(500).json({ error: 'Error interno del servidor' });
    }
  }
  
  mostrarPermisoRol = async (req, res) => {
    try {
      const  { id } = req.params;
      const permisos = await this.modeloRol.mostrarPermisoRol(id);
      if (permisos.error) return res.status(400).json({ error: permisos.error });
      return res.status(200).json(permisos);
    } catch (error) {
      return res.status(500).json({ error: 'Error interno del servidor' });
    }
  }

}
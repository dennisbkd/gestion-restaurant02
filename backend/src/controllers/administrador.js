export class ControladorAdministrador {
  constructor ({ modeloAdministrador }) {
    this.modeloAdministrador = modeloAdministrador
  }

  adminDashboard = (req, res) => {
    const usuario = req.user
    res.json({
      mensaje: `Bienvenido, administrador ${usuario.nombreUsuario}`,
      datos: {
        id: usuario.id,
        rol: usuario.rol
      }
    })
  }
}

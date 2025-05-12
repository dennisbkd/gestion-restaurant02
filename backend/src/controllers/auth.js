import { ValidacionDatosUsuario } from '../utils/validacionDatosUsuario.js'

export class ControladorAuth {
  constructor ({ modeloAuth }) {
    this.ModeloAuth = modeloAuth
  }

  login = async (req, res) => {
    const resultado = ValidacionDatosUsuario.loginUser(req.body)
    if (!resultado.success) return res.status(401).json({ error: resultado.error })
    const usuario = await this.ModeloAuth.login({ input: resultado })
    if (usuario.error) return res.status(400).json({ error: usuario.error })
    return res.status(201).json(usuario.user)
  }

  registrarEmpleado = async (req, res) => {
    const resultado = ValidacionDatosUsuario.verificarEmpleado(req.body)
    if (!resultado.success) return res.status(401).json({ error: resultado.error })
    const empleado = await this.ModeloAuth.registrarEmpleado({ input: resultado })
    if (empleado.error) return res.status(400).json({ error: empleado.error })
    return res.status(201).json(empleado.user)
  }
}

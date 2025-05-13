import { ValidacionDatosUsuario } from '../utils/validacionDatosUsuario.js'

export class ControladorUsuario {
  constructor ({ modeloUsuario }) {
    this.ModeloUsuario = modeloUsuario
  }

  editarUsuario = async (req, res) => {
    const resultado = ValidacionDatosUsuario.verificarDatosUsuario(req.body)
    if (!resultado.success) return res.status(401).json({ error: resultado.error })
    const usuario = await this.ModeloUsuario.editarUsuario({ input: resultado })
    if (usuario.error) return res.status(400).json({ error: usuario.error })
    return res.status(201).json(usuario.mensaje)
  }

  registrarEmpleado = async (req, res) => {
    const resultado = ValidacionDatosUsuario.verificarDatosUsuario(req.body)
    if (!resultado.success) return res.status(401).json({ error: resultado.error })
    const empleado = await this.ModeloUsuario.registrarEmpleado({ input: resultado })
    if (empleado.error) return res.status(400).json({ error: empleado.error })
    return res.status(201).json(empleado.mensaje)
  }

  verUsuarios = async (req, res) => {
    const usuarios = await this.ModeloUsuario.verUsuarios()
    if (usuarios.error) return res.status(400).json({ error: usuarios.error })

    return res.status(201).json(usuarios)
  }

  verUsuario = async (req, res) => {
    const { id } = req.query
    const usuario = await this.ModeloUsuario.verUsuario(id)
    if (usuario.error) return res.status(400).json({ error: usuario.error })
    return res.status(201).json(usuario)
  }
}

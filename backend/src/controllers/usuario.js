import { ValidacionDatosUsuario } from '../utils/validacionDatosUsuario.js'
import { extraerUsuarioDesdeToken } from '../utils/extraerUsuarioDesdeToken.js'
export class ControladorUsuario {
  constructor ({ modeloUsuario, modeloBitacora }) {
    this.ModeloUsuario = modeloUsuario
    this.ModeloBitacora = modeloBitacora
  }

  editarUsuario = async (req, res) => {
    const { id } = req.params
    const resultado = ValidacionDatosUsuario.verificarDatosUsuario(req.body)
    if (!resultado.success) return res.status(401).json({ error: resultado.error })
    const usuario = await this.ModeloUsuario.editarUsuario({ id, input: resultado })
    if (usuario.error) return res.status(400).json({ error: usuario.error })
    const autor = extraerUsuarioDesdeToken(req)
    if (autor) {
      await this.ModeloBitacora.registrarBitacora({
        usuario: autor,
        accion: 'Editar Usuario',
        descripcion: 'Se modificó al usuario con id : ' + id,
        ip: req.ip.replace('::ffff:', '')
      })
    }
    return res.status(201).json(usuario.mensaje)
  }

  registrarUsuario = async (req, res) => {
    const resultado = ValidacionDatosUsuario.verificarDatosUsuario(req.body)
    if (!resultado.success) return res.status(401).json({ error: resultado.error })
    const usuario = await this.ModeloUsuario.registrarUsuario({ input: resultado })
    if (usuario.error) return res.status(400).json({ error: usuario.error })
    const autor = extraerUsuarioDesdeToken(req)
    if (autor) {
      await this.ModeloBitacora.registrarBitacora({
        usuario: autor,
        accion: 'Registrar Usuario',
        descripcion: 'Se registró al usuario : ' + req.body.nombreUsuario,
        ip: req.ip.replace('::ffff:', '')
      })
    }
    return res.status(201).json(usuario)
  }

  verUsuarios = async (req, res) => {
    const usuarios = await this.ModeloUsuario.verUsuarios()
    if (usuarios.error) return res.status(400).json({ error: usuarios.error })
    return res.status(201).json(usuarios)
  }

  verUsuario = async (req, res) => {
    const { id } = req.params
    const usuario = await this.ModeloUsuario.verUsuario(id)
    if (usuario.error) return res.status(400).json({ error: usuario.error })
    return res.status(201).json(usuario)
  }
}

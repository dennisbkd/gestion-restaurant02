import { Router } from 'express'
import { ControladorUsuario } from '../controllers/usuario.js'

export const crearRutaUsuarios = ({ modeloUsuario }) => {
  const usuarioRuta = Router()
  const controladorUsuario = new ControladorUsuario({ modeloUsuario })
  usuarioRuta.post('/register', controladorUsuario.registrarEmpleado)
  usuarioRuta.patch('/editarUsuario', controladorUsuario.editarUsuario)
  usuarioRuta.get('/verUsuarios', controladorUsuario.verUsuarios)
  usuarioRuta.get('/verUsuario', controladorUsuario.verUsuario)
  return usuarioRuta
}

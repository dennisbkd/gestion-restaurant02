import { Router } from 'express'
import { ControladorUsuario } from '../controllers/usuario.js'

export const crearRutaUsuarios = ({ modeloUsuario, modeloBitacora }) => {
  const usuarioRuta = Router()
  const controladorUsuario = new ControladorUsuario({ modeloUsuario, modeloBitacora })
  usuarioRuta.post('/register', controladorUsuario.registrarUsuario)
  usuarioRuta.patch('/editarUsuario/:id', controladorUsuario.editarUsuario)
  usuarioRuta.get('/verUsuarios', controladorUsuario.verUsuarios)
  usuarioRuta.get('/verUsuario/:id', controladorUsuario.verUsuario)
  return usuarioRuta
}

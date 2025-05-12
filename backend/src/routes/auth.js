import { Router } from 'express'
import { ControladorAuth } from '../controllers/auth.js'

export const crearAuthRutas = ({ modeloAuth }) => {
  const Authruta = Router()
  const controladorAuth = new ControladorAuth({ modeloAuth })
  Authruta.post('/login', controladorAuth.login)
  Authruta.post('/register', controladorAuth.registrarEmpleado)
  Authruta.post('/logout')
  Authruta.post('/verificar')
  return Authruta
}

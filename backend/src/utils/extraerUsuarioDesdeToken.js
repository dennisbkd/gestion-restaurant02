import jwt from 'jsonwebtoken'
import { PALABRA_SECRETA } from '../config/authConfig.js' // o desde donde esté

export const extraerUsuarioDesdeToken = (req) => {
  const token = req.cookies.access_token
  if (!token) return null

  try {
    const payload = jwt.verify(token, PALABRA_SECRETA)
    return payload.nombreUsuario || null
  } catch (error) {
    console.error('Token inválido:', error.message)
    return null
  }
}

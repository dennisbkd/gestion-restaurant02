export const autenticacion = (token) => {
  return (req, res, next) => {
    try {
      const tokenCookie = req.cookies.access_token
      console.log(token)
      if (!tokenCookie) {
        return res.status(401).json({ error: 'Acceso no autorizado' })
      }
      const decodificacion = token.verificarToken(tokenCookie)
      req.user = decodificacion
      next()
    } catch (error) {
      return res.status(403).json({ error: 'token invalido o expirado' })
    }
  }
}
// para los roles
export const autorizacion = (roles = []) => {
  return (req, res, next) => {
    if (roles.length && !roles.includes(req.user.rol)) {
      return res.status(403).json({ error: 'No tienes permisos suficiente' })
    }
    next()
  }
}

export const clearToken = (req, res) => {
  res.clearCookie('access_token').json({ message: 'cerrada con exito' })
}

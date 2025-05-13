import jwt from 'jsonwebtoken'

export class Token {
  constructor (PALABRA_SECRETA, expiresIn = '1hr') {
    this.secreto = PALABRA_SECRETA
    this.expiracionToken = expiresIn
  }

  crearToken = (user) => {
    const nuevoJwt = jwt.sign(user, this.secreto, {
      expiresIn: this.expiracionToken
    })
    return nuevoJwt
  }

  verificarToken = (token) => {
    return jwt.verify(token, this.secreto)
  }
}

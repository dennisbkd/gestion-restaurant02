export const {
  PALABRA_SECRETA = 'clave_Secreta_para_el_restaurante_de_la_universidad',
  expiresIn = '1h',
  cookieOptions = {
    httpOnly: false,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 1000 * 60 * 60
  }
} = process.env

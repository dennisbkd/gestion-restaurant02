import sequelize from '../config/db/config.js'
import bcrypt from 'bcrypt'

import { definicionUsuario } from '../services/user.js'

export class ModeloAuth {
  constructor (token) {
    this.token = token
  }

  static Usuario = sequelize.define('Usuario', definicionUsuario, {
    timestamps: false,
    freezeTableName: true
  })

  static async login ({ input }) {
    const { nombreUsuario, password } = input.data
    try {
      const buscarUsuario = await this.Usuario.findOne({
        where: { nombreUsuario }
      })
      if (!buscarUsuario) return { error: 'Usuario no encontrado' }
      const verificarPassword = await bcrypt.compare(password, buscarUsuario.password)
      if (!verificarPassword) return { error: 'Password incorrecto' }
      const nuevoToken = this.token.crearToken({
        id: buscarUsuario.id,
        nombreUsuario: buscarUsuario.nombreUsuario,
        rol: buscarUsuario.idRol
      })
      return {
        user: {
          nombreUsuario: buscarUsuario.nombreUsuario,
          correo: buscarUsuario.correo,
          rol: buscarUsuario.idRol
        },
        nuevoToken
      }
    } catch (error) {
      throw new Error('Error al loguearse')
    }
  }

  static async perfil ({ input }) {
    const id = input.id
    const user = await this.Usuario.findByPk(id)
    if (!user) return { error: 'Error: Usuario  no existente' }
    return {
      user: {
        id: user.id,
        email: user.correo,
        userName: user.nombreUsuario,
        telefono: user.telefono,
        nombre: user.nombre,
        rol: user.idRol
      }
    }
  }
}

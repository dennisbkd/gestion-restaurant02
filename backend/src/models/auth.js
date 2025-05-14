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
      const verificarPassword = bcrypt.compare(password, buscarUsuario.password)
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

  static async registrarEmpleado ({ input }) {
    const { nombreUsuario, nombre, password, correo, telefono, idRol, ci } = input.data
    try {
      const buscarEmpleado = await this.Usuario.findOne({
        where: { nombreUsuario }
      })

      if (!buscarEmpleado) return { error: 'El empleado ya está registrado' }
      const buscarCorreo = await this.Usuario.findOne({
        where: { correo }
      })

      if (!buscarCorreo) return { error: 'El correo ya existe' }

      const hashPassword = bcrypt.hashSync(password, 10)
      try {
        await sequelize.query(
          'EXEC registrarEmpleado @nombreUsuario = :nombreUsuario, @nombre = :nombre, @password = :password, @correo = :correo, @telefono = :telefono, @idRol = :idRol, @ci = :ci',
          {
            replacements: {
              nombreUsuario,
              nombre,
              password: hashPassword,
              correo,
              telefono,
              idRol,
              ci
            }
          }
        )
      } catch (e) {
        throw new Error('Error al llamar el procedimiento almacenado')
      }
      const nuevoToken = this.token.crearToken({
        id: buscarEmpleado.id,
        nombreUsuario: buscarEmpleado.nombreUsuario,
        rol: buscarEmpleado.idRol
      })
      return {
        empleado: {
          nombreUsuario: buscarEmpleado.nombreUsuario,
          correo: buscarEmpleado.correo,
          rol: buscarEmpleado.idRol
        },
        nuevoToken
      }
    } catch (error) {
      throw new Error('Error al crearse un nuevo empleado')
    }
  }

  static async perfil ({ input }) {
    const id = input.id
    const user = await this.Usuario.findByPk(id)
    if (!user) return { error: 'Error: Usuario  no existente' }
    return {
      user: {
        email: user.correo,
        userName: user.nombreUsuario,
        rol: user.idRol
      }
    }
  }
}

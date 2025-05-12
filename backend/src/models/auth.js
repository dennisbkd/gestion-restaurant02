import sequelize from '../config/db/config.js'
import bcrypt from 'bcrypt'

import { definicionUsuario } from '../services/user.js'

export class ModeloAuth {
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
      return {
        user: {
          nombreUsuario: buscarUsuario.nombreUsuario,
          password: buscarUsuario.correo,
          rol: buscarUsuario.idRol
        }
      }
    } catch (error) {
      throw new Error(error)
    }
  }

  static async registrarEmpleado ({ input }) {
    const { nombreUsuario, nombre, password, correo, telefono, idRol, ci } = input.data
    try {
      const buscarEmpleado = await this.Usuario.findOne({
        where: { nombreUsuario }
      })

      if (buscarEmpleado) return { error: 'El empleado ya está registrado' }
      const buscarCorreo = await this.Usuario.findOne({
        where: { correo }
      })

      if (buscarCorreo) return { error: 'El correo ya existe' }

      const hashPassword = bcrypt.hashSync(password, 10)
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
      return {
        user: {
          idRol,
          ci
        }
      }
    } catch (error) {
      throw new Error(error)
    }
  }
}

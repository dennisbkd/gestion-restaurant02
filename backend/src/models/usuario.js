import sequelize from '../config/db/config.js'
import bcrypt from 'bcrypt'

import { definicionUsuario } from '../services/user.js'

export class ModeloUsuario {
  static Usuario = sequelize.define('Usuario', definicionUsuario, {
    timestamps: false,
    freezeTableName: true
  })

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
      const nuevoEmpleado = await this.Usuario.findOne({
        where: { nombreUsuario }
      })
      return {
        empleado: {
          nombreUsuario: nuevoEmpleado.nombreUsuario,
          correo: nuevoEmpleado.correo,
          rol: nuevoEmpleado.idRol
        }
      }
    } catch (error) {
      throw new Error('Error al crearse un nuevo empleado')
    }
  }


  static async editarUsuario ({ input }) {
    const { ...datos } = input.data
    try {
      const usuario = await this.Usuario.findByPk(4)

      if (!usuario) {
        return { error: 'Error: Usuario no encontrado' }
      }
      const camposPermitidos = ['nombreUsuario', 'nombre', 'correo', 'telefono', 'tipoUsuario', 'idRol']
      const camposAActualizar = {}

      for (const campo of camposPermitidos) {
        if (datos[campo] !== undefined) {
          if (campo === 'password') {
            datos[campo] = bcrypt.hashSync(datos[campo], 10)
          } else {
            camposAActualizar[campo] = datos[campo]
          }
        }
      }

      await usuario.update(camposAActualizar)

      return { mensaje: 'Usuario actualizado con éxito' }
    } catch (error) {
      console.error(error)
      throw new Error('Error al editar el usuario')
    }
  }

  static async verUsuarios () {
    try {
      const usuarios = await this.Usuario.findAll()
      if (!usuarios) return { error: 'Error: No hay usuarios' }
      return { usuarios }
    } catch (error) {
      throw new Error('Error al obtener los usuarios')
    }
  }

  static async verUsuario (id) {
    try {
      const usuario = await this.Usuario.findByPk(id)
      if (!usuario) return { error: 'Error: Usuario no encontrado' }
      return { usuario }
    } catch (error) {
      console.error(error)
      throw new Error('Error al buscar Usuario')
    }
  }
}

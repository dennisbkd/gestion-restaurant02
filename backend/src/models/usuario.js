import sequelize from '../config/db/config.js'
import bcrypt from 'bcrypt'

import { definicionUsuario, definicionEmpleado, definicionClienteWeb } from '../services/user.js'

export class ModeloUsuario {
  static Usuario = sequelize.define('Usuario', definicionUsuario, {
    timestamps: false,
    freezeTableName: true
  })

  static Empleado = sequelize.define('Empleado', definicionEmpleado, {
    timestamps: false,
    freezeTableName: true
  })

  static ClienteWeb = sequelize.define('ClienteWeb', definicionClienteWeb, {
    timestamps: false,
    freezeTableName: true
  })

  static async registrarUsuario ({ input }) {
    const { nombreUsuario, nombre, password, correo, telefono, idRol, tipoUsuario, ci = null } = input.data
    try {
      const buscarUsuario = await this.Usuario.findOne({
        where: { nombreUsuario }
      })

      if (buscarUsuario) return { error: 'El usuario ya está registrado' }
      const buscarCorreo = await this.Usuario.findOne({
        where: { correo }
      })

      if (buscarCorreo) return { error: 'El correo ya existe' }

      const hashPassword = bcrypt.hashSync(password, 10)
      try {
        await sequelize.query(
          'EXEC registrarUsuario @nombreUsuario = :nombreUsuario, @nombre = :nombre, @password = :password, @correo = :correo, @telefono = :telefono, @idRol = :idRol, @ci = :ci, @tipoUsuario = :tipoUsuario',
          {
            replacements: {
              nombreUsuario,
              nombre,
              password: hashPassword,
              correo,
              telefono,
              idRol,
              ci,
              tipoUsuario
            }
          }
        )
      } catch (e) {
        throw new Error('Error al llamar el procedimiento almacenado')
      }
      const nuevoUsuario = await this.Usuario.findOne({
        where: { nombreUsuario }
      })
      return {
        usuario: {
          nombreUsuario: nuevoUsuario.nombreUsuario,
          correo: nuevoUsuario.correo,
          rol: nuevoUsuario.idRol
        }
      }
    } catch (error) {
      throw new Error('Error al crearse un nuevo empleado')
    }
  }

  static async editarUsuario ({ id, input }) {
    const { ...datos } = input.data
    console.log(datos.password)
    try {
      const usuario = await this.Usuario.findByPk(id)

      if (!usuario) {
        return { error: 'Error: Usuario no encontrado' }
      }
      const camposPermitidos = ['nombreUsuario', 'password', 'nombre', 'correo', 'telefono', 'tipoUsuario', 'idRol', 'ci', 'direccion']
      const camposAActualizar = {}

      for (const campo of camposPermitidos) {
        if (datos[campo] !== undefined) {
          if (campo === 'password') {
            datos.password = await bcrypt.hash(datos.password, 10)
            camposAActualizar.password = datos.password
          } else if (campo === 'ci') {
            const empleado = await this.Empleado.findOne({
              where: { idUsuario: usuario.id }
            })
            await empleado.update({ ci: datos.ci })
          } else if (campo === 'direccion') {
            const cliente = await this.ClienteWeb.findOne({
              where: { idUsuario: usuario.id }
            })
            await cliente.update({ direccion: datos.direccion })
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

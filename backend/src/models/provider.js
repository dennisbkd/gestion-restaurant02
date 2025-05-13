import sequelize from '../config/db/config.js'

import definicionProveedor from '../services/provider.js'

export class ModeloProveedor {
  static Proveedor = sequelize.define('Proveedor', definicionProveedor, {
    timestamps: false,
    freezeTableName: true
  })

  // Funcion para registrar un nuevo proveedor
  static registrarProveedor = async ({ input }) => {
    const { nombre, telefono, correo, direccion } = input.data
    try {
      const buscarProveedor = await this.Proveedor.findOne({
        where: { nombre }
      })
      // si existe un proveedor con el mismo nombre no se puede registrar
      if (buscarProveedor) {
        return { error: 'El proveedor ya se encuentra registrado' }
      }
      await this.Proveedor.create({ nombre, telefono, correo, direccion })
      // retornar el proveedor registrado
      return { provider: { nombre, telefono, correo, direccion } }
    } catch (error) {
      return {
        error: 'Error al registrar el proveedor',
        detalles: error.message
      }
    }
  }

  // Funcion para obtener a todos los proveedores
  static obtenerProveedor = async () => {
    try {
      // obtenemos los proveedores y ordenamos por nombre
      const providers = await this.Proveedor.findAll()
      // retornamos los proveedores
      return { providers }
    } catch (error) {
      return {
        error: 'Error al obtener los proveedores',
        detalles: error.message
      }
    }
  }

  // Funcion para actualizar un proveedor
  static actualizarProveedor = async ({ input }) => {
    const { id, nombre, telefono, correo, direccion } = input.data
    try {
      const [updatedRows] = await this.Proveedor.update(
        { nombre, telefono, correo, direccion },
        { where: { id } }
      )

      // Verificar si se actualizaron filas
      if (updatedRows === 0) {
        // si no se actualizaron filas es porque el id no existe
        return {
          error: `No se encontró un proveedor con id ${id} para actualizar.`
        }
      }
      // retornar el proveedor actualizado
      return { provider: { id, nombre, telefono, correo, direccion } }
    } catch (error) {
      return {
        error: 'Error al actualizar el proveedor',
        detalles: error.message
      }
    }
  }

  // Funcion para eliminar un proveedor
  static eliminarProveedor = async (id) => {
    try {
      const updated = await this.Proveedor.update(
        { idEstado: 13 }, // "No disponible"
        { where: { id } }
      )

      if (updated[0] === 0) {
        return { error: `No se encontró un proveedor con id ${id}` }
      }

      return { message: `Proveedor con id ${id} marcado como no disponible` }
    } catch (error) {
      return {
        error: 'Error al eliminar el proveedor',
        detalles: error.message
      }
    }
  }

  // Funcion para volver activar un proveedor
  static restaurarProveedor = async (id) => {
    try {
      const updated = await this.Proveedor.update(
        { idEstado: 3 }, // "Disponible"
        { where: { id } }
      )

      if (updated[0] === 0) {
        return { error: `No se encontró un proveedor con id ${id}` }
      }

      return { message: `Proveedor con id ${id} marcado como disponible` }
    } catch (error) {
      return {
        error: 'Error al restaurar el proveedor',
        detalles: error.message
      }
    }
  }
}

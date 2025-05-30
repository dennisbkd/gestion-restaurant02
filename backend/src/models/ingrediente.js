import sequelize from '../config/db/config.js'
import { definicionIngrediente } from '../services/ingrediente.js'

export class ModeloIngrediente {
  static Ingrediente = sequelize.define('Ingrediente', definicionIngrediente, {
    timestamps: false,
    freezeTableName: true
  })

  // Crear ingrediente
  static async crearIngrediente ({ input }) {
    const { nombre, idUnidadMedida, idStock, idEstado } = input
    try {
      const [resultado] = await sequelize.query(
        `DECLARE @mensaje VARCHAR(200);
         EXEC set_RegistrarIngrediente 
            @nombre = :nombre, 
            @idUnidadMedida = :idUnidadMedida, 
            @idStock = :idStock, 
            @idStado = :idEstado, 
            @mensaje = @mensaje OUTPUT;
         SELECT @mensaje AS mensaje;`,
        {
          replacements: { nombre, idUnidadMedida, idStock, idEstado },
          type: sequelize.QueryTypes.SELECT
        }
      )

      if (resultado.mensaje.includes('Error')) {
        return { error: resultado.mensaje }
      }

      return { mensaje: resultado.mensaje }
    } catch (error) {
      return {
        error: 'Error al crear el ingrediente',
        detalles: error.message
      }
    }
  }

  // Editar ingrediente
  static async editarIngrediente ({ input }) {
    const { id, nombre, idUnidadMedida, idStock, idEstado } = input
    try {
      const [resultado] = await sequelize.query(
      `DECLARE @mensaje VARCHAR(200);
       EXEC set_EditarIngrediente 
          @id = :id, 
          @nombre = :nombre, 
          @idUnidadMedida = :idUnidadMedida, 
          @idStock = :idStock, 
          @idStado = :idStado, 
          @mensaje = @mensaje OUTPUT;
       SELECT @mensaje AS mensaje;`,
      {
        replacements: { id, nombre, idUnidadMedida, idStock, idStado: idEstado }, // <- aquí está el truco
        type: sequelize.QueryTypes.SELECT
      }
      )

      if (resultado.mensaje.includes('Error')) {
        return { error: resultado.mensaje }
      }

      return {
        ingrediente: { id, nombre, idUnidadMedida, idStock, idEstado },
        mensaje: resultado.mensaje
      }
    } catch (error) {
      return {
        error: 'Error al editar el ingrediente',
        detalles: error.message
      }
    }
  }

  // Eliminar ingrediente
  static async eliminarIngrediente (id) {
    try {
      const result = await sequelize.query(
        `DECLARE @mensaje VARCHAR(200);
         EXEC set_EliminarIngrediente 
            @id = :id, 
            @mensaje = @mensaje OUTPUT;
         SELECT @mensaje AS mensaje;`,
        {
          replacements: { id: Number(id) },
          type: sequelize.QueryTypes.SELECT
        }
      )

      const mensaje = result[result.length - 1].mensaje
      return { message: mensaje }
    } catch (error) {
      return {
        error: 'Error al eliminar el ingrediente',
        detalles: error.message
      }
    }
  }

  // Obtener todos los ingredientes
  static async obtenerIngredientes () {
    try {
      const ingredientes = await this.Ingrediente.findAll()
      if (!ingredientes) {
        return { error: 'Error al encontrar todos los ingredientes' }
      }
      return { ingredientes }
    } catch (error) {
      throw new Error('Error al obtener ingredientes: ' + error.message)
    }
  }

  // Obtener ingrediente por ID
  static async obtenerIngredientePorId (id) {
    try {
      const ingrediente = await sequelize.query(
        'EXEC get_MostrarIngredientePorID @id = :id',
        { replacements: { id }, type: sequelize.QueryTypes.SELECT }
      )
      return { ingrediente }
    } catch (error) {
      throw new Error('Error al obtener el ingrediente por ID: ' + error.message)
    }
  }
}

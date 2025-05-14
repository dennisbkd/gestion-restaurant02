import sequelize from "../config/db/config.js";
import { definicionStock } from '../services/inventario.js';

export class ModeloInventario {
   static Stock = sequelize.define('Stock', definicionStock, {
    timestamps: false,
    freezeTableName: true
  })

    static async agregarProducto({ descripcion, stockActual, stockMinimo }) {
        try {
            const [result] = await sequelize.query(
                'DECLARE @mensaje VARCHAR(100); ' +
                'EXEC p_AgregarStock @descripcion = :descripcion, @stockActual = :stockActual, ' +
                '@stockMinimo = :stockMinimo, @mensaje = @mensaje OUTPUT; ' +
                'SELECT @mensaje AS mensaje;',
                {
                    replacements: { descripcion, stockActual, stockMinimo },
                    type: sequelize.QueryTypes.SELECT
                }
            );

            if (result.mensaje.includes('Error') || result.mensaje.includes('ya existe')) {
                return { error: result.mensaje };
            }

            return {
                producto: { descripcion, stockActual, stockMinimo },
                mensaje: result.mensaje
            };
        } catch (error) {
            throw new Error('Error al agregar producto: ' + error.message);
        }
    }

    // Actualizar producto en el inventario
    static async actualizarProducto({ id, nuevoStockActual, nuevoStockMinimo, nuevaDescripcion }) {
        try {
            const [result] = await sequelize.query(
                'DECLARE @mensaje VARCHAR(100); ' +
                'EXEC p_ActualizarStock @id = :id, @nuevoStockActual = :nuevoStockActual, ' +
                '@nuevoStockMinimo = :nuevoStockMinimo, @nuevaDescripcion = :nuevaDescripcion, ' +
                '@mensaje = @mensaje OUTPUT; ' +
                'SELECT @mensaje AS mensaje;',
                {
                    replacements: { 
                        id, 
                        nuevoStockActual: nuevoStockActual || null, 
                        nuevoStockMinimo: nuevoStockMinimo || null, 
                        nuevaDescripcion: nuevaDescripcion || null 
                    },
                    type: sequelize.QueryTypes.SELECT
                }
            );

            if (result.mensaje.includes('Error') || result.mensaje.includes('no existe')) {
                return { error: result.mensaje };
            }

            return {
                producto: { id, nuevoStockActual, nuevoStockMinimo, nuevaDescripcion },
                mensaje: result.mensaje
            };
        } catch (error) {
            throw new Error('Error al actualizar producto: ' + error.message);
        }
    }

    // Consultar todo el inventario
    static async consultarStocks() {
        try {
            const stock = await sequelize.query(
                'EXEC p_ConsultarTodoStock',
                { type: sequelize.QueryTypes.SELECT }
            );

            return { stock };
        } catch (error) {
            throw new Error('Error al consultar inventario: ' + error.message);
        }
    }

    // Consultar productos que necesitan reorden
    
}
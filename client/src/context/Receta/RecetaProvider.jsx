import { useEffect, useState } from "react"
import { RecetaContext } from "./RecetaContext"
import { crearReceta, editarReceta, eliminarReceta, mostrarIngredientes, mostrarRecetaPorProducto } from "@/api/receta/receta"

export const RecetaProvider = ({ children }) => {

  const [receta, setReceta] = useState([])
  const [ingredientes, setIngredientes] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  const refrescarDatos = () => setRefreshTrigger(prev => prev + 1);

  useEffect(() => {
    const mostrarReceta = async () => {
      setIsLoading(true)
      try {
        const response = await mostrarRecetaPorProducto()
        if (!response) {
          throw new Error("No se pudieron cargar las recetas")
        }
        setReceta(response.data)
      } catch (error) {
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    }
    mostrarReceta()
  }, [refreshTrigger])

  useEffect(() => {
    const ObtenerIngrediente = async () => {
      try {
        const response = await mostrarIngredientes()
        if (!response) {
          throw new Error("No se pudo Obtener los Ingredientes")
        }
        setIngredientes(response.data)
      } catch (error) {
        console.error(error)
        return { mensaje: 'error al obtener todos los ingredientes' }
      }
    }
    ObtenerIngrediente()
  }, [refreshTrigger])

  const CrearReceta = async (input) => {
    try {
      const response = await crearReceta(input)
      if (!response) {
        throw new Error("No se pudo crear la receta")
      }
      setReceta(response.data)
      return { mensaje: "Receta creada exitosamente", success: true }
    } catch (error) {
      console.error(error)
      return { mensaje: "Error al crear la receta", success: false }
    }
  }

  const EditarReceta = async (input) => {
    try {
      const response = await editarReceta(input)
      if (!response) {
        throw new Error("No se pudo editar la receta")
      }
      setReceta(response.data)
      return { mensaje: "Receta editada exitosamente", success: true }
    } catch (error) {
      console.error(error)
      return { mensaje: "Error al editar la receta", success: false }
    }
  }

  const EliminarReceta = async (idProducto) => {
    try {
      const response = await eliminarReceta(idProducto)
      if (!response) {
        throw new Error("No se pudo eliminar la receta")
      }
      setReceta(prevRecetas => prevRecetas.filter(receta => receta.id !== idProducto))
      return { mensaje: "Receta eliminada exitosamente", success: true }
    } catch (error) {
      console.error(error)
      return { mensaje: "Error al eliminar la receta", success: false }
    }
  }




  return (
    <RecetaContext.Provider value={{
      receta,
      isLoading,
      ingredientes,
      CrearReceta,
      EditarReceta,
      EliminarReceta,
      refrescarDatos
    }}>
      {children}
    </RecetaContext.Provider>
  )
}

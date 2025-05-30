import instancia from "../axios";

export const crearReceta = async (input) => { instancia.post("/recetas/crear", input)}

export const editarReceta = async (input) => instancia.put("/recetas/editar", input)

export const eliminarReceta = async (idProducto) => instancia.delete("/recetas/eliminar", idProducto)

export const mostrarRecetaPorProducto = async () => instancia.get("/recetas/mostrar") 

export const mostrarIngredientes = async () => instancia.get("/ingredientes/mostrar")
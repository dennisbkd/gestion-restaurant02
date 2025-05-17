import instancia from "../axios"



export const obtenerProductos = ()=> instancia.get('/productos/obtener')
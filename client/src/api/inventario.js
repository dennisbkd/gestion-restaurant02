import instancia from "./axios";

export const getInventarioRequest = () => instancia.get("/inventario/mostrarStocks")
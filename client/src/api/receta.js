import instancia from './axios.js'


export const getIngredientsRequest = async (id) => {
  return instancia.get(`/recetas/mostrar/${id}`);
};

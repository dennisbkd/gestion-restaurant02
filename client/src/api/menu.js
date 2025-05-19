import axios from './axios.js'

export const getMenuRequest = async () => axios.get('/menus/todos')
export const editMenuRequest = async (menu) => {
    const { id, ...otrosDatos } = menu
    console.log(otrosDatos)
    return axios.patch(`/menus/editar/${id}`, otrosDatos)
}
export const createMenuRequest = async (menu) => axios.post('/menus/crear', menu)
export const deleteMenuRequest = async (id) => axios.patch(`/menus/eliminar/${id}`)

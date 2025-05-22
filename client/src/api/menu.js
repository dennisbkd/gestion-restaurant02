import instancia from './axios.js'

export const getMenuRequest = async () => instancia.get('/menus/todos')
export const editMenuRequest = async (menu) => {
    const { id, ...otrosDatos } = menu
    console.log(otrosDatos)
    return instancia.patch(`/menus/editar/${id}`, otrosDatos)
}
export const createMenuRequest = async (menu) => instancia.post('/menus/crear', menu)
export const deleteMenuRequest = async (id) => instancia.patch(`/menus/eliminar/${id}`)

import instancia from './axios.js'

export const getRolesRequest = async () => instancia.get('/roles/permisos')

export const getPermisosRequest = async () => instancia.get('/permisos/mostrar')

export const editRolRequest = async (rol) => instancia.put('/roles/editar', rol)

export const createRolRequest = async (rol) => instancia.post('/roles/crear', rol)
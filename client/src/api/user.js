import axios from './axios.js'

export const getUserRequest = async () => axios.get('/user/verUsuarios')
export const editUserRequest = async () => axios.get('/user/editarUsuario')
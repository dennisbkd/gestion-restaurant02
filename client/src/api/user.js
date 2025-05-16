import axios from './axios.js'

export const getUserRequest = async () => axios.get('/user/verUsuarios')
export const editUserRequest = async (user) => {
    const { id, ...otrosDatos } = user
    console.log(otrosDatos)
    return axios.patch(`/user/editarUsuario?id=${id}`, otrosDatos)
  }
export const registerEmployeeRequest = async (user) => axios.post('/user/register', user)
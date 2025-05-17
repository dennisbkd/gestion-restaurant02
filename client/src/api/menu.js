import axios from './axios.js'

export const getMenuRequest = async () => axios.get('/menus/todos')
import axios from "axios";

const instancia = axios.create({
  baseURL:'http://52.90.8.51:3000',
  withCredentials: true
})

export default instancia

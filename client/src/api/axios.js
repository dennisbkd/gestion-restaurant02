import axios from "axios";

const instancia = axios.create({
  baseURL:'http://localhost:3000',
  withCredentials: true
})

export default instancia

import axios from './axios.js'

export const getProviderRequest = async () => axios.get('/proveedor/proveedores')

export const createProviderRequest = async (provider) => axios.post('/proveedor/registrar', provider)

export const deleteProviderRequest = async (id) =>
    axios.delete(`/proveedor/eliminar`, {
      data: { id }
    })
  
export const restoreProviderRequest = async (id) => {return axios.patch('/proveedor/restaurar', { id })}

export const updateProviderRequest = async (provider) => axios.put('/proveedor/actualizar', provider)
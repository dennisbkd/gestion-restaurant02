import instancia from "../axios"; 

export const actualizarPerfil = (id, user) => {
  return instancia.patch(`/user/editarUsuario/${id}`, user);
}
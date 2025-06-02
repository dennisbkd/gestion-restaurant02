import { Router } from 'express'
import { ControladorMenu } from '../controllers/menu.js'

export const crearMenuRutas = ({ modeloMenu, modeloBitacora }) => {
  const MenuRuta = Router()
  const controladorMenu = new ControladorMenu({ modeloMenu, modeloBitacora })

  // Crear menú
  MenuRuta.post('/crear', controladorMenu.crearMenu)

  // Obtener todos los menús
  MenuRuta.get('/todos', controladorMenu.obtenerMenus)

  // Obtener menú por día
  MenuRuta.get('/dia/:dia', controladorMenu.obtenerMenuPorDia)

  // Editar menú
  MenuRuta.patch('/editar/:id', controladorMenu.editarMenu)

  // Eliminar menú
  MenuRuta.patch('/eliminar/:id', controladorMenu.eliminarMenu)

  return MenuRuta
}

import { Router } from 'express'
import { ControladorMenu } from '../controllers/menu.js'

export const crearMenuRutas = ({ modeloMenu }) => {
  const MenuRuta = Router()
  const controladorMenu = new ControladorMenu({ modeloMenu })

  // Crear menú
  MenuRuta.post('/registrar', controladorMenu.crearMenu)

  // Obtener todos los menús
  MenuRuta.get('/todos', controladorMenu.obtenerMenus)

  // Obtener menú por día
  MenuRuta.get('/dia/:dia', controladorMenu.obtenerMenuPorDia)

  // Editar menú
  MenuRuta.put('/actualizar/:id', controladorMenu.editarMenu)

  // Eliminar menú
  MenuRuta.delete('/eliminar/:id', controladorMenu.eliminarMenu)

  return MenuRuta
}

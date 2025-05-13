import { Router } from 'express'
import { autenticacion, autorizacion } from '../../middleware/authPermiso.js'
import { ControladorAdministrador } from '../controllers/administrador.js'

export const crearRutaAdministrador = ({ modelAdministrador, token }) => {
  const rutaAdministrador = Router()
  const controladorAdmin = new ControladorAdministrador({ modelAdministrador })

  rutaAdministrador.use(autenticacion(token))

  rutaAdministrador.get('/panelAdministrativo', autorizacion([1]), controladorAdmin.adminDashboard)
  return rutaAdministrador
}

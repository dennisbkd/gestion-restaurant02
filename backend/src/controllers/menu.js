import { extraerUsuarioDesdeToken } from '../utils/extraerUsuarioDesdeToken.js'
export class ControladorMenu {
  constructor ({ modeloMenu, modeloBitacora }) {
    this.ModeloMenu = modeloMenu
    this.ModeloBitacora = modeloBitacora
  }

  // Crear un nuevo menú
  crearMenu = async (req, res) => {
    const resultado = await this.ModeloMenu.crearMenu({ input: req.body })
    if (resultado.error) return res.status(400).json({ error: resultado.error, detalles: resultado.detalles })
    const autor = extraerUsuarioDesdeToken(req)
    if (autor) {
      await this.ModeloBitacora.registrarBitacora({
        usuario: autor,
        accion: 'Crear Menú',
        descripcion: 'Se agregó un menú para el día : ' + req.body.dia,
        ip: req.ip.replace('::ffff:', '')
      })
    }
    return res.status(201).json(resultado)
  }

  // Editar un menú existente
  editarMenu = async (req, res) => {
    console.log('hola')
    const { id } = req.params
    const resultado = await this.ModeloMenu.editarMenu({ id, input: req.body })
    if (resultado.error) return res.status(400).json({ error: resultado.error, detalles: resultado.detalles })
    const autor = extraerUsuarioDesdeToken(req)
    if (autor) {
      await this.ModeloBitacora.registrarBitacora({
        usuario: autor,
        accion: 'Editar Menú',
        descripcion: 'Se editó el menú con id : ' + id,
        ip: req.ip.replace('::ffff:', '')
      })
    }
    return res.status(200).json(resultado)
  }

  // Eliminar un menú
  eliminarMenu = async (req, res) => {
    const { id } = req.params
    const resultado = await this.ModeloMenu.eliminarMenu(id)
    if (resultado.error) return res.status(400).json({ error: resultado.error, detalles: resultado.detalles })
    const autor = extraerUsuarioDesdeToken(req)
    if (autor) {
      await this.ModeloBitacora.registrarBitacora({
        usuario: autor,
        accion: 'Elminar Menú',
        descripcion: 'Se eliminó el menú con id : ' + id,
        ip: req.ip.replace('::ffff:', '')
      })
    }
    return res.status(200).json(resultado)
  }

  // Obtener todos los menús con sus productos
  obtenerMenus = async (req, res) => {
    const resultado = await this.ModeloMenu.obtenerMenus()
    if (resultado.error) return res.status(400).json({ error: resultado.error, detalles: resultado.detalles })
    return res.status(200).json(resultado)
  }

  // Obtener un menú por su día
  obtenerMenuPorDia = async (req, res) => {
    const { dia } = req.params
    const resultado = await this.ModeloMenu.obtenerMenuPorDia(dia)
    if (resultado.error) return res.status(404).json({ error: resultado.error, detalles: resultado.detalles })
    return res.status(200).json(resultado)
  }
}

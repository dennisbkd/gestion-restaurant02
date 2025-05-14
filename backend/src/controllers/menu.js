export class ControladorMenu {
  constructor ({ modeloMenu }) {
    this.ModeloMenu = modeloMenu
  }

  // Crear un nuevo menú
  crearMenu = async (req, res) => {
    const resultado = await this.ModeloMenu.crearMenu({ input: req.body })
    if (resultado.error) return res.status(400).json({ error: resultado.error, detalles: resultado.detalles })
    return res.status(201).json(resultado)
  }

  // Editar un menú existente
  editarMenu = async (req, res) => {
    const { idMenu } = req.params
    const resultado = await this.ModeloMenu.editarMenu({ idMenu, input: req.body })
    if (resultado.error) return res.status(400).json({ error: resultado.error, detalles: resultado.detalles })
    return res.status(200).json(resultado)
  }

  // Eliminar un menú
  eliminarMenu = async (req, res) => {
    const { idMenu } = req.params
    const resultado = await this.ModeloMenu.eliminarMenu(idMenu)
    if (resultado.error) return res.status(400).json({ error: resultado.error, detalles: resultado.detalles })
    return res.status(200).json(resultado)
  }

  // Obtener todos los menús con sus productos
  obtenerMenus = async (req, res) => {
    const resultado = await this.ModeloMenu.obtenerMenus()
    if (resultado.error) return res.status(400).json({ error: resultado.error, detalles: resultado.detalles })
    return res.status(200).json(resultado)
  }

  // Obtener menú por día y estado
  obtenerMenuPorDiaYEstado = async (req, res) => {
    const { dia, idEstado } = req.params
    const resultado = await this.ModeloMenu.obtenerMenuPorDiaYEstado(dia, parseInt(idEstado))
    if (resultado.error) return res.status(404).json({ error: resultado.error, detalles: resultado.detalles })
    return res.status(200).json(resultado)
  }

  // Obtener el menú activo del día actual
  obtenerMenuPorDiaHoy = async (req, res) => {
    const resultado = await this.ModeloMenu.obtenerMenuPorDiaHoy()
    if (resultado.error) return res.status(404).json({ error: resultado.error, detalles: resultado.detalles })
    return res.status(200).json(resultado)
  }
}

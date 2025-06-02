'use client'

import { useState, useCallback } from 'react'
import {
  Plus,
  Minus,
  X,
  Check,
  ShoppingCart,
  Users,
  ChefHat,
  Trash2,
  Loader2,
  AlertCircle
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Alert, AlertDescription } from '@/components/ui/alert'

import { buscarMesasDisponibles } from '@/api/cliente/reserva'
import { obtenerProductos } from '@/api/cliente/productos'
import { getIngredientsRequest } from '@/api/receta'
import { registrarPedidoRequest } from '@/api/pedido'
import { useFetchData } from '@/hooks/useFetchData'

const categorias = [
  'Todos',
  'Postres',
  'Bebidas Alcohólicas',
  'Gaseosas',
  'Refrescos',
  'Principales'
]

// Función para determinar si un producto pertenece a la categoría "Principales"
const esPrincipal = (categoria) => {
  return ['CHANCHO', 'VACA', 'POLLO', 'MIXTO'].includes(categoria)
}

const extractMesa = (res) => res.data
const extractProductos = (res) => res.data.producto

export default function MeseroPedidos() {
  const ahora = new Date()
  const fecha = ahora.toISOString().slice(0, 10)
  const hora = ahora.toTimeString().slice(0, 8)

  const fetchFunction = useCallback(
    () => buscarMesasDisponibles(fecha, hora),
    [fecha, hora]
  )

  const { data: mesas } = useFetchData(fetchFunction, extractMesa)
  const { data: productos } = useFetchData(obtenerProductos, extractProductos)

  const [ingredientesProductos, setIngredientesProductos] = useState({})
  const [cargandoIngredientes, setCargandoIngredientes] = useState({})

  const [pedido, setPedido] = useState({
    mesas: [],
    productos: []
  })

  const [mesasSeleccionadas, setMesasSeleccionadas] = useState([])
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('Todos')

  // Estados para el modal de confirmación
  const [modalAbierto, setModalAbierto] = useState(false)
  const [enviandoPedido, setEnviandoPedido] = useState(false)
  const [errorEnvio, setErrorEnvio] = useState(null)
  const [pedidoEnviado, setPedidoEnviado] = useState(false)

  // ID del usuario (esto debería venir del contexto de autenticación)
  const idUsuario = 1 // Cambiar por el ID real del usuario logueado

  // Función para procesar los ingredientes que vienen de la API
  const procesarIngredientes = (data) => {
    if (!data || data.length === 0) return []

    // Filtramos solo los registros que tienen nombreIngrediente (no null)
    const ingredientes = data
      .filter((item) => item.nombreIngrediente !== null)
      .map((item, index) => ({
        id: index + 1, // Generamos un ID único
        nombre: item.nombreIngrediente,
        cantidad: item.cantidad
      }))

    return ingredientes
  }

  // Fetch de ingredientes desde la API
  const fetchIngredientes = async (productoId) => {
    setCargandoIngredientes((prev) => ({ ...prev, [productoId]: true }))

    try {
      const response = await getIngredientsRequest(productoId)
      const ingredientesProcesados = procesarIngredientes(response.data)

      setIngredientesProductos((prev) => ({
        ...prev,
        [productoId]: ingredientesProcesados
      }))
    } catch (error) {
      console.error('Error al cargar ingredientes:', error)
      // En caso de error, establecemos un array vacío
      setIngredientesProductos((prev) => ({
        ...prev,
        [productoId]: []
      }))
    } finally {
      setCargandoIngredientes((prev) => ({ ...prev, [productoId]: false }))
    }
  }

  const toggleMesa = (mesaId) => {
    const nuevasMesas = mesasSeleccionadas.includes(mesaId)
      ? mesasSeleccionadas.filter((id) => id !== mesaId)
      : [...mesasSeleccionadas, mesaId]

    setMesasSeleccionadas(nuevasMesas)
    setPedido((prev) => ({
      ...prev,
      mesas: nuevasMesas.map((id) => ({ id }))
    }))
  }

  const agregarProducto = async (producto) => {
    const productoExistente = pedido.productos.find((p) => p.id === producto.id)

    if (productoExistente) {
      setPedido((prev) => ({
        ...prev,
        productos: prev.productos.map((p) =>
          p.id === producto.id ? { ...p, cantidad: p.cantidad + 1 } : p
        )
      }))
    } else {
      setPedido((prev) => ({
        ...prev,
        productos: [
          ...prev.productos,
          {
            id: producto.id,
            cantidad: 1,
            precio: producto.precio,
            exclusiones: []
          }
        ]
      }))

      // Fetch ingredientes si no los tenemos
      if (!ingredientesProductos[producto.id]) {
        await fetchIngredientes(producto.id)
      }
    }
  }

  const actualizarCantidad = (productoId, nuevaCantidad) => {
    if (nuevaCantidad <= 0) {
      setPedido((prev) => ({
        ...prev,
        productos: prev.productos.filter((p) => p.id !== productoId)
      }))
    } else {
      setPedido((prev) => ({
        ...prev,
        productos: prev.productos.map((p) =>
          p.id === productoId ? { ...p, cantidad: nuevaCantidad } : p
        )
      }))
    }
  }

  const eliminarProducto = (productoId) => {
    setPedido((prev) => ({
      ...prev,
      productos: prev.productos.filter((p) => p.id !== productoId)
    }))
  }

  const toggleExclusion = (productoId, ingredienteId) => {
    setPedido((prev) => ({
      ...prev,
      productos: prev.productos.map((p) => {
        if (p.id === productoId) {
          const tieneExclusion = p.exclusiones.some(
            (e) => e.idIngrediente === ingredienteId
          )
          return {
            ...p,
            exclusiones: tieneExclusion
              ? p.exclusiones.filter((e) => e.idIngrediente !== ingredienteId)
              : [...p.exclusiones, { idIngrediente: ingredienteId }]
          }
        }
        return p
      })
    }))
  }

  const limpiarPedido = () => {
    setPedido({ mesas: [], productos: [] })
    setMesasSeleccionadas([])
    setPedidoEnviado(false)
    setErrorEnvio(null)
  }

  const calcularTotal = () => {
    return pedido.productos.reduce((total, producto) => {
      return total + producto.precio * producto.cantidad
    }, 0)
  }

  // Función para abrir el modal de confirmación
  const abrirModalConfirmacion = () => {
    setModalAbierto(true)
    setErrorEnvio(null)
  }

  // Función para enviar el pedido
  const enviarPedido = async () => {
    setEnviandoPedido(true)
    setErrorEnvio(null)

    try {
      const response = await registrarPedidoRequest(idUsuario, pedido)
      console.log('Pedido enviado exitosamente:', response.data)

      setPedidoEnviado(true)

      // Cerrar modal después de 2 segundos y limpiar pedido
      setTimeout(() => {
        setModalAbierto(false)
        limpiarPedido()
      }, 2000)
    } catch (error) {
      console.error('Error al enviar pedido:', error)
      setErrorEnvio(
        error.response?.data?.message ||
          'Error al enviar el pedido. Intenta nuevamente.'
      )
    } finally {
      setEnviandoPedido(false)
    }
  }

  const productosFiltrados = (() => {
    if (!productos) return []

    if (categoriaSeleccionada === 'Todos') {
      return productos
    } else if (categoriaSeleccionada === 'Principales') {
      return productos.filter((p) => esPrincipal(p.categoria))
    } else {
      return productos.filter((p) => p.categoria === categoriaSeleccionada)
    }
  })()

  const getCategoriaColor = (categoria) => {
    const colores = {
      Postres: 'bg-pink-100 text-pink-800',
      'Bebidas Alcohólicas': 'bg-purple-100 text-purple-800',
      Gaseosas: 'bg-blue-100 text-blue-800',
      Refrescos: 'bg-cyan-100 text-cyan-800',
      CHANCHO: 'bg-red-100 text-red-800',
      VACA: 'bg-orange-100 text-orange-800',
      POLLO: 'bg-yellow-100 text-yellow-800',
      MIXTO: 'bg-green-100 text-green-800',
      Principales: 'bg-red-100 text-red-800',
      Ensaladas: 'bg-green-100 text-green-800',
      Aperitivos: 'bg-yellow-100 text-yellow-800',
      Bebidas: 'bg-blue-100 text-blue-800'
    }
    return colores[categoria] || 'bg-gray-100 text-gray-800'
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-2 sm:p-4 lg:p-6'>
      <div className='max-w-7xl mx-auto'>
        {/* Header */}
        <div className='mb-6 text-center'>
          <div className='flex items-center justify-center gap-3 mb-2'>
            <ChefHat className='h-8 w-8 text-indigo-600' />
            <h1 className='text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900'>
              Sistema de Pedidos
            </h1>
          </div>
          <p className='text-gray-600 text-sm sm:text-base'>
            Toma el pedido del cliente de manera rápida y eficiente
          </p>
        </div>

        <div className='grid lg:grid-cols-12 gap-4 lg:gap-6'>
          {/* Selección de Mesas */}
          <div className='lg:col-span-4'>
            <Card className='h-fit shadow-lg border-0 bg-white'>
              <CardHeader>
                <CardTitle className='flex items-center gap-2 text-lg'>
                  <Users className='h-5 w-5' />
                  Seleccionar Mesas
                  {mesasSeleccionadas.length > 0 && (
                    <Badge
                      variant='secondary'
                      className='bg-white text-blue-600'
                    >
                      {mesasSeleccionadas.length}
                    </Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className='p-4'>
                <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-2'>
                  {mesas.map((mesa) => (
                    <Button
                      key={mesa.id}
                      variant={
                        mesasSeleccionadas.includes(mesa.id)
                          ? 'default'
                          : 'outline'
                      }
                      onClick={() => toggleMesa(mesa.id)}
                      className={`h-16 text-sm font-medium transition-all duration-200 flex flex-col items-center justify-center ${
                        mesasSeleccionadas.includes(mesa.id)
                          ? 'bg-blue-600 hover:bg-blue-700 shadow-md'
                          : 'hover:bg-blue-50 hover:border-blue-300'
                      }`}
                    >
                      <span className='font-semibold'>Mesa {mesa.nro}</span>
                      <span className='text-xs opacity-75'>
                        {mesa.capacidad} personas
                      </span>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Menú de Productos */}
          <div className='lg:col-span-5'>
            <Card className='shadow-lg border-0 bg-white'>
              <CardHeader>
                <CardTitle className='flex items-center gap-2 text-lg'>
                  <ChefHat className='h-5 w-5' />
                  Menú
                </CardTitle>
              </CardHeader>
              <CardContent className='p-4'>
                {/* Filtros de categoría */}
                <div className='flex flex-wrap gap-2 mb-4'>
                  {categorias.map((categoria) => (
                    <Button
                      key={categoria}
                      variant={
                        categoriaSeleccionada === categoria
                          ? 'default'
                          : 'outline'
                      }
                      size='sm'
                      onClick={() => setCategoriaSeleccionada(categoria)}
                      className='text-xs'
                    >
                      {categoria}
                    </Button>
                  ))}
                </div>

                <div className='space-y-3 max-h-96 overflow-y-auto'>
                  {productosFiltrados.map((producto) => (
                    <div
                      key={producto.id}
                      className='border rounded-lg p-3 hover:shadow-md transition-shadow bg-gray-50'
                    >
                      <div className='flex justify-between items-start mb-2'>
                        <div className='flex-1'>
                          <div className='flex items-center gap-2 mb-1'>
                            <h3 className='font-semibold text-sm'>
                              {producto.nombre}
                            </h3>
                            <Badge
                              className={`text-xs ${getCategoriaColor(
                                producto.categoria
                              )}`}
                            >
                              {esPrincipal(producto.categoria)
                                ? 'Principales'
                                : producto.categoria}
                            </Badge>
                          </div>
                          <p className='text-lg font-bold text-green-600'>
                            ${producto.precio}
                          </p>
                        </div>
                        <Button
                          onClick={() => agregarProducto(producto)}
                          size='sm'
                          className='shadow-sm'
                        >
                          <Plus className='h-4 w-4' />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Pedido Actual */}
          <div className='lg:col-span-3'>
            <Card className='shadow-lg border-0 bg-white'>
              <CardHeader>
                <CardTitle className='flex justify-between items-center text-lg'>
                  <div className='flex items-center gap-2'>
                    <ShoppingCart className='h-5 w-5' />
                    Pedido
                  </div>
                  <Button
                    variant='outline'
                    size='sm'
                    onClick={limpiarPedido}
                    disabled={pedido.productos.length === 0}
                    className='hover:bg-gray-50'
                  >
                    <Trash2 className='h-4 w-4' />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className='p-4'>
                {/* Mesas seleccionadas */}
                {mesasSeleccionadas.length > 0 && (
                  <div className='mb-4'>
                    <Label className='text-sm font-medium text-gray-700'>
                      Mesas:
                    </Label>
                    <div className='flex flex-wrap gap-1 mt-1'>
                      {mesasSeleccionadas.map((mesaId) => {
                        const mesa = mesas.find((m) => m.id === mesaId)
                        return (
                          <Badge
                            key={mesaId}
                            variant='outline'
                            className='bg-blue-50 text-blue-700 border-blue-200'
                          >
                            Mesa {mesa?.nro} ({mesa?.capacidad}p)
                          </Badge>
                        )
                      })}
                    </div>
                  </div>
                )}

                <Separator className='my-4' />

                {/* Productos en el pedido */}
                <div className='max-h-80 overflow-y-auto'>
                  {pedido.productos.length === 0 ? (
                    <div className='text-center py-8'>
                      <ShoppingCart className='h-12 w-12 text-gray-300 mx-auto mb-2' />
                      <p className='text-gray-500 text-sm'>
                        No hay productos en el pedido
                      </p>
                    </div>
                  ) : (
                    <div className='space-y-3'>
                      {pedido.productos.map((productoPedido) => {
                        const producto = productos.find(
                          (p) => p.id === productoPedido.id
                        )
                        if (!producto) return null

                        return (
                          <div
                            key={productoPedido.id}
                            className='border rounded-lg p-3 bg-gray-50'
                          >
                            <div className='flex justify-between items-center mb-2'>
                              <h4 className='font-medium text-sm'>
                                {producto.nombre}
                              </h4>
                              <Button
                                variant='outline'
                                size='sm'
                                onClick={() =>
                                  eliminarProducto(productoPedido.id)
                                }
                                className='h-6 w-6 p-0 text-red-500 hover:bg-red-50'
                              >
                                <X className='h-3 w-3' />
                              </Button>
                            </div>

                            <div className='flex items-center justify-between mb-2'>
                              <div className='flex items-center gap-2'>
                                <Button
                                  variant='outline'
                                  size='sm'
                                  onClick={() =>
                                    actualizarCantidad(
                                      productoPedido.id,
                                      productoPedido.cantidad - 1
                                    )
                                  }
                                  className='h-6 w-6 p-0'
                                >
                                  <Minus className='h-3 w-3' />
                                </Button>
                                <span className='w-8 text-center text-sm font-medium'>
                                  {productoPedido.cantidad}
                                </span>
                                <Button
                                  variant='outline'
                                  size='sm'
                                  onClick={() =>
                                    actualizarCantidad(
                                      productoPedido.id,
                                      productoPedido.cantidad + 1
                                    )
                                  }
                                  className='h-6 w-6 p-0'
                                >
                                  <Plus className='h-3 w-3' />
                                </Button>
                              </div>
                              <div className='text-sm font-bold text-green-600'>
                                $
                                {productoPedido.precio *
                                  productoPedido.cantidad}
                              </div>
                            </div>

                            {/* Exclusiones */}
                            <div>
                              <Label className='text-xs font-medium text-gray-700'>
                                Exclusiones:
                              </Label>
                              {cargandoIngredientes[productoPedido.id] ? (
                                <div className='flex items-center gap-2 mt-1'>
                                  <Loader2 className='h-3 w-3 animate-spin' />
                                  <span className='text-xs text-gray-500'>
                                    Cargando ingredientes...
                                  </span>
                                </div>
                              ) : (
                                <div className='grid grid-cols-1 gap-1 mt-1'>
                                  {(
                                    ingredientesProductos[productoPedido.id] ||
                                    []
                                  ).map((ingrediente) => (
                                    <div
                                      key={ingrediente.id}
                                      className='flex items-center space-x-2'
                                    >
                                      <Checkbox
                                        id={`${productoPedido.id}-${ingrediente.id}`}
                                        checked={productoPedido.exclusiones.some(
                                          (e) =>
                                            e.idIngrediente === ingrediente.id
                                        )}
                                        onCheckedChange={() =>
                                          toggleExclusion(
                                            productoPedido.id,
                                            ingrediente.id
                                          )
                                        }
                                        className='h-3 w-3'
                                      />
                                      <Label
                                        htmlFor={`${productoPedido.id}-${ingrediente.id}`}
                                        className='text-xs'
                                      >
                                        {ingrediente.nombre}
                                      </Label>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>

                {pedido.productos.length > 0 && (
                  <>
                    <Separator className='my-4' />
                    <div className='flex justify-between items-center font-bold text-lg bg-green-50 p-3 rounded-lg'>
                      <span>Total:</span>
                      <span className='text-green-600'>${calcularTotal()}</span>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Botones de acción */}
        {(pedido.mesas.length > 0 || pedido.productos.length > 0) && (
          <div className='mt-6 flex flex-col sm:flex-row gap-3 justify-center'>
            <Button
              disabled={
                pedido.mesas.length === 0 || pedido.productos.length === 0
              }
              onClick={abrirModalConfirmacion}
              className='shadow-lg w-full sm:w-auto'
              size='lg'
            >
              <Check className='h-5 w-5 mr-2' />
              Enviar Pedido
            </Button>
          </div>
        )}

        {/* Modal de Confirmación */}
        <Dialog open={modalAbierto} onOpenChange={setModalAbierto}>
          <DialogContent className='sm:max-w-md'>
            <DialogHeader>
              <DialogTitle className='flex items-center gap-2'>
                <ShoppingCart className='h-5 w-5' />
                Confirmar Pedido
              </DialogTitle>
              <DialogDescription>
                ¿Estás seguro de que deseas enviar este pedido?
              </DialogDescription>
            </DialogHeader>

            <div className='space-y-4'>
              {/* Resumen del pedido */}
              <div className='bg-gray-50 p-4 rounded-lg'>
                <div className='space-y-2'>
                  <div className='flex justify-between text-sm'>
                    <span className='font-medium'>Mesas:</span>
                    <span>
                      {mesasSeleccionadas
                        .map((mesaId) => {
                          const mesa = mesas.find((m) => m.id === mesaId)
                          return `Mesa ${mesa?.nro}`
                        })
                        .join(', ')}
                    </span>
                  </div>
                  <div className='flex justify-between text-sm'>
                    <span className='font-medium'>Productos:</span>
                    <span>{pedido.productos.length} items</span>
                  </div>
                  <Separator />
                  <div className='flex justify-between font-bold'>
                    <span>Total:</span>
                    <span className='text-green-600'>${calcularTotal()}</span>
                  </div>
                </div>
              </div>

              {/* Mensaje de éxito */}
              {pedidoEnviado && (
                <Alert className='border-green-200 bg-green-50'>
                  <Check className='h-4 w-4 text-green-600' />
                  <AlertDescription className='text-green-800'>
                    ¡Pedido enviado exitosamente! Se cerrará automáticamente...
                  </AlertDescription>
                </Alert>
              )}

              {/* Mensaje de error */}
              {errorEnvio && (
                <Alert variant='destructive'>
                  <AlertCircle className='h-4 w-4' />
                  <AlertDescription>{errorEnvio}</AlertDescription>
                </Alert>
              )}
            </div>

            <DialogFooter className='flex gap-2'>
              <Button
                variant='outline'
                onClick={() => setModalAbierto(false)}
                disabled={enviandoPedido || pedidoEnviado}
              >
                Cancelar
              </Button>
              <Button
                onClick={enviarPedido}
                disabled={enviandoPedido || pedidoEnviado}
                className='min-w-[100px]'
              >
                {enviandoPedido ? (
                  <>
                    <Loader2 className='h-4 w-4 animate-spin mr-2' />
                    Enviando...
                  </>
                ) : pedidoEnviado ? (
                  <>
                    <Check className='h-4 w-4 mr-2' />
                    Enviado
                  </>
                ) : (
                  'Confirmar'
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
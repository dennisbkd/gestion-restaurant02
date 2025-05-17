
import { useEffect } from 'react'
import { useState } from 'react'

import CartShopping from '../../assets/CartShopping'
import { useCart } from '../../context/CartContext'
import { obtenerProductos } from '../../api/cliente/productos'

export default function Menu() {
  const [productos, setProductos] = useState([])
  const { agregarAlCarrito } = useCart()
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const res = await obtenerProductos()
        const data = res.data.producto
        console.log(data)
        setProductos(data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchProductos()
  }, [setProductos])

  return (
    <div className="md:container md:mx-auto grid gap-6 p-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 transition-opacity duration-300">
      {productos.map(producto => (
        <div
          key={producto.id}
          className="bg-white rounded-2xl shadow-lg flex flex-col items-center p-6 transition-transform hover:scale-105"
        >
          <img
            src={producto.imagen}
            alt={producto.nombre}
            className="w-24 h-24 rounded-xl object-cover mb-4"
          />
          <h3 className="text-lg font-semibold mb-1">{producto.nombre}</h3>
          <p className="text-gray-500 text-sm text-center mb-2">{producto.descripcion}</p>
          <span className="mt-1 font-bold text-orange-500">{parseInt(producto.precio)} bs</span>
          <button onClick={() => agregarAlCarrito(producto)}
            className="mt-4 flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium shadow transition"
          >
            <CartShopping />
            Agregar al carrito
          </button>
        </div>
      ))}
    </div>
  )
}

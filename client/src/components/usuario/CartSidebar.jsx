import { useState } from 'react';
import { Link } from 'react-router';
import { XMarkIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';
import { useCart } from '../../context/CartContext';


const CartSidebar = () => {
  const {
    cart,
    removerDelCarrito,
    actualizarCantidad,
    total
  } = useCart();

  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);
  console.log(cart)
  return (
    <div className="relative">
      <button
        onClick={toggleSidebar}
        className="fixed top-4 right-4 z-30 p-3 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 transition-colors"
        aria-label="Abrir carrito"
      >
        <ShoppingCartIcon className="h-6 w-6" />
        {cart.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
            {cart.reduce((sum, item) => sum + item.quantity, 0)}
          </span>
        )}
      </button>

      {/* Overlay y Sidebar */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0  backdrop-blur-sm"
            onClick={toggleSidebar}
          />

          <div className="fixed top-0 right-0 h-full w-full sm:w-96 bg-white shadow-xl z-50">
            <div className="flex flex-col h-full">
              {/* Encabezado */}
              <div className="flex justify-between items-center p-4 border-b">
                <h2 className="text-xl font-bold text-gray-800">Tu Carrito</h2>
                <button
                  onClick={toggleSidebar}
                  className="text-gray-500 hover:text-gray-700"
                  aria-label="Cerrar carrito"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>

              {/* Lista de productos */}
              <div className="flex-1 overflow-y-auto p-4">
                {cart.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <ShoppingCartIcon className="mx-auto h-12 w-12 text-gray-300" />
                    <p className="mt-2">Tu carrito está vacío</p>
                  </div>
                ) : (
                  <ul className="space-y-4">
                    {cart.map(item => (
                      <li key={item.id} className="flex justify-between items-start border-b pb-4">
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-800">{item.nombre}</h3>
                          <p className="text-gray-600">{item.precio} bs</p>
                          <div className="flex items-center mt-2">
                            <button
                              onClick={() => actualizarCantidad(item.id, item.quantity - 1)}
                              className="px-2 py-1 bg-gray-200 rounded-l hover:bg-gray-300"
                            >
                              -
                            </button>
                            <span className="px-4 py-1 bg-gray-100">{item.quantity}</span>
                            <button
                              onClick={() => actualizarCantidad(item.id, item.quantity + 1)}
                              className="px-2 py-1 bg-gray-200 rounded-r hover:bg-gray-300"
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <div className="flex flex-col items-end">
                          <p className="font-medium">{(item.precio * item.quantity).toFixed(2)} bs</p>
                          <button
                            onClick={() => removerDelCarrito(item.id)}
                            className="text-red-500 hover:text-red-700 mt-2 text-sm"
                          >
                            Eliminar
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Resumen y botón de checkout */}
              {cart.length > 0 && (
                <div className="border-t p-4">
                  <div className="flex justify-between mb-4">
                    <span className="font-medium">Total:</span>
                    <span className="font-bold">{total.toFixed(2)} bs</span>
                  </div>
                  <Link
                    onClick={toggleSidebar}
                    to="/checkout"
                    className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors text-center block"
                  >
                    Proceder al Pago
                  </Link>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};


export default CartSidebar;
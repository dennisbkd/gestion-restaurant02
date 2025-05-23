import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
export const CartContext = createContext();

export function useCart() {

  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart debe usarse dentro de un CartProvider");
  }
  return context;
}

export const CartProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    if (isAuthenticated) { localStorage.setItem('cart', JSON.stringify(cart)); }
    else { localStorage.removeItem('cart'); }
  }, [cart, isAuthenticated]);

  const agregarAlCarrito = (producto) => {
    setCart(prevCart => {
      const productoExistente = prevCart.find(item => item.id === producto.id);

      if (productoExistente) {
        return prevCart.map(item =>
          item.id === producto.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prevCart, { ...producto, quantity: 1 }];
    });
  };

  const removerDelCarrito = (id) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };

  const actualizarCantidad = (id, nuevaCantidad) => {
    if (nuevaCantidad < 1) {
      removerDelCarrito(id);
      return;
    }

    setCart(prevCart =>
      prevCart.map(item =>
        item.id === id ? { ...item, quantity: nuevaCantidad } : item
      )
    );
  };

  const limpiarCarrito = () => {
    setCart([]);
  };

  const total = cart.reduce(
    (sum, item) => sum + (item.precio * item.quantity),
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        agregarAlCarrito,
        removerDelCarrito,
        actualizarCantidad,
        limpiarCarrito,
        total
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
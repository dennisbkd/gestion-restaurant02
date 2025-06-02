
import { MetodoPago } from '../../components/MetodoPago/MetodoPago';
import { useCart } from '../../context/CartContext';

export default function CheckoutPage() {
  const { cart, total, limpiarCarrito } = useCart();

  const handlePaymentSuccess = () => {
    // Lógica después de pago exitoso
    limpiarCarrito();
    // Redirigir a página de éxito
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Confirmar Compra</h1>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Resumen del pedido */}
        <div className="md:col-span-2 bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Resumen de tu pedido</h2>
          <ul className="divide-y">
            {cart.map(item => (
              <li key={item.id} className="py-4 flex justify-between">
                <div>
                  <h3 className="font-medium">{item.nombre}</h3>
                  <p className="text-gray-600">Cantidad: {item.quantity}</p>
                </div>
                <span className="font-medium">${(item.precio * item.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <div className="border-t pt-4 mt-4">
            <p className="flex justify-between font-bold text-lg">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </p>
          </div>
        </div>

        {/* Selección de método de pago */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Método de pago</h2>
          <MetodoPago onSuccess={handlePaymentSuccess} />
        </div>
      </div>
    </div>
  );
}
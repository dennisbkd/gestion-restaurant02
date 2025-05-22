import { useState } from 'react';

export function MetodoPago({ onSuccess }) {
  const [selectedMethod, setSelectedMethod] = useState('tarjeta');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica de procesamiento de pago
    console.log('Procesando pago con:', selectedMethod);
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-4">
        <div className="flex items-center">
          <input
            type="radio"
            id="credit-card"
            name="payment"
            value="tarjeta"
            checked={selectedMethod === 'tarjeta'}
            onChange={() => setSelectedMethod('tarjeta')}
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
          />
          <label htmlFor="credit-card" className="ml-3 block text-sm font-medium text-gray-700">
            Tarjeta de crédito/débito
          </label>
        </div>

        <div className="flex items-center">
          <input
            type="radio"
            id="paypal"
            name="payment"
            value="paypal"
            checked={selectedMethod === 'paypal'}
            onChange={() => setSelectedMethod('paypal')}
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
          />
          <label htmlFor="paypal" className="ml-3 block text-sm font-medium text-gray-700">
            PayPal
          </label>
        </div>

        {/* Campos adicionales según método de pago */}
        {selectedMethod === 'tarjeta' && (
          <div className="mt-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Número de tarjeta</label>
              <input
                type="text"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="1234 5678 9012 3456"
              />
            </div>
            {/* Más campos para tarjeta... */}
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Confirmar Pago
        </button>
      </div>
    </form>
  );
}
// components/CartModal.tsx
'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useState } from 'react';
import { Link } from 'react-router';

export function CartModal() {
  const { cart, removerDelCarrito, total, actualizarCantidad } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="relative"
        onClick={() => setIsOpen(true)}
      >
        <ShoppingBag className="h-5 w-5" />
        <span className="sr-only">Carrito</span>
        {cart.length > 0 && (
          <span
            className="absolute -top-1 -right-1 flex h-4 w-4 items-center 
            justify-center rounded-full bg-primary text-[10px]
            font-medium text-primary-foreground animate-bounce"

            key={cart.reduce((sum, item) => sum + item.quantity, 0)}
          >
            {cart.reduce((sum, item) => sum + item.quantity, 0)}
          </span>
        )}
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent
          aria-describedby="cart-content-description"
          className="sm:max-w-[425px]">
          <DialogHeader id="cart-content-description">
            <DialogTitle>Tu Carrito</DialogTitle>
            <DialogDescription>
              {cart.length > 0
                ? `Tienes ${cart.length} productos en tu carrito`
                : "Tu carrito está vacío"
              }
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            {cart.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <ShoppingBag className="mx-auto h-12 w-12 mb-2" />
                <p>Tu carrito está vacío</p>
              </div>
            ) : (
              <>
                <div className="space-y-4 max-h-[60vh] overflow-y-auto">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-start gap-4 border-b pb-4">
                      <div className="relative h-16 w-16 rounded-md overflow-hidden">
                        <img
                          src={item.imagen || '/placeholder-product.png'}
                          alt={item.nombre}
                          className="object-cover h-full w-full"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">{item.nombre}</h3>
                        <p className="text-sm text-muted-foreground">
                          {item.quantity} × {item.precio} Bs.
                        </p>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => actualizarCantidad(item.id, item.quantity - 1)}
                        >
                          -
                        </Button>
                        <span className="text-sm">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => actualizarCantidad(item.id, item.quantity + 1)}
                        >
                          +
                        </Button>
                      </div>
                      <div className="flex flex-col items-end">
                        <p className="font-medium">{(item.precio * item.quantity).toFixed(2)} Bs.</p>
                        <Button
                          variant="link"
                          size="sm"
                          className="text-destructive h-auto p-0"
                          onClick={() => removerDelCarrito(item.id)}
                        >
                          Eliminar
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between font-medium">
                    <span>Total:</span>
                    <span>{total.toFixed(2)} Bs.</span>
                  </div>
                  <Link to="/checkout" onClick={() => setIsOpen(false)}>
                    <Button className="w-full mt-4">
                      Proceder al Pago
                    </Button>
                  </Link>
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
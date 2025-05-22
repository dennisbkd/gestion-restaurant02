import { useState } from 'react';
import { Link } from 'react-router';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { useCart } from '../../context/CartContext';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../ui/card';
import { ScrollArea } from '../ui/scroll-area';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { X } from 'lucide-react';
import { Button } from '../ui/button';


const CartSidebar = () => {
  const {
    cart,
    removerDelCarrito,
    actualizarCantidad,
    total
  } = useCart();

  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);
  return (
    <div className="relative">
      {/* Botón flotante del carrito */}
      <Button
        variant="default"
        size="icon"
        className="fixed top-4 right-4 z-30 rounded-full h-12 w-12 shadow-lg"
        onClick={toggleSidebar}
        aria-label="Abrir carrito"
      >
        <ShoppingCartIcon className="h-5 w-5" />
        {cart.length > 0 && (
          <Badge
            variant="destructive"
            className="absolute -top-2 -right-2 h-6 w-6 flex items-center justify-center p-0"
          >
            {cart.reduce((sum, item) => sum + item.quantity, 0)}
          </Badge>
        )}
      </Button>

      {/* Overlay y Sidebar */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={toggleSidebar}
          />
          <Card className="fixed top-0 right-0 h-full w-full sm:w-96 rounded-none border-l z-50 shadow-xl animate-in slide-in-from-right-96 duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-semibold">Tu Carrito</CardTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleSidebar}
                aria-label="Cerrar carrito"
              >
                <X className="h-5 w-5" />
              </Button>
            </CardHeader>

            <Separator />

            <CardContent className="p-0 h-[calc(100%-180px)]">
              <ScrollArea className="h-full p-4">
                {cart.length === 0 ? (
                  <Alert variant="default">
                    <ShoppingCartIcon className="h-5 w-5" />
                    <AlertTitle>Carrito vacío</AlertTitle>
                    <AlertDescription>
                      No hay productos en tu carrito
                    </AlertDescription>
                  </Alert>
                ) : (
                  <ul className="space-y-4">
                    {cart.map(item => (
                      <li key={item.id} className="space-y-3">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h3 className="font-medium">{item.nombre}</h3>
                            <p className="text-sm text-muted-foreground">
                              {item.precio} bs
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removerDelCarrito(item.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => actualizarCantidad(item.id, item.quantity - 1)}
                          >
                            -
                          </Button>
                          <input type="number"
                            value={item.quantity}
                            onChange={(e) => actualizarCantidad(item.id, parseInt(e.target.value))}
                            className="w-12 text-center"
                            min="1">
                          </input>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => actualizarCantidad(item.id, item.quantity + 1)}
                          >
                            +
                          </Button>
                          <span className="ml-auto font-medium">
                            {(item.precio * item.quantity).toFixed(2)} bs
                          </span>
                        </div>
                        <Separator />
                      </li>
                    ))}
                  </ul>
                )}
              </ScrollArea>
            </CardContent>

            {cart.length > 0 && (
              <>
                <Separator />
                <CardFooter className="flex flex-col space-y-4">
                  <div className="flex justify-between w-full">
                    <span className="font-medium">Total:</span>
                    <span className="font-bold">{total.toFixed(2)} bs</span>
                  </div>
                  <Button
                    asChild
                    className="w-full"
                    onClick={toggleSidebar}
                  >
                    <Link to="/checkout">
                      Proceder al Pago
                    </Link>
                  </Button>
                </CardFooter>
              </>
            )}
          </Card>
        </>
      )}
    </div>
  );
};


export default CartSidebar;
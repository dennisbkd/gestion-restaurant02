import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { ShoppingCart } from 'lucide-react'
import { Badge } from '../ui/badge'

// Agrupar productos por categoría


export const ProductosFiltrados = ({ categoria, agregarAlCarrito, productos }) => {

  const productosPorCategoria = productos.reduce((acc, producto) => {
    // Mapeo de categorías de la base de datos a las categorías del menú
    let categoria;
    switch (producto.subCategoria) {
      case 2:
        categoria = 2;
        break;
      case 1:
        categoria = 1;
        break;
      case null:
        categoria = null;
        break;
      default:
        categoria = 2;
    }

    if (!acc[categoria]) {
      acc[categoria] = [];
    }
    acc[categoria].push(producto);
    return acc;
  }, {});

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {(productosPorCategoria[categoria.id] || []).map((producto) => (
        <Card key={producto.id} className="overflow-hidden transition-all hover:shadow-md">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">{producto.nombre}</CardTitle>
              <div className="text-lg font-bold">{producto.precio} Bs.</div>
            </div>
            {producto.subCategoria && (
              <div className="flex gap-2 mt-1">
                <Badge variant="outline">
                  {producto.subCategoria === 1 ? 'Popular' : 'Nuevo'}
                </Badge>
              </div>
            )}
          </CardHeader>
          <CardContent>
            <CardDescription className="text-sm">
              {producto.descripcion}
            </CardDescription>
            {producto.tiempoPreparacion !== '00:00:00' && (
              <div className="mt-2 text-xs text-muted-foreground">
                Tiempo preparación: {producto.tiempoPreparacion}
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button
              onClick={() => agregarAlCarrito(producto)}
              className="w-full gap-2"
              size="sm"
            >
              <ShoppingCart className="h-4 w-4" />
              Agregar al carrito
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

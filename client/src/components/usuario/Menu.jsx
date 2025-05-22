import { useSearchParams } from 'react-router'
import { useEffect } from 'react'
import { useState } from 'react'
import { Card, CardContent, CardHeader } from '../ui/card'

import { Utensils, GlassWater, IceCream } from 'lucide-react'
import { Skeleton } from '../ui/skeleton'
import { useCart } from '../../context/CartContext'
import { obtenerProductos } from '../../api/cliente/productos'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { ProductosFiltrados } from '../producto/ProductosFiltrados'

const menuCategories = [
  { id: 2, label: 'Principales', icon: Utensils },
  { id: 1, label: 'Bebidas', icon: GlassWater },
  { id: null, label: 'Postres', icon: IceCream },
]

export default function MenuPage() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const { agregarAlCarrito } = useCart();
  const [searchParams] = useSearchParams();
  const tipoFiltro = searchParams.get('tipo') || '';

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        setLoading(true);
        const res = await obtenerProductos(tipoFiltro);
        setProductos(res.data.producto);
      } catch (error) {
        console.error('Error cargando productos:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProductos();
  }, [tipoFiltro]);



  return (
    <div className="flex container mx-auto min-h-screen flex-col">
      <main className="flex-1">
        <div className="container py-8 md:py-12">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold md:text-4xl">Nuestro Menú</h1>
            <p className="mt-2 text-muted-foreground">
              Descubre nuestra selección de platos preparados con los mejores ingredientes
            </p>
          </div>

          <Tabs defaultValue={2} className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-3">
              {menuCategories.map((category) => (
                <TabsTrigger key={category.id} value={category.id} className="flex items-center gap-2">
                  <category.icon className="h-4 w-4" />
                  <span>{category.label}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {menuCategories.map((categoria) => (
              <TabsContent key={categoria.id} value={categoria.id} className="mt-6">
                {loading ? (
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {[...Array(3)].map((_, i) => (
                      <Card key={i} className="overflow-hidden">
                        <CardHeader>
                          <Skeleton className="h-6 w-3/4" />
                          <Skeleton className="h-4 w-1/2 mt-2" />
                        </CardHeader>
                        <CardContent>
                          <Skeleton className="h-4 w-full" />
                          <Skeleton className="h-4 w-4/5 mt-2" />
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <ProductosFiltrados
                    productos={productos}
                    categoria={categoria}
                    agregarAlCarrito={agregarAlCarrito}
                  />
                )}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </main>
      {/* <UserFooter /> */}
    </div>
  );
}

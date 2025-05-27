import { useState } from "react"
import { cn } from "@/lib/utils"
import { Link } from "react-router"
import { UtensilsCrossed, Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger, SheetDescription, SheetTitle } from "@/components/ui/sheet"
import { CartModal } from "@/components/modals/ModalCarrito"
import { Button } from "@/components/ui/button"
//import { Theme } from "../Tema/Theme"

export function Header({ isAuthenticated, user, signOut }) {

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { email, userName } = user?.user || { email: "anonimos@gmail.com", userName: "Anonimos" }
  const routes = [
    { to: "/login", label: "Inicio" },
    { to: "/", label: "Menú" },
    { to: "/reservar", label: "Reservar" },
    { to: "/contacto", label: "Contacto" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center">
        <Link to="/" className="flex items-center gap-2 font-semibold">
          <UtensilsCrossed className="h-6 w-6" />
          <span className="text-xl font-bold">Sabores</span>
        </Link>
        <nav className="hidden md:flex ml-10 gap-6">
          {routes.map((route) => (
            <Link
              key={route.to}
              to={route.to}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                route.to === "/login" ? "text-primary" : "text-muted-foreground",
              )}
            >
              {route.label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-4">
          {/* <Theme /> */}
          <CartModal />
          {isAuthenticated ? (
            <div className="hidden md:flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-black mr-2
                 flex-shrink-0 flex items-center justify-center 
                 text-white text-xs">
                {userName.charAt(0).toUpperCase()}
                {userName.charAt(1)}
              </div>
              <div className="flex flex-col">
                <Link to="/perfil" className="grid font-medium text-sm transition-transform duration-300 bg-transparent hover:bg-gray-300 hover:scale-105 rounded px-2 py-1">
                  <span className="font-medium text-sm">{userName}</span>
                  <span className="text-xs text-muted-foreground">{email}</span>
                </Link>
              </div>
              <Button asChild variant="ghost" size="sm">
                <Link to="/" onClick={signOut}>Cerrar Sesión</Link>
              </Button>
            </div>
          ) : (
            <div className="hidden md:flex gap-2">
              <Button asChild variant="ghost" size="sm">
                <Link to="/login">Iniciar Sesión</Link>
              </Button>
              <Button asChild size="sm">
                <Link to="/registro">Registrarse</Link>
              </Button>
            </div>
          )}
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="pr-0">
              <SheetTitle className="sr-only">Menú de navegación</SheetTitle>
              <SheetDescription className="sr-only">
                Menú desplegable con opciones de navegación
              </SheetDescription>
              <div className="px-7">
                <Link to="/" className="flex items-center gap-2 font-semibold" onClick={() => setIsMenuOpen(false)}>
                  <UtensilsCrossed className="h-6 w-6" />
                  <span className="text-xl font-bold">Sabores</span>
                </Link>
              </div>
              <nav className="mt-8 flex flex-col gap-4 px-7">
                {routes.map((route) => (
                  <Link
                    key={route.to}
                    to={route.to}
                    className="text-base font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {route.label}
                  </Link>
                ))}
                <div className="mt-4 flex flex-col gap-2">
                  {isAuthenticated ? (
                    <div className="flex items-center gap-5">
                      <img
                        src={user.avatar}
                        alt={userName}
                        className="align-top w-10 h-10 rounded-full border object-cover"
                      />
                      <div className="flex flex-col gap-9">
                        <Link to="/perfil" className="grid text-base font-medium transition-transform duration-300 bg-transparent hover:bg-gray-300 hover:scale-105 rounded px-2 py-1" onClick={() => setIsMenuOpen(false)}>
                          <span className="font-medium text-sm">{userName}</span>
                          <span className="text-xs text-muted-foreground">{email}</span>
                        </Link>
                        <Button asChild variant="ghost" size="sm" className="ml-2">
                          <Link to="/" onClick={() => { setIsMenuOpen(false); signOut(); }}>Cerrar Sesión</Link>
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <Button asChild variant="ghost" size="sm">
                        <Link to="/login" onClick={() => setIsMenuOpen(false)}>Iniciar Sesión</Link>
                      </Button>
                      <Button asChild size="sm">
                        <Link to="/registro" onClick={() => setIsMenuOpen(false)}>Registrarse</Link>
                      </Button>
                    </>
                  )}
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
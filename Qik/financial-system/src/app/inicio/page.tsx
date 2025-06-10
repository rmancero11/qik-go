import Link from "next/link"
import { LayoutDashboard, Receipt, CreditCard, Package, TruckIcon, Droplets } from "lucide-react"
import { Logo } from "@/components/logo"
import { HydrationBoundary } from "@/components/hydration-boundary"
import dynamic from "next/dynamic"

// Cargar el componente cliente dinámicamente
const InicioClientComponent = dynamic(
  () => import("@/components/inicio-client").then((mod) => ({ default: mod.InicioClientComponent })),
  {
    ssr: false,
    loading: () => (
      <div className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="h-20 bg-muted rounded-md animate-pulse"></div>
          <div className="h-20 bg-muted rounded-md animate-pulse"></div>
        </div>
        <div className="max-w-2xl mx-auto">
          <div className="h-64 bg-muted rounded-md animate-pulse"></div>
        </div>
      </div>
    ),
  },
)

// Definición de las categorías y sus opciones
const categories = [
  {
    id: "finanzas",
    name: "Finanzas",
    icon: "LayoutDashboard",
    mainPath: "/",
    options: [
      { id: "dashboard", name: "Ver dashboard financiero", path: "/", icon: "BarChart3" },
      { id: "reporte", name: "Generar reporte", path: "#", icon: "BarChart3" },
    ],
  },
  {
    id: "movimientos",
    name: "Movimientos",
    icon: "Receipt",
    mainPath: "/movimientos",
    options: [
      { id: "ver", name: "Ver todos los movimientos", path: "/movimientos", icon: "Receipt" },
      {
        id: "nuevo",
        name: "Registrar nuevo movimiento",
        path: "/movimientos/nuevo",
        icon: "PlusCircle",
      },
    ],
  },
  {
    id: "cuentas",
    name: "Cuentas",
    icon: "CreditCard",
    mainPath: "/cuentas",
    options: [
      { id: "ver", name: "Ver todas las cuentas", path: "/cuentas", icon: "CreditCard" },
      { id: "nueva", name: "Crear nueva cuenta", path: "/cuentas/nueva", icon: "PlusCircle" },
    ],
  },
  {
    id: "inventario",
    name: "Inventario",
    icon: "Package",
    mainPath: "/inventario",
    options: [
      { id: "ver", name: "Ver inventario", path: "/inventario", icon: "Package" },
      {
        id: "nuevo",
        name: "Agregar nuevo producto",
        path: "/inventario/nuevo",
        icon: "PlusCircle",
      },
      {
        id: "perdida",
        name: "Registrar pérdida",
        path: "/inventario/registrar-perdida",
        icon: "AlertTriangle",
      },
      {
        id: "stock",
        name: "Configurar stock mínimo",
        path: "/inventario/configurar-stock",
        icon: "Settings",
      },
      {
        id: "pedido",
        name: "Realizar pedido",
        path: "/inventario/realizar-pedido",
        icon: "ShoppingCart",
      },
    ],
  },
  {
    id: "proveedores",
    name: "Proveedores",
    icon: "TruckIcon",
    mainPath: "/proveedores",
    options: [{ id: "ver", name: "Ver proveedores", path: "/proveedores", icon: "TruckIcon" }],
  },
  {
    id: "servicios",
    name: "Servicios",
    icon: "Droplets",
    mainPath: "/servicios",
    options: [
      { id: "ver", name: "Ver consumos", path: "/servicios", icon: "Droplets" },
      {
        id: "nuevo",
        name: "Registrar nuevo consumo",
        path: "/servicios/nuevo",
        icon: "PlusCircle",
      },
    ],
  },
]

export default function InicioPage() {
  return (
    <HydrationBoundary>
      <div className="flex min-h-screen flex-col">
        <div className="flex flex-1">
          {/* Sidebar */}
          <aside className="hidden w-64 flex-col border-r bg-muted/40 md:flex">
            <div className="flex h-14 items-center border-b px-4">
              <Logo />
            </div>
            <nav className="grid gap-2 px-2 py-4">
              <Link
                href="/inicio"
                className="flex items-center gap-3 rounded-lg bg-accent px-3 py-2 text-accent-foreground"
              >
                <LayoutDashboard className="h-5 w-5" />
                <span>Inicio</span>
              </Link>
              <Link
                href="/"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              >
                <LayoutDashboard className="h-5 w-5" />
                <span>Finanzas</span>
              </Link>
              <Link
                href="/movimientos"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              >
                <Receipt className="h-5 w-5" />
                <span>Movimientos</span>
              </Link>
              <Link
                href="/cuentas"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              >
                <CreditCard className="h-5 w-5" />
                <span>Cuentas</span>
              </Link>
              <Link
                href="/inventario"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              >
                <Package className="h-5 w-5" />
                <span>Inventario</span>
              </Link>
              <Link
                href="/proveedores"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              >
                <TruckIcon className="h-5 w-5" />
                <span>Proveedores</span>
              </Link>
              <Link
                href="/servicios"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              >
                <Droplets className="h-5 w-5" />
                <span>Servicios</span>
              </Link>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 overflow-auto">
            <div className="container py-12 max-w-4xl">
              {/* Header con Logo */}
              <div className="text-center mb-12">
                <div className="flex justify-center mb-4">
                  <Logo size="lg" />
                </div>
                <p className="text-lg text-primary font-medium mb-8">
                  ¡Bienvenido a tu sistema de gestión empresarial!
                </p>
              </div>

              {/* Componente Cliente para la interactividad */}
              <InicioClientComponent categories={categories} />
            </div>
          </main>
        </div>
      </div>
    </HydrationBoundary>
  )
}

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { HydrationBoundary } from "@/components/hydration-boundary"
import { LayoutDashboard, Receipt, CreditCard, Package, TruckIcon, PlusCircle, Droplets } from "lucide-react"
import { Logo } from "@/components/logo"
import dynamic from "next/dynamic"

// Cargar componentes dinámicamente para evitar problemas de hidratación
const DailyProfitChart = dynamic(
  () => import("@/components/dashboard/daily-profit-chart-safe").then((mod) => ({ default: mod.DailyProfitChart })),
  {
    ssr: false,
    loading: () => (
      <div className="h-[300px] w-full animate-pulse bg-muted rounded-md flex items-center justify-center">
        <div className="text-muted-foreground">Cargando gráfico...</div>
      </div>
    ),
  },
)

const MonthlyProfitChart = dynamic(
  () => import("@/components/dashboard/monthly-profit-chart-safe").then((mod) => ({ default: mod.MonthlyProfitChart })),
  {
    ssr: false,
    loading: () => (
      <div className="h-[200px] w-full animate-pulse bg-muted rounded-md flex items-center justify-center">
        <div className="text-muted-foreground">Cargando gráfico...</div>
      </div>
    ),
  },
)

const CashFlowSummary = dynamic(
  () => import("@/components/dashboard/cash-flow-summary-safe").then((mod) => ({ default: mod.CashFlowSummary })),
  {
    ssr: false,
    loading: () => (
      <div className="h-[200px] w-full animate-pulse bg-muted rounded-md flex items-center justify-center">
        <div className="text-muted-foreground">Cargando gráfico...</div>
      </div>
    ),
  },
)

const InventorySummary = dynamic(
  () => import("@/components/dashboard/inventory-summary").then((mod) => ({ default: mod.InventorySummary })),
  {
    ssr: false,
    loading: () => (
      <div className="space-y-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="animate-pulse">
            <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
            <div className="h-2 bg-muted rounded w-full"></div>
          </div>
        ))}
      </div>
    ),
  },
)

const SupplierSummary = dynamic(
  () => import("@/components/dashboard/supplier-summary").then((mod) => ({ default: mod.SupplierSummary })),
  {
    ssr: false,
    loading: () => (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="animate-pulse flex justify-between items-center border-b pb-3">
            <div className="space-y-1">
              <div className="h-4 bg-muted rounded w-24"></div>
              <div className="h-3 bg-muted rounded w-16"></div>
            </div>
            <div className="text-right">
              <div className="h-4 bg-muted rounded w-16 mb-1"></div>
              <div className="h-3 bg-muted rounded w-12"></div>
            </div>
          </div>
        ))}
      </div>
    ),
  },
)

const RecentTransactions = dynamic(
  () => import("@/components/dashboard/recent-transactions").then((mod) => ({ default: mod.RecentTransactions })),
  {
    ssr: false,
    loading: () => (
      <div className="space-y-4">
        <div className="rounded-md border">
          <div className="grid grid-cols-5 p-3 text-sm font-medium text-muted-foreground">
            <div>Descripción</div>
            <div>Categoría</div>
            <div className="text-right">Monto</div>
            <div className="text-center">Método</div>
            <div className="text-right">Fecha</div>
          </div>
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="grid grid-cols-5 items-center p-3 text-sm border-t">
              <div className="h-4 bg-muted rounded animate-pulse"></div>
              <div className="h-4 bg-muted rounded animate-pulse"></div>
              <div className="h-4 bg-muted rounded animate-pulse"></div>
              <div className="h-4 bg-muted rounded animate-pulse"></div>
              <div className="h-4 bg-muted rounded animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
)

export default function Home() {
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
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              >
                <LayoutDashboard className="h-5 w-5" />
                <span>Inicio</span>
              </Link>
              <Link href="/" className="flex items-center gap-3 rounded-lg bg-accent px-3 py-2 text-accent-foreground">
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
            <div className="container py-6">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold">Finanzas</h1>
                <div className="flex items-center gap-4">
                  <Button asChild variant="outline">
                    <Link href="/movimientos/nuevo">
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Nuevo Movimiento
                    </Link>
                  </Button>
                  <Button>Generar Reporte</Button>
                </div>
              </div>

              {/* Summary Cards */}
              <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Ingresos del Día</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">$3,240.50</div>
                    <p className="text-xs text-muted-foreground mt-1">
                      <span className="text-emerald-500">+12.5%</span> vs. ayer
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Egresos del Día</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">$1,120.75</div>
                    <p className="text-xs text-muted-foreground mt-1">
                      <span className="text-rose-500">+8.2%</span> vs. ayer
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Balance del Día</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">$2,119.75</div>
                    <p className="text-xs text-muted-foreground mt-1">
                      <span className="text-emerald-500">+15.3%</span> vs. ayer
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Balance del Mes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">$24,890.30</div>
                    <p className="text-xs text-muted-foreground mt-1">
                      <span className="text-emerald-500">+5.2%</span> vs. mes anterior
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Main Dashboard Content */}
              <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {/* Daily Profit Chart */}
                <Card className="col-span-2">
                  <CardHeader>
                    <CardTitle>Ganancias Diarias</CardTitle>
                    <CardDescription>Ingresos vs. egresos de los últimos 7 días</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <DailyProfitChart />
                  </CardContent>
                </Card>

                {/* Monthly Profit Chart */}
                <Card>
                  <CardHeader>
                    <CardTitle>Ganancias Mensuales</CardTitle>
                    <CardDescription>Evolución de los últimos 6 meses</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <MonthlyProfitChart />
                  </CardContent>
                </Card>

                {/* Inventory Summary */}
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Control de Inventario</CardTitle>
                      <CardDescription>Productos con stock bajo</CardDescription>
                    </div>
                    <Link href="/inventario" className="text-sm text-primary hover:underline">
                      Ver todo
                    </Link>
                  </CardHeader>
                  <CardContent>
                    <InventorySummary />
                  </CardContent>
                </Card>

                {/* Supplier Summary */}
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Gestión de Proveedores</CardTitle>
                      <CardDescription>Facturas pendientes de pago</CardDescription>
                    </div>
                    <Link href="/proveedores" className="text-sm text-primary hover:underline">
                      Ver todo
                    </Link>
                  </CardHeader>
                  <CardContent>
                    <SupplierSummary />
                  </CardContent>
                </Card>

                {/* Recent Transactions */}
                <Card className="col-span-2">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Transacciones Recientes</CardTitle>
                      <CardDescription>Últimos movimientos registrados</CardDescription>
                    </div>
                    <Link href="/movimientos" className="text-sm text-primary hover:underline">
                      Ver todo
                    </Link>
                  </CardHeader>
                  <CardContent>
                    <RecentTransactions />
                  </CardContent>
                </Card>

                {/* Cash Flow Summary */}
                <Card>
                  <CardHeader>
                    <CardTitle>Flujo de Caja</CardTitle>
                    <CardDescription>Distribución de ingresos y egresos</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <CashFlowSummary />
                  </CardContent>
                </Card>
              </div>
            </div>
          </main>
        </div>
      </div>
    </HydrationBoundary>
  )
}

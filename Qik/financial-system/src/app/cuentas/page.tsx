import Link from "next/link";
import {
  LayoutDashboard,
  Receipt,
  CreditCard,
  Package,
  TruckIcon,
  Droplets,
} from "lucide-react";
import { Logo } from "@/components/logo";
import { HydrationBoundary } from "@/components/hydration-boundary";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AccountsList } from "@/components/accounts-list";
import { AccountBalanceChart } from "@/components/account-balance-chart";
import { Download, PlusCircle } from "lucide-react";

export default function CuentasPage() {
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
                className="flex items-center gap-3 rounded-lg bg-accent px-3 py-2 text-accent-foreground"
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
                <h1 className="text-2xl font-semibold">Cuentas Financieras</h1>
                <div className="flex items-center gap-4">
                  <Button asChild variant="outline">
                    <Link href="/cuentas/nueva">
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Nueva Cuenta
                    </Link>
                  </Button>
                  <Button>
                    <Download className="mr-2 h-4 w-4" />
                    Exportar
                  </Button>
                </div>
              </div>

              <div className="mt-6 grid gap-6 md:grid-cols-3">
                <Card>
                  <CardHeader>
                    <CardTitle>Caja</CardTitle>
                    <CardDescription>Efectivo disponible</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">$2,450.75</div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Actualizado: 10/06/2023 18:30
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Bancos</CardTitle>
                    <CardDescription>
                      Saldo en cuentas bancarias
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">$18,750.30</div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Actualizado: 10/06/2023 18:30
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Cuentas por Cobrar</CardTitle>
                    <CardDescription>Pendiente de cobro</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">$5,320.00</div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Actualizado: 10/06/2023 18:30
                    </p>
                  </CardContent>
                </Card>
              </div>

              <Tabs defaultValue="activos" className="mt-6">
                <TabsList>
                  <TabsTrigger value="activos">Activos</TabsTrigger>
                  <TabsTrigger value="pasivos">Pasivos</TabsTrigger>
                  <TabsTrigger value="patrimonio">Patrimonio</TabsTrigger>
                </TabsList>

                <TabsContent
                  value="activos"
                  className="mt-6 grid gap-6 md:grid-cols-2"
                >
                  <Card>
                    <CardHeader>
                      <CardTitle>Cuentas de Activo</CardTitle>
                      <CardDescription>
                        Listado de cuentas de activo
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <AccountsList type="activo" />
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Evolución de Activos</CardTitle>
                      <CardDescription>Últimos 6 meses</CardDescription>
                    </CardHeader>
                    <CardContent className="h-[350px]">
                      <AccountBalanceChart type="activo" />
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent
                  value="pasivos"
                  className="mt-6 grid gap-6 md:grid-cols-2"
                >
                  <Card>
                    <CardHeader>
                      <CardTitle>Cuentas de Pasivo</CardTitle>
                      <CardDescription>
                        Listado de cuentas de pasivo
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <AccountsList type="pasivo" />
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Evolución de Pasivos</CardTitle>
                      <CardDescription>Últimos 6 meses</CardDescription>
                    </CardHeader>
                    <CardContent className="h-[350px]">
                      <AccountBalanceChart type="pasivo" />
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent
                  value="patrimonio"
                  className="mt-6 grid gap-6 md:grid-cols-2"
                >
                  <Card>
                    <CardHeader>
                      <CardTitle>Cuentas de Patrimonio</CardTitle>
                      <CardDescription>
                        Listado de cuentas de patrimonio
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <AccountsList type="patrimonio" />
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Evolución de Patrimonio</CardTitle>
                      <CardDescription>Últimos 6 meses</CardDescription>
                    </CardHeader>
                    <CardContent className="h-[350px]">
                      <AccountBalanceChart type="patrimonio" />
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </main>
        </div>
      </div>
    </HydrationBoundary>
  );
}

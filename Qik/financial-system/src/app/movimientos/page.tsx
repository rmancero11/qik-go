"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DatePickerWithRange } from "@/components/date-range-picker";
import { TransactionList } from "@/components/transaction-list";
import {
  PlusCircle,
  Download,
  Search,
  LayoutDashboard,
  Receipt,
  CreditCard,
  Package,
  TruckIcon,
  Droplets,
} from "lucide-react";
import { Logo } from "@/components/logo";
import { HydrationBoundary } from "@/components/hydration-boundary";
import { exportToPDF } from "@/lib/export-utils";

export default function MovimientosPage() {
  const handleExport = () => {
    exportToPDF("movimientos-content", "movimientos-financieros.pdf");
  };

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
                className="flex items-center gap-3 rounded-lg bg-accent px-3 py-2 text-accent-foreground"
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
            <div id="movimientos-content" className="container py-6">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold">
                  Registro de Movimientos
                </h1>
                <div className="flex items-center gap-4">
                  <Button asChild variant="outline">
                    <Link href="/movimientos/nuevo">
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Nuevo Movimiento
                    </Link>
                  </Button>
                  <Button onClick={handleExport}>
                    <Download className="mr-2 h-4 w-4" />
                    Exportar
                  </Button>
                </div>
              </div>

              <Tabs defaultValue="todos" className="mt-6">
                <TabsList>
                  <TabsTrigger value="todos">Todos</TabsTrigger>
                  <TabsTrigger value="ingresos">Ingresos</TabsTrigger>
                  <TabsTrigger value="egresos">Egresos</TabsTrigger>
                </TabsList>
                <div className="mt-4 flex flex-col gap-4 md:flex-row">
                  <div className="flex-1">
                    <DatePickerWithRange />
                  </div>
                  <div className="flex flex-1 gap-2">
                    <div className="relative flex-1">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="search"
                        placeholder="Buscar..."
                        className="pl-8"
                      />
                    </div>
                    <Select>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Categoría" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ventas">Ventas</SelectItem>
                        <SelectItem value="proveedores">Proveedores</SelectItem>
                        <SelectItem value="servicios">Servicios</SelectItem>
                        <SelectItem value="sueldos">Sueldos</SelectItem>
                        <SelectItem value="otros">Otros</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <TabsContent value="todos" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Todos los Movimientos</CardTitle>
                      <CardDescription>
                        Listado completo de transacciones registradas
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <TransactionList />
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="ingresos" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Ingresos</CardTitle>
                      <CardDescription>
                        Listado de ingresos registrados
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <TransactionList type="ingreso" />
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="egresos" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Egresos</CardTitle>
                      <CardDescription>
                        Listado de egresos registrados
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <TransactionList type="egreso" />
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

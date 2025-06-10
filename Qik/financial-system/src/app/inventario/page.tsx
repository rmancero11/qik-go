import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DatePickerWithRange } from "@/components/date-range-picker"
import { InventoryList } from "@/components/inventory-list"
import { InventoryLossesList } from "@/components/inventory-losses-list"
import { InventorySummaryChart } from "@/components/inventory-summary-chart"
import { PlusCircle, Download, Search, AlertTriangle } from "lucide-react"
import Link from "next/link"

export default function InventarioPage() {
  return (
    <div className="container py-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Gestión de Inventario</h1>
        <div className="flex items-center gap-4">
          <Button asChild variant="outline">
            <Link href="/inventario/nuevo">
              <PlusCircle className="mr-2 h-4 w-4" />
              Nuevo Producto
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100 hover:text-amber-800"
          >
            <Link href="/inventario/registrar-perdida">
              <AlertTriangle className="mr-2 h-4 w-4" />
              Registrar Pérdida
            </Link>
          </Button>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
          <Button asChild variant="secondary">
            <Link href="/inventario/configurar-stock">Configurar Stock Mínimo</Link>
          </Button>
        </div>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Total de Productos</CardTitle>
            <CardDescription>Inventario actual</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">124</div>
            <p className="text-xs text-muted-foreground mt-1">Actualizado: 10/06/2023 18:30</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Valor del Inventario</CardTitle>
            <CardDescription>Costo total</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">$28,750.30</div>
            <p className="text-xs text-muted-foreground mt-1">Actualizado: 10/06/2023 18:30</p>
          </CardContent>
        </Card>
        <Card className="bg-amber-50 border-amber-200">
          <CardHeader>
            <CardTitle className="text-amber-800">Productos con Stock Bajo</CardTitle>
            <CardDescription className="text-amber-700">Requieren atención</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-amber-800">8</div>
            <p className="text-xs text-amber-700 mt-1">Actualizado: 10/06/2023 18:30</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="productos" className="mt-6">
        <TabsList>
          <TabsTrigger value="productos">Productos</TabsTrigger>
          <TabsTrigger value="perdidas">Pérdidas</TabsTrigger>
          <TabsTrigger value="estadisticas">Estadísticas</TabsTrigger>
        </TabsList>
        <div className="mt-4 flex flex-col gap-4 md:flex-row">
          <div className="flex-1">
            <DatePickerWithRange />
          </div>
          <div className="flex flex-1 gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Buscar..." className="pl-8" />
            </div>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Categoría" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bebidas">Bebidas</SelectItem>
                <SelectItem value="lacteos">Lácteos</SelectItem>
                <SelectItem value="carnes">Carnes</SelectItem>
                <SelectItem value="panaderia">Panadería</SelectItem>
                <SelectItem value="verduras">Verduras</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <TabsContent value="productos" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Listado de Productos</CardTitle>
              <CardDescription>Inventario completo de productos</CardDescription>
            </CardHeader>
            <CardContent>
              <InventoryList />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="perdidas" className="mt-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Registro de Pérdidas</CardTitle>
                <CardDescription>Productos rotos, vencidos o desechados</CardDescription>
              </div>
              <Button
                asChild
                variant="outline"
                size="sm"
                className="bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100 hover:text-amber-800"
              >
                <Link href="/inventario/registrar-perdida">
                  <AlertTriangle className="mr-2 h-4 w-4" />
                  Nueva Pérdida
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <InventoryLossesList />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="estadisticas" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Estadísticas de Inventario</CardTitle>
              <CardDescription>Análisis de movimientos y pérdidas</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <InventorySummaryChart />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

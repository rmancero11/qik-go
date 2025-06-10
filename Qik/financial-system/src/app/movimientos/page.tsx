import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DatePickerWithRange } from "@/components/date-range-picker"
import { TransactionList } from "@/components/transaction-list"
import { PlusCircle, Download, Search } from "lucide-react"
import Link from "next/link"

export default function MovimientosPage() {
  return (
    <div className="container py-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Registro de Movimientos</h1>
        <div className="flex items-center gap-4">
          <Button asChild variant="outline">
            <Link href="/movimientos/nuevo">
              <PlusCircle className="mr-2 h-4 w-4" />
              Nuevo Movimiento
            </Link>
          </Button>
          <Button>
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
              <Input type="search" placeholder="Buscar..." className="pl-8" />
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
              <CardDescription>Listado completo de transacciones registradas</CardDescription>
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
              <CardDescription>Listado de ingresos registrados</CardDescription>
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
              <CardDescription>Listado de egresos registrados</CardDescription>
            </CardHeader>
            <CardContent>
              <TransactionList type="egreso" />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

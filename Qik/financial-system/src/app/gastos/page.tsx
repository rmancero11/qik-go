import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart } from "@/components/bar-chart"
import { PieChart } from "@/components/pie-chart"
import { LineChart } from "@/components/line-chart"
import { KpiCard } from "@/components/kpi-card"

export default function GastosPage() {
  return (
    <main className="container py-6">
      <h1 className="text-3xl font-bold mb-6">Análisis de Gastos y Pérdidas</h1>

      <div className="grid gap-4 md:grid-cols-3">
        <KpiCard title="GASTOS TOTALES" value="$28,450" change={-3.2} changeLabel="vs mes anterior" isNegative />
        <KpiCard title="PÉRDIDAS" value="$1,850" change={-5.7} changeLabel="vs mes anterior" isNegative />
        <KpiCard title="% PÉRDIDAS/VENTAS" value="4.1%" change={-0.8} changeLabel="vs mes anterior" isNegative />
      </div>

      <div className="mt-6">
        <Tabs defaultValue="por-area" className="space-y-4">
          <TabsList>
            <TabsTrigger value="por-area">Por Área</TabsTrigger>
            <TabsTrigger value="por-categoria">Por Categoría</TabsTrigger>
            <TabsTrigger value="por-turno">Por Turno</TabsTrigger>
          </TabsList>

          <TabsContent value="por-area" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Gastos por Área</CardTitle>
                  <CardDescription>Distribución de gastos por área</CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                  <BarChart
                    data={[
                      { name: "Cocina", value: 12450 },
                      { name: "Bar", value: 8750 },
                      { name: "Salón", value: 4320 },
                      { name: "Administración", value: 2930 },
                    ]}
                  />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Pérdidas por Área</CardTitle>
                  <CardDescription>Distribución de pérdidas por área</CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center">
                  <PieChart
                    data={[
                      { name: "Cocina", value: 850 },
                      { name: "Bar", value: 620 },
                      { name: "Salón", value: 280 },
                      { name: "Administración", value: 100 },
                    ]}
                  />
                </CardContent>
              </Card>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Evolución de Gastos por Área</CardTitle>
                <CardDescription>Últimos 6 meses</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <LineChart
                  data={[
                    { month: "Ene", Cocina: 11200, Bar: 7800, Salón: 3900, Administración: 2700 },
                    { month: "Feb", Cocina: 11500, Bar: 8100, Salón: 4000, Administración: 2750 },
                    { month: "Mar", Cocina: 11800, Bar: 8300, Salón: 4100, Administración: 2800 },
                    { month: "Abr", Cocina: 12100, Bar: 8500, Salón: 4200, Administración: 2850 },
                    { month: "May", Cocina: 12300, Bar: 8650, Salón: 4250, Administración: 2900 },
                    { month: "Jun", Cocina: 12450, Bar: 8750, Salón: 4320, Administración: 2930 },
                  ]}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="por-categoria" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Gastos por Categoría</CardTitle>
                  <CardDescription>Distribución de gastos por categoría</CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center">
                  <PieChart
                    data={[
                      { name: "Insumos", value: 14250 },
                      { name: "Personal", value: 8750 },
                      { name: "Servicios", value: 3450 },
                      { name: "Mantenimiento", value: 2000 },
                    ]}
                  />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Pérdidas por Categoría</CardTitle>
                  <CardDescription>Distribución de pérdidas por categoría</CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                  <BarChart
                    data={[
                      { name: "Mermas", value: 750 },
                      { name: "Vencimientos", value: 450 },
                      { name: "Roturas", value: 320 },
                      { name: "Errores", value: 330 },
                    ]}
                  />
                </CardContent>
              </Card>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Evolución de Gastos por Categoría</CardTitle>
                <CardDescription>Últimos 6 meses</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <LineChart
                  data={[
                    { month: "Ene", Insumos: 13200, Personal: 8500, Servicios: 3200, Mantenimiento: 1800 },
                    { month: "Feb", Insumos: 13500, Personal: 8550, Servicios: 3250, Mantenimiento: 1850 },
                    { month: "Mar", Insumos: 13700, Personal: 8600, Servicios: 3300, Mantenimiento: 1900 },
                    { month: "Abr", Insumos: 13900, Personal: 8650, Servicios: 3350, Mantenimiento: 1950 },
                    { month: "May", Insumos: 14100, Personal: 8700, Servicios: 3400, Mantenimiento: 1980 },
                    { month: "Jun", Insumos: 14250, Personal: 8750, Servicios: 3450, Mantenimiento: 2000 },
                  ]}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="por-turno" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Gastos por Turno</CardTitle>
                  <CardDescription>Distribución de gastos por turno</CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                  <BarChart
                    data={[
                      { name: "Mañana", value: 8750 },
                      { name: "Tarde", value: 10450 },
                      { name: "Noche", value: 9250 },
                    ]}
                  />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Pérdidas por Turno</CardTitle>
                  <CardDescription>Distribución de pérdidas por turno</CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center">
                  <PieChart
                    data={[
                      { name: "Mañana", value: 520 },
                      { name: "Tarde", value: 680 },
                      { name: "Noche", value: 650 },
                    ]}
                  />
                </CardContent>
              </Card>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Evolución de Gastos por Turno</CardTitle>
                <CardDescription>Últimos 6 meses</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <LineChart
                  data={[
                    { month: "Ene", Mañana: 8200, Tarde: 9800, Noche: 8700 },
                    { month: "Feb", Mañana: 8300, Tarde: 9950, Noche: 8800 },
                    { month: "Mar", Mañana: 8400, Tarde: 10100, Noche: 8900 },
                    { month: "Abr", Mañana: 8550, Tarde: 10250, Noche: 9050 },
                    { month: "May", Mañana: 8650, Tarde: 10350, Noche: 9150 },
                    { month: "Jun", Mañana: 8750, Tarde: 10450, Noche: 9250 },
                  ]}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}

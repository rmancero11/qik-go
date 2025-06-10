import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart } from "@/components/bar-chart"
import { PieChart } from "@/components/pie-chart"
import { LineChart } from "@/components/line-chart"
import { KpiCard } from "@/components/kpi-card"

export default function GananciasPage() {
  return (
    <main className="container py-6">
      <h1 className="text-3xl font-bold mb-6">Análisis de Ganancias</h1>

      <div className="grid gap-4 md:grid-cols-3">
        <KpiCard title="VENTAS TOTALES" value="$45,230" change={12.5} changeLabel="vs mes anterior" />
        <KpiCard title="TICKET PROMEDIO" value="$32.75" change={3.2} changeLabel="vs mes anterior" />
        <KpiCard title="MARGEN BRUTO" value="38.4%" change={1.5} changeLabel="vs mes anterior" />
      </div>

      <div className="mt-6">
        <Tabs defaultValue="por-mozo" className="space-y-4">
          <TabsList>
            <TabsTrigger value="por-mozo">Por Mozo</TabsTrigger>
            <TabsTrigger value="por-turno">Por Turno</TabsTrigger>
            <TabsTrigger value="por-categoria">Por Categoría</TabsTrigger>
          </TabsList>

          <TabsContent value="por-mozo" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Ventas por Mozo</CardTitle>
                  <CardDescription>Total de ventas realizadas por cada mozo</CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                  <BarChart
                    data={[
                      { name: "Carlos", value: 12450 },
                      { name: "María", value: 9870 },
                      { name: "Juan", value: 11230 },
                      { name: "Ana", value: 8540 },
                      { name: "Pedro", value: 10320 },
                    ]}
                  />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Satisfacción por Mozo</CardTitle>
                  <CardDescription>Puntuación promedio de satisfacción</CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                  <BarChart
                    data={[
                      { name: "Carlos", value: 4.5 },
                      { name: "María", value: 4.8 },
                      { name: "Juan", value: 4.2 },
                      { name: "Ana", value: 4.7 },
                      { name: "Pedro", value: 4.3 },
                    ]}
                  />
                </CardContent>
              </Card>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Evolución de Ventas por Mozo</CardTitle>
                <CardDescription>Últimos 6 meses</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <LineChart
                  data={[
                    { month: "Ene", Carlos: 10200, María: 8500, Juan: 9800, Ana: 7200, Pedro: 8900 },
                    { month: "Feb", Carlos: 11500, María: 9200, Juan: 10300, Ana: 7800, Pedro: 9400 },
                    { month: "Mar", Carlos: 10800, María: 8900, Juan: 9500, Ana: 7500, Pedro: 9100 },
                    { month: "Abr", Carlos: 12100, María: 9600, Juan: 10800, Ana: 8200, Pedro: 9800 },
                    { month: "May", Carlos: 12800, María: 10200, Juan: 11500, Ana: 8700, Pedro: 10500 },
                    { month: "Jun", Carlos: 12450, María: 9870, Juan: 11230, Ana: 8540, Pedro: 10320 },
                  ]}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="por-turno" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Ventas por Turno</CardTitle>
                  <CardDescription>Distribución de ventas por turno</CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center">
                  <PieChart
                    data={[
                      { name: "Mañana", value: 15230 },
                      { name: "Tarde", value: 18750 },
                      { name: "Noche", value: 11250 },
                    ]}
                  />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Ticket Promedio por Turno</CardTitle>
                  <CardDescription>Valor promedio de venta por turno</CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                  <BarChart
                    data={[
                      { name: "Mañana", value: 28.5 },
                      { name: "Tarde", value: 32.7 },
                      { name: "Noche", value: 42.3 },
                    ]}
                  />
                </CardContent>
              </Card>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Evolución de Ventas por Turno</CardTitle>
                <CardDescription>Últimos 6 meses</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <LineChart
                  data={[
                    { month: "Ene", Mañana: 12500, Tarde: 16200, Noche: 9800 },
                    { month: "Feb", Mañana: 13200, Tarde: 17100, Noche: 10300 },
                    { month: "Mar", Mañana: 12800, Tarde: 16500, Noche: 9500 },
                    { month: "Abr", Mañana: 14100, Tarde: 17800, Noche: 10800 },
                    { month: "May", Mañana: 14800, Tarde: 18500, Noche: 11500 },
                    { month: "Jun", Mañana: 15230, Tarde: 18750, Noche: 11250 },
                  ]}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="por-categoria" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Ventas por Categoría</CardTitle>
                  <CardDescription>Distribución de ventas por categoría de producto</CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center">
                  <PieChart
                    data={[
                      { name: "Bebidas", value: 12350 },
                      { name: "Platos principales", value: 18750 },
                      { name: "Entradas", value: 8450 },
                      { name: "Postres", value: 5680 },
                    ]}
                  />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Margen por Categoría</CardTitle>
                  <CardDescription>Porcentaje de margen por categoría</CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                  <BarChart
                    data={[
                      { name: "Bebidas", value: 65 },
                      { name: "Platos principales", value: 42 },
                      { name: "Entradas", value: 38 },
                      { name: "Postres", value: 55 },
                    ]}
                  />
                </CardContent>
              </Card>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Evolución de Ventas por Categoría</CardTitle>
                <CardDescription>Últimos 6 meses</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <LineChart
                  data={[
                    { month: "Ene", Bebidas: 10200, "Platos principales": 15800, Entradas: 7200, Postres: 4800 },
                    { month: "Feb", Bebidas: 10800, "Platos principales": 16500, Entradas: 7600, Postres: 5100 },
                    { month: "Mar", Bebidas: 11200, "Platos principales": 17200, Entradas: 7900, Postres: 5300 },
                    { month: "Abr", Bebidas: 11500, "Platos principales": 17800, Entradas: 8100, Postres: 5400 },
                    { month: "May", Bebidas: 12100, "Platos principales": 18500, Entradas: 8300, Postres: 5600 },
                    { month: "Jun", Bebidas: 12350, "Platos principales": 18750, Entradas: 8450, Postres: 5680 },
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

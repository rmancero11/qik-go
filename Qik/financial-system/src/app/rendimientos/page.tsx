import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LineChart } from "@/components/line-chart"
import { BarChart } from "@/components/bar-chart"
import { KpiCard } from "@/components/kpi-card"

export default function RendimientosPage() {
  return (
    <main className="container py-6">
      <h1 className="text-3xl font-bold mb-6">Análisis de Rendimientos</h1>

      <div className="grid gap-4 md:grid-cols-3">
        <KpiCard title="VENTAS/HORA" value="$245.30" change={8.2} changeLabel="vs mes anterior" />
        <KpiCard title="VENTAS/EMPLEADO" value="$5,640" change={4.5} changeLabel="vs mes anterior" />
        <KpiCard title="ROTACIÓN DE MESAS" value="3.8/día" change={0.3} changeLabel="vs mes anterior" />
      </div>

      <div className="mt-6">
        <Tabs defaultValue="por-hora" className="space-y-4">
          <TabsList>
            <TabsTrigger value="por-hora">Por Hora</TabsTrigger>
            <TabsTrigger value="por-dia">Por Día</TabsTrigger>
            <TabsTrigger value="por-empleado">Por Empleado</TabsTrigger>
          </TabsList>

          <TabsContent value="por-hora" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Ventas por Hora</CardTitle>
                <CardDescription>Distribución de ventas por hora del día</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <BarChart
                  data={[
                    { name: "8-10h", value: 1250 },
                    { name: "10-12h", value: 1850 },
                    { name: "12-14h", value: 2450 },
                    { name: "14-16h", value: 1950 },
                    { name: "16-18h", value: 1650 },
                    { name: "18-20h", value: 2150 },
                    { name: "20-22h", value: 2850 },
                    { name: "22-00h", value: 2350 },
                  ]}
                />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Consumo por Categoría por Hora</CardTitle>
                <CardDescription>Evolución mensual</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <LineChart
                  data={[
                    { month: "Ene", Bebidas: 950, Comidas: 1450, Postres: 650 },
                    { month: "Feb", Bebidas: 980, Comidas: 1480, Postres: 670 },
                    { month: "Mar", Bebidas: 1020, Comidas: 1520, Postres: 690 },
                    { month: "Abr", Bebidas: 1050, Comidas: 1550, Postres: 710 },
                    { month: "May", Bebidas: 1080, Comidas: 1580, Postres: 730 },
                    { month: "Jun", Bebidas: 1100, Comidas: 1600, Postres: 750 },
                  ]}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="por-dia" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Ventas por Día de la Semana</CardTitle>
                <CardDescription>Distribución de ventas por día</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <BarChart
                  data={[
                    { name: "Lunes", value: 4250 },
                    { name: "Martes", value: 4850 },
                    { name: "Miércoles", value: 5150 },
                    { name: "Jueves", value: 5950 },
                    { name: "Viernes", value: 7850 },
                    { name: "Sábado", value: 9250 },
                    { name: "Domingo", value: 7950 },
                  ]}
                />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Evolución de Ventas por Día</CardTitle>
                <CardDescription>Últimas 4 semanas</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <LineChart
                  data={[
                    {
                      month: "Semana 1",
                      Lunes: 4100,
                      Martes: 4700,
                      Miércoles: 5000,
                      Jueves: 5800,
                      Viernes: 7700,
                      Sábado: 9100,
                      Domingo: 7800,
                    },
                    {
                      month: "Semana 2",
                      Lunes: 4150,
                      Martes: 4750,
                      Miércoles: 5050,
                      Jueves: 5850,
                      Viernes: 7750,
                      Sábado: 9150,
                      Domingo: 7850,
                    },
                    {
                      month: "Semana 3",
                      Lunes: 4200,
                      Martes: 4800,
                      Miércoles: 5100,
                      Jueves: 5900,
                      Viernes: 7800,
                      Sábado: 9200,
                      Domingo: 7900,
                    },
                    {
                      month: "Semana 4",
                      Lunes: 4250,
                      Martes: 4850,
                      Miércoles: 5150,
                      Jueves: 5950,
                      Viernes: 7850,
                      Sábado: 9250,
                      Domingo: 7950,
                    },
                  ]}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="por-empleado" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Ventas por Empleado</CardTitle>
                <CardDescription>Total de ventas por empleado</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <BarChart
                  data={[
                    { name: "Carlos", value: 5850 },
                    { name: "María", value: 6250 },
                    { name: "Juan", value: 5450 },
                    { name: "Ana", value: 5950 },
                    { name: "Pedro", value: 5150 },
                  ]}
                />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Eficiencia por Empleado</CardTitle>
                <CardDescription>Ventas por hora trabajada</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <BarChart
                  data={[
                    { name: "Carlos", value: 125 },
                    { name: "María", value: 145 },
                    { name: "Juan", value: 115 },
                    { name: "Ana", value: 135 },
                    { name: "Pedro", value: 110 },
                  ]}
                />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Evolución de Rendimiento por Empleado</CardTitle>
                <CardDescription>Últimos 6 meses</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <LineChart
                  data={[
                    { month: "Ene", Carlos: 5500, María: 5900, Juan: 5100, Ana: 5600, Pedro: 4800 },
                    { month: "Feb", Carlos: 5550, María: 5950, Juan: 5150, Ana: 5650, Pedro: 4850 },
                    { month: "Mar", Carlos: 5650, María: 6050, Juan: 5250, Ana: 5750, Pedro: 4950 },
                    { month: "Abr", Carlos: 5700, María: 6100, Juan: 5300, Ana: 5800, Pedro: 5000 },
                    { month: "May", Carlos: 5800, María: 6200, Juan: 5400, Ana: 5900, Pedro: 5100 },
                    { month: "Jun", Carlos: 5850, María: 6250, Juan: 5450, Ana: 5950, Pedro: 5150 },
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

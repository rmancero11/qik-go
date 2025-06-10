"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart } from "@/components/bar-chart"
import { LineChart } from "@/components/line-chart"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DatePickerWithRange } from "@/components/date-range-picker"
import { Button } from "@/components/ui/button"
import { Download, Star, UserCheck } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"

export function EmployeePerformance() {
  const [dateRange, setDateRange] = useState({
    from: new Date(2023, 4, 1),
    to: new Date(2023, 4, 31),
  })
  const [area, setArea] = useState("all")

  // Datos de ejemplo basados en las tablas 'empleados', 'ventas' y 'cuentas_nomina' del diagrama ER
  const employeeData = [
    {
      id: 1,
      name: "Carlos Gómez",
      role: "Mozo",
      area: "Salón",
      sales: 12450,
      hours: 160,
      satisfaction: 4.8,
      avatar: "CG",
    },
    {
      id: 2,
      name: "María López",
      role: "Mozo",
      area: "Salón",
      sales: 10870,
      hours: 152,
      satisfaction: 4.7,
      avatar: "ML",
    },
    {
      id: 3,
      name: "Juan Pérez",
      role: "Cocinero",
      area: "Cocina",
      sales: 0,
      hours: 168,
      satisfaction: 0,
      avatar: "JP",
    },
    {
      id: 4,
      name: "Ana Martínez",
      role: "Bartender",
      area: "Bar",
      sales: 8540,
      hours: 144,
      satisfaction: 4.5,
      avatar: "AM",
    },
    {
      id: 5,
      name: "Pedro Sánchez",
      role: "Cajero",
      area: "Administración",
      sales: 0,
      hours: 160,
      satisfaction: 0,
      avatar: "PS",
    },
  ]

  // Datos para gráficos
  const salesPerformance = [
    { name: "Carlos Gómez", value: 12450 },
    { name: "María López", value: 10870 },
    { name: "Ana Martínez", value: 8540 },
  ]

  const satisfactionRatings = [
    { name: "Carlos Gómez", value: 4.8 },
    { name: "María López", value: 4.7 },
    { name: "Ana Martínez", value: 4.5 },
  ]

  const hoursWorked = [
    { name: "Juan Pérez", value: 168 },
    { name: "Carlos Gómez", value: 160 },
    { name: "Pedro Sánchez", value: 160 },
    { name: "María López", value: 152 },
    { name: "Ana Martínez", value: 144 },
  ]

  const performanceTrend = [
    { month: "Ene", Carlos: 11200, María: 9800, Ana: 7900 },
    { month: "Feb", Carlos: 11500, María: 10100, Ana: 8100 },
    { month: "Mar", Carlos: 11800, María: 10300, Ana: 8200 },
    { month: "Abr", Carlos: 12100, María: 10500, Ana: 8300 },
    { month: "May", Carlos: 12450, María: 10870, Ana: 8540 },
  ]

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex-1">
          <DatePickerWithRange date={dateRange} setDate={setDateRange} />
        </div>
        <div className="flex-1">
          <Select value={area} onValueChange={setArea}>
            <SelectTrigger>
              <SelectValue placeholder="Todas las áreas" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas las áreas</SelectItem>
              <SelectItem value="salon">Salón</SelectItem>
              <SelectItem value="cocina">Cocina</SelectItem>
              <SelectItem value="bar">Bar</SelectItem>
              <SelectItem value="admin">Administración</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <Download className="h-4 w-4" /> Exportar
        </Button>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Resumen</TabsTrigger>
          <TabsTrigger value="sales">Ventas</TabsTrigger>
          <TabsTrigger value="hours">Horas</TabsTrigger>
          <TabsTrigger value="satisfaction">Satisfacción</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Rendimiento de Empleados</CardTitle>
              <CardDescription>Resumen de rendimiento por empleado</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Empleado</TableHead>
                    <TableHead>Rol</TableHead>
                    <TableHead>Área</TableHead>
                    <TableHead>Ventas</TableHead>
                    <TableHead>Horas</TableHead>
                    <TableHead>Satisfacción</TableHead>
                    <TableHead>Eficiencia</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {employeeData.map((employee) => (
                    <TableRow key={employee.id}>
                      <TableCell className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={`/placeholder.svg?height=32&width=32`} alt={employee.name} />
                          <AvatarFallback>{employee.avatar}</AvatarFallback>
                        </Avatar>
                        {employee.name}
                      </TableCell>
                      <TableCell>{employee.role}</TableCell>
                      <TableCell>{employee.area}</TableCell>
                      <TableCell>{employee.sales > 0 ? `$${employee.sales.toFixed(2)}` : "N/A"}</TableCell>
                      <TableCell>{employee.hours}h</TableCell>
                      <TableCell>
                        {employee.satisfaction > 0 ? (
                          <div className="flex items-center">
                            {employee.satisfaction}
                            <Star className="h-4 w-4 ml-1 fill-yellow-400 text-yellow-400" />
                          </div>
                        ) : (
                          "N/A"
                        )}
                      </TableCell>
                      <TableCell>
                        {employee.sales > 0 ? (
                          <div className="w-full">
                            <div className="flex justify-between mb-1 text-xs">
                              <span>{(employee.sales / employee.hours).toFixed(2)}/h</span>
                              <span className="text-muted-foreground">
                                {Math.round(employee.sales / employee.hours / 100)}%
                              </span>
                            </div>
                            <Progress value={employee.sales / employee.hours / 100} className="h-2" />
                          </div>
                        ) : (
                          "N/A"
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sales" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Ventas por Empleado</CardTitle>
                <CardDescription>Total de ventas realizadas</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <BarChart data={salesPerformance} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Eficiencia de Ventas</CardTitle>
                <CardDescription>Ventas por hora trabajada</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <BarChart
                  data={salesPerformance.map((emp) => {
                    const employee = employeeData.find((e) => e.name === emp.name)
                    return {
                      name: emp.name,
                      value: employee ? Math.round(emp.value / employee.hours) : 0,
                    }
                  })}
                />
              </CardContent>
            </Card>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Evolución de Ventas por Empleado</CardTitle>
              <CardDescription>Tendencia de los últimos 5 meses</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <LineChart data={performanceTrend} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="hours" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Horas Trabajadas por Empleado</CardTitle>
              <CardDescription>Total de horas en el período seleccionado</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <BarChart data={hoursWorked} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Distribución de Horas por Área</CardTitle>
              <CardDescription>Horas trabajadas agrupadas por área</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <BarChart
                data={[
                  { name: "Salón", value: 312 },
                  { name: "Cocina", value: 168 },
                  { name: "Bar", value: 144 },
                  { name: "Administración", value: 160 },
                ]}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="satisfaction" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Satisfacción del Cliente por Empleado</CardTitle>
              <CardDescription>Puntuación promedio de satisfacción</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <BarChart data={satisfactionRatings} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Comentarios de Clientes</CardTitle>
              <CardDescription>Últimos comentarios recibidos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <UserCheck className="h-4 w-4 text-green-500" />
                    <span className="font-medium">Cliente: Juan Rodriguez</span>
                    <div className="ml-auto flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-4 w-4 ${star <= 5 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    "Excelente atención de Carlos, muy atento y servicial. Recomendaría este lugar."
                  </p>
                </div>
                <div className="border rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <UserCheck className="h-4 w-4 text-green-500" />
                    <span className="font-medium">Cliente: Laura Fernández</span>
                    <div className="ml-auto flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-4 w-4 ${star <= 4 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    "María fue muy amable y nos recomendó platos excelentes. El servicio fue rápido."
                  </p>
                </div>
                <div className="border rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <UserCheck className="h-4 w-4 text-green-500" />
                    <span className="font-medium">Cliente: Roberto Sánchez</span>
                    <div className="ml-auto flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-4 w-4 ${star <= 5 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    "Ana preparó unos cócteles increíbles. Definitivamente volveré por más."
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

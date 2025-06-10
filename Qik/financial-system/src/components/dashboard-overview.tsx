"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { ArrowUpRight, ArrowDownRight, DollarSign, ShoppingCart, Users, TrendingUp } from "lucide-react"

const data = [
  { name: "Lun", ventas: 4000 },
  { name: "Mar", ventas: 3000 },
  { name: "Mié", ventas: 2000 },
  { name: "Jue", ventas: 2780 },
  { name: "Vie", ventas: 5890 },
  { name: "Sáb", ventas: 6390 },
  { name: "Dom", ventas: 3490 },
]

export default function DashboardOverview() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Ventas Totales</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">$45,231.89</div>
          <p className="text-xs text-muted-foreground">
            <span className="text-emerald-500 flex items-center">
              +20.1% <ArrowUpRight className="ml-1 h-4 w-4" />
            </span>{" "}
            desde el mes pasado
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Transacciones</CardTitle>
          <ShoppingCart className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">+573</div>
          <p className="text-xs text-muted-foreground">
            <span className="text-emerald-500 flex items-center">
              +12.2% <ArrowUpRight className="ml-1 h-4 w-4" />
            </span>{" "}
            desde el mes pasado
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Clientes Nuevos</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">+89</div>
          <p className="text-xs text-muted-foreground">
            <span className="text-rose-500 flex items-center">
              -5.1% <ArrowDownRight className="ml-1 h-4 w-4" />
            </span>{" "}
            desde el mes pasado
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Ticket Promedio</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">$78.92</div>
          <p className="text-xs text-muted-foreground">
            <span className="text-emerald-500 flex items-center">
              +7.4% <ArrowUpRight className="ml-1 h-4 w-4" />
            </span>{" "}
            desde el mes pasado
          </p>
        </CardContent>
      </Card>
      <Card className="col-span-full">
        <CardHeader>
          <CardTitle>Ventas Semanales</CardTitle>
          <CardDescription>Análisis de ventas de la última semana</CardDescription>
        </CardHeader>
        <CardContent className="pl-2">
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="ventas" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}

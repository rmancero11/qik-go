"use client"

import { ClientWrapper } from "@/components/client-wrapper"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

const data = [
  { name: "Lun", ingresos: 2400, egresos: 1200 },
  { name: "Mar", ingresos: 1398, egresos: 800 },
  { name: "Mié", ingresos: 9800, egresos: 3200 },
  { name: "Jue", ingresos: 3908, egresos: 1500 },
  { name: "Vie", ingresos: 4800, egresos: 2100 },
  { name: "Sáb", ingresos: 3800, egresos: 1800 },
  { name: "Dom", ingresos: 4300, egresos: 1900 },
]

function DailyProfitChartContent() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip
          formatter={(value, name) => [`$${value.toLocaleString()}`, name === "ingresos" ? "Ingresos" : "Egresos"]}
        />
        <Bar dataKey="ingresos" fill="#10b981" />
        <Bar dataKey="egresos" fill="#ef4444" />
      </BarChart>
    </ResponsiveContainer>
  )
}

export function DailyProfitChart() {
  return (
    <ClientWrapper
      fallback={
        <div className="h-[300px] w-full animate-pulse bg-muted rounded-md flex items-center justify-center">
          <div className="text-muted-foreground">Cargando gráfico...</div>
        </div>
      }
    >
      <DailyProfitChartContent />
    </ClientWrapper>
  )
}

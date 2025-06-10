"use client"

import { ClientWrapper } from "@/components/client-wrapper"
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

const data = [
  { name: "Ene", ganancia: 12000 },
  { name: "Feb", ganancia: 15000 },
  { name: "Mar", ganancia: 18000 },
  { name: "Abr", ganancia: 14000 },
  { name: "May", ganancia: 22000 },
  { name: "Jun", ganancia: 25000 },
]

function MonthlyProfitChartContent() {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <LineChart data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, "Ganancia"]} />
        <Line type="monotone" dataKey="ganancia" stroke="#06b6d4" strokeWidth={2} dot={{ fill: "#06b6d4" }} />
      </LineChart>
    </ResponsiveContainer>
  )
}

export function MonthlyProfitChart() {
  return (
    <ClientWrapper
      fallback={
        <div className="h-[200px] w-full animate-pulse bg-muted rounded-md flex items-center justify-center">
          <div className="text-muted-foreground">Cargando gráfico...</div>
        </div>
      }
    >
      <MonthlyProfitChartContent />
    </ClientWrapper>
  )
}

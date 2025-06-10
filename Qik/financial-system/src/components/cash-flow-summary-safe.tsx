"use client"

import { ClientWrapper } from "@/components/client-wrapper"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"

const data = [
  { name: "Ventas", value: 45, color: "#10b981" },
  { name: "Servicios", value: 30, color: "#06b6d4" },
  { name: "Otros", value: 25, color: "#8b5cf6" },
]

function CashFlowSummaryContent() {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <PieChart>
        <Pie data={data} cx="50%" cy="50%" innerRadius={40} outerRadius={80} paddingAngle={5} dataKey="value">
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => [`${value}%`, "Porcentaje"]} />
      </PieChart>
    </ResponsiveContainer>
  )
}

export function CashFlowSummary() {
  return (
    <ClientWrapper
      fallback={
        <div className="h-[200px] w-full animate-pulse bg-muted rounded-md flex items-center justify-center">
          <div className="text-muted-foreground">Cargando gráfico...</div>
        </div>
      }
    >
      <CashFlowSummaryContent />
    </ClientWrapper>
  )
}

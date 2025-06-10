"use client"

import { useEffect, useState } from "react"
import { Pie } from "react-chartjs-2"

export function CashFlowSummary() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const data = {
    labels: ["Ventas", "Servicios", "Otros Ingresos", "Proveedores", "Sueldos", "Servicios", "Otros Gastos"],
    datasets: [
      {
        data: [65, 20, 15, 40, 30, 15, 15],
        backgroundColor: [
          "rgba(6, 182, 212, 0.8)",
          "rgba(6, 182, 212, 0.6)",
          "rgba(6, 182, 212, 0.4)",
          "rgba(249, 115, 22, 0.8)",
          "rgba(249, 115, 22, 0.6)",
          "rgba(249, 115, 22, 0.4)",
          "rgba(249, 115, 22, 0.2)",
        ],
        borderColor: [
          "rgba(6, 182, 212, 1)",
          "rgba(6, 182, 212, 1)",
          "rgba(6, 182, 212, 1)",
          "rgba(249, 115, 22, 1)",
          "rgba(249, 115, 22, 1)",
          "rgba(249, 115, 22, 1)",
          "rgba(249, 115, 22, 1)",
        ],
        borderWidth: 1,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right" as const,
        labels: {
          boxWidth: 12,
          font: {
            size: 10,
          },
        },
      },
    },
  }

  if (!isClient) {
    return <div className="h-[200px] flex items-center justify-center">Cargando gráfico...</div>
  }

  return <Pie data={data} options={options} height={200} />
}

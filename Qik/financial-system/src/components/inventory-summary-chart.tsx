"use client"

import { useEffect, useState } from "react"
import { Bar } from "react-chartjs-2"

export function InventorySummaryChart() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const data = {
    labels: ["Ene", "Feb", "Mar", "Abr", "May", "Jun"],
    datasets: [
      {
        label: "Entradas",
        data: [4500, 4800, 5200, 4900, 5300, 5100],
        backgroundColor: "rgba(6, 182, 212, 0.6)",
        borderColor: "rgba(6, 182, 212, 1)",
        borderWidth: 1,
      },
      {
        label: "Salidas",
        data: [3800, 4100, 4300, 4000, 4500, 4300],
        backgroundColor: "rgba(14, 165, 233, 0.6)",
        borderColor: "rgba(14, 165, 233, 1)",
        borderWidth: 1,
      },
      {
        label: "Pérdidas",
        data: [250, 280, 310, 270, 320, 290],
        backgroundColor: "rgba(249, 115, 22, 0.6)",
        borderColor: "rgba(249, 115, 22, 1)",
        borderWidth: 1,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Movimientos de Inventario",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  }

  if (!isClient) {
    return <div className="h-full flex items-center justify-center">Cargando gráfico...</div>
  }

  return <Bar data={data} options={options} />
}

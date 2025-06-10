"use client"

import { useEffect, useState } from "react"
import { Line } from "react-chartjs-2"

export function ConsumptionChart() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  // Datos de ejemplo para el gráfico
  const data = {
    labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio"],
    datasets: [
      {
        label: "Agua (m³)",
        data: [10.8, 11.2, 10.5, 11.8, 13.2, 12.5],
        borderColor: "rgba(59, 130, 246, 1)", // blue-500
        backgroundColor: "rgba(59, 130, 246, 0.2)",
        tension: 0.4,
      },
      {
        label: "Gas (m³)",
        data: [35.2, 40.1, 38.5, 38.5, 42.3, 45.8],
        borderColor: "rgba(249, 115, 22, 1)", // orange-500
        backgroundColor: "rgba(249, 115, 22, 0.2)",
        tension: 0.4,
      },
      {
        label: "Electricidad (kWh)",
        data: [290, 305, 315, 315, 327, 320],
        borderColor: "rgba(234, 179, 8, 1)", // yellow-500
        backgroundColor: "rgba(234, 179, 8, 0.2)",
        tension: 0.4,
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
      tooltip: {
        mode: "index" as const,
        intersect: false,
      },
    },
    scales: {
      y: {
        beginAtZero: false,
      },
    },
    interaction: {
      mode: "nearest" as const,
      axis: "x" as const,
      intersect: false,
    },
  }

  if (!isClient) {
    return <div className="h-full flex items-center justify-center">Cargando gráfico...</div>
  }

  return <Line data={data} options={options} />
}

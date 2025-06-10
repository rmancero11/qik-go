"use client"

import { useEffect, useState } from "react"
import { Line } from "react-chartjs-2"

export function MonthlyProfitChart() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const data = {
    labels: ["Ene", "Feb", "Mar", "Abr", "May", "Jun"],
    datasets: [
      {
        label: "Ganancias",
        data: [18500, 19200, 18700, 20500, 22800, 24890],
        borderColor: "rgba(6, 182, 212, 1)",
        backgroundColor: "rgba(6, 182, 212, 0.2)",
        fill: true,
        tension: 0.4,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  }

  if (!isClient) {
    return <div className="h-[300px] flex items-center justify-center">Cargando gráfico...</div>
  }

  return <Line data={data} options={options} height={300} />
}

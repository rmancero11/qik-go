"use client"

import { useEffect, useState } from "react"
import { Bar } from "react-chartjs-2"

export function DailyProfitChart() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const data = {
    labels: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"],
    datasets: [
      {
        label: "Ingresos",
        data: [3240, 2980, 3150, 3420, 3980, 4250, 3780],
        backgroundColor: "rgba(6, 182, 212, 0.6)",
        borderColor: "rgba(6, 182, 212, 1)",
        borderWidth: 1,
      },
      {
        label: "Egresos",
        data: [1120, 980, 1050, 1180, 1320, 1450, 1280],
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

  return <Bar data={data} options={options} height={300} />
}

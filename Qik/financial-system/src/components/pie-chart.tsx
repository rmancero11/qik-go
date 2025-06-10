"use client"

import { useEffect, useState } from "react"
import { Pie } from "react-chartjs-2"

interface PieChartProps {
  data: { name: string; value: number }[]
}

export function PieChart({ data }: PieChartProps) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const chartData = {
    labels: data.map((item) => item.name),
    datasets: [
      {
        data: data.map((item) => item.value),
        backgroundColor: [
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 99, 132, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
        ],
        borderColor: [
          "rgba(54, 162, 235, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "right" as const,
      },
    },
  }

  if (!isClient) {
    return <div className="h-[300px] flex items-center justify-center">Cargando gráfico...</div>
  }

  return <Pie data={chartData} options={options} />
}

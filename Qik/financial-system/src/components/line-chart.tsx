"use client"

import { useEffect, useState } from "react"
import { Line } from "react-chartjs-2"

interface LineChartProps {
  data: Record<string, any>[]
}

export function LineChart({ data }: LineChartProps) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  // Extract all keys except 'month'
  const keys = Object.keys(data[0]).filter((key) => key !== "month")

  const chartData = {
    labels: data.map((item) => item.month),
    datasets: keys.map((key, index) => {
      const colors = [
        { line: "rgb(53, 162, 235)", bg: "rgba(53, 162, 235, 0.5)" },
        { line: "rgb(255, 99, 132)", bg: "rgba(255, 99, 132, 0.5)" },
        { line: "rgb(75, 192, 192)", bg: "rgba(75, 192, 192, 0.5)" },
        { line: "rgb(255, 206, 86)", bg: "rgba(255, 206, 86, 0.5)" },
      ]

      return {
        label: key,
        data: data.map((item) => item[key]),
        borderColor: colors[index % colors.length].line,
        backgroundColor: colors[index % colors.length].bg,
        tension: 0.3,
      }
    }),
  }

  const options = {
    responsive: true,
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

  return <Line data={chartData} options={options} height={300} />
}

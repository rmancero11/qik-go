"use client"

import { useEffect, useState } from "react"
import { Line } from "react-chartjs-2"

interface AccountBalanceChartProps {
  type: "activo" | "pasivo" | "patrimonio"
}

export function AccountBalanceChart({ type }: AccountBalanceChartProps) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  // Datos de ejemplo para cada tipo de cuenta
  const chartData = {
    activo: {
      labels: ["Ene", "Feb", "Mar", "Abr", "May", "Jun"],
      datasets: [
        {
          label: "Caja",
          data: [1800, 2100, 1950, 2300, 2200, 2450],
          borderColor: "rgba(6, 182, 212, 1)",
          backgroundColor: "rgba(6, 182, 212, 0.2)",
          tension: 0.4,
        },
        {
          label: "Bancos",
          data: [15200, 16500, 17200, 16800, 17500, 18750],
          borderColor: "rgba(14, 165, 233, 1)",
          backgroundColor: "rgba(14, 165, 233, 0.2)",
          tension: 0.4,
        },
        {
          label: "Cuentas por Cobrar",
          data: [4200, 4800, 5500, 4900, 5100, 5320],
          borderColor: "rgba(79, 70, 229, 1)",
          backgroundColor: "rgba(79, 70, 229, 0.2)",
          tension: 0.4,
        },
      ],
    },
    pasivo: {
      labels: ["Ene", "Feb", "Mar", "Abr", "May", "Jun"],
      datasets: [
        {
          label: "Cuentas por Pagar",
          data: [7500, 8200, 7800, 8500, 8100, 8750],
          borderColor: "rgba(249, 115, 22, 1)",
          backgroundColor: "rgba(249, 115, 22, 0.2)",
          tension: 0.4,
        },
        {
          label: "Préstamos",
          data: [31000, 30500, 30000, 29500, 29000, 30000],
          borderColor: "rgba(220, 38, 38, 1)",
          backgroundColor: "rgba(220, 38, 38, 0.2)",
          tension: 0.4,
        },
        {
          label: "Impuestos por Pagar",
          data: [2800, 3100, 2900, 3200, 3000, 3250],
          borderColor: "rgba(236, 72, 153, 1)",
          backgroundColor: "rgba(236, 72, 153, 0.2)",
          tension: 0.4,
        },
      ],
    },
    patrimonio: {
      labels: ["Ene", "Feb", "Mar", "Abr", "May", "Jun"],
      datasets: [
        {
          label: "Capital",
          data: [50000, 50000, 50000, 50000, 50000, 50000],
          borderColor: "rgba(16, 185, 129, 1)",
          backgroundColor: "rgba(16, 185, 129, 0.2)",
          tension: 0.4,
        },
        {
          label: "Reservas",
          data: [4000, 4000, 4500, 4500, 5000, 5000],
          borderColor: "rgba(5, 150, 105, 1)",
          backgroundColor: "rgba(5, 150, 105, 0.2)",
          tension: 0.4,
        },
        {
          label: "Resultados",
          data: [15000, 16500, 18000, 19500, 20500, 21250],
          borderColor: "rgba(4, 120, 87, 1)",
          backgroundColor: "rgba(4, 120, 87, 0.2)",
          tension: 0.4,
        },
      ],
    },
  }

  const data = chartData[type]

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
    return <div className="h-full flex items-center justify-center">Cargando gráfico...</div>
  }

  return <Line data={data} options={options} />
}

"use client";

import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface AccountBalanceChartProps {
  type: "activo" | "pasivo" | "patrimonio";
}

export function AccountBalanceChart({ type }: AccountBalanceChartProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Datos de ejemplo para cada tipo de cuenta
  const chartData = {
    activo: [
      {
        mes: "Ene",
        Caja: 1800,
        Bancos: 15200,
        "Cuentas por Cobrar": 4200,
      },
      {
        mes: "Feb",
        Caja: 2100,
        Bancos: 16500,
        "Cuentas por Cobrar": 4800,
      },
      {
        mes: "Mar",
        Caja: 1950,
        Bancos: 17200,
        "Cuentas por Cobrar": 5500,
      },
      {
        mes: "Abr",
        Caja: 2300,
        Bancos: 16800,
        "Cuentas por Cobrar": 4900,
      },
      {
        mes: "May",
        Caja: 2200,
        Bancos: 17500,
        "Cuentas por Cobrar": 5100,
      },
      {
        mes: "Jun",
        Caja: 2450,
        Bancos: 18750,
        "Cuentas por Cobrar": 5320,
      },
    ],
    pasivo: [
      {
        mes: "Ene",
        "Cuentas por Pagar": 7500,
        Préstamos: 31000,
        "Impuestos por Pagar": 2800,
      },
      {
        mes: "Feb",
        "Cuentas por Pagar": 8200,
        Préstamos: 30500,
        "Impuestos por Pagar": 3100,
      },
      {
        mes: "Mar",
        "Cuentas por Pagar": 7800,
        Préstamos: 30000,
        "Impuestos por Pagar": 2900,
      },
      {
        mes: "Abr",
        "Cuentas por Pagar": 8500,
        Préstamos: 29500,
        "Impuestos por Pagar": 3200,
      },
      {
        mes: "May",
        "Cuentas por Pagar": 8100,
        Préstamos: 29000,
        "Impuestos por Pagar": 3000,
      },
      {
        mes: "Jun",
        "Cuentas por Pagar": 8750,
        Préstamos: 30000,
        "Impuestos por Pagar": 3250,
      },
    ],
    patrimonio: [
      {
        mes: "Ene",
        Capital: 50000,
        Reservas: 4000,
        Resultados: 15000,
      },
      {
        mes: "Feb",
        Capital: 50000,
        Reservas: 4000,
        Resultados: 16500,
      },
      {
        mes: "Mar",
        Capital: 50000,
        Reservas: 4500,
        Resultados: 18000,
      },
      {
        mes: "Abr",
        Capital: 50000,
        Reservas: 4500,
        Resultados: 19500,
      },
      {
        mes: "May",
        Capital: 50000,
        Reservas: 5000,
        Resultados: 20500,
      },
      {
        mes: "Jun",
        Capital: 50000,
        Reservas: 5000,
        Resultados: 21250,
      },
    ],
  };

  const data = chartData[type];

  const colors = {
    activo: {
      Caja: "#06b6d4",
      Bancos: "#0ea5e9",
      "Cuentas por Cobrar": "#4f46e5",
    },
    pasivo: {
      "Cuentas por Pagar": "#f97316",
      Préstamos: "#dc2626",
      "Impuestos por Pagar": "#ec4899",
    },
    patrimonio: {
      Capital: "#10b981",
      Reservas: "#059669",
      Resultados: "#047857",
    },
  };

  if (!isClient) {
    return (
      <div className="h-full flex items-center justify-center">
        Cargando gráfico...
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="mes" />
        <YAxis />
        <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, ""]} />
        <Legend />
        {Object.keys(colors[type]).map((key) => (
          <Line
            key={key}
            type="monotone"
            dataKey={key}
            stroke={colors[type][key as keyof (typeof colors)[typeof type]]}
            strokeWidth={2}
            dot={{ r: 4 }}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}

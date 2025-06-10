"use client"

import { Badge } from "@/components/ui/badge"
import { ArrowUpRight, ArrowDownRight } from "lucide-react"

export function RecentTransactions() {
  const transactions = [
    {
      id: 1,
      description: "Venta de productos",
      category: "Ventas",
      amount: 450.75,
      type: "ingreso",
      date: "2023-06-10 14:25",
      paymentMethod: "Efectivo",
    },
    {
      id: 2,
      description: "Pago a proveedor Frigorífico Norte",
      category: "Proveedores",
      amount: 1250.0,
      type: "egreso",
      date: "2023-06-10 11:30",
      paymentMethod: "Transferencia",
    },
    {
      id: 3,
      description: "Venta de servicios",
      category: "Ventas",
      amount: 320.5,
      type: "ingreso",
      date: "2023-06-10 10:15",
      paymentMethod: "Tarjeta",
    },
    {
      id: 4,
      description: "Pago de servicios básicos",
      category: "Servicios",
      amount: 180.25,
      type: "egreso",
      date: "2023-06-09 16:40",
      paymentMethod: "Débito",
    },
    {
      id: 5,
      description: "Venta de productos",
      category: "Ventas",
      amount: 550.0,
      type: "ingreso",
      date: "2023-06-09 13:20",
      paymentMethod: "Efectivo",
    },
  ]

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <div className="grid grid-cols-5 p-3 text-sm font-medium text-muted-foreground">
          <div>Descripción</div>
          <div>Categoría</div>
          <div className="text-right">Monto</div>
          <div className="text-center">Método</div>
          <div className="text-right">Fecha</div>
        </div>
        <div>
          {transactions.map((transaction) => (
            <div key={transaction.id} className="grid grid-cols-5 items-center p-3 text-sm border-t">
              <div className="font-medium">{transaction.description}</div>
              <div>{transaction.category}</div>
              <div
                className={`text-right font-medium ${transaction.type === "ingreso" ? "text-emerald-600" : "text-rose-600"}`}
              >
                {transaction.type === "ingreso" ? (
                  <span className="flex items-center justify-end">
                    <ArrowUpRight className="mr-1 h-4 w-4" />${transaction.amount.toFixed(2)}
                  </span>
                ) : (
                  <span className="flex items-center justify-end">
                    <ArrowDownRight className="mr-1 h-4 w-4" />${transaction.amount.toFixed(2)}
                  </span>
                )}
              </div>
              <div className="text-center">
                <Badge variant="outline">{transaction.paymentMethod}</Badge>
              </div>
              <div className="text-right text-muted-foreground">{transaction.date}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

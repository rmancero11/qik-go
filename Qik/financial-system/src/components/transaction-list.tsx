"use client"

import { Badge } from "@/components/ui/badge"
import { ArrowUpRight, ArrowDownRight, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react"

interface TransactionListProps {
  type?: "ingreso" | "egreso" | "provision"
}

export function TransactionList({ type }: TransactionListProps) {
  const allTransactions = [
    {
      id: 1,
      description: "Venta de productos",
      category: "Ventas",
      amount: 450.75,
      type: "ingreso",
      date: "2023-06-10 14:25",
      paymentMethod: "Efectivo",
      account: "Caja",
      document: "F-001-00123",
    },
    {
      id: 2,
      description: "Pago a proveedor Frigorífico Norte",
      category: "Proveedores",
      amount: 1250.0,
      type: "egreso",
      date: "2023-06-10 11:30",
      paymentMethod: "Transferencia",
      account: "Bancos",
      document: "F-2023-0187",
    },
    {
      id: 3,
      description: "Venta de servicios",
      category: "Ventas",
      amount: 320.5,
      type: "ingreso",
      date: "2023-06-10 10:15",
      paymentMethod: "Tarjeta",
      account: "Bancos",
      document: "F-001-00124",
    },
    {
      id: 4,
      description: "Pago de servicios básicos",
      category: "Servicios",
      amount: 180.25,
      type: "egreso",
      date: "2023-06-09 16:40",
      paymentMethod: "Débito",
      account: "Bancos",
      document: "F-2023-0056",
    },
    {
      id: 5,
      description: "Venta de productos",
      category: "Ventas",
      amount: 550.0,
      type: "ingreso",
      date: "2023-06-09 13:20",
      paymentMethod: "Efectivo",
      account: "Caja",
      document: "F-001-00125",
    },
    {
      id: 6,
      description: "Provisión para impuestos",
      category: "Impuestos",
      amount: 850.0,
      type: "provision",
      date: "2023-06-09 09:15",
      paymentMethod: "-",
      account: "Cuentas por pagar",
      document: "P-2023-0012",
    },
    {
      id: 7,
      description: "Pago de nómina",
      category: "Sueldos",
      amount: 2800.0,
      type: "egreso",
      date: "2023-06-08 15:30",
      paymentMethod: "Transferencia",
      account: "Bancos",
      document: "N-2023-0006",
    },
    {
      id: 8,
      description: "Provisión para beneficios sociales",
      category: "Beneficios",
      amount: 450.0,
      type: "provision",
      date: "2023-06-08 14:20",
      paymentMethod: "-",
      account: "Cuentas por pagar",
      document: "P-2023-0013",
    },
    {
      id: 9,
      description: "Venta de productos",
      category: "Ventas",
      amount: 680.25,
      type: "ingreso",
      date: "2023-06-08 11:45",
      paymentMethod: "QR / Wallet",
      account: "Bancos",
      document: "F-001-00126",
    },
    {
      id: 10,
      description: "Compra de insumos",
      category: "Proveedores",
      amount: 950.5,
      type: "egreso",
      date: "2023-06-07 16:10",
      paymentMethod: "Cheque",
      account: "Bancos",
      document: "F-2023-0078",
    },
  ]

  const transactions = type ? allTransactions.filter((transaction) => transaction.type === type) : allTransactions

  return (
    <div className="rounded-md border">
      <div className="grid grid-cols-7 p-3 text-sm font-medium text-muted-foreground">
        <div>Descripción</div>
        <div>Categoría</div>
        <div className="text-right">Monto</div>
        <div className="text-center">Método</div>
        <div className="text-center">Cuenta</div>
        <div>Documento</div>
        <div className="text-right">Fecha</div>
      </div>
      <div>
        {transactions.map((transaction) => (
          <div key={transaction.id} className="grid grid-cols-7 items-center p-3 text-sm border-t">
            <div className="font-medium">{transaction.description}</div>
            <div>{transaction.category}</div>
            <div
              className={`text-right font-medium ${
                transaction.type === "ingreso"
                  ? "text-emerald-600"
                  : transaction.type === "egreso"
                    ? "text-rose-600"
                    : "text-amber-600"
              }`}
            >
              {transaction.type === "ingreso" ? (
                <span className="flex items-center justify-end">
                  <ArrowUpRight className="mr-1 h-4 w-4" />${transaction.amount.toFixed(2)}
                </span>
              ) : transaction.type === "egreso" ? (
                <span className="flex items-center justify-end">
                  <ArrowDownRight className="mr-1 h-4 w-4" />${transaction.amount.toFixed(2)}
                </span>
              ) : (
                <span className="flex items-center justify-end">
                  <Clock className="mr-1 h-4 w-4" />${transaction.amount.toFixed(2)}
                </span>
              )}
            </div>
            <div className="text-center">
              <Badge variant="outline">{transaction.paymentMethod}</Badge>
            </div>
            <div className="text-center">{transaction.account}</div>
            <div>{transaction.document}</div>
            <div className="text-right text-muted-foreground flex items-center justify-end">
              <span className="mr-2">{transaction.date}</span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Abrir menú</span>
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                  <DropdownMenuItem>Ver detalles</DropdownMenuItem>
                  <DropdownMenuItem>Editar</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-rose-500">Eliminar</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

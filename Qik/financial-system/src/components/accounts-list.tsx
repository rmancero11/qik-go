"use client"

import { Badge } from "@/components/ui/badge"
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

interface AccountsListProps {
  type: "activo" | "pasivo" | "patrimonio"
}

export function AccountsList({ type }: AccountsListProps) {
  const accounts = {
    activo: [
      {
        id: 1,
        name: "Caja General",
        code: "1.1.1.01",
        balance: 2450.75,
        type: "Activo Corriente",
        lastMovement: "2023-06-10",
      },
      {
        id: 2,
        name: "Banco Pichincha Cta. Cte.",
        code: "1.1.2.01",
        balance: 12580.3,
        type: "Activo Corriente",
        lastMovement: "2023-06-09",
      },
      {
        id: 3,
        name: "Banco Guayaquil Cta. Ahorros",
        code: "1.1.2.02",
        balance: 6170.0,
        type: "Activo Corriente",
        lastMovement: "2023-06-08",
      },
      {
        id: 4,
        name: "Cuentas por Cobrar Clientes",
        code: "1.1.3.01",
        balance: 5320.0,
        type: "Activo Corriente",
        lastMovement: "2023-06-07",
      },
      {
        id: 5,
        name: "Inventario de Mercaderías",
        code: "1.1.4.01",
        balance: 18750.5,
        type: "Activo Corriente",
        lastMovement: "2023-06-06",
      },
    ],
    pasivo: [
      {
        id: 1,
        name: "Cuentas por Pagar Proveedores",
        code: "2.1.1.01",
        balance: 8750.25,
        type: "Pasivo Corriente",
        lastMovement: "2023-06-10",
      },
      {
        id: 2,
        name: "Préstamo Bancario Corto Plazo",
        code: "2.1.2.01",
        balance: 5000.0,
        type: "Pasivo Corriente",
        lastMovement: "2023-06-05",
      },
      {
        id: 3,
        name: "Impuestos por Pagar",
        code: "2.1.3.01",
        balance: 3250.75,
        type: "Pasivo Corriente",
        lastMovement: "2023-06-08",
      },
      {
        id: 4,
        name: "Sueldos por Pagar",
        code: "2.1.4.01",
        balance: 4500.0,
        type: "Pasivo Corriente",
        lastMovement: "2023-06-07",
      },
      {
        id: 5,
        name: "Préstamo Bancario Largo Plazo",
        code: "2.2.1.01",
        balance: 25000.0,
        type: "Pasivo No Corriente",
        lastMovement: "2023-05-15",
      },
    ],
    patrimonio: [
      {
        id: 1,
        name: "Capital Social",
        code: "3.1.1.01",
        balance: 50000.0,
        type: "Capital",
        lastMovement: "2023-01-01",
      },
      {
        id: 2,
        name: "Reserva Legal",
        code: "3.2.1.01",
        balance: 5000.0,
        type: "Reservas",
        lastMovement: "2023-03-31",
      },
      {
        id: 3,
        name: "Utilidades Acumuladas",
        code: "3.3.1.01",
        balance: 12500.0,
        type: "Resultados",
        lastMovement: "2023-03-31",
      },
      {
        id: 4,
        name: "Utilidad del Ejercicio",
        code: "3.3.2.01",
        balance: 8750.5,
        type: "Resultados",
        lastMovement: "2023-05-31",
      },
    ],
  }

  const selectedAccounts = accounts[type]

  return (
    <div className="rounded-md border">
      <div className="grid grid-cols-5 p-3 text-sm font-medium text-muted-foreground">
        <div>Nombre</div>
        <div>Código</div>
        <div className="text-right">Saldo</div>
        <div className="text-center">Tipo</div>
        <div className="text-right">Último Movimiento</div>
      </div>
      <div>
        {selectedAccounts.map((account) => (
          <div key={account.id} className="grid grid-cols-5 items-center p-3 text-sm border-t">
            <div className="font-medium">{account.name}</div>
            <div>{account.code}</div>
            <div className="text-right font-medium">${account.balance.toFixed(2)}</div>
            <div className="text-center">
              <Badge variant="outline">{account.type}</Badge>
            </div>
            <div className="text-right text-muted-foreground flex items-center justify-end">
              <span className="mr-2">{account.lastMovement}</span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Abrir menú</span>
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                  <DropdownMenuItem>Ver movimientos</DropdownMenuItem>
                  <DropdownMenuItem>Editar cuenta</DropdownMenuItem>
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

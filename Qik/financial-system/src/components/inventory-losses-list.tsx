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

export function InventoryLossesList() {
  const losses = [
    {
      id: 1,
      product: "Leche",
      category: "Lácteos",
      quantity: 5,
      cost: 7.5,
      reason: "Vencimiento",
      date: "2023-06-10",
      employee: "Juan Pérez",
      notes: "Producto vencido el 05/06/2023",
    },
    {
      id: 2,
      product: "Carne molida",
      category: "Carnes",
      quantity: 2,
      cost: 13.5,
      reason: "Rotura",
      date: "2023-06-09",
      employee: "María López",
      notes: "Empaque roto durante manipulación",
    },
    {
      id: 3,
      product: "Queso",
      category: "Lácteos",
      quantity: 1,
      cost: 5.5,
      reason: "Contaminación",
      date: "2023-06-09",
      employee: "Carlos Gómez",
      notes: "Contaminación por mal almacenamiento",
    },
    {
      id: 4,
      product: "Tomates",
      category: "Verduras",
      quantity: 8,
      cost: 16.0,
      reason: "Vencimiento",
      date: "2023-06-08",
      employee: "Ana Martínez",
      notes: "Producto en mal estado",
    },
    {
      id: 5,
      product: "Harina",
      category: "Panadería",
      quantity: 3,
      cost: 9.75,
      reason: "Rotura",
      date: "2023-06-07",
      employee: "Pedro Sánchez",
      notes: "Bolsa rota durante transporte",
    },
  ]

  return (
    <div className="rounded-md border">
      <div className="grid grid-cols-7 p-3 text-sm font-medium text-muted-foreground">
        <div>Producto</div>
        <div>Categoría</div>
        <div className="text-center">Cantidad</div>
        <div className="text-right">Costo</div>
        <div>Motivo</div>
        <div>Empleado</div>
        <div className="text-right">Fecha</div>
      </div>
      <div>
        {losses.map((loss) => (
          <div key={loss.id} className="grid grid-cols-7 items-center p-3 text-sm border-t">
            <div className="font-medium">{loss.product}</div>
            <div>{loss.category}</div>
            <div className="text-center">{loss.quantity}</div>
            <div className="text-right font-medium">${loss.cost.toFixed(2)}</div>
            <div>
              <Badge
                variant="outline"
                className={
                  loss.reason === "Vencimiento"
                    ? "bg-rose-50 text-rose-700 border-rose-200"
                    : loss.reason === "Rotura"
                      ? "bg-amber-50 text-amber-700 border-amber-200"
                      : "bg-blue-50 text-blue-700 border-blue-200"
                }
              >
                {loss.reason}
              </Badge>
            </div>
            <div>{loss.employee}</div>
            <div className="text-right text-muted-foreground flex items-center justify-end">
              <span className="mr-2">{loss.date}</span>
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
                  <DropdownMenuItem>Editar registro</DropdownMenuItem>
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

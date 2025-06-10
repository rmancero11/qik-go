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
import { MoreHorizontal, Droplets, Flame, Zap, Wifi, Phone } from "lucide-react"
import type { JSX } from "react"

export function ConsumptionList() {
  // Datos de ejemplo para la tabla de consumos
  const consumptions = [
    {
      id: 1,
      date: "2023-06-10",
      service: "agua",
      amount: 12.5,
      unit: "m³",
      notes: "Lectura del medidor principal",
    },
    {
      id: 2,
      date: "2023-06-10",
      service: "gas",
      amount: 45.8,
      unit: "m³",
      notes: "",
    },
    {
      id: 3,
      date: "2023-06-10",
      service: "electricidad",
      amount: 320,
      unit: "kWh",
      notes: "Consumo alto por uso de aire acondicionado",
    },
    {
      id: 4,
      date: "2023-05-15",
      service: "agua",
      amount: 13.2,
      unit: "m³",
      notes: "",
    },
    {
      id: 5,
      date: "2023-05-15",
      service: "gas",
      amount: 42.3,
      unit: "m³",
      notes: "",
    },
    {
      id: 6,
      date: "2023-05-15",
      service: "electricidad",
      amount: 327,
      unit: "kWh",
      notes: "",
    },
    {
      id: 7,
      date: "2023-04-12",
      service: "agua",
      amount: 11.8,
      unit: "m³",
      notes: "",
    },
    {
      id: 8,
      date: "2023-04-12",
      service: "gas",
      amount: 38.5,
      unit: "m³",
      notes: "",
    },
    {
      id: 9,
      date: "2023-04-12",
      service: "electricidad",
      amount: 315,
      unit: "kWh",
      notes: "",
    },
  ]

  // Iconos para cada tipo de servicio
  const serviceIcons: Record<string, JSX.Element> = {
    agua: <Droplets className="h-4 w-4 text-blue-600" />,
    gas: <Flame className="h-4 w-4 text-orange-600" />,
    electricidad: <Zap className="h-4 w-4 text-yellow-600" />,
    internet: <Wifi className="h-4 w-4 text-purple-600" />,
    telefono: <Phone className="h-4 w-4 text-green-600" />,
  }

  // Nombres de servicios
  const serviceNames: Record<string, string> = {
    agua: "Agua",
    gas: "Gas",
    electricidad: "Electricidad",
    internet: "Internet",
    telefono: "Teléfono",
  }

  return (
    <div className="rounded-md border">
      <div className="grid grid-cols-5 p-3 text-sm font-medium text-muted-foreground">
        <div>Fecha</div>
        <div>Servicio</div>
        <div className="text-center">Consumo</div>
        <div>Notas</div>
        <div className="text-right">Acciones</div>
      </div>
      <div>
        {consumptions.map((consumption) => (
          <div key={consumption.id} className="grid grid-cols-5 items-center p-3 text-sm border-t">
            <div>{consumption.date}</div>
            <div>
              <Badge
                variant="outline"
                className={`flex items-center gap-1 w-fit
                  ${consumption.service === "agua" ? "bg-blue-50 text-blue-700 border-blue-200" : ""}
                  ${consumption.service === "gas" ? "bg-orange-50 text-orange-700 border-orange-200" : ""}
                  ${consumption.service === "electricidad" ? "bg-yellow-50 text-yellow-700 border-yellow-200" : ""}
                  ${consumption.service === "internet" ? "bg-purple-50 text-purple-700 border-purple-200" : ""}
                  ${consumption.service === "telefono" ? "bg-green-50 text-green-700 border-green-200" : ""}
                `}
              >
                {serviceIcons[consumption.service]}
                {serviceNames[consumption.service]}
              </Badge>
            </div>
            <div className="text-center">
              {consumption.amount} {consumption.unit}
            </div>
            <div className="truncate max-w-[250px]">{consumption.notes || "—"}</div>
            <div className="text-right">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Abrir menú</span>
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Acciones</DropdownMenuLabel>
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

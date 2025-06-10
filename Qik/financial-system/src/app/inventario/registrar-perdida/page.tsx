"use client"

import type React from "react"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { CalendarIcon, ArrowLeft, AlertTriangle } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"

export default function RegistrarPerdidaPage() {
  const searchParams = useSearchParams()
  const productId = searchParams.get("producto")

  const [date, setDate] = useState<Date>(new Date())
  const [selectedProduct, setSelectedProduct] = useState<string>(productId || "")
  const [reason, setReason] = useState<string>("vencimiento")
  const [quantity, setQuantity] = useState<string>("1")

  // Lista de productos para el select
  const products = [
    { id: "1", name: "Café en grano", stock: 45, cost: 8.75 },
    { id: "2", name: "Leche", stock: 18, cost: 1.5 },
    { id: "3", name: "Azúcar", stock: 50, cost: 2.25 },
    { id: "4", name: "Harina", stock: 12, cost: 3.25 },
    { id: "5", name: "Carne molida", stock: 8, cost: 6.75 },
    { id: "6", name: "Queso", stock: 5, cost: 5.5 },
    { id: "7", name: "Tomates", stock: 7, cost: 2.0 },
  ]

  // Producto seleccionado
  const product = products.find((p) => p.id === selectedProduct)

  // Calcular costo total
  const totalCost = product && !isNaN(Number(quantity)) ? product.cost * Number(quantity) : 0

  // Verificar si la cantidad es mayor que el stock disponible
  const isQuantityValid =
    product && !isNaN(Number(quantity)) ? Number(quantity) <= product.stock && Number(quantity) > 0 : false

  // Verificar si el formulario es válido
  const isFormValid = selectedProduct && reason && isQuantityValid

  // Manejar el envío del formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!isFormValid) return

    // Aquí iría la lógica para guardar la pérdida y actualizar el stock
    alert(`Pérdida registrada: ${quantity} unidades de ${product?.name} por ${reason}. Stock actualizado.`)

    // Redireccionar a la página de inventario
    window.location.href = "/inventario"
  }

  return (
    <div className="container py-6">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="sm" asChild className="mr-4">
          <Link href="/inventario">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver
          </Link>
        </Button>
        <h1 className="text-2xl font-semibold">Registrar Pérdida de Inventario</h1>
      </div>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center">
            <AlertTriangle className="h-5 w-5 text-amber-500 mr-2" />
            Registrar Pérdida
          </CardTitle>
          <CardDescription>
            Registra productos rotos, vencidos o desechados para actualizar automáticamente el inventario
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="product">Producto</Label>
              <Select value={selectedProduct} onValueChange={setSelectedProduct}>
                <SelectTrigger id="product">
                  <SelectValue placeholder="Selecciona un producto" />
                </SelectTrigger>
                <SelectContent>
                  {products.map((product) => (
                    <SelectItem key={product.id} value={product.id}>
                      {product.name} (Stock: {product.stock})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="quantity">Cantidad</Label>
              <Input
                id="quantity"
                type="number"
                min="1"
                max={product?.stock || 1}
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className={!isQuantityValid && selectedProduct ? "border-rose-500" : ""}
              />
              {!isQuantityValid && selectedProduct && (
                <p className="text-xs text-rose-500">
                  La cantidad debe ser mayor a 0 y no puede exceder el stock disponible ({product?.stock}).
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="reason">Motivo de la Pérdida</Label>
              <Select value={reason} onValueChange={setReason}>
                <SelectTrigger id="reason">
                  <SelectValue placeholder="Selecciona el motivo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="vencimiento">Vencimiento</SelectItem>
                  <SelectItem value="rotura">Rotura</SelectItem>
                  <SelectItem value="contaminacion">Contaminación</SelectItem>
                  <SelectItem value="merma">Merma</SelectItem>
                  <SelectItem value="otro">Otro</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="date">Fecha</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP", { locale: es }) : <span>Selecciona una fecha</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={date} onSelect={(date) => date && setDate(date)} initialFocus />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notas / Observaciones</Label>
              <Textarea id="notes" placeholder="Detalles adicionales sobre la pérdida" />
            </div>

            {product && (
              <div className="rounded-md border p-4 bg-muted/50">
                <div className="font-medium mb-2">Resumen</div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>Producto:</div>
                  <div>{product.name}</div>
                  <div>Cantidad:</div>
                  <div>{quantity}</div>
                  <div>Costo unitario:</div>
                  <div>${product.cost.toFixed(2)}</div>
                  <div className="font-medium">Costo total:</div>
                  <div className="font-medium">${totalCost.toFixed(2)}</div>
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" asChild>
              <Link href="/inventario">Cancelar</Link>
            </Button>
            <Button type="submit" disabled={!isFormValid} className="bg-amber-500 hover:bg-amber-600">
              <AlertTriangle className="mr-2 h-4 w-4" />
              Registrar Pérdida
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

"use client"

import type React from "react"

import { useState } from "react"
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
import { CalendarIcon, ArrowLeft, Save } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"

export default function NuevoProductoPage() {
  const [expiryDate, setExpiryDate] = useState<Date | undefined>(undefined)

  // Categorías de productos disponibles
  const categories = [
    { value: "bebidas", label: "Bebidas" },
    { value: "lacteos", label: "Lácteos" },
    { value: "carnes", label: "Carnes" },
    { value: "panaderia", label: "Panadería" },
    { value: "verduras", label: "Verduras" },
    { value: "endulzantes", label: "Endulzantes" },
    { value: "otros", label: "Otros" },
  ]

  // Proveedores disponibles
  const suppliers = [
    { value: "cafe_imports", label: "Café Imports" },
    { value: "lacteos_del_sur", label: "Lácteos del Sur" },
    { value: "frigorifico_norte", label: "Frigorífico Norte" },
    { value: "molinos_arg", label: "Molinos Arg" },
    { value: "verduras_express", label: "Verduras Express" },
    { value: "dulces_sa", label: "Dulces SA" },
    { value: "otro", label: "Otro" },
  ]

  // Manejar el envío del formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí iría la lógica para guardar el nuevo producto
    alert("Producto guardado correctamente")
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
        <h1 className="text-2xl font-semibold">Nuevo Producto</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Información del Producto</CardTitle>
              <CardDescription>Ingresa los detalles básicos del producto</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre del Producto</Label>
                <Input id="name" placeholder="Nombre del producto" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Categoría</Label>
                <Select required>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Selecciona una categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descripción</Label>
                <Textarea id="description" placeholder="Descripción del producto" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Precio de Venta</Label>
                  <Input id="price" type="number" step="0.01" min="0" placeholder="0.00" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cost">Costo</Label>
                  <Input id="cost" type="number" step="0.01" min="0" placeholder="0.00" required />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Inventario y Proveedor</CardTitle>
              <CardDescription>Configura el stock y datos del proveedor</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="stock">Stock Inicial</Label>
                  <Input id="stock" type="number" min="0" placeholder="0" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="minStock">Stock Mínimo</Label>
                  <Input id="minStock" type="number" min="0" placeholder="0" required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="expiryDate">Fecha de Vencimiento</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !expiryDate && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {expiryDate ? format(expiryDate, "PPP", { locale: es }) : <span>Selecciona una fecha</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={expiryDate}
                      onSelect={setExpiryDate}
                      initialFocus
                      disabled={(date) => date < new Date()}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label htmlFor="supplier">Proveedor</Label>
                <Select>
                  <SelectTrigger id="supplier">
                    <SelectValue placeholder="Selecciona un proveedor" />
                  </SelectTrigger>
                  <SelectContent>
                    {suppliers.map((supplier) => (
                      <SelectItem key={supplier.value} value={supplier.value}>
                        {supplier.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="sku">SKU / Código</Label>
                <Input id="sku" placeholder="Código único del producto" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Ubicación en Almacén</Label>
                <Input id="location" placeholder="Estante, sección, etc." />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" asChild>
                <Link href="/inventario">Cancelar</Link>
              </Button>
              <Button type="submit">
                <Save className="mr-2 h-4 w-4" />
                Guardar Producto
              </Button>
            </CardFooter>
          </Card>
        </div>
      </form>
    </div>
  )
}

"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowLeft, Save } from "lucide-react"
import Link from "next/link"

export default function ConfigurarStockPage() {
  // Lista de productos con sus configuraciones de stock
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Café en grano",
      category: "Bebidas",
      currentStock: 45,
      minStock: 20,
      supplier: "Café Imports",
      reorderQuantity: 30,
      leadTime: 3, // días
    },
    {
      id: 2,
      name: "Leche",
      category: "Lácteos",
      currentStock: 18,
      minStock: 20,
      supplier: "Lácteos del Sur",
      reorderQuantity: 24,
      leadTime: 1,
    },
    {
      id: 3,
      name: "Azúcar",
      category: "Endulzantes",
      currentStock: 50,
      minStock: 25,
      supplier: "Dulces SA",
      reorderQuantity: 50,
      leadTime: 2,
    },
    {
      id: 4,
      name: "Harina",
      category: "Panadería",
      currentStock: 12,
      minStock: 20,
      supplier: "Molinos Arg",
      reorderQuantity: 25,
      leadTime: 2,
    },
    {
      id: 5,
      name: "Carne molida",
      category: "Carnes",
      currentStock: 8,
      minStock: 15,
      supplier: "Frigorífico Norte",
      reorderQuantity: 20,
      leadTime: 1,
    },
  ])

  // Estado para el filtro de categoría
  const [categoryFilter, setCategoryFilter] = useState("all")

  // Función para actualizar el stock mínimo de un producto
  const updateMinStock = (id: number, value: string) => {
    const numValue = Number.parseInt(value)
    if (isNaN(numValue) || numValue < 0) return

    setProducts(products.map((product) => (product.id === id ? { ...product, minStock: numValue } : product)))
  }

  // Función para actualizar la cantidad de reorden
  const updateReorderQuantity = (id: number, value: string) => {
    const numValue = Number.parseInt(value)
    if (isNaN(numValue) || numValue < 0) return

    setProducts(products.map((product) => (product.id === id ? { ...product, reorderQuantity: numValue } : product)))
  }

  // Función para actualizar el tiempo de entrega
  const updateLeadTime = (id: number, value: string) => {
    const numValue = Number.parseInt(value)
    if (isNaN(numValue) || numValue < 0) return

    setProducts(products.map((product) => (product.id === id ? { ...product, leadTime: numValue } : product)))
  }

  // Filtrar productos por categoría
  const filteredProducts =
    categoryFilter === "all"
      ? products
      : products.filter((product) => product.category.toLowerCase() === categoryFilter.toLowerCase())

  // Guardar cambios
  const saveChanges = () => {
    // Aquí iría la lógica para guardar en la base de datos
    alert("Configuración de stock guardada correctamente")
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
        <h1 className="text-2xl font-semibold">Configuración de Stock Mínimo</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Configurar Niveles de Stock</CardTitle>
          <CardDescription>
            Establece el stock mínimo para cada producto y configura las alertas automáticas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between mb-6">
            <div className="flex items-center gap-2">
              <Label htmlFor="category-filter">Filtrar por categoría:</Label>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger id="category-filter" className="w-[180px]">
                  <SelectValue placeholder="Todas las categorías" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas las categorías</SelectItem>
                  <SelectItem value="bebidas">Bebidas</SelectItem>
                  <SelectItem value="lácteos">Lácteos</SelectItem>
                  <SelectItem value="endulzantes">Endulzantes</SelectItem>
                  <SelectItem value="panadería">Panadería</SelectItem>
                  <SelectItem value="carnes">Carnes</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Producto</TableHead>
                <TableHead>Categoría</TableHead>
                <TableHead className="text-center">Stock Actual</TableHead>
                <TableHead className="text-center">Stock Mínimo</TableHead>
                <TableHead className="text-center">Cantidad a Pedir</TableHead>
                <TableHead className="text-center">Tiempo de Entrega (días)</TableHead>
                <TableHead>Proveedor</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell className="text-center">{product.currentStock}</TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      min="0"
                      value={product.minStock}
                      onChange={(e) => updateMinStock(product.id, e.target.value)}
                      className="w-20 mx-auto text-center"
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      min="0"
                      value={product.reorderQuantity}
                      onChange={(e) => updateReorderQuantity(product.id, e.target.value)}
                      className="w-20 mx-auto text-center"
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      min="0"
                      value={product.leadTime}
                      onChange={(e) => updateLeadTime(product.id, e.target.value)}
                      className="w-20 mx-auto text-center"
                    />
                  </TableCell>
                  <TableCell>{product.supplier}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" asChild>
            <Link href="/inventario">Cancelar</Link>
          </Button>
          <Button onClick={saveChanges}>
            <Save className="mr-2 h-4 w-4" />
            Guardar Configuración
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

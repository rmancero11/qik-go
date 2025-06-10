"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowLeft, ShoppingCart, Send, Plus, Minus, Trash2 } from "lucide-react"
import Link from "next/link"

export default function RealizarPedidoPage() {
  const searchParams = useSearchParams()
  const productId = searchParams.get("producto")

  // Lista de productos disponibles
  const allProducts = [
    {
      id: "1",
      name: "Café en grano",
      category: "Bebidas",
      currentStock: 45,
      minStock: 20,
      price: 8.75,
      supplier: "Café Imports",
      reorderQuantity: 30,
    },
    {
      id: "2",
      name: "Leche",
      category: "Lácteos",
      currentStock: 18,
      minStock: 20,
      price: 1.5,
      supplier: "Lácteos del Sur",
      reorderQuantity: 24,
    },
    {
      id: "3",
      name: "Azúcar",
      category: "Endulzantes",
      currentStock: 50,
      minStock: 25,
      price: 2.25,
      supplier: "Dulces SA",
      reorderQuantity: 50,
    },
    {
      id: "4",
      name: "Harina",
      category: "Panadería",
      currentStock: 12,
      minStock: 20,
      price: 3.25,
      supplier: "Molinos Arg",
      reorderQuantity: 25,
    },
    {
      id: "5",
      name: "Carne molida",
      category: "Carnes",
      currentStock: 8,
      minStock: 15,
      price: 6.75,
      supplier: "Frigorífico Norte",
      reorderQuantity: 20,
    },
  ]

  // Lista de proveedores
  const suppliers = [
    { id: "1", name: "Café Imports", phone: "+5491123456789", email: "pedidos@cafeimports.com" },
    { id: "2", name: "Lácteos del Sur", phone: "+5491187654321", email: "ventas@lacteosdelsur.com" },
    { id: "3", name: "Dulces SA", phone: "+5491145678923", email: "pedidos@dulcessa.com" },
    { id: "4", name: "Molinos Arg", phone: "+5491156789234", email: "ventas@molinosarg.com" },
    { id: "5", name: "Frigorífico Norte", phone: "+5491167892345", email: "pedidos@frigorificonorte.com" },
  ]

  // Estado para el proveedor seleccionado
  const [selectedSupplier, setSelectedSupplier] = useState("")

  // Estado para los productos en el pedido
  const [orderItems, setOrderItems] = useState<
    Array<{
      id: string
      name: string
      quantity: number
      price: number
    }>
  >([])

  // Estado para el producto seleccionado en el selector
  const [selectedProduct, setSelectedProduct] = useState("")

  // Estado para la cantidad del producto seleccionado
  const [quantity, setQuantity] = useState("1")

  // Estado para las notas del pedido
  const [notes, setNotes] = useState("")

  // Estado para la opción de enviar por WhatsApp
  const [sendViaWhatsApp, setSendViaWhatsApp] = useState(true)

  // Efecto para cargar el producto inicial si viene en la URL
  useEffect(() => {
    if (productId) {
      const product = allProducts.find((p) => p.id === productId)
      if (product) {
        // Agregar el producto al pedido
        setOrderItems([
          {
            id: product.id,
            name: product.name,
            quantity: product.reorderQuantity,
            price: product.price,
          },
        ])

        // Seleccionar el proveedor del producto
        const supplier = suppliers.find((s) => s.name === product.supplier)
        if (supplier) {
          setSelectedSupplier(supplier.id)
        }
      }
    }
  }, [productId])

  // Filtrar productos por proveedor seleccionado
  const filteredProducts = selectedSupplier
    ? allProducts.filter((product) => {
        const supplier = suppliers.find((s) => s.id === selectedSupplier)
        return supplier && product.supplier === supplier.name
      })
    : allProducts

  // Productos con stock bajo
  const lowStockProducts = allProducts.filter((product) => product.currentStock <= product.minStock)

  // Obtener el proveedor seleccionado
  const supplier = suppliers.find((s) => s.id === selectedSupplier)

  // Calcular el total del pedido
  const orderTotal = orderItems.reduce((total, item) => total + item.quantity * item.price, 0)

  // Agregar producto al pedido
  const addProductToOrder = () => {
    if (!selectedProduct || Number.parseInt(quantity) <= 0) return

    const product = allProducts.find((p) => p.id === selectedProduct)
    if (!product) return

    // Verificar si el producto ya está en el pedido
    const existingItemIndex = orderItems.findIndex((item) => item.id === selectedProduct)

    if (existingItemIndex >= 0) {
      // Actualizar cantidad si ya existe
      const updatedItems = [...orderItems]
      updatedItems[existingItemIndex].quantity += Number.parseInt(quantity)
      setOrderItems(updatedItems)
    } else {
      // Agregar nuevo item
      setOrderItems([
        ...orderItems,
        {
          id: product.id,
          name: product.name,
          quantity: Number.parseInt(quantity),
          price: product.price,
        },
      ])
    }

    // Resetear selección
    setSelectedProduct("")
    setQuantity("1")
  }

  // Actualizar cantidad de un producto en el pedido
  const updateItemQuantity = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItemFromOrder(id)
      return
    }

    setOrderItems(orderItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
  }

  // Eliminar producto del pedido
  const removeItemFromOrder = (id: string) => {
    setOrderItems(orderItems.filter((item) => item.id !== id))
  }

  // Enviar pedido
  const sendOrder = () => {
    if (orderItems.length === 0 || !selectedSupplier) return

    if (sendViaWhatsApp && supplier) {
      // Construir mensaje para WhatsApp
      let message = `*Nuevo Pedido para ${supplier.name}*\n\n`
      message += "*Productos:*\n"

      orderItems.forEach((item) => {
        message += `- ${item.name}: ${item.quantity} unidades x $${item.price.toFixed(2)} = $${(item.quantity * item.price).toFixed(2)}\n`
      })

      message += `\n*Total del Pedido:* $${orderTotal.toFixed(2)}\n\n`

      if (notes) {
        message += `*Notas:* ${notes}\n\n`
      }

      message += "Gracias por su atención."

      // Codificar mensaje para URL
      const encodedMessage = encodeURIComponent(message)

      // Abrir WhatsApp con el mensaje
      window.open(`https://wa.me/${supplier.phone}?text=${encodedMessage}`, "_blank")
    } else {
      // Aquí iría la lógica para enviar por otro medio (email, sistema interno, etc.)
      alert(`Pedido enviado a ${supplier?.name} por email: ${supplier?.email}`)
    }
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
        <h1 className="text-2xl font-semibold">Realizar Pedido a Proveedor</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <ShoppingCart className="h-5 w-5 text-primary mr-2" />
                Crear Pedido
              </CardTitle>
              <CardDescription>Selecciona el proveedor y los productos que deseas pedir</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="supplier">Proveedor</Label>
                <Select value={selectedSupplier} onValueChange={setSelectedSupplier}>
                  <SelectTrigger id="supplier">
                    <SelectValue placeholder="Selecciona un proveedor" />
                  </SelectTrigger>
                  <SelectContent>
                    {suppliers.map((supplier) => (
                      <SelectItem key={supplier.id} value={supplier.id}>
                        {supplier.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedSupplier && (
                <>
                  <div className="flex gap-2 items-end">
                    <div className="flex-1 space-y-2">
                      <Label htmlFor="product">Producto</Label>
                      <Select value={selectedProduct} onValueChange={setSelectedProduct}>
                        <SelectTrigger id="product">
                          <SelectValue placeholder="Selecciona un producto" />
                        </SelectTrigger>
                        <SelectContent>
                          {filteredProducts.map((product) => (
                            <SelectItem key={product.id} value={product.id}>
                              {product.name} (Stock: {product.currentStock})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="w-24 space-y-2">
                      <Label htmlFor="quantity">Cantidad</Label>
                      <Input
                        id="quantity"
                        type="number"
                        min="1"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                      />
                    </div>
                    <Button onClick={addProductToOrder} className="mb-0.5">
                      <Plus className="h-4 w-4" />
                      Agregar
                    </Button>
                  </div>

                  <div className="border rounded-md">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Producto</TableHead>
                          <TableHead className="text-center">Cantidad</TableHead>
                          <TableHead className="text-right">Precio Unit.</TableHead>
                          <TableHead className="text-right">Subtotal</TableHead>
                          <TableHead className="w-[100px]"></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {orderItems.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={5} className="text-center text-muted-foreground py-6">
                              No hay productos en el pedido
                            </TableCell>
                          </TableRow>
                        ) : (
                          orderItems.map((item) => (
                            <TableRow key={item.id}>
                              <TableCell className="font-medium">{item.name}</TableCell>
                              <TableCell className="text-center">
                                <div className="flex items-center justify-center gap-2">
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-6 w-6"
                                    onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
                                  >
                                    <Minus className="h-3 w-3" />
                                  </Button>
                                  <span className="w-8 text-center">{item.quantity}</span>
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-6 w-6"
                                    onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                                  >
                                    <Plus className="h-3 w-3" />
                                  </Button>
                                </div>
                              </TableCell>
                              <TableCell className="text-right">${item.price.toFixed(2)}</TableCell>
                              <TableCell className="text-right font-medium">
                                ${(item.quantity * item.price).toFixed(2)}
                              </TableCell>
                              <TableCell>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-7 w-7 text-rose-500 hover:text-rose-600 hover:bg-rose-50"
                                  onClick={() => removeItemFromOrder(item.id)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))
                        )}
                        {orderItems.length > 0 && (
                          <TableRow>
                            <TableCell colSpan={3} className="text-right font-bold">
                              Total:
                            </TableCell>
                            <TableCell className="text-right font-bold">${orderTotal.toFixed(2)}</TableCell>
                            <TableCell></TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes">Notas para el proveedor</Label>
                    <Textarea
                      id="notes"
                      placeholder="Instrucciones especiales, fechas de entrega preferidas, etc."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="whatsapp"
                      checked={sendViaWhatsApp}
                      onCheckedChange={(checked) => setSendViaWhatsApp(checked as boolean)}
                    />
                    <Label htmlFor="whatsapp">Enviar pedido por WhatsApp</Label>
                  </div>
                </>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" asChild>
                <Link href="/inventario">Cancelar</Link>
              </Button>
              <Button
                onClick={sendOrder}
                disabled={orderItems.length === 0 || !selectedSupplier}
                className="bg-emerald-600 hover:bg-emerald-700"
              >
                <Send className="mr-2 h-4 w-4" />
                Enviar Pedido
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Productos con Stock Bajo</CardTitle>
              <CardDescription>Productos que necesitan reposición</CardDescription>
            </CardHeader>
            <CardContent>
              {lowStockProducts.length === 0 ? (
                <p className="text-center text-muted-foreground py-6">No hay productos con stock bajo</p>
              ) : (
                <div className="space-y-4">
                  {lowStockProducts.map((product) => (
                    <div key={product.id} className="flex justify-between items-center border-b pb-2 last:border-0">
                      <div>
                        <div className="font-medium">{product.name}</div>
                        <div className="text-sm text-muted-foreground">
                          Stock: <span className="text-amber-600">{product.currentStock}</span> / {product.minStock}
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-xs"
                        onClick={() => {
                          // Buscar el proveedor
                          const supplier = suppliers.find((s) => s.name === product.supplier)
                          if (supplier) {
                            setSelectedSupplier(supplier.id)

                            // Agregar producto al pedido si no existe
                            if (!orderItems.some((item) => item.id === product.id)) {
                              setOrderItems([
                                ...orderItems,
                                {
                                  id: product.id,
                                  name: product.name,
                                  quantity: product.reorderQuantity,
                                  price: product.price,
                                },
                              ])
                            }
                          }
                        }}
                      >
                        Agregar
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {supplier && (
            <Card>
              <CardHeader>
                <CardTitle>Información del Proveedor</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div>
                    <span className="font-medium">Nombre:</span> {supplier.name}
                  </div>
                  <div>
                    <span className="font-medium">Teléfono:</span> {supplier.phone}
                  </div>
                  <div>
                    <span className="font-medium">Email:</span> {supplier.email}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

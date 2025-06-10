"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Search, Plus, Minus, ShoppingCart, CreditCard, Banknote, QrCode } from "lucide-react"

const products = [
  { id: 1, name: "Café Americano", price: 2.5, category: "Bebidas" },
  { id: 2, name: "Café Latte", price: 3.5, category: "Bebidas" },
  { id: 3, name: "Cappuccino", price: 3.75, category: "Bebidas" },
  { id: 4, name: "Sandwich de Jamón y Queso", price: 5.5, category: "Comidas" },
  { id: 5, name: "Ensalada César", price: 7.25, category: "Comidas" },
  { id: 6, name: "Tarta de Manzana", price: 4.25, category: "Postres" },
  { id: 7, name: "Brownie", price: 3.25, category: "Postres" },
]

export default function SalesModule() {
  const [cart, setCart] = useState<{ id: number; name: string; price: number; quantity: number }[]>([])
  const [paymentMethod, setPaymentMethod] = useState("efectivo")
  const [searchTerm, setSearchTerm] = useState("")

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const addToCart = (product: { id: number; name: string; price: number }) => {
    const existingItem = cart.find((item) => item.id === product.id)
    if (existingItem) {
      setCart(cart.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)))
    } else {
      setCart([...cart, { ...product, quantity: 1 }])
    }
  }

  const removeFromCart = (productId: number) => {
    const existingItem = cart.find((item) => item.id === productId)
    if (existingItem && existingItem.quantity > 1) {
      setCart(cart.map((item) => (item.id === productId ? { ...item, quantity: item.quantity - 1 } : item)))
    } else {
      setCart(cart.filter((item) => item.id !== productId))
    }
  }

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card className="md:col-span-1">
        <CardHeader>
          <CardTitle>Productos</CardTitle>
          <CardDescription>Selecciona los productos para la venta</CardDescription>
          <div className="relative mt-2">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar productos..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="Bebidas">
            <TabsList className="mb-4">
              <TabsTrigger value="Bebidas">Bebidas</TabsTrigger>
              <TabsTrigger value="Comidas">Comidas</TabsTrigger>
              <TabsTrigger value="Postres">Postres</TabsTrigger>
            </TabsList>
            {["Bebidas", "Comidas", "Postres"].map((category) => (
              <TabsContent key={category} value={category} className="m-0">
                <ScrollArea className="h-[400px]">
                  <div className="grid grid-cols-2 gap-2">
                    {filteredProducts
                      .filter((product) => product.category === category)
                      .map((product) => (
                        <Button
                          key={product.id}
                          variant="outline"
                          className="h-auto flex flex-col items-start p-4 justify-between"
                          onClick={() => addToCart(product)}
                        >
                          <div className="font-medium">{product.name}</div>
                          <div className="mt-2 text-sm">${product.price.toFixed(2)}</div>
                        </Button>
                      ))}
                  </div>
                </ScrollArea>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>

      <Card className="md:col-span-1">
        <CardHeader>
          <CardTitle className="flex items-center">
            <ShoppingCart className="mr-2 h-5 w-5" />
            Carrito de Compra
          </CardTitle>
          <CardDescription>Productos seleccionados</CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[300px]">
            {cart.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">No hay productos en el carrito</div>
            ) : (
              <div className="space-y-4">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between items-center border-b pb-2">
                    <div>
                      <div className="font-medium">{item.name}</div>
                      <div className="text-sm text-muted-foreground">
                        ${item.price.toFixed(2)} x {item.quantity}
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.id)}>
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <Button variant="ghost" size="icon" onClick={() => addToCart(item)}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>

          <div className="mt-4 pt-4 border-t">
            <div className="flex justify-between text-lg font-semibold">
              <span>Total:</span>
              <span>${calculateTotal().toFixed(2)}</span>
            </div>
          </div>

          <div className="mt-6">
            <Label>Método de Pago</Label>
            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="grid grid-cols-2 gap-4 mt-2">
              <div>
                <RadioGroupItem value="efectivo" id="efectivo" className="peer sr-only" />
                <Label
                  htmlFor="efectivo"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <Banknote className="mb-2 h-6 w-6" />
                  Efectivo
                </Label>
              </div>
              <div>
                <RadioGroupItem value="tarjeta" id="tarjeta" className="peer sr-only" />
                <Label
                  htmlFor="tarjeta"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <CreditCard className="mb-2 h-6 w-6" />
                  Tarjeta
                </Label>
              </div>
              <div>
                <RadioGroupItem value="transferencia" id="transferencia" className="peer sr-only" />
                <Label
                  htmlFor="transferencia"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <CreditCard className="mb-2 h-6 w-6" />
                  Transferencia
                </Label>
              </div>
              <div>
                <RadioGroupItem value="qr" id="qr" className="peer sr-only" />
                <Label
                  htmlFor="qr"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <QrCode className="mb-2 h-6 w-6" />
                  QR / Wallet
                </Label>
              </div>
            </RadioGroup>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" disabled={cart.length === 0}>
            Finalizar Venta
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

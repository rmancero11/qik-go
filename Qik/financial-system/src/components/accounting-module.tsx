"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { CalendarIcon, PlusCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function AccountingModule() {
  const [date, setDate] = useState<Date>(new Date())
  const [transactionType, setTransactionType] = useState("ingreso")
  
  // Datos de ejemplo para la tabla de movimientos
  const transactions = [
    { id: 1, date: "2023-05-06", description: "Venta de productos", amount: 1250.00, type: "Ingreso", category: "Ventas", paymentMethod: "Efectivo" },
    { id: 2, date: "2023-05-05", description: "Pago a proveedor", amount: -450.00, type: "Egreso", category: "Proveedores", paymentMethod: "Transferencia" },
    { id: 3, date: "2023-05-05", description: "Pago de servicios", amount: -120.00, type: "Egreso", category: "Servicios", paymentMethod: "Débito" },
    { id: 4, date: "2023-05-04", description: "Venta de servicios", amount: 850.00, type: "Ingreso", category: "Ventas", paymentMethod: "Tarjeta" },
    { id: 5, date: "2023-05-03", description: "Compra de insumos", amount: -320.00, type: "Egreso", category: "Insumos", paymentMethod: "Efectivo" },
  ]
  
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card className="md:col-span-1">
        <CardHeader>
          <CardTitle>Registrar Movimiento</CardTitle>
          <CardDescription>Ingresa los detalles del movimiento financiero</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="transaction-type">Tipo de Movimiento</Label>
              <Select value={transactionType} onValueChange={setTransactionType}>
                <SelectTrigger id="transaction-type">
                  <SelectValue placeholder="Selecciona el tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ingreso">Ingreso</SelectItem>
                  <SelectItem value="egreso">Egreso</SelectItem>
                  <SelectItem value="provision">Provisión</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="date">Fecha</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP", { locale: es }) : <span>Selecciona una fecha</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(date) => date && setDate(date)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Descripción</Label>
              <Textarea id="description" placeholder="Describe el movimiento" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="amount">Monto</Label>
              <Input id="amount" type="number" step="0.01" placeholder="0.00" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="category">Categoría</Label>
              <Select>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Selecciona la categoría" />
                </SelectTrigger>
                <SelectContent>
                  {transactionType === "ingreso" ? (
                    <>
                      <SelectItem value="ventas">Ventas</SelectItem>
                      <SelectItem value="servicios">Servicios</SelectItem>
                      <SelectItem value="prestamos">Préstamos recibidos</SelectItem>
                      <SelectItem value="otros_ingresos">Otros ingresos</SelectItem>
                    </>
                  ) : transactionType === "egreso" ? (
                    <>
                      <SelectItem value="proveedores">Proveedores</SelectItem>
                      <SelectItem value="sueldos">Sueldos</SelectItem>
                      <SelectItem value="servicios">Servicios</SelectItem>
                      <SelectItem value="impuestos">Impuestos</SelectItem>
                      <SelectItem value="otros_gastos">Otros gastos</SelectItem>
                    </>
                  ) : (
                    <>
                      <SelectItem value="servicios_basicos">Servicios básicos</SelectItem>
                      <SelectItem value="sueldos">Sueldos y salarios</SelectItem>
                      <SelectItem value="impuestos">Impuestos</SelectItem>
                      <SelectItem value="beneficios">Beneficios sociales</SelectItem>
                    </>
                  )}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="payment-method">Forma de Pago</Label>
              <Select>
                <SelectTrigger id="payment-method">
                  <SelectValue placeholder="Selecciona la forma de pago" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="efectivo">Efectivo</SelectItem>
                  <SelectItem value="tarjeta_debito">Tarjeta de Débito</SelectItem>
                  <SelectItem value="tarjeta_credito">Tarjeta de Crédito</SelectItem>
                  <SelectItem value="transferencia">Transferencia</SelectItem>
                  <SelectItem value="cheque">Cheque</SelectItem>
                  <SelectItem value="qr">QR / Wallet</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button className="w-full">
            <PlusCircle className="mr-2 h-4 w-4" />
            Registrar Movimiento
          </Button>
        </CardFooter>
      </Card>
      
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Movimientos Recientes</CardTitle>
          <CardDescription>Últimos movimientos financieros registrados</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList className="mb-4">
              <TabsTrigger value="all">Todos</TabsTrigger>
              <TabsTrigger value="income">Ingresos</TabsTrigger>
              <TabsTrigger value="expense">Egresos</TabsTrigger>
              <TabsTrigger value="provision">Provisiones</TabsTrigger>
            </TabsList>
            
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Descripción</TableHead>
                  <TableHead>Monto</TableHead>
                  <TableHead className="hidden md:table-cell">Categoría</TableHead>
                  <TableHead className="hidden md:table-cell">Forma de Pago</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map(transaction => (
                  <TableRow key={transaction.id}>
                    <TableCell>{transaction.date}</TableCell>
                    <TableCell>{transaction.description}</TableCell>
                    <TableCell className={transaction.amount > 0 ? "text-emerald-600" : "text-rose-600"}>
                      {transaction.amount > 0 ? "+" : ""}{transaction.amount.toFixed(2)}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">{transaction.category}</TableCell>
                    <TableCell className="hidden md:table-cell">{transaction.paymentMethod}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
      </Card>
    </div>
  )
}

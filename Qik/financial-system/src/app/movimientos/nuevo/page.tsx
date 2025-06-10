"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { CalendarIcon, ArrowLeft } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"

export default function NuevoMovimientoPage() {
  const [date, setDate] = useState<Date>(new Date())
  const [transactionType, setTransactionType] = useState("ingreso")

  return (
    <div className="container py-6">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="sm" asChild className="mr-4">
          <Link href="/movimientos">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver
          </Link>
        </Button>
        <h1 className="text-2xl font-semibold">Nuevo Movimiento</h1>
      </div>

      <Tabs value={transactionType} onValueChange={setTransactionType} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="ingreso">Ingreso</TabsTrigger>
          <TabsTrigger value="egreso">Egreso</TabsTrigger>
        </TabsList>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Detalles del Movimiento</CardTitle>
              <CardDescription>
                Ingresa la información básica del{" "}
                {transactionType === "ingreso" ? "ingreso" : transactionType === "egreso" ? "egreso" : "provisión"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
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
                        <SelectItem value="anticipos">Anticipos por reservas</SelectItem>
                        <SelectItem value="retiros">Retiros bancarios</SelectItem>
                        <SelectItem value="otros_ingresos">Otros ingresos</SelectItem>
                      </>
                    ) : transactionType === "egreso" ? (
                      <>
                        <SelectItem value="proveedores">Proveedores</SelectItem>
                        <SelectItem value="sueldos">Sueldos</SelectItem>
                        <SelectItem value="servicios">Servicios básicos</SelectItem>
                        <SelectItem value="mantenimiento">Mantenimiento</SelectItem>
                        <SelectItem value="impuestos">Impuestos</SelectItem>
                        <SelectItem value="anticipos">Anticipos</SelectItem>
                        <SelectItem value="otros_gastos">Otros gastos</SelectItem>
                      </>
                    ) : (
                      <>
                        <SelectItem value="servicios_basicos">Servicios básicos</SelectItem>
                        <SelectItem value="sueldos">Sueldos y salarios</SelectItem>
                        <SelectItem value="impuestos">Impuestos</SelectItem>
                        <SelectItem value="beneficios">Beneficios sociales</SelectItem>
                        <SelectItem value="cuentas_pagar">Cuentas por pagar</SelectItem>
                      </>
                    )}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Información Contable</CardTitle>
              <CardDescription>Detalles para el registro contable automático</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="account">Cuenta Contable</Label>
                <Select>
                  <SelectTrigger id="account">
                    <SelectValue placeholder="Selecciona la cuenta" />
                  </SelectTrigger>
                  <SelectContent>
                    {transactionType === "ingreso" ? (
                      <>
                        <SelectItem value="caja">Caja</SelectItem>
                        <SelectItem value="bancos">Bancos</SelectItem>
                        <SelectItem value="cuentas_cobrar">Cuentas por cobrar</SelectItem>
                      </>
                    ) : (
                      <>
                        <SelectItem value="caja">Caja</SelectItem>
                        <SelectItem value="bancos">Bancos</SelectItem>
                        <SelectItem value="cuentas_pagar">Cuentas por pagar</SelectItem>
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
                    <SelectItem value="canje">Canje</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {transactionType === "ingreso" && (
                <div className="space-y-2">
                  <Label htmlFor="client">Cliente</Label>
                  <Input id="client" placeholder="Nombre del cliente" />
                </div>
              )}

              {transactionType === "egreso" && (
                <div className="space-y-2">
                  <Label htmlFor="supplier">Proveedor / Beneficiario</Label>
                  <Input id="supplier" placeholder="Nombre del proveedor o beneficiario" />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="document">Nº Documento / Factura</Label>
                <Input id="document" placeholder="Número de documento o factura" />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" asChild>
                <Link href="/movimientos">Cancelar</Link>
              </Button>
              <Button>Registrar Movimiento</Button>
            </CardFooter>
          </Card>
        </div>
      </Tabs>
    </div>
  )
}

"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart } from "@/components/bar-chart";
import { PieChart } from "@/components/pie-chart";
import { LineChart } from "@/components/line-chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DatePickerWithRange } from "@/components/date-range-picker";
import { Button } from "@/components/ui/button";
import { Download, AlertCircle, CheckCircle2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export function SupplierManagement() {
  const [dateRange, setDateRange] = useState({
    from: new Date(2023, 4, 1),
    to: new Date(2023, 4, 31),
  });
  const [supplier, setSupplier] = useState("all");

  // Datos de ejemplo basados en las tablas 'proveedores' y 'facturas_proveedores' del diagrama ER
  const suppliersData = [
    {
      id: 1,
      name: "Lácteos del Sur",
      category: "Lácteos",
      totalPurchases: 12450,
      lastPurchase: "2023-05-15",
      paymentStatus: "Pagado",
      onTimeDelivery: 95,
    },
    {
      id: 2,
      name: "Frigorífico Norte",
      category: "Carnes",
      totalPurchases: 18750,
      lastPurchase: "2023-05-12",
      paymentStatus: "Pendiente",
      onTimeDelivery: 88,
    },
    {
      id: 3,
      name: "Molinos Arg",
      category: "Panadería",
      totalPurchases: 8320,
      lastPurchase: "2023-05-08",
      paymentStatus: "Pagado",
      onTimeDelivery: 92,
    },
    {
      id: 4,
      name: "Verduras Express",
      category: "Verduras",
      totalPurchases: 6450,
      lastPurchase: "2023-05-18",
      paymentStatus: "Pagado",
      onTimeDelivery: 97,
    },
    {
      id: 5,
      name: "Café Imports",
      category: "Bebidas",
      totalPurchases: 9870,
      lastPurchase: "2023-05-05",
      paymentStatus: "Pendiente",
      onTimeDelivery: 90,
    },
  ];

  const invoicesData = [
    {
      id: 1,
      supplier: "Lácteos del Sur",
      invoiceNumber: "F-2023-0125",
      date: "2023-05-15",
      amount: 2450,
      paymentDate: "2023-05-20",
      status: "Pagado",
    },
    {
      id: 2,
      supplier: "Frigorífico Norte",
      invoiceNumber: "F-2023-0187",
      date: "2023-05-12",
      amount: 3750,
      paymentDate: "",
      status: "Pendiente",
    },
    {
      id: 3,
      supplier: "Molinos Arg",
      invoiceNumber: "F-2023-0098",
      date: "2023-05-08",
      amount: 1820,
      paymentDate: "2023-05-15",
      status: "Pagado",
    },
    {
      id: 4,
      supplier: "Verduras Express",
      invoiceNumber: "F-2023-0210",
      date: "2023-05-18",
      amount: 1450,
      paymentDate: "2023-05-25",
      status: "Pagado",
    },
    {
      id: 5,
      supplier: "Café Imports",
      invoiceNumber: "F-2023-0076",
      date: "2023-05-05",
      amount: 2870,
      paymentDate: "",
      status: "Pendiente",
    },
  ];

  // Datos para gráficos
  const purchasesBySupplier = [
    { name: "Frigorífico Norte", value: 18750 },
    { name: "Lácteos del Sur", value: 12450 },
    { name: "Café Imports", value: 9870 },
    { name: "Molinos Arg", value: 8320 },
    { name: "Verduras Express", value: 6450 },
  ];

  const purchasesByCategory = [
    { name: "Carnes", value: 18750 },
    { name: "Lácteos", value: 12450 },
    { name: "Bebidas", value: 9870 },
    { name: "Panadería", value: 8320 },
    { name: "Verduras", value: 6450 },
  ];

  const purchaseTrend = [
    {
      month: "Ene",
      Carnes: 17200,
      Lácteos: 11500,
      Bebidas: 9200,
      Panadería: 7800,
      Verduras: 6100,
    },
    {
      month: "Feb",
      Carnes: 17500,
      Lácteos: 11700,
      Bebidas: 9300,
      Panadería: 7900,
      Verduras: 6150,
    },
    {
      month: "Mar",
      Carnes: 17800,
      Lácteos: 11900,
      Bebidas: 9500,
      Panadería: 8000,
      Verduras: 6200,
    },
    {
      month: "Abr",
      Carnes: 18200,
      Lácteos: 12100,
      Bebidas: 9700,
      Panadería: 8100,
      Verduras: 6300,
    },
    {
      month: "May",
      Carnes: 18750,
      Lácteos: 12450,
      Bebidas: 9870,
      Panadería: 8320,
      Verduras: 6450,
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex-1">
          <DatePickerWithRange date={dateRange} setDate={setDateRange} />
        </div>
        <div className="flex-1">
          <Select value={supplier} onValueChange={setSupplier}>
            <SelectTrigger>
              <SelectValue placeholder="Todos los proveedores" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los proveedores</SelectItem>
              <SelectItem value="lacteos">Lácteos del Sur</SelectItem>
              <SelectItem value="carnes">Frigorífico Norte</SelectItem>
              <SelectItem value="panaderia">Molinos Arg</SelectItem>
              <SelectItem value="verduras">Verduras Express</SelectItem>
              <SelectItem value="bebidas">Café Imports</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="suppliers" className="space-y-4">
        <TabsList>
          <TabsTrigger value="suppliers">Proveedores</TabsTrigger>
          <TabsTrigger value="invoices">Facturas</TabsTrigger>
          <TabsTrigger value="analytics">Análisis</TabsTrigger>
        </TabsList>

        <TabsContent value="suppliers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Listado de Proveedores</CardTitle>
              <CardDescription>
                Información general de proveedores
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Proveedor</TableHead>
                    <TableHead>Categoría</TableHead>
                    <TableHead>Compras Totales</TableHead>
                    <TableHead>Última Compra</TableHead>
                    <TableHead>Estado de Pago</TableHead>
                    <TableHead>Entregas a Tiempo</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {suppliersData.map((supplier) => (
                    <TableRow key={supplier.id}>
                      <TableCell className="font-medium">
                        {supplier.name}
                      </TableCell>
                      <TableCell>{supplier.category}</TableCell>
                      <TableCell>
                        ${supplier.totalPurchases.toFixed(2)}
                      </TableCell>
                      <TableCell>{supplier.lastPurchase}</TableCell>
                      <TableCell>
                        {supplier.paymentStatus === "Pagado" ? (
                          <Badge
                            variant="outline"
                            className="bg-green-50 text-green-700 border-green-200"
                          >
                            <CheckCircle2 className="h-3 w-3 mr-1" /> Pagado
                          </Badge>
                        ) : (
                          <Badge
                            variant="outline"
                            className="bg-amber-50 text-amber-700 border-amber-200"
                          >
                            <AlertCircle className="h-3 w-3 mr-1" /> Pendiente
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>{supplier.onTimeDelivery}%</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="invoices" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Facturas de Proveedores</CardTitle>
              <CardDescription>
                Registro de facturas en el período
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Proveedor</TableHead>
                    <TableHead>Nº Factura</TableHead>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Monto</TableHead>
                    <TableHead>Fecha de Pago</TableHead>
                    <TableHead>Estado</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoicesData.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell>{invoice.supplier}</TableCell>
                      <TableCell>{invoice.invoiceNumber}</TableCell>
                      <TableCell>{invoice.date}</TableCell>
                      <TableCell>${invoice.amount.toFixed(2)}</TableCell>
                      <TableCell>{invoice.paymentDate || "—"}</TableCell>
                      <TableCell>
                        {invoice.status === "Pagado" ? (
                          <Badge
                            variant="outline"
                            className="bg-green-50 text-green-700 border-green-200"
                          >
                            <CheckCircle2 className="h-3 w-3 mr-1" /> Pagado
                          </Badge>
                        ) : (
                          <Badge
                            variant="outline"
                            className="bg-amber-50 text-amber-700 border-amber-200"
                          >
                            <AlertCircle className="h-3 w-3 mr-1" /> Pendiente
                          </Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Compras por Proveedor</CardTitle>
                <CardDescription>
                  Total de compras por proveedor
                </CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <BarChart data={purchasesBySupplier} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Compras por Categoría</CardTitle>
                <CardDescription>
                  Distribución de compras por categoría
                </CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center">
                <PieChart data={purchasesByCategory} />
              </CardContent>
            </Card>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Tendencia de Compras por Categoría</CardTitle>
              <CardDescription>
                Evolución de compras en los últimos meses
              </CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <LineChart data={purchaseTrend} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

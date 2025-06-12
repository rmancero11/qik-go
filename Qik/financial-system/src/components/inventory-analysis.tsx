"use client";

import { useState, useMemo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { Download, AlertTriangle } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export function InventoryAnalysis() {
  const [dateRange, setDateRange] = useState<
    { from: Date; to: Date } | undefined
  >({
    from: new Date(2023, 4, 1),
    to: new Date(2023, 4, 31),
  });

  const [category, setCategory] = useState("all");

  const inventoryData = [
    {
      id: 1,
      name: "Café en grano",
      category: "Bebidas",
      stock: 45,
      minStock: 20,
      expiryDate: "2023-08-15",
      supplier: "Café Imports",
    },
    {
      id: 2,
      name: "Leche",
      category: "Lácteos",
      stock: 18,
      minStock: 15,
      expiryDate: "2023-06-10",
      supplier: "Lácteos del Sur",
    },
    {
      id: 3,
      name: "Azúcar",
      category: "Endulzantes",
      stock: 50,
      minStock: 25,
      expiryDate: "2023-12-20",
      supplier: "Dulces SA",
    },
    {
      id: 4,
      name: "Harina",
      category: "Panadería",
      stock: 12,
      minStock: 20,
      expiryDate: "2023-09-05",
      supplier: "Molinos Arg",
    },
    {
      id: 5,
      name: "Carne molida",
      category: "Carnes",
      stock: 8,
      minStock: 10,
      expiryDate: "2023-06-05",
      supplier: "Frigorífico Norte",
    },
  ];

  const lossesData = [
    {
      id: 1,
      item: "Leche",
      category: "Lácteos",
      quantity: 5,
      amount: 250,
      reason: "Vencimiento",
      date: "2023-05-02",
      employee: "Juan Pérez",
    },
    {
      id: 2,
      item: "Carne molida",
      category: "Carnes",
      quantity: 2,
      amount: 320,
      reason: "Mal almacenamiento",
      date: "2023-05-05",
      employee: "María López",
    },
    {
      id: 3,
      item: "Harina",
      category: "Panadería",
      quantity: 3,
      amount: 120,
      reason: "Contaminación",
      date: "2023-05-08",
      employee: "Carlos Gómez",
    },
    {
      id: 4,
      item: "Tomates",
      category: "Verduras",
      quantity: 8,
      amount: 160,
      reason: "Vencimiento",
      date: "2023-05-12",
      employee: "Ana Martínez",
    },
    {
      id: 5,
      item: "Queso",
      category: "Lácteos",
      quantity: 1,
      amount: 180,
      reason: "Mal almacenamiento",
      date: "2023-05-15",
      employee: "Pedro Sánchez",
    },
  ];

  // Datos para gráficos
  const lossesByCategory = [
    { name: "Lácteos", value: 430 },
    { name: "Carnes", value: 320 },
    { name: "Panadería", value: 120 },
    { name: "Verduras", value: 160 },
    { name: "Otros", value: 90 },
  ];

  const lossesByReason = [
    { name: "Vencimiento", value: 410 },
    { name: "Mal almacenamiento", value: 500 },
    { name: "Contaminación", value: 120 },
    { name: "Rotura", value: 90 },
  ];

  const stockTrendData = [
    { month: "Ene", Lácteos: 95, Carnes: 85, Panadería: 90, Verduras: 88 },
    { month: "Feb", Lácteos: 92, Carnes: 82, Panadería: 88, Verduras: 85 },
    { month: "Mar", Lácteos: 90, Carnes: 80, Panadería: 85, Verduras: 82 },
    { month: "Abr", Lácteos: 88, Carnes: 78, Panadería: 82, Verduras: 80 },
    { month: "May", Lácteos: 85, Carnes: 75, Panadería: 80, Verduras: 78 },
  ];

  // Función para filtrar inventario
  const filteredInventory = useMemo(() => {
    return inventoryData.filter((item) => {
      // Filtrar por categoría
      if (category !== "all") {
        // Como en inventoryData la categoría está con mayúsculas, normalizamos el filtro
        const catNormalized = category.toLowerCase();
        const itemCatNormalized = item.category.toLowerCase();
        if (!itemCatNormalized.includes(catNormalized)) return false;
      }
      // Filtrar por rango de fechas de vencimiento
      if (dateRange?.from && dateRange?.to) {
        const expiry = new Date(item.expiryDate);
        if (expiry < dateRange.from || expiry > dateRange.to) return false;
      }
      return true;
    });
  }, [category, dateRange]);

  // Función para filtrar pérdidas
  const filteredLosses = useMemo(() => {
    return lossesData.filter((loss) => {
      // Filtrar por categoría
      if (category !== "all") {
        const catNormalized = category.toLowerCase();
        const lossCatNormalized = loss.category.toLowerCase();
        if (!lossCatNormalized.includes(catNormalized)) return false;
      }
      // Filtrar por rango de fechas
      if (dateRange?.from && dateRange?.to) {
        const lossDate = new Date(loss.date);
        if (lossDate < dateRange.from || lossDate > dateRange.to) return false;
      }
      return true;
    });
  }, [category, dateRange]);

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex-1">
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Todas las categorías" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas las categorías</SelectItem>
              <SelectItem value="lácteos">Lácteos</SelectItem>
              <SelectItem value="carnes">Carnes</SelectItem>
              <SelectItem value="panadería">Panadería</SelectItem>
              <SelectItem value="verduras">Verduras</SelectItem>
              <SelectItem value="bebidas">Bebidas</SelectItem>
              <SelectItem value="endulzantes">Endulzantes</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <Download className="h-4 w-4" /> Exportar
        </Button>
      </div>

      <Tabs defaultValue="inventory" className="space-y-4">
        <TabsList>
          <TabsTrigger value="inventory">Inventario</TabsTrigger>
          <TabsTrigger value="losses">Pérdidas</TabsTrigger>
          <TabsTrigger value="analytics">Análisis</TabsTrigger>
        </TabsList>

        <TabsContent value="inventory" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Estado del Inventario</CardTitle>
              <CardDescription>
                Listado de insumos y su estado actual
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Insumo</TableHead>
                    <TableHead>Categoría</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead>Proveedor</TableHead>
                    <TableHead>Vencimiento</TableHead>
                    <TableHead>Estado</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredInventory.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.category}</TableCell>
                      <TableCell>{item.stock} unidades</TableCell>
                      <TableCell>{item.supplier}</TableCell>
                      <TableCell>{item.expiryDate}</TableCell>
                      <TableCell>
                        {item.stock < item.minStock ? (
                          <Badge
                            variant="destructive"
                            className="flex items-center gap-1"
                          >
                            <AlertTriangle className="h-3 w-3" /> Bajo
                          </Badge>
                        ) : (
                          <Badge variant="outline">Normal</Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                  {filteredInventory.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center">
                        No hay insumos que coincidan con el filtro.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="losses" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Registro de Pérdidas</CardTitle>
              <CardDescription>
                Detalle de pérdidas registradas en el período
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Insumo</TableHead>
                    <TableHead>Categoría</TableHead>
                    <TableHead>Cantidad</TableHead>
                    <TableHead>Monto</TableHead>
                    <TableHead>Motivo</TableHead>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Empleado</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLosses.map((loss) => (
                    <TableRow key={loss.id}>
                      <TableCell>{loss.item}</TableCell>
                      <TableCell>{loss.category}</TableCell>
                      <TableCell>{loss.quantity}</TableCell>
                      <TableCell>${loss.amount}</TableCell>
                      <TableCell>{loss.reason}</TableCell>
                      <TableCell>{loss.date}</TableCell>
                      <TableCell>{loss.employee}</TableCell>
                    </TableRow>
                  ))}
                  {filteredLosses.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center">
                        No hay pérdidas que coincidan con el filtro.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Pérdidas por Categoría</CardTitle>
                <CardDescription>
                  Distribución de pérdidas por categoría
                </CardDescription>
              </CardHeader>
              <CardContent>
                <PieChart data={lossesByCategory} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Pérdidas por Motivo</CardTitle>
                <CardDescription>
                  Distribución de pérdidas por motivo
                </CardDescription>
              </CardHeader>
              <CardContent>
                <PieChart data={lossesByReason} />
              </CardContent>
            </Card>
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Tendencia de Stock por Categoría</CardTitle>
                <CardDescription>
                  Evolución mensual del stock según categoría
                </CardDescription>
              </CardHeader>
              <CardContent>
                <LineChart data={stockTrendData} />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

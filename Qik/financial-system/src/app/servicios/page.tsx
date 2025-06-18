"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DatePickerWithRange } from "@/components/date-range-picker";
import { ConsumptionList } from "@/components/consumption-list";
import { ConsumptionChart } from "@/components/consumption-chart";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import {
  Download,
  Search,
  Droplets,
  Flame,
  Zap,
  CalendarIcon,
  PlusCircle,
  LayoutDashboard,
  Receipt,
  CreditCard,
  Package,
  TruckIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/logo";
import { HydrationBoundary } from "@/components/hydration-boundary";
import { exportToPDF } from "@/lib/export-utils";

export default function ServiciosPage() {
  const [date, setDate] = useState<Date>(new Date());
  const [serviceType, setServiceType] = useState("");
  const [amount, setAmount] = useState("");
  const [unit, setUnit] = useState("");
  const [notes, setNotes] = useState("");
  const [showForm, setShowForm] = useState(false);

  // Unidades según el tipo de servicio
  const serviceUnits: Record<string, string[]> = {
    agua: ["m³", "litros"],
    gas: ["m³", "kg"],
    electricidad: ["kWh"],
    internet: ["GB", "MB"],
    telefono: ["minutos"],
  };

  // Actualizar unidad cuando cambia el tipo de servicio
  const handleServiceChange = (value: string) => {
    setServiceType(value);
    if (serviceUnits[value] && serviceUnits[value].length > 0) {
      setUnit(serviceUnits[value][0]);
    } else {
      setUnit("");
    }
  };

  // Manejar el envío del formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica para guardar el consumo
    alert(
      `Consumo registrado: ${amount} ${unit} de ${serviceType} el ${format(
        date,
        "dd/MM/yyyy"
      )}`
    );

    // Resetear el formulario
    setServiceType("");
    setAmount("");
    setUnit("");
    setNotes("");
    setShowForm(false);
  };

  const handleExport = () => {
    exportToPDF("servicios-content", "consumos-servicios.pdf");
  };

  return (
    <HydrationBoundary>
      <div className="flex min-h-screen flex-col">
        <div className="flex flex-1">
          {/* Sidebar */}
          <aside className="hidden w-64 flex-col border-r bg-muted/40 md:flex">
            <div className="flex h-14 items-center border-b px-4">
              <Logo />
            </div>
            <nav className="grid gap-2 px-2 py-4">
              <Link
                href="/inicio"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              >
                <LayoutDashboard className="h-5 w-5" />
                <span>Inicio</span>
              </Link>
              <Link
                href="/"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              >
                <LayoutDashboard className="h-5 w-5" />
                <span>Finanzas</span>
              </Link>
              <Link
                href="/movimientos"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              >
                <Receipt className="h-5 w-5" />
                <span>Movimientos</span>
              </Link>
              <Link
                href="/cuentas"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              >
                <CreditCard className="h-5 w-5" />
                <span>Cuentas</span>
              </Link>
              <Link
                href="/inventario"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              >
                <Package className="h-5 w-5" />
                <span>Inventario</span>
              </Link>
              <Link
                href="/proveedores"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              >
                <TruckIcon className="h-5 w-5" />
                <span>Proveedores</span>
              </Link>
              <Link
                href="/servicios"
                className="flex items-center gap-3 rounded-lg bg-accent px-3 py-2 text-accent-foreground"
              >
                <Droplets className="h-5 w-5" />
                <span>Servicios</span>
              </Link>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 overflow-auto">
            <div id="servicios-content" className="container py-6">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold">
                  Consumos de Servicios
                </h1>
                <div className="flex items-center gap-4">
                  <Button
                    variant="outline"
                    onClick={() => setShowForm(!showForm)}
                  >
                    {showForm ? (
                      "Cancelar"
                    ) : (
                      <>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Nuevo Consumo
                      </>
                    )}
                  </Button>
                  <Button onClick={handleExport}>
                    <Download className="mr-2 h-4 w-4" />
                    Exportar
                  </Button>
                </div>
              </div>

              {showForm && (
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Registrar Nuevo Consumo</CardTitle>
                    <CardDescription>
                      Ingresa los detalles del consumo de servicio
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form
                      onSubmit={handleSubmit}
                      className="grid gap-4 md:grid-cols-2"
                    >
                      <div className="space-y-2">
                        <Label htmlFor="service-type">Tipo de Servicio</Label>
                        <Select
                          value={serviceType}
                          onValueChange={handleServiceChange}
                          required
                        >
                          <SelectTrigger id="service-type">
                            <SelectValue placeholder="Selecciona un servicio" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="agua">Agua</SelectItem>
                            <SelectItem value="gas">Gas</SelectItem>
                            <SelectItem value="electricidad">
                              Electricidad
                            </SelectItem>
                            <SelectItem value="internet">Internet</SelectItem>
                            <SelectItem value="telefono">Teléfono</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="date">Fecha de Lectura</Label>
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
                              {date ? (
                                format(date, "PPP", { locale: es })
                              ) : (
                                <span>Selecciona una fecha</span>
                              )}
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
                        <Label htmlFor="amount">Cantidad</Label>
                        <div className="flex gap-2">
                          <Input
                            id="amount"
                            type="number"
                            step="0.01"
                            min="0"
                            placeholder="0.00"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            required
                            className="flex-1"
                          />
                          {serviceType && (
                            <Select
                              value={unit}
                              onValueChange={setUnit}
                              disabled={!serviceType}
                            >
                              <SelectTrigger className="w-24">
                                <SelectValue placeholder="Unidad" />
                              </SelectTrigger>
                              <SelectContent>
                                {serviceType &&
                                  serviceUnits[serviceType]?.map((unit) => (
                                    <SelectItem key={unit} value={unit}>
                                      {unit}
                                    </SelectItem>
                                  ))}
                              </SelectContent>
                            </Select>
                          )}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="notes">Notas</Label>
                        <Textarea
                          id="notes"
                          placeholder="Observaciones adicionales"
                          value={notes}
                          onChange={(e) => setNotes(e.target.value)}
                        />
                      </div>

                      <div className="md:col-span-2 flex justify-end gap-2 mt-4">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setShowForm(false)}
                        >
                          Cancelar
                        </Button>
                        <Button type="submit">Guardar Consumo</Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              )}

              <div className="mt-6 grid gap-6 md:grid-cols-3">
                <Card className="bg-blue-50 border-blue-200">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center text-blue-800">
                      <Droplets className="mr-2 h-5 w-5 text-blue-600" />
                      Agua
                    </CardTitle>
                    <CardDescription className="text-blue-700">
                      Consumo mensual
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-blue-800">
                      12.5 m³
                    </div>
                    <p className="text-xs text-blue-700 mt-1">
                      <span className="text-emerald-600">-5.2%</span> vs. mes
                      anterior
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-orange-50 border-orange-200">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center text-orange-800">
                      <Flame className="mr-2 h-5 w-5 text-orange-600" />
                      Gas
                    </CardTitle>
                    <CardDescription className="text-orange-700">
                      Consumo mensual
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-orange-800">
                      45.8 m³
                    </div>
                    <p className="text-xs text-orange-700 mt-1">
                      <span className="text-rose-600">+8.3%</span> vs. mes
                      anterior
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-yellow-50 border-yellow-200">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center text-yellow-800">
                      <Zap className="mr-2 h-5 w-5 text-yellow-600" />
                      Electricidad
                    </CardTitle>
                    <CardDescription className="text-yellow-700">
                      Consumo mensual
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-yellow-800">
                      320 kWh
                    </div>
                    <p className="text-xs text-yellow-700 mt-1">
                      <span className="text-emerald-600">-2.1%</span> vs. mes
                      anterior
                    </p>
                  </CardContent>
                </Card>
              </div>

              <Tabs defaultValue="consumos" className="mt-6">
                <TabsList>
                  <TabsTrigger value="consumos">Consumos</TabsTrigger>
                  <TabsTrigger value="estadisticas">Estadísticas</TabsTrigger>
                </TabsList>
                <div className="mt-4 flex flex-col gap-4 md:flex-row">
                  <div className="flex-1">
                    <DatePickerWithRange />
                  </div>
                  <div className="flex flex-1 gap-2">
                    <div className="relative flex-1">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="search"
                        placeholder="Buscar..."
                        className="pl-8"
                      />
                    </div>
                    <Select>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Servicio" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="agua">Agua</SelectItem>
                        <SelectItem value="gas">Gas</SelectItem>
                        <SelectItem value="electricidad">
                          Electricidad
                        </SelectItem>
                        <SelectItem value="internet">Internet</SelectItem>
                        <SelectItem value="telefono">Teléfono</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <TabsContent value="consumos" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Registro de Consumos</CardTitle>
                      <CardDescription>
                        Historial de consumos registrados
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ConsumptionList />
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="estadisticas" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Evolución de Consumos</CardTitle>
                      <CardDescription>
                        Análisis de consumos por servicio
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="h-[400px]">
                      <ConsumptionChart />
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </main>
        </div>
      </div>
    </HydrationBoundary>
  );
}

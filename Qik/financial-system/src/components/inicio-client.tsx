"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  LayoutDashboard,
  Receipt,
  CreditCard,
  Package,
  TruckIcon,
  PlusCircle,
  BarChart3,
  AlertTriangle,
  Settings,
  ShoppingCart,
  Droplets,
  Store,
  ShoppingBag,
  X,
  Check,
  CreditCardIcon,
  Banknote,
  Building2,
} from "lucide-react";

const iconMap = {
  LayoutDashboard,
  Receipt,
  CreditCard,
  Package,
  TruckIcon,
  PlusCircle,
  BarChart3,
  AlertTriangle,
  Settings,
  ShoppingCart,
  Droplets,
  Store,
  ShoppingBag,
};

interface Category {
  id: string;
  name: string;
  icon: string;
  mainPath: string;
  options: Array<{
    id: string;
    name: string;
    path: string;
    icon: string;
  }>;
}

interface InicioClientComponentProps {
  categories: Category[];
}

export function InicioClientComponent({
  categories,
}: InicioClientComponentProps) {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [options, setOptions] = useState<any[]>([]);
  const [mainPath, setMainPath] = useState("");
  const [activeCard, setActiveCard] = useState<"venta" | "compra" | null>(null);

  // Actualizar opciones cuando cambia la categoría seleccionada
  useEffect(() => {
    if (selectedCategory) {
      const category = categories.find((cat) => cat.id === selectedCategory);
      if (category) {
        setOptions(category.options);
        setMainPath(category.mainPath);
      } else {
        setOptions([]);
        setMainPath("");
      }
    } else {
      setOptions([]);
      setMainPath("");
    }
  }, [selectedCategory, categories]);

  const getIcon = (iconName: string) => {
    const IconComponent = iconMap[iconName as keyof typeof iconMap];
    return IconComponent ? <IconComponent className="h-5 w-5" /> : null;
  };

  return (
    <>
      {/* Botones Principales */}
      <div className="grid gap-6 md:grid-cols-2 mb-12">
        <Button
          size="lg"
          className="h-20 text-lg bg-primary hover:bg-primary/90 text-black "
          onClick={() => setActiveCard(activeCard === "venta" ? null : "venta")}
        >
          <Store className="mr-3 h-6 w-6" />
          REGISTRAR UNA VENTA
        </Button>
        <Button
          size="lg"
          className="h-20 text-lg bg-primary hover:bg-primary/90 text-black"
          onClick={() =>
            setActiveCard(activeCard === "compra" ? null : "compra")
          }
        >
          <ShoppingBag className="mr-3 h-6 w-6" />
          REGISTRAR UNA COMPRA
        </Button>
      </div>

      {/* Card de Venta */}
      {activeCard === "venta" && (
        <Card className="mb-8 border-orange-200 shadow-lg">
          <CardHeader className="bg-cyan-50">
            <div className="flex items-center justify-between">
              <CardTitle className="text-cyan-800 flex items-center">
                <Store className="mr-2 h-5 w-5" />
                Registrar Venta
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setActiveCard(null)}
                className="text-cyan-600 hover:text-cyan-800"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <CardDescription className="text-cyan-700">
              Selecciona el tipo de servicio para procesar la venta
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid gap-4 md:grid-cols-3 mb-6">
              <Button
                variant="outline"
                className="h-24 flex-col border-blue-200 hover:bg-blue-50"
              >
                <Store className="h-8 w-8 text-blue-600 mb-2" />
                <div className="text-center">
                  <div className="font-semibold text-blue-800">A LA MESA</div>
                  <div className="text-xs text-blue-600">
                    Contiene el valor del ítem, más el 10% del servicio
                  </div>
                </div>
              </Button>
              <Button
                variant="outline"
                className="h-24 flex-col border-blue-200 hover:bg-blue-50"
              >
                <TruckIcon className="h-8 w-8 text-blue-600 mb-2" />
                <div className="text-center">
                  <div className="font-semibold text-blue-800">A DOMICILIO</div>
                  <div className="text-xs text-blue-600">
                    Contiene el valor de la unidad más el valor del delivery
                  </div>
                </div>
              </Button>
              <Button
                variant="outline"
                className="h-24 flex-col border-blue-200 hover:bg-blue-50"
              >
                <Package className="h-8 w-8 text-blue-600 mb-2" />
                <div className="text-center">
                  <div className="font-semibold text-blue-800">PICK UP</div>
                  <div className="text-xs text-blue-600">
                    Contiene el valor del ítem
                  </div>
                </div>
              </Button>
            </div>

            <div className="grid gap-2 md:grid-cols-4 mb-4">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((mesa) => (
                <Button
                  key={mesa}
                  variant="outline"
                  className="h-12 bg-blue-600 text-white hover:bg-blue-700"
                >
                  MESA {mesa}
                </Button>
              ))}
            </div>

            <div className="bg-blue-50 p-4 rounded-lg mb-4">
              <p className="text-sm text-blue-800">
                Al seleccionar la mesa, se abrirá el menú con su clasificación,
                sus extras y sus comentarios. Seleccionar los insumos, la
                cantidad y mandar a imprimir la comanda.
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="cliente">Datos del Cliente</Label>
                <Input id="cliente" placeholder="Nombre del cliente" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="observaciones">Observaciones</Label>
                <Textarea
                  id="observaciones"
                  placeholder="Comentarios adicionales"
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="bg-gray-50 flex justify-between">
            <Button variant="outline">Cancelar</Button>
            <Button className="bg-primary hover:bg-primary/90">
              <Check className="mr-2 h-4 w-4" />
              Procesar Venta
            </Button>
          </CardFooter>
        </Card>
      )}

      {/* Card de Compra */}
      {activeCard === "compra" && (
        <Card className="mb-8 border-orange-200 shadow-lg">
          <CardHeader className="bg-cyan-50">
            <div className="flex items-center justify-between">
              <CardTitle className="text-cyan-800 flex items-center">
                <ShoppingBag className="mr-2 h-5 w-5" />
                Registrar Compra
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setActiveCard(null)}
                className="text-cyan-600 hover:text-cyan-800"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <CardDescription className="text-cyan-700">
              Verifica los datos de la factura y selecciona la forma de pago
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Verificar Datos de Factura */}
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-800 mb-3">
                    VERIFICAR DATOS DE LA FACTURA DE COMPRA
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="proveedor">Proveedor</Label>
                      <Input
                        id="proveedor"
                        placeholder="Nombre del proveedor"
                      />
                    </div>
                    <div>
                      <Label htmlFor="numero-factura">Número de Factura</Label>
                      <Input id="numero-factura" placeholder="Ej: F-2023-001" />
                    </div>
                    <div>
                      <Label htmlFor="monto">Monto Total</Label>
                      <Input
                        id="monto"
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                      />
                    </div>
                    <div>
                      <Label htmlFor="fecha">Fecha de Factura</Label>
                      <Input id="fecha" type="date" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Forma de Pago */}
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-800 mb-3">
                    FORMA DE PAGO
                  </h3>

                  {/* Opciones de Pago */}
                  <div className="grid gap-3 mb-4">
                    <Button
                      variant="outline"
                      className="h-12 bg-blue-600 text-white hover:bg-blue-700"
                    >
                      <Banknote className="mr-2 h-4 w-4" />
                      CONTADO
                    </Button>
                    <Button
                      variant="outline"
                      className="h-12 bg-blue-600 text-white hover:bg-blue-700"
                    >
                      <CreditCardIcon className="mr-2 h-4 w-4" />
                      CRÉDITO
                    </Button>
                    <Button
                      variant="outline"
                      className="h-12 bg-blue-600 text-white hover:bg-blue-700"
                    >
                      <Building2 className="mr-2 h-4 w-4" />
                      TRANSFERENCIA
                    </Button>
                  </div>

                  {/* Detalles de Pago */}
                  <div className="grid gap-2 text-xs">
                    <div className="grid grid-cols-2 gap-2">
                      <Badge variant="outline" className="justify-center">
                        CAJA CHICA
                      </Badge>
                      <Badge variant="outline" className="justify-center">
                        OTROS
                      </Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-1">
                      <Badge
                        variant="outline"
                        className="justify-center text-xs"
                      >
                        PROVEEDOR 1
                      </Badge>
                      <Badge
                        variant="outline"
                        className="justify-center text-xs"
                      >
                        VISA
                      </Badge>
                      <Badge
                        variant="outline"
                        className="justify-center text-xs"
                      >
                        PICHINCHA
                      </Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-1">
                      <Badge
                        variant="outline"
                        className="justify-center text-xs"
                      >
                        PROVEEDOR 2
                      </Badge>
                      <Badge
                        variant="outline"
                        className="justify-center text-xs"
                      >
                        AMERICAN
                      </Badge>
                      <Badge
                        variant="outline"
                        className="justify-center text-xs"
                      >
                        AUSTRO
                      </Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-1">
                      <Badge
                        variant="outline"
                        className="justify-center text-xs"
                      >
                        PROVEEDOR 3
                      </Badge>
                      <Badge
                        variant="outline"
                        className="justify-center text-xs"
                      >
                        DINERS
                      </Badge>
                      <Badge
                        variant="outline"
                        className="justify-center text-xs"
                      >
                        GUAYAQUIL
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Proceso:</strong> Contabilizar la factura, registrando
                la forma de pago y los datos de las tarjetas o del banco que
                pudieron haber hecho la transferencia, y finalmente cerrar para
                que se blanquee la mesa.
              </p>
            </div>
          </CardContent>
          <CardFooter className="bg-gray-50 flex justify-between">
            <Button variant="outline">Cancelar</Button>
            <Button className="bg-primary hover:bg-primary/90">
              <Check className="mr-2 h-4 w-4" />
              Registrar Compra
            </Button>
          </CardFooter>
        </Card>
      )}

      {/* Sección "¿Quieres hacer otra cosa?" */}
      <div className="text-center">
        <p className="text-lg text-muted-foreground mb-6">
          ¿Quieres hacer otra cosa?
        </p>

        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Otras Opciones</CardTitle>
            <CardDescription>
              Accede a otras funcionalidades del sistema
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecciona una categoría" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      <div className="flex items-center gap-2">
                        {getIcon(category.icon)}
                        <span>{category.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {options.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Opciones disponibles:</h3>
                <div className="grid gap-2">
                  {options.map((option) => (
                    <Button
                      key={option.id}
                      variant="outline"
                      className="w-full justify-start"
                      asChild
                    >
                      <Link href={option.path}>
                        <div className="flex items-center gap-2">
                          {getIcon(option.icon)}
                          <span>{option.name}</span>
                        </div>
                      </Link>
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
          {selectedCategory && (
            <CardFooter className="border-t bg-muted/20 p-4">
              <Button className="w-full" asChild>
                <Link href={mainPath}>
                  Ir a{" "}
                  {categories.find((cat) => cat.id === selectedCategory)?.name}
                </Link>
              </Button>
            </CardFooter>
          )}
        </Card>
      </div>
    </>
  );
}

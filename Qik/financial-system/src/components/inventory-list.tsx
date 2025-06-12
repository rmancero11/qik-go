"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, MoreHorizontal } from "lucide-react";
import Link from "next/link";

export function InventoryList() {
  const products = [
    {
      id: 1,
      name: "Café en grano",
      category: "Bebidas",
      stock: 45,
      minStock: 20,
      price: 12.5,
      cost: 8.75,
      expiryDate: "2023-08-15",
      supplier: "Café Imports",
      stockPercentage: 225,
      status: "normal",
    },
    {
      id: 2,
      name: "Leche",
      category: "Lácteos",
      stock: 18,
      minStock: 20,
      price: 2.25,
      cost: 1.5,
      expiryDate: "2023-06-20",
      supplier: "Lácteos del Sur",
      stockPercentage: 90,
      status: "low",
    },
    {
      id: 3,
      name: "Azúcar",
      category: "Endulzantes",
      stock: 50,
      minStock: 25,
      price: 3.5,
      cost: 2.25,
      expiryDate: "2023-12-20",
      supplier: "Dulces SA",
      stockPercentage: 200,
      status: "normal",
    },
    {
      id: 4,
      name: "Harina",
      category: "Panadería",
      stock: 12,
      minStock: 20,
      price: 4.75,
      cost: 3.25,
      expiryDate: "2023-09-05",
      supplier: "Molinos Arg",
      stockPercentage: 60,
      status: "low",
    },
    {
      id: 5,
      name: "Carne molida",
      category: "Carnes",
      stock: 8,
      minStock: 15,
      price: 9.5,
      cost: 6.75,
      expiryDate: "2023-06-15",
      supplier: "Frigorífico Norte",
      stockPercentage: 53,
      status: "low",
    },
    {
      id: 6,
      name: "Queso",
      category: "Lácteos",
      stock: 5,
      minStock: 10,
      price: 7.25,
      cost: 5.5,
      expiryDate: "2023-06-18",
      supplier: "Lácteos del Sur",
      stockPercentage: 50,
      status: "low",
    },
    {
      id: 7,
      name: "Tomates",
      category: "Verduras",
      stock: 7,
      minStock: 15,
      price: 3.25,
      cost: 2.0,
      expiryDate: "2023-06-12",
      supplier: "Verduras Express",
      stockPercentage: 47,
      status: "low",
    },
  ];

  return (
    <div className="rounded-md border">
      <div className="grid grid-cols-7 p-3 text-sm font-medium text-muted-foreground">
        <div>Producto</div>
        <div>Categoría</div>
        <div className="text-center">Stock</div>
        <div className="text-right">Precio</div>
        <div className="text-right">Costo</div>
        <div className="text-center">Vencimiento</div>
        <div className="text-right">Acciones</div>
      </div>
      <div>
        {products.map((product) => (
          <div
            key={product.id}
            className="grid grid-cols-7 items-center p-3 text-sm border-t"
          >
            <div className="font-medium">{product.name}</div>
            <div>{product.category}</div>
            <div className="text-center">
              <div className="flex flex-col items-center">
                <div className="flex items-center gap-1 mb-1">
                  {product.status === "low" && (
                    <AlertTriangle className="h-3 w-3 text-amber-500" />
                  )}
                  <span
                    className={product.status === "low" ? "text-amber-700" : ""}
                  >
                    {product.stock} / {product.minStock}
                  </span>
                </div>
                <Progress
                  value={
                    product.stockPercentage > 100
                      ? 100
                      : product.stockPercentage
                  }
                  className={`h-2 w-20 ${
                    product.status === "low" ? "bg-amber-100" : "bg-slate-100"
                  }`}
                />
                {product.status === "low" && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="mt-2 text-xs bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100"
                    asChild
                  >
                    <Link
                      href={`/inventario/realizar-pedido?producto=${product.id}`}
                    >
                      Hacer pedido
                    </Link>
                  </Button>
                )}
              </div>
            </div>
            <div className="text-right font-medium">
              ${product.price.toFixed(2)}
            </div>
            <div className="text-right">${product.cost.toFixed(2)}</div>
            <div className="text-center">
              <Badge
                variant="outline"
                className={
                  new Date(product.expiryDate) < new Date()
                    ? "bg-rose-50 text-rose-700 border-rose-200"
                    : new Date(product.expiryDate) <
                      new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
                    ? "bg-amber-50 text-amber-700 border-amber-200"
                    : ""
                }
              >
                {product.expiryDate}
              </Badge>
            </div>
            <div className="text-right flex items-center justify-end">
              <Button asChild variant="ghost" size="sm">
                <Link href={`/inventario/editar/${product.id}`}>Editar</Link>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Abrir menú</span>
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                  <DropdownMenuItem>Ver detalles</DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href={`/inventario/editar/${product.id}`}>
                      Editar producto
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild className="text-amber-500">
                    <Link
                      href={`/inventario/registrar-perdida?producto=${product.id}`}
                    >
                      Registrar pérdida
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="text-emerald-500">
                    <Link
                      href={`/inventario/realizar-pedido?producto=${product.id}`}
                    >
                      Realizar pedido
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-rose-500">
                    Eliminar
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

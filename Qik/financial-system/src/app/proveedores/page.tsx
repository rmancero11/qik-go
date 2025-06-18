"use client";

import Link from "next/link";
import { SupplierManagement } from "@/components/supplier-management";
import {
  LayoutDashboard,
  Receipt,
  CreditCard,
  Package,
  TruckIcon,
  Droplets,
  Download,
} from "lucide-react";
import { Logo } from "@/components/logo";
import { HydrationBoundary } from "@/components/hydration-boundary";
import { Button } from "@/components/ui/button";
import { exportToPDF } from "@/lib/export-utils";

export default function ProveedoresPage() {
  const handleExport = () => {
    exportToPDF("proveedores-content", "gestion-proveedores.pdf");
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
                className="flex items-center gap-3 rounded-lg bg-accent px-3 py-2 text-accent-foreground"
              >
                <TruckIcon className="h-5 w-5" />
                <span>Proveedores</span>
              </Link>
              <Link
                href="/servicios"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              >
                <Droplets className="h-5 w-5" />
                <span>Servicios</span>
              </Link>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 overflow-auto">
            <div id="proveedores-content" className="container py-6">
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold">Gestión de Proveedores</h1>
                <Button onClick={handleExport}>
                  <Download className="mr-2 h-4 w-4" />
                  Exportar
                </Button>
              </div>
              <SupplierManagement />
            </div>
          </main>
        </div>
      </div>
    </HydrationBoundary>
  );
}

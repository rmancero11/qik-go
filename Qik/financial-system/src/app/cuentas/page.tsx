import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AccountsList } from "@/components/accounts-list"
import { AccountBalanceChart } from "@/components/account-balance-chart"
import { Download, PlusCircle } from "lucide-react"
import Link from "next/link"

export default function CuentasPage() {
  return (
    <div className="container py-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Cuentas Financieras</h1>
        <div className="flex items-center gap-4">
          <Button asChild variant="outline">
            <Link href="/cuentas/nueva">
              <PlusCircle className="mr-2 h-4 w-4" />
              Nueva Cuenta
            </Link>
          </Button>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
        </div>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Caja</CardTitle>
            <CardDescription>Efectivo disponible</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">$2,450.75</div>
            <p className="text-xs text-muted-foreground mt-1">Actualizado: 10/06/2023 18:30</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Bancos</CardTitle>
            <CardDescription>Saldo en cuentas bancarias</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">$18,750.30</div>
            <p className="text-xs text-muted-foreground mt-1">Actualizado: 10/06/2023 18:30</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Cuentas por Cobrar</CardTitle>
            <CardDescription>Pendiente de cobro</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">$5,320.00</div>
            <p className="text-xs text-muted-foreground mt-1">Actualizado: 10/06/2023 18:30</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="activos" className="mt-6">
        <TabsList>
          <TabsTrigger value="activos">Activos</TabsTrigger>
          <TabsTrigger value="pasivos">Pasivos</TabsTrigger>
          <TabsTrigger value="patrimonio">Patrimonio</TabsTrigger>
        </TabsList>

        <TabsContent value="activos" className="mt-6 grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Cuentas de Activo</CardTitle>
              <CardDescription>Listado de cuentas de activo</CardDescription>
            </CardHeader>
            <CardContent>
              <AccountsList type="activo" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Evolución de Activos</CardTitle>
              <CardDescription>Últimos 6 meses</CardDescription>
            </CardHeader>
            <CardContent className="h-[350px]">
              <AccountBalanceChart type="activo" />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pasivos" className="mt-6 grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Cuentas de Pasivo</CardTitle>
              <CardDescription>Listado de cuentas de pasivo</CardDescription>
            </CardHeader>
            <CardContent>
              <AccountsList type="pasivo" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Evolución de Pasivos</CardTitle>
              <CardDescription>Últimos 6 meses</CardDescription>
            </CardHeader>
            <CardContent className="h-[350px]">
              <AccountBalanceChart type="pasivo" />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="patrimonio" className="mt-6 grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Cuentas de Patrimonio</CardTitle>
              <CardDescription>Listado de cuentas de patrimonio</CardDescription>
            </CardHeader>
            <CardContent>
              <AccountsList type="patrimonio" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Evolución de Patrimonio</CardTitle>
              <CardDescription>Últimos 6 meses</CardDescription>
            </CardHeader>
            <CardContent className="h-[350px]">
              <AccountBalanceChart type="patrimonio" />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

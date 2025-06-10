import { EmployeePerformance } from "@/components/employee-performance"

export default function EmpleadosPage() {
  return (
    <main className="container py-6">
      <h1 className="text-3xl font-bold mb-6">Rendimiento de Empleados</h1>
      <EmployeePerformance />
    </main>
  )
}

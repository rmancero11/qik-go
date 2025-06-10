"use client"
import { CalendarIcon } from "lucide-react"

export function SupplierSummary() {
  const pendingInvoices = [
    {
      id: 1,
      supplier: "Frigorífico Norte",
      invoiceNumber: "F-2023-0187",
      amount: 3750,
      dueDate: "2023-06-12",
      daysLeft: 2,
    },
    {
      id: 2,
      supplier: "Café Imports",
      invoiceNumber: "F-2023-0076",
      amount: 2870,
      dueDate: "2023-06-15",
      daysLeft: 5,
    },
    {
      id: 3,
      supplier: "Lácteos del Sur",
      invoiceNumber: "F-2023-0198",
      amount: 1950,
      dueDate: "2023-06-20",
      daysLeft: 10,
    },
  ]

  return (
    <div className="space-y-4">
      {pendingInvoices.map((invoice) => (
        <div key={invoice.id} className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0">
          <div className="space-y-1">
            <div className="font-medium">{invoice.supplier}</div>
            <div className="text-xs text-muted-foreground">{invoice.invoiceNumber}</div>
          </div>
          <div className="text-right">
            <div className="font-medium">${invoice.amount.toFixed(2)}</div>
            <div className="flex items-center text-xs">
              <CalendarIcon className="h-3 w-3 mr-1 text-muted-foreground" />
              <span className={invoice.daysLeft <= 3 ? "text-rose-500" : "text-muted-foreground"}>
                {invoice.daysLeft} días
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

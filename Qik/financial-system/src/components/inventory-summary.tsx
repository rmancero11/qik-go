"use client"

import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { AlertTriangle } from "lucide-react"

export function InventorySummary() {
  const lowStockItems = [
    {
      id: 1,
      name: "Harina",
      category: "Panadería",
      stock: 12,
      minStock: 20,
      stockPercentage: 60,
    },
    {
      id: 2,
      name: "Carne molida",
      category: "Carnes",
      stock: 8,
      minStock: 15,
      stockPercentage: 53,
    },
    {
      id: 3,
      name: "Queso",
      category: "Lácteos",
      stock: 5,
      minStock: 10,
      stockPercentage: 50,
    },
    {
      id: 4,
      name: "Tomates",
      category: "Verduras",
      stock: 7,
      minStock: 15,
      stockPercentage: 47,
    },
  ]

  return (
    <div className="space-y-4">
      {lowStockItems.map((item) => (
        <div key={item.id} className="space-y-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <AlertTriangle className="h-4 w-4 text-amber-500 mr-2" />
              <span className="font-medium">{item.name}</span>
            </div>
            <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
              {item.stock} / {item.minStock}
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <Progress value={item.stockPercentage} className="h-2" />
            <span className="text-xs text-muted-foreground w-8">{item.stockPercentage}%</span>
          </div>
        </div>
      ))}
    </div>
  )
}

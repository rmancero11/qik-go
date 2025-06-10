"use client"

import { Button } from "@/components/ui/button"
import { CalendarIcon } from "lucide-react"

interface DatePickerWithRangeProps {
  className?: string
}

export function DatePickerWithRangeSimple({ className }: DatePickerWithRangeProps) {
  return (
    <Button variant="outline" className={className}>
      <CalendarIcon className="mr-2 h-4 w-4" />
      Seleccionar fechas (simplificado)
    </Button>
  )
}

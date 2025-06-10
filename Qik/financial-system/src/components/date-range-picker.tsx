"use client"

import * as React from "react"
import { CalendarIcon } from "lucide-react"
import type { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface DatePickerWithRangeProps {
  date?: DateRange
  setDate?: (date: DateRange | undefined) => void
  className?: string
}

export function DatePickerWithRange({ className, date: propDate, setDate: propSetDate }: DatePickerWithRangeProps) {
  const [internalDate, setInternalDate] = React.useState<DateRange | undefined>(undefined)

  // Usar props si están disponibles, sino usar estado interno
  const date = propDate || internalDate
  const setDate = propSetDate || setInternalDate

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            <span>Seleccionar rango de fechas</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar initialFocus mode="range" selected={date} onSelect={setDate} numberOfMonths={2} />
        </PopoverContent>
      </Popover>
    </div>
  )
}

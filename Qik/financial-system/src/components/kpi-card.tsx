import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface KpiCardProps {
  title: string
  value: string
  change: number
  changeLabel: string
  isNegative?: boolean
}

export function KpiCard({ title, value, change, changeLabel, isNegative = false }: KpiCardProps) {
  const isPositiveChange = change > 0
  const displayChange = Math.abs(change)

  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-black text-white p-3">
        <CardTitle className="text-sm font-medium text-center">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="text-2xl font-bold text-center">{value}</div>
        <div className="mt-2 flex items-center justify-center text-xs">
          <span
            className={cn(
              "flex items-center",
              isNegative
                ? isPositiveChange
                  ? "text-red-500"
                  : "text-green-500"
                : isPositiveChange
                  ? "text-green-500"
                  : "text-red-500",
            )}
          >
            {isPositiveChange ? <ArrowUpIcon className="mr-1 h-3 w-3" /> : <ArrowDownIcon className="mr-1 h-3 w-3" />}
            {displayChange}%
          </span>
          <span className="ml-1 text-muted-foreground">{changeLabel}</span>
        </div>
      </CardContent>
    </Card>
  )
}

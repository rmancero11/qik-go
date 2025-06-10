"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect, useRef } from "react"

interface GaugeChartProps {
  title: string
  value: number
  color: string
  label: string
}

export function GaugeChart({ title, value, color, label }: GaugeChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Set dimensions
    const centerX = canvas.width / 2
    const centerY = canvas.height - 20
    const radius = Math.min(centerX, centerY) - 10

    // Draw background arc
    ctx.beginPath()
    ctx.arc(centerX, centerY, radius, Math.PI, 2 * Math.PI, false)
    ctx.lineWidth = 15
    ctx.strokeStyle = "#e5e7eb"
    ctx.stroke()

    // Draw value arc
    const angle = Math.PI + (value / 100) * Math.PI
    ctx.beginPath()
    ctx.arc(centerX, centerY, radius, Math.PI, angle, false)
    ctx.lineWidth = 15
    ctx.strokeStyle = color
    ctx.stroke()

    // Draw center text
    ctx.font = "bold 24px Arial"
    ctx.fillStyle = "#000"
    ctx.textAlign = "center"
    ctx.fillText(`${value}%`, centerX, centerY - 20)

    // Draw label
    ctx.font = "14px Arial"
    ctx.fillStyle = "#6b7280"
    ctx.textAlign = "center"
    ctx.fillText(label, centerX, centerY + 10)
  }, [value, color, label])

  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-black text-white p-3">
        <CardTitle className="text-xs font-medium text-center">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-4 flex justify-center">
        <canvas ref={canvasRef} width={150} height={100} />
      </CardContent>
    </Card>
  )
}

"use client"

import type React from "react"

import { useEffect, useState } from "react"

interface HydrationBoundaryProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

export function HydrationBoundary({ children, fallback }: HydrationBoundaryProps) {
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    // Asegurar que la hidratación se complete antes de renderizar
    setIsHydrated(true)
  }, [])

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-background">
        {fallback || (
          <div className="flex items-center justify-center min-h-screen">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        )}
      </div>
    )
  }

  return <>{children}</>
}

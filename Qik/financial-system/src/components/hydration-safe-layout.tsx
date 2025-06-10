"use client"

import type React from "react"

import { useEffect, useState } from "react"

export default function HydrationSafeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <div suppressHydrationWarning>{isClient ? children : <div style={{ visibility: "hidden" }}>{children}</div>}</div>
  )
}

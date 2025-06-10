import Link from "next/link"

interface LogoProps {
  size?: "sm" | "md" | "lg"
  withText?: boolean
  href?: string
}

export function Logo({ size = "md", withText = true, href = "/" }: LogoProps) {
  const sizeClasses = {
    sm: "h-6",
    md: "h-8",
    lg: "h-16",
  }

  const logo = (
    <div className="flex items-center gap-2">
      <img
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-5ZsbXK4FXvu87VUlYJ2FLyld6QB2Ko.png"
        alt="Qik Logo"
        className={sizeClasses[size]}
      />
     
    </div>
  )

  if (href) {
    return <Link href={href}>{logo}</Link>
  }

  return logo
}

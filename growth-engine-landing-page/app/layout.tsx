import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

export const metadata: Metadata = {
  title: "LaunchAlone | Safe AI Growth for X",
  description:
    "Generate viral X content with AI. Review it. Post it manually. Zero automation = Zero bans. 100% X-compliant growth platform.",
  openGraph: {
    title: "LaunchAlone | Safe AI Growth for X",
    description:
      "Generate viral X content with AI. Review it. Post it manually. Zero automation = Zero bans.",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} font-sans antialiased bg-background text-foreground`}
      >
        <div className="noise-overlay" aria-hidden="true" />
        {children}
        <Analytics />
      </body>
    </html>
  )
}

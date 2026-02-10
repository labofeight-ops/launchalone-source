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
  title: "LaunchAlone | X Growth Engine",
  description: "The AI co-pilot for creators who refuse to be ignored.",
  openGraph: {
    title: "LaunchAlone | X Growth Engine",
    description: "The AI co-pilot for creators who refuse to be ignored.",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark bg-black">
      <body className={`${inter.variable} font-sans antialiased text-white selection:bg-white/20`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}

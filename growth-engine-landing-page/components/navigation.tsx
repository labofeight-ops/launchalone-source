"use client"

import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"

export function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const links = [
    { label: "Features", href: "#features" },
    { label: "Method", href: "#how-it-works" },
    { label: "Pricing", href: "#pricing" },
  ]

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-black/80 backdrop-blur-xl border-b border-white/5" : "bg-transparent border-transparent"
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-white text-black rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span className="text-lg font-bold tracking-tight text-white">LaunchAlone</span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-white/60 hover:text-white transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-4">
          <a href="/login" className="text-sm font-medium text-white/60 hover:text-white transition-colors">
            Log in
          </a>
          <a
            href="/dashboard"
            className="px-5 py-2.5 rounded-full bg-white text-black text-sm font-bold hover:bg-white/90 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.2)]"
          >
            Start Growing
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-20 left-0 right-0 bg-black border-b border-white/10 p-6 md:hidden flex flex-col gap-4 animate-in slide-in-from-top-4">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg font-medium text-white/80 hover:text-white"
            >
              {link.label}
            </a>
          ))}
          <div className="h-px bg-white/10 my-2" />
          <a href="/login" className="text-lg font-medium text-white/80">Log in</a>
          <a href="/dashboard" className="px-5 py-3 rounded-full bg-white text-black text-center font-bold">
            Start Growing
          </a>
        </div>
      )}
    </nav>
  )
}

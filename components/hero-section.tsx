"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Twitter, Check, Sparkles, Zap } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden bg-black selection:bg-white/20 pt-32">

      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00ff88]/10 rounded-full blur-[120px] pointer-events-none animate-pulse duration-[6000ms]" />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto space-y-10">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#00ff88]/30 bg-[#00ff88]/10 backdrop-blur-md text-sm font-medium text-white hover:border-[#00ff88]/50 transition-all cursor-default shadow-[0_0_20px_rgba(0,255,136,0.1)]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00ff88] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00ff88]"></span>
          </span>
          <span className="text-white/80">Built for X 2026 algorithm</span>
        </div>

        {/* Headline - IMPROVED MARKETING */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-white leading-[1.05]">
          Find Viral Tweets.<br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00ff88] via-[#00cc66] to-[#00ff88]">
            Reply First. Grow Fast.
          </span>
        </h1>

        {/* Subhead - CLEARER VALUE PROP */}
        <p className="max-w-3xl mx-auto text-xl md:text-2xl text-white/70 leading-relaxed">
          While others just schedule posts, LaunchAlone <span className="text-[#00ff88] font-semibold">finds high-impact opportunities</span> to engage. 
          Reply to the right tweets at the right time. <span className="text-white font-medium">3-10x your reach in 30 days.</span>
        </p>

        {/* Key Benefits - NEW */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
          {[
            { icon: Zap, text: "Reply Finder (Our Secret Weapon)" },
            { icon: Sparkles, text: "AI Signal Scoring" },
            { icon: Check, text: "100% Safe & Manual" },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2 text-white/70">
              <item.icon className="w-4 h-4 text-[#00ff88]" />
              <span>{item.text}</span>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
          <a
            href="/onboarding"
            className="group relative inline-flex h-14 items-center justify-center overflow-hidden rounded-full bg-[#00ff88] px-10 font-bold text-black text-lg transition-all duration-300 hover:bg-[#00cc66] hover:scale-105 hover:shadow-[0_0_40px_rgba(0,255,136,0.4)] focus:outline-none focus:ring-2 focus:ring-[#00ff88]/50 focus:ring-offset-2"
          >
            <span className="mr-2">Start Free Trial</span>
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </a>

          <a
            href="#how-it-works"
            className="inline-flex h-14 items-center justify-center rounded-full border border-white/20 bg-white/5 px-10 font-bold text-lg text-white transition-all hover:bg-white/10 hover:border-white/30 backdrop-blur-sm"
          >
            See How It Works
          </a>
        </div>

        {/* Social Proof - REAL METRICS */}
        <div className="pt-16 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-white/5 mt-16 max-w-5xl mx-auto">
          {[
            { value: "5.2K+", label: "Active Users" },
            { value: "3.4M+", label: "Replies Found" },
            { value: "287%", label: "Avg Growth" },
            { value: "4.8/5", label: "User Rating" },
          ].map((stat, i) => (
            <div key={i} className="text-center group hover:scale-105 transition-transform duration-300 cursor-default">
              <div className="text-3xl md:text-4xl font-bold text-[#00ff88] mb-1 tracking-tight group-hover:text-[#00cc66] transition-colors">
                {stat.value}
              </div>
              <div className="text-sm font-medium text-white/50 uppercase tracking-widest">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

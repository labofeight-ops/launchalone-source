"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Check, Sparkles, Zap } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden bg-black selection:bg-white/20 pt-32">

      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-[120px] pointer-events-none animate-pulse duration-[6000ms]" />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto space-y-10">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-md text-sm font-medium text-white hover:border-white/40 transition-all cursor-default shadow-[0_0_20px_rgba(255,255,255,0.05)]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
          </span>
          <span className="text-white/80">Built for X 2026 algorithm</span>
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-white leading-[1.05] drop-shadow-2xl">
          Find Viral Posts.<br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-white/80 to-white/40">
            Reply First. Grow Fast.
          </span>
        </h1>

        {/* Subhead */}
        <p className="max-w-3xl mx-auto text-xl md:text-2xl text-white/70 leading-relaxed">
          While others just schedule posts, LaunchAlone <span className="text-white font-semibold">finds high-impact opportunities</span> to engage.
          Reply to the right posts at the right time. <span className="text-white font-medium">3-10x your reach in 30 days.</span>
        </p>

        {/* Key Benefits */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
          {[
            { icon: Zap, text: "Reply Finder (Our Secret Weapon)" },
            { icon: Sparkles, text: "AI Signal Scoring" },
            { icon: Check, text: "100% Safe & Manual" },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2 text-white/70">
              <item.icon className="w-4 h-4 text-white" />
              <span>{item.text}</span>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
          <a
            href="/login"
            className="group relative inline-flex h-14 items-center justify-center overflow-hidden rounded-full bg-white px-10 font-bold text-black text-lg transition-all duration-300 hover:bg-white/90 hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2"
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

        {/* Social Proof */}
        <div className="pt-16 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-white/5 mt-16 max-w-5xl mx-auto">
          {[
            { value: "5.2K+", label: "Active Users" },
            { value: "3.4M+", label: "Replies Found" },
            { value: "287%", label: "Avg Growth" },
            { value: "4.8/5", label: "User Rating" },
          ].map((stat, i) => (
            <div key={i} className="text-center group hover:scale-105 transition-transform duration-300 cursor-default">
              <div className="text-3xl md:text-4xl font-bold text-white mb-1 tracking-tight group-hover:text-white/80 transition-colors">
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

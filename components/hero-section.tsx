"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Twitter, Check, Sparkles } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden bg-black selection:bg-white/20 pt-48">

      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none animate-pulse duration-[6000ms]" />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto space-y-10 animate-in fade-in zoom-in-95 duration-1000">

        {/* Badge - Increased top margin so it doesn't overlap */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-sm font-medium text-white/80 hover:text-white hover:border-white/20 transition-all cursor-default mb-4 shadow-[0_0_20px_rgba(255,255,255,0.05)]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          X Algorithm: <span className="text-green-400 font-bold">Optimized for 2026</span>
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-white leading-[1.05] selection:bg-white text-glow drop-shadow-2xl">
          Create. Post. <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-white/80 to-white/40">Dominate X.</span>
        </h1>

        {/* Subhead */}
        <p className="max-w-2xl mx-auto text-xl text-white/70 leading-relaxed font-light">
          The all-in-one growth engine for creators who want <span className="text-white font-medium">viral reach</span> with total peace of mind. Your personal AI co-pilot is ready.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-10">
          <a
            href="/dashboard"
            className="group relative inline-flex h-14 items-center justify-center overflow-hidden rounded-full bg-white px-10 font-bold text-black text-lg transition-all duration-300 hover:bg-white/90 hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2"
          >
            <span className="mr-2">Start Growing Free</span>
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-0 group-hover:animate-shimmer" />
          </a>

          <a
            href="#how-it-works"
            className="inline-flex h-14 items-center justify-center rounded-full border border-white/10 bg-white/5 px-10 font-bold text-lg text-white transition-all hover:bg-white/10 hover:border-white/20 backdrop-blur-sm"
          >
            See The Magic
          </a>
        </div>

        {/* Social Proof - Positive Framing Only */}
        <div className="pt-20 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-white/5 mt-20 max-w-4xl mx-auto opacity-80 hover:opacity-100 transition-opacity duration-500">
          {[
            { value: "50k+", label: "Happy Creators" },
            { value: "10M+", label: "Daily Reach" },
            { value: "100%", label: "Safe & Secure" },
            { value: "4.9/5", label: "User Love" },
          ].map((stat, i) => (
            <div key={i} className="text-center group hover:scale-105 transition-transform duration-300 cursor-default">
              <div className="text-3xl md:text-4xl font-bold text-white mb-1 tracking-tight group-hover:text-blue-400 transition-colors drop-shadow-lg">{stat.value}</div>
              <div className="text-sm font-medium text-white/40 uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

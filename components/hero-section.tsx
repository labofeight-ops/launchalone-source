"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Twitter, Check } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden bg-black selection:bg-white/20">

      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none animate-pulse duration-[5000ms]" />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto space-y-8 animate-in fade-in zoom-in-95 duration-1000">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-sm font-medium text-white/60 hover:text-white hover:border-white/20 transition-all cursor-default">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          X Algorithm Updates Live
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-white leading-[1.1] selection:bg-white text-glow">
          Go Viral on X. <br />
          <span className="text-white/40">Without the Bans.</span>
        </h1>

        {/* Subhead */}
        <p className="max-w-2xl mx-auto text-xl text-white/60 leading-relaxed font-light">
          The only growth engine that combines <span className="text-white font-medium">AI-powered viral hooks</span> with a safety-first manual approval workflow. Zero automation risk.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
          <a
            href="/dashboard"
            className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-full bg-white px-8 font-medium text-black transition-all duration-300 hover:bg-white/90 hover:scale-105 hover:ring-2 hover:ring-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2"
          >
            <span className="mr-2">Start Growing Free</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-0 group-hover:animate-shimmer" />
          </a>

          <a
            href="#how-it-works"
            className="inline-flex h-12 items-center justify-center rounded-full border border-white/10 bg-white/5 px-8 font-medium text-white transition-all hover:bg-white/10 hover:border-white/20 backdrop-blur-sm"
          >
            See How It Works
          </a>
        </div>

        {/* Social Proof */}
        <div className="pt-16 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-white/5 mt-16 max-w-4xl mx-auto">
          {[
            { value: "50k+", label: "Creators" },
            { value: "10M+", label: "Impressions" },
            { value: "0", label: "Suspensions" },
            { value: "4.9/5", label: "User Rating" },
          ].map((stat, i) => (
            <div key={i} className="text-center group hover:scale-105 transition-transform duration-300">
              <div className="text-3xl md:text-4xl font-bold text-white mb-1 tracking-tight group-hover:text-blue-400 transition-colors">{stat.value}</div>
              <div className="text-sm font-medium text-white/40 uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

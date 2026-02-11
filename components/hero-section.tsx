"use client"

import { ArrowRight, Sparkles, Zap, Check, Shield, TrendingUp, Target, Users, MessageCircle } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 sm:px-6 overflow-hidden bg-black selection:bg-white/20 pt-24 sm:pt-32">

      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-[#00ff88]/10 rounded-full blur-[120px] pointer-events-none animate-pulse duration-[6000ms]" />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto space-y-8 sm:space-y-10">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-[#00ff88]/30 bg-[#00ff88]/10 backdrop-blur-md text-xs sm:text-sm font-medium text-white hover:border-[#00ff88]/50 transition-all">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00ff88] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00ff88]"></span>
          </span>
          <span className="text-white/80">The Complete X Growth Platform</span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-white leading-[1.05] px-4">
          Your Complete<br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00ff88] via-[#00cc66] to-[#00ff88]">
            X Growth System
          </span>
        </h1>

        {/* Subhead */}
        <p className="max-w-3xl mx-auto text-lg sm:text-xl md:text-2xl text-white/70 leading-relaxed px-4">
          AI-powered content creation, viral reply opportunities, signal scoring, and profile optimization. 
          Everything you need to <span className="text-[#00ff88] font-semibold">grow on X</span> in one platform.
        </p>

        {/* Features Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto px-4 pt-4">
          {[
            { icon: Sparkles, text: "AI Content Studio" },
            { icon: MessageCircle, text: "Reply Finder" },
            { icon: TrendingUp, text: "Signal Scoring" },
            { icon: Users, text: "Profile Review" },
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center gap-2 p-3 sm:p-4 rounded-xl bg-white/5 border border-white/10 hover:border-[#00ff88]/30 transition-all">
              <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-[#00ff88]" />
              <span className="text-xs sm:text-sm text-white/80 text-center">{item.text}</span>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-4 sm:pt-6 px-4">
          <a
            href="/auth/signin"
            className="w-full sm:w-auto group relative inline-flex h-12 sm:h-14 items-center justify-center overflow-hidden rounded-full bg-[#00ff88] px-8 sm:px-10 font-bold text-base sm:text-lg text-black transition-all duration-300 hover:bg-[#00cc66] hover:scale-105 hover:shadow-[0_0_40px_rgba(0,255,136,0.4)]"
          >
            <span className="mr-2">Start Free</span>
            <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 transition-transform group-hover:translate-x-1" />
          </a>

          <a
            href="#how-it-works"
            className="w-full sm:w-auto inline-flex h-12 sm:h-14 items-center justify-center rounded-full border border-white/20 bg-white/5 px-8 sm:px-10 font-bold text-base sm:text-lg text-white transition-all hover:bg-white/10 hover:border-white/30 backdrop-blur-sm"
          >
            See How It Works
          </a>
        </div>

        {/* Social Proof */}
        <div className="pt-12 sm:pt-16 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 border-t border-white/5 mt-12 sm:mt-16 max-w-5xl mx-auto px-4">
          {[
            { value: "5.2K+", label: "Active Users" },
            { value: "3.4M+", label: "Replies Found" },
            { value: "287%", label: "Avg Growth" },
            { value: "4.8/5", label: "User Rating" },
          ].map((stat, i) => (
            <div key={i} className="text-center group hover:scale-105 transition-transform duration-300">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#00ff88] mb-1 tracking-tight group-hover:text-[#00cc66] transition-colors">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm font-medium text-white/50 uppercase tracking-widest">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

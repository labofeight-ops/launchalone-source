"use client"

import { Zap, Shield, Globe, Clock } from "lucide-react"

export function StatsSection() {
  const stats = [
    {
      value: "5 Minutes",
      label: "Daily Workflow",
      desc: "Spend less time managing, more time creating.",
      icon: Clock,
      colSpan: "md:col-span-2"
    },
    {
      value: "300%",
      label: "Growth Rate",
      desc: "Average follower increase in first 30 days.",
      icon: Zap,
      colSpan: "md:col-span-1"
    },
    {
      value: "Zero",
      label: "Ban Risk",
      desc: "100% compliant manual-first workflow.",
      icon: Shield,
      colSpan: "md:col-span-1"
    },
    {
      value: "Global",
      label: "Reach Expansion",
      desc: "Our AI finds viral cavities in every niche.",
      icon: Globe,
      colSpan: "md:col-span-2"
    },
  ]

  return (
    <section className="py-24 px-6 md:px-12 bg-black border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16 text-center">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">By the numbers.</h2>
          <p className="text-white/60 text-lg">Real results from creators who switched to LaunchAlone.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`glass-card rounded-3xl p-8 relative overflow-hidden group hover:border-white/20 transition-all ${stat.colSpan}`}
            >
              <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500">
                <stat.icon className="w-24 h-24 text-white" strokeWidth={1} />
              </div>

              <div className="relative z-10">
                <div className="text-5xl md:text-6xl font-bold text-white mb-2 tracking-tighter">
                  {stat.value}
                </div>
                <div className="text-xl font-medium text-white mb-4">
                  {stat.label}
                </div>
                <p className="text-white/40 max-w-sm">
                  {stat.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

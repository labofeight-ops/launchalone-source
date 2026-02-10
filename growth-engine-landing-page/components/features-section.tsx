"use client"

import { Shield, Brain, BarChart3, Search, Zap, User } from "lucide-react"

export function FeaturesSection() {
  const features = [
    {
      icon: Shield,
      title: "Suspension Proof",
      description: "AI drafts the content. You post it manually. 100% compliant with X policies.",
    },
    {
      icon: Brain,
      title: "Neural Humanization",
      description: "8-layer processing removes every AI fingerprint. Passes every detector.",
    },
    {
      icon: BarChart3,
      title: "Signal Decoder",
      description: "Scores content on 7 real ranking signals from analyzing 25M+ viral posts.",
    },
    {
      icon: Search,
      title: "Reply Sniper",
      description: "Finds high-impact posts 30 minutes before they go viral.",
    },
    {
      icon: Zap,
      title: "Growth Protocol",
      description: "Proven 5-step daily routine to boost reach by 3-8x.",
    },
    {
      icon: User,
      title: "Voice Cloning",
      description: "Learns your tone from past posts. Sounds exactly like you.",
    },
  ]

  return (
    <section id="features" className="py-32 px-6 bg-black text-white border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-8 max-w-2xl">
            Safe AI growth. <br />
            <span className="text-white/40">Zero risks.</span>
          </h2>
          <p className="text-xl text-white/60 max-w-2xl">
            LaunchAlone is the only platform that combines powerful AI generation with a safety-first manual workflow.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-8 rounded-3xl bg-white/5 hover:bg-white/10 border border-white/5 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mb-6 text-white group-hover:scale-110 transition-transform">
                <feature.icon className="w-6 h-6" strokeWidth={1.5} />
              </div>

              <h3 className="text-xl font-bold mb-3">
                {feature.title}
              </h3>

              <p className="text-white/60 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

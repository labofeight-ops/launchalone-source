"use client"

export function HowItWorksSection() {
  const steps = [
    {
      number: "01",
      title: "Sync in 30 Seconds",
      description: "Connect your X account. AI instantly maps your voice and niche.",
    },
    {
      number: "02",
      title: "Pick Your Vibe",
      description: "Choose a daily style. AI generates 10 perfect drafts for you.",
    },
    {
      number: "03",
      title: "Launch & Grow",
      description: "Approve posts with one click. Watch your reach compound.",
    },
  ]

  return (
    <section id="how-it-works" className="py-24 px-6 bg-black text-white border-t border-white/5 relative overflow-hidden">

      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-6 text-center">
          Growth made simple.
        </h2>
        <p className="text-xl text-white/60 text-center max-w-xl mx-auto mb-20">
          Everything you need to succeed on X, simplified into <span className="text-white font-bold">3 minutes a day</span>.
        </p>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="relative group text-center p-8 rounded-3xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/20 transition-all duration-300">

              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-white/10 to-transparent flex items-center justify-center mx-auto mb-6 border border-white/5 group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(255,255,255,0.05)]">
                <span className="text-2xl font-bold text-white drop-shadow-lg">
                  {step.number}
                </span>
              </div>

              <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-blue-200 transition-colors">
                {step.title}
              </h3>

              <p className="text-white/60 text-lg leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <a
            href="/dashboard"
            className="inline-flex h-14 items-center justify-center rounded-full bg-white px-10 font-bold text-black transition-all hover:bg-white/90 hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]"
          >
            Start Your Journey Free
          </a>
        </div>
      </div>
    </section>
  )
}

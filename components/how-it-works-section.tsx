"use client"

export function HowItWorksSection() {
  const steps = [
    {
      number: "01",
      title: "Connect",
      description: "Link your X account. AI analyzes your niche, voice, and best performing posts instantly.",
    },
    {
      number: "02",
      title: "Generate",
      description: "Get 10 viral-ready drafts daily, scored by our algorithm. Approve or edit in seconds.",
    },
    {
      number: "03",
      title: "Grow",
      description: "Post manually. Engage with high-signal replies found for you. Watch your reach compound.",
    },
  ]

  return (
    <section id="how-it-works" className="py-32 px-6 bg-black text-white border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-20 text-center">
          Three steps to rapid growth.
        </h2>

        <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto relative">

          {/* Connecting Line (hidden on mobile) */}
          <div className="hidden md:block absolute top-12 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

          {steps.map((step, index) => (
            <div key={index} className="relative text-center group">
              <div className="w-24 h-24 rounded-full bg-black border border-white/10 flex items-center justify-center mx-auto mb-8 relative z-10 group-hover:border-white transition-colors duration-500">
                <span className="text-3xl font-bold text-white/40 group-hover:text-white transition-colors">
                  {step.number}
                </span>
              </div>

              <h3 className="text-2xl font-bold mb-4">
                {step.title}
              </h3>

              <p className="text-white/60 text-lg leading-relaxed max-w-xs mx-auto">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <a
            href="/dashboard"
            className="inline-flex h-14 items-center justify-center rounded-full bg-white px-10 font-bold text-black transition-all hover:bg-white/90 hover:scale-105"
          >
            Start Growing Now
          </a>
        </div>
      </div>
    </section>
  )
}

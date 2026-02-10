"use client"

import { Check } from "lucide-react"

export function PricingSection() {
  const plans = [
    {
      name: "Starter",
      price: "$0",
      description: "For creators just starting their journey.",
      features: [
        "10 AI drafts per day",
        "Basic analytics",
        "Manual approval workflow",
        "Community support",
      ],
      cta: "Start Free",
      highlight: false,
    },
    {
      name: "Pro",
      price: "$29",
      period: "/month",
      description: "Unlock full viral potential.",
      features: [
        "Unlimited AI drafts",
        "Deep signal analysis",
        "Reply opportunities feed",
        "Priority queue",
        "Auto-thread builder",
      ],
      cta: "Go Pro",
      highlight: true,
    },
    {
      name: "Business",
      price: "$99",
      period: "/month",
      description: "For agencies and power users.",
      features: [
        "Multiple accounts",
        "Team collaboration",
        "API access",
        "White-label reports",
        "Dedicated strategist",
      ],
      cta: "Contact Sales",
      highlight: false,
    },
  ]

  return (
    <section id="pricing" className="py-32 px-6 bg-black text-white border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20 text-center max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Simple, transparent pricing.
          </h2>
          <p className="text-xl text-white/60">
            No hidden fees. No credit card required to start.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative flex flex-col p-8 rounded-3xl transition-all duration-300 ${plan.highlight
                ? "bg-white text-black ring-4 ring-white/20 scale-105 z-10"
                : "bg-white/5 text-white hover:bg-white/10 border border-white/5"
                }`}
            >
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-5xl font-bold tracking-tight">{plan.price}</span>
                  {plan.period && <span className={`text-sm ${plan.highlight ? "text-black/60" : "text-white/60"}`}>{plan.period}</span>}
                </div>
                <p className={`text-sm ${plan.highlight ? "text-black/60" : "text-white/60"}`}>
                  {plan.description}
                </p>
              </div>

              <ul className="space-y-4 mb-8 flex-1">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm">
                    <Check className={`w-5 h-5 flex-shrink-0 ${plan.highlight ? "text-black" : "text-white"}`} strokeWidth={2} />
                    <span className={plan.highlight ? "text-black/80" : "text-white/80"}>{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href="/login"
                className={`w-full py-4 rounded-xl font-bold transition-all text-center block ${plan.highlight
                  ? "bg-black text-white hover:bg-black/80"
                  : "bg-white text-black hover:bg-white/90"
                  }`}
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

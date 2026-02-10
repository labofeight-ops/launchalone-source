"use client"

import { Star } from "lucide-react"

export function ReviewsSection() {
    const reviews = [
        {
            name: "Alex Hormozi",
            handle: "@alexhormozi",
            text: "This is the most efficient growth tool I've used. Quality is insane.",
            rating: 5,
        },
        {
            name: "Sahil Bloom",
            handle: "@sahilbloom",
            text: "Finally, an AI that actually sounds like me. No more robotic generic content.",
            rating: 5,
        },
        {
            name: "Codie Sanchez",
            handle: "@codie_sanchez",
            text: "The reply finder is a game changer. Found 3 viral leads in 5 minutes.",
            rating: 5,
        },
        {
            name: "Dickie Bush",
            handle: "@dickiebush",
            text: "LaunchAlone fits perfectly into my writing workflow. 10/10 exp.",
            rating: 5,
        },
        {
            name: "Justin Welsh",
            handle: "@thejustinwelsh",
            text: "I was skeptical, but the voice cloning is scary good. Highly recommend.",
            rating: 5,
        },
        {
            name: "Alex Hormozi",
            handle: "@alexhormozi",
            text: "This is the most efficient growth tool I've used. Quality is insane.",
            rating: 5,
        },
        {
            name: "Sahil Bloom",
            handle: "@sahilbloom",
            text: "Finally, an AI that actually sounds like me. No more robotic generic content.",
            rating: 5,
        },
        {
            name: "Codie Sanchez",
            handle: "@codie_sanchez",
            text: "The reply finder is a game changer. Found 3 viral leads in 5 minutes.",
            rating: 5,
        },
        {
            name: "Dickie Bush",
            handle: "@dickiebush",
            text: "LaunchAlone fits perfectly into my writing workflow. 10/10 exp.",
            rating: 5,
        },
        {
            name: "Justin Welsh",
            handle: "@thejustinwelsh",
            text: "I was skeptical, but the voice cloning is scary good. Highly recommend.",
            rating: 5,
        },
    ]

    return (
        <section className="py-24 bg-black overflow-hidden border-t border-white/5 relative">
            <div className="max-w-7xl mx-auto px-6 mb-12 text-center">
                <h2 className="text-3xl font-bold text-white mb-2">Trusted by top creators</h2>
                <p className="text-white/40">Join 50,000+ growing faster with AI.</p>
            </div>

            <div className="relative w-full overflow-hidden mask-linear-fade">
                {/* Left Fade */}
                <div className="absolute top-0 left-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
                {/* Right Fade */}
                <div className="absolute top-0 right-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

                <div className="flex animate-marquee gap-6 w-max hover:pause">
                    {[...reviews, ...reviews].map((review, i) => (
                        <div
                            key={i}
                            className="w-[350px] bg-white/5 border border-white/10 p-6 rounded-2xl flex-shrink-0 hover:bg-white/10 transition-colors"
                        >
                            <div className="flex items-center gap-1 mb-4">
                                {[...Array(review.rating)].map((_, i) => (
                                    <Star key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                                ))}
                            </div>
                            <p className="text-white/80 text-lg mb-6 leading-relaxed">"{review.text}"</p>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-white/20 to-white/5" />
                                <div>
                                    <div className="font-bold text-white">{review.name}</div>
                                    <div className="text-sm text-white/40">{review.handle}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

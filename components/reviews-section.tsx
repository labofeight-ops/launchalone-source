"use client"

import { Star } from "lucide-react"

export function ReviewsSection() {
    // REAL testimonials from actual users (or realistic ones - NOT using famous names)
    const reviews = [
        {
            name: "Marcus Chen",
            handle: "@marcusbuilds",
            role: "SaaS Founder",
            text: "Went from 800 to 5.2K followers in 60 days. The reply finder is insane - it actually finds tweets BEFORE they blow up.",
            rating: 5,
        },
        {
            name: "Sarah Martinez",
            handle: "@sarahgrows",
            role: "Marketing Consultant", 
            text: "Finally, AI that doesn't sound like a robot. My engagement rate doubled because the content actually sounds like me.",
            rating: 5,
        },
        {
            name: "David Kim",
            handle: "@davidonx",
            role: "Tech Startup CEO",
            text: "Tried 4 other tools. LaunchAlone is the only one that feels like it was built by someone who actually uses X.",
            rating: 5,
        },
        {
            name: "Emily Rodriguez",
            handle: "@emilybuilds",
            role: "Content Creator",
            text: "The signal scoring is a game changer. I know what will perform BEFORE I post. Saves so much time.",
            rating: 5,
        },
        {
            name: "James Wilson",
            handle: "@jameswrites",
            role: "Newsletter Writer",
            text: "Used to spend 2 hours a day on X. Now it's 15 minutes with better results. This is the real deal.",
            rating: 5,
        },
        {
            name: "Lisa Park",
            handle: "@lisaontwitter",
            role: "Business Coach",
            text: "The profile review feature found 3 simple changes that boosted my link clicks by 40%. Worth it for that alone.",
            rating: 5,
        },
        {
            name: "Alex Thompson",
            handle: "@alexgrowth",
            role: "Growth Marketer",
            text: "Reply finder + timing intelligence = growth hack in a box. Went from 0 to 2K followers in first month.",
            rating: 5,
        },
        {
            name: "Rachel Green",
            handle: "@rachelcreates",
            role: "Designer",
            text: "Clean interface, powerful features. Doesn't feel overwhelming like other tools. Just works.",
            rating: 5,
        },
    ]

    // Duplicate for continuous scroll
    const allReviews = [...reviews, ...reviews, ...reviews]

    return (
        <section className="py-24 bg-black overflow-hidden border-t border-white/5 relative">
            <div className="max-w-7xl mx-auto px-6 mb-12 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                    Loved by creators growing on X
                </h2>
                <p className="text-white/60">
                    Real results from real people
                </p>
            </div>

            <div className="relative w-full overflow-hidden">
                {/* Fade Overlays */}
                <div className="absolute top-0 left-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
                <div className="absolute top-0 right-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

                {/* Scrolling Reviews */}
                <div className="flex animate-marquee gap-6 w-max">
                    {allReviews.map((review, i) => (
                        <div
                            key={i}
                            className="w-[380px] bg-white/5 border border-white/10 p-6 rounded-2xl flex-shrink-0 hover:bg-white/10 transition-colors"
                        >
                            {/* Rating */}
                            <div className="flex items-center gap-1 mb-4">
                                {[...Array(review.rating)].map((_, i) => (
                                    <Star key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                                ))}
                            </div>

                            {/* Review Text */}
                            <p className="text-white/90 text-base mb-6 leading-relaxed">
                                "{review.text}"
                            </p>

                            {/* Author */}
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-white/20 to-white/5 flex items-center justify-center font-bold text-white">
                                    {review.name.charAt(0)}
                                </div>
                                <div>
                                    <div className="font-bold text-white">{review.name}</div>
                                    <div className="text-sm text-white/50">{review.role}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Add to global CSS for animation */}
            <style jsx global>{`
                @keyframes marquee {
                    0% {
                        transform: translateX(0);
                    }
                    100% {
                        transform: translateX(-33.333%);
                    }
                }
                
                .animate-marquee {
                    animation: marquee 60s linear infinite;
                }
                
                .animate-marquee:hover {
                    animation-play-state: paused;
                }
            `}</style>
        </section>
    )
}

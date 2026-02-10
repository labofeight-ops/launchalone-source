"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Heart, MessageCircle, Repeat, UserPlus, Send, Edit3, CheckCircle2 } from "lucide-react"

export function DopamineCard() {
    const [followerCount, setFollowerCount] = useState(892)
    const [notifications, setNotifications] = useState<any[]>([])

    // Smooth Follower Ticker
    useEffect(() => {
        const interval = setInterval(() => {
            // Add random 1-3 followers every 1.5s
            setFollowerCount(prev => prev + Math.floor(Math.random() * 3) + 1)
        }, 1500)
        return () => clearInterval(interval)
    }, [])

    // Notification Generator
    useEffect(() => {
        const types = [
            { type: "like", icon: Heart, color: "text-pink-500", text: "liked your post" },
            { type: "repost", icon: Repeat, color: "text-green-500", text: "reposted" },
            { type: "follow", icon: UserPlus, color: "text-blue-400", text: "followed you" },
            { type: "reply", icon: MessageCircle, color: "text-blue-500", text: "replied: 'Agreed!'" },
        ]
        const users = ["@alexhormozi", "@sahilbloom", "@naval", "@paulg", "@elonmusk", "@dickiebush", "@shl"]

        const interval = setInterval(() => {
            const randomType = types[Math.floor(Math.random() * types.length)]
            const randomUser = users[Math.floor(Math.random() * users.length)]

            const newNotif = {
                id: Date.now(),
                user: randomUser,
                ...randomType
            }

            // Keep only top 5, add new to top
            setNotifications(prev => [newNotif, ...prev].slice(0, 5))
        }, 2000) // New notification every 2s
        return () => clearInterval(interval)
    }, [])

    return (
        <section className="py-24 bg-black overflow-hidden flex justify-center items-center px-6">
            <div className="max-w-5xl w-full">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
                        See the <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">Growth Loop.</span>
                    </h2>
                    <p className="text-white/50 text-xl max-w-2xl mx-auto">
                        Your consistent inputs turn into exponential outputs.
                    </p>
                </div>

                {/* THE GLASS CARD */}
                <div className="relative w-full aspect-[4/3] md:aspect-[21/9] bg-[#050505] rounded-3xl border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col md:flex-row">

                    {/* Background Grid */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

                    {/* LEFT: INPUT (The Work) */}
                    <div className="flex-1 p-8 border-r border-white/10 flex flex-col relative z-10 bg-black/40 backdrop-blur-sm">
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-white/20 to-white/5 border border-white/10" />
                                <div>
                                    <div className="font-bold text-white">You</div>
                                    <div className="text-xs text-blue-400 font-mono">@creator</div>
                                </div>
                            </div>
                            <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-white/60 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> Drafting
                            </div>
                        </div>

                        <div className="flex-1 flex flex-col justify-center space-y-6">
                            {/* Simulated Editor */}
                            <div className="space-y-3">
                                <TypewriterText text="Consistency is the only growth hack that actually works. Stop overthinking." />
                                <div className="h-4 w-3/4 bg-white/5 rounded animate-pulse delay-75" />
                            </div>
                        </div>

                        <div className="mt-8 pt-6 border-t border-white/10 flex justify-between items-center">
                            <div className="flex gap-4 text-white/40 text-sm">
                                <span>24/280</span>
                            </div>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-white text-black font-bold px-6 py-2.5 rounded-full flex items-center gap-2 text-sm shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] transition-shadow"
                            >
                                Post Now <Send className="w-3 h-3" />
                            </motion.button>
                        </div>
                    </div>

                    {/* RIGHT: OUTPUT (The Reward) */}
                    <div className="flex-1 p-8 relative z-10 flex flex-col bg-black/40 backdrop-blur-sm">

                        {/* Header Stats */}
                        <div className="flex justify-between items-start mb-8">
                            <div>
                                <div className="text-sm font-medium text-white/50 mb-1">Total Followers</div>
                                <div className="text-4xl font-black text-white tabular-nums tracking-tight">
                                    <CountUp value={followerCount} />
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-sm font-medium text-white/50 mb-1">Engagement</div>
                                <div className="text-xl font-bold text-green-400 flex items-center justify-end gap-1">
                                    High <CheckCircle2 className="w-4 h-4" />
                                </div>
                            </div>
                        </div>

                        {/* Live Notification Feed */}
                        <div className="flex-1 relative">
                            <div className="text-xs font-bold text-white/30 uppercase mb-4 tracking-widest flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-blue-500" /> Live Activity
                            </div>

                            <div className="space-y-3">
                                <AnimatePresence mode="popLayout">
                                    {notifications.map((notif) => (
                                        <motion.div
                                            layout
                                            key={notif.id}
                                            initial={{ opacity: 0, x: 20, scale: 0.95 }}
                                            animate={{ opacity: 1, x: 0, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                            className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors group"
                                        >
                                            <div className="p-2 rounded-full bg-white/5 border border-white/5 group-hover:scale-110 transition-transform">
                                                <notif.icon className={`w-4 h-4 ${notif.color}`} fill={notif.type === 'like' ? 'currentColor' : 'none'} />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm text-white truncate">
                                                    <span className="font-bold">{notif.user}</span> <span className="text-white/60">{notif.text}</span>
                                                </p>
                                            </div>
                                            <div className="text-[10px] text-white/20 font-mono">now</div>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>

                            {/* Fade at bottom */}
                            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
                        </div>
                    </div>

                    {/* Background Glow */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none animate-pulse duration-[4000ms]" />
                </div>
            </div>
        </section>
    )
}

function CountUp({ value }: { value: number }) {
    return <motion.span key={value} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="inline-block">{value.toLocaleString()}</motion.span>
}

function TypewriterText({ text }: { text: string }) {
    const [displayedText, setDisplayedText] = useState("")

    useEffect(() => {
        let i = 0
        const interval = setInterval(() => {
            setDisplayedText(text.slice(0, i))
            i++
            if (i > text.length + 10) { // Wait a bit at end
                i = 0
            }
        }, 50)
        return () => clearInterval(interval)
    }, [text])

    return (
        <p className="text-xl md:text-2xl font-medium text-white/90 leading-tight">
            {displayedText}
            <span className="animate-blink inline-block w-0.5 h-6 bg-blue-400 ml-1 align-middle" />
        </p>
    )
}

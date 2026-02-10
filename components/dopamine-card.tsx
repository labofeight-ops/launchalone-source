"use client"

import { useEffect, useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Heart, MessageCircle, Repeat, UserPlus, Zap, TrendingUp, BarChart3, Search } from "lucide-react"

export function DopamineCard() {
    const [followerCount, setFollowerCount] = useState(1240)
    const [growth, setGrowth] = useState(0)

    // High-speed ticker
    useEffect(() => {
        const interval = setInterval(() => {
            const increment = Math.floor(Math.random() * 5) + 1
            setFollowerCount(prev => prev + increment)
            setGrowth(prev => prev + increment)
        }, 150) // Hyper fast updates
        return () => clearInterval(interval)
    }, [])

    return (
        <section className="py-24 bg-black overflow-hidden flex justify-center items-center px-4 relative">
            {/* Ambient Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-5xl w-full relative z-10">
                <div className="text-center mb-12">
                    <h2 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter">
                        THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ff88] via-white to-blue-500 animate-gradient-x">GROWTH LOOP</span>
                    </h2>
                    <p className="text-white/60 text-xl font-medium">Systematic. Automated. Inevitable.</p>
                </div>

                {/* HYPER CARD */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6 bg-[#0a0a0a] border border-white/10 rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.5)] relative overflow-hidden ring-1 ring-white/10">

                    {/* 1. LEFT: THE ENGINE (Analysis & Actions) - 5 Cols */}
                    <div className="md:col-span-5 space-y-4 flex flex-col">
                        {/* Active Scanner Visual */}
                        <div className="bg-black/40 border border-white/10 rounded-2xl p-4 flex-1 flex flex-col relative overflow-hidden">
                            <div className="flex justify-between items-center mb-4 border-b border-white/5 pb-2">
                                <div className="flex items-center gap-2 text-blue-400 font-bold text-xs uppercase tracking-widest">
                                    <Zap className="w-4 h-4 animate-pulse" /> AI Engine Active
                                </div>
                                <div className="text-xs font-mono text-white/40">LATENCY: 12ms</div>
                            </div>

                            <ScanningSequence />
                        </div>

                        {/* Virality Prediction Graph */}
                        <div className="h-32 bg-black/40 border border-white/10 rounded-2xl p-4 relative overflow-hidden flex items-end justify-between gap-1">
                            <div className="absolute top-3 left-3 text-xs font-bold text-emerald-400 uppercase tracking-widest flex items-center gap-2">
                                <TrendingUp className="w-3 h-3" /> Virality Score
                            </div>
                            {Array.from({ length: 20 }).map((_, i) => (
                                <LiveBar key={i} index={i} />
                            ))}
                        </div>
                    </div>

                    {/* 2. RIGHT: THE REWARD (Live Feed & Stats) - 7 Cols */}
                    <div className="md:col-span-7 flex flex-col gap-4">
                        {/* Big Stats Row */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col justify-between overflow-hidden relative group">
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div className="text-white/40 text-xs font-bold uppercase tracking-widest mb-1">Total Followers</div>
                                <div className="text-4xl lg:text-5xl font-black text-white slash-zero tracking-tighter">
                                    <CountUp value={followerCount} />
                                </div>
                            </div>
                            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col justify-between overflow-hidden relative group">
                                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div className="text-white/40 text-xs font-bold uppercase tracking-widest mb-1">Session Growth</div>
                                <div className="text-4xl lg:text-5xl font-black text-emerald-400 slash-zero tracking-tighter flex items-center gap-2">
                                    +{growth}
                                    <ArrowUp className="w-6 h-6 animate-bounce" />
                                </div>
                            </div>
                        </div>

                        {/* Hyperspeed Notification Feed */}
                        <div className="flex-1 bg-black/40 border border-white/10 rounded-2xl p-4 relative overflow-hidden min-h-[300px]">
                            <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
                            <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[#0a0a0a] to-transparent z-10 pointer-events-none" />

                            <div className="flex items-center justify-between mb-4 px-2">
                                <span className="text-xs font-bold text-white/30 uppercase tracking-widest">Live Activity Feed</span>
                                <span className="flex h-2 w-2 relative">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                </span>
                            </div>

                            <NotificationFeed />
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}

function ArrowUp({ className }: { className?: string }) {
    return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className={className}><path d="M12 19V5M5 12l7-7 7 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
}

// ---- SUB-COMPONENTS FOR ANIMATION LOGIC ----

function CountUp({ value }: { value: number }) {
    return (
        <span className="tabular-nums">
            {value.toLocaleString()}
        </span>
    )
}

function LiveBar({ index }: { index: number }) {
    // Random height jitter
    const [height, setHeight] = useState(20)

    useEffect(() => {
        const interval = setInterval(() => {
            setHeight(Math.random() * 80 + 20)
        }, 100 + (index * 20)) // Staggered updates
        return () => clearInterval(interval)
    }, [index])

    return (
        <div
            className="w-full bg-emerald-500/20 border-t border-emerald-500 rounded-t-sm transition-all duration-300 ease-out"
            style={{ height: `${height}%` }}
        />
    )
}

function ScanningSequence() {
    const [step, setStep] = useState(0)
    const SEQUENCE = [
        { text: "SCANNING TIMELINE...", color: "text-white/60" },
        { text: "DETECTED VIRAL HOOK", color: "text-blue-400" },
        { text: "ANALYZING SENTIMENT...", color: "text-white/60" },
        { text: "GENERATING REPLY...", color: "text-purple-400" },
        { text: "OPTIMIZING FOR ENGAGEMENT", color: "text-emerald-400" },
        { text: "POSTING...", color: "text-white" },
    ]

    useEffect(() => {
        const interval = setInterval(() => {
            setStep(prev => (prev + 1) % SEQUENCE.length)
        }, 600) // Fast step transitions
        return () => clearInterval(interval)
    }, [])

    return (
        <div className="font-mono text-sm space-y-2 h-full flex flex-col">
            {SEQUENCE.map((item, i) => (
                <div
                    key={i}
                    className={`transition-opacity duration-200 flex items-center gap-3 ${i === step ? "opacity-100 scale-105 origin-left font-bold" :
                            i < step ? "opacity-30 blur-[1px]" : "opacity-10 translate-y-2"
                        } ${item.color}`}
                >
                    <span className="text-[10px]">{i < step ? "✓" : ">"}</span>
                    {item.text}
                </div>
            ))}

            {/* Visual Scanner Line */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-500/50 blur-sm animate-scanner" />
        </div>
    )
}

function NotificationFeed() {
    const [notifications, setNotifications] = useState<any[]>([])
    const NOTIF_TYPES = [
        { icon: Heart, text: "liked your post", color: "text-pink-500", bg: "bg-pink-500/10" },
        { icon: Repeat, text: "reposted you", color: "text-emerald-500", bg: "bg-emerald-500/10" },
        { icon: UserPlus, text: "followed you", color: "text-blue-500", bg: "bg-blue-500/10" },
        { icon: MessageCircle, text: "replied to you", color: "text-purple-500", bg: "bg-purple-500/10" },
    ]
    const USERS = ["@alexhormozi", "@sahilbloom", "@naval", "@paulg", "@elonmusk", "@shl", "@dickiebush", "@jason", "@lexfridman"]

    useEffect(() => {
        const interval = setInterval(() => {
            const type = NOTIF_TYPES[Math.floor(Math.random() * NOTIF_TYPES.length)]
            const user = USERS[Math.floor(Math.random() * USERS.length)]
            const id = Date.now() + Math.random() // Unique ID

            setNotifications(prev => [
                { id, user, ...type },
                ...prev.slice(0, 6) // Keep only 7 items
            ])
        }, 800) // New notification every 800ms
        return () => clearInterval(interval)
    }, [])

    return (
        <div className="space-y-2 relative">
            <AnimatePresence mode="popLayout">
                {notifications.map((n) => (
                    <motion.div
                        layout
                        key={n.id}
                        initial={{ opacity: 0, x: -20, scale: 0.9 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors"
                    >
                        <div className={`p-2 rounded-lg ${n.bg}`}>
                            <n.icon className={`w-4 h-4 ${n.color}`} fill={n.color.includes('text-pink') ? "currentColor" : "none"} />
                        </div>
                        <div className="flex-1 min-w-0 flex justify-between items-center">
                            <div className="text-sm truncate">
                                <span className="font-bold text-white mr-1">{n.user}</span>
                                <span className="text-white/60">{n.text}</span>
                            </div>
                            <span className="text-[10px] text-white/20 font-mono">now</span>
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    )
}

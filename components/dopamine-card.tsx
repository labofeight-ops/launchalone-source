"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Heart, MessageCircle, Repeat, UserPlus, Bell, Send, Edit3, ArrowUpRight } from "lucide-react"

export function DopamineCard() {
    const [followerCount, setFollowerCount] = useState(892)
    const [notifications, setNotifications] = useState<any[]>([])

    // Follower count ticker
    useEffect(() => {
        const interval = setInterval(() => {
            setFollowerCount(prev => prev + Math.floor(Math.random() * 3))
        }, 2500)
        return () => clearInterval(interval)
    }, [])

    // Auto-generate notifications
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

            setNotifications(prev => [newNotif, ...prev].slice(0, 5))
        }, 1800)
        return () => clearInterval(interval)
    }, [])

    return (
        <section className="py-24 bg-black overflow-hidden flex justify-center items-center px-6">
            <div className="max-w-4xl w-full">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
                        Experience the <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">Growth Loop.</span>
                    </h2>
                    <p className="text-white/50 text-xl">Where consistency meets dopamine.</p>
                </div>

                {/* THE CARD */}
                <div className="relative w-full aspect-[4/3] md:aspect-[16/9] bg-[#050505] rounded-3xl border border-white/10 shadow-2xl overflow-hidden flex flex-col md:flex-row">

                    {/* Background Grid */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

                    {/* Left Column: Post Composer (The "Work") */}
                    <div className="flex-1 p-8 border-r border-white/10 flex flex-col justify-between relative z-10 bg-black/50 backdrop-blur-sm">
                        <div>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-full bg-white/10 p-1">
                                    <div className="w-full h-full rounded-full bg-gradient-to-tr from-white to-gray-400" />
                                </div>
                                <div>
                                    <div className="font-bold text-white">You</div>
                                    <div className="text-xs text-emerald-400 flex items-center gap-1">
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                        Online
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="h-4 bg-white/10 rounded w-3/4 animate-pulse" />
                                <div className="h-4 bg-white/10 rounded w-full animate-pulse delay-75" />
                                <div className="h-4 bg-white/10 rounded w-1/2 animate-pulse delay-150" />
                            </div>
                        </div>

                        {/* Animated Typing Simulation */}
                        <div className="bg-[#111] border border-white/10 rounded-xl p-4 mt-8">
                            <div className="text-xs uppercase text-white/30 mb-2 flex justify-between">
                                <span>Drafting Topic: SaaS Growth</span>
                                <Edit3 className="w-3 h-3" />
                            </div>
                            <TypewriterText text="The secret to scaling to $10k MRR isn't more features. It's doing the boring work everyday." />
                            <div className="flex justify-between items-center mt-4 pt-4 border-t border-white/5">
                                <div className="flex gap-2 text-blue-400">
                                    <div className="w-4 h-4 rounded-full border border-blue-400/30" />
                                    <div className="w-4 h-4 rounded-full border border-blue-400/30" />
                                </div>
                                <button className="bg-white text-black text-xs font-bold px-4 py-2 rounded-full flex items-center gap-2">
                                    Post <Send className="w-3 h-3" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: The "Reward" (Notifications & Stats) */}
                    <div className="flex-1 p-8 relative z-10 flex flex-col bg-black/50 backdrop-blur-sm">

                        {/* Stats Header */}
                        <div className="flex justify-between items-center mb-8">
                            <div className="text-sm font-medium text-white/50">Total Followers</div>
                            <div className="text-3xl font-black text-white tabular-nums tracking-tight">
                                {followerCount.toLocaleString()}
                                <span className="text-emerald-400 text-sm font-bold ml-2 align-top">+12 today</span>
                            </div>
                        </div>

                        {/* Live Feed */}
                        <div className="flex-1 overflow-hidden relative">
                            <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-black/50 to-transparent z-10" />
                            <div className="text-xs font-bold text-white/30 uppercase mb-4 tracking-widest">Live Activity</div>

                            <div className="space-y-3">
                                <AnimatePresence initial={false}>
                                    {notifications.map((notif) => (
                                        <motion.div
                                            key={notif.id}
                                            initial={{ opacity: 0, x: 20, height: 0 }}
                                            animate={{ opacity: 1, x: 0, height: "auto" }}
                                            exit={{ opacity: 0, x: -20, height: 0 }}
                                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                            className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5"
                                        >
                                            <div className="p-2 rounded-full bg-white/5 border border-white/5">
                                                <notif.icon className={`w-4 h-4 ${notif.color}`} fill={notif.type === 'like' ? 'currentColor' : 'none'} />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm text-white truncate">
                                                    <span className="font-bold">{notif.user}</span> <span className="text-white/60">{notif.text}</span>
                                                </p>
                                            </div>
                                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>

                            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black to-transparent z-10" />
                        </div>

                        {/* DM Toast */}
                        <motion.div
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 2, duration: 0.5 }}
                            className="mt-4 p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center gap-4"
                        >
                            <div className="relative">
                                <div className="w-10 h-10 rounded-full bg-white/10" />
                                <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-black text-[10px] flex items-center justify-center text-white font-bold">1</div>
                            </div>
                            <div>
                                <div className="text-xs text-blue-300 font-bold mb-0.5">New DM Request</div>
                                <div className="text-sm text-white">Hey! Loved your post about...</div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Decor Elements */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500/20 rounded-full blur-[100px] pointer-events-none mix-blend-screen animate-pulse" />
                </div>
            </div>
        </section>
    )
}

// Simple Typing Effect Component
function TypewriterText({ text }: { text: string }) {
    const [displayedText, setDisplayedText] = useState("")

    useEffect(() => {
        let i = 0
        const interval = setInterval(() => {
            setDisplayedText(text.slice(0, i))
            i++
            if (i > text.length) {
                clearInterval(interval)
                setTimeout(() => { i = 0; setDisplayedText("") }, 3000) // Loop it
            }
        }, 50)
        return () => clearInterval(interval)
    }, [text])

    return (
        <p className="text-lg font-medium text-white/90 font-serif leading-relaxed">
            {displayedText}
            <span className="animate-blink inline-block w-0.5 h-5 bg-blue-400 ml-1 align-middle" />
        </p>
    )
}

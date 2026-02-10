"use client"

import { Bell, Heart, MessageCircle, MoreHorizontal, Repeat, User } from "lucide-react"

export function VisualPreviewSection() {
    return (
        <section className="py-24 bg-black overflow-hidden border-t border-white/5">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">
                        Notifications that <br />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-white/80 to-white/40">actually matter.</span>
                    </h2>
                    <p className="text-xl text-white/50 max-w-2xl mx-auto">
                        Stop scrolling. Start engaging with high-signal interactions filtered by our AI.
                    </p>
                </div>

                <div className="relative max-w-4xl mx-auto">
                    {/* Main Visual Card */}
                    <div className="bg-[#111] border border-white/10 rounded-3xl p-8 shadow-[0_0_100px_rgba(255,255,255,0.05)] relative z-10 animate-in fade-in zoom-in-95 duration-1000">

                        {/* Header */}
                        <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-4">
                            <span className="font-bold text-lg text-white">Notifications</span>
                            <div className="flex gap-4 text-sm text-white/40">
                                <span className="text-white font-medium border-b-2 border-[#1da1f2] pb-4 -mb-4.5">All</span>
                                <span>Verified</span>
                                <span>Mentions</span>
                            </div>
                        </div>

                        {/* Notifications Feed */}
                        <div className="space-y-6">

                            {/* Notification 1 */}
                            <div className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 transition-transform hover:scale-[1.02]">
                                <div className="pt-1"><div className="w-8 h-8 rounded-full bg-[#1da1f2] flex items-center justify-center"><Bell className="w-4 h-4 text-white fill-white" /></div></div>
                                <div>
                                    <div className="flex -space-x-2 mb-2">
                                        <div className="w-8 h-8 rounded-full bg-white border-2 border-[#111]" />
                                        <div className="w-8 h-8 rounded-full bg-gray-400 border-2 border-[#111]" />
                                        <div className="w-8 h-8 rounded-full bg-gray-600 border-2 border-[#111]" />
                                    </div>
                                    <p className="text-white text-lg leading-snug">
                                        <span className="font-bold">Elon Musk</span> and <span className="font-bold">2 others</span> reposted your post
                                    </p>
                                    <p className="text-white/40 mt-1">"The future of X growth tools is here..."</p>
                                </div>
                            </div>

                            {/* Notification 2 */}
                            <div className="flex gap-4 p-4">
                                <div className="pt-1"><div className="w-8 h-8 rounded-full bg-pink-500 flex items-center justify-center"><Heart className="w-4 h-4 text-white fill-white" /></div></div>
                                <div>
                                    <div className="w-8 h-8 rounded-full bg-white mb-2" />
                                    <p className="text-white text-lg leading-snug">
                                        <span className="font-bold">Naval</span> liked your reply
                                    </p>
                                    <p className="text-white/40 mt-1">"Consistency &gt; Intensity. Always."</p>
                                </div>
                            </div>

                            {/* Notification 3 */}
                            <div className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
                                <div className="pt-1"><div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center"><User className="w-4 h-4 text-white fill-white" /></div></div>
                                <div>
                                    <div className="w-8 h-8 rounded-full bg-gray-200 mb-2" />
                                    <p className="text-white text-lg leading-snug">
                                        <span className="font-bold">Sahil Bloom</span> followed you
                                    </p>
                                    <div className="mt-3 flex gap-4">
                                        <button className="bg-white text-black px-4 py-1.5 rounded-full font-bold text-sm hover:opacity-90">Follow back</button>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* Floating Elements (Decorations) */}
                    <div className="absolute -top-12 -right-12 p-4 bg-black border border-white/10 rounded-2xl shadow-xl animate-bounce duration-[3000ms] hidden md:block">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center"><MessageCircle className="w-5 h-5 text-white" /></div>
                            <div>
                                <div className="text-sm font-bold text-white">New DM Request</div>
                                <div className="text-xs text-white/50">From Verified User</div>
                            </div>
                        </div>
                    </div>

                    <div className="absolute -bottom-8 -left-8 p-4 bg-black border border-white/10 rounded-2xl shadow-xl z-20 hidden md:block">
                        <div className="flex items-center gap-4 text-white">
                            <div className="text-center">
                                <div className="text-xs text-white/40 uppercase">Impressions</div>
                                <div className="font-mono font-bold text-xl">1.2M</div>
                            </div>
                            <div className="h-8 w-px bg-white/10" />
                            <div className="text-center">
                                <div className="text-xs text-white/40 uppercase">Profile Visits</div>
                                <div className="font-mono font-bold text-xl text-green-400">12K</div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}

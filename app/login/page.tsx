"use client"

import { useState } from "react"
import { Loader2 } from "lucide-react"

export default function LoginPage() {
    const [isLoading, setIsLoading] = useState(false)

    const handleLogin = () => {
        setIsLoading(true)
        // Simulate X OAuth redirect
        setTimeout(() => {
            window.location.href = "/dashboard"
        }, 1500)
    }

    return (
        <div className="min-h-screen grid lg:grid-cols-2 bg-black font-sans selection:bg-white/20">

            {/* Left: Branding & Value Props */}
            <div className="hidden lg:flex flex-col justify-between p-12 bg-[#050505] border-r border-white/5 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent pointer-events-none" />

                <div className="relative z-10">
                    <div className="w-12 h-12 bg-white text-black rounded-xl flex items-center justify-center mb-8">
                        <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                        </svg>
                    </div>
                    <h1 className="text-5xl font-bold tracking-tight text-white mb-6 leading-tight">
                        See who's talking <br /> about you.
                    </h1>
                    <p className="text-white/60 text-xl max-w-md leading-relaxed">
                        Join 50,000+ creators dominating the algorithm with LaunchAlone.
                    </p>
                </div>

                <div className="space-y-4 relative z-10">
                    <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="font-bold text-white">@elonmusk</div>
                            <div className="text-white/40 text-sm">reposted your post</div>
                        </div>
                        <p className="text-white/80 text-sm">"This is exactly what X needs right now. Great tool."</p>
                    </div>
                    <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm opacity-60">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="font-bold text-white">@paulg</div>
                            <div className="text-white/40 text-sm">followed you</div>
                        </div>
                    </div>
                </div>

                <div className="text-xs text-white/20 relative z-10">
                    © 2026 LaunchAlone Inc. Not affiliated with X Corp.
                </div>
            </div>

            {/* Right: Login Action */}
            <div className="flex flex-col items-center justify-center p-6 lg:p-12 relative">
                <div className="w-full max-w-sm space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 text-center">

                    {/* Mobile Logo */}
                    <div className="lg:hidden flex justify-center mb-8">
                        <div className="w-12 h-12 bg-white text-black rounded-xl flex items-center justify-center">
                            <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                            </svg>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <h2 className="text-3xl font-bold tracking-tight text-white">Sign in to LaunchAlone</h2>
                        <p className="text-white/40">Connect your X account to access the dashboard.</p>
                    </div>

                    <button
                        onClick={handleLogin}
                        disabled={isLoading}
                        className="w-full h-14 rounded-full bg-white text-black font-bold text-lg tracking-wide hover:bg-white/90 focus:outline-none focus:ring-4 focus:ring-white/20 disabled:opacity-70 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:scale-[1.02]"
                    >
                        {isLoading ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                            <>
                                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zl-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                                Continue with X
                            </>
                        )}
                    </button>

                    <p className="text-xs text-white/20 px-8">
                        By signing in, you agree to our Terms of Service and Privacy Policy. We only ask for read/write permissions necessary for the tool to function.
                    </p>

                </div>
            </div>
        </div>
    )
}

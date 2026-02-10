"use client"

import { useState } from "react"
import { ArrowRight, Loader2, Apple, Check } from "lucide-react"

export default function LoginPage() {
    const [email, setEmail] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        // Simulate login delay
        setTimeout(() => {
            setIsLoading(false)
            setIsSuccess(true)
            // Redirect would happen here normally
            setTimeout(() => {
                window.location.href = "/dashboard"
            }, 1000)
        }, 1500)
    }

    return (
        <div className="min-h-screen grid lg:grid-cols-2 bg-black font-sans selection:bg-white/20">

            {/* Left: Branding & Value Props (Hidden on Mobile) */}
            <div className="hidden lg:flex flex-col justify-between p-12 bg-[#050505] border-r border-white/5 relative overflow-hidden">
                {/* Abstract Background */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent pointer-events-none" />

                <div className="relative z-10">
                    <div className="w-10 h-10 bg-white text-black rounded-lg flex items-center justify-center mb-8">
                        <span className="font-extrabold text-xl">X</span>
                    </div>
                    <h1 className="text-4xl font-bold tracking-tight text-white mb-4">
                        Create. Post.<br />
                        Dominate X.
                    </h1>
                    <p className="text-white/60 text-lg max-w-md">
                        The AI co-pilot used by 50,000+ creators to find viral replies and grow 3x faster.
                    </p>
                </div>

                <div className="space-y-6 relative z-10">
                    {[
                        "Viral reply finder",
                        "Consistent daily drafts",
                        "Safe growth engine",
                        "Analytics deep dive"
                    ].map((feature) => (
                        <div key={feature} className="flex items-center gap-3 text-white/80">
                            <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
                                <Check className="w-3 h-3 text-white" />
                            </div>
                            <span className="font-medium">{feature}</span>
                        </div>
                    ))}
                </div>

                <div className="text-xs text-white/20 relative z-10">
                    © 2026 LaunchAlone Inc. Not affiliated with X Corp.
                </div>
            </div>

            {/* Right: Login Form */}
            <div className="flex flex-col items-center justify-center p-6 lg:p-12 relative">
                <div className="w-full max-w-sm space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">

                    {/* Mobile Logo */}
                    <div className="lg:hidden flex justify-center mb-8">
                        <div className="w-10 h-10 bg-white text-black rounded-lg flex items-center justify-center">
                            <span className="font-extrabold text-xl">X</span>
                        </div>
                    </div>

                    <div className="text-center space-y-2">
                        <h2 className="text-2xl font-bold tracking-tight text-white">Welcome back</h2>
                        <p className="text-white/40">Enter your email to sign in or create an account.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="email" className="sr-only">Email address</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full h-12 px-4 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-white/40 focus:bg-white/10 transition-all font-medium"
                                placeholder="name@example.com"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading || isSuccess}
                            className="w-full h-12 rounded-lg bg-white text-black font-bold text-sm tracking-wide hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                        >
                            {isLoading ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                            ) : isSuccess ? (
                                <Check className="w-4 h-4" />
                            ) : (
                                <>
                                    Continue with Email
                                    <ArrowRight className="w-4 h-4" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-white/10" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-black px-2 text-white/20">Or continue with</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <button className="h-10 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition-colors flex items-center justify-center gap-2 text-sm font-medium text-white/80">
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
                            </svg>
                            Google
                        </button>
                        <button className="h-10 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition-colors flex items-center justify-center gap-2 text-sm font-medium text-white/80">
                            <Apple className="w-4 h-4" />
                            Apple
                        </button>
                    </div>

                    <p className="text-center text-xs text-white/20">
                        By clicking continue, you agree to our Terms of Service and Privacy Policy.
                    </p>

                </div>
            </div>
        </div>
    )
}

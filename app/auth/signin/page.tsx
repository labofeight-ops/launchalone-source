"use client"

import { useState } from "react"
import { ArrowRight } from "lucide-react"

// Modern X logo (2026 style)
const XLogo = () => (
  <svg viewBox="0 0 24 24" className="w-full h-full" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
)

export default function SignInPage() {
  const [isLoading, setIsLoading] = useState(false)

  const handleXLogin = async () => {
    setIsLoading(true)
    
    // Simulate auth
    setTimeout(() => {
      localStorage.setItem('launchalone_authed', 'true')
      window.location.href = '/onboarding'
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8 sm:mb-12">
          <div className="text-4xl sm:text-5xl font-bold tracking-tight mb-3 sm:mb-4">
            LaunchAlone
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-3">Welcome Back</h1>
          <p className="text-sm sm:text-base text-white/70">
            Sign in with X to continue
          </p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8">
          <button
            onClick={handleXLogin}
            disabled={isLoading}
            className="w-full bg-white hover:bg-white/90 text-black font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed text-base sm:text-lg"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                Connecting...
              </>
            ) : (
              <>
                <div className="w-6 h-6">
                  <XLogo />
                </div>
                Continue with X
              </>
            )}
          </button>

          <div className="mt-6 text-center">
            <p className="text-xs sm:text-sm text-white/50">
              By continuing, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </div>

        <div className="mt-6 sm:mt-8 text-center">
          <p className="text-xs sm:text-sm text-white/50">
            New to LaunchAlone?{" "}
            <a href="/" className="text-white hover:text-white/80 transition-colors">
              Learn more
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

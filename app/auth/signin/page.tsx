"use client"

import { useState } from "react"
import { Twitter } from "lucide-react"
import { useRouter } from "next/navigation"

export default function SignInPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleXLogin = async () => {
    setIsLoading(true)
    
    // TODO: Replace with actual X OAuth flow
    // For now, simulate the flow
    
    // Real implementation would be:
    // const response = await fetch('/api/auth/twitter/redirect')
    // const { url } = await response.json()
    // window.location.href = url
    
    // Simulated for now - replace this entire function
    setTimeout(() => {
      // Simulate successful auth
      localStorage.setItem('launchalone_authed', 'true')
      localStorage.setItem('launchalone_user', JSON.stringify({
        id: 'user_' + Date.now(),
        handle: '@demo_user',
        name: 'Demo User',
        avatar: '',
        followers: 1250
      }))
      router.push('/onboarding')
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8 sm:mb-12">
          <div className="font-['Bebas_Neue'] text-4xl sm:text-5xl tracking-wider text-[#00ff88] mb-3 sm:mb-4">
            LAUNCHALONE
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-3">Welcome Back</h1>
          <p className="text-sm sm:text-base text-gray-400">
            Sign in with your X account to continue
          </p>
        </div>

        <div className="bg-[#111] border border-[#222] rounded-2xl p-6 sm:p-8">
          <button
            onClick={handleXLogin}
            disabled={isLoading}
            className="w-full bg-[#1DA1F2] hover:bg-[#1a8cd8] text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed text-base sm:text-lg"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Connecting...
              </>
            ) : (
              <>
                <Twitter className="w-5 h-5 sm:w-6 sm:h-6" />
                Continue with X
              </>
            )}
          </button>

          <div className="mt-6 text-center">
            <p className="text-xs sm:text-sm text-gray-500">
              By continuing, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </div>

        <div className="mt-6 sm:mt-8 text-center">
          <p className="text-xs sm:text-sm text-gray-500">
            New to LaunchAlone?{" "}
            <a href="/" className="text-[#00ff88] hover:text-[#00cc66] transition-colors">
              Learn more
            </a>
          </p>
        </div>

        {/* Instructions for real implementation */}
        <div className="mt-8 sm:mt-12 p-4 sm:p-6 bg-yellow-500/10 border border-yellow-500/30 rounded-xl">
          <p className="text-xs sm:text-sm text-yellow-200 font-mono">
            <strong>TODO:</strong> Replace handleXLogin with real X OAuth flow.
            <br /><br />
            1. Create X app at developer.twitter.com
            <br />
            2. Get OAuth 2.0 credentials
            <br />
            3. Add to .env.local:
            <br />
            - TWITTER_CLIENT_ID
            <br />
            - TWITTER_CLIENT_SECRET
            <br />
            - TWITTER_REDIRECT_URI
            <br /><br />
            4. Create /api/auth/twitter/redirect and /api/auth/twitter/callback
          </p>
        </div>
      </div>
    </div>
  )
}

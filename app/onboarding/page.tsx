"use client"

import { useState } from "react"
import { ArrowRight, Twitter, Sparkles, Target, TrendingUp, Users } from "lucide-react"
import { useRouter } from "next/navigation"

type OnboardingStep = "welcome" | "goals" | "niche" | "experience" | "connect" | "profile-review"

export default function OnboardingPage() {
  const router = useRouter()
  const [step, setStep] = useState<OnboardingStep>("welcome")
  const [userData, setUserData] = useState({
    goals: [] as string[],
    niche: "",
    experience: "",
    xHandle: "",
    currentFollowers: "",
  })

  const goals = [
    { id: "followers", label: "Grow Followers", icon: Users },
    { id: "engagement", label: "Boost Engagement", icon: TrendingUp },
    { id: "leads", label: "Generate Leads", icon: Target },
    { id: "brand", label: "Build Authority", icon: Sparkles },
  ]

  const niches = [
    "Tech & SaaS",
    "Business & Startups",
    "Marketing & Growth",
    "Personal Development",
    "Finance & Investing",
    "Health & Fitness",
    "Creator Economy",
    "Other"
  ]

  const experiences = [
    { value: "beginner", label: "Just Starting (0-500 followers)" },
    { value: "growing", label: "Growing (500-5K followers)" },
    { value: "established", label: "Established (5K-50K followers)" },
    { value: "influencer", label: "Influencer (50K+ followers)" },
  ]

  const toggleGoal = (goalId: string) => {
    setUserData(prev => ({
      ...prev,
      goals: prev.goals.includes(goalId)
        ? prev.goals.filter(g => g !== goalId)
        : [...prev.goals, goalId]
    }))
  }

  const handleXConnect = async () => {
    // TODO: Implement real X OAuth
    // For now, simulate connection
    if (userData.xHandle) {
      setStep("profile-review")
    }
  }

  const completeOnboarding = () => {
    // Save user data to backend
    localStorage.setItem("launchalone_onboarded", "true")
    localStorage.setItem("launchalone_user", JSON.stringify(userData))
    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        
        {/* Welcome Step */}
        {step === "welcome" && (
          <div className="space-y-8 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#00ff88]/30 bg-[#00ff88]/10 text-sm">
              <Sparkles className="w-4 h-4 text-[#00ff88]" />
              <span>Let's get you set up</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-['Bebas_Neue'] tracking-wider">
              WELCOME TO<br />LAUNCHALONE
            </h1>
            
            <p className="text-xl text-gray-400 max-w-xl mx-auto">
              We'll ask you a few questions to personalize your growth engine. Takes 2 minutes.
            </p>
            
            <button
              onClick={() => setStep("goals")}
              className="bg-[#00ff88] text-black px-8 py-4 rounded-lg font-bold uppercase tracking-wider hover:bg-[#00cc66] transition-all inline-flex items-center gap-2"
            >
              Let's Begin
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Goals Step */}
        {step === "goals" && (
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl font-['Bebas_Neue'] tracking-wider mb-2">
                What's Your Main Goal?
              </h2>
              <p className="text-gray-400">Select all that apply</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {goals.map((goal) => (
                <button
                  key={goal.id}
                  onClick={() => toggleGoal(goal.id)}
                  className={`p-6 rounded-xl border-2 transition-all ${
                    userData.goals.includes(goal.id)
                      ? 'border-[#00ff88] bg-[#00ff88]/10'
                      : 'border-[#222] bg-[#111] hover:border-[#333]'
                  }`}
                >
                  <goal.icon className={`w-8 h-8 mb-3 ${
                    userData.goals.includes(goal.id) ? 'text-[#00ff88]' : 'text-gray-500'
                  }`} />
                  <div className="font-bold">{goal.label}</div>
                </button>
              ))}
            </div>

            <button
              onClick={() => setStep("niche")}
              disabled={userData.goals.length === 0}
              className="w-full bg-[#00ff88] text-black px-8 py-4 rounded-lg font-bold uppercase tracking-wider hover:bg-[#00cc66] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continue
            </button>
          </div>
        )}

        {/* Niche Step */}
        {step === "niche" && (
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl font-['Bebas_Neue'] tracking-wider mb-2">
                What's Your Niche?
              </h2>
              <p className="text-gray-400">This helps us tailor content suggestions</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {niches.map((niche) => (
                <button
                  key={niche}
                  onClick={() => setUserData(prev => ({ ...prev, niche }))}
                  className={`p-4 rounded-lg border-2 transition-all text-left ${
                    userData.niche === niche
                      ? 'border-[#00ff88] bg-[#00ff88]/10'
                      : 'border-[#222] bg-[#111] hover:border-[#333]'
                  }`}
                >
                  {niche}
                </button>
              ))}
            </div>

            <button
              onClick={() => setStep("experience")}
              disabled={!userData.niche}
              className="w-full bg-[#00ff88] text-black px-8 py-4 rounded-lg font-bold uppercase tracking-wider hover:bg-[#00cc66] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continue
            </button>
          </div>
        )}

        {/* Experience Step */}
        {step === "experience" && (
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl font-['Bebas_Neue'] tracking-wider mb-2">
                Your Current Level
              </h2>
              <p className="text-gray-400">Where are you on your X journey?</p>
            </div>

            <div className="space-y-3">
              {experiences.map((exp) => (
                <button
                  key={exp.value}
                  onClick={() => setUserData(prev => ({ ...prev, experience: exp.value }))}
                  className={`w-full p-6 rounded-lg border-2 transition-all text-left ${
                    userData.experience === exp.value
                      ? 'border-[#00ff88] bg-[#00ff88]/10'
                      : 'border-[#222] bg-[#111] hover:border-[#333]'
                  }`}
                >
                  <div className="font-bold text-lg">{exp.label}</div>
                </button>
              ))}
            </div>

            <button
              onClick={() => setStep("connect")}
              disabled={!userData.experience}
              className="w-full bg-[#00ff88] text-black px-8 py-4 rounded-lg font-bold uppercase tracking-wider hover:bg-[#00cc66] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continue
            </button>
          </div>
        )}

        {/* Connect X Step */}
        {step === "connect" && (
          <div className="space-y-8">
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-[#1DA1F2]/20 flex items-center justify-center mx-auto mb-6">
                <Twitter className="w-10 h-10 text-[#1DA1F2]" />
              </div>
              <h2 className="text-4xl font-['Bebas_Neue'] tracking-wider mb-2">
                Connect Your X Account
              </h2>
              <p className="text-gray-400">
                This allows us to analyze your profile and provide personalized suggestions
              </p>
            </div>

            <div className="bg-[#111] border border-[#222] rounded-xl p-6 space-y-4">
              <div>
                <label className="block text-sm uppercase tracking-widest text-gray-500 mb-2">
                  Your X Handle
                </label>
                <input
                  type="text"
                  value={userData.xHandle}
                  onChange={(e) => setUserData(prev => ({ ...prev, xHandle: e.target.value }))}
                  placeholder="@yourhandle"
                  className="w-full bg-[#0a0a0a] border border-[#222] rounded-lg px-4 py-3 focus:border-[#00ff88] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm uppercase tracking-widest text-gray-500 mb-2">
                  Current Follower Count (Optional)
                </label>
                <input
                  type="number"
                  value={userData.currentFollowers}
                  onChange={(e) => setUserData(prev => ({ ...prev, currentFollowers: e.target.value }))}
                  placeholder="e.g., 1250"
                  className="w-full bg-[#0a0a0a] border border-[#222] rounded-lg px-4 py-3 focus:border-[#00ff88] focus:outline-none"
                />
              </div>

              <button
                onClick={handleXConnect}
                disabled={!userData.xHandle}
                className="w-full bg-[#1DA1F2] text-white px-8 py-4 rounded-lg font-bold uppercase tracking-wider hover:bg-[#1a8cd8] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <Twitter className="w-5 h-5" />
                Connect with X
              </button>
            </div>

            <button
              onClick={() => setStep("profile-review")}
              className="w-full text-gray-400 hover:text-white transition-colors text-sm"
            >
              Skip for now
            </button>
          </div>
        )}

        {/* Profile Review Step */}
        {step === "profile-review" && (
          <div className="space-y-8">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#00ff88]/30 bg-[#00ff88]/10 text-sm mb-6">
                <Sparkles className="w-4 h-4 text-[#00ff88]" />
                <span>AI Analysis Complete</span>
              </div>
              
              <h2 className="text-4xl font-['Bebas_Neue'] tracking-wider mb-2">
                Your Profile Insights
              </h2>
              <p className="text-gray-400">
                Here's what we found and how to improve
              </p>
            </div>

            <div className="bg-[#111] border border-[#222] rounded-xl p-6 space-y-6">
              <div>
                <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                  Bio Suggestions
                </h3>
                <div className="bg-[#0a0a0a] border border-[#222] rounded-lg p-4 space-y-2">
                  <p className="text-sm text-gray-400">Your current bio is missing:</p>
                  <ul className="text-sm space-y-1">
                    <li className="flex items-center gap-2">
                      <span className="text-[#00ff88]">•</span> Clear value proposition
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-[#00ff88]">•</span> Call-to-action
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-[#00ff88]">•</span> Social proof
                    </li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#00ff88]"></div>
                  Content Strategy
                </h3>
                <div className="bg-[#0a0a0a] border border-[#222] rounded-lg p-4">
                  <p className="text-sm">
                    Based on your niche ({userData.niche}), we recommend posting about:
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-[#00ff88]/10 border border-[#00ff88]/30 rounded-full text-xs">
                      Founder stories
                    </span>
                    <span className="px-3 py-1 bg-[#00ff88]/10 border border-[#00ff88]/30 rounded-full text-xs">
                      How-to guides
                    </span>
                    <span className="px-3 py-1 bg-[#00ff88]/10 border border-[#00ff88]/30 rounded-full text-xs">
                      Industry insights
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  Posting Times
                </h3>
                <div className="bg-[#0a0a0a] border border-[#222] rounded-lg p-4">
                  <p className="text-sm text-gray-400 mb-3">
                    Optimal times for your audience:
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Morning</span>
                      <span className="text-[#00ff88]">6:00 - 9:00 AM</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Lunch</span>
                      <span className="text-[#00ff88]">12:00 - 2:00 PM</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Evening</span>
                      <span className="text-[#00ff88]">5:00 - 8:00 PM</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={completeOnboarding}
              className="w-full bg-[#00ff88] text-black px-8 py-4 rounded-lg font-bold uppercase tracking-wider hover:bg-[#00cc66] transition-all flex items-center justify-center gap-2"
            >
              Go to Dashboard
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Progress Indicator */}
        <div className="mt-8 flex items-center justify-center gap-2">
          {["welcome", "goals", "niche", "experience", "connect", "profile-review"].map((s) => (
            <div
              key={s}
              className={`h-1 w-12 rounded-full transition-all ${
                s === step ? 'bg-[#00ff88]' : 
                ["welcome", "goals", "niche", "experience", "connect", "profile-review"].indexOf(s) < 
                ["welcome", "goals", "niche", "experience", "connect", "profile-review"].indexOf(step)
                  ? 'bg-[#00ff88]/50' 
                  : 'bg-[#222]'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

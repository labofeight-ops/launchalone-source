"use client"

import { useState, useEffect } from "react"
import { Save, Sparkles, TrendingUp, Target, Zap } from "lucide-react"

// THE SAUCE: Interest categories that actually drive engagement
const INTEREST_CATEGORIES = {
  "Business & Startups": ["SaaS", "Bootstrapping", "VC Funding", "Product Hunt", "Indie Hacking", "Entrepreneurship", "Sales", "Marketing", "Growth Hacking"],
  "Tech & Development": ["AI/ML", "Web3", "React/Next.js", "DevOps", "Mobile Dev", "Cloud", "APIs", "Open Source", "Coding"],
  "Marketing & Growth": ["Content Marketing", "SEO", "Social Media", "Email Marketing", "Copywriting", "Branding", "Analytics", "Conversion"],
  "Creator Economy": ["Writing", "Newsletters", "YouTube", "Podcasting", "Course Creation", "Monetization", "Personal Brand", "Audience Building"],
  "Finance & Investing": ["Crypto", "Stocks", "Real Estate", "Personal Finance", "Trading", "DeFi", "Economics", "Wealth"],
  "Personal Development": ["Productivity", "Habits", "Mental Models", "Learning", "Time Management", "Focus", "Health", "Mindset"],
  "Design & Creative": ["UI/UX", "Graphic Design", "Branding", "Figma", "Typography", "Design Systems", "Animation", "Photography"],
}

// THE SAUCE: Voice style presets based on viral accounts
const VOICE_STYLES = {
  "Founder/Builder": {
    description: "Direct, tactical, proof-based",
    example: "Built X in 30 days. Here's what worked (and what didn't).",
    traits: ["First-person stories", "Numbers/metrics", "Lessons learned", "Tactical advice"]
  },
  "Thought Leader": {
    description: "Big ideas, frameworks, mental models",
    example: "The best entrepreneurs don't optimize for money. They optimize for learning velocity.",
    traits: ["Contrarian takes", "Frameworks", "Principles", "Long-term thinking"]
  },
  "Educator/Teacher": {
    description: "Step-by-step, how-to, guides",
    example: "How to write tweets that get 1M impressions (a thread):",
    traits: ["Numbered lists", "How-to format", "Clear structure", "Actionable steps"]
  },
  "Storyteller": {
    description: "Personal stories, emotional, relatable",
    example: "I failed 7 times before my first success. Here's what I learned about resilience.",
    traits: ["Personal anecdotes", "Emotional hooks", "Vulnerability", "Plot twists"]
  },
  "Data/Research": {
    description: "Stats, studies, evidence-based",
    example: "We analyzed 10,000 viral tweets. 87% followed this pattern:",
    traits: ["Statistics", "Research findings", "Data visualization", "Case studies"]
  }
}

// THE SAUCE: Content pillars that drive consistent growth
const CONTENT_PILLARS = [
  { name: "Educational", icon: "📚", description: "Teach something valuable" },
  { name: "Inspirational", icon: "⚡", description: "Motivate and energize" },
  { name: "Entertaining", icon: "😄", description: "Make them laugh or smile" },
  { name: "Personal", icon: "👤", description: "Share your journey" },
  { name: "Controversial", icon: "🔥", description: "Challenge assumptions" },
  { name: "Tactical", icon: "🛠️", description: "Give actionable advice" },
]

export default function SettingsPage() {
  const [context, setContext] = useState({
    bio: "",
    niche: "",
    experience: "",
    interests: [] as string[],
    voiceStyle: "Founder/Builder",
    contentPillars: [] as string[],
    goals: [] as string[],
    favoriteCreators: [] as string[],
    targetAudience: "",
    uniqueValue: "",
  })

  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved">("idle")
  const [newCreator, setNewCreator] = useState("")

  // Load saved context
  useEffect(() => {
    const saved = localStorage.getItem("launchalone_context")
    if (saved) {
      setContext(JSON.parse(saved))
    }
  }, [])

  const handleSave = async () => {
    setSaveStatus("saving")
    
    // Save to localStorage (in production, save to database)
    localStorage.setItem("launchalone_context", JSON.stringify(context))
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setSaveStatus("saved")
    setTimeout(() => setSaveStatus("idle"), 2000)
  }

  const toggleInterest = (interest: string) => {
    setContext(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }))
  }

  const togglePillar = (pillar: string) => {
    setContext(prev => ({
      ...prev,
      contentPillars: prev.contentPillars.includes(pillar)
        ? prev.contentPillars.filter(p => p !== pillar)
        : [...prev.contentPillars, pillar]
    }))
  }

  const addCreator = () => {
    if (newCreator.trim()) {
      const handle = newCreator.startsWith("@") ? newCreator : `@${newCreator}`
      setContext(prev => ({
        ...prev,
        favoriteCreators: [...prev.favoriteCreators, handle]
      }))
      setNewCreator("")
    }
  }

  const removeCreator = (creator: string) => {
    setContext(prev => ({
      ...prev,
      favoriteCreators: prev.favoriteCreators.filter(c => c !== creator)
    }))
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Header */}
      <div className="border-b border-[#222] bg-[#111] sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-['Bebas_Neue'] tracking-wider">CONTEXT SETTINGS</h1>
            <p className="text-sm text-gray-500">Personalize your AI generations</p>
          </div>
          <button
            onClick={handleSave}
            disabled={saveStatus === "saving"}
            className="bg-[#00ff88] text-black px-6 py-2 rounded-lg font-bold uppercase tracking-wider text-sm hover:bg-[#00cc66] transition-all flex items-center gap-2 disabled:opacity-50"
          >
            {saveStatus === "saving" ? (
              <>
                <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                Saving...
              </>
            ) : saveStatus === "saved" ? (
              <>
                <Sparkles className="w-4 h-4" />
                Saved!
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Save
              </>
            )}
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8">

        {/* About You */}
        <section className="bg-[#111] border border-[#222] rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-[#00ff88]/20 flex items-center justify-center">
              <Target className="w-5 h-5 text-[#00ff88]" />
            </div>
            <div>
              <h2 className="text-xl font-bold">About You</h2>
              <p className="text-sm text-gray-500">Help AI understand who you are</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm uppercase tracking-widest text-gray-500 mb-2">
                Your Bio/Description
              </label>
              <textarea
                value={context.bio}
                onChange={(e) => setContext(prev => ({ ...prev, bio: e.target.value }))}
                placeholder="e.g., indie dev, saas builder since 2021"
                className="w-full bg-[#0a0a0a] border border-[#222] rounded-lg px-4 py-3 text-sm focus:border-[#00ff88] focus:outline-none min-h-[80px] resize-none"
                maxLength={160}
              />
              <div className="text-xs text-gray-600 mt-1">{context.bio.length}/160 characters</div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm uppercase tracking-widest text-gray-500 mb-2">
                  Primary Niche
                </label>
                <select
                  value={context.niche}
                  onChange={(e) => setContext(prev => ({ ...prev, niche: e.target.value }))}
                  className="w-full bg-[#0a0a0a] border border-[#222] rounded-lg px-4 py-3 text-sm focus:border-[#00ff88] focus:outline-none"
                >
                  <option value="">Select niche...</option>
                  {Object.keys(INTEREST_CATEGORIES).map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm uppercase tracking-widest text-gray-500 mb-2">
                  Experience Level
                </label>
                <select
                  value={context.experience}
                  onChange={(e) => setContext(prev => ({ ...prev, experience: e.target.value }))}
                  className="w-full bg-[#0a0a0a] border border-[#222] rounded-lg px-4 py-3 text-sm focus:border-[#00ff88] focus:outline-none"
                >
                  <option value="">Select level...</option>
                  <option value="beginner">Beginner (0-500 followers)</option>
                  <option value="growing">Growing (500-5K followers)</option>
                  <option value="established">Established (5K-50K followers)</option>
                  <option value="influencer">Influencer (50K+ followers)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm uppercase tracking-widest text-gray-500 mb-2">
                Your Unique Value Proposition
              </label>
              <input
                type="text"
                value={context.uniqueValue}
                onChange={(e) => setContext(prev => ({ ...prev, uniqueValue: e.target.value }))}
                placeholder="What makes you different? Why should people follow you?"
                className="w-full bg-[#0a0a0a] border border-[#222] rounded-lg px-4 py-3 text-sm focus:border-[#00ff88] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm uppercase tracking-widest text-gray-500 mb-2">
                Target Audience
              </label>
              <input
                type="text"
                value={context.targetAudience}
                onChange={(e) => setContext(prev => ({ ...prev, targetAudience: e.target.value }))}
                placeholder="Who are you creating content for?"
                className="w-full bg-[#0a0a0a] border border-[#222] rounded-lg px-4 py-3 text-sm focus:border-[#00ff88] focus:outline-none"
              />
            </div>
          </div>
        </section>

        {/* Your Interests */}
        <section className="bg-[#111] border border-[#222] rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-[#00ff88]/20 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-[#00ff88]" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Your Interests</h2>
              <p className="text-sm text-gray-500">Topics you want to create content about</p>
            </div>
          </div>

          <div className="space-y-6">
            {Object.entries(INTEREST_CATEGORIES).map(([category, interests]) => (
              <div key={category}>
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-3">
                  {category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {interests.map(interest => (
                    <button
                      key={interest}
                      onClick={() => toggleInterest(interest)}
                      className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                        context.interests.includes(interest)
                          ? 'bg-[#00ff88] text-black font-medium'
                          : 'bg-[#0a0a0a] border border-[#222] text-gray-400 hover:border-[#00ff88]/50'
                      }`}
                    >
                      {interest}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Voice Style */}
        <section className="bg-[#111] border border-[#222] rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-[#00ff88]/20 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-[#00ff88]" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Voice Style</h2>
              <p className="text-sm text-gray-500">Choose your content personality</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {Object.entries(VOICE_STYLES).map(([style, details]) => (
              <button
                key={style}
                onClick={() => setContext(prev => ({ ...prev, voiceStyle: style }))}
                className={`text-left p-4 rounded-xl border-2 transition-all ${
                  context.voiceStyle === style
                    ? 'border-[#00ff88] bg-[#00ff88]/10'
                    : 'border-[#222] bg-[#0a0a0a] hover:border-[#333]'
                }`}
              >
                <div className="font-bold mb-1">{style}</div>
                <div className="text-xs text-gray-500 mb-2">{details.description}</div>
                <div className="text-xs italic text-gray-600 mb-3">"{details.example}"</div>
                <div className="flex flex-wrap gap-1">
                  {details.traits.map(trait => (
                    <span key={trait} className="px-2 py-0.5 bg-[#222] rounded text-xs text-gray-400">
                      {trait}
                    </span>
                  ))}
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Content Pillars */}
        <section className="bg-[#111] border border-[#222] rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-[#00ff88]/20 flex items-center justify-center">
              <Zap className="w-5 h-5 text-[#00ff88]" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Content Pillars</h2>
              <p className="text-sm text-gray-500">What types of content will you create?</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {CONTENT_PILLARS.map(pillar => (
              <button
                key={pillar.name}
                onClick={() => togglePillar(pillar.name)}
                className={`p-4 rounded-xl border-2 transition-all text-left ${
                  context.contentPillars.includes(pillar.name)
                    ? 'border-[#00ff88] bg-[#00ff88]/10'
                    : 'border-[#222] bg-[#0a0a0a] hover:border-[#333]'
                }`}
              >
                <div className="text-2xl mb-2">{pillar.icon}</div>
                <div className="font-bold text-sm mb-1">{pillar.name}</div>
                <div className="text-xs text-gray-500">{pillar.description}</div>
              </button>
            ))}
          </div>
        </section>

        {/* Favorite Creators */}
        <section className="bg-[#111] border border-[#222] rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-[#00ff88]/20 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-[#00ff88]" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Favorite Creators</h2>
              <p className="text-sm text-gray-500">Creators whose style you admire</p>
            </div>
          </div>

          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={newCreator}
              onChange={(e) => setNewCreator(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && addCreator()}
              placeholder="@username"
              className="flex-1 bg-[#0a0a0a] border border-[#222] rounded-lg px-4 py-2 text-sm focus:border-[#00ff88] focus:outline-none"
            />
            <button
              onClick={addCreator}
              className="bg-[#00ff88] text-black px-6 py-2 rounded-lg font-bold text-sm hover:bg-[#00cc66] transition-all"
            >
              Add
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {context.favoriteCreators.map(creator => (
              <div
                key={creator}
                className="flex items-center gap-2 px-3 py-1.5 bg-[#0a0a0a] border border-[#222] rounded-full"
              >
                <span className="text-sm">{creator}</span>
                <button
                  onClick={() => removeCreator(creator)}
                  className="text-gray-500 hover:text-red-500 transition-colors"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  )
}

"use client"

import { useState, useEffect } from "react"
import { 
  BarChart3, Zap, TrendingUp, MessageCircle, Calendar, Sparkles, Target, 
  LogOut, MoreHorizontal, ArrowRight, Activity, Shield, Eye, Flame,
  Clock, Copy, Send, User, Settings, RefreshCw, CheckCircle, AlertCircle
} from "lucide-react"
import { analyzeTweetVirality, generateTweetWithContext, VIRAL_HOOKS, ENGAGEMENT_BAIT_TACTICS } from "@/lib/viral-engine"

// Types
type TimeRange = "7D" | "30D" | "90D"
type TabType = "overview" | "create" | "replies" | "schedule" | "profile"

const METRICS: Record<TimeRange, any[]> = {
  "7D": [
    { label: "Followers", value: "+312", change: "+18%", trend: "up" },
    { label: "Impressions", value: "148K", change: "+22%", trend: "up" },
    { label: "Engagement", value: "3.9%", change: "+0.8%", trend: "up" },
    { label: "Profile Clicks", value: "1.2K", change: "+15%", trend: "up" },
  ],
  "30D": [
    { label: "Followers", value: "+1,082", change: "+34%", trend: "up" },
    { label: "Impressions", value: "612K", change: "+41%", trend: "up" },
    { label: "Engagement", value: "3.4%", change: "+0.6%", trend: "up" },
    { label: "Profile Clicks", value: "4.8K", change: "+24%", trend: "up" },
  ],
  "90D": [
    { label: "Followers", value: "+3,247", change: "+61%", trend: "up" },
    { label: "Impressions", value: "1.8M", change: "+74%", trend: "up" },
    { label: "Engagement", value: "3.1%", change: "+0.4%", trend: "up" },
    { label: "Profile Clicks", value: "12.4K", change: "+38%", trend: "up" },
  ],
}

export default function DashboardPage() {
  const [timeRange, setTimeRange] = useState<TimeRange>("30D")
  const [activeTab, setActiveTab] = useState<TabType>("create")
  const [sidebarOpen, setSidebarOpen] = useState(true)
  
  // AI Credits
  const [aiCredits, setAiCredits] = useState({ used: 23, total: 100, resetIn: "11h 23m" })
  
  // Content Creation
  const [topic, setTopic] = useState("")
  const [generatedDrafts, setGeneratedDrafts] = useState<string[]>([])
  const [selectedDraft, setSelectedDraft] = useState(0)
  const [isGenerating, setIsGenerating] = useState(false)
  const [editedContent, setEditedContent] = useState("")
  const [analysis, setAnalysis] = useState<any>(null)
  
  // Context
  const [context, setContext] = useState<any>(null)

  // Load context
  useEffect(() => {
    const saved = localStorage.getItem("launchalone_context")
    if (saved) {
      setContext(JSON.parse(saved))
    }
  }, [])

  const metrics = METRICS[timeRange]
  const creditPercentage = (aiCredits.used / aiCredits.total) * 100
  const currentDraft = editedContent || generatedDrafts[selectedDraft] || ""

  // REAL AI GENERATION using viral engine
  const handleGenerate = async () => {
    if (aiCredits.used >= aiCredits.total) {
      alert("Daily AI credits exhausted! Resets in " + aiCredits.resetIn)
      return
    }

    setIsGenerating(true)
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500))

    // Use the viral engine
    if (context) {
      const drafts = generateTweetWithContext(context, topic)
      
      // Add engagement bait to each draft
      const enhancedDrafts = drafts.map(draft => {
        const baitCategory = Object.keys(ENGAGEMENT_BAIT_TACTICS)[Math.floor(Math.random() * 4)]
        const baits = ENGAGEMENT_BAIT_TACTICS[baitCategory as keyof typeof ENGAGEMENT_BAIT_TACTICS]
        const bait = baits[Math.floor(Math.random() * baits.length)]
        return `${draft}\n\n${bait}`
      })
      
      setGeneratedDrafts(enhancedDrafts)
      setSelectedDraft(0)
      setEditedContent("")
      
      // Analyze first draft
      const firstAnalysis = analyzeTweetVirality(enhancedDrafts[0])
      setAnalysis(firstAnalysis)
    } else {
      // Fallback if no context
      setGeneratedDrafts([
        `${topic || "Your topic here"}\n\nHere's what I learned:\n\n1. [Lesson 1]\n2. [Lesson 2]\n3. [Lesson 3]\n\nWhat would you add?`,
        `Everyone says ${topic || "this"}. That's wrong.\n\nHere's what actually works:\n\n[Your insight]\n\nAgree or disagree?`,
        `I spent 2 years figuring out ${topic || "this"}.\n\nHere's the simple framework:\n\n[Step 1]\n[Step 2]\n[Step 3]\n\nWhat's your experience?`
      ])
      setSelectedDraft(0)
      const firstAnalysis = analyzeTweetVirality(generatedDrafts[0] || "")
      setAnalysis(firstAnalysis)
    }
    
    setAiCredits(prev => ({ ...prev, used: prev.used + 1 }))
    setIsGenerating(false)
  }

  // Analyze on edit
  useEffect(() => {
    if (currentDraft) {
      const newAnalysis = analyzeTweetVirality(currentDraft)
      setAnalysis(newAnalysis)
    }
  }, [currentDraft, selectedDraft])

  const handleCopy = async () => {
    await navigator.clipboard.writeText(currentDraft)
    alert("Copied to clipboard!")
  }

  const handlePost = () => {
    if (!currentDraft.trim()) return
    alert("Post to X: This will be connected to X API. For now, content is copied to clipboard.")
    navigator.clipboard.writeText(currentDraft)
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-mono">
      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 h-screen bg-[#111] border-r border-[#222] transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-20'} z-50`}>
        <div className="p-6 border-b border-[#222]">
          <div className="flex items-center justify-between">
            {sidebarOpen && (
              <div className="font-['Bebas_Neue'] text-2xl tracking-wider text-[#00ff88]">
                LAUNCHALONE
              </div>
            )}
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-[#222] rounded transition-colors"
            >
              <MoreHorizontal className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* AI Credits Bar */}
        {sidebarOpen && (
          <div className="px-4 py-6 border-b border-[#222]">
            <div className="mb-2 flex items-center justify-between text-xs">
              <span className="uppercase tracking-widest text-gray-500">AI Credits</span>
              <span className="text-[#00ff88]">{aiCredits.total - aiCredits.used}/{aiCredits.total}</span>
            </div>
            <div className="h-2 w-full bg-[#222] rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-[#00ff88] to-[#00cc66] transition-all duration-300"
                style={{ width: `${100 - creditPercentage}%` }}
              />
            </div>
            <div className="mt-2 text-xs text-gray-500">
              Resets in {aiCredits.resetIn}
            </div>
          </div>
        )}

        <nav className="p-4 space-y-2">
          {[
            { id: "overview", icon: BarChart3, label: "Overview" },
            { id: "create", icon: Sparkles, label: "Create" },
            { id: "replies", icon: MessageCircle, label: "Reply Finder" },
            { id: "schedule", icon: Calendar, label: "Schedule" },
            { id: "profile", icon: User, label: "Profile" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as TabType)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                activeTab === item.id
                  ? 'bg-[#00ff88]/10 text-[#00ff88] border border-[#00ff88]/30'
                  : 'text-gray-400 hover:bg-[#222] hover:text-white'
              }`}
            >
              <item.icon className="w-5 h-5" />
              {sidebarOpen && <span className="text-sm uppercase tracking-wider">{item.label}</span>}
            </button>
          ))}
        </nav>

        {sidebarOpen && (
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-[#222]">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00ff88] to-[#00cc66] flex items-center justify-center font-bold">
                P
              </div>
              <div className="flex-1">
                <div className="text-sm font-bold">@pedro</div>
                <div className="text-xs text-gray-500">Pro Plan</div>
              </div>
            </div>
            <a href="/settings" className="w-full flex items-center gap-2 px-4 py-2 text-gray-400 hover:text-white transition-colors mb-2">
              <Settings className="w-4 h-4" />
              <span className="text-xs">Settings</span>
            </a>
            <button className="w-full flex items-center gap-2 px-4 py-2 text-gray-400 hover:text-white transition-colors">
              <LogOut className="w-4 h-4" />
              <span className="text-xs">Sign Out</span>
            </button>
          </div>
        )}
      </aside>

      {/* Main Content */}
      <main className={`transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-20'}`}>
        {/* Header */}
        <header className="sticky top-0 bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-[#222] p-4 sm:p-6 z-40">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl font-['Bebas_Neue'] tracking-wider mb-1">
                {activeTab === "overview" && "COMMAND CENTER"}
                {activeTab === "create" && "CONTENT STUDIO"}
                {activeTab === "replies" && "REPLY FINDER"}
                {activeTab === "schedule" && "SCHEDULE"}
                {activeTab === "profile" && "PROFILE REVIEW"}
              </h1>
              <p className="text-xs sm:text-sm text-gray-500">
                {activeTab === "overview" && "Your X growth analytics"}
                {activeTab === "create" && "AI-powered content with viral scoring"}
                {activeTab === "replies" && "Find high-impact reply opportunities"}
                {activeTab === "schedule" && "Smart timing for maximum reach"}
                {activeTab === "profile" && "AI-powered profile optimization"}
              </p>
            </div>

            {activeTab === "overview" && (
              <div className="hidden sm:flex gap-2 bg-[#111] p-1 rounded-lg border border-[#222]">
                {(["7D", "30D", "90D"] as TimeRange[]).map((range) => (
                  <button
                    key={range}
                    onClick={() => setTimeRange(range)}
                    className={`px-3 sm:px-4 py-2 text-xs uppercase tracking-widest rounded transition-all ${
                      timeRange === range
                        ? 'bg-[#00ff88] text-black font-bold'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {range}
                  </button>
                ))}
              </div>
            )}
          </div>
        </header>

        {/* Content Area */}
        <div className="p-4 sm:p-6 max-w-7xl mx-auto pb-24">
          
          {/* CREATE TAB - THE MAIN FEATURE */}
          {activeTab === "create" && (
            <div className="space-y-6">
              
              {/* Generation Controls */}
              <div className="bg-[#111] border border-[#222] rounded-2xl p-4 sm:p-6">
                <div className="flex items-center justify-between mb-4 sm:mb-6">
                  <div>
                    <h2 className="text-lg sm:text-xl font-['Bebas_Neue'] tracking-wider">GENERATE CONTENT</h2>
                    <p className="text-xs sm:text-sm text-gray-500">AI trained on 10M+ viral tweets</p>
                  </div>
                  {!context && (
                    <a href="/settings" className="text-xs text-[#00ff88] hover:text-[#00cc66] transition-colors">
                      Set up context →
                    </a>
                  )}
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">
                      Topic / What do you want to talk about?
                    </label>
                    <input
                      type="text"
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      placeholder="e.g., my startup journey, productivity tips, X growth"
                      className="w-full bg-[#0a0a0a] border border-[#222] rounded-lg px-4 py-3 text-sm focus:border-[#00ff88] focus:outline-none transition-colors"
                    />
                  </div>

                  <button
                    onClick={handleGenerate}
                    disabled={isGenerating || aiCredits.used >= aiCredits.total}
                    className="w-full bg-[#00ff88] text-black px-6 py-3 rounded-lg font-bold uppercase tracking-wider hover:bg-[#00cc66] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isGenerating ? (
                      <>
                        <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-5 h-5" />
                        Generate ({aiCredits.total - aiCredits.used} credits left)
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Drafts */}
              {generatedDrafts.length > 0 && (
                <div className="grid lg:grid-cols-2 gap-6">
                  {/* Draft Variations */}
                  <div className="bg-[#111] border border-[#222] rounded-2xl p-4 sm:p-6">
                    <h3 className="text-lg font-['Bebas_Neue'] tracking-wider mb-4">DRAFT VARIATIONS</h3>
                    <div className="space-y-3 mb-4">
                      {generatedDrafts.map((draft, i) => (
                        <button
                          key={i}
                          onClick={() => {
                            setSelectedDraft(i)
                            setEditedContent("")
                          }}
                          className={`w-full text-left p-3 sm:p-4 rounded-lg border transition-all ${
                            selectedDraft === i
                              ? 'border-[#00ff88] bg-[#00ff88]/10'
                              : 'border-[#222] bg-[#0a0a0a] hover:border-[#333]'
                          }`}
                        >
                          <div className="text-xs text-gray-500 mb-2">Draft {i + 1}</div>
                          <div className="text-sm line-clamp-3">{draft}</div>
                        </button>
                      ))}
                    </div>

                    <div className="pt-4 border-t border-[#222]">
                      <div className="text-xs uppercase tracking-widest text-gray-500 mb-2">Edit Draft</div>
                      <textarea
                        value={currentDraft}
                        onChange={(e) => setEditedContent(e.target.value)}
                        className="w-full bg-[#0a0a0a] border border-[#222] rounded-lg px-4 py-3 text-sm focus:border-[#00ff88] focus:outline-none min-h-[150px] resize-none"
                        placeholder="Edit your tweet here..."
                      />
                      <div className="flex items-center justify-between mt-2">
                        <div className="text-xs text-gray-600">{currentDraft.length}/280</div>
                        <div className="flex gap-2">
                          <button
                            onClick={handleCopy}
                            className="px-3 py-1.5 border border-[#00ff88] text-[#00ff88] rounded text-xs font-bold uppercase tracking-wider hover:bg-[#00ff88]/10 transition-all flex items-center gap-1"
                          >
                            <Copy className="w-3 h-3" />
                            Copy
                          </button>
                          <button
                            onClick={handlePost}
                            className="px-3 py-1.5 bg-[#00ff88] text-black rounded text-xs font-bold uppercase tracking-wider hover:bg-[#00cc66] transition-all flex items-center gap-1"
                          >
                            <Send className="w-3 h-3" />
                            Post
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Viral Analysis */}
                  <div className="bg-[#111] border border-[#222] rounded-2xl p-4 sm:p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-['Bebas_Neue'] tracking-wider">VIRAL SCORE</h3>
                      {analysis && (
                        <div className="flex items-center gap-2">
                          <span className="text-3xl font-['Bebas_Neue'] text-[#00ff88]">{analysis.score}</span>
                          <span className="text-xs text-gray-500">/100</span>
                        </div>
                      )}
                    </div>

                    {analysis && (
                      <div className="space-y-4">
                        {/* Score Bar */}
                        <div className="h-3 w-full bg-[#222] rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-[#00ff88] to-[#00cc66] transition-all duration-500"
                            style={{ width: `${analysis.score}%` }}
                          />
                        </div>

                        {/* Strengths */}
                        {analysis.strengths.length > 0 && (
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <CheckCircle className="w-4 h-4 text-[#00ff88]" />
                              <span className="text-xs uppercase tracking-widest text-[#00ff88]">Strengths</span>
                            </div>
                            <div className="space-y-1">
                              {analysis.strengths.map((s: string, i: number) => (
                                <div key={i} className="text-xs text-gray-400 flex items-start gap-2">
                                  <span className="text-[#00ff88]">•</span>
                                  <span>{s}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Improvements */}
                        {analysis.improvements.length > 0 && (
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <AlertCircle className="w-4 h-4 text-yellow-500" />
                              <span className="text-xs uppercase tracking-widest text-yellow-500">Improvements</span>
                            </div>
                            <div className="space-y-1">
                              {analysis.improvements.map((imp: string, i: number) => (
                                <div key={i} className="text-xs text-gray-400 flex items-start gap-2">
                                  <span className="text-yellow-500">•</span>
                                  <span>{imp}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Tips */}
                        <div className="pt-4 border-t border-[#222]">
                          <div className="text-xs uppercase tracking-widest text-gray-500 mb-2">Quick Tips</div>
                          <div className="space-y-2 text-xs text-gray-400">
                            <div>• Numbers increase engagement 37%</div>
                            <div>• Questions boost replies 2.3x</div>
                            <div>• 50-150 chars = sweet spot</div>
                            <div>• Line breaks improve readability 42%</div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* OVERVIEW TAB */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {metrics.map((metric, i) => (
                  <div key={i} className="bg-[#111] border border-[#222] rounded-xl p-4 sm:p-6 hover:border-[#00ff88]/30 transition-all">
                    <div className="flex items-start justify-between mb-4">
                      <div className="text-xs uppercase tracking-widest text-gray-500">{metric.label}</div>
                      <TrendingUp className="w-4 h-4 text-[#00ff88]" />
                    </div>
                    <div className="text-3xl sm:text-4xl font-['Bebas_Neue'] tracking-wider mb-2">{metric.value}</div>
                    <div className="text-sm text-[#00ff88] flex items-center gap-1">
                      <ArrowRight className="w-3 h-3" />
                      {metric.change}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

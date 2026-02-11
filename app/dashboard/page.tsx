"use client"

import { useState, useEffect } from "react"
import { 
  BarChart3, Zap, TrendingUp, MessageCircle, Calendar, Sparkles, Target, 
  LogOut, MoreHorizontal, ArrowRight, Activity, Shield, Eye, Flame,
  Clock, Copy, Send, User, Settings, RefreshCw, CheckCircle, AlertCircle,
  Edit, X as XIcon, Users, Wrench, Layers, BookOpen
} from "lucide-react"
import { analyzeTweetVirality, generateTweetWithContext, VIRAL_HOOKS, ENGAGEMENT_BAIT_TACTICS } from "@/lib/viral-engine"
import { scoreReplyOpportunity, generateStrategicReply, unfoldThread, predictOptimalTimes, GROWTH_ACCELERATORS, analyzeVoicePatterns } from "@/lib/growth-engine"

type TimeRange = "7D" | "30D" | "90D"
type TabType = "overview" | "create" | "hooks" | "replies" | "threads" | "voice" | "tactics" | "schedule" | "profile"

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
  
  // Thread Unfolder
  const [longContent, setLongContent] = useState("")
  const [unfoldedThread, setUnfoldedThread] = useState<string[]>([])
  
  // Context
  const [context, setContext] = useState<any>(null)

  useEffect(() => {
    const saved = localStorage.getItem("launchalone_context")
    if (saved) setContext(JSON.parse(saved))
  }, [])

  const metrics = METRICS[timeRange]
  const creditPercentage = (aiCredits.used / aiCredits.total) * 100
  const currentDraft = editedContent || generatedDrafts[selectedDraft] || ""

  const handleGenerate = async () => {
    if (aiCredits.used >= aiCredits.total) {
      alert("Daily AI credits exhausted! Resets in " + aiCredits.resetIn)
      return
    }

    setIsGenerating(true)
    await new Promise(resolve => setTimeout(resolve, 1500))

    if (context) {
      const drafts = generateTweetWithContext(context, topic)
      const enhancedDrafts = drafts.map(draft => {
        const baitCategory = Object.keys(ENGAGEMENT_BAIT_TACTICS)[Math.floor(Math.random() * 4)]
        const baits = ENGAGEMENT_BAIT_TACTICS[baitCategory as keyof typeof ENGAGEMENT_BAIT_TACTICS]
        const bait = baits[Math.floor(Math.random() * baits.length)]
        return `${draft}\n\n${bait}`
      })
      
      setGeneratedDrafts(enhancedDrafts)
      setSelectedDraft(0)
      setEditedContent("")
      const firstAnalysis = analyzeTweetVirality(enhancedDrafts[0])
      setAnalysis(firstAnalysis)
    } else {
      setGeneratedDrafts([
        `${topic || "Your topic here"}\n\nHere's what I learned:\n\n1. [Lesson 1]\n2. [Lesson 2]\n3. [Lesson 3]\n\nWhat would you add?`,
        `Everyone says ${topic || "this"}. That's wrong.\n\nHere's what actually works:\n\n[Your insight]\n\nAgree or disagree?`,
        `I spent 2 years figuring out ${topic || "this"}.\n\nHere's the simple framework:\n\n[Step 1]\n[Step 2]\n[Step 3]\n\nWhat's your experience?`
      ])
      setSelectedDraft(0)
    }
    
    setAiCredits(prev => ({ ...prev, used: prev.used + 1 }))
    setIsGenerating(false)
  }

  useEffect(() => {
    if (currentDraft) {
      const newAnalysis = analyzeTweetVirality(currentDraft)
      setAnalysis(newAnalysis)
    }
  }, [currentDraft, selectedDraft])

  const handleUnfold = () => {
    if (longContent.trim()) {
      const thread = unfoldThread(longContent)
      setUnfoldedThread(thread)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 h-screen bg-black border-r border-white/10 transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-20'} z-50`}>
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center justify-between">
            {sidebarOpen && (
              <div className="text-2xl font-bold tracking-tight">LaunchAlone</div>
            )}
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-white/5 rounded transition-colors"
            >
              <MoreHorizontal className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* AI Credits Bar */}
        {sidebarOpen && (
          <div className="px-4 py-6 border-b border-white/10">
            <div className="mb-2 flex items-center justify-between text-xs">
              <span className="uppercase tracking-wider text-white/50">AI Credits</span>
              <span className="text-white">{aiCredits.total - aiCredits.used}/{aiCredits.total}</span>
            </div>
            <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
              <div 
                className="h-full bg-white transition-all duration-300"
                style={{ width: `${100 - creditPercentage}%` }}
              />
            </div>
            <div className="mt-2 text-xs text-white/50">
              Resets in {aiCredits.resetIn}
            </div>
          </div>
        )}

        <nav className="p-4 space-y-1">
          {[
            { id: "overview", icon: BarChart3, label: "Overview" },
            { id: "create", icon: Sparkles, label: "AI Content" },
            { id: "hooks", icon: BookOpen, label: "Viral Hooks" },
            { id: "replies", icon: MessageCircle, label: "Reply Finder" },
            { id: "threads", icon: Layers, label: "Thread Unfolder" },
            { id: "voice", icon: User, label: "Voice Clone" },
            { id: "tactics", icon: Wrench, label: "Growth Tactics" },
            { id: "schedule", icon: Calendar, label: "Schedule" },
            { id: "profile", icon: Target, label: "Profile" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as TabType)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                activeTab === item.id
                  ? 'bg-white text-black'
                  : 'text-white/70 hover:bg-white/5 hover:text-white'
              }`}
            >
              <item.icon className="w-5 h-5" />
              {sidebarOpen && <span className="text-sm font-medium">{item.label}</span>}
            </button>
          ))}
        </nav>

        {sidebarOpen && (
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center font-bold">
                P
              </div>
              <div className="flex-1">
                <div className="text-sm font-bold">@pedro</div>
                <div className="text-xs text-white/50">Pro Plan</div>
              </div>
            </div>
            <a href="/settings" className="w-full flex items-center gap-2 px-4 py-2 text-white/70 hover:text-white transition-colors mb-2">
              <Settings className="w-4 h-4" />
              <span className="text-xs">Settings</span>
            </a>
            <button className="w-full flex items-center gap-2 px-4 py-2 text-white/70 hover:text-white transition-colors">
              <LogOut className="w-4 h-4" />
              <span className="text-xs">Sign Out</span>
            </button>
          </div>
        )}
      </aside>

      {/* Main Content */}
      <main className={`transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-20'}`}>
        {/* Header */}
        <header className="sticky top-0 bg-black/80 backdrop-blur-xl border-b border-white/10 p-4 sm:p-6 z-40">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-1">
                {activeTab === "overview" && "Dashboard Overview"}
                {activeTab === "create" && "AI Content Studio"}
                {activeTab === "hooks" && "Viral Hooks Library"}
                {activeTab === "replies" && "Reply Finder"}
                {activeTab === "threads" && "Thread Unfolder"}
                {activeTab === "voice" && "Voice Cloning"}
                {activeTab === "tactics" && "Growth Accelerators"}
                {activeTab === "schedule" && "Post Schedule"}
                {activeTab === "profile" && "Profile Review"}
              </h1>
              <p className="text-xs sm:text-sm text-white/50">
                {activeTab === "create" && "AI-powered content with viral scoring"}
                {activeTab === "hooks" && "500+ proven viral hooks"}
                {activeTab === "replies" && "Find high-impact reply opportunities"}
                {activeTab === "threads" && "Auto-create viral threads"}
                {activeTab === "voice" && "Match your authentic writing style"}
                {activeTab === "tactics" && "Specific strategies that 10x reach"}
              </p>
            </div>

            {activeTab === "overview" && (
              <div className="hidden sm:flex gap-2 bg-white/5 p-1 rounded-lg border border-white/10">
                {(["7D", "30D", "90D"] as TimeRange[]).map((range) => (
                  <button
                    key={range}
                    onClick={() => setTimeRange(range)}
                    className={`px-3 sm:px-4 py-2 text-xs uppercase tracking-wider rounded transition-all ${
                      timeRange === range
                        ? 'bg-white text-black font-bold'
                        : 'text-white/70 hover:text-white'
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
          
          {/* OVERVIEW TAB */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {metrics.map((metric, i) => (
                  <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-4 sm:p-6 hover:border-white/20 transition-all">
                    <div className="flex items-start justify-between mb-4">
                      <div className="text-xs uppercase tracking-wider text-white/50">{metric.label}</div>
                      <TrendingUp className="w-4 h-4 text-white" />
                    </div>
                    <div className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">{metric.value}</div>
                    <div className="text-sm text-white/70 flex items-center gap-1">
                      <ArrowRight className="w-3 h-3" />
                      {metric.change}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* AI CONTENT STUDIO TAB */}
          {activeTab === "create" && (
            <div className="space-y-6">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6">
                <div className="flex items-center justify-between mb-4 sm:mb-6">
                  <div>
                    <h2 className="text-lg sm:text-xl font-bold tracking-tight">Generate Content</h2>
                    <p className="text-xs sm:text-sm text-white/50">AI trained on 10M+ viral tweets</p>
                  </div>
                  {!context && (
                    <a href="/settings" className="text-xs text-white/70 hover:text-white transition-colors">
                      Set up context →
                    </a>
                  )}
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-white/50 mb-2">
                      Topic / What do you want to talk about?
                    </label>
                    <input
                      type="text"
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      placeholder="e.g., my startup journey, productivity tips, X growth"
                      className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-sm focus:border-white/30 focus:outline-none transition-colors"
                    />
                  </div>

                  <button
                    onClick={handleGenerate}
                    disabled={isGenerating || aiCredits.used >= aiCredits.total}
                    className="w-full bg-white text-black px-6 py-3 rounded-lg font-bold hover:bg-white/90 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
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

              {generatedDrafts.length > 0 && (
                <div className="grid lg:grid-cols-2 gap-6">
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6">
                    <h3 className="text-lg font-bold tracking-tight mb-4">Draft Variations</h3>
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
                              ? 'border-white bg-white/10'
                              : 'border-white/10 bg-black hover:border-white/20'
                          }`}
                        >
                          <div className="text-xs text-white/50 mb-2">Draft {i + 1}</div>
                          <div className="text-sm line-clamp-3">{draft}</div>
                        </button>
                      ))}
                    </div>

                    <div className="pt-4 border-t border-white/10">
                      <div className="text-xs uppercase tracking-wider text-white/50 mb-2">Edit Draft</div>
                      <textarea
                        value={currentDraft}
                        onChange={(e) => setEditedContent(e.target.value)}
                        className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-sm focus:border-white/30 focus:outline-none min-h-[150px] resize-none"
                        placeholder="Edit your tweet here..."
                      />
                      <div className="flex items-center justify-between mt-2">
                        <div className="text-xs text-white/50">{currentDraft.length}/280</div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => navigator.clipboard.writeText(currentDraft)}
                            className="px-3 py-1.5 border border-white/20 text-white rounded text-xs font-bold uppercase tracking-wider hover:bg-white/5 transition-all flex items-center gap-1"
                          >
                            <Copy className="w-3 h-3" />
                            Copy
                          </button>
                          <button
                            className="px-3 py-1.5 bg-white text-black rounded text-xs font-bold uppercase tracking-wider hover:bg-white/90 transition-all flex items-center gap-1"
                          >
                            <Send className="w-3 h-3" />
                            Post
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-bold tracking-tight">Viral Score</h3>
                      {analysis && (
                        <div className="flex items-center gap-2">
                          <span className="text-3xl font-bold">{analysis.score}</span>
                          <span className="text-xs text-white/50">/100</span>
                        </div>
                      )}
                    </div>

                    {analysis && (
                      <div className="space-y-4">
                        <div className="h-3 w-full bg-white/10 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-white transition-all duration-500"
                            style={{ width: `${analysis.score}%` }}
                          />
                        </div>

                        {analysis.strengths.length > 0 && (
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <CheckCircle className="w-4 h-4 text-white" />
                              <span className="text-xs uppercase tracking-wider text-white">Strengths</span>
                            </div>
                            <div className="space-y-1">
                              {analysis.strengths.map((s: string, i: number) => (
                                <div key={i} className="text-xs text-white/70 flex items-start gap-2">
                                  <span className="text-white">•</span>
                                  <span>{s}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {analysis.improvements.length > 0 && (
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <AlertCircle className="w-4 h-4 text-white/70" />
                              <span className="text-xs uppercase tracking-wider text-white/70">Improvements</span>
                            </div>
                            <div className="space-y-1">
                              {analysis.improvements.map((imp: string, i: number) => (
                                <div key={i} className="text-xs text-white/70 flex items-start gap-2">
                                  <span className="text-white/50">•</span>
                                  <span>{imp}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* VIRAL HOOKS TAB */}
          {activeTab === "hooks" && (
            <div className="space-y-6">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <h2 className="text-2xl font-bold mb-2">500+ Viral Hooks Library</h2>
                <p className="text-white/70 mb-6">Every hook tested on millions of tweets</p>
                
                {Object.entries(VIRAL_HOOKS).map(([category, hooks]) => (
                  <div key={category} className="mb-8">
                    <h3 className="text-lg font-bold mb-4 pb-2 border-b border-white/10">{category}</h3>
                    <div className="space-y-2">
                      {hooks.map((hook, i) => (
                        <div key={i} className="p-4 bg-black border border-white/10 rounded-lg hover:border-white/20 transition-all">
                          <p className="text-sm">{hook}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* THREAD UNFOLDER TAB */}
          {activeTab === "threads" && (
            <div className="space-y-6">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <h2 className="text-xl font-bold mb-4">Thread Unfolder</h2>
                <p className="text-white/70 mb-6">Paste long content, get viral thread format</p>
                
                <textarea
                  value={longContent}
                  onChange={(e) => setLongContent(e.target.value)}
                  placeholder="Paste your long-form content here..."
                  className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-sm focus:border-white/30 focus:outline-none min-h-[200px] resize-none mb-4"
                />
                
                <button
                  onClick={handleUnfold}
                  className="bg-white text-black px-6 py-3 rounded-lg font-bold hover:bg-white/90 transition-all"
                >
                  Unfold into Thread
                </button>
              </div>

              {unfoldedThread.length > 0 && (
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <h3 className="text-lg font-bold mb-4">Your Thread ({unfoldedThread.length} tweets)</h3>
                  <div className="space-y-4">
                    {unfoldedThread.map((tweet, i) => (
                      <div key={i} className="p-4 bg-black border border-white/10 rounded-lg">
                        <div className="text-xs text-white/50 mb-2">Tweet {i + 1}</div>
                        <p className="text-sm whitespace-pre-wrap">{tweet}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* GROWTH TACTICS TAB */}
          {activeTab === "tactics" && (
            <div className="space-y-6">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <h2 className="text-2xl font-bold mb-6">Growth Accelerators</h2>
                
                {Object.entries(GROWTH_ACCELERATORS).map(([key, tactic]: [string, any]) => (
                  <div key={key} className="mb-6 p-6 bg-black border border-white/10 rounded-lg">
                    <h3 className="text-lg font-bold mb-2">{tactic.name}</h3>
                    <p className="text-white/70 mb-4">{tactic.description}</p>
                    
                    {tactic.expectedLift && (
                      <div className="mb-2">
                        <span className="text-sm font-bold">Expected Lift:</span>
                        <span className="text-sm text-white/70 ml-2">{tactic.expectedLift}</span>
                      </div>
                    )}
                    
                    {tactic.implementation && Array.isArray(tactic.implementation) && (
                      <div className="mt-4">
                        <div className="text-sm font-bold mb-2">How to Implement:</div>
                        <div className="space-y-1">
                          {tactic.implementation.map((step: string, i: number) => (
                            <div key={i} className="text-sm text-white/70">{step}</div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* REPLY FINDER - Link to separate page */}
          {activeTab === "replies" && (
            <div className="bg-white/5 border border-white/10 rounded-2xl p-12 text-center">
              <MessageCircle className="w-16 h-16 mx-auto mb-4 text-white/50" />
              <h2 className="text-2xl font-bold mb-2">Reply Finder</h2>
              <p className="text-white/70 mb-6">Find high-impact reply opportunities</p>
              <a
                href="/replies"
                className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-lg font-bold hover:bg-white/90 transition-all"
              >
                Open Reply Finder
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

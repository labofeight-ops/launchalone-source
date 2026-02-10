"use client"

import { useState, useMemo, useEffect } from "react"
import { 
  BarChart3, Zap, TrendingUp, MessageCircle, Calendar, Sparkles, Target, 
  LogOut, MoreHorizontal, ArrowRight, Activity, Shield, Eye, Flame,
  Clock, Copy, Send, User, Settings
} from "lucide-react"

// Types
type TimeRange = "7D" | "30D" | "90D"
type TabType = "overview" | "content" | "replies" | "schedule" | "profile"

// [Previous data structures remain the same - METRICS, REPLY_OPPORTUNITIES, SCHEDULED_POSTS]
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

const REPLY_OPPORTUNITIES = [
  {
    id: "1",
    author: "Sarah Chen",
    handle: "@sarahbuilds",
    tweet: "Finally hit 10K followers! The biggest lesson: consistency beats perfection every single time.",
    score: 94,
    suggestedReply: "Congrats on 10K! Totally agree on consistency. What I'd add: reply strategy matters just as much. Most people post and disappear. Reply to 20 posts daily in your niche and watch what happens.",
    time: "2h ago"
  },
  {
    id: "2",
    author: "Mike Johnson",
    handle: "@mikegrows",
    tweet: "My engagement is stuck at 1.5%. Posting daily but seeing zero growth. What am I missing?",
    score: 89,
    suggestedReply: "The issue is probably timing + reply placement. Try this: post at peak hours (check your analytics), then immediately reply to 5-10 trending posts in your niche. Your profile taps will spike.",
    time: "1h ago"
  },
  {
    id: "3",
    author: "Alex Rivera",
    handle: "@alexonx",
    tweet: "Anyone have a playbook for turning X followers into actual customers?",
    score: 86,
    suggestedReply: "Here's what works: clear offer in bio, proof in your content, and strategic CTAs in high-performing posts. Most people miss the bio optimization part.",
    time: "45m ago"
  }
]

const SCHEDULED_POSTS = [
  {
    id: "1",
    content: "The reply habit that added 300 followers in 7 days. Here's the exact framework...",
    time: "Today, 6:00 PM",
    status: "scheduled" as const
  },
  {
    id: "2",
    content: "Most people think X growth is about posting. It's actually about strategic replies. Here's why...",
    time: "Tomorrow, 12:00 PM",
    status: "scheduled" as const
  }
]

export default function DashboardPage() {
  const [timeRange, setTimeRange] = useState<TimeRange>("30D")
  const [activeTab, setActiveTab] = useState<TabType>("overview")
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [contentTopic, setContentTopic] = useState("")
  const [contentStyle, setContentStyle] = useState("founder-story")
  const [generatedContent, setGeneratedContent] = useState("")
  const [signalScore, setSignalScore] = useState(0)
  
  // AI Credits System
  const [aiCredits, setAiCredits] = useState({
    used: 23,
    total: 100,
    resetIn: "11h 23m"
  })

  const metrics = METRICS[timeRange]

  const generateContent = () => {
    // Deduct credits
    if (aiCredits.used >= aiCredits.total) {
      alert("Daily AI credits exhausted! Resets in " + aiCredits.resetIn)
      return
    }

    const templates: Record<string, string[]> = {
      "founder-story": [
        `Built ${contentTopic || "my product"} to solve my own problem. Here's what I learned after 90 days of execution...`,
        `The biggest mistake I made with ${contentTopic || "my launch"}? Thinking I needed everything perfect. Here's what actually worked...`,
      ],
      "contrarian": [
        `Everyone tells you to ${contentTopic || "post daily"}. I did the opposite and 3X'd my growth. Here's why...`,
        `Unpopular opinion about ${contentTopic || "X growth"}: Most advice is wrong. Here's what actually works...`,
      ],
      "framework": [
        `The simple framework I use for ${contentTopic || "consistent growth"}: 1. Post once daily 2. Reply to 20 posts 3. Analyze what works 4. Repeat`,
        `My 3-step system for ${contentTopic || "X success"}: First, build trust. Second, provide value. Third, make the ask. Most skip step 1.`,
      ]
    }

    const styleTemplates = templates[contentStyle] || templates["founder-story"]
    const random = styleTemplates[Math.floor(Math.random() * styleTemplates.length)]
    setGeneratedContent(random)
    setSignalScore(Math.floor(Math.random() * 15) + 85)
    
    // Deduct credit
    setAiCredits(prev => ({ ...prev, used: prev.used + 1 }))
  }

  const creditPercentage = (aiCredits.used / aiCredits.total) * 100

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

        {/* AI Credits Bar - NEW */}
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
            { id: "content", icon: Sparkles, label: "Content Studio" },
            { id: "replies", icon: MessageCircle, label: "Reply Finder" },
            { id: "schedule", icon: Calendar, label: "Schedule" },
            { id: "profile", icon: User, label: "Profile Review" },
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
            <button className="w-full flex items-center gap-2 px-4 py-2 text-gray-400 hover:text-white transition-colors">
              <Settings className="w-4 h-4" />
              <span className="text-xs">Settings</span>
            </button>
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
        <header className="sticky top-0 bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-[#222] p-6 z-40">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-['Bebas_Neue'] tracking-wider mb-1">
                {activeTab === "overview" && "COMMAND CENTER"}
                {activeTab === "content" && "CONTENT STUDIO"}
                {activeTab === "replies" && "REPLY OPPORTUNITIES"}
                {activeTab === "schedule" && "POST SCHEDULE"}
                {activeTab === "profile" && "PROFILE REVIEW"}
              </h1>
              <p className="text-sm text-gray-500">
                {activeTab === "overview" && "Your X growth engine running 24/7"}
                {activeTab === "content" && "AI-powered content generation with signal scoring"}
                {activeTab === "replies" && "High-impact reply opportunities refreshed every 5min"}
                {activeTab === "schedule" && "Smart timing for maximum reach"}
                {activeTab === "profile" && "AI-powered profile optimization"}
              </p>
            </div>

            {activeTab === "overview" && (
              <div className="flex gap-2 bg-[#111] p-1 rounded-lg border border-[#222]">
                {(["7D", "30D", "90D"] as TimeRange[]).map((range) => (
                  <button
                    key={range}
                    onClick={() => setTimeRange(range)}
                    className={`px-4 py-2 text-xs uppercase tracking-widest rounded transition-all ${
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
        <div className="p-6 max-w-7xl mx-auto">
          {/* OVERVIEW TAB */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Metrics Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {metrics.map((metric, i) => (
                  <div key={i} className="bg-[#111] border border-[#222] rounded-xl p-6 hover:border-[#00ff88]/30 transition-all group">
                    <div className="flex items-start justify-between mb-4">
                      <div className="text-xs uppercase tracking-widest text-gray-500">
                        {metric.label}
                      </div>
                      <TrendingUp className="w-4 h-4 text-[#00ff88]" />
                    </div>
                    <div className="text-4xl font-['Bebas_Neue'] tracking-wider mb-2">
                      {metric.value}
                    </div>
                    <div className="text-sm text-[#00ff88] flex items-center gap-1">
                      <ArrowRight className="w-3 h-3" />
                      {metric.change}
                    </div>
                  </div>
                ))}
              </div>

              {/* Growth Chart */}
              <div className="bg-[#111] border border-[#222] rounded-xl p-6">
                <h3 className="text-lg font-['Bebas_Neue'] tracking-wider mb-4">GROWTH TRAJECTORY</h3>
                <div className="h-64 flex items-end justify-between gap-2">
                  {Array.from({ length: 30 }).map((_, i) => {
                    const height = Math.random() * 100
                    return (
                      <div
                        key={i}
                        className="flex-1 bg-gradient-to-t from-[#00ff88]/50 to-[#00ff88]/10 rounded-t hover:from-[#00ff88] transition-all cursor-pointer"
                        style={{ height: `${height}%` }}
                      />
                    )
                  })}
                </div>
              </div>

              {/* Top Content + Account Health */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-[#111] border border-[#222] rounded-xl p-6">
                  <h3 className="text-lg font-['Bebas_Neue'] tracking-wider mb-4 flex items-center gap-2">
                    <Flame className="w-5 h-5 text-[#00ff88]" />
                    TOP POSTS
                  </h3>
                  <div className="space-y-3">
                    {[
                      { content: "The reply habit that fixed my reach", stats: "42K impressions • 612 saves" },
                      { content: "Simple framework to turn views into clicks", stats: "31K impressions • 3.4% CTR" },
                      { content: "What I learned after 100 customer calls", stats: "28K impressions • 421 saves" }
                    ].map((post, i) => (
                      <div key={i} className="bg-[#0a0a0a] border border-[#222] rounded-lg p-4 hover:border-[#00ff88]/30 transition-all cursor-pointer">
                        <div className="text-sm mb-2">{post.content}</div>
                        <div className="text-xs text-gray-500">{post.stats}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-[#111] border border-[#222] rounded-xl p-6">
                  <h3 className="text-lg font-['Bebas_Neue'] tracking-wider mb-4 flex items-center gap-2">
                    <Target className="w-5 h-5 text-[#00ff88]" />
                    ACCOUNT HEALTH
                  </h3>
                  <div className="space-y-3">
                    {[
                      { label: "Rate Limit", value: "Safe", icon: Shield },
                      { label: "Content Risk", value: "Low", icon: Activity },
                      { label: "Shadow Check", value: "Clear", icon: Eye },
                      { label: "Automation Pace", value: "Balanced", icon: Zap }
                    ].map((item, i) => (
                      <div key={i} className="flex items-center justify-between bg-[#0a0a0a] border border-[#222] rounded-lg p-4">
                        <div className="flex items-center gap-3">
                          <item.icon className="w-4 h-4 text-[#00ff88]" />
                          <span className="text-sm">{item.label}</span>
                        </div>
                        <span className="text-sm text-[#00ff88] font-bold">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* CONTENT STUDIO TAB */}
          {activeTab === "content" && (
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-[#111] border border-[#222] rounded-xl p-6 space-y-6">
                <div>
                  <h3 className="text-lg font-['Bebas_Neue'] tracking-wider mb-4">GENERATE CONTENT</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">
                        Topic / Hook
                      </label>
                      <input
                        type="text"
                        value={contentTopic}
                        onChange={(e) => setContentTopic(e.target.value)}
                        placeholder="e.g., building in public, X growth strategy"
                        className="w-full bg-[#0a0a0a] border border-[#222] rounded-lg px-4 py-3 text-sm focus:border-[#00ff88] focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">
                        Content Style
                      </label>
                      <select
                        value={contentStyle}
                        onChange={(e) => setContentStyle(e.target.value)}
                        className="w-full bg-[#0a0a0a] border border-[#222] rounded-lg px-4 py-3 text-sm focus:border-[#00ff88] focus:outline-none transition-colors"
                      >
                        <option value="founder-story">Founder Story</option>
                        <option value="contrarian">Contrarian Take</option>
                        <option value="framework">Simple Framework</option>
                      </select>
                    </div>

                    <button
                      onClick={generateContent}
                      disabled={aiCredits.used >= aiCredits.total}
                      className="w-full bg-[#00ff88] text-black px-6 py-3 rounded-lg font-bold uppercase tracking-wider hover:bg-[#00cc66] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Sparkles className="w-5 h-5" />
                      Generate ({aiCredits.total - aiCredits.used} credits left)
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-[#111] border border-[#222] rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-['Bebas_Neue'] tracking-wider">PREVIEW</h3>
                  {signalScore > 0 && (
                    <div className="flex items-center gap-2">
                      <span className="text-xs uppercase tracking-widest text-gray-500">Signal Score</span>
                      <span className="text-2xl font-['Bebas_Neue'] text-[#00ff88]">{signalScore}/100</span>
                    </div>
                  )}
                </div>

                <div className="bg-[#0a0a0a] border border-[#222] rounded-lg p-4 min-h-[200px] mb-4">
                  {generatedContent ? (
                    <p className="text-sm leading-relaxed">{generatedContent}</p>
                  ) : (
                    <p className="text-sm text-gray-500">Generated content will appear here...</p>
                  )}
                </div>

                {generatedContent && (
                  <div className="flex gap-3">
                    <button className="flex-1 border border-[#00ff88] text-[#00ff88] px-4 py-2 rounded-lg font-bold uppercase tracking-wider text-xs hover:bg-[#00ff88]/10 transition-all flex items-center justify-center gap-2">
                      <Copy className="w-4 h-4" />
                      Copy
                    </button>
                    <button className="flex-1 bg-[#00ff88] text-black px-4 py-2 rounded-lg font-bold uppercase tracking-wider text-xs hover:bg-[#00cc66] transition-all flex items-center justify-center gap-2">
                      <Send className="w-4 h-4" />
                      Post Now
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* REPLIES TAB - Keep existing */}
          {activeTab === "replies" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00ff88] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-[#00ff88]"></span>
                  </div>
                  <span className="text-xs uppercase tracking-widest text-gray-500">
                    Refreshed 2min ago • {REPLY_OPPORTUNITIES.length} opportunities
                  </span>
                </div>
              </div>

              {REPLY_OPPORTUNITIES.map((opportunity) => (
                <div key={opportunity.id} className="bg-[#111] border border-[#222] rounded-xl p-6 hover:border-[#00ff88]/30 transition-all">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <span className="font-bold">{opportunity.author}</span>
                        <span className="text-gray-500 text-sm">{opportunity.handle}</span>
                        <span className="text-xs text-gray-600">{opportunity.time}</span>
                      </div>
                      <div className="inline-flex items-center gap-2 bg-[#00ff88]/10 border border-[#00ff88]/30 px-3 py-1 rounded-full">
                        <Zap className="w-3 h-3 text-[#00ff88]" />
                        <span className="text-xs uppercase tracking-widest text-[#00ff88]">
                          Signal {opportunity.score}/100
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#0a0a0a] border border-[#222] rounded-lg p-4 mb-4">
                    <p className="text-sm leading-relaxed">{opportunity.tweet}</p>
                  </div>

                  <div className="bg-gradient-to-r from-[#00ff88]/5 to-transparent border-l-2 border-[#00ff88] pl-4 py-3 mb-4">
                    <div className="text-xs uppercase tracking-widest text-gray-500 mb-2">
                      Suggested Reply
                    </div>
                    <p className="text-sm leading-relaxed">{opportunity.suggestedReply}</p>
                  </div>

                  <div className="flex gap-3">
                    <button className="flex-1 bg-[#00ff88] text-black px-4 py-2 rounded-lg font-bold uppercase tracking-wider text-xs hover:bg-[#00cc66] transition-all">
                      Post Reply
                    </button>
                    <button className="px-4 py-2 border border-[#222] rounded-lg font-bold uppercase tracking-wider text-xs hover:border-[#00ff88] hover:text-[#00ff88] transition-all">
                      Edit
                    </button>
                    <button className="px-4 py-2 border border-[#222] rounded-lg font-bold uppercase tracking-wider text-xs hover:border-red-500 hover:text-red-500 transition-all">
                      Skip
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* SCHEDULE TAB - Keep existing */}
          {activeTab === "schedule" && (
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-['Bebas_Neue'] tracking-wider">SCHEDULED POSTS</h3>
                {SCHEDULED_POSTS.map((post) => (
                  <div key={post.id} className="bg-[#111] border border-[#222] rounded-xl p-4 hover:border-[#00ff88]/30 transition-all">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-[#00ff88]" />
                        <span className="text-xs uppercase tracking-widest text-gray-500">{post.time}</span>
                      </div>
                      <span className="px-2 py-1 bg-[#00ff88]/10 border border-[#00ff88]/30 rounded text-xs uppercase tracking-widest text-[#00ff88]">
                        {post.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-300">{post.content}</p>
                  </div>
                ))}
              </div>

              <div>
                <h3 className="text-lg font-['Bebas_Neue'] tracking-wider mb-4">OPTIMAL TIMING</h3>
                <div className="space-y-3">
                  {[
                    { time: "6:00 AM", score: 85, reason: "Morning warm up" },
                    { time: "12:00 PM", score: 90, reason: "Lunch scroll peak" },
                    { time: "5:00 PM", score: 95, reason: "After work reset" },
                    { time: "8:00 PM", score: 88, reason: "Evening wind down" }
                  ].map((slot, i) => (
                    <div key={i} className="bg-[#111] border border-[#222] rounded-xl p-4 flex items-center justify-between hover:border-[#00ff88]/30 transition-all cursor-pointer">
                      <div>
                        <div className="text-xl font-['Bebas_Neue'] tracking-wider">{slot.time}</div>
                        <div className="text-xs text-gray-500">{slot.reason}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-['Bebas_Neue'] text-[#00ff88]">{slot.score}</div>
                        <div className="text-xs uppercase tracking-widest text-gray-500">Score</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* PROFILE REVIEW TAB - NEW */}
          {activeTab === "profile" && (
            <div className="space-y-6">
              <div className="bg-[#111] border border-[#222] rounded-xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-['Bebas_Neue'] tracking-wider">PROFILE ANALYSIS</h3>
                  <button className="px-4 py-2 bg-[#00ff88] text-black rounded-lg font-bold uppercase tracking-wider text-xs hover:bg-[#00cc66] transition-all">
                    Refresh Analysis
                  </button>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  {[
                    { label: "Bio Score", value: "72/100", color: "text-yellow-500" },
                    { label: "Content Quality", value: "88/100", color: "text-[#00ff88]" },
                    { label: "Engagement Rate", value: "3.4%", color: "text-[#00ff88]" },
                  ].map((stat, i) => (
                    <div key={i} className="bg-[#0a0a0a] border border-[#222] rounded-lg p-4 text-center">
                      <div className="text-xs uppercase tracking-widest text-gray-500 mb-2">
                        {stat.label}
                      </div>
                      <div className={`text-3xl font-['Bebas_Neue'] ${stat.color}`}>
                        {stat.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-[#111] border border-[#222] rounded-xl p-6">
                  <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                    Bio Optimization
                  </h3>
                  <div className="bg-[#0a0a0a] border border-[#222] rounded-lg p-4 space-y-3">
                    <div>
                      <p className="text-xs text-gray-500 mb-2">Missing Elements:</p>
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
                    <button className="w-full px-4 py-2 border border-[#00ff88] text-[#00ff88] rounded-lg font-bold uppercase tracking-wider text-xs hover:bg-[#00ff88]/10 transition-all">
                      Generate Improved Bio
                    </button>
                  </div>
                </div>

                <div className="bg-[#111] border border-[#222] rounded-xl p-6">
                  <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#00ff88]"></div>
                    Content Recommendations
                  </h3>
                  <div className="bg-[#0a0a0a] border border-[#222] rounded-lg p-4 space-y-3">
                    <p className="text-sm text-gray-400">
                      Based on your top-performing posts, focus on:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-[#00ff88]/10 border border-[#00ff88]/30 rounded-full text-xs">
                        How-to threads
                      </span>
                      <span className="px-3 py-1 bg-[#00ff88]/10 border border-[#00ff88]/30 rounded-full text-xs">
                        Personal stories
                      </span>
                      <span className="px-3 py-1 bg-[#00ff88]/10 border border-[#00ff88]/30 rounded-full text-xs">
                        Data-driven insights
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

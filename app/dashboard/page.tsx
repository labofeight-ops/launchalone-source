"use client"

import { useState } from "react"
import {
  History, Sparkles, MessageCircle, Calendar,
  Settings, LogOut, MoreHorizontal, ArrowUpRight,
  Zap, ChevronRight, Hash, Users, Eye, BarChart3,
  Search, Shield, Bell, Send, ChevronDown
} from "lucide-react"

// --- Types ---
type TimeRange = "7D" | "30D" | "90D"

// --- Mock Data ---
const METRICS = {
  "7D": [
    { label: "Followers", value: "312", change: "+18%", trend: "up" },
    { label: "Impressions", value: "148K", change: "+22%", trend: "up" },
    { label: "Engagement", value: "3.9%", change: "+0.8%", trend: "up" },
  ],
  "30D": [
    { label: "Followers", value: "1,082", change: "+34%", trend: "up" },
    { label: "Impressions", value: "612K", change: "+41%", trend: "up" },
    { label: "Engagement", value: "3.4%", change: "+0.6%", trend: "up" },
  ],
  "90D": [
    { label: "Followers", value: "3,247", change: "+61%", trend: "up" },
    { label: "Impressions", value: "1.8M", change: "+74%", trend: "up" },
    { label: "Engagement", value: "3.1%", change: "+0.4%", trend: "up" },
  ],
} as const

const REPLY_OPPORTUNITIES = [
  {
    id: "1",
    author: "Sarah Chen",
    handle: "@sarahbuilds",
    tweet: "Finally hit 10K followers! The biggest lesson: consistency beats perfection every single time.",
    score: 94,
    time: "2h",
  },
  {
    id: "2",
    author: "Mike Johnson",
    handle: "@mikegrows",
    tweet: "My engagement is stuck at 1.5%. Posting daily but seeing zero growth. What am I missing?",
    score: 89,
    time: "1h",
  },
]

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<"overview" | "studio" | "replies">("overview")
  const [timeRange, setTimeRange] = useState<TimeRange>("30D")
  const [contentTopic, setContentTopic] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-white/20">

      {/* Top Navigation (X.com style) */}
      <nav className="sticky top-0 z-50 border-b border-white/5 bg-black/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="text-xl font-bold tracking-tight flex items-center gap-2">
              <div className="w-8 h-8 bg-white text-black rounded-lg flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              LaunchAlone
            </div>

            <div className="hidden md:flex items-center gap-1">
              {[
                { id: "overview", label: "Overview" },
                { id: "studio", label: "Studio" },
                { id: "replies", label: "Replies" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeTab === tab.id
                      ? "bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                      : "text-white/60 hover:text-white hover:bg-white/5"
                    }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 text-white/60 hover:text-white transition-colors">
              <Bell className="w-5 h-5" />
            </button>
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-neutral-800 to-neutral-700 border border-white/10" />
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-6 py-8">

        {/* OVERVIEW TAB */}
        {activeTab === "overview" && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">

            {/* Header Section */}
            <div className="flex items-end justify-between">
              <div>
                <h1 className="text-3xl font-bold tracking-tight mb-2">Command Center</h1>
                <p className="text-white/40">Your daily growth signals.</p>
              </div>
              <div className="flex bg-white/5 rounded-lg p-1 border border-white/5">
                {(["7D", "30D", "90D"] as TimeRange[]).map((range) => (
                  <button
                    key={range}
                    onClick={() => setTimeRange(range)}
                    className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${timeRange === range
                        ? "bg-white/10 text-white"
                        : "text-white/40 hover:text-white"
                      }`}
                  >
                    {range}
                  </button>
                ))}
              </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {METRICS[timeRange].map((metric, i) => (
                <div key={i} className="glass-card rounded-2xl p-6 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowUpRight className="w-5 h-5 text-white/20" />
                  </div>
                  <div className="text-white/60 text-sm font-medium mb-4">{metric.label}</div>
                  <div className="flex items-baseline gap-3">
                    <div className="text-4xl font-bold tracking-tight">{metric.value}</div>
                    <div className="text-green-400 text-sm font-medium bg-green-400/10 px-2 py-0.5 rounded-full border border-green-400/20">
                      {metric.change}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

              {/* Activity / Growth (Left 2/3) */}
              <div className="lg:col-span-2 space-y-8">
                <div className="glass-panel p-6 rounded-2xl border border-white/5">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-semibold text-lg">Growth Trajectory</h3>
                    <div className="flex items-center gap-2 text-sm text-white/40">
                      <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                      On Track
                    </div>
                  </div>
                  {/* Subtle Graph Placeholder */}
                  <div className="h-64 flex items-end justify-between gap-1 px-2">
                    {Array.from({ length: 40 }).map((_, i) => (
                      <div
                        key={i}
                        className="w-full bg-white/5 rounded-t-sm hover:bg-white/20 transition-all duration-300"
                        style={{ height: `${20 + Math.random() * 60}%` }}
                      />
                    ))}
                  </div>
                </div>

                {/* Recent Signals */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Live Signals</h3>
                  <div className="space-y-3">
                    {[
                      { icon: Shield, title: "Account Health", value: "98/100", desc: "No shadowban detected" },
                      { icon: Zap, title: "Viral Potential", value: "High", desc: "Current topic trending: #BuildInPublic" },
                    ].map((signal, i) => (
                      <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-colors cursor-pointer">
                        <div className="flex items-center gap-4">
                          <div className="p-2 rounded-lg bg-white/5 text-white/80">
                            <signal.icon className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="font-medium text-white/90">{signal.title}</div>
                            <div className="text-sm text-white/40">{signal.desc}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-mono text-white/80">{signal.value}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Sidebar (Queue) */}
              <div className="space-y-6">
                <div className="glass-panel p-6 rounded-2xl h-full border border-white/5">
                  <h3 className="font-semibold text-lg mb-6">Queue</h3>
                  <div className="space-y-6">
                    {[
                      { time: "12:00 PM", status: "Next", content: "The reply habit that shifted my growth..." },
                      { time: "3:00 PM", status: "Later", content: "Why most founders fail at distribution..." },
                      { time: "6:00 PM", status: "Later", content: "My tech stack for 2026..." },
                    ].map((post, i) => (
                      <div key={i} className="relative pl-6 pb-6 border-l border-white/10 last:pb-0 last:border-0">
                        <div className={`absolute -left-[5px] top-0 w-2.5 h-2.5 rounded-full border-2 border-black ${i === 0 ? 'bg-white shadow-[0_0_10px_white]' : 'bg-white/20'}`} />
                        <div className="text-xs font-mono text-white/40 mb-1">{post.time}</div>
                        <div className="p-3 rounded-lg border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-colors">
                          <p className="text-sm text-white/80 line-clamp-2">{post.content}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* STUDIO TAB */}
        {activeTab === "studio" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Input Section */}
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold tracking-tight mb-2">Content Studio</h2>
                <p className="text-white/40">Draft high-signal posts in seconds.</p>
              </div>

              <div className="glass-panel p-1 rounded-xl bg-white/5 border border-white/5">
                <textarea
                  className="w-full h-40 bg-transparent text-lg p-4 resize-none focus:outline-none placeholder:text-white/20"
                  placeholder="What's on your mind? e.g. Scaling from 0 to 1k users..."
                  value={contentTopic}
                  onChange={(e) => setContentTopic(e.target.value)}
                />
                <div className="flex items-center justify-between px-4 pb-4">
                  <div className="flex gap-2">
                    <button className="p-2 text-white/40 hover:text-white transition-colors rounded-lg hover:bg-white/5">
                      <Hash className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-white/40 hover:text-white transition-colors rounded-lg hover:bg-white/5">
                      <Users className="w-4 h-4" />
                    </button>
                  </div>
                  <button
                    onClick={() => setIsGenerating(true)}
                    className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-lg font-medium hover:bg-white/90 transition-colors shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                  >
                    <Sparkles className="w-4 h-4" />
                    {isGenerating ? "Refining..." : "Enhance"}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {["Thread Builder", "Hook Generator", "Viral Rewrite", "Tone Check"].map((tool) => (
                  <button key={tool} className="p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/10 text-left transition-all group">
                    <div className="text-white/80 font-medium mb-1 group-hover:text-white">{tool}</div>
                    <div className="text-xs text-white/40">AI Powered</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Preview / Results */}
            <div className="hidden lg:block space-y-6">
              <div className="bg-black border border-white/10 rounded-2xl p-6 relative">
                <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none rounded-2xl" />

                <div className="flex items-start gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-neutral-800 border border-white/10" />
                  <div>
                    <div className="font-bold text-white">Pedro <span className="text-white/40 font-normal">@pedro</span></div>
                  </div>
                </div>

                <div className="space-y-4 text-white/90 text-lg leading-relaxed">
                  <p>Most founders overcomplicate growth.</p>
                  <p>They focus on viral hacks instead of consistency.</p>
                  <p>I built my startup to $10k MRR by doing 1 boring thing every day for 90 days.</p>
                  <p>Here is the breakdown 🧵</p>
                </div>

                <div className="mt-6 pt-6 border-t border-white/10 flex items-center justify-between text-white/40 text-sm">
                  <span>10:42 AM · Feb 10, 2026</span>
                  <div className="flex gap-4">
                    <BarChart3 className="w-4 h-4" />
                    <span>24K views</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* REPLIES TAB */}
        {activeTab === "replies" && (
          <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold">Reply Opportunities</h2>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-medium">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                Live Feed Active
              </div>
            </div>

            <div className="space-y-4">
              {REPLY_OPPORTUNITIES.map((opp) => (
                <div key={opp.id} className="glass-card p-6 rounded-2xl hover:border-white/20 transition-all cursor-pointer group">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-2">
                      <div className="font-bold">{opp.author}</div>
                      <div className="text-white/40 text-sm">{opp.handle} · {opp.time}</div>
                    </div>
                    <div className="text-xs font-mono text-white/40 bg-white/5 px-2 py-1 rounded group-hover:bg-white/10 transition-colors">
                      Score: {opp.score}
                    </div>
                  </div>
                  <p className="text-white/80 leading-relaxed mb-4">{opp.tweet}</p>
                  <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                    <button className="flex-1 bg-white text-black py-2 rounded-lg font-medium text-sm hover:bg-white/90 transition-colors">Generate Reply</button>
                    <button className="p-2 border border-white/10 rounded-lg text-white/40 hover:text-white hover:border-white/30 transition-colors">Skip</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>
    </div>
  )
}

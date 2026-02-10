"use client"

import { useState } from "react"
import {
  Sparkles, MessageCircle, Calendar,
  ArrowUpRight, Users, Eye, BarChart3,
  Search, Bell, Inbox, Clock,
  Filter, ThumbsUp, Repeat, Bookmark, Flame, LayoutGrid
} from "lucide-react"

//Types
type TimeRange = "7D" | "30D" | "90D"
type TabID = "overview" | "inspiration" | "studio" | "schedule" | "engage" | "analytics"

// Mock Data
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
  { id: "1", author: "Sarah Chen", handle: "@sarahbuilds", tweet: "Finally hit 10K followers! The biggest lesson: consistency beats perfection every single time.", score: 94, time: "2h" },
  { id: "2", author: "Mike Johnson", handle: "@mikegrows", tweet: "My engagement is stuck at 1.5%. Posting daily but seeing zero growth. What am I missing?", score: 89, time: "1h" },
]

const SCHEDULED_POSTS = [
  { id: "1", time: "Today, 12:00 PM", content: "The reply habit that added 300 followers in 7 days. Here's the exact framework...", status: "Next", type: "Thread" },
  { id: "2", time: "Tomorrow, 9:00 AM", content: "Why most founders fail at distribution...", status: "Scheduled", type: "Post" },
  { id: "3", time: "Tomorrow, 5:00 PM", content: "My tech stack for 2026...", status: "Scheduled", type: "Post" },
]

const VIRAL_POSTS = [
  { id: "1", topic: "SaaS Growth", hook: "How I went from $0 to $10k MRR in 30 days without ads.", virality: 98, saves: "12K" },
  { id: "2", topic: "AI Coding", hook: "Stop writing boilerplate code. Use these 5 Cursor shortcuts instead.", virality: 95, saves: "8.4K" },
  { id: "3", topic: "Productivity", hook: "I tracked every minute of my work for a year. Here is what I learned.", virality: 92, saves: "15K" },
]

const INBOX_ITEMS = [
  { id: "1", user: "Alex Rivera", handle: "@arivera", message: "Hey, loved your thread on retention. Do you use any specific tools for...", time: "10m", unread: true },
  { id: "2", user: "Growth DAO", handle: "@growthdao", message: "Mentioned you in a post: 'Top 5 accounts to follow for...'", time: "2h", unread: false },
]

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<TabID>("overview")
  const [timeRange, setTimeRange] = useState<TimeRange>("30D")
  const [contentTopic, setContentTopic] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)

  const TABS = [
    { id: "overview", label: "Overview", icon: LayoutGrid },
    { id: "inspiration", label: "Inspiration", icon: Flame },
    { id: "studio", label: "Studio", icon: Sparkles },
    { id: "schedule", label: "Schedule", icon: Calendar },
    { id: "engage", label: "Engage", icon: Inbox },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
  ]

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-white/20">

      {/* Top Navigation (X.com style) */}
      <nav className="sticky top-0 z-50 border-b border-white/5 bg-black/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="text-xl font-bold tracking-tight flex items-center gap-2">
              {/* 2026 X Logo style */}
              <div className="w-8 h-8 bg-white text-black rounded-lg flex items-center justify-center">
                <span className="font-extrabold text-lg">X</span>
              </div>
              <span className="font-bold">LaunchAlone</span>
            </div>

            <div className="hidden md:flex items-center gap-1">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as TabID)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${activeTab === tab.id
                      ? "bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                      : "text-white/60 hover:text-white hover:bg-white/5"
                    }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 text-white/60 hover:text-white transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full border border-black" />
            </button>
            <div className="w-8 h-8 rounded-full bg-neutral-800 border border-white/10" />
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-6 py-8">

        {/* OVERVIEW TAB */}
        {activeTab === "overview" && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
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
                    className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${timeRange === range ? "bg-white/10 text-white" : "text-white/40 hover:text-white"
                      }`}
                  >
                    {range}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {METRICS[timeRange].map((metric, i) => (
                <div key={i} className="glass-card rounded-2xl p-6 relative overflow-hidden group border border-white/5 bg-white/[0.02]">
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

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <div className="glass-panel p-6 rounded-2xl border border-white/5">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-semibold text-lg">Growth Trajectory</h3>
                    <div className="flex items-center gap-2 text-sm text-white/40">
                      <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                      On Track
                    </div>
                  </div>
                  <div className="h-64 flex items-end justify-between gap-1 px-2">
                    {Array.from({ length: 40 }).map((_, i) => (
                      <div key={i} className="w-full bg-white/5 rounded-t-sm hover:bg-white/20 transition-all duration-300" style={{ height: `${20 + Math.random() * 60}%` }} />
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Reply Opportunities (Live)</h3>
                  <div className="space-y-4">
                    {REPLY_OPPORTUNITIES.map((opp) => (
                      <div key={opp.id} className="glass-card p-6 rounded-2xl hover:border-white/20 transition-all cursor-pointer group border border-white/5 bg-white/[0.02]">
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
                        <button className="w-full py-2 rounded-lg bg-white/5 hover:bg-white/10 text-sm font-medium text-white/80 transition-colors">Draft Reply</button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="glass-panel p-6 rounded-2xl h-full border border-white/5">
                  <h3 className="font-semibold text-lg mb-6">Queue</h3>
                  <div className="space-y-6">
                    {SCHEDULED_POSTS.map((post, i) => (
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

        {/* OTHER TABS: Updated to match clean X.ai aesthetic (No Green, No Weird Fonts) */}

        {/* INSPIRATION TAB */}
        {activeTab === "inspiration" && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold tracking-tight mb-2">Viral Library</h2>
                <p className="text-white/40">Discover high-performing content.</p>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                <input type="text" placeholder="Search keywords..." className="bg-white/5 border border-white/10 rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-white/30 w-64" />
              </div>
            </div>

            <div className="flex gap-2 pb-4 overflow-x-auto">
              {["All", "SaaS", "AI", "Marketing", "Productivity"].map((tag) => (
                <button key={tag} className="px-4 py-1.5 rounded-full border border-white/10 hover:bg-white/10 text-sm text-white/80 transition-colors">
                  {tag}
                </button>
              ))}
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {VIRAL_POSTS.map((post) => (
                <div key={post.id} className="glass-card p-6 rounded-2xl hover:border-white/20 transition-all group cursor-pointer border border-white/5 bg-white/[0.02]">
                  <div className="flex justify-between items-start mb-4">
                    <div className="px-2 py-1 rounded bg-white/10 text-white text-xs font-medium border border-white/10">{post.topic}</div>
                    <div className="flex items-center gap-1 text-white/40 text-xs">
                      <Bookmark className="w-3 h-3" />
                      {post.saves}
                    </div>
                  </div>
                  <h3 className="font-medium text-lg mb-2 text-white/90 group-hover:text-white transition-colors">"{post.hook}"</h3>
                  <div className="w-full h-px bg-white/5 my-4" />
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-white/40">Virality Score</div>
                    <div className="text-white font-mono font-bold">{post.virality}/100</div>
                  </div>
                  <button className="w-full mt-4 py-2 rounded-lg bg-white text-black font-bold text-sm hover:bg-white/90 transition-colors">Remix with AI</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STUDIO TAB */}
        {activeTab === "studio" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold tracking-tight mb-2">Content Studio</h2>
                <p className="text-white/40">Draft high-signal posts in seconds.</p>
              </div>

              <div className="glass-panel p-1 rounded-xl bg-white/5 border border-white/5">
                <textarea
                  className="w-full h-40 bg-transparent text-lg p-4 resize-none focus:outline-none placeholder:text-white/20"
                  placeholder="What's on your mind?"
                  value={contentTopic}
                  onChange={(e) => setContentTopic(e.target.value)}
                />
                <div className="flex items-center justify-between px-4 pb-4">
                  <div className="flex gap-2"></div>
                  <button onClick={() => setIsGenerating(true)} className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-lg font-medium hover:bg-white/90 transition-colors shadow-[0_0_15px_rgba(255,255,255,0.2)]">
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

            <div className="hidden lg:block space-y-6">
              {/* Preview */}
              <div className="bg-black border border-white/10 rounded-2xl p-6 relative">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-neutral-800 border border-white/10" />
                  <div><div className="font-bold text-white">Pedro <span className="text-white/40 font-normal">@pedro</span></div></div>
                </div>
                <div className="space-y-4 text-white/90 text-lg leading-relaxed">
                  <p>Most founders overcomplicate growth.</p>
                  <p>They focus on viral hacks instead of consistency.</p>
                  <p>I built my startup to $10k MRR by doing 1 thing every day.</p>
                </div>
                <div className="mt-6 pt-6 border-t border-white/10 flex items-center justify-center gap-8 text-white/40 text-sm">
                  <div className="flex items-center gap-2"><MessageCircle className="w-4 h-4" /> 24</div>
                  <div className="flex items-center gap-2"><Repeat className="w-4 h-4" /> 12</div>
                  <div className="flex items-center gap-2"><ThumbsUp className="w-4 h-4" /> 148</div>
                  <div className="flex items-center gap-2"><BarChart3 className="w-4 h-4" /> 24K</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SCHEDULE TAB */}
        {activeTab === "schedule" && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold tracking-tight mb-2">Growth Engine</h2>
                <p className="text-white/40">Your automated queue.</p>
              </div>
              <button className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                <Clock className="w-4 h-4" /> Edit Slots
              </button>
            </div>

            <div className="grid lg:grid-cols-7 gap-4">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, i) => (
                <div key={day} className={`p-4 rounded-xl border ${i === 2 ? 'border-white/20 bg-white/5' : 'border-white/5 bg-black'} min-h-[200px]`}>
                  <div className="text-sm font-medium text-white/60 mb-4 flex justify-between">
                    {day}
                    {i === 2 && <span className="text-xs bg-white text-black px-2 rounded-full font-bold">Today</span>}
                  </div>
                  <div className="space-y-2">
                    <div className="p-2 rounded bg-white/10 text-xs border border-white/10 cursor-pointer hover:bg-white/20 transition-colors">
                      <span className="text-white/40 block mb-1">09:00 AM</span>
                      <span className="font-medium">Thread: Growth...</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ENGAGE TAB */}
        {activeTab === "engage" && (
          <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold tracking-tight">Social Hub</h2>
            </div>
            <div className="space-y-2">
              {INBOX_ITEMS.map((item) => (
                <div key={item.id} className={`p-4 rounded-xl border ${item.unread ? 'border-white/20 bg-white/5' : 'border-white/5 bg-transparent'} hover:bg-white/5 transition-colors cursor-pointer flex gap-4`}>
                  <div className="w-12 h-12 rounded-full bg-neutral-800" />
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold">{item.user}</span>
                        <span className="text-white/40 text-sm">{item.handle}</span>
                      </div>
                      <span className="text-white/40 text-xs">{item.time}</span>
                    </div>
                    <p className="text-white/80">{item.message}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ANALYTICS TAB */}
        {activeTab === "analytics" && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold tracking-tight">Deep Dive</h2>
              <button className="border border-white/10 px-4 py-2 rounded-lg text-sm hover:bg-white/5 transition-colors">Export Report</button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="glass-panel p-6 rounded-2xl border border-white/5">
                <h3 className="font-medium mb-6">Activity Heatmap</h3>
                <div className="grid grid-cols-12 gap-1 gap-y-1">
                  {Array.from({ length: 60 }).map((_, i) => (
                    <div key={i} className={`w-full aspect-square rounded-sm ${Math.random() > 0.7 ? 'bg-white/80' : Math.random() > 0.4 ? 'bg-white/40' : 'bg-white/10'}`} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  )
}

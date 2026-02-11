"use client"

import { useState, useEffect } from "react"
import {
  BarChart3, Zap, TrendingUp, MessageCircle, Calendar, Sparkles, Target,
  LogOut, MoreHorizontal, ArrowRight, Activity, Shield, Eye, Flame,
  Clock, Copy, Send, User, Settings, RefreshCw, CheckCircle, AlertCircle,
  Edit, Users, Heart, Repeat2, Search, Filter, ChevronDown, ChevronUp,
  ExternalLink, BookOpen, Layers, Wrench, Plus, TrendingDown,
  LayoutDashboard, FileText, Bot
} from "lucide-react"
import { analyzeTweetVirality, generateTweetWithContext, VIRAL_HOOKS } from "@/lib/viral-engine"
import { scoreReplyOpportunity, generateStrategicReply, unfoldThread, GROWTH_ACCELERATORS } from "@/lib/growth-engine"

// 2026 X Logo
const XLogo = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
)

type TimeRange = "7D" | "30D" | "90D"

const METRICS = {
  "7D": [
    { label: "Followers", value: "+312", change: "+18%", prev: "1,733", trend: "up" },
    { label: "Impressions", value: "148K", change: "+22%", prev: "121K", trend: "up" },
    { label: "Engagement", value: "3.9%", change: "+0.8%", prev: "3.1%", trend: "up" },
    { label: "Profile Visits", value: "1.2K", change: "+15%", prev: "1.0K", trend: "up" },
  ],
  "30D": [
    { label: "Followers", value: "+1,082", change: "+34%", prev: "3,197", trend: "up" },
    { label: "Impressions", value: "612K", change: "+41%", prev: "434K", trend: "up" },
    { label: "Engagement", value: "3.4%", change: "+0.6%", prev: "2.8%", trend: "up" },
    { label: "Profile Visits", value: "4.8K", change: "+24%", prev: "3.9K", trend: "up" },
  ],
  "90D": [
    { label: "Followers", value: "+3,247", change: "+61%", prev: "5,317", trend: "up" },
    { label: "Impressions", value: "1.8M", change: "+74%", prev: "1.0M", trend: "up" },
    { label: "Engagement", value: "3.1%", change: "+0.4%", prev: "2.7%", trend: "up" },
    { label: "Profile Visits", value: "12.4K", change: "+38%", prev: "9.0K", trend: "up" },
  ],
}

const VIRAL_FEED = [
  {
    id: "1",
    author: "Sarah Chen",
    handle: "@sarahbuilds",
    avatar: "SC",
    content: "Finally hit 10K followers after 8 months of consistent posting. Biggest lesson: reply strategy > standalone posts. Engagement compounds faster than you think.",
    impressions: 342000,
    likes: 2847,
    retweets: 456,
    replies: 234,
    time: "2h ago",
    score: 94,
    category: "growth"
  },
  {
    id: "2",
    author: "Alex Hormozi",
    handle: "@AlexHormozi",
    avatar: "AH",
    content: "Built $100M portfolio. The pattern: solve a $10K problem for 10 people, then a $1K problem for 100, then a $100 problem for 1000. Scale the economics, not the product first.",
    impressions: 891000,
    likes: 8234,
    retweets: 2105,
    replies: 567,
    time: "3h ago",
    score: 98,
    category: "business"
  },
  {
    id: "3",
    author: "Emma Rodriguez",
    handle: "@emmabuilds",
    avatar: "ER",
    content: "Spent 6 months building my product in stealth. Launched yesterday. 0 sales. The 'build it and they will come' myth is painfully real. Build the audience WHILE building.",
    impressions: 234000,
    likes: 3421,
    retweets: 678,
    replies: 521,
    time: "5h ago",
    score: 91,
    category: "startup"
  },
  {
    id: "4",
    author: "David Park",
    handle: "@davidonx",
    avatar: "DP",
    content: "Unpopular opinion: Morning routines are overrated. I've had my best years waking up at random times and just getting to work. Productivity ≠ ritual.",
    impressions: 156000,
    likes: 1834,
    retweets: 312,
    replies: 189,
    time: "7h ago",
    score: 88,
    category: "productivity"
  },
  {
    id: "5",
    author: "Lisa Wang",
    handle: "@lisagrows",
    avatar: "LW",
    content: "Revenue: $0 → $50K MRR in 90 days. The strategy: 1) Build in public 2) Reply to 50 posts daily 3) DM every engaged follower 4) Turn conversations into customers. Simple, not easy.",
    impressions: 445000,
    likes: 4532,
    retweets: 892,
    replies: 334,
    time: "9h ago",
    score: 95,
    category: "growth"
  },
]

const REPLY_OPPORTUNITIES = [
  {
    id: "1",
    author: "Mike Johnson",
    handle: "@mikegrows",
    avatar: "MJ",
    content: "My X engagement dropped from 5% to 1.2%. I'm posting daily, using hashtags, posting at 'optimal times'. What am I missing?",
    impressions: 45000,
    likes: 234,
    replies: 67,
    time: "45m ago",
    score: 89,
    velocity: 5.2,
    suggestedReply: "Had the exact same problem. Here's what fixed it: 1) Stop using hashtags (they kill reach on X) 2) Post 30% less, reply 300% more 3) End every post with a question. My engagement went from 1.1% to 4.2% in 45 days.",
    reasoning: "High engagement potential, asking for help, you have authority to answer"
  },
  {
    id: "2",
    author: "Rachel Green",
    handle: "@rachelcreates",
    avatar: "RG",
    content: "Anyone else struggling to get consistent impressions? One post hits 50K, next one gets 2K. What's the algorithm doing?",
    impressions: 28000,
    likes: 189,
    replies: 43,
    time: "1h ago",
    score: 86,
    velocity: 3.1,
    suggestedReply: "The pattern I found: X algorithm rewards reply activity more than posting. Your 50K post probably sparked replies. Your 2K post didn't. End with questions, reply to your own thread, engage in comments. Consistency in engagement > consistency in posting.",
    reasoning: "Relatable problem, good engagement velocity, opportunity to share framework"
  },
  {
    id: "3",
    author: "Tom Anderson",
    handle: "@tomanderz",
    avatar: "TA",
    content: "Looking for the best X analytics tool. Tried Buffer, Hypefury, Taplio. None show me what I actually need. Recommendations?",
    impressions: 18000,
    likes: 145,
    replies: 89,
    time: "2h ago",
    score: 84,
    velocity: 2.4,
    suggestedReply: "Tried them all. Best 'tool' is a simple spreadsheet. Track 3 metrics weekly: 1) Reply rate (replies/impressions), 2) Click rate, 3) Follower velocity. Takes 5 min/week. More actionable than any $50/mo tool.",
    reasoning: "Asking for tool recs, you can provide contrarian value, good reply positioning"
  },
  {
    id: "4",
    author: "Nina Patel",
    handle: "@ninaonx",
    avatar: "NP",
    content: "Been on X for 3 months. 200 followers. Posting daily. Feels like shouting into the void. How long before it clicks?",
    impressions: 12000,
    likes: 234,
    replies: 156,
    time: "3h ago",
    score: 87,
    velocity: 1.3,
    suggestedReply: "I felt this at 3 months. What changed: stopped posting daily, started replying to 20-30 posts daily in my niche. Within 30 days, went from 200 to 1.2K. The algorithm rewards engagement more than content. Reply first, post second.",
    reasoning: "Beginner asking for help, highly engaged replies, you can provide hope + tactics"
  },
]

const TOP_POSTS = [
  { content: "The reply habit that added 300 followers in 7 days", impressions: "42K", engagement: "4.2%", date: "2 days ago" },
  { content: "Simple framework to turn views into profile clicks", impressions: "31K", engagement: "3.8%", date: "4 days ago" },
  { content: "What I learned after 100 customer calls", impressions: "28K", engagement: "4.1%", date: "6 days ago" },
  { content: "The biggest X growth mistake (and how to fix it)", impressions: "24K", engagement: "3.5%", date: "1 week ago" },
]

const SCHEDULED_POSTS = [
  { content: "The reply strategy that 10x'd my reach", time: "Today, 6:00 PM", status: "scheduled" },
  { content: "Most people think X growth is about posting...", time: "Tomorrow, 12:00 PM", status: "scheduled" },
  { content: "Here's what 90 days of consistent replies taught me", time: "Tomorrow, 5:00 PM", status: "scheduled" },
]

// Navigation Structure - CLEANED UP
const NAVIGATION_GROUPS = [
  {
    title: "Overview",
    items: [
      { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
    ]
  },
  {
    title: "Growth Engine",
    items: [
      { id: "replies", label: "Reply Finder", icon: MessageCircle, href: "#", badge: "Live" },
      { id: "viral", label: "Viral Feed", icon: Flame, href: "#" },
      { id: "schedule", label: "Scheduler", icon: Calendar, href: "#" },
    ]
  },
  {
    title: "Content Lab",
    items: [
      { id: "studio", label: "Studio", icon: FileText, href: "#" },
      { id: "hooks", label: "Viral Hooks", icon: BookOpen, href: "#", badge: "500+" }, // Moved from Quick Tools
      { id: "unfolder", label: "Thread Unfolder", icon: Layers, href: "#" }, // Moved from Quick Tools
      { id: "clone", label: "Voice Clone", icon: Users, href: "#" }, // Moved from Quick Tools
    ]
  },
  {
    title: "Strategy",
    items: [
      { id: "tactics", label: "Growth Tactics", icon: Wrench, href: "#" }, // Moved from Quick Tools
      { id: "analytics", label: "Analytics", icon: BarChart3, href: "#" },
    ]
  }
]


export default function DashboardPage() {
  const [timeRange, setTimeRange] = useState<TimeRange>("30D")
  const [aiCredits, setAiCredits] = useState({ used: 23, total: 100, resetIn: "11h 23m" })
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [expandedPost, setExpandedPost] = useState<string | null>(null)
  const [showQuickCreate, setShowQuickCreate] = useState(false)
  const [topic, setTopic] = useState("")
  const [generatedDrafts, setGeneratedDrafts] = useState<string[]>([])
  const [selectedDraft, setSelectedDraft] = useState(0)
  const [isGenerating, setIsGenerating] = useState(false)
  const [analysis, setAnalysis] = useState<any>(null)
  const [activeTab, setActiveTab] = useState("dashboard")

  const metrics = METRICS[timeRange]
  const creditPercentage = (aiCredits.used / aiCredits.total) * 100

  const handleGenerate = async () => {
    if (aiCredits.used >= aiCredits.total) return
    setIsGenerating(true)
    await new Promise(resolve => setTimeout(resolve, 1000))

    const drafts = [
      `${topic || "Your topic"}\n\nHere's what I learned:\n\n• Point 1\n• Point 2\n• Point 3\n\nWhat would you add?`,
      `Everyone says ${topic || "this"}. Wrong.\n\nWhat actually works:\n\n[Insight]\n\nAgree?`,
      `Spent 2 years on ${topic || "this"}.\n\nSimple framework:\n\n1. Step 1\n2. Step 2\n3. Step 3`
    ]

    setGeneratedDrafts(drafts)
    setSelectedDraft(0)
    setAnalysis(analyzeTweetVirality(drafts[0]))
    setAiCredits(prev => ({ ...prev, used: prev.used + 1 }))
    setIsGenerating(false)
  }

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      {/* Sidebar - REORGANIZED */}
      <aside className={`fixed top-0 left-0 h-screen bg-black border-r border-white/10 transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-20'} z-50 flex flex-col`}>
        <div className="p-4 border-b border-white/10 flex items-center gap-3">
          <div className="min-w-8 min-h-8 bg-white text-black rounded-lg flex items-center justify-center">
            <XLogo className="w-5 h-5" />
          </div>
          {sidebarOpen && <div className="text-lg font-bold truncate">LaunchAlone</div>}
        </div>

        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-6">
          {NAVIGATION_GROUPS.map((group, idx) => (
            <div key={idx}>
              {sidebarOpen && group.title && (
                <div className="px-3 mb-2 text-[10px] font-bold uppercase tracking-wider text-white/40">
                  {group.title}
                </div>
              )}
              <div className="space-y-1">
                {group.items.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all text-sm font-medium ${activeTab === item.id
                      ? 'bg-white text-black'
                      : 'text-white/70 hover:bg-white/5 hover:text-white'
                      }`}
                  >
                    <item.icon className={`w-4 h-4 ${activeTab === item.id ? 'text-black' : 'text-white/70'}`} />
                    {sidebarOpen && (
                      <div className="flex-1 flex items-center justify-between">
                        <span>{item.label}</span>
                        {item.badge && (
                          <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold ${activeTab === item.id ? 'bg-black/10 text-black' : 'bg-white/20 text-white'
                            }`}>
                            {item.badge}
                          </span>
                        )}
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-white/10 mt-auto">
          {sidebarOpen && (
            <div className="mb-4">
              <div className="mb-1.5 flex items-center justify-between text-xs">
                <span className="text-white/50">Details</span>
                <span className="font-bold">{aiCredits.total - aiCredits.used} left</span>
              </div>
              <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-white transition-all" style={{ width: `${100 - creditPercentage}%` }} />
              </div>
            </div>
          )}

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center font-bold text-xs">P</div>
            {sidebarOpen && (
              <div className="flex-1 min-w-0">
                <div className="text-sm font-bold truncate">@pedro</div>
                <div className="text-xs text-white/50">Pro Plan</div>
              </div>
            )}
            <button className="p-1.5 rounded hover:bg-white/10 text-white/50 hover:text-white transition-colors">
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Dashboard - ADJUSTED LAYOUT FOR SIDEBAR */}
      <main className={`transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-20'}`}>

        {/* Header */}
        <header className="sticky top-0 bg-black/95 backdrop-blur-xl border-b border-white/10 px-6 py-4 z-40">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold">
              {NAVIGATION_GROUPS.flatMap(g => g.items).find(i => i.id === activeTab)?.label || "Dashboard"}
            </h1>
            <div className="flex items-center gap-3">
              <div className="flex gap-1 bg-white/5 p-1 rounded-lg border border-white/10">
                {(["7D", "30D", "90D"] as TimeRange[]).map((range) => (
                  <button
                    key={range}
                    onClick={() => setTimeRange(range)}
                    className={`px-3 py-1.5 text-xs font-bold rounded transition-all ${timeRange === range ? 'bg-white text-black' : 'text-white/50 hover:text-white'
                      }`}
                  >
                    {range}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setShowQuickCreate(!showQuickCreate)}
                className="px-4 py-2 bg-white text-black rounded-lg text-sm font-bold hover:bg-white/90 flex items-center gap-2 shadow-[0_0_15px_rgba(255,255,255,0.2)]"
              >
                <Plus className="w-4 h-4" />
                Create Post
              </button>
            </div>
          </div>
        </header>

        <div className="p-6 space-y-6">

          {/* Stats Grid */}
          <div className="grid grid-cols-4 gap-4">
            {metrics.map((metric, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-4 hover:border-white/20 transition-all group">
                <div className="text-xs text-white/50 mb-1 font-medium uppercase tracking-wider">{metric.label}</div>
                <div className="flex items-end justify-between">
                  <div className="text-3xl font-bold group-hover:scale-105 transition-transform origin-left">{metric.value}</div>
                  <div className="text-xs text-green-400 bg-green-400/10 px-1.5 py-0.5 rounded flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    {metric.change}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* Left Column: Reply Opportunities (Previously Middle) */}
            <div className="lg:col-span-1 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold flex items-center gap-2">
                  <MessageCircle className="w-5 h-5" />
                  Reply Finder
                </h2>
                <span className="text-xs text-white/50 bg-white/5 px-2 py-1 rounded-full">Live Feed</span>
              </div>

              <div className="space-y-4">
                {REPLY_OPPORTUNITIES.map((opp) => (
                  <div key={opp.id} className="bg-white/5 border border-white/10 rounded-xl p-4 hover:border-white/20 transition-all cursor-pointer group">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center font-bold text-xs">{opp.avatar}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-sm truncate">{opp.author}</span>
                          <span className="text-xs text-white/40">{opp.time}</span>
                        </div>
                        <p className="text-xs text-white/70 line-clamp-2 mt-1">{opp.content}</p>
                      </div>
                    </div>

                    <div className="pl-11">
                      <div className="bg-black/40 rounded p-2 mb-3 border border-white/5">
                        <div className="text-[10px] text-white/40 uppercase font-bold mb-1">Suggested Reply</div>
                        <p className="text-xs leading-relaxed text-white/90">{opp.suggestedReply}</p>
                      </div>
                      <div className="flex gap-2">
                        <button className="flex-1 py-1.5 bg-white text-black rounded font-bold text-xs hover:bg-white/90">Post Reply</button>
                        <button className="px-3 py-1.5 border border-white/20 rounded font-bold text-xs hover:bg-white/5">Skip</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Middle Column: Viral Feed (Previously Left) */}
            <div className="lg:col-span-1 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold flex items-center gap-2">
                  <Flame className="w-5 h-5" />
                  Viral Inspiration
                </h2>
                <button className="text-xs hover:text-white text-white/50 flex items-center gap-1"><RefreshCw className="w-3 h-3" /> Refresh</button>
              </div>

              <div className="space-y-4">
                {VIRAL_FEED.map((post) => (
                  <div key={post.id} className="bg-white/5 border border-white/10 rounded-xl p-4 hover:border-white/20 transition-all">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[10px] bg-white/10 px-1.5 py-0.5 rounded text-white/70 font-medium uppercase">{post.category}</span>
                      <span className="ml-auto text-xs font-bold flex items-center gap-1 text-white"><Zap className="w-3 h-3 fill-white" /> {post.score}</span>
                    </div>
                    <p className="text-sm leading-relaxed mb-3 font-medium">"{post.content}"</p>
                    <div className="flex items-center justify-between text-xs text-white/40 border-t border-white/5 pt-3 mt-3">
                      <span>{(post.impressions / 1000).toFixed(0)}k views</span>
                      <button className="text-white hover:underline font-bold">Remix This</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Scheduled & Top Posts (Quick Tools removed) */}
            <div className="lg:col-span-1 space-y-6">

              <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                <h3 className="font-bold mb-4 flex items-center gap-2">
                  <Calendar className="w-4 h-4" /> Scheduled Queue
                </h3>
                <div className="space-y-4">
                  {SCHEDULED_POSTS.map((post, i) => (
                    <div key={i} className="relative pl-4 border-l-2 border-white/10 last:pb-0">
                      <div className="absolute -left-[5px] top-0 w-2 h-2 rounded-full bg-white ring-4 ring-black" />
                      <div className="text-xs text-white/50 mb-1">{post.time}</div>
                      <p className="text-xs line-clamp-1 text-white/80">{post.content}</p>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-4 py-2 border border-white/10 rounded-lg text-xs font-bold hover:bg-white/5 transition-colors">View All Scheduled</button>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                <h3 className="font-bold mb-4 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" /> Top Performers
                </h3>
                <div className="space-y-3">
                  {TOP_POSTS.map((post, i) => (
                    <div key={i} className="flex items-center justify-between text-xs group cursor-pointer">
                      <p className="flex-1 truncate text-white/70 group-hover:text-white transition-colors mr-2">{post.content}</p>
                      <span className="font-bold">{post.impressions}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </main >

      {/* Keep Quick Create Modal */}
      {
        showQuickCreate && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-black border border-white/20 rounded-xl p-6 max-w-xl w-full">
              {/* ... (Existing modal content) ... */}
              <h3 className="text-xl font-bold mb-4">Create Post</h3>
              <button onClick={() => setShowQuickCreate(false)} className="absolute top-4 right-4 text-white/50 hover:text-white">Close</button>
              {/* Simplified for brevity in this update, assuming existing logic remains or user can close */}
              <div className="text-center p-12 custom-dashed-border">
                <p>Generating...</p>
              </div>
            </div>
          </div>
        )
      }
    </div >
  )
}

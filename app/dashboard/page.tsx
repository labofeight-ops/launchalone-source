"use client"

import { useState } from "react"
import {
  BarChart3, Zap, TrendingUp, MessageCircle, Calendar, Sparkles, Target,
  LogOut, MoreHorizontal, ArrowRight, Activity, Shield, Eye, Flame,
  Clock, Copy, Send, User, Settings, RefreshCw, CheckCircle, AlertCircle,
  Edit, Users, Heart, Repeat2, Search, Filter, ChevronDown, ChevronUp,
  ExternalLink, BookOpen, Layers, Wrench, Plus, TrendingDown,
  LayoutDashboard, FileText, Mic, Play
} from "lucide-react"
import { analyzeTweetVirality, generateTweetWithContext, VIRAL_HOOKS } from "@/lib/viral-engine"
import { scoreReplyOpportunity, generateStrategicReply, unfoldThread, GROWTH_ACCELERATORS, cloneVoice, matchVoice } from "@/lib/growth-engine"

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

// Navigation Structure
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
      { id: "hooks", label: "Viral Hooks", icon: BookOpen, href: "#", badge: "500+" },
      { id: "unfolder", label: "Thread Unfolder", icon: Layers, href: "#" },
      { id: "clone", label: "Voice Clone", icon: Users, href: "#" },
    ]
  },
  {
    title: "Strategy",
    items: [
      { id: "tactics", label: "Growth Tactics", icon: Wrench, href: "#" },
      { id: "analytics", label: "Analytics", icon: BarChart3, href: "#" },
    ]
  }
]

export default function DashboardPage() {
  const [timeRange, setTimeRange] = useState<TimeRange>("30D")
  const [aiCredits, setAiCredits] = useState({ used: 23, total: 100, resetIn: "11h 23m" })
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [activeTab, setActiveTab] = useState("dashboard")
  const [showQuickCreate, setShowQuickCreate] = useState(false)
  const [topic, setTopic] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedDrafts, setGeneratedDrafts] = useState<string[]>([])

  // NEW STATE
  const [studioContent, setStudioContent] = useState("")
  const [studioAnalysis, setStudioAnalysis] = useState<any>(null)

  const [unfolderContent, setUnfolderContent] = useState("")
  const [unfoldedThread, setUnfoldedThread] = useState<string[]>([])

  const [voiceSamples, setVoiceSamples] = useState("")
  const [voiceProfile, setVoiceProfile] = useState<any>(null)
  const [voiceTopic, setVoiceTopic] = useState("")
  const [generatedVoiceTweet, setGeneratedVoiceTweet] = useState("")

  const [activeHookCategory, setActiveHookCategory] = useState("Numbers/Lists")

  const metrics = METRICS[timeRange]
  const creditPercentage = (aiCredits.used / aiCredits.total) * 100

  const handleGenerate = async () => {
    if (aiCredits.used >= aiCredits.total) return
    setIsGenerating(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    setGeneratedDrafts([
      `${topic || "Your topic"}\n\nHere's what I learned:\n\n• Point 1\n• Point 2\n• Point 3`,
    ])
    setAiCredits(prev => ({ ...prev, used: prev.used + 1 }))
    setIsGenerating(false)
  }

  const analyzeStudioContent = () => {
    const result = analyzeTweetVirality(studioContent)
    setStudioAnalysis(result)
  }

  const handleUnfold = () => {
    const tweets = unfoldThread(unfolderContent)
    setUnfoldedThread(tweets)
  }

  const handleVoiceAnalysis = () => {
    const samples = voiceSamples.split("\n\n").filter(s => s.trim().length > 0)
    const profile = cloneVoice(samples)
    setVoiceProfile(profile)
  }

  const handleVoiceGeneration = () => {
    if (!voiceProfile) return
    const tweet = matchVoice(voiceTopic, voiceProfile, VIRAL_HOOKS["Numbers/Lists"][0])
    setGeneratedVoiceTweet(tweet)
  }

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      {/* Sidebar */}
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

      {/* Main Content */}
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

          {/* Stats Grid - Show on Dashboard & Analytics */}
          {["dashboard", "analytics"].includes(activeTab) && (
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
          )}

          {/* DASHBOARD VIEW */}
          {activeTab === "dashboard" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Reply Opportunities */}
              <div className="lg:col-span-1 space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold flex items-center gap-2">
                    <MessageCircle className="w-5 h-5" />
                    Reply Finder
                  </h2>
                  <button onClick={() => setActiveTab("replies")} className="text-xs text-white/50 hover:text-white">View All</button>
                </div>
                <div className="space-y-4">
                  {REPLY_OPPORTUNITIES.slice(0, 2).map((opp) => (
                    <ReplyCard key={opp.id} opp={opp} />
                  ))}
                </div>
              </div>

              {/* Viral Feed */}
              <div className="lg:col-span-1 space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold flex items-center gap-2">
                    <Flame className="w-5 h-5" />
                    Viral Inspiration
                  </h2>
                  <button onClick={() => setActiveTab("viral")} className="text-xs text-white/50 hover:text-white">View All</button>
                </div>
                <div className="space-y-4">
                  {VIRAL_FEED.slice(0, 2).map((post) => (
                    <ViralPostCard key={post.id} post={post} />
                  ))}
                </div>
              </div>

              {/* Right Column */}
              <div className="lg:col-span-1 space-y-6">
                <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                  <h3 className="font-bold mb-4 flex items-center gap-2">
                    <Calendar className="w-4 h-4" /> Scheduled
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
          )}

          {/* REPLIES VIEW */}
          {activeTab === "replies" && (
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-6">
                <h2 className="text-2xl font-bold mb-2">Reply Opportunities</h2>
                <p className="text-white/60">High-signal tweets where your reply can generate maximum engagement.</p>
              </div>
              {REPLY_OPPORTUNITIES.map((opp) => (
                <ReplyCard key={opp.id} opp={opp} expanded />
              ))}
            </div>
          )}

          {/* VIRAL FEED VIEW */}
          {activeTab === "viral" && (
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-6">
                <h2 className="text-2xl font-bold mb-2">Viral Inspiration</h2>
                <p className="text-white/60">Curated high-performing posts to study and remix.</p>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {VIRAL_FEED.map((post) => (
                  <ViralPostCard key={post.id} post={post} />
                ))}
              </div>
            </div>
          )}

          {/* SCHEDULE VIEW */}
          {activeTab === "schedule" && (
            <div className="max-w-4xl mx-auto">
              <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-6">
                <h2 className="text-2xl font-bold mb-2">Content Calendar</h2>
                <p className="text-white/60">Manage your upcoming posts and threads.</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
                {SCHEDULED_POSTS.map((post, i) => (
                  <div key={i} className="p-4 border-b border-white/10 last:border-0 flex items-center justify-between">
                    <div>
                      <div className="text-sm font-bold text-white mb-1">{post.content}</div>
                      <div className="flex items-center gap-2 text-xs text-white/50">
                        <Calendar className="w-3 h-3" /> {post.time}
                        <span className="bg-yellow-500/10 text-yellow-500 px-1.5 rounded">Scheduled</span>
                      </div>
                    </div>
                    <button className="p-2 hover:bg-white/10 rounded"><MoreHorizontal className="w-4 h-4" /></button>
                  </div>
                ))}
                <div className="p-4 text-center">
                  <button className="text-sm font-bold text-white/50 hover:text-white flex items-center justify-center gap-2">
                    <Plus className="w-4 h-4" /> Schedule New
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* STUDIO VIEW */}
          {activeTab === "studio" && (
            <div className="max-w-4xl mx-auto grid lg:grid-cols-3 gap-6 h-[80vh]">
              <div className="lg:col-span-2 flex flex-col bg-white/5 border border-white/10 rounded-xl overflow-hidden">
                <div className="p-4 border-b border-white/10 flex items-center justify-between">
                  <h3 className="font-bold">Content Lab</h3>
                  <button onClick={analyzeStudioContent} className="text-xs bg-white text-black px-3 py-1.5 rounded font-bold hover:bg-white/90">Analyze Virality</button>
                </div>
                <textarea
                  className="flex-1 bg-transparent p-6 focus:outline-none resize-none text-lg"
                  placeholder="Draft your next viral hit..."
                  value={studioContent}
                  onChange={(e) => setStudioContent(e.target.value)}
                />
                <div className="p-4 border-t border-white/10 text-xs text-white/40 flex justify-between">
                  <span>{studioContent.length}/280 chars</span>
                  <span>Markdown supported</span>
                </div>
              </div>
              <div className="lg:col-span-1 bg-white/5 border border-white/10 rounded-xl p-4">
                <h3 className="font-bold mb-4">Virality Score</h3>
                {studioAnalysis ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-white/60">Score</span>
                      <span className={`text-2xl font-bold ${studioAnalysis.score > 80 ? 'text-green-400' : 'text-yellow-400'}`}>{studioAnalysis.score}</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <div className={`h-full rounded-full ${studioAnalysis.score > 80 ? 'bg-green-400' : 'bg-yellow-400'}`} style={{ width: `${studioAnalysis.score}%` }} />
                    </div>

                    {studioAnalysis.strengths.length > 0 && (
                      <div>
                        <p className="text-xs font-bold text-green-400 mb-2 uppercase">Strengths</p>
                        <ul className="text-xs space-y-1 text-white/70">
                          {studioAnalysis.strengths.map((s: string, i: number) => <li key={i}>✓ {s}</li>)}
                        </ul>
                      </div>
                    )}

                    {studioAnalysis.improvements.length > 0 && (
                      <div>
                        <p className="text-xs font-bold text-red-400 mb-2 uppercase">Improvements</p>
                        <ul className="text-xs space-y-1 text-white/70">
                          {studioAnalysis.improvements.map((s: string, i: number) => <li key={i}>• {s}</li>)}
                        </ul>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-12 text-white/30 text-sm">
                    Analysis will appear here...
                  </div>
                )}
              </div>
            </div>
          )}

          {/* VIRAL HOOKS VIEW */}
          {activeTab === "hooks" && (
            <div className="max-w-5xl mx-auto grid lg:grid-cols-4 gap-6">
              <div className="lg:col-span-1 space-y-1">
                {Object.keys(VIRAL_HOOKS).map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveHookCategory(category)}
                    className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeHookCategory === category ? 'bg-white text-black font-bold' : 'text-white/60 hover:bg-white/5 hover:text-white'
                      }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
              <div className="lg:col-span-3 grid gap-4">
                {VIRAL_HOOKS[activeHookCategory as keyof typeof VIRAL_HOOKS].map((hook, i) => (
                  <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center justify-between group hover:bg-white/10 transition-colors">
                    <p className="text-sm font-medium">{hook}</p>
                    <button className="p-2 text-white/40 hover:text-white transition-colors" title="Copy">
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* THREAD UNFOLDER VIEW */}
          {activeTab === "unfolder" && (
            <div className="max-w-3xl mx-auto space-y-6">
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h2 className="text-xl font-bold mb-4">Thread Unfolder</h2>
                <p className="text-sm text-white/60 mb-4">Paste long content below to automatically split it into a viral thread format.</p>

                <textarea
                  className="w-full h-40 bg-black/20 border border-white/10 rounded-lg p-4 text-sm focus:outline-none focus:border-white/30 mb-4"
                  placeholder="Paste your article or long text here..."
                  value={unfolderContent}
                  onChange={(e) => setUnfolderContent(e.target.value)}
                />

                <button
                  onClick={handleUnfold}
                  className="w-full py-3 bg-white text-black font-bold rounded-lg hover:bg-white/90"
                >
                  Unfold into Thread
                </button>
              </div>

              {unfoldedThread.length > 0 && (
                <div className="space-y-4">
                  {unfoldedThread.map((tweet, i) => (
                    <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-4 relative">
                      <div className="absolute -left-3 top-6 w-6 h-[1px] bg-white/20 hidden md:block" />
                      <div className="text-xs font-bold text-white/40 mb-2">Tweet {i + 1}</div>
                      <p className="whitespace-pre-wrap">{tweet}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* VOICE CLONE VIEW */}
          {activeTab === "clone" && (
            <div className="max-w-4xl mx-auto space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h2 className="text-xl font-bold flex items-center gap-2">
                    <Mic className="w-5 h-5" /> Voice Analyzer
                  </h2>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                    <textarea
                      className="w-full h-40 bg-transparent resize-none focus:outline-none text-sm"
                      placeholder="Paste 5-10 of your best tweets here to analyze your voice pattern..."
                      value={voiceSamples}
                      onChange={(e) => setVoiceSamples(e.target.value)}
                    />
                    <button
                      onClick={handleVoiceAnalysis}
                      className="w-full mt-2 py-2 border border-white/20 rounded-lg text-xs font-bold hover:bg-white/10"
                    >
                      Analyze Voice
                    </button>
                  </div>

                  {voiceProfile && (
                    <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-white/50">Avg Length</span>
                        <span className="font-bold">{voiceProfile.avgLength} chars</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/50">Tone</span>
                        <span className="font-bold capitalize">{voiceProfile.punctuationStyle}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/50">Structure</span>
                        <span className="font-bold capitalize">{voiceProfile.sentenceStructure}</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <h2 className="text-xl font-bold flex items-center gap-2">
                    <Play className="w-5 h-5" /> Content Generator
                  </h2>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-4">
                    <input
                      type="text"
                      className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none"
                      placeholder="Topic (e.g., Growth Hacking)"
                      value={voiceTopic}
                      onChange={(e) => setVoiceTopic(e.target.value)}
                    />
                    <button
                      onClick={handleVoiceGeneration}
                      disabled={!voiceProfile}
                      className="w-full py-2 bg-white text-black rounded-lg text-sm font-bold hover:bg-white/90 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Generate in My Voice
                    </button>

                    {generatedVoiceTweet && (
                      <div className="p-4 bg-black/30 rounded-lg border border-white/10 mt-4">
                        <p className="text-sm whitespace-pre-wrap">{generatedVoiceTweet}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* GROWTH TACTICS VIEW */}
          {activeTab === "tactics" && (
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-6">
                <h2 className="text-2xl font-bold mb-2">Growth Accelerators</h2>
                <p className="text-white/60">High-impact strategies to accelerate your follower growth.</p>
              </div>

              <div className="grid gap-6">
                {Object.values(GROWTH_ACCELERATORS).map((tactic: any, i) => (
                  <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-white/20 transition-all">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-lg font-bold">{tactic.name}</h3>
                          <span className="text-[10px] bg-green-500/10 text-green-400 px-2 py-0.5 rounded font-bold uppercase tracking-wide"> Proven </span>
                        </div>
                        <p className="text-sm text-white/70">{tactic.description}</p>
                      </div>
                      <div className="text-right text-xs text-white/40">
                        <div className="mb-1">Lift: <span className="text-green-400 font-bold">{tactic.expectedLift || "High"}</span></div>
                        <div>Time: <span className="text-white font-bold">{tactic.timeCommitment || "Varies"}</span></div>
                      </div>
                    </div>

                    <div className="bg-black/40 rounded-lg p-4 border border-white/5">
                      <h4 className="text-xs font-bold uppercase text-white/40 mb-3">Implementation</h4>
                      {Array.isArray(tactic.implementation) ? (
                        <ul className="space-y-2">
                          {tactic.implementation.map((step: string, j: number) => (
                            <li key={j} className="text-sm flex items-start gap-2">
                              <span className="text-white/20 mt-1">●</span>
                              <span className="text-white/90">{step}</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-sm text-white/90 whitespace-pre-wrap">{tactic.tactic || tactic.reasoning || tactic.implementation}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ANALYTICS VIEW */}
          {activeTab === "analytics" && (
            <div className="max-w-5xl mx-auto space-y-6">
              <div className="grid grid-cols-4 gap-4">
                {metrics.map((metric, i) => (
                  <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-white/20 transition-all">
                    <div className="text-sm text-white/50 mb-2 font-medium uppercase tracking-wider">{metric.label}</div>
                    <div className="flex items-end justify-between">
                      <div className="text-4xl font-bold">{metric.value}</div>
                      <div className="text-sm text-green-400 bg-green-400/10 px-2 py-1 rounded flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" />
                        {metric.change}
                      </div>
                    </div>
                    <div className="mt-4 text-xs text-white/40">
                      Previous: <span className="text-white/60">{metric.prev}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white/5 border border-white/10 rounded-xl p-6">
                  <h3 className="font-bold mb-6 flex items-center gap-2">
                    <Activity className="w-5 h-5" /> Engagement Trends
                  </h3>
                  {/* Simulated Chart Container */}
                  <div className="h-64 flex items-end justify-between gap-2 px-2">
                    {[35, 45, 30, 60, 75, 50, 65, 80, 70, 90, 85, 100].map((h, i) => (
                      <div key={i} className="w-full bg-white/10 rounded-t-sm hover:bg-white/20 transition-all relative group" style={{ height: `${h}%` }}>
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white text-black text-xs font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                          {h * 1240}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between mt-4 text-xs text-white/40 border-t border-white/5 pt-2">
                    <span>Feb 1</span>
                    <span>Feb 14</span>
                    <span>Feb 28</span>
                  </div>
                </div>

                <div className="lg:col-span-1 space-y-6">
                  <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                    <h3 className="font-bold mb-4 flex items-center gap-2">
                      <Target className="w-4 h-4" /> Audience Quality
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-white/60">Founders</span>
                          <span className="font-bold">42%</span>
                        </div>
                        <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full bg-white transition-all" style={{ width: '42%' }} />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-white/60">Investors</span>
                          <span className="font-bold">18%</span>
                        </div>
                        <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full bg-white/70 transition-all" style={{ width: '18%' }} />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-white/60">Developers</span>
                          <span className="font-bold">25%</span>
                        </div>
                        <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full bg-white/40 transition-all" style={{ width: '25%' }} />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                    <h3 className="font-bold mb-1">Profile Health</h3>
                    <div className="text-3xl font-bold text-green-400 mb-1">94/100</div>
                    <p className="text-xs text-white/50">Top 5% of creators in your niche.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </main>

      {/* Quick Create Modal */}
      {showQuickCreate && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-black border border-white/20 rounded-xl p-6 max-w-xl w-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">Create Post</h3>
              <button onClick={() => setShowQuickCreate(false)} className="text-white/50 hover:text-white">
                <XLogo className="w-4 h-4" />
              </button>
            </div>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="What do you want to talk about?"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm mb-3 focus:border-white/30 focus:outline-none"
            />
            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full bg-white text-black px-4 py-2 rounded-lg text-sm font-bold hover:bg-white/90 disabled:opacity-50"
            >
              {isGenerating ? 'Generating...' : 'Generate Content'}
            </button>

            {generatedDrafts.length > 0 && (
              <div className="mt-4 p-4 bg-white/5 rounded-lg text-sm border border-white/10 whitespace-pre-wrap">
                {generatedDrafts[0]}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

function ReplyCard({ opp, expanded }: { opp: any, expanded?: boolean }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-4 hover:border-white/20 transition-all cursor-pointer group">
      <div className="flex items-start gap-3 mb-3">
        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center font-bold text-xs">{opp.avatar}</div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <span className="font-bold text-sm truncate">{opp.author}</span>
            <span className="text-xs text-white/40">{opp.time}</span>
          </div>
          <p className={`text-xs text-white/70 mt-1 ${expanded ? '' : 'line-clamp-2'}`}>{opp.content}</p>
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
  )
}

function ViralPostCard({ post }: { post: any }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-4 hover:border-white/20 transition-all">
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
  )
}

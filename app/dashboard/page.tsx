"use client"

import { useState, useEffect } from "react"
import { 
  BarChart3, Zap, TrendingUp, MessageCircle, Calendar, Sparkles, Target, 
  LogOut, MoreHorizontal, ArrowRight, Activity, Shield, Eye, Flame,
  Clock, Copy, Send, User, Settings, RefreshCw, CheckCircle, AlertCircle,
  Edit, Users, Heart, Repeat2, Search, Filter, ChevronDown, ChevronUp,
  ExternalLink, BookOpen, Layers, Wrench, Plus, TrendingDown
} from "lucide-react"
import { analyzeTweetVirality, generateTweetWithContext, VIRAL_HOOKS } from "@/lib/viral-engine"
import { scoreReplyOpportunity, generateStrategicReply, unfoldThread, GROWTH_ACCELERATORS } from "@/lib/growth-engine"

// 2026 X Logo
const XLogo = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
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
      {/* Compact Sidebar */}
      <aside className={`fixed top-0 left-0 h-screen bg-black border-r border-white/10 transition-all duration-300 ${sidebarOpen ? 'w-56' : 'w-16'} z-50`}>
        <div className="p-4 border-b border-white/10 flex items-center justify-between">
          {sidebarOpen && <div className="text-lg font-bold">LaunchAlone</div>}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-1.5 hover:bg-white/5 rounded">
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>

        {sidebarOpen && (
          <div className="px-3 py-3 border-b border-white/10">
            <div className="mb-1.5 flex items-center justify-between text-xs">
              <span className="text-white/50">AI Credits</span>
              <span className="font-bold">{aiCredits.total - aiCredits.used}/{aiCredits.total}</span>
            </div>
            <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-white transition-all" style={{ width: `${100 - creditPercentage}%` }} />
            </div>
            <div className="mt-1 text-[10px] text-white/50">Resets {aiCredits.resetIn}</div>
          </div>
        )}

        <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-white/10">
          {sidebarOpen && (
            <>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold">P</div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-bold truncate">@pedro</div>
                  <div className="text-[10px] text-white/50">Pro Plan</div>
                </div>
              </div>
              <a href="/settings" className="w-full flex items-center gap-2 px-2 py-1.5 text-white/70 hover:text-white text-xs rounded hover:bg-white/5">
                <Settings className="w-3.5 h-3.5" />Settings
              </a>
            </>
          )}
        </div>
      </aside>

      {/* Main Dashboard - DENSE LAYOUT */}
      <main className={`transition-all duration-300 ${sidebarOpen ? 'ml-56' : 'ml-16'}`}>
        
        {/* Compact Header */}
        <header className="sticky top-0 bg-black/95 backdrop-blur-xl border-b border-white/10 px-4 py-3 z-40">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <XLogo className="w-5 h-5" />
              <h1 className="text-lg font-bold">Dashboard</h1>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex gap-1 bg-white/5 p-0.5 rounded-lg border border-white/10">
                {(["7D", "30D", "90D"] as TimeRange[]).map((range) => (
                  <button
                    key={range}
                    onClick={() => setTimeRange(range)}
                    className={`px-2.5 py-1 text-[11px] uppercase tracking-wider rounded transition-all ${
                      timeRange === range ? 'bg-white text-black font-bold' : 'text-white/70 hover:text-white'
                    }`}
                  >
                    {range}
                  </button>
                ))}
              </div>
              <button 
                onClick={() => setShowQuickCreate(!showQuickCreate)}
                className="px-3 py-1.5 bg-white text-black rounded-lg text-xs font-bold hover:bg-white/90 flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                Create
              </button>
            </div>
          </div>
        </header>

        <div className="p-4 space-y-4">
          
          {/* Stats Grid - Compact */}
          <div className="grid grid-cols-4 gap-3">
            {metrics.map((metric, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-lg p-3 hover:border-white/20 transition-all">
                <div className="text-[10px] text-white/50 mb-1 uppercase tracking-wider">{metric.label}</div>
                <div className="flex items-baseline gap-1.5 mb-0.5">
                  <div className="text-2xl font-bold">{metric.value}</div>
                  <div className="text-xs text-white/70 flex items-center gap-0.5">
                    <TrendingUp className="w-2.5 h-2.5" />
                    {metric.change}
                  </div>
                </div>
                <div className="text-[10px] text-white/40">from {metric.prev}</div>
              </div>
            ))}
          </div>

          {/* Main Content Grid - 3 Columns, NO EMPTY SPACE */}
          <div className="grid grid-cols-12 gap-4">
            
            {/* Left Column: Viral Feed (5 cols) */}
            <div className="col-span-5 space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-bold flex items-center gap-2">
                  <Flame className="w-4 h-4" />
                  Viral Posts to Remix
                </h2>
                <button className="text-xs text-white/70 hover:text-white flex items-center gap-1">
                  <RefreshCw className="w-3 h-3" />
                  Refresh
                </button>
              </div>

              {VIRAL_FEED.map((post) => (
                <div key={post.id} className="bg-white/5 border border-white/10 rounded-lg p-3 hover:border-white/20 transition-all">
                  <div className="flex items-start gap-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-[10px] font-bold flex-shrink-0">
                      {post.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <span className="font-bold text-xs truncate">{post.author}</span>
                        <span className="text-white/50 text-[10px] truncate">{post.handle}</span>
                        <span className="text-white/50 text-[10px]">• {post.time}</span>
                      </div>
                      <p className="text-xs leading-relaxed mb-2 line-clamp-3">{post.content}</p>
                      
                      <div className="flex items-center gap-3 text-[10px] text-white/50 mb-2">
                        <div className="flex items-center gap-0.5">
                          <Eye className="w-3 h-3" />
                          {(post.impressions / 1000).toFixed(0)}K
                        </div>
                        <div className="flex items-center gap-0.5">
                          <Heart className="w-3 h-3" />
                          {post.likes.toLocaleString()}
                        </div>
                        <div className="flex items-center gap-0.5">
                          <Repeat2 className="w-3 h-3" />
                          {post.retweets}
                        </div>
                        <div className="flex items-center gap-0.5 ml-auto text-white font-bold">
                          <Zap className="w-3 h-3" />
                          {post.score}/100
                        </div>
                      </div>

                      <div className="flex gap-1.5">
                        <button className="flex-1 px-2 py-1 bg-white text-black rounded text-[10px] font-bold hover:bg-white/90">
                          Remix
                        </button>
                        <button className="px-2 py-1 border border-white/20 rounded text-[10px] font-bold hover:bg-white/5">
                          View
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Middle Column: Reply Opportunities (4 cols) */}
            <div className="col-span-4 space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-bold flex items-center gap-2">
                  <MessageCircle className="w-4 h-4" />
                  Reply Opportunities
                </h2>
                <div className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white"></span>
                </div>
              </div>

              {REPLY_OPPORTUNITIES.map((opp) => (
                <div key={opp.id} className="bg-white/5 border border-white/10 rounded-lg p-3 hover:border-white/20 transition-all">
                  <div className="flex items-start gap-2 mb-2">
                    <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-[10px] font-bold flex-shrink-0">
                      {opp.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1 mb-0.5">
                        <span className="font-bold text-[11px] truncate">{opp.author}</span>
                        <span className="text-white/50 text-[10px]">• {opp.time}</span>
                      </div>
                      <p className="text-[11px] text-white/70 mb-1.5 line-clamp-2">{opp.content}</p>
                      
                      <div className="flex items-center gap-2 text-[10px] mb-2">
                        <div className="flex items-center gap-0.5 text-white/50">
                          <Eye className="w-2.5 h-2.5" />
                          {(opp.impressions / 1000).toFixed(0)}K
                        </div>
                        <div className="flex items-center gap-0.5 text-white/50">
                          <TrendingUp className="w-2.5 h-2.5" />
                          {opp.velocity}/min
                        </div>
                        <div className="flex items-center gap-0.5 ml-auto text-white font-bold">
                          <Zap className="w-2.5 h-2.5" />
                          {opp.score}/100
                        </div>
                      </div>

                      {expandedPost === opp.id && (
                        <div className="bg-black/50 border border-white/10 rounded p-2 mb-2">
                          <div className="text-[10px] text-white/50 mb-1">Suggested Reply:</div>
                          <p className="text-[11px] leading-relaxed mb-1">{opp.suggestedReply}</p>
                          <div className="text-[10px] text-white/40 italic">{opp.reasoning}</div>
                        </div>
                      )}

                      <div className="flex gap-1">
                        <button 
                          onClick={() => setExpandedPost(expandedPost === opp.id ? null : opp.id)}
                          className="flex-1 px-2 py-1 bg-white text-black rounded text-[10px] font-bold hover:bg-white/90 flex items-center justify-center gap-0.5"
                        >
                          {expandedPost === opp.id ? <ChevronUp className="w-2.5 h-2.5" /> : <ChevronDown className="w-2.5 h-2.5" />}
                          {expandedPost === opp.id ? 'Hide' : 'View Reply'}
                        </button>
                        <button className="px-2 py-1 border border-white/20 rounded text-[10px] font-bold hover:bg-white/5">
                          Post
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Column: Top Posts, Schedule, Tools (3 cols) */}
            <div className="col-span-3 space-y-3">
              
              {/* Top Posts */}
              <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                <h3 className="text-xs font-bold mb-2 flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5" />
                  Your Top Posts
                </h3>
                {TOP_POSTS.map((post, i) => (
                  <div key={i} className="mb-2 pb-2 border-b border-white/10 last:border-0">
                    <p className="text-[11px] mb-1 line-clamp-1 font-medium">{post.content}</p>
                    <div className="flex items-center gap-2 text-[10px] text-white/50">
                      <span>{post.impressions} views</span>
                      <span>•</span>
                      <span>{post.engagement}</span>
                      <span className="ml-auto">{post.date}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Scheduled */}
              <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                <h3 className="text-xs font-bold mb-2 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  Scheduled ({SCHEDULED_POSTS.length})
                </h3>
                {SCHEDULED_POSTS.map((post, i) => (
                  <div key={i} className="mb-2 pb-2 border-b border-white/10 last:border-0">
                    <p className="text-[11px] mb-1 line-clamp-2">{post.content}</p>
                    <div className="text-[10px] text-white/50 flex items-center gap-1">
                      <Clock className="w-2.5 h-2.5" />
                      {post.time}
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Tools */}
              <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                <h3 className="text-xs font-bold mb-2">Quick Tools</h3>
                <div className="space-y-1.5">
                  <a href="/settings" className="flex items-center gap-2 px-2 py-1.5 bg-white/5 rounded text-[11px] hover:bg-white/10">
                    <BookOpen className="w-3.5 h-3.5" />
                    500+ Viral Hooks
                  </a>
                  <button className="w-full flex items-center gap-2 px-2 py-1.5 bg-white/5 rounded text-[11px] hover:bg-white/10">
                    <Layers className="w-3.5 h-3.5" />
                    Thread Unfolder
                  </button>
                  <button className="w-full flex items-center gap-2 px-2 py-1.5 bg-white/5 rounded text-[11px] hover:bg-white/10">
                    <Wrench className="w-3.5 h-3.5" />
                    Growth Tactics
                  </button>
                  <button className="w-full flex items-center gap-2 px-2 py-1.5 bg-white/5 rounded text-[11px] hover:bg-white/10">
                    <Target className="w-3.5 h-3.5" />
                    Voice Clone
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Quick Create Modal */}
      {showQuickCreate && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-black border border-white/20 rounded-xl p-4 max-w-2xl w-full">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-bold">Quick Create</h3>
              <button onClick={() => setShowQuickCreate(false)} className="text-white/70 hover:text-white">
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
              <div className="mt-4 space-y-2">
                {generatedDrafts.map((draft, i) => (
                  <div key={i} className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-sm mb-2">{draft}</p>
                    <button className="px-3 py-1 bg-white text-black rounded text-xs font-bold hover:bg-white/90">
                      Use This
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

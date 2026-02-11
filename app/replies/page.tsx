"use client"

import { useState, useEffect } from "react"
import { Zap, RefreshCw, Clock, TrendingUp, Users, MessageCircle, Send, Edit, X } from "lucide-react"
import { scoreReplyOpportunity, generateStrategicReply, type ReplyOpportunity } from "@/lib/growth-engine"

export default function RepliesPage() {
  const [opportunities, setOpportunities] = useState<ReplyOpportunity[]>([])
  const [isScanning, setIsScanning] = useState(false)
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date())
  const [filter, setFilter] = useState<"all" | "viral_brewing" | "authority_reply" | "engagement_magnet">("all")
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editedReply, setEditedReply] = useState("")

  // Simulated opportunities (in production, this would call X API)
  const mockOpportunities: ReplyOpportunity[] = [
    {
      id: "1",
      author: "Sarah Chen",
      handle: "@sarahbuilds",
      followers: 45000,
      tweet: "Finally hit 10K followers after 8 months of consistent posting. Biggest lesson: reply strategy > standalone posts. Engagement compounds faster than you think.",
      timestamp: new Date(Date.now() - 15 * 60000), // 15 min ago
      score: 94,
      metrics: {
        likes: 180,
        retweets: 45,
        replies: 8,
        velocity: 12 // likes per minute
      },
      suggestedReply: "Congrats on 10K! This is exactly right. I went from 800 to 5K in 60 days using reply-first strategy. The key: reply to posts in your niche within first 5 minutes. Your profile taps will spike.",
      reasoning: "Viral velocity (12 likes/min), low reply count (8), highly engaged audience",
      category: "viral_brewing"
    },
    {
      id: "2",
      author: "Alex Hormozi",
      handle: "@AlexHormozi",
      followers: 890000,
      tweet: "Most entrepreneurs optimize for profit. The best optimize for learning velocity. Profit follows learning.",
      timestamp: new Date(Date.now() - 8 * 60000),
      score: 91,
      metrics: {
        likes: 1200,
        retweets: 280,
        replies: 45,
        velocity: 150
      },
      suggestedReply: "This is the insight that changed my business. When I switched from 'how do I make money?' to 'what can I learn this month?', revenue actually increased. Learning velocity compounds.",
      reasoning: "High-authority account, massive reach, good reply positioning opportunity",
      category: "authority_reply"
    },
    {
      id: "3",
      author: "Mike Johnson",
      handle: "@mikegrows",
      followers: 8500,
      tweet: "My X engagement dropped from 5% to 1.2%. I'm posting daily, using hashtags, posting at 'optimal times'. What am I missing?",
      timestamp: new Date(Date.now() - 25 * 60000),
      score: 88,
      metrics: {
        likes: 42,
        retweets: 8,
        replies: 15,
        velocity: 1.7
      },
      suggestedReply: "I had the exact same problem. Here's what fixed it for me: 1) Stop using hashtags (they kill reach on X), 2) Post 30% less, reply 300% more, 3) End every post with a question. My engagement went from 1.1% to 4.2% in 45 days.",
      reasoning: "Asking for help, high engagement potential, easy to provide value",
      category: "engagement_magnet"
    },
    {
      id: "4",
      author: "Emma Rodriguez",
      handle: "@emmabuilds",
      followers: 23000,
      tweet: "Spent 6 months building my product in stealth. Launched yesterday. 0 sales. The 'build it and they will come' myth is real.",
      timestamp: new Date(Date.now() - 45 * 60000),
      score: 86,
      metrics: {
        likes: 310,
        retweets: 67,
        replies: 34,
        velocity: 6.9
      },
      suggestedReply: "This hits hard. Same thing happened to me. What I learned: build the audience WHILE building the product. I now share weekly updates, behind-the-scenes, struggles. Launch day I had 2K interested followers. 47 sales in first week.",
      reasoning: "Emotional story, relatable pain point, viral potential",
      category: "viral_brewing"
    },
    {
      id: "5",
      author: "David Park",
      handle: "@davidonx",
      followers: 12400,
      tweet: "Unpopular opinion: Morning routines are overrated. I've had my best years waking up at random times and just getting to work.",
      timestamp: new Date(Date.now() - 12 * 60000),
      score: 84,
      metrics: {
        likes: 89,
        retweets: 18,
        replies: 27,
        velocity: 7.4
      },
      suggestedReply: "I used to obsess over my morning routine. Then I realized: the 'perfect morning' was procrastination. Now I wake up, grab coffee, and start working within 10 minutes. 10x more productive.",
      reasoning: "Contrarian take, sparking debate, good engagement",
      category: "engagement_magnet"
    }
  ]

  useEffect(() => {
    // Initialize with mock data
    setOpportunities(mockOpportunities)
  }, [])

  const handleScan = async () => {
    setIsScanning(true)
    
    // Simulate API call to X to find new opportunities
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // In production, this would:
    // 1. Call X API to search recent tweets in user's niche
    // 2. Score each tweet using scoreReplyOpportunity()
    // 3. Generate strategic replies using generateStrategicReply()
    // 4. Return sorted by score
    
    setOpportunities(mockOpportunities)
    setLastRefresh(new Date())
    setIsScanning(false)
  }

  const filteredOpps = filter === "all" 
    ? opportunities 
    : opportunities.filter(opp => opp.category === filter)

  const handleEdit = (id: string, currentReply: string) => {
    setEditingId(id)
    setEditedReply(currentReply)
  }

  const handleSaveEdit = (id: string) => {
    setOpportunities(prev => prev.map(opp => 
      opp.id === id ? { ...opp, suggestedReply: editedReply } : opp
    ))
    setEditingId(null)
    setEditedReply("")
  }

  const handlePost = async (opportunity: ReplyOpportunity) => {
    // In production, this would call X API to post the reply
    alert(`Posting reply to ${opportunity.handle}:\n\n${opportunity.suggestedReply}`)
    
    // Remove from opportunities after posting
    setOpportunities(prev => prev.filter(opp => opp.id !== opportunity.id))
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Header */}
      <div className="border-b border-[#222] bg-[#111] sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-['Bebas_Neue'] tracking-wider">REPLY FINDER</h1>
              <p className="text-xs sm:text-sm text-gray-500">High-impact opportunities refreshed every 5min</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500">
                <div className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00ff88] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00ff88]"></span>
                </div>
                <span className="hidden sm:inline">Last scan: {Math.floor((Date.now() - lastRefresh.getTime()) / 60000)}min ago</span>
              </div>
              <button
                onClick={handleScan}
                disabled={isScanning}
                className="bg-[#00ff88] text-black px-4 sm:px-6 py-2 rounded-lg font-bold uppercase tracking-wider text-xs sm:text-sm hover:bg-[#00cc66] transition-all flex items-center gap-2 disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${isScanning ? 'animate-spin' : ''}`} />
                {isScanning ? 'Scanning...' : 'Scan Now'}
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
            {[
              { id: "all", label: "All Opportunities", count: opportunities.length },
              { id: "viral_brewing", label: "Viral Brewing 🔥", count: opportunities.filter(o => o.category === "viral_brewing").length },
              { id: "authority_reply", label: "Authority 👑", count: opportunities.filter(o => o.category === "authority_reply").length },
              { id: "engagement_magnet", label: "Engagement 💬", count: opportunities.filter(o => o.category === "engagement_magnet").length },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id as any)}
                className={`flex-shrink-0 px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                  filter === f.id
                    ? 'bg-[#00ff88] text-black'
                    : 'bg-[#0a0a0a] border border-[#222] text-gray-400 hover:border-[#00ff88]/50'
                }`}
              >
                {f.label} <span className="ml-1">({f.count})</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Opportunities */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-4">
        {filteredOpps.length === 0 ? (
          <div className="bg-[#111] border border-[#222] rounded-2xl p-12 text-center">
            <div className="text-gray-500 mb-4">
              <MessageCircle className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>No opportunities found. Try scanning again!</p>
            </div>
            <button
              onClick={handleScan}
              className="bg-[#00ff88] text-black px-6 py-2 rounded-lg font-bold uppercase tracking-wider text-sm hover:bg-[#00cc66] transition-all"
            >
              Scan for Opportunities
            </button>
          </div>
        ) : (
          filteredOpps.map((opp) => (
            <div key={opp.id} className="bg-[#111] border border-[#222] rounded-2xl p-4 sm:p-6 hover:border-[#00ff88]/30 transition-all">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-[#00ff88]/20 to-transparent flex items-center justify-center text-lg sm:text-xl font-bold">
                    {opp.author.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-sm sm:text-base">{opp.author}</div>
                    <div className="text-xs sm:text-sm text-gray-500 flex items-center gap-2">
                      <span>{opp.handle}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        {opp.followers.toLocaleString()}
                      </span>
                      <span>•</span>
                      <Clock className="w-3 h-3" />
                      <span>{Math.floor((Date.now() - opp.timestamp.getTime()) / 60000)}m ago</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-right">
                    <div className="text-2xl sm:text-3xl font-['Bebas_Neue'] text-[#00ff88]">{opp.score}</div>
                    <div className="text-xs text-gray-500">Score</div>
                  </div>
                  <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-[#00ff88]" />
                </div>
              </div>

              {/* Original Tweet */}
              <div className="bg-[#0a0a0a] border border-[#222] rounded-lg p-4 mb-4">
                <p className="text-sm sm:text-base leading-relaxed">{opp.tweet}</p>
              </div>

              {/* Metrics */}
              <div className="flex flex-wrap gap-3 sm:gap-4 mb-4 text-xs sm:text-sm">
                <div className="flex items-center gap-2 text-gray-500">
                  <TrendingUp className="w-4 h-4 text-[#00ff88]" />
                  <span>{opp.metrics.velocity.toFixed(1)} likes/min</span>
                </div>
                <div className="flex items-center gap-2 text-gray-500">
                  <span>❤️ {opp.metrics.likes}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-500">
                  <span>🔁 {opp.metrics.retweets}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-500">
                  <MessageCircle className="w-4 h-4" />
                  <span>{opp.metrics.replies} replies</span>
                </div>
              </div>

              {/* Reasoning */}
              <div className="bg-[#00ff88]/5 border-l-2 border-[#00ff88] pl-4 py-2 mb-4">
                <div className="text-xs uppercase tracking-widest text-[#00ff88] mb-1">Why This Opportunity</div>
                <p className="text-xs sm:text-sm text-gray-400">{opp.reasoning}</p>
              </div>

              {/* Suggested Reply */}
              <div className="mb-4">
                <div className="text-xs uppercase tracking-widest text-gray-500 mb-2">Suggested Reply</div>
                {editingId === opp.id ? (
                  <div>
                    <textarea
                      value={editedReply}
                      onChange={(e) => setEditedReply(e.target.value)}
                      className="w-full bg-[#0a0a0a] border border-[#222] rounded-lg px-4 py-3 text-sm focus:border-[#00ff88] focus:outline-none min-h-[100px] resize-none mb-2"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleSaveEdit(opp.id)}
                        className="px-4 py-2 bg-[#00ff88] text-black rounded-lg font-bold text-xs uppercase tracking-wider hover:bg-[#00cc66] transition-all"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="px-4 py-2 border border-[#222] rounded-lg font-bold text-xs uppercase tracking-wider hover:border-[#00ff88] transition-all"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="bg-gradient-to-r from-[#00ff88]/5 to-transparent border border-[#222] rounded-lg p-4">
                    <p className="text-sm leading-relaxed mb-2">{opp.suggestedReply}</p>
                    <div className="text-xs text-gray-600">{opp.suggestedReply.length}/280 characters</div>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => handlePost(opp)}
                  className="flex-1 sm:flex-none bg-[#00ff88] text-black px-6 py-2.5 rounded-lg font-bold uppercase tracking-wider text-xs sm:text-sm hover:bg-[#00cc66] transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Post Reply
                </button>
                <button
                  onClick={() => handleEdit(opp.id, opp.suggestedReply)}
                  className="flex-1 sm:flex-none px-6 py-2.5 border border-[#222] rounded-lg font-bold uppercase tracking-wider text-xs sm:text-sm hover:border-[#00ff88] hover:text-[#00ff88] transition-all flex items-center justify-center gap-2"
                >
                  <Edit className="w-4 h-4" />
                  Edit
                </button>
                <button
                  onClick={() => setOpportunities(prev => prev.filter(o => o.id !== opp.id))}
                  className="px-4 py-2.5 border border-[#222] rounded-lg font-bold uppercase tracking-wider text-xs sm:text-sm hover:border-red-500 hover:text-red-500 transition-all flex items-center justify-center gap-2"
                >
                  <X className="w-4 h-4" />
                  <span className="hidden sm:inline">Skip</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

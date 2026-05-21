import React, { useState } from 'react';

interface Comment {
  id: number;
  user: string;
  badge: string;
  text: string;
  votes: number;
  time: string;
}

export const CommunityLayer: React.FC = () => {
  const [votes, setVotes] = useState<Record<number, number>>({ 1: 14, 2: 5 });
  const [comments, setComments] = useState<Comment[]>([
    { id: 1, user: "DevNode_Hyd", badge: "Pro Contributor", text: "Verified this with SBI Paderu branch code, the IFSC sequence generation matches 100% correctly. Saved 10 minutes of manual checking.", votes: 14, time: "3 hours ago" },
    { id: 2, user: "AlphaTraders_US", badge: "Enterprise", text: "The ABA routing interpolation node fallback is extremely fast. Perfect wrapper for validation pipelines.", votes: 5, time: "1 day ago" }
  ]);
  const [newComment, setNewComment] = useState('');

  const handleVote = (id: number) => {
    setVotes(prev => ({ ...prev, [id]: prev[id] + 1 }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    
    const freshComment: Comment = {
      id: Date.now(),
      user: "Guest_Node_" + Math.floor(Math.random() * 900),
      badge: "Verified User",
      text: newComment,
      votes: 0,
      time: "Just now"
    };
    setComments([freshComment, ...comments]);
    setNewComment('');
  };

  return (
    <div className="mt-8 p-6 bg-slate-900/40 border border-slate-800 rounded-2xl max-w-5xl mx-auto">
      <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2 mb-4">
        <span className="text-emerald-400">💬</span> Node Community Discussions
      </h3>
      
      {/* Input Form */}
      <form onSubmit={handleSubmit} className="mb-6 space-y-3">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Share your verification feedback or prompt insights for this regional node..."
          className="w-full h-20 p-3 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono text-xs focus:outline-none focus:border-blue-500 resize-none"
        />
        <button type="submit" className="px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs uppercase font-bold rounded-lg transition-colors">
          Post Feed Node
        </button>
      </form>

      {/* Dynamic Comments List */}
      <div className="space-y-4">
        {comments.map((c) => (
          <div key={c.id} className="p-4 bg-slate-950/60 border border-slate-800/60 rounded-xl flex gap-3 items-start">
            <div className="flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-mono font-bold text-white">{c.user}</span>
                <span className="text-[9px] font-mono bg-blue-500/10 text-blue-400 px-1.5 py-0.2 rounded border border-blue-500/10">{c.badge}</span>
                <span className="text-[10px] font-mono text-slate-600 ml-auto">{c.time}</span>
              </div>
              <p className="text-xs text-slate-300 mt-2 font-sans leading-relaxed">{c.text}</p>
            </div>
            
            {/* Upvote Button */}
            <button 
              onClick={() => handleVote(c.id)}
              className="flex flex-col items-center justify-center px-2 py-1 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded text-slate-500 hover:text-emerald-400 transition-colors"
            >
              <span className="text-xs">▲</span>
              <span className="text-[10px] font-mono font-bold mt-0.5">{votes[c.id] || 0}</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

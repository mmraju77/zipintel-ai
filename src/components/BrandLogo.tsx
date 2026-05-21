import React from 'react';

export const BrandLogo: React.FC<{ className?: string }> = ({ className = "h-8" }) => {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* Dynamic AI Portal Geometric Icon */}
      <svg className="h-full w-auto" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="40" height="40" rx="10" fill="#1E293B" stroke="#334155" strokeWidth="1.5"/>
        {/* Zip Lightning Bolt Lightning Node */}
        <path d="M22 10L12 22H21L19 30L29 18H20L22 10Z" fill="#2563EB" className="animate-pulse"/>
        {/* Quantum Intel Dot */}
        <circle cx="29" cy="12" r="3" fill="#10B981" />
      </svg>
      
      {/* Brand Text Typography */}
      <span className="font-sans font-bold tracking-tight text-white text-xl">
        Zip<span className="text-blue-500 font-medium">Intel</span>
        <span className="ml-1 text-xs font-mono px-1.5 py-0.5 bg-slate-800 text-emerald-400 rounded border border-slate-700">AI</span>
      </span>
    </div>
  );
};

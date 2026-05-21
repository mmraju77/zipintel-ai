import React from 'react';
import { Link } from 'react-router-dom';

export const TrustFooter: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full mt-16 bg-[#070a12] border-t border-slate-800/80 text-slate-400 py-10 px-6 font-sans">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        
        {/* Column 1: Brand Authority Description */}
        <div className="md:col-span-2 space-y-3">
          <div className="flex items-center gap-2">
            <span className="font-sans font-bold tracking-tight text-white text-lg">
              Zip<span className="text-blue-500 font-medium">Intel</span> AI
            </span>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed max-w-sm">
            Oka scalable digital ecosystem for context-aware global financial routing matrix computations. Providing deterministic verification patterns for 17 target countries with zero latency.
          </p>
        </div>

        {/* Column 2: Quick Compliance / Legal Links */}
        <div>
          <h4 className="text-xs font-mono uppercase tracking-widest text-slate-400 font-bold mb-3">Legal Registry</h4>
          <ul className="space-y-2 text-xs font-mono">
            <li><Link to="/privacy" className="hover:text-emerald-400 transition-colors">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-emerald-400 transition-colors">Terms of Service</Link></li>
            <li><Link to="/disclaimer" className="hover:text-emerald-400 transition-colors">Financial Disclaimer</Link></li>
          </ul>
        </div>

        {/* Column 3: Trust & Security Indicators */}
        <div>
          <h4 className="text-xs font-mono uppercase tracking-widest text-slate-400 font-bold mb-3">System Authority</h4>
          <div className="space-y-2">
            {/* SSL & GDPR Badges */}
            <div className="flex items-center gap-2 text-[10px] font-mono text-emerald-400 bg-emerald-500/5 border border-emerald-500/10 px-2 py-1 rounded w-fit">
              <span>🔒 SSL SECURE NODE</span>
            </div>
            <div className="flex items-center gap-2 text-[10px] font-mono text-blue-400 bg-blue-500/5 border border-blue-500/10 px-2 py-1 rounded w-fit">
              <span>🇪🇺 GDPR COMPLIANT</span>
            </div>
            <div className="flex items-center gap-2 text-[10px] font-mono text-slate-400 bg-slate-800/50 border border-slate-700/50 px-2 py-1 rounded w-fit">
              <span>⚡ HOSTING: VERCEL EDGE</span>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Footer Fine Print */}
      <div className="max-w-6xl mx-auto pt-6 border-t border-slate-900 flex flex-wrap justify-between items-center gap-4 text-[11px] font-mono text-slate-600">
        <p>© {currentYear} ZipIntel AI Digital Infrastructure. All rights reserved.</p>
        <p className="text-slate-500">
          Founder Status: <span className="text-slate-400">Verified Professional Node Connected via LinkedIn</span>
        </p>
      </div>
    </footer>
  );
};

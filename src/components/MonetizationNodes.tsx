import React from 'react';

export const MonetizationNodes: React.FC<{ zone?: 'sidebar' | 'bottom' }> = ({ zone = 'bottom' }) => {
  
  if (zone === 'sidebar') {
    return (
      <div className="p-4.5 bg-gradient-to-br from-blue-950/40 to-slate-900 border border-blue-500/20 rounded-xl relative overflow-hidden shadow-sm">
        {/* Decorative background pulse */}
        <div className="absolute -right-6 -top-6 w-20 h-20 bg-blue-500/10 rounded-full blur-xl"></div>
        
        <span className="text-[9px] font-mono uppercase bg-blue-500/10 text-blue-400 border border-blue-500/20 px-1.5 py-0.5 rounded tracking-widest font-bold">
          Sponsored Asset
        </span>
        
        <h4 className="text-sm font-bold text-white mt-2.5">Need Bulk API Automation?</h4>
        <p className="text-xs text-slate-400 mt-1 leading-normal">
          Export thousands of global routing indices directly via premium JSON Webhook wrapper configurations.
        </p>
        
        <button className="w-full mt-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white font-mono text-[11px] font-bold uppercase rounded transition-all">
          Upgrade to Premium Tier
        </button>
      </div>
    );
  }

  // Bottom Banner View - Perfect for pSEO Layout Footers
  return (
    <div className="w-full p-5 bg-slate-900/80 border border-slate-800 rounded-xl flex flex-wrap items-center justify-between gap-4 mt-8">
      <div className="flex items-center gap-3.5">
        <div className="w-10 h-10 rounded-lg bg-emerald-500/15 border border-emerald-500/20 flex items-center justify-center text-xl text-emerald-400 font-mono">
          $
        </div>
        <div>
          <h4 className="text-sm font-bold text-white">Automate Your Business Infrastructure With Top Affiliate Tools</h4>
          <p className="text-xs text-slate-400 mt-0.5">Secure professional international business accounts with our verified premium hosting and finance nodes.</p>
        </div>
      </div>
      
      {/* Monetization Actions */}
      <div className="flex items-center gap-3">
        {/* Mock AdSense Slot Placeholder */}
        <div className="hidden lg:block px-4 py-1.5 bg-slate-950 border border-slate-800 rounded text-[10px] font-mono text-slate-600 tracking-wider">
          ADVERTISEMENT SLOTACTIVE
        </div>
        <a 
          href="https://www.hostinger.com" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-bold uppercase rounded-lg transition-colors shadow-md"
        >
          Claim Promo Discount →
        </a>
      </div>
    </div>
  );
};

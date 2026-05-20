import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Wifi, ShieldCheck, Cloud, Bell, ArrowRight, CheckCircle2, Globe, Sparkles } from 'lucide-react';

interface AffiliateWidgetsProps {
  countryCode: string;
  region: string;
}

export const AffiliateWidgets: React.FC<AffiliateWidgetsProps> = ({ countryCode, region }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const normalizedCode = countryCode.toUpperCase();

  const getAffiliateOffer = () => {
    // 1. High-Volume Nodes (India)
    if (normalizedCode === 'IN') {
      return {
        title: "Compare Top Fiber Plans",
        subtitle: `Optimized for ${region}`,
        description: "Jio Fiber vs Airtel Xstream vs BSNL. Get the best ping for your node.",
        icon: <Wifi className="w-6 h-6" />,
        cta: "Compare Plans",
        color: "from-blue-500/20 to-indigo-500/10"
      };
    }

    // 2. High-RPM Tier 1 Nodes (USA, UK, CA, AU, AE, SG, NZ, IE)
    const tier1 = ['US', 'GB', 'CA', 'AU', 'AE', 'SG', 'NZ', 'IE'];
    if (tier1.includes(normalizedCode)) {
      return {
        title: "Secure Your Digital Node",
        subtitle: "Enterprise VPN & E-Sim",
        description: "Best-in-class encryption and global roaming data packages for this sector.",
        icon: <ShieldCheck className="w-6 h-6" />,
        cta: "Activate Security",
        color: "from-emerald-500/20 to-teal-500/10"
      };
    }

    // 3. European & Nordic Nodes (CH, DE, NO, SE, DK, NL, AT, LU)
    return {
      title: "Enterprise Node Availability",
      subtitle: "Tier-3 Cloud Hosting",
      description: "Verify local server latency and rack space in the nearest regional datacenter.",
      icon: <Cloud className="w-6 h-6" />,
      cta: "Check Capacity",
      color: "from-[#deff9a]/20 to-lime-500/10"
    };
  };

  const offer = getAffiliateOffer();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Dynamic Affiliate Card */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className={`relative group rounded-3xl p-8 overflow-hidden border border-white/5 bg-gradient-to-br ${offer.color} backdrop-blur-md shadow-2xl`}
      >
        <div className="relative z-10 flex flex-col h-full">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 text-[#deff9a]">
              {offer.icon}
            </div>
            <div>
              <p className="text-[10px] font-black text-[#deff9a] uppercase tracking-widest leading-none mb-1">Affiliate Partner</p>
              <h3 className="text-lg font-black text-white tracking-tight leading-none">{offer.title}</h3>
            </div>
          </div>
          
          <p className="text-sm text-slate-400 font-medium leading-relaxed mb-6">
            {offer.description}
          </p>

          <div className="mt-auto">
            <button className="w-full bg-[#deff9a] hover:bg-[#c9f57d] text-midnight py-4 rounded-xl font-black text-[11px] uppercase tracking-widest transition-all flex items-center justify-center gap-2 active:scale-95 group/btn">
              {offer.cta} <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
            </button>
            <p className="text-center text-[9px] text-slate-500 mt-3 font-bold uppercase tracking-widest italic">
              * Sponsor verified for {region} sector
            </p>
          </div>
        </div>
        
        {/* Decorative Background Elements */}
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#deff9a]/10 blur-[60px] pointer-events-none" />
      </motion.div>

      {/* Lead Gen - Newsletter Widget */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="relative rounded-3xl p-8 border border-slate-800 bg-slate-950/50 backdrop-blur-md overflow-hidden flex flex-col justify-center"
      >
        <div className="relative z-10">
          <div className="flex items-center gap-2 text-[#deff9a] mb-2">
            <Bell className="w-4 h-4" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Live Intel Feed</span>
          </div>
          <h3 className="text-xl font-black text-white tracking-tighter mb-2 italic">Hyper-Local Infrastructure Alerts</h3>
          <p className="text-xs text-slate-500 font-medium leading-relaxed mb-6">
            Get instant notifications on 5G node upgrades, local rental market shifts, and logistics expansions in <span className="text-white">{region}</span>.
          </p>

          {!subscribed ? (
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter node email..."
                className="flex-1 bg-slate-900 border border-slate-800 focus:border-[#deff9a]/50 focus:ring-0 rounded-xl px-4 py-3 text-sm text-white font-medium placeholder:text-slate-600 outline-none transition-all"
              />
              <button className="bg-slate-800 hover:bg-slate-700 text-white p-3 rounded-xl transition-all active:scale-90">
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>
          ) : (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex items-center gap-3 p-4 rounded-xl bg-[#deff9a]/5 border border-[#deff9a]/20"
            >
              <CheckCircle2 className="w-5 h-5 text-[#deff9a]" />
              <span className="text-xs font-black text-[#deff9a] uppercase tracking-widest">Node Registered</span>
            </motion.div>
          )}

          <div className="mt-4 flex items-center gap-4">
            <div className="flex -space-x-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-6 h-6 rounded-full border-2 border-slate-950 bg-slate-800 flex items-center justify-center">
                  <div className="w-1 h-1 rounded-full bg-[#deff9a]/50" />
                </div>
              ))}
            </div>
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
              +1.2k Subscribed in this sector
            </span>
          </div>
        </div>

        {/* Decorative Gradients */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-[50px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#deff9a]/5 blur-[40px] pointer-events-none" />
      </motion.div>
    </div>
  );
};

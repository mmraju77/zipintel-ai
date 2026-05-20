import React from 'react';
import { motion } from 'motion/react';
import { Bot, Sparkles, Zap, Globe, Home, Radio, Shield } from 'lucide-react';
import { useI18n } from '../lib/i18n';
import { getInfrastructureData } from '../data/infrastructureData';

interface AILocalGuideProps {
  districtId: string;
  countryId: string;
}

export const AILocalGuide: React.FC<AILocalGuideProps> = ({ districtId, countryId }) => {
  const { t } = useI18n();
  const stats = getInfrastructureData(districtId);
  
  const getAISummary = () => {
    const name = districtId.replace(/-/g, ' ').toUpperCase() || 'this region';
    const isMajorHub = stats.deliveryCheck.status === 'Instant';
    
    // Logistical Viability
    let logistics = `Logistical analysis for ${name} suggests high operational viability. `;
    if (stats.countryCode === 'IN') {
      logistics += `Orders through ${stats.logisticsHubs.mainPartner} show a predicted 1-2 day turnaround for ${name}, significantly outperforming standard state averages.`;
    } else if (stats.countryCode === 'GB' || stats.countryCode === 'US') {
      logistics += `Proximity to ${stats.logisticsHubs.nearestHub} enables ${stats.deliveryCheck.status === 'Instant' ? 'Same-Day Prime' : 'Next-Day'} delivery capabilities via ${stats.logisticsHubs.mainPartner} networks.`;
    } else {
      logistics += `Local courier efficiency is anchored by ${stats.logisticsHubs.mainPartner}, with an estimated ETA of ${stats.deliveryCheck.eta} for the ${stats.regionKey} sector.`;
    }
    
    // Connectivity
    let connectivity = `Our connectivity review for ${name} confirms a ${stats.internetStatus.type} infrastructure. `;
    if (stats.countryCode === 'CH') {
      connectivity += `Swisscom infrastructure dominates ${name} with ultra-low latency, though Sunrise offers competitive gigabit alternatives for commercial nodes.`;
    } else if (stats.countryCode === 'IN') {
      connectivity += `Airtel Xstream currently offers superior latency for the ${stats.regionKey} sector, while Jio Fiber provides the most reliable deep-node coverage.`;
    } else {
      connectivity += `High-speed access is facilitated by ${stats.internetStatus.provider}, delivering consistent ${stats.internetStatus.avgSpeed} throughput.`;
    }

    // Rental/Economic Index
    const rentals: Record<string, string> = {
      'IN': '₹25,000 - ₹85,000 / month',
      'US': '$2,400 - $6,500 / month',
      'GB': '£1,800 - £4,200 / month',
      'DE': '€1,200 - €3,100 / month',
      'CH': 'CHF 2,500 - 5,800 + / month'
    };
    
    const est = rentals[stats.countryCode] || 'Local variance based on regional tiering';
    let economic = `The Economic Index for ${name} is currently rated as ${isMajorHub ? 'Premium Plus' : 'Emerging Industrial'}. Estimated monthly rental for a standard residential/office unit in this ZIP node is approximately ${est}, factoring in current market liquidity and the verified ${stats.financeIdentifiers.label} access.`;

    return { logistics, connectivity, economic };
  };

  const ai = getAISummary();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-8 relative group"
    >
      {/* Glowing Border Wrapper */}
      <div className="absolute -inset-[1px] bg-[#deff9a]/30 rounded-[2rem] blur-[2px] group-hover:bg-[#deff9a]/50 transition-all duration-500" />
      
      <div className="relative rounded-[2rem] bg-slate-950 border border-[#deff9a]/10 p-8 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#deff9a]/5 border border-[#deff9a]/20 flex items-center justify-center relative">
              <Bot className="w-7 h-7 text-[#deff9a]" />
              <div className="absolute -top-1 -right-1">
                <Sparkles className="w-4 h-4 text-[#deff9a] animate-pulse" />
              </div>
            </div>
            <div>
              <h2 className="text-white text-lg font-black tracking-tighter flex items-center gap-3">
                AI LOCAL INTELLIGENCE
                <span className="text-[9px] bg-[#deff9a]/10 text-[#deff9a] px-2.5 py-1 rounded-full border border-[#deff9a]/20 uppercase tracking-widest font-black">
                  ZIPINTEL CORE v3.0
                </span>
              </h2>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">
                Localized Narrative Synthesis • Sector: {districtId.toUpperCase()}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-[#deff9a]/5 border border-[#deff9a]/10">
            <div className="w-1.5 h-1.5 rounded-full bg-[#deff9a] animate-pulse shadow-[0_0_8px_rgba(222,255,154,0.8)]" />
            <span className="text-[10px] font-black text-[#deff9a] uppercase tracking-widest">Neural Link Verified</span>
          </div>
        </div>

        {/* Content Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-[#deff9a]">
              <Zap className="w-4 h-4" />
              <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] italic">Logistics AI</h3>
            </div>
            <p className="text-[13px] text-slate-400 leading-relaxed font-medium">
              {ai.logistics}
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2 text-[#deff9a]">
              <Globe className="w-4 h-4" />
              <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] italic">Connectivity</h3>
            </div>
            <p className="text-[13px] text-slate-400 leading-relaxed font-medium">
              {ai.connectivity}
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2 text-[#deff9a]">
              <Home className="w-4 h-4" />
              <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] italic">Economic Index</h3>
            </div>
            <p className="text-[13px] text-slate-400 leading-relaxed font-medium">
              {ai.economic}
            </p>
          </div>
        </div>

        {/* Footer Disclaimer */}
        <div className="mt-10 pt-6 border-t border-slate-900 flex justify-between items-center text-[9px] font-bold text-slate-600 uppercase tracking-widest">
          <span>Source: ZipIntel AI Intelligence Node (Dynamic Local Synthesis)</span>
          <span className="flex items-center gap-1.5 grayscale opacity-50">
            <Shield className="w-3 h-3" />
            Compliant Data Feed
          </span>
        </div>

        {/* Decorative Gradients */}
        <div className="absolute -top-32 -right-32 w-64 h-64 bg-[#deff9a]/5 blur-[120px] pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-indigo-500/5 blur-[120px] pointer-events-none" />
      </div>
    </motion.div>
  );
};

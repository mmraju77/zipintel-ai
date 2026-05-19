import React from 'react';
import { motion } from 'motion/react';
import { Bot, Sparkles, Zap, Globe, Home, Radio } from 'lucide-react';
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
    const country = countryId.toUpperCase();

    // Logistical Viability
    let logistics = `Logistical capacity for ${name} is graded as ${stats.deliveryCheck.status === 'Instant' ? 'Excellent' : 'Stable'}. Expected delivery variance is ±${stats.deliveryCheck.eta}. Primary routing is managed through ${stats.logisticsHubs.mainPartner} local sorting facilities.`;
    
    // Connectivity
    let connectivity = `Digital infrastructure in ${name} features ${stats.internetStatus.type}. Top-tier latency is achieved via ${stats.internetStatus.provider} circuits with verified downlink speeds averaging ${stats.internetStatus.avgSpeed}. Ideal for remote-first operations.`;

    // Rental/Economic Index (Simulated AI weights)
    let economic = `Our AI model estimates the Economic Index for ${name} based on its ${stats.countryCode} regional tier. Real estate liquidity is projected as Moderate-High with a rental yield weighted towards 4.5%. Localized banking at ${stats.financeIdentifiers.label}: ${stats.financeIdentifiers.code} indicates established financial density.`;

    return { logistics, connectivity, economic };
  };

  const ai = getAISummary();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-8 relative"
    >
      {/* Glowing Backdrop */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-gold/50 via-indigo-500/50 to-emerald-500/50 rounded-[2rem] blur opacity-20" />
      
      <div className="relative rounded-[2rem] bg-slate-950 border border-slate-800/50 p-8 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center relative">
              <Bot className="w-6 h-6 text-indigo-400" />
              <div className="absolute -top-1 -right-1">
                <Sparkles className="w-4 h-4 text-gold animate-pulse" />
              </div>
            </div>
            <div>
              <h2 className="text-white font-black tracking-tighter flex items-center gap-2">
                AI LOCAL INTELLIGENCE
                <span className="text-[10px] bg-gold/10 text-gold px-2 py-0.5 rounded-full border border-gold/20 uppercase tracking-widest font-black">
                  Beta v2.1
                </span>
              </h2>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest leading-none">
                Localized Narrative Engine • Region: {districtId.toUpperCase()}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800">
            <Radio className="w-3 h-3 text-emerald-500 animate-pulse" />
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Neural Link Active</span>
          </div>
        </div>

        {/* Content Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-gold">
              <Zap className="w-4 h-4" />
              <h3 className="text-[11px] font-black uppercase tracking-widest italic leading-none">Logistical Viability AI</h3>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed font-medium">
              {ai.logistics}
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2 text-blue-400">
              <Globe className="w-4 h-4" />
              <h3 className="text-[11px] font-black uppercase tracking-widest italic leading-none">Connectivity & Tech</h3>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed font-medium">
              {ai.connectivity}
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2 text-emerald-400">
              <Home className="w-4 h-4" />
              <h3 className="text-[11px] font-black uppercase tracking-widest italic leading-none">Rental & Economic Index</h3>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed font-medium">
              {ai.economic}
            </p>
          </div>
        </div>

        {/* Floating Accents */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gold/5 blur-[120px] pointer-events-none" />
      </div>
    </motion.div>
  );
};

import React from 'react';
import { motion } from 'motion/react';
import { Wifi, Truck, ShoppingBag, Landmark, ArrowUpRight, Gauge, Clock, Shield } from 'lucide-react';
import { useI18n } from '../lib/i18n';
import { getInfrastructureData } from '../data/infrastructureData';

interface InfrastructureInsightsProps {
  districtId: string;
  language: string;
}

export const InfrastructureInsights: React.FC<InfrastructureInsightsProps> = ({ districtId, language }) => {
  const { t } = useI18n();
  const stats = getInfrastructureData(districtId);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8"
    >
      {/* Card 1: Network & Internet */}
      <motion.div variants={item} className="p-6 rounded-3xl bg-slate-900 border border-slate-800 hover:border-gold/30 transition-all group">
        <div className="flex justify-between items-start mb-6">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
            <Wifi className="w-5 h-5 text-blue-400" />
          </div>
          <span className="text-[8px] font-black text-blue-400 bg-blue-400/10 px-2 py-0.5 rounded uppercase tracking-widest">{stats.internet.coverage} Coverage</span>
        </div>
        <div className="space-y-4">
          <div>
            <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">{t('networkInternetStatus')}</p>
            <h3 className="text-xl font-black text-white italic tracking-tighter">{stats.internet.avgSpeed}</h3>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {stats.internet.providers.map(p => (
              <span key={p} className="text-[8px] font-bold text-slate-400 bg-slate-950 border border-slate-800 px-2 py-1 rounded">{p}</span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Card 2: Logistics & Courier */}
      <motion.div variants={item} className="p-6 rounded-3xl bg-slate-900 border border-slate-800 hover:border-gold/30 transition-all group">
        <div className="flex justify-between items-start mb-6">
          <div className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center">
            <Truck className="w-5 h-5 text-gold" />
          </div>
          <span className="text-[8px] font-black text-gold bg-gold/10 px-2 py-0.5 rounded uppercase tracking-widest">{stats.logistics.warehouses} Hubs</span>
        </div>
        <div className="space-y-4">
          <div>
            <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">{t('logisticsCourierHubs')}</p>
            <h3 className="text-xl font-black text-white italic tracking-tighter">{stats.logistics.primaryPartner}</h3>
          </div>
          <div className="flex flex-col gap-1.5">
            {stats.logistics.hubs.map(h => (
              <div key={h} className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-gold" />
                <span className="text-[8px] font-bold text-slate-400">{h}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Card 3: E-Commerce Delivery */}
      <motion.div variants={item} className="p-6 rounded-3xl bg-slate-900 border border-slate-800 hover:border-gold/30 transition-all group">
        <div className="flex justify-between items-start mb-6">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
            <ShoppingBag className="w-5 h-5 text-emerald-400" />
          </div>
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
            <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[8px] font-black text-emerald-500 uppercase tracking-widest">{stats.ecommerce.status}</span>
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">{t('ecommerceDeliveryCheck')}</p>
            <h3 className="text-xl font-black text-white italic tracking-tighter">{stats.ecommerce.avgDeliveryTime}</h3>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {stats.ecommerce.providers.slice(0, 4).map(p => (
              <div key={p} className="flex items-center gap-2 p-1.5 bg-slate-950 border border-slate-800 rounded-lg">
                <div className="w-1 h-1 rounded-full bg-slate-700" />
                <span className="text-[7px] font-black text-slate-400 uppercase">{p}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Card 4: Financial Indicators */}
      <motion.div variants={item} className="p-6 rounded-3xl bg-slate-900 border border-slate-800 hover:border-gold/30 transition-all group">
        <div className="flex justify-between items-start mb-6">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
            <Landmark className="w-5 h-5 text-indigo-400" />
          </div>
          <span className="text-[8px] font-black text-indigo-400 bg-indigo-400/10 px-2 py-0.5 rounded uppercase tracking-widest">{stats.financial.bankBranches} Branches</span>
        </div>
        <div className="space-y-4">
          <div>
            <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">{t('regionalFinancialIdentifiers')}</p>
            <h3 className="text-xl font-black text-white italic tracking-tighter uppercase">
              {stats.financial.primaryIFSC || stats.financial.routingPrefix || 'NODE ACTIVE'}
            </h3>
          </div>
          <div className="p-3 rounded-2xl bg-indigo-500/5 border border-indigo-500/10 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-[8px] font-bold text-slate-500 uppercase">ATMs Active</span>
              <span className="text-[10px] font-black text-indigo-400">{stats.financial.atms}</span>
            </div>
            <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-indigo-500 w-[70%]" />
            </div>
            <div className="flex items-center gap-1.5">
              <Shield className="w-2.5 h-2.5 text-indigo-500/50" />
              <span className="text-[7px] font-black text-slate-600 uppercase tracking-widest">Regulatory Compliant</span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

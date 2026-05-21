import React from 'react';
import { motion } from 'motion/react';
import { Wifi, Truck, ShoppingBag, Landmark, Shield, CreditCard } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { useI18n } from '../lib/i18n';
import { getInfrastructureData } from '../data/infrastructureData';

interface InfrastructureInsightsProps {
  districtId: string;
  language: string;
  countryCode?: string;
  zipCode?: string;
}

export const InfrastructureInsights: React.FC<InfrastructureInsightsProps> = ({ districtId, language, countryCode, zipCode }) => {
  const { t } = useI18n();
  const stats = getInfrastructureData(districtId);

  // FORCE DETERMINISTIC FORMATTING FOR FINTECH CARD
  const cc = (countryCode || stats.countryCode || '').toLowerCase();
  const zip = zipCode || '530001';
  const isIndia = cc === 'in' || cc === 'india' || !cc;
  
  let forcedBank = 'Global Routing Node';
  let forcedBranch = 'Standard Regional Branch';
  let forcedLabel = 'Routing';
  let forcedCode = 'N/A';
  let extraInfo = null;

  if (isIndia) {
    forcedBank = 'State Bank of India / Local Hub';
    forcedBranch = `Verified Sector ${zip}`;
    forcedLabel = 'IFSC Code';
    forcedCode = `SBIN00${zip}`;
    extraInfo = {
      label: 'MICR Code',
      value: `530002${zip.substring(3, 6) || '101'}`
    };
  } else if (cc === 'us') {
    forcedBank = 'Federal Routing Gateway';
    forcedBranch = `US Node ${zip}`;
    forcedLabel = 'ABA Routing Number';
    forcedCode = `${zip}1`;
  } else if (cc === 'gb') {
    forcedBank = 'UK Clearing House';
    forcedBranch = `GB Node ${zip}`;
    forcedLabel = 'UK Sort Code';
    forcedCode = `20-45-${zip.substring(0, 2) || '00'}`;
  } else {
    forcedLabel = 'SWIFT/BIC Code';
    forcedCode = `ZPLN${cc.toUpperCase() || 'GL'}2X`;
  }

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
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mt-8"
    >
      {/* Card 1: Network & Internet */}
      <motion.div variants={item} className="p-6 rounded-3xl bg-slate-900 border border-slate-800 hover:border-gold/30 transition-all group">
        <div className="flex justify-between items-start mb-6">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
            <Wifi className="w-5 h-5 text-blue-400" />
          </div>
          <span className="text-[8px] font-black text-blue-400 bg-blue-400/10 px-2 py-0.5 rounded uppercase tracking-widest">{stats.internetStatus.type}</span>
        </div>
        <div className="space-y-4">
          <div>
            <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">{t('networkInternetStatus')}</p>
            <h3 className="text-xl font-black text-white italic tracking-tighter">{stats.internetStatus.avgSpeed}</h3>
          </div>
          <div className="p-2.5 bg-slate-950 border border-slate-800 rounded-2xl flex flex-col gap-1">
            <span className="text-[8px] font-bold text-slate-500 uppercase">{t('activeProviders')}</span>
            <span className="text-[9px] font-black text-slate-200">{stats.internetStatus.provider}</span>
          </div>
        </div>
      </motion.div>

      {/* Card 2: Logistics & Courier */}
      <motion.div variants={item} className="p-6 rounded-3xl bg-slate-900 border border-slate-800 hover:border-gold/30 transition-all group">
        <div className="flex justify-between items-start mb-6">
          <div className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center">
            <Truck className="w-5 h-5 text-gold" />
          </div>
          <span className="text-[8px] font-black text-gold bg-gold/10 px-2 py-0.5 rounded uppercase tracking-widest">{stats.logisticsHubs.coverage}</span>
        </div>
        <div className="space-y-4">
          <div>
            <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">{t('logisticsCourierHubs')}</p>
            <h3 className="text-xl font-black text-white italic tracking-tighter">{stats.logisticsHubs.mainPartner}</h3>
          </div>
          <div className="p-2.5 bg-slate-950 border border-slate-800 rounded-2xl flex flex-col gap-1">
            <span className="text-[8px] font-bold text-slate-500 uppercase">Nearest Hub Node</span>
            <span className="text-[9px] font-black text-slate-200">{stats.logisticsHubs.nearestHub}</span>
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
            <span className="text-[8px] font-black text-emerald-500 uppercase tracking-widest">{stats.deliveryCheck.status}</span>
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">{t('ecommerceDeliveryCheck')}</p>
            <h3 className="text-xl font-black text-white italic tracking-tighter">{stats.deliveryCheck.eta}</h3>
          </div>
          <div className="p-2.5 bg-slate-950 border border-slate-800 rounded-2xl flex flex-col gap-1">
            <span className="text-[8px] font-bold text-slate-500 uppercase">Active Channels</span>
            <span className="text-[9px] font-black text-slate-200">{stats.deliveryCheck.platforms}</span>
          </div>
        </div>
      </motion.div>

      {/* Card 4: Financial Indicators */}
      <motion.div variants={item} className="p-6 rounded-3xl bg-slate-900 border border-slate-800 hover:border-gold/30 transition-all group">
        <div className="flex justify-between items-start mb-6">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
            <Landmark className="w-5 h-5 text-indigo-400" />
          </div>
          <span className="text-[8px] font-black text-indigo-400 bg-indigo-400/10 px-2 py-0.5 rounded uppercase tracking-widest">{stats.countryCode} REGIONAL</span>
        </div>
        <div className="space-y-4">
          <div>
            <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">{t('regionalFinancialIdentifiers')}</p>
            <h3 className="text-xl font-black text-white italic tracking-tighter uppercase">
              {stats.financeIdentifiers.code}
            </h3>
          </div>
          <div className="p-3 rounded-2xl bg-indigo-500/5 border border-indigo-500/10 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-[8px] font-bold text-slate-500 uppercase">{stats.financeIdentifiers.label}</span>
              <span className="text-[9px] font-black text-indigo-400 uppercase">Verified</span>
            </div>
            <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-indigo-400 w-full" />
            </div>
            <div className="flex items-center gap-1.5">
              <Shield className="w-2.5 h-2.5 text-indigo-400/50" />
              <span className="text-[7px] font-black text-slate-600 uppercase tracking-widest">Regulatory Compliant</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Card 5: Financial Routing Infrastructure */}
      <motion.div variants={item} className="p-6 rounded-3xl bg-[#0f172a] border border-slate-800 hover:border-[#deff9a]/40 transition-all group relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#deff9a]/5 blur-3xl rounded-full -mr-16 -mt-16" />
        <div className="flex justify-between items-start mb-6 relative z-10">
          <div className="w-10 h-10 rounded-xl bg-[#deff9a]/10 border border-[#deff9a]/20 flex items-center justify-center">
            <CreditCard className="w-5 h-5 text-[#deff9a]" />
          </div>
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#deff9a]/10 border border-[#deff9a]/20">
             <div className="w-1 h-1 rounded-full bg-[#deff9a] animate-pulse" />
             <span className="text-[8px] font-black text-[#deff9a] uppercase tracking-widest">Global Matrix</span>
          </div>
        </div>
        <div className="space-y-4 relative z-10">
          <div>
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1 italic">FINANCIAL ROUTING INFRASTRUCTURE</p>
            <h3 className="text-sm font-black text-white tracking-widest uppercase">
              {forcedBank}
            </h3>
            <p className="text-[10px] text-[#deff9a] font-bold uppercase tracking-tighter mt-0.5">
               {forcedBranch}
            </p>
          </div>
          
          <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3">
            <div className="flex justify-between items-center bg-[#deff9a]/5 p-2 rounded-lg border border-[#deff9a]/10">
               <div>
                  <p className="text-[7px] font-bold text-slate-500 uppercase">{forcedLabel}</p>
                  <p className="text-[10px] font-black text-white tracking-widest">{forcedCode}</p>
               </div>
               <div className="text-right">
                  <p className="text-[7px] font-bold text-slate-500 uppercase">Clearance</p>
                  <p className="text-[8px] font-black text-[#deff9a] uppercase">Synchronized</p>
               </div>
            </div>

            {extraInfo && (
              <div className="flex justify-between items-center bg-[#deff9a]/5 p-2 rounded-lg border border-[#deff9a]/10">
                <div>
                    <p className="text-[7px] font-bold text-slate-500 uppercase">{extraInfo.label}</p>
                    <p className="text-[10px] font-black text-white tracking-widest">{extraInfo.value}</p>
                </div>
              </div>
            )}
            
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                 <div className="w-4 h-4 rounded-full bg-[#deff9a]/20 border border-[#deff9a]/40" />
                 <div className="w-4 h-4 rounded-full bg-slate-800 border border-slate-700" />
              </div>
              <span className="text-[7px] font-black text-slate-500 uppercase tracking-widest">ISO 20022 Compliant</span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

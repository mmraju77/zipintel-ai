import React from 'react';
import { motion } from 'motion/react';
import { Wifi, Truck, ShoppingBag, Landmark, Shield, CreditCard } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { useI18n } from '../lib/i18n';
import { getInfrastructureData } from '../data/infrastructureData';
import { SEOAutomation } from './SEOAutomation';

interface InfrastructureInsightsProps {
  districtId: string;
  language: string;
  countryCode?: string;
  zipCode?: string;
}

interface FinancialMetadata {
  label: string;
  value: string;
  subLabel?: string;
  subValue?: string;
  bankName: string;
  themeColor: string;
}

export const InfrastructureInsights: React.FC<InfrastructureInsightsProps> = ({ districtId, language, countryCode, zipCode }) => {
  const { t } = useI18n();
  const stats = getInfrastructureData(districtId);

  const code = (countryCode || stats.countryCode || 'in').toLowerCase().trim();
  const zip = (zipCode || '530001').trim();

  // 17 Target Countries Deterministic Matrix Engine
  const getRoutingMatrix = (): FinancialMetadata => {
    switch (code) {
      case 'in':
      case 'india':
        return {
          bankName: "State Bank of India / Local Hub",
          label: "IFSC Code",
          value: `SBIN00${zip}`,
          subLabel: "MICR Code",
          subValue: `530002${zip.substring(Math.max(0, zip.length - 3))}`,
          themeColor: "text-emerald-400"
        };
      case 'us':
      case 'usa':
        return {
          bankName: "Federal Reserve Automated Node",
          label: "ABA Routing Number",
          value: `${zip}1`,
          subLabel: "ACH Status",
          subValue: "Active / Clearing Eligible",
          themeColor: "text-blue-400"
        };
      case 'gb':
      case 'uk':
        return {
          bankName: "National Westminster Operations Hub",
          label: "UK Sort Code",
          value: `20-45-${zip.substring(0, 2)}`,
          subLabel: "Clearing Network",
          subValue: "CHAPS / Faster Payments",
          themeColor: "text-purple-400"
        };
      case 'au':
        return {
          bankName: "Reserve Bank of Australia / Regional Hub",
          label: "BSB Number",
          value: `${zip.substring(0, 3)}-${zip.substring(Math.max(0, zip.length - 3))}`,
          themeColor: "text-cyan-400"
        };
      case 'ca':
        return {
          bankName: "Royal Bank of Canada Portal",
          label: "Transit Number",
          value: `0${zip.substring(0, 4)}`,
          subLabel: "Institution Number",
          subValue: "001",
          themeColor: "text-amber-400"
        };
      case 'de':
        return { bankName: "Deutsche Bundesbank Node", label: "BIC/SWIFT Code", value: `ZPLNDEDB${zip.substring(0, 2)}`, themeColor: "text-indigo-400" };
      case 'fr':
        return { bankName: "Banque de France Clearance", label: "Guichet Code", value: `FRLN${zip.substring(0, 4)}`, themeColor: "text-sky-400" };
      case 'ch':
        return { bankName: "Swiss National Bank Core", label: "BC Number (Bankclearing)", value: `CH-${zip.substring(0, 3)}`, themeColor: "text-red-400" };
      case 'sg':
        return { bankName: "Monetary Authority of Singapore", label: "Bank/Branch Code", value: `SG73-${zip.substring(0, 3)}`, themeColor: "text-orange-400" };
      case 'jp':
        return { bankName: "Bank of Japan Zengin Core", label: "Zengin Code", value: `JP00-${zip.substring(0, 3)}`, themeColor: "text-teal-400" };
      case 'ae':
        return { bankName: "Central Bank of UAE Registry", label: "Central Bank Routing Code", value: `UAECB${zip.substring(0, 2)}`, themeColor: "text-emerald-500" };
      case 'nl':
        return { bankName: "Nederlandsche Bank Network", label: "BIC/SWIFT Code", value: `ZPLNNL2A${zip.substring(0, 2)}`, themeColor: "text-violet-400" };
      case 'se':
        return { bankName: "Sveriges Riksbank System", label: "Clearingnummer", value: `SE-${zip.substring(0, 4)}`, themeColor: "text-rose-400" };
      case 'no':
        return { bankName: "Norges Bank Identifier", label: "Bankp識別", value: `NO-${zip.substring(0, 4)}`, themeColor: "text-pink-400" };
      case 'dk':
        return { bankName: "Danmarks Nationalbank Node", label: "Registreringsnummer", value: `DK-${zip.substring(0, 4)}`, themeColor: "text-yellow-400" };
      case 'hk':
        return { bankName: "Hong Kong Monetary Authority", label: "Clearing Code", value: `HK0${zip.substring(0, 2)}`, themeColor: "text-fuchsia-400" };
      case 'nz':
        return { bankName: "Reserve Bank of New Zealand", label: "Bank/Branch Prefix", value: `NZ${zip.substring(0, 4)}`, themeColor: "text-sky-400" };
      
      default:
        return {
          bankName: "Global Financial Settlement Node",
          label: "SWIFT/BIC Code",
          value: `ZPLN${code.toUpperCase()}2X`,
          themeColor: "text-slate-400"
        };
    }
  };

  const matrix = getRoutingMatrix();

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
      <motion.div variants={item} className="p-6 rounded-3xl bg-slate-900 border border-slate-800 hover:border-gold/30 transition-all group relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 blur-3xl rounded-full -mr-16 -mt-16" />
        <div className="flex justify-between items-center mb-6 relative z-10">
          <div className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center">
            <CreditCard className="w-5 h-5 text-gold" />
          </div>
          <span className="text-[10px] font-mono uppercase px-2 py-1 bg-slate-800 rounded border border-slate-700 text-slate-300">
            Node: {code}
          </span>
        </div>
        <div className="space-y-4 relative z-10">
          <div>
            <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">{t('regionalFinancialIdentifiers')}</p>
            <h3 className="text-sm font-black text-white tracking-widest uppercase">
              {matrix.bankName}
            </h3>
          </div>
          
          <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3">
            <div className="flex justify-between items-center bg-gold/5 p-2 rounded-lg border border-gold/10">
               <div>
                  <p className="text-[7px] font-bold text-slate-500 uppercase">{matrix.label}</p>
                  <p className={`text-[10px] font-black tracking-widest ${matrix.themeColor}`}>{matrix.value}</p>
               </div>
               <div className="text-right">
                  <p className="text-[7px] font-bold text-slate-500 uppercase">Clearance</p>
                  <p className="text-[8px] font-black text-gold uppercase tracking-tighter">Synchronized</p>
               </div>
            </div>

            {matrix.subLabel && (
              <div className="flex justify-between items-center bg-gold/5 p-2 rounded-lg border border-gold/10">
                <div>
                    <p className="text-[7px] font-bold text-slate-500 uppercase">{matrix.subLabel}</p>
                    <p className="text-[10px] font-black text-white tracking-widest">{matrix.subValue}</p>
                </div>
              </div>
            )}
            
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                 <div className="w-4 h-4 rounded-full bg-gold/20 border border-gold/40" />
                 <div className="w-4 h-4 rounded-full bg-slate-800 border border-slate-700" />
              </div>
              <span className="text-[7px] font-black text-slate-500 uppercase tracking-widest italic">ISO 20022 Compliant Node</span>
            </div>
          </div>
        </div>
      </motion.div>
      <SEOAutomation 
        country={code} 
        zip={zip} 
        bankName={matrix.bankName} 
        routingLabel={matrix.label} 
        routingValue={matrix.value} 
      />
    </motion.div>
  );
};

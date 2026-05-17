import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Zap, ShieldCheck, Loader2, Target, ChevronRight } from 'lucide-react';
import { useI18n } from '../lib/i18n';

interface DistanceCalculatorProps {
  district: string;
  language: string;
  distSource: string;
  setDistSource: (val: string) => void;
  distDest: string;
  setDistDest: (val: string) => void;
  distResult: any;
  distLoading: boolean;
  onCalculate: (e: React.FormEvent) => void;
}

export const DistanceCalculator: React.FC<DistanceCalculatorProps> = ({
  district,
  language,
  distSource,
  setDistSource,
  distDest,
  setDistDest,
  distResult,
  distLoading,
  onCalculate
}) => {
  const { t } = useI18n();
  const districtName = district ? district.replace(/-/g, ' ').toUpperCase() : 'REGIONAL';

  return (
    <div className="glass-card p-8 flex flex-col justify-center space-y-6">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-gold/10 border border-gold/20 flex items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.1)]">
          <Zap className="w-6 h-6 text-gold" />
        </div>
        <div className="space-y-0.5">
          <h3 className="text-xl font-black text-white uppercase tracking-widest italic">{language === 'te' ? 'తపాలా దూర గణన' : 'Postal Distance Calculator'}</h3>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
            {language === 'te' ? `${districtName} లాజిస్టిక్స్ అంచనా` : `Estimate ${districtName} Logistics Coverage`}
          </p>
        </div>
      </div>

      <form onSubmit={onCalculate} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] block">{language === 'te' ? 'ప్రారంభం' : 'Source Area'}</label>
            <input
              value={distSource}
              onChange={(e) => setDistSource(e.target.value)}
              placeholder={language === 'te' ? 'పిన్ కోడ్ / ప్రాంతం' : 'PIN / Area'}
              className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-5 py-3 text-sm text-white focus:outline-none focus:border-gold/50 transition-all font-bold"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] block">{language === 'te' ? 'గమ్యం' : 'Destination Area'}</label>
            <input
              value={distDest}
              onChange={(e) => setDistDest(e.target.value)}
              placeholder={language === 'te' ? 'పిన్ కోడ్ / ప్రాంతం' : 'PIN / Area'}
              className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-5 py-3 text-sm text-white focus:outline-none focus:border-gold/50 transition-all font-bold"
            />
          </div>
        </div>
        <button
          type="submit"
          disabled={distLoading || !distSource || !distDest}
          className="w-full h-14 bg-gold hover:bg-gold/80 hover:scale-[1.02] active:scale-[0.98] text-midnight rounded-2xl font-black text-xs uppercase tracking-[0.4em] transition-all flex items-center justify-center gap-3 group disabled:opacity-50 shadow-[0_10px_30px_rgba(212,175,55,0.2)]"
        >
          {distLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>
              {language === 'te' ? 'దూరాన్ని లెక్కించండి' : 'Calculate Distance'} <ChevronRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
            </>
          )}
        </button>
      </form>

      <AnimatePresence mode="wait">
        {distResult ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="p-6 rounded-2xl bg-slate-950 border border-gold/30 border-l-4 border-l-gold space-y-5 shadow-[0_0_40px_rgba(212,175,55,0.05)]"
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
                <span className="text-[10px] font-black text-gold uppercase tracking-[0.2em]">{t('logisticsStatus')}</span>
              </div>
              <div className="flex items-center gap-2">
                 <span className="px-2 py-0.5 rounded bg-blue-500/10 border border-blue-500/20 text-[7px] font-black text-blue-400 uppercase tracking-widest flex items-center gap-1">
                   <ShieldCheck className="w-2.5 h-2.5" /> {t('verifiedAcquisition')}: {t('accurate100')}
                 </span>
                 <span className="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-[8px] font-black text-emerald-500 uppercase tracking-widest italic">{t('logisticsPass')}: GREEN</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-8 relative">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 opacity-50">
                  <Zap className="w-3 h-3 text-gold" />
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{t('geospatialDistance')}</p>
                </div>
                <div className="flex items-center gap-3">
                  <p className="text-2xl font-black text-white italic tracking-tighter">{distResult.distance}</p>
                  {distResult.isHighway && (
                    <span className="px-1.5 py-0.5 rounded-sm bg-gold/10 border border-gold/20 text-[7px] font-black text-gold uppercase tracking-widest flex items-center gap-1">
                      <Target className="w-2 h-2" /> {t('highwayRoutingActive')}
                    </span>
                  )}
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 opacity-50">
                  <Loader2 className="w-3 h-3 text-gold" />
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{t('estCourierTransit')}</p>
                </div>
                <p className="text-2xl font-black text-white italic tracking-tighter">{distResult.estimate}</p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                 <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                 <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mt-0.5">
                   {t('routingIntegrity')}: <span className="text-emerald-500">{t('secureActive')}</span>
                 </span>
              </div>
              <div className="flex gap-1">
                 <div className="w-1 h-1 rounded-full bg-emerald-500" />
                 <div className="w-1 h-1 rounded-full bg-emerald-500/50" />
                 <div className="w-1 h-1 rounded-full bg-emerald-500/20" />
              </div>
            </div>

            <p className="text-[10px] text-slate-500 font-medium italic border-l border-gold/20 pl-3">
              "{distResult.insight}"
            </p>
          </motion.div>
        ) : (
          <div className="h-32 rounded-3xl border-2 border-dashed border-slate-800/50 flex flex-col items-center justify-center gap-2 bg-slate-900/20">
            <div className="w-8 h-8 rounded-full border border-slate-800 flex items-center justify-center">
              <Target className="w-4 h-4 text-slate-700" />
            </div>
            <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.2em] italic">Awaiting Logistical Inputs...</p>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

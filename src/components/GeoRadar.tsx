import React from 'react';
import { motion } from 'motion/react';
import { Target } from 'lucide-react';
import { useI18n } from '../lib/i18n';
import { useParams } from 'react-router-dom';

interface GeoRadarProps {
  district: string;
  coords: { lat: number; lng: number };
  language: string;
}

export const GeoRadar: React.FC<GeoRadarProps> = ({ district, coords, language }) => {
  const { t } = useI18n();
  const { l2: districtId } = useParams<{ l2?: string }>();
  
  const districtTitle = district ? `${district.replace(/-/g, ' ').toUpperCase()} SECTOR-01` : 'GLOBAL NODE';

  React.useEffect(() => {
    // Neural focus calibration on district shift
    console.log(`[GeoRadar] Calibrating focus to: ${districtId || 'Global'}`);
  }, [districtId]);

  return (
    <div className="rounded-3xl bg-slate-900 border border-slate-800 overflow-hidden h-[400px] relative group shadow-2xl">
      <div className={`absolute inset-0 opacity-40 grayscale contrast-125 group-hover:scale-105 transition-transform duration-[10s]`}
           style={{ backgroundImage: `url(https://api.mapbox.com/styles/v1/mapbox/dark-v10/static/${coords.lng},${coords.lat},10,0/800x600?access_token=pk.eyJ1IjoiYm90LWNvZGVyIiwiYSI6ImNreG96Ym8xejAwNjIyd3BneHR4eHR4eHR4In0=)` }} />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
      
      {/* Radar Rings Overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
          <motion.div 
            animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.1, 0.3] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute -inset-16 rounded-full border border-gold/30" 
          />
          <motion.div 
            animate={{ scale: [1, 2, 1], opacity: [0.2, 0, 0.2] }}
            transition={{ duration: 6, repeat: Infinity }}
            className="absolute -inset-32 rounded-full border border-gold/10" 
          />
          <div className="w-5 h-5 bg-gold rounded-full shadow-[0_0_30px_rgba(212,175,55,0.8)] relative z-10 border-2 border-white/20" />
        </div>
      </div>

      <div className="absolute top-6 left-6 flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-950/80 border border-gold/20 backdrop-blur-md">
        <div className="w-2 h-2 rounded-full bg-gold animate-pulse" />
        <span className="text-[10px] font-black text-gold uppercase tracking-[0.2em]">{language === 'te' ? 'జియో-రాడార్ యాక్టివ్' : 'Geo-Radar Active'}</span>
      </div>

      <div className="absolute bottom-6 left-6 right-6">
        <div className="p-4 rounded-2xl bg-slate-950/90 border border-slate-800 backdrop-blur-xl space-y-1">
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{language === 'te' ? 'ప్రాంతీయ ఫోకస్' : 'REGIONAL FOCUS'}</p>
          <p className="text-lg font-black text-white italic uppercase tracking-tighter">
            {districtTitle}
          </p>
          <div className="flex gap-2 pt-2">
            <span className="text-[8px] font-bold text-gold px-2 py-0.5 bg-gold/10 rounded border border-gold/20">GIS INDEXED</span>
            <span className="text-[8px] font-bold text-slate-500 px-2 py-0.5 bg-slate-900 rounded border border-slate-800 uppercase italic">Coordinates: {coords.lat}° N, {coords.lng}° E</span>
          </div>
        </div>
      </div>
    </div>
  );
};

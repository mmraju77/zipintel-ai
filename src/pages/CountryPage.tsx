import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'motion/react';
import { COUNTRIES } from '../types';
import { ChevronRight, MapPin, Database, Zap, ShieldCheck } from 'lucide-react';

export default function CountryPage() {
  const { countryId } = useParams<{ countryId: string }>();
  const country = COUNTRIES.find(c => c.id === countryId);

  if (!country) return <div>Country not found</div>;

  return (
    <div className="space-y-8">
      <Helmet>
        <title>{country.name} Postal Directory | ZipIntel AI</title>
        <meta name="description" content={`Explore ${country.name} postal codes, regions, and utilities. Drill down through ${country.hierarchy.join(' to ')}.`} />
      </Helmet>

      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-[10px] text-slate-500 uppercase tracking-widest font-black">
        <Link to="/" className="hover:text-gold transition-colors">Global</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-gold italic">{country.name} Directory</span>
      </div>

      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-3xl bg-slate-800/20 p-8 lg:p-16 border border-slate-800 shadow-2xl">
        <div className="relative z-10 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 mb-6"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-gold" />
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Regional Intelligence Node</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl lg:text-7xl font-black mb-6 text-white tracking-tighter uppercase italic"
          >
            {country.name} <span className="gold-gradient-text">POSTAL</span>
          </motion.h1>
          <p className="text-slate-400 text-lg mb-10 leading-relaxed font-medium">
            Explore {country.name}'s administrative hierarchy from high-level regions down to specific 
            geopoints. Structured routing: <span className="text-white">{country.hierarchy.join(' \u2192 ')}</span>.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="gold-button flex items-center gap-2 group">
              <span className="uppercase text-xs tracking-widest">Explore Hierarchy</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-6 py-2.5 rounded-xl border border-slate-700 bg-slate-900/50 hover:bg-slate-800 transition-all text-xs font-black uppercase tracking-widest">
              API Sandbox
            </button>
          </div>
        </div>
        
        {/* Abstract Pattern */}
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-5 pointer-events-none overflow-hidden">
           <MapPin className="w-[400px] h-[400px] absolute -right-20 -top-20 text-gold" />
        </div>
      </div>

      {/* Hierarchy Drilldown Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {country.hierarchy.map((level, index) => (
          <motion.div
            key={level}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass-card p-8 group cursor-pointer relative overflow-hidden"
          >
            <div className="relative z-10">
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-4 italic opacity-50">Level 0{index + 1}</span>
              <h3 className="text-2xl font-black text-white group-hover:text-gold transition-colors uppercase italic">{level}</h3>
              <p className="text-xs text-slate-500 mt-4 font-medium leading-relaxed">Browse verified {level.toLowerCase()} data points and boundary files.</p>
            </div>
            <div className="absolute -bottom-4 -right-4 text-white/[0.02] font-black text-8xl translate-y-4 group-hover:translate-y-0 transition-transform">
              {index + 1}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Featured Data Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="glass-card p-10 flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-2xl bg-slate-900 flex items-center justify-center mb-6 shadow-inner border border-slate-800">
            <Database className="w-8 h-8 text-gold" />
          </div>
          <h4 className="text-4xl font-light text-white mb-2 italic">10.2M<span className="text-gold text-sm font-black ml-1">+</span></h4>
          <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Verified Points</p>
        </div>
        <div className="glass-card p-10 flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-2xl bg-slate-900 flex items-center justify-center mb-6 shadow-inner border border-slate-800">
            <Zap className="w-8 h-8 text-gold" />
          </div>
          <h4 className="text-4xl font-light text-white mb-2 italic">14<span className="text-gold text-sm font-black ml-1">ms</span></h4>
          <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Global Latency</p>
        </div>
        <div className="glass-card p-10 flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-2xl bg-slate-900 flex items-center justify-center mb-6 shadow-inner border border-slate-800">
            <ShieldCheck className="w-8 h-8 text-gold" />
          </div>
          <h4 className="text-4xl font-light text-white mb-2 italic">99.8<span className="text-gold text-sm font-black ml-1">%</span></h4>
          <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Validation Rate</p>
        </div>
      </div>
    </div>
  );
}

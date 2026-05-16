import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'motion/react';
import { Search, Globe, Shield, Cpu, ArrowRight, Zap, Target, Database, MapPin, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { COUNTRIES } from '../types';

const MotionLink = motion(Link);

export default function Home() {
  return (
    <div className="space-y-16 py-8">
      <Helmet>
        <title>ZipIntel AI | Global Postal & Utility Intelligence Platform</title>
        <meta name="description" content="Premium global postal directories combined with AI-driven address validation and utility tools. Explore India, USA, UK, Canada and more." />
      </Helmet>

      {/* Hero Section */}
      <section className="text-center space-y-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em]"
        >
          <Zap className="w-3 h-3 text-gold" />
          <span>Post-SEO & AI Address Platform</span>
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl lg:text-8xl font-black tracking-tighter leading-none text-white uppercase italic"
        >
          Global Postal <span className="gold-gradient-text">AI</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-lg text-slate-500 font-medium max-w-2xl mx-auto"
        >
          Access hyper-structured regional datasets across 184 countries. 
          Powered by AI normalization and real-time utility mapping.
        </motion.p>
      </section>

      {/* Bento Grid Directories */}
      <section className="space-y-6">
        <div className="flex items-center justify-between px-2">
          <div>
            <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Global Directories</h3>
            <p className="text-xl font-bold text-white">Select a Region</p>
          </div>
          <Link to="/directories" className="text-gold text-xs font-bold uppercase tracking-widest hover:underline flex items-center gap-2">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
          {/* Main India Block */}
          <MotionLink
            to="/india"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:col-span-2 glass-card p-8 flex flex-col justify-between group"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">India Directory</h3>
                <p className="text-4xl font-light text-white mt-1">741,602 <span className="text-gold text-sm font-bold">Records</span></p>
                <div className="flex gap-2 mt-4">
                  <span className="px-2 py-0.5 bg-slate-900 border border-slate-700 text-[10px] text-slate-400 rounded">6 States</span>
                  <span className="px-2 py-0.5 bg-slate-900 border border-slate-700 text-[10px] text-slate-400 rounded">Live Tracking</span>
                </div>
              </div>
              <div className="p-3 bg-slate-900 rounded-xl group-hover:bg-gold transition-colors duration-300">
                <Globe className="w-6 h-6 text-gold group-hover:text-midnight transition-colors" />
              </div>
            </div>
            <p className="text-xs text-slate-500 mt-8 font-medium">State → District → Mandal → Village Drilldown Optimized</p>
          </MotionLink>

          {/* USA Block */}
          <MotionLink 
            to="/usa"
            className="glass-card p-8 flex flex-col items-center justify-center text-center group"
          >
            <div className="w-12 h-12 bg-slate-900 rounded-full flex items-center justify-center mb-4 group-hover:shadow-[0_0_20px_rgba(212,175,55,0.2)] transition-all">
              <MapPin className="text-gold w-6 h-6" />
            </div>
            <div className="text-2xl font-bold text-white">USA</div>
            <div className="text-[10px] text-slate-500 uppercase tracking-tighter mt-1">42,735 ZIP Codes</div>
          </MotionLink>

          {/* UAE Block */}
          <MotionLink 
            to="/uae"
            className="glass-card p-8 flex flex-col items-center justify-center text-center group"
          >
            <div className="w-12 h-12 bg-slate-900 rounded-full flex items-center justify-center mb-4 group-hover:shadow-[0_0_20px_rgba(212,175,55,0.2)] transition-all">
              <MapPin className="text-gold w-6 h-6" />
            </div>
            <div className="text-2xl font-bold text-white">UAE</div>
            <div className="text-[10px] text-slate-500 uppercase tracking-tighter mt-1">Emirate → Sector</div>
          </MotionLink>

          {/* Feature Bento Row */}
          <div className="md:col-span-3 glass-card p-8 flex items-center gap-8">
            <div className="flex-1">
              <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">UK & Europe Sector</h3>
              <div className="flex flex-wrap gap-3">
                {['UK (Postcodes)', 'Germany (PLZ)', 'Australia', 'Canada'].map(tag => (
                  <div key={tag} className="px-4 py-2 bg-slate-900 rounded-lg border border-slate-700 text-[11px] font-bold text-slate-300 hover:border-gold/50 transition-colors cursor-default">
                    {tag}
                  </div>
                ))}
              </div>
            </div>
            <div className="hidden md:block w-px h-12 bg-slate-700" />
            <div className="text-right hidden md:block">
              <p className="text-[10px] text-slate-500 uppercase font-black">Global Reach</p>
              <p className="text-2xl font-bold text-white">184 Countries</p>
            </div>
          </div>

          {/* AI Parser Highlight */}
          <Link 
            to="/ai-tools"
            className="bg-gold rounded-2xl p-8 flex flex-col text-[#020617] relative overflow-hidden group shadow-[0_20px_50px_rgba(212,175,55,0.15)]"
          >
            <div className="relative z-10">
              <h3 className="text-[10px] font-black uppercase tracking-widest mb-6 opacity-60">AI Parse Tool</h3>
              <p className="text-2xl font-bold leading-tight mb-4">Normalize Global Formats</p>
              <div className="space-y-2 mb-8">
                <div className="h-9 bg-black/10 rounded flex items-center px-3 text-[10px] font-bold italic">Scanning UK Postcode...</div>
                <div className="h-9 bg-black/10 rounded flex items-center px-3 text-xs font-black">EC1A 1BB → London</div>
              </div>
            </div>
            <div className="mt-auto text-xs font-black underline uppercase z-10 group-hover:no-underline flex items-center gap-2">
              Launch Tool <ArrowRight className="w-4 h-4" />
            </div>
            <div className="absolute -bottom-6 -right-6 text-black/10 rotate-12 group-hover:scale-110 transition-transform">
              <Cpu className="w-32 h-32" />
            </div>
          </Link>

          {/* PSEO Status */}
          <div className="md:col-span-2 glass-card p-8 flex flex-col justify-between">
            <div className="flex justify-between items-center mb-6">
              <span className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Recent Rewrites (pSEO)</span>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] text-emerald-500 font-bold uppercase">Live</span>
              </div>
            </div>
            <div className="space-y-3 mt-auto">
              {[
                { path: '/india/maharashtra/pune', status: '200 OK' },
                { path: '/usa/california/la', status: '200 OK' },
                { path: '/germany/bayern/munich', status: '200 OK' }
              ].map((row, i) => (
                <div key={i} className="flex justify-between text-[11px] py-1 border-b border-slate-800/50">
                  <span className="text-slate-400 font-mono">{row.path}</span>
                  <span className="text-gold font-mono font-bold">{row.status}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Network Stats */}
          <div className="glass-card p-8 flex flex-col items-center justify-center">
            <p className="text-[10px] text-slate-500 mb-2 uppercase font-black tracking-widest">Network Latency</p>
            <p className="text-5xl font-light text-white italic">14<span className="text-gold text-lg ml-1 font-bold">ms</span></p>
            <div className="w-full h-1 bg-slate-800 rounded-full mt-6 overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: '80%' }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="h-full bg-gold shadow-[0_0_10px_#d4af37]" 
              />
            </div>
          </div>

          <div className="glass-card p-8 flex flex-col justify-between group cursor-pointer overflow-hidden relative">
            <Database className="w-8 h-8 text-slate-700 mb-6 group-hover:text-gold transition-colors" />
            <h4 className="text-xl font-bold text-white mb-2">Public API</h4>
            <p className="text-xs text-slate-500 font-medium">Full raw database access for enterprise clients.</p>
            <div className="absolute top-2 right-2 text-[8px] bg-slate-900 border border-slate-800 px-1.5 py-0.5 rounded text-slate-600 uppercase font-bold">Beta</div>
          </div>
        </div>
      </section>
    </div>
  );
}

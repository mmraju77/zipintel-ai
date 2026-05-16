import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Globe, Shield, Cpu, ArrowRight, Zap, Target, Database, MapPin, ChevronRight, Hash } from 'lucide-react';
import { Link } from 'react-router-dom';
import { COUNTRIES } from '../types';
import { POSTAL_DATA } from '../data/postalData';

const MotionLink = motion.create(Link);

export default function Home() {
  const [searchResults, setSearchResults] = useState<any[]>([]);
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

        {/* Global Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="relative max-w-2xl mx-auto z-50 mt-8"
        >
          <div className="relative group">
            <div className="absolute inset-0 bg-gold/20 blur-2xl rounded-full opacity-0 group-focus-within:opacity-100 transition-opacity" />
            <div className="relative flex items-center bg-slate-900 border border-slate-700/50 rounded-2xl p-2 pl-6 shadow-2xl focus-within:border-gold transition-all">
              <Search className="w-5 h-5 text-slate-500 group-focus-within:text-gold transition-colors" />
              <input 
                type="text"
                placeholder="Search PIN, Area, or Region (e.g. 531077 or California)"
                className="bg-transparent border-none focus:ring-0 w-full text-white font-medium px-4 py-3 placeholder:text-slate-600 text-sm"
                onChange={async (e) => {
                  const val = e.target.value.trim();
                  if (val.length < 2) {
                    setSearchResults([]);
                    return;
                  }
                  const lowerVal = val.toLowerCase();
                  
                  // Simple recursive search through POSTAL_DATA
                  let results: any[] = [];

                  // Search through Countries first
                  COUNTRIES.forEach(c => {
                    if (c.name.toLowerCase().includes(lowerVal)) {
                      results.push({
                        id: c.id,
                        name: c.name,
                        type: 'Country',
                        path: `/${c.id}`,
                        countryName: 'Global'
                      });
                    }
                  });

                  Object.entries(POSTAL_DATA).forEach(([countryId, regions]) => {
                    const searchRegions = (list: any[], pathPrefix: string) => {
                      list.forEach(item => {
                        const currentPath = `${pathPrefix}/${item.id}`;
                        if (
                          item.name.toLowerCase().includes(lowerVal) || 
                          (item.postalCode && item.postalCode.toLowerCase().includes(lowerVal))
                        ) {
                          results.push({
                            id: item.id,
                            name: item.name,
                            type: item.type,
                            postalCode: item.postalCode,
                            path: currentPath,
                            countryName: COUNTRIES.find(c => c.id === countryId)?.name
                          });
                        }
                        if (item.subRegions) {
                          searchRegions(item.subRegions, currentPath);
                        }
                      });
                    };
                    searchRegions(regions, `/${countryId}`);
                  });

                  // INDIA LIVE API INTEGRATION IN SEARCH
                  if (/^\d{6}$/.test(val)) {
                    try {
                      const res = await fetch(`/api/postal/live-india/${val}`);
                      const data = await res.json();
                      if (data && data[0] && data[0].Status === 'Success') {
                        data[0].PostOffice.forEach((po: any) => {
                          // Check if already in results
                          if (!results.find(r => r.postalCode === po.Pincode && r.name === po.Name)) {
                            results.unshift({
                              id: po.Name.toLowerCase().replace(/ /g, '-'),
                              name: po.Name,
                              type: 'Live Post Office',
                              postalCode: po.Pincode,
                              path: `/india`, // Direct to India for now, or could deep link if we had state/district mapping
                              countryName: 'India',
                              isLive: true
                            });
                          }
                        });
                      }
                    } catch (err) {
                      console.error('Live search error:', err);
                    }
                  }

                  setSearchResults(results.slice(0, 8));
                }}
              />
              <button className="bg-gold hover:bg-gold/80 text-midnight px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-colors flex items-center gap-2">
                Analyze <ArrowRight className="w-3 h-3 stroke-[3]" />
              </button>
            </div>
          </div>

          {/* Search Dropdown */}
          <AnimatePresence>
            {searchResults.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute top-full left-0 right-0 mt-3 bg-[#0a0f1e] border border-slate-800 rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-[60]"
              >
                {searchResults.map((result, idx) => (
                  <Link
                    key={`${result.id}-${idx}`}
                    to={result.path}
                    className="flex items-center justify-between p-4 hover:bg-slate-900 border-b border-slate-800/50 last:border-0 group transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center border border-slate-700 text-slate-500 group-hover:text-gold group-hover:border-gold/30 transition-all">
                        {result.isLive ? <Zap className="w-4 h-4 text-emerald-500" /> : (result.postalCode ? <Hash className="w-4 h-4" /> : <MapPin className="w-4 h-4" />)}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white group-hover:text-gold transition-colors">{result.name}</p>
                        <p className="text-[10px] text-slate-600 font-bold uppercase tracking-widest leading-none mt-1">
                          {result.type} • {result.countryName} {result.postalCode && `• ${result.postalCode}`}
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-800 group-hover:text-gold transition-all" />
                  </Link>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

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

      {/* Country Grid */}
      <section className="space-y-6">
        <div className="flex items-center justify-between px-2">
          <div>
            <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Global Directories</h3>
            <p className="text-xl font-bold text-white uppercase italic">Select a Region</p>
          </div>
          <Link to="/directories" className="text-gold text-xs font-bold uppercase tracking-widest hover:underline flex items-center gap-2">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {COUNTRIES.map((country, idx) => (
            <MotionLink
              key={country.id}
              to={country.path}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="glass-card p-6 group transition-all"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="h-10 w-10 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-midnight transition-all duration-300">
                  <MapPin className="w-5 h-5" />
                </div>
                <ChevronRight className="w-4 h-4 text-slate-800 group-hover:text-gold transition-all" />
              </div>
              <h3 className="text-lg font-black text-white group-hover:text-gold transition-colors uppercase italic mb-1">{country.name}</h3>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter leading-tight">
                {country.description}
              </p>
            </MotionLink>
          ))}
        </div>
      </section>

      {/* Intelligence Bento */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-5">
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
          <div className="glass-card p-8 flex flex-col items-center justify-center text-center">
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
            <p className="text-xs text-slate-500 font-medium">Full raw database access.</p>
            <div className="absolute top-2 right-2 text-[8px] bg-slate-900 border border-slate-800 px-1.5 py-0.5 rounded text-slate-600 uppercase font-bold">Beta</div>
          </div>
      </section>
    </div>
  );
}

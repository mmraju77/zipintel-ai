import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Loader2, Zap, Hash, MapPin, ChevronRight, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { COUNTRIES, SearchResult } from '../types';
import { POSTAL_DATA } from '../data/postalData';

const ANCHOR_NODES = [
  { name: 'Visakhapatnam', code: 'in', region: 'andhra-pradesh', zip: '530001' },
  { name: 'Hyderabad', code: 'in', region: 'telangana', zip: '500001' },
  { name: 'Delhi', code: 'in', region: 'delhi', zip: '110001' },
  { name: 'Los Angeles', code: 'us', region: 'california', zip: '90001' },
  { name: 'New York', code: 'us', region: 'new-york', zip: '10001' },
  { name: 'London', code: 'gb', region: 'london', zip: 'EC1A1BB' },
  { name: 'Manchester', code: 'gb', region: 'greater-manchester', zip: 'M11AA' },
  { name: 'Berlin', code: 'de', region: 'berlin', zip: '10115' },
  { name: 'Munich', code: 'de', region: 'bayern', zip: '80331' },
  { name: 'Singapore', code: 'sg', region: 'singapore', zip: '048589' },
  { name: 'Auckland', code: 'nz', region: 'auckland', zip: '1010' },
  { name: 'Dublin', code: 'ie', region: 'dublin', zip: 'D02' },
  { name: 'Vienna', code: 'at', region: 'vienna', zip: '1010' },
  { name: 'Luxembourg City', code: 'lu', region: 'luxembourg-city', zip: '1111' },
  { name: 'Amsterdam', code: 'nl', region: 'north-holland', zip: '1011' },
  { name: 'Zurich', code: 'ch', region: 'zurich', zip: '8001' },
  { name: 'Oslo', code: 'no', region: 'oslo', zip: '0150' },
  { name: 'Stockholm', code: 'se', region: 'stockholm', zip: '11120' },
  { name: 'Copenhagen', code: 'dk', region: 'copenhagen', zip: '1000' },
  { name: 'Vancouver', code: 'ca', region: 'british-columbia', zip: 'V6B' },
  { name: 'Melbourne', code: 'au', region: 'victoria', zip: '3000' },
  { name: 'Dubai', code: 'ae', region: 'dubai', zip: '00000' }
];

export const GlobalSearch: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = async (val: string) => {
    setQuery(val);
    const trimmed = val.trim();
    if (trimmed.length < 2) {
      setResults([]);
      setShowDropdown(false);
      return;
    }

    setIsSearching(true);
    const lowerVal = trimmed.toLowerCase();
    let suggestions: SearchResult[] = [];

    // 1. Search Anchors (Primary)
    ANCHOR_NODES.forEach(anchor => {
      if (anchor.name.toLowerCase().includes(lowerVal) || anchor.zip.toLowerCase().includes(lowerVal)) {
        suggestions.push({
          id: `anchor-${anchor.zip}`,
          name: anchor.name,
          type: 'Anchor Node',
          path: `/zip/${anchor.code}/${anchor.region.toLowerCase()}/${anchor.zip}`,
          postalCode: anchor.zip,
          countryName: anchor.code.toUpperCase()
        });
      }
    });

    // 2. Search Countries
    COUNTRIES.forEach(c => {
      if (c.name.toLowerCase().includes(lowerVal)) {
        suggestions.push({
          id: c.id,
          name: c.name,
          type: 'Country Hub',
          path: `/${c.id}`,
          countryName: 'Global'
        });
      }
    });

    // 3. Heuristic ZIP Parsing (Dynamic)
    if (/^\d{5,6}$/.test(trimmed)) {
      const code = trimmed.length === 6 ? 'in' : 'us';
      const region = trimmed.length === 6 ? 'panderu' : 'california'; // Fallback regions for interpolation
      suggestions.push({
        id: `heuristic-${trimmed}`,
        name: `Analyze ${trimmed}`,
        type: 'Dynamic ZIP Search',
        path: `/zip/${code}/${region}/${trimmed}`,
        postalCode: trimmed,
        countryName: code.toUpperCase(),
        isLive: true
      });
    }

    setResults(suggestions.slice(0, 8));
    setShowDropdown(true);
    setIsSearching(false);
  };

  const handleSelect = (result: SearchResult) => {
    navigate(result.path);
    setShowDropdown(false);
    setQuery('');
  };

  return (
    <div className="relative max-w-2xl mx-auto z-50 mt-8" ref={dropdownRef}>
      <div className="relative group">
        <div className="absolute inset-0 bg-[#deff9a]/10 blur-2xl rounded-full opacity-0 group-focus-within:opacity-100 transition-opacity" />
        <div className="relative flex items-center bg-[#0a0f1e] border border-slate-800 rounded-2xl p-2 pl-6 shadow-2xl focus-within:border-[#deff9a] transition-all ring-1 ring-slate-800/50 focus-within:ring-[#deff9a]/30">
          {isSearching ? (
            <Loader2 className="w-5 h-5 text-[#deff9a] animate-spin" />
          ) : (
            <Search className="w-5 h-5 text-slate-500 group-focus-within:text-[#deff9a] transition-colors" />
          )}
          <input
            type="text"
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            onFocus={() => query.length >= 2 && setShowDropdown(true)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && results.length > 0) {
                handleSelect(results[0]);
              }
            }}
            placeholder="Global Search: Postal Code, Region, or Country..."
            className="bg-transparent border-none focus:ring-0 w-full text-white font-medium px-4 py-3 placeholder:text-slate-600 text-sm"
          />
          <button 
            onClick={() => results.length > 0 && handleSelect(results[0])}
            className="bg-[#deff9a] hover:bg-[#c9f57d] text-midnight px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all flex items-center gap-2 active:scale-95"
          >
            ANALYZE <ArrowRight className="w-3 h-3 stroke-[3]" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {showDropdown && results.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-full left-0 right-0 mt-3 bg-[#0a0f1e] border border-[#deff9a]/10 rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)] z-[60] backdrop-blur-xl"
          >
            <div className="p-2 border-b border-white/5 bg-white/[0.02]">
              <p className="text-[9px] font-black text-[#deff9a] uppercase tracking-[0.2em] px-3 py-1">Intelligence Suggestions</p>
            </div>
            {results.map((result, idx) => (
              <button
                key={`${result.id}-${idx}`}
                onClick={() => handleSelect(result)}
                className="w-full flex items-center justify-between p-4 hover:bg-[#deff9a]/5 border-b border-white/5 last:border-0 group transition-all text-left"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center border border-white/5 text-slate-500 group-hover:text-[#deff9a] group-hover:border-[#deff9a]/30 transition-all">
                    {result.isLive ? <Zap className="w-5 h-5 text-[#deff9a]" /> : (result.postalCode ? <Hash className="w-5 h-5" /> : <MapPin className="w-5 h-5" />)}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white group-hover:text-[#deff9a] transition-colors">{result.name}</p>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest leading-none mt-1">
                      {result.type} • {result.countryName} {result.postalCode && `• ${result.postalCode}`}
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-800 group-hover:text-[#deff9a] translate-x-0 group-hover:translate-x-1 transition-all" />
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

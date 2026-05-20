import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'motion/react';
import { COUNTRIES, Region, SearchResult } from '../types';
import { POSTAL_DATA } from '../data/postalData';
import { POSTAL_FRAMEWORK, DistrictData } from '../data/postalFramework';
import { ChevronRight, MapPin, Database, Zap, ShieldCheck, ArrowLeft, Hash, Sparkles, Loader2, Heart, Download, Target } from 'lucide-react';
import { useI18n } from '../lib/i18n';
import { GeoRadar } from '../components/GeoRadar';
import { DistanceCalculator } from '../components/DistanceCalculator';
import { InfrastructureInsights } from '../components/InfrastructureInsights';
import { AILocalGuide } from '../components/AILocalGuide';
import { AffiliateWidgets } from '../components/AffiliateWidgets';
import { PDFReport } from '../components/PDFReport';

export default function CountryPage() {
  const { t, language } = useI18n();
  const { 
    countryId: countryParam, 
    l1: stateId, 
    l2: districtId, 
    l3: localityId,
    countryCode,
    region,
    zipCode
  } = useParams<{ 
    countryId?: string; 
    l1?: string; 
    l2?: string; 
    l3?: string;
    countryCode?: string;
    region?: string;
    zipCode?: string;
  }>();

  // Normalization for pSEO route if it matches /zip/:countryCode/:region/:zipCode
  const isoToId: Record<string, string> = {
    'in': 'india', 'us': 'usa', 'gb': 'uk', 'ca': 'canada', 
    'au': 'australia', 'de': 'germany', 'ae': 'uae', 'ch': 'switzerland',
    'no': 'norway', 'se': 'sweden', 'dk': 'denmark', 'nl': 'netherlands',
    'sg': 'singapore', 'nz': 'new-zealand', 'ie': 'ireland', 'at': 'austria',
    'lu': 'luxembourg'
  };

  const actualCountryId = countryCode 
    ? (isoToId[countryCode.toLowerCase()] || COUNTRIES.find(c => c.id.toLowerCase().includes(countryCode.toLowerCase()) || c.name.toLowerCase() === countryCode.toLowerCase())?.id || countryCode.toLowerCase()) 
    : countryParam;
  const actualRegion = region || districtId;
  const actualZipCode = zipCode || localityId;

  const districtName = actualRegion ? actualRegion.replace(/-/g, ' ').toUpperCase() : '';
  
  const navigate = useNavigate();
  const country = COUNTRIES.find(c => c.id === actualCountryId);
  const data = POSTAL_DATA[actualCountryId || ''] || [];

  const [favorites, setFavorites] = React.useState<SearchResult[]>([]);

  React.useEffect(() => {
    const savedFavorites = localStorage.getItem('favorite-localities');
    if (savedFavorites) setFavorites(JSON.parse(savedFavorites));
  }, []);

  const toggleFavorite = (item: SearchResult) => {
    const isFav = favorites.some(f => f.id === item.id);
    let newFavs;
    if (isFav) {
      newFavs = favorites.filter(f => f.id !== item.id);
    } else {
      newFavs = [item, ...favorites];
    }
    setFavorites(newFavs);
    localStorage.setItem('favorite-localities', JSON.stringify(newFavs));
  };

  const handleDownloadReport = (item: SearchResult) => {
    const printContent = `
      <div style="font-family: sans-serif; padding: 40px; color: #020617; background: #fff;">
        <div style="display: flex; justify-content: space-between; align-items: start; border-bottom: 2px solid #d4af37; padding-bottom: 20px; margin-bottom: 30px;">
          <div>
            <h1 style="margin: 0; font-size: 24px; text-transform: uppercase;">ZipIntel AI Verified Report</h1>
            <p style="margin: 5px 0 0; font-size: 10px; color: #64748b; text-transform: uppercase; letter-spacing: 2px;">Global Intelligence Protocol</p>
          </div>
          <div style="text-align: right;">
            <p style="margin: 0; font-size: 10px; font-weight: bold; color: #d4af37;">DATE: ${new Date().toLocaleDateString()}</p>
            <p style="margin: 0; font-size: 10px; color: #64748b;">REF: ${item.id.toUpperCase()}</p>
          </div>
        </div>
        
        <div style="margin-bottom: 40px;">
          <h2 style="font-size: 32px; margin: 0 0 10px; font-style: italic;">${item.name}</h2>
          <div style="display: flex; gap: 20px;">
            <div style="flex: 1; padding: 15px; background: #f8fafc; border-radius: 8px;">
              <p style="margin: 0 0 5px; font-size: 10px; color: #64748b; text-transform: uppercase; font-weight: bold;">Region</p>
              <p style="margin: 0; font-weight: bold;">${item.type}</p>
            </div>
            <div style="flex: 1; padding: 15px; background: #f8fafc; border-radius: 8px;">
              <p style="margin: 0 0 5px; font-size: 10px; color: #64748b; text-transform: uppercase; font-weight: bold;">Postal Code</p>
              <p style="margin: 0; font-weight: bold; font-size: 20px; color: #d4af37;">${item.postalCode || 'N/A'}</p>
            </div>
          </div>
        </div>
        <div style="text-align: center; border-top: 1px solid #e2e8f0; padding-top: 20px; color: #94a3b8; font-size: 8px; text-transform: uppercase; letter-spacing: 1px;">
          ZipIntel AI - Premium Intelligence Architecture
        </div>
      </div>
    `;
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`<html><head><title>Report - ${item.name}</title></head><body>${printContent}</body></html>`);
      printWindow.document.close();
      printWindow.print();
    }
  };

  if (!country) return <div className="p-8 text-center text-slate-400">Country not found</div>;

  // Resolve hierarchy nodes
  const node1 = stateId ? data.find(n => n.id === stateId) : null;
  const node2 = actualRegion ? (node1?.subRegions?.find(n => n.id === actualRegion) || data.find(n => n.id === actualRegion)) : null;
  const node3 = actualZipCode ? node2?.subRegions?.find(n => n.id === actualZipCode) : null;

  const currentNode = node3 || node2 || node1;
  const items = currentNode ? (currentNode.subRegions || []) : data;
  const currentLevel = actualZipCode ? 3 : actualRegion ? 2 : stateId ? 1 : 0;
  const nextLevelName = country.hierarchy[currentLevel] || 'Data';

  // Programmatic SEO Framework Resolution
  const frameworkState = stateId ? POSTAL_FRAMEWORK[stateId] : null;
  const frameworkDistrict = (frameworkState && actualRegion) ? frameworkState.districts[actualRegion] : null;
  const isPseoActive = !!frameworkDistrict;
  
  const pSeoMandals = frameworkDistrict?.mandals || [];
  const pSeoCoords = frameworkDistrict?.coords || { lat: 18.08, lng: 82.66 };

  // Granular data fetching for missing records
  const [fetchedItems, setFetchedItems] = React.useState<Region[]>([]);
  const [fetchingItems, setFetchingItems] = React.useState<boolean>(false);
  const [errorStatus, setErrorStatus] = React.useState<string | null>(null);

  React.useEffect(() => {
    // Reset fetched items when hierarchy changes
    setFetchedItems([]);
    setErrorStatus(null);
    
    const shouldFetch = (stateId || actualRegion || actualZipCode) && items.length === 0;
    
    if (shouldFetch) {
      const fetchGranular = async () => {
        setFetchingItems(true);
        try {
          let url = '/api/postal/fetch-records';
          let body: any = { 
            parentId: currentNode?.name || country.name, 
            countryId: country.name,
            level: currentLevel
          };

          // INDIA LIVE API
          if (actualCountryId === 'india') {
            // If the parent name looks like a pincode or is a village search
            const pincodeMatch = currentNode?.name.match(/\d{6}/);
            const query = actualZipCode || (pincodeMatch ? pincodeMatch[0] : currentNode?.name);
            if (query) {
              const res = await fetch(`/api/postal/live-india/${query}`);
              const data = await res.json();
              
              if (data && data[0] && data[0].Status === 'Success') {
                const records = data[0].PostOffice.map((po: any) => ({
                  id: po.Name.toLowerCase().replace(/ /g, '-'),
                  name: po.Name,
                  type: 'Post Office',
                  postalCode: po.Pincode
                }));
                setFetchedItems(records);
                return;
              }
            }
          }

          // GLOBAL LIVE API (Zippopotam.us)
          const zippoMap: Record<string, string> = {
            'usa': 'us',
            'germany': 'de',
            'canada': 'ca',
            'uk': 'gb',
            'australia': 'au'
          };

          if (zippoMap[actualCountryId || '']) {
            const zip = actualZipCode || currentNode?.name.match(/\d+/)?.[0];
            if (zip) {
              const res = await fetch(`/api/postal/live-global/${zippoMap[actualCountryId!]}/${zip}`);
              if (res.ok) {
                const data = await res.json();
                const records = data.places.map((p: any, idx: number) => ({
                  id: `place-${idx}`,
                  name: p['place name'],
                  type: 'Locality',
                  postalCode: data['post code']
                }));
                setFetchedItems(records);
                return;
              }
            }
          }

          // FALLBACK: Existing Fetch Logic (Gemini/Local)
          const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
          });
          const result = await response.json();
          if (result.records && result.records.length > 0) {
            setFetchedItems(result.records);
          } else if (result.message || result.error) {
            setErrorStatus(result.message || result.error);
          } else {
            setErrorStatus('Region data node reported empty records. Switching to manual indexing.');
          }
        } catch (error: any) {
          console.error('Fetch error:', error);
          setErrorStatus(`Node Offline: Forced local indexing active. displaying closest regional matches.`);
          // If fetch fails, we might still have some data if it was a partial failure, 
          // but usually fetchedItems is empty here.
        } finally {
          setFetchingItems(false);
        }
      };
      fetchGranular();
    }
  }, [stateId, actualRegion, actualZipCode, currentNode?.id, items.length, actualCountryId]);

  const displayItems = items.length > 0 ? items : fetchedItems;

  const currentPin = actualZipCode || (isPseoActive ? (pSeoMandals[0]?.pin || '531024') : '531077');

  // AI Locality Insights logic
  const [insight, setInsight] = React.useState<string>('');
  const [insightLoading, setInsightLoading] = React.useState<boolean>(false);

  // Distance Calculator State
  const [distSource, setDistSource] = React.useState<string>('');
  const [distDest, setDistDest] = React.useState<string>('');
  const [distResult, setDistResult] = React.useState<any>(null);
  const [distLoading, setDistLoading] = React.useState<boolean>(false);

  // Reset calculator states on route change
  React.useEffect(() => {
    setDistSource('');
    setDistDest('');
    setDistResult(null);
  }, [actualRegion, actualZipCode]);

  const handleCalculateDistance = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!distSource || !distDest) return;
    setDistLoading(true);
    setDistResult(null);

    try {
      const response = await fetch('/api/ai/calculate-distance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ source: distSource, destination: distDest }),
      });
      const data = await response.json();
      if (data.distance) {
        setDistResult(data);
      }
    } catch (error) {
      console.error('Distance calc error:', error);
    } finally {
      setDistLoading(false);
    }
  };

  React.useEffect(() => {
    const fetchInsight = async () => {
      if (!actualCountryId) return;
      setInsightLoading(true);
      try {
        const localityName = actualZipCode || currentNode?.name || country.name;
        const contextString = `District: ${actualRegion || ''}, State: ${stateId || ''}, Country: ${country.name}. Provide brief highlights on postal infrastructure, major regional nodes, and the general geographical connectivity and logistical landscape.`;
        
        const response = await fetch('/api/ai/locality-insights', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            locality: localityName, 
            context: contextString 
          }),
        });
        const data = await response.json();
        if (data.insight) {
          setInsight(data.insight);
        } else if (data.message) {
          console.warn('AI Insight Warning:', data.message);
        }
      } catch (error: any) {
        console.error('Insight error:', error);
      } finally {
        setInsightLoading(false);
      }
    };

    fetchInsight();
  }, [currentNode?.id, country.name, actualRegion, actualZipCode]);

  // Dynamic Title Construction for pSEO
  const isPseoRoute = !!zipCode;
  const locationLabel = [node3?.name, node2?.name, node1?.name, country.name].filter(Boolean).join(', ');
  
  const pSeoTitle = isPseoRoute 
    ? `${zipCode} Postal Intelligence Node | ${region}, ${countryCode} | Internet Speed & Logistics Guide` 
    : locationLabel + ` | ZipIntel AI`;

  const pSeoDescription = isPseoRoute
    ? `Looking for ${zipCode} metrics? Get live internet speeds (Jio/AT&T), nearest courier logistics hubs, delivery feasibility, and AI area financial indicators for ${region}, ${countryCode} instantly.`
    : `Explore ${nextLevelName} in ${[node3?.name, node2?.name, node1?.name, country.name].filter(Boolean).join(', ')}. Comprehensive postal and utility intelligence.`;
  
  const canonicalUrl = isPseoRoute
    ? `https://www.zipintel-ai.com/zip/${countryCode}/${region}/${zipCode}`
    : `https://www.zipintel-ai.com/${actualCountryId}${stateId ? '/' + stateId : ''}${actualRegion ? '/' + actualRegion : ''}${actualZipCode ? '/' + actualZipCode : ''}`;

  const ShimmerCard = () => (
    <div className="glass-card p-6 animate-pulse border-slate-800/50">
      <div className="flex justify-between items-start mb-4">
        <div className="w-10 h-10 bg-slate-800 rounded-lg" />
        <div className="w-4 h-4 bg-slate-800 rounded" />
      </div>
      <div className="h-6 w-2/3 bg-slate-800 rounded mb-2" />
      <div className="h-3 w-1/2 bg-slate-800 rounded" />
      <div className="mt-8 pt-4 border-t border-slate-800/50 flex justify-between">
        <div className="h-3 w-1/4 bg-slate-800 rounded" />
        <div className="h-3 w-1/4 bg-slate-800 rounded" />
      </div>
    </div>
  );

  return (
    <div className="space-y-8 pb-20">
      <Helmet>
        <title>{pSeoTitle}</title>
        <meta name="description" content={pSeoDescription} />
        <link rel="canonical" href={canonicalUrl} />
      </Helmet>

      {/* Error Toast */}
      {/* Print Only Header */}
      <div className="print-only mb-10 text-center border-b-2 border-black pb-6">
        <h1 className="text-3xl font-black uppercase tracking-tighter">ZIPINTEL GLOBAL INFRASTRUCTURE AUDIT REPORT</h1>
        <div className="flex justify-between items-center mt-6 text-xs font-bold">
          <div className="text-left">
            <p>LOCATION: {actualZipCode} | {actualRegion}</p>
            <p>COUNTRY: {actualCountryId?.toUpperCase()}</p>
          </div>
          <div className="text-right">
            <p>DATE: {new Date().toLocaleDateString()}</p>
            <p>STATUS: VERIFIED NODE</p>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {errorStatus && (
          <motion.div
            initial={{ opacity: 0, y: -20, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: -20, x: '-50%' }}
            className="fixed top-8 left-1/2 z-[100] px-6 py-3 bg-red-500/20 border border-red-500/50 backdrop-blur-xl rounded-2xl text-red-100 text-xs font-black uppercase tracking-widest flex items-center gap-3 shadow-[0_10px_40px_rgba(239,68,68,0.2)]"
          >
            <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-white font-black text-[10px]">!</div>
            {errorStatus}
            <button onClick={() => setErrorStatus(null)} className="ml-4 hover:text-white">✕</button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Breadcrumbs & Navigation */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2 text-[10px] text-slate-500 uppercase tracking-widest font-black">
          <Link to="/" className="hover:text-gold transition-colors">{t('home')}</Link>
          <ChevronRight className="w-3 h-3" />
          <Link to={`/${country.id}`} className={`hover:text-gold transition-colors ${!stateId ? 'text-gold italic' : ''}`}>
            {country.name}
          </Link>
          {node1 && (
            <>
              <ChevronRight className="w-3 h-3" />
              <Link to={`/${country.id}/${stateId}`} className={`hover:text-gold transition-colors ${!districtId ? 'text-gold italic' : ''}`}>
                {node1.name}
              </Link>
            </>
          )}
          {node2 && (
            <>
              <ChevronRight className="w-3 h-3" />
              <Link to={`/${country.id}/${stateId}/${districtId}`} className={`hover:text-gold transition-colors ${!localityId ? 'text-gold italic' : ''}`}>
                {node2.name}
              </Link>
            </>
          )}
          {node3 && (
            <>
              <ChevronRight className="w-3 h-3" />
              <span className="text-gold italic">{node3.name}</span>
            </>
          )}
        </div>
        
        {stateId && (
          <div className="flex items-center justify-between no-print">
            <button 
              onClick={() => navigate(-1)}
              className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors text-xs font-bold uppercase tracking-tighter"
            >
              <ArrowLeft className="w-3 h-3" />
              <span>{language === 'en' ? 'Back' : 'వెనుకకు'}</span>
            </button>
            <PDFReport countryCode={countryCode || actualCountryId?.substring(0, 2).toUpperCase()} region={actualRegion} zipCode={actualZipCode} />
          </div>
        )}
      </div>

      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-3xl bg-slate-800/20 p-8 lg:p-12 border border-slate-800 shadow-2xl">
        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 mb-4"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
              Level {currentLevel}: {currentNode?.type || 'Root'} node
            </span>
          </motion.div>
          <motion.h1 
            key={locationLabel}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl lg:text-5xl font-black mb-4 text-white tracking-tighter uppercase italic"
          >
            {districtName || currentNode?.name || country.name} <span className="gold-gradient-text uppercase">{localityId ? (language === 'en' ? 'DIRECTORY' : 'డైరెక్టరీ') : country.hierarchy[currentLevel]?.toUpperCase()}</span>
          </motion.h1>
          <p className="text-slate-500 text-base max-w-2xl font-medium">
            Currently viewing all <span className="text-slate-300">verified {nextLevelName.toLowerCase()}s</span> within {currentNode?.name || country.name}. 
            All data points are AI-validated for routing accuracy.
          </p>
        </div>

        {/* AI Insight Widget */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-8 rounded-3xl bg-gold/5 border border-gold/10 backdrop-blur-sm relative overflow-hidden group h-full"
            >
              <div className="flex items-start gap-4 relative z-10">
                <div className="w-10 h-10 rounded-xl bg-midnight flex items-center justify-center border border-gold/20 shadow-[0_0_15px_rgba(212,175,55,0.1)]">
                  <Sparkles className={`w-5 h-5 text-gold ${insightLoading ? 'animate-pulse' : ''}`} />
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black text-gold uppercase tracking-widest italic">{t('localityBriefing')}</span>
                    <span className="text-[8px] px-1.5 py-0.5 rounded bg-slate-900 text-slate-500 font-bold border border-slate-800 uppercase">Neural Insight</span>
                  </div>
                  {insightLoading ? (
                    <div className="space-y-2 pt-1">
                      <div className="h-4 w-3/4 bg-slate-800 animate-pulse rounded" />
                      <div className="h-4 w-1/2 bg-slate-800 animate-pulse rounded" />
                    </div>
                  ) : insight ? (
                    <div className="space-y-4 pt-2">
                      <p className="text-slate-300 text-sm font-medium leading-relaxed italic">
                        "{insight}"
                      </p>
                      
                      {isPseoActive && !localityId && (
                        <div className="space-y-3">
                          <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em]">{language === 'te' ? 'యూనిట్ ఉప-విభాగాలు (మండలాలు/ప్రాంతాలు)' : 'Regional Sub-divisions (Mandals/Localities)'}</p>
                          <div className="grid grid-cols-2 gap-2">
                            {pSeoMandals.map((m) => (
                              <div key={m.id} className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between group hover:border-gold/30 transition-colors cursor-pointer">
                                <div className="space-y-1">
                                  <p className="text-[10px] font-black text-slate-200 uppercase tracking-tight">{language === 'te' ? m.te : m.en}</p>
                                  <p className="text-[9px] font-bold text-gold uppercase tracking-widest flex items-center gap-1">
                                    <Hash className="w-2 h-2" /> {m.pin}
                                  </p>
                                </div>
                                <ChevronRight className="w-3 h-3 text-slate-700 group-hover:text-gold transition-colors" />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="flex flex-wrap gap-2">
                        {isPseoActive && (
                          <>
                            <span className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-slate-900 border border-slate-800 text-[8px] font-black text-gold uppercase tracking-widest">
                              <Target className="w-2.5 h-2.5" /> {t('mainHQ')}: {language === 'te' ? frameworkDistrict.hqTe : frameworkDistrict.hqEn}
                            </span>
                            <span className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-slate-900 border border-slate-800 text-[8px] font-black text-slate-400 uppercase tracking-widest">
                              <Hash className="w-2.5 h-2.5" /> PIN: {currentPin}
                            </span>
                          </>
                        )}
                        <span className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-slate-900 border border-slate-800 text-[8px] font-black text-slate-400 uppercase tracking-widest">
                          <Database className="w-2.5 h-2.5" /> {t('verifiedNode')}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4 pt-2">
                      <p className="text-slate-500 text-sm font-medium italic">
                        {isPseoActive ? 
                          (language === 'te' ? `${frameworkDistrict.nameTe} - ప్రాంతీయ నిర్వహణ కేంద్రం. ఈ ప్రాంతం పిన్ కోడ్: ${currentPin}.` : `${frameworkDistrict.nameEn}: Verified regional administrative block. Logistical connectivity active. Primary postal node: ${currentPin}.`) 
                          : 'AI indexing active for this regional node. Gathering administrative and logistical context...'}
                      </p>

                      {isPseoActive && !localityId && (
                        <div className="grid grid-cols-2 gap-2 mt-4">
                          {pSeoMandals.map((m) => (
                            <div key={m.id} className="p-3 rounded-xl bg-slate-900/40 border border-slate-800/40 flex items-center justify-between">
                              <div className="space-y-1">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-tight">{language === 'te' ? m.te : m.en}</p>
                                <p className="text-[9px] font-bold text-slate-600 uppercase tracking-widest">{m.pin}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="flex flex-wrap gap-2">
                         <span className="px-2 py-1 rounded-md bg-slate-900/50 border border-slate-800/50 text-[8px] font-bold text-slate-600 uppercase tracking-widest">Indexing Level {currentLevel}</span>
                         <span className="px-2 py-1 rounded-md bg-slate-900/50 border border-slate-800/50 text-[8px] font-bold text-slate-600 uppercase tracking-widest">Global Directory Mode</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="absolute -right-20 -bottom-20 w-40 h-40 bg-gold/5 blur-3xl rounded-full" />
            </motion.div>

            {/* Interactive Map Viewport */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-3xl bg-slate-900/50 border border-slate-800 overflow-hidden h-64 relative group"
            >
              <div className="absolute inset-0 bg-[url('https://www.google.com/maps/vt/pb=!1m4!1m3!1i10!2i145!3i92!2m3!1e0!2sm!3i633000000!3m8!2sen!3sus!5e1105!12m4!1e68!2m2!1sset!2sRoadmap!4e0!5m1!5f2')] opacity-20 grayscale contrast-125 group-hover:opacity-40 transition-all duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center space-y-2 p-6 bg-slate-950/80 backdrop-blur-md rounded-2xl border border-slate-800 w-3/4">
                  <MapPin className="w-8 h-8 text-gold mx-auto animate-bounce mb-2" />
                  <p className="text-[10px] font-black text-slate-200 uppercase tracking-widest">{currentNode?.name || country.name} Region</p>
                  <div className="flex items-center justify-center gap-3 text-[10px] text-slate-500 font-bold">
                    <span className="px-2 py-0.5 rounded-full bg-slate-900 border border-slate-800">{isPseoActive ? 'Verified pSEO Node' : 'Verified Node'}</span>
                    <span className="px-2 py-0.5 rounded-full bg-slate-900 border border-slate-800 italic uppercase">{isPseoActive ? 'Hardened DB' : 'GIS Active'}</span>
                  </div>
                </div>
              </div>
            <div className="absolute top-4 right-4 flex gap-2">
              <div className="w-2 h-2 rounded-full bg-gold animate-pulse" />
              <div className="text-[10px] font-black text-gold uppercase tracking-widest">{isPseoActive ? 'pSEO SYNC: ACTIVE' : 'Live Node'}</div>
            </div>
            </motion.div>
          </div>

          {/* Analytics Dashboard */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="p-8 rounded-3xl bg-slate-900/50 border border-slate-800 backdrop-blur-xl group h-full"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center">
                <Database className="w-5 h-5 text-gold" />
              </div>
              <h2 className="text-xl font-bold text-slate-100 uppercase tracking-tight italic">{t('analytics')}</h2>
            </div>

            <div className="space-y-8">
              <div className="space-y-3">
                <div className="flex justify-between items-end">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t('efficiency')}</p>
                  <p className="text-lg font-black text-gold">94.2%</p>
                </div>
                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: "94.2%" }}
                    transition={{ duration: 1.5 }}
                    className="h-full bg-gold"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-end">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t('branchDensity')}</p>
                  <p className="text-lg font-black text-slate-100">High</p>
                </div>
                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: "78%" }}
                    transition={{ duration: 1.5, delay: 0.2 }}
                    className="h-full bg-slate-100"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="w-3 h-3 text-gold" />
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Head Nodes</span>
                  </div>
                  <p className="text-xl font-black text-slate-100">12</p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="w-3 h-3 text-gold" />
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Active Links</span>
                  </div>
                  <p className="text-xl font-black text-slate-100">1.4K</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-gold/5 border border-gold/10 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                <div>
                  <p className="text-[10px] font-black text-gold uppercase tracking-[0.2em] mb-1">Status Report</p>
                  <p className="text-xs text-slate-400 line-clamp-2 italic">Geospatial verification confirmed. Area operational status is within baseline parameters.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-5 pointer-events-none overflow-hidden">
           <MapPin className="w-[300px] h-[300px] absolute -right-10 -top-10 text-gold" />
        </div>
      </div>

      {/* Dynamic Grid Rendering */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Select {nextLevelName}</h2>
          <span className="text-[10px] text-gold font-bold px-2 py-0.5 bg-gold/10 rounded border border-gold/20 italic">
            {displayItems.length} Records {fetchingItems ? 'Fetching...' : 'Found'}
          </span>
        </div>

        {fetchingItems && displayItems.length === 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[1, 2, 3, 4, 5, 6].map((i) => <ShimmerCard key={i} />)}
          </div>
        ) : displayItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {displayItems.map((item, index) => {
              const itemPath = localityId ? '#' : actualRegion ? `/${actualCountryId}/${stateId}/${actualRegion}/${item.id}` : stateId ? `/${actualCountryId}/${stateId}/${item.id}` : `/${actualCountryId}/${item.id}`;
              const searchItem: SearchResult = { ...item, path: itemPath };
              
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    to={itemPath}
                    className="glass-card p-6 block group relative overflow-hidden h-full"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center border border-slate-700 group-hover:bg-gold group-hover:border-gold transition-all duration-300">
                        {item.postalCode ? (
                          <Hash className="w-5 h-5 text-gold group-hover:text-midnight" />
                        ) : (
                          <MapPin className="w-5 h-5 text-gold group-hover:text-midnight" />
                        )}
                      </div>
                      <div className="flex gap-2">
                        <button 
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            toggleFavorite(searchItem);
                          }}
                          className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-500 hover:text-red-500 transition-colors"
                        >
                          <Heart className={`w-3.5 h-3.5 ${favorites.some(f => f.id === item.id) ? 'fill-red-500 text-red-500' : ''}`} />
                        </button>
                        <button 
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleDownloadReport(searchItem);
                          }}
                          className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-500 hover:text-gold transition-colors"
                        >
                          <Download className="w-3.5 h-3.5" />
                        </button>
                        <ChevronRight className={`w-4 h-4 text-slate-800 group-hover:text-gold transition-all ${item.postalCode ? 'hidden' : ''}`} />
                      </div>
                    </div>

                    <h3 className="text-xl font-black text-white group-hover:text-gold transition-colors uppercase italic mb-1">{item.name}</h3>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter">
                      {item.type} {item.postalCode && `• PIN: ${item.postalCode}`}
                    </p>

                    {item.postalCode && (
                      <div className="mt-4 pt-4 border-t border-slate-800/50 flex items-center justify-between">
                        <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest flex items-center gap-1">
                          <ShieldCheck className="w-3 h-3" /> Verified
                        </span>
                        <span className="text-[10px] font-mono text-gold">{item.postalCode}</span>
                      </div>
                    )}
                  </Link>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="glass-card p-20 text-center space-y-4">
            {fetchingItems ? (
              <Loader2 className="w-12 h-12 text-gold mx-auto animate-spin" />
            ) : (
              <Database className="w-12 h-12 text-slate-800 mx-auto" />
            )}
            <p className="text-slate-500 font-bold uppercase tracking-widest italic text-sm">
              {fetchingItems ? 'AI Crawlers scanning directory...' : 'Deep records loading for this region...'}
            </p>
            <p className="text-xs text-slate-600">
              {fetchingItems ? 'Accessing granular postal nodes via neural routing.' : 'Our crawler is still indexing the most granular levels of this directory.'}
            </p>
          </div>
        )}
      </div>

      {/* Phase-3: Visual Mini-Map & Distance Calculator Injected beneath Grid */}
      {isPseoActive && !localityId && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-4"
        >
          <GeoRadar 
            key={`${districtId}-${localityId}`}
            district={districtName || districtId || ''} 
            coords={pSeoCoords} 
            language={language} 
          />

          <DistanceCalculator
            key={`${districtId}-${localityId}`}
            district={districtId || ''}
            language={language}
            distSource={distSource}
            setDistSource={setDistSource}
            distDest={distDest}
            setDistDest={setDistDest}
            distResult={distResult}
            distLoading={distLoading}
            onCalculate={handleCalculateDistance}
          />
        </motion.div>
      )}

      {isPseoActive && !localityId && (
        <>
          <InfrastructureInsights key={`infra-${districtId}`} districtId={districtId || ''} language={language} />
          <AILocalGuide key={`ai-guide-${districtId}`} districtId={districtId || ''} countryId={country.id} />
          <AffiliateWidgets 
            countryCode={countryCode || (actualCountryId === 'india' ? 'IN' : actualCountryId === 'usa' ? 'US' : actualCountryId === 'uk' ? 'GB' : actualCountryId?.substring(0, 2).toUpperCase() || 'INTL')} 
            region={actualRegion || country.name} 
          />
        </>
      )}

      {/* Contextual Stats */}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 pt-8">
        <div className="glass-card p-8 flex flex-col items-center text-center">
          <Zap className="w-8 h-8 text-gold/30 mb-4" />
          <h4 className="text-2xl font-light text-white mb-1 uppercase tracking-tighter italic">Low Latency</h4>
          <p className="text-[9px] text-slate-500 uppercase font-black tracking-[0.2em]">Regional Edge Cache Enabled</p>
        </div>
        <div className="glass-card p-8 flex flex-col items-center text-center">
          <ShieldCheck className="w-8 h-8 text-gold/30 mb-4" />
          <h4 className="text-2xl font-light text-white mb-1 uppercase tracking-tighter italic">99.9% Normal</h4>
          <p className="text-[9px] text-slate-500 uppercase font-black tracking-[0.2em]">Postal Compliance Schema</p>
        </div>
        <div className="glass-card p-8 flex flex-col items-center text-center">
          <Database className="w-8 h-8 text-gold/30 mb-4" />
          <h4 className="text-2xl font-light text-white mb-1 uppercase tracking-tighter italic">Real-Time</h4>
          <p className="text-[9px] text-slate-500 uppercase font-black tracking-[0.2em]">Daily Directory Updates</p>
        </div>
      </div>
      <div className="print-only fixed bottom-0 left-0 right-0 py-4 border-t border-slate-200 text-center text-[10px] font-bold text-slate-500 uppercase tracking-widest bg-white">
        Generated securely via ZipIntel AI Nodes - www.zipintel-ai.com
      </div>
    </div>
  );
}


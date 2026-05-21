import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { InfrastructureInsights } from '../components/InfrastructureInsights';
import { MonetizationNodes } from '../components/MonetizationNodes';
import { useI18n } from '../lib/i18n';

export default function CountryPage() {
  const { language } = useI18n();
  const { 
    countryId, l1, l2, l3, 
    countryCode, region, zipCode 
  } = useParams<{ 
    countryId?: string; l1?: string; l2?: string; l3?: string;
    countryCode?: string; region?: string; zipCode?: string;
  }>();
  
  const currentCountry = (countryCode || countryId || 'in').toLowerCase().trim();
  const currentZip = (zipCode || l3 || l2 || l1 || '530001').trim();

  // SEO Meta Text Dynamic Content Generation (Google Search Snippet Moat)
  const getSEOMeta = () => {
    const countryNames: Record<string, string> = {
      in: "India (భారతదేశం)", usa: "United States", uk: "United Kingdom",
      gb: "United Kingdom", ca: "Canada", au: "Australia", de: "Germany", fr: "France"
    };
    const name = countryNames[currentCountry] || currentCountry.toUpperCase();
    return {
      title: `${name} Postal Code ${currentZip} - Global Financial Intelligence Hub`,
      description: `Verify financial routing metrics, active clearing node structures, and structural infrastructure values for region node ${currentZip} in ${name}. Powered by ZipIntel AI.`
    };
  };

  const seo = getSEOMeta();

  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-300 p-6 font-sans">
      <Helmet>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
      </Helmet>

      {/* Breadcrumb Navigation - Search Crawlers కి చాలా ముఖ్యం */}
      <div className="max-w-5xl mx-auto mb-6 text-xs font-mono flex items-center gap-2 text-slate-500">
        <Link to="/" className="hover:text-blue-400 transition-colors">Home</Link>
        <span>/</span>
        <span className="uppercase text-slate-400">{currentCountry}</span>
        <span>/</span>
        <span className="text-emerald-400">{currentZip}</span>
      </div>

      {/* Main Dynamic Landing Header */}
      <div className="max-w-5xl mx-auto bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 md:p-8 mb-8 shadow-zipGlow">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <div>
            <span className="text-xs font-mono uppercase bg-blue-600/10 text-blue-400 border border-blue-500/20 px-2.5 py-1 rounded">
              Programmatic Data Node Active
            </span>
            <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight mt-3">
              Target Infrastructure: <span className="text-blue-500 font-mono">{currentZip}</span>
            </h1>
          </div>
          <div className="text-right">
            <span className="text-xs font-mono text-slate-500 block">REGIONAL DIRECTORY</span>
            <span className="text-sm font-semibold text-white uppercase tracking-wider">{currentCountry} / Global Matrix</span>
          </div>
        </div>
        
        <p className="text-slate-400 text-sm max-w-3xl leading-relaxed">
          {seo.description} This page was dynamically compiled by our context-aware parser engine using deterministic calculations with zero external latency.
        </p>
      </div>

      {/* Grid Layout containing our Core Infrastructure Insights Card */}
      <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
        
        {/* Card 1 & 2: Local Node Metadata (SEO Rich Text Content) */}
        <div className="md:col-span-2 space-y-6">
          <div className="p-6 bg-slate-900/40 border border-slate-800/80 rounded-xl">
            <h3 className="text-md font-mono uppercase tracking-wider text-slate-400 mb-3 border-b border-slate-800 pb-2">
              📋 Regional SEO Metadata Context
            </h3>
            <div className="space-y-3 text-sm">
              <p><span className="text-slate-500 font-mono">Dynamic Page Title:</span> <span className="text-white font-medium">{seo.title}</span></p>
              <p><span className="text-slate-500 font-mono">Index Optimization:</span> <span className="text-emerald-400 font-mono">Ready for Googlebot Indexing / Canonical Active</span></p>
            </div>
          </div>

          <div className="p-6 bg-slate-900/40 border border-slate-800/80 rounded-xl">
            <h3 className="text-md font-mono uppercase tracking-wider text-slate-400 mb-2">
              💡 User Quick Actions
            </h3>
            <p className="text-xs text-slate-500 mb-4">Use our free Phase 2 utilities below to export or format this node data structure.</p>
            <div className="flex flex-wrap gap-3">
              <button onClick={() => window.print()} className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white font-mono text-xs rounded border border-slate-700 transition-colors">
                [Print/Save PDF]
              </button>
              <Link to="/" className="px-3 py-1.5 bg-blue-600/10 hover:bg-blue-600/20 text-blue-400 font-mono text-xs rounded border border-blue-500/30 transition-colors">
                ← Back to Core Hub
              </Link>
            </div>
          </div>
        </div>

        {/* Card 3: Our Financial Routing Infrastructure Engine (Card 5 from previous fix) */}
        <div className="md:col-span-1">
          <InfrastructureInsights 
            districtId={currentZip} 
            language={language}
            countryCode={currentCountry} 
            zipCode={currentZip} 
          />
          <div className="mt-6">
            <MonetizationNodes zone="sidebar" />
          </div>
        </div>

      </div>

      <div className="max-w-5xl mx-auto">
        <MonetizationNodes zone="bottom" />
      </div>
    </div>
  );
}


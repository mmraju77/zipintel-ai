import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'te';

interface Translations {
  [key: string]: {
    en: string;
    te: string;
  };
}

const translations: Translations = {
  // Navigation
  home: { en: 'Home', te: 'హోమ్' },
  aiTools: { en: 'AI Tools', te: 'AI టూల్స్' },
  directories: { en: 'Directories', te: 'డైరెక్టరీలు' },
  navigation: { en: 'Navigation', te: 'నావిగేషన్' },
  
  // Hero
  heroTitle: { en: 'Global Postal', te: 'గ్లోబల్ పోస్టల్' },
  heroSubtitle: { en: 'Access hyper-structured regional datasets across 184 countries. Powered by AI normalization and real-time utility mapping.', te: '184 దేశాలలో హైపర్-స్ట్రక్చర్డ్ ప్రాంతీయ డేటాసెట్లను యాక్సెస్ చేయండి. AI క్రమబద్ధీకరణ మరియు రియల్-టైమ్ యుటిలిటీ మ్యాపింగ్ ద్వారా ఆధారితం.' },
  searchPlaceholder: { en: 'Search PIN, Area, or Region (e.g. 531077 or California)', te: 'పిన్, ప్రాంతం లేదా రీజియన్ కోసం వెతకండి (ఉదా. 531077 లేదా కాలిఫోర్నియా)' },
  analyze: { en: 'Analyze', te: 'విశ్లేషించండి' },
  distanceCalculator: { en: 'Distance Calculator', te: 'దూర గణన' },
  source: { en: 'Source PIN/Area', te: 'ప్రారంభ ప్రాంతం' },
  destination: { en: 'Destination PIN/Area', te: 'గమ్యస్థానం' },
  calculate: { en: 'Calculate Distance', te: 'దూరాన్ని లెక్కించండి' },
  analytics: { en: 'Network Analytics', te: 'నెట్‌వర్క్ విశ్లేషణ' },
  efficiency: { en: 'Branch Efficiency', te: 'బ్రాంచ్ సామర్థ్యం' },
  branchDensity: { en: 'Branch Density', te: 'బ్రాంచ్ సాంద్రత' },
  transitInsight: { en: 'Transit Insight', te: 'రవాణా వివరాలు' },
  geospatialDistance: { en: 'Geospatial Distance', te: 'జియోస్పేషియల్ దూరం' },
  estCourierTransit: { en: 'Est. Courier Transit', te: 'అంచనా కొరియర్ రవాణా' },
  routingIntegrity: { en: 'Routing Integrity', te: 'రూటింగ్ సమగ్రత' },
  secureActive: { en: 'Secure / Active', te: 'సురక్షితం / యాక్టివ్' },
  verifiedAcquisition: { en: 'Verified Data Acquisition', te: 'ధృవీకరించబడిన డేటా సేకరణ' },
  accurate100: { en: '100% Accurate', te: '100% ఖచ్చితమైనది' },
  highwayRoutingActive: { en: 'High-Precision Highway Routing Active', te: 'అధిక-ఖచ్చితమైన హైవే రూటింగ్ యాక్టివ్‌గా ఉంది' },
  logisticsStatus: { en: 'Logistics Status', te: 'రవాణా స్థితి' },
  transitTime: { en: 'Est. Transit Time', te: 'అంచనా రవాణా సమయం' },
  logisticsPass: { en: 'Logistics Pass', te: 'రవాణా పాస్' },
  mainHQ: { en: 'Main HQ', te: 'ప్రధాన కేంద్రం' },
  totalBranches: { en: 'Postal Hubs', te: 'పోస్టల్ హబ్‌లు' },
  verifiedNode: { en: 'Verified Node', te: 'ధృవీకరించబడిన నోడ్' },
  adminLevel: { en: 'Admin Level', te: 'పరిపాలనా స్థాయి' },
  
  // Sections
  globalDirectories: { en: 'Global Directories', te: 'గ్లోబల్ డైరెక్టరీలు' },
  selectRegion: { en: 'Select a Region', te: 'ప్రాంతాన్ని ఎంచుకోండి' },
  viewAll: { en: 'View All', te: 'అన్నీ చూడండి' },
  recentSearches: { en: 'Recent Searches', te: 'ఇటీవలి శోధనలు' },
  favorites: { en: 'Favorites', te: 'ఇష్టమైనవి' },
  
  // Tools
  aiParser: { en: 'AI Parser Highlight', te: 'AI పార్సర్ హైలైట్' },
  aiParseTool: { en: 'AI Parse Tool', te: 'AI పార్స్ టూల్' },
  normalizeFormats: { en: 'Normalize Global Formats', te: 'గ్లోబల్ ఫార్మాట్‌లను సాధారణీకరించండి' },
  launchTool: { en: 'Launch Tool', te: 'టూల్ ప్రారంభించండి' },
  recentRewrites: { en: 'Recent Rewrites (pSEO)', te: 'ఇటీవలి రీరైట్లు (pSEO)' },
  liveStatus: { en: 'Live', te: 'లైవ్' },
  networkLatency: { en: 'Network Latency', te: 'నెట్‌వర్క్ జాప్యం' },
  publicApi: { en: 'Public API', te: 'పబ్లిక్ API' },
  rawDatabaseAccess: { en: 'Full raw database access.', te: 'పూర్తి ముడి డేటాబేస్ యాక్సెస్.' },

  // AI Tools Page
  aiUtilities: { en: 'AI Utilities', te: 'AI యుటిలిటీస్' },
  neuralPoweredTools: { en: 'Neural-powered tools to clean, verify, and insight global address data in real-time.', te: 'గ్లోబల్ అడ్రస్ డేటాను నిజ సమయంలో శుభ్రం చేయడానికి, ధృవీకరించడానికి మరియు అంతర్దృష్టిని పొందడానికి న్యూరల్-పవర్డ్ టూల్స్.' },
  addressStandardizer: { en: 'Address Standardizer', te: 'అడ్రస్ స్టాండర్డైజర్' },
  normalizeMessyInput: { en: 'Normalize messy input', te: 'అస్తవ్యస్తమైన ఇన్‌పుట్‌ను సాధారణీకరించండి' },
  pasteMessyAddress: { en: 'Paste Messy Address', te: 'అస్తవ్యస్తమైన చిరునామాను ఇక్కడ అతికించండి' },
  localityInsights: { en: 'Locality Insights', te: 'లోకాలిటీ అంతర్దృష్టులు' },
  areaContextAnalysis: { en: 'Area context analysis', te: 'ప్రాంతపు సందర్భ విశ్లేషణ' },
  areaNameOrZip: { en: 'Area Name or ZIP/PIN', te: 'ప్రాంతం పేరు లేదా పిన్' },
  localityBriefing: { en: 'Locality Briefing', te: 'లోకాలిటీ బ్రీఫింగ్' },
  verifiedOutput: { en: 'Verified Output', te: 'ధృవీకరించబడిన అవుట్‌పుట్' },
  copy: { en: 'Copy', te: 'కాపీ' },
  copied: { en: 'Copied', te: 'కాపీ చేయబడింది' },

  // Results
  liveIntelligence: { en: 'Live Intelligence', te: 'లైవ్ ఇంటెలిజెన్స్' },
  deepSearchResults: { en: 'Deep Search Results', te: 'లోతైన శోధన ఫలితాలు' },
  verified: { en: 'Verified', te: 'ధృవీకరించబడింది' },
  downloadReport: { en: 'Download Verified PDF Report', te: 'ధృవీకరించబడిన PDF రిపోర్ట్ డౌన్‌లోడ్ చేయండి' },
  standardizeAddress: { en: 'Standardize Address', te: 'చిరునామాను ప్రమాణీకరించండి' },
  getAiInsight: { en: 'Get AI Insight', te: 'AI అంతర్దృష్టిని పొందండి' },
};

interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('app-language');
    return (saved as Language) || 'en';
  });

  useEffect(() => {
    localStorage.setItem('app-language', language);
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: string) => {
    const translation = translations[key];
    if (!translation) return key;
    return translation[language];
  };

  return (
    <I18nContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}

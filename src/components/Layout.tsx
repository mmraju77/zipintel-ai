import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  MapPin, 
  Cpu, 
  Menu, 
  X, 
  Search, 
  Globe, 
  ChevronRight,
  Database,
  Languages
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { COUNTRIES } from '../types';
import { useI18n } from '../lib/i18n';
import { BrandLogo } from './BrandLogo';

const Logo = ({ collapsed = false }: { collapsed?: boolean }) => (
  <Link to="/" className="flex items-center gap-3 no-underline">
    {!collapsed ? (
      <BrandLogo className="h-10" />
    ) : (
      <div className="relative w-10 h-10 flex-shrink-0">
        {/* Orbit Rings */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 border border-gold/30 rounded-full"
        />
        <div className="absolute inset-[6px] bg-slate-900 rounded-full border border-gold/40 flex items-center justify-center">
          <Globe className="text-gold w-4 h-4" />
        </div>
      </div>
    )}
  </Link>
);

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const location = useLocation();
  const { language, setLanguage, t } = useI18n();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const navItems = [
    { name: t('home'), icon: Home, path: '/' },
    { name: t('aiTools'), icon: Cpu, path: '/ai-tools' },
  ];

  return (
    <div className="min-h-screen bg-midnight font-sans text-slate-200">
      {/* Mobile Header */}
      <header className="lg:hidden flex items-center justify-between p-4 bg-[#020617] border-b border-slate-800 sticky top-0 z-50">
        <Logo />
        <button onClick={toggleMobileMenu} className="text-slate-100 p-1">
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </header>

      <div className="flex h-screen overflow-hidden">
        {/* Desktop Sidebar */}
        <aside 
          className={`hidden lg:flex flex-col h-screen sticky top-0 bg-slate-sidebar border-r border-slate-800 transition-all duration-300 ${isSidebarOpen ? 'w-64' : 'w-20'}`}
        >
          <div className="p-5 mb-4">
            <Logo collapsed={!isSidebarOpen} />
          </div>

          <nav className="flex-1 px-4 py-2 space-y-1 overflow-y-auto">
            <div className="text-[10px] uppercase tracking-widest text-slate-500 mb-2 px-2 font-bold">{t('navigation')}</div>
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                  location.pathname === item.path ? 'sidebar-link-active' : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-100'
                }`}
              >
                <item.icon className={`w-5 h-5 flex-shrink-0 ${location.pathname === item.path ? 'text-gold' : 'text-slate-500'}`} />
                {isSidebarOpen && <span className="text-sm font-semibold">{item.name}</span>}
              </Link>
            ))}

            <div className="pt-8 mb-2">
              <div className="text-[10px] uppercase tracking-widest text-slate-500 mb-2 px-2 font-bold">{t('directories')}</div>
              <div className="space-y-1">
                {COUNTRIES.map((country) => (
                  <Link
                    key={country.id}
                    to={country.path}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                      location.pathname.startsWith(country.path) ? 'sidebar-link-active' : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-100'
                    }`}
                  >
                    <MapPin className={`w-5 h-5 flex-shrink-0 ${location.pathname.startsWith(country.path) ? 'text-gold' : 'text-slate-500'}`} />
                    {isSidebarOpen && <span className="text-sm font-semibold">{country.name}</span>}
                  </Link>
                ))}
              </div>
            </div>
          </nav>

          <div className="mt-auto p-4 flex flex-col gap-4">
            <button 
              onClick={toggleSidebar}
              className="p-2 text-slate-500 hover:text-gold transition-colors flex items-center justify-center bg-slate-800/30 rounded-lg hover:bg-slate-800/60"
            >
              <ChevronRight className={`w-5 h-5 transition-transform ${isSidebarOpen ? 'rotate-180' : ''}`} />
            </button>
            {isSidebarOpen && (
              <div className="text-[10px] text-slate-500 font-mono text-center border-t border-slate-800 pt-4">
                v2.4.1 Regional Build
              </div>
            )}
          </div>
        </aside>

        {/* Mobile Navigation Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={toggleMobileMenu}
                className="fixed inset-0 bg-black/80 backdrop-blur-md z-40 lg:hidden"
              />
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                className="fixed inset-y-0 left-0 w-80 bg-slate-sidebar z-50 lg:hidden p-6 overflow-y-auto border-r border-slate-800"
              >
                <div className="flex items-center justify-between mb-10">
                  <Logo />
                  <button onClick={toggleMobileMenu} className="text-slate-400 p-2 hover:bg-slate-800 rounded-lg">
                    <X />
                  </button>
                </div>
                <div className="space-y-8">
                  <div className="space-y-1">
                    <div className="text-[10px] uppercase tracking-widest text-slate-500 mb-3 px-2 font-bold">{t('navigation')}</div>
                    {navItems.map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={toggleMobileMenu}
                        className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${
                          location.pathname === item.path ? 'sidebar-link-active' : 'text-slate-400 hover:bg-slate-800/50'
                        }`}
                      >
                        <item.icon className="w-5 h-5" />
                        <span className="font-bold">{item.name}</span>
                      </Link>
                    ))}
                  </div>

                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-slate-500 mb-3 px-2 font-bold">{t('directories')}</div>
                    <div className="grid grid-cols-1 gap-1">
                      {COUNTRIES.map((country) => (
                        <Link
                          key={country.id}
                          to={country.path}
                          onClick={toggleMobileMenu}
                          className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${
                            location.pathname.startsWith(country.path) ? 'sidebar-link-active' : 'text-slate-400 hover:bg-slate-800/50'
                          }`}
                        >
                          <MapPin className="w-5 h-5" />
                          <span className="font-bold">{country.name}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Main Content Area */}
        <main className="flex-1 w-full relative flex flex-col h-full bg-gradient-to-br from-[#020617] to-[#0a101f] overflow-y-auto">
          {/* Top Search Bar (Desktop) */}
          <div className="hidden lg:flex items-center justify-between p-6 sticky top-0 z-30 bg-[#020617]/80 backdrop-blur-xl border-b border-slate-800/50">
            <div className="max-w-2xl w-full relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
              <input 
                type="text" 
                placeholder={t('searchPlaceholder')} 
                className="w-full bg-slate-900/50 border border-slate-800 rounded-xl py-3 pl-12 pr-12 text-sm focus:outline-none focus:border-gold transition-all text-white placeholder-slate-500 shadow-inner"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 hidden md:block">
                <span className="bg-slate-800 text-[10px] px-2 py-1 rounded border border-slate-700 text-slate-500 uppercase tracking-tighter">⌘ K</span>
              </div>
            </div>
            <div className="flex items-center gap-6">
              {/* Language Toggle */}
              <button 
                onClick={() => setLanguage(language === 'en' ? 'te' : 'en')}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-800 bg-slate-900/50 hover:border-gold/50 transition-all group"
              >
                <Languages className="w-4 h-4 text-slate-500 group-hover:text-gold" />
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-100 italic">
                  {language === 'en' ? 'తెలుగు' : 'English'}
                </span>
              </button>

              <div className="text-right">
                <p className="text-[10px] text-slate-500 uppercase font-black tracking-tighter">System Status</p>
                <div className="flex items-center gap-1.5 justify-end">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]" />
                  <p className="text-[11px] font-black text-emerald-500 uppercase">Optimized</p>
                </div>
              </div>
              <div className="w-10 h-10 rounded-full border-2 border-gold flex items-center justify-center bg-slate-800 shadow-[0_0_15px_rgba(212,175,55,0.2)]">
                <span className="text-xs font-black text-gold">AI</span>
              </div>
            </div>
          </div>

          <div className="flex-1 w-full">
            <div className="max-w-7xl mx-auto p-4 lg:p-8">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

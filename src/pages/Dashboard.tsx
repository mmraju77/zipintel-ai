import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MonetizationNodes } from '../components/MonetizationNodes';

export default function Dashboard() {
  // Mock Data for User History & Saved Items
  const [savedCodes] = useState([
    { id: 1, country: 'IN', code: '530001', label: 'IFSC: SBIN00530001', date: '2026-05-21' },
    { id: 2, country: 'US', code: '90210', label: 'ABA: 902101', date: '2026-05-20' },
    { id: 3, country: 'GB', code: 'EC1A', label: 'Sort Code: 20-45-EC', date: '2026-05-18' },
  ]);

  const [recentActivity] = useState([
    { id: 1, tool: 'QR Code Generator', status: 'Success', time: '2 hours ago' },
    { id: 2, tool: 'JSON Formatter & Lint', status: 'Success', time: '5 hours ago' },
    { id: 3, tool: 'SaaS ROI Calculator', status: 'Compiled', time: '1 day ago' },
  ]);

  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-300 p-6 font-sans">
      {/* Dashboard Top Header */}
      <div className="max-w-6xl mx-auto flex flex-wrap justify-between items-center gap-4 mb-8 border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <span className="text-blue-500">📊</span> Workspace Dashboard
          </h1>
          <p className="text-xs text-slate-400 mt-1">Welcome back, Developer Node. Monitor your saved global matrices and API credits.</p>
        </div>
        <div className="flex gap-3">
          <Link to="/" className="px-3.5 py-2 bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs font-bold uppercase rounded-lg transition-colors shadow-md">
            + New Operation
          </Link>
        </div>
      </div>

      {/* Metrics Row Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
        <div className="p-4 bg-slate-900/50 border border-slate-800 rounded-xl">
          <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block">API Credits Used</span>
          <span className="text-2xl font-bold font-mono text-white mt-1 block">42 / 1,000</span>
          <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
            <div className="bg-blue-500 h-full rounded-full" style={{ width: '4.2%' }}></div>
          </div>
        </div>
        <div className="p-4 bg-slate-900/50 border border-slate-800 rounded-xl">
          <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block">Saved Node Locations</span>
          <span className="text-2xl font-bold font-mono text-emerald-400 mt-1 block">{savedCodes.length} Units</span>
        </div>
        <div className="p-4 bg-slate-900/50 border border-slate-800 rounded-xl">
          <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block">Account Status</span>
          <span className="text-sm font-mono text-blue-400 font-bold bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 rounded inline-block mt-2">
            Enterprise Sandbox
          </span>
        </div>
      </div>

      {/* Main Content Layout Block */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6">
        
        {/* Left Column: Saved Financial Codes Directory */}
        <div className="p-5 bg-slate-900/40 border border-slate-800 rounded-xl">
          <h3 className="text-sm font-bold uppercase font-mono tracking-wider text-slate-400 mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span> Saved Routing Matrices
          </h3>
          <div className="space-y-3">
            {savedCodes.map((item) => (
              <div key={item.id} className="p-3 bg-slate-950 border border-slate-800/80 rounded-lg flex items-center justify-between hover:border-slate-700 transition-colors">
                <div>
                  <span className="text-xs font-mono font-bold bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded mr-2 uppercase">
                    {item.country}
                  </span>
                  <span className="text-sm font-mono font-semibold text-white">{item.code}</span>
                  <span className="block text-xs text-slate-500 mt-1">{item.label}</span>
                </div>
                <span className="text-[10px] font-mono text-slate-600">{item.date}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Recent Utility Activity Log */}
        <div className="p-5 bg-slate-900/40 border border-slate-800 rounded-xl">
          <h3 className="text-sm font-bold uppercase font-mono tracking-wider text-slate-400 mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-400"></span> Recent System Logs
          </h3>
          <div className="space-y-3">
            {recentActivity.map((log) => (
              <div key={log.id} className="p-3 bg-slate-950 border border-slate-800/80 rounded-lg flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                  <span className="font-mono text-slate-300">{log.tool}</span>
                </div>
                <div className="text-right">
                  <span className="text-emerald-400 font-mono bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/10">
                    {log.status}
                  </span>
                  <span className="block text-[10px] text-slate-600 mt-1 font-mono">{log.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      <div className="max-w-6xl mx-auto mt-8">
        <MonetizationNodes zone="bottom" />
      </div>
    </div>
  );
}

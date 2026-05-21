import React, { useState } from 'react';

type TabType = 'qr' | 'json' | 'csv' | 'roi';

export const UtilityHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('qr');
  const [qrText, setQrText] = useState('https://www.zipintel-ai.com');
  const [jsonText, setJsonText] = useState('{"status": "success", "module": "IFSC Routing Engine", "nodeCount": 17}');
  const [formattedJson, setFormattedJson] = useState('');
  const [csvText, setCsvText] = useState("State,IFSC_Prefix,Status\nAndhra Pradesh,SBIN00,ACTIVE\nCalifornia,ABA121,ACTIVE");
  const [roiAmount, setRoiAmount] = useState(5000);

  // JSON Formatter Logic
  const handleFormatJson = () => {
    try {
      const parsed = JSON.parse(jsonText);
      setFormattedJson(JSON.stringify(parsed, null, 2));
    } catch (e) {
      setFormattedJson('Invalid JSON Format! Please check your syntax.');
    }
  };

  // CSV to Table Parser Logic
  const renderCsvTable = () => {
    const rows = csvText.split('\n').filter(row => row.trim() !== '');
    if (rows.length === 0) return null;
    const headers = rows[0].split(',');
    const dataRows = rows.slice(1);

    return (
      <div className="overflow-x-auto rounded-lg border border-slate-700 bg-slate-950 mt-3">
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="bg-slate-800 text-slate-300 font-mono border-b border-slate-700">
              {headers.map((h, i) => <th key={i} className="p-2.5 font-bold uppercase tracking-wider">{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {dataRows.map((row, rowIndex) => (
              <tr key={rowIndex} className="border-b border-slate-800 text-slate-400 hover:bg-slate-900/50">
                {row.split(',').map((cell, cellIndex) => <td key={cellIndex} className="p-2.5 font-mono">{cell}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="mt-12 p-6 bg-slate-900/60 border border-slate-800 rounded-2xl max-w-6xl mx-auto shadow-zipGlow">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
          <span className="text-blue-500">⚡</span> Core AI & Utility Tools Hub
        </h2>
        <p className="text-slate-400 text-sm mt-1">Free instant developer utilities and automated local clearing simulators.</p>
      </div>

      {/* Tabs Navigation */}
      <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3 mb-6">
        {(['qr', 'json', 'csv', 'roi'] as TabType[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg font-mono text-xs uppercase tracking-wider font-semibold border transition-all ${
              activeTab === tab
                ? 'bg-blue-600/15 border-blue-500 text-blue-400 shadow-[0_0_15px_rgba(37,99,235,0.1)]'
                : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
            }`}
          >
            {tab === 'qr' && 'QR Generator'}
            {tab === 'json' && 'JSON Formatter'}
            {tab === 'csv' && 'CSV Grid Preview'}
            {tab === 'roi' && 'SaaS ROI Metrics'}
          </button>
        ))}
      </div>

      {/* Dynamic Tab Content */}
      <div className="bg-slate-950/40 p-4 rounded-xl border border-slate-800/80 min-h-[250px]">
        {activeTab === 'qr' && (
          <div className="grid md:grid-cols-2 gap-6 items-center">
            <div className="space-y-3">
              <label className="text-xs font-mono uppercase tracking-widest text-slate-500">Target URL or Text</label>
              <input
                type="text"
                value={qrText}
                onChange={(e) => setQrText(e.target.value)}
                className="w-full p-3 bg-slate-950 border border-slate-800 rounded-lg text-white font-mono text-sm focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="flex flex-col items-center justify-center p-4 bg-slate-950 border border-slate-800 rounded-xl max-w-[220px] mx-auto">
              {/* Clean Geometric Mock QR Generator Structure */}
              <div className="w-32 h-32 bg-white p-2 rounded flex flex-wrap gap-1 items-center justify-center relative shadow-md">
                <div className="absolute inset-2 border-4 border-slate-900 flex flex-wrap p-1 gap-1">
                  <div className="w-5 h-5 bg-slate-900"></div>
                  <div className="w-5 h-5 bg-transparent ml-auto"></div>
                  <div className="w-5 h-5 bg-slate-900 mt-auto"></div>
                  <div className="w-5 h-5 bg-slate-900 mt-auto ml-auto"></div>
                </div>
                <div className="w-2 h-2 bg-slate-900 z-10"></div>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 mt-3 animate-pulse">✓ Ready for Dynamic Download</span>
            </div>
          </div>
        )}

        {activeTab === 'json' && (
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-mono uppercase tracking-widest text-slate-500 block mb-2">Raw JSON Input</label>
                <textarea
                  value={jsonText}
                  onChange={(e) => setJsonText(e.target.value)}
                  className="w-full h-40 p-3 bg-slate-950 border border-slate-800 rounded-lg text-white font-mono text-xs focus:outline-none focus:border-blue-500 resize-none"
                />
              </div>
              <div>
                <label className="text-xs font-mono uppercase tracking-widest text-slate-500 block mb-2">Formatted Output</label>
                <pre className="w-full h-40 p-3 bg-slate-900 border border-slate-800 rounded-lg text-emerald-400 font-mono text-xs overflow-y-auto whitespace-pre-wrap">
                  {formattedJson || '// Click format button to trigger clean syntax verification.'}
                </pre>
              </div>
            </div>
            <button
              onClick={handleFormatJson}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs uppercase tracking-wider font-bold rounded-lg transition-colors"
            >
              Parse & Format Lint
            </button>
          </div>
        )}

        {activeTab === 'csv' && (
          <div className="space-y-3">
            <label className="text-xs font-mono uppercase tracking-widest text-slate-500 block">Comma Separated Values (CSV Input)</label>
            <textarea
              value={csvText}
              onChange={(e) => setCsvText(e.target.value)}
              className="w-full h-24 p-3 bg-slate-950 border border-slate-800 rounded-lg text-white font-mono text-xs focus:outline-none focus:border-blue-500"
            />
            {renderCsvTable()}
          </div>
        )}

        {activeTab === 'roi' && (
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono uppercase tracking-wider text-slate-400">
                <span>Monthly Enterprise Audit Target:</span>
                <span className="text-blue-400 font-bold">${roiAmount} / mo</span>
              </div>
              <input
                type="range"
                min="1000"
                max="50000"
                step="1000"
                value={roiAmount}
                onChange={(e) => setRoiAmount(Number(e.target.value))}
                className="w-full accent-blue-500 cursor-pointer bg-slate-800 h-2 rounded-lg"
              />
            </div>
            <div className="grid sm:grid-cols-3 gap-4 text-center">
              <div className="p-3 bg-slate-950 border border-slate-800/80 rounded-xl">
                <span className="text-[10px] uppercase font-mono tracking-widest text-slate-500 block">Manual Process Cost</span>
                <span className="text-lg font-bold text-rose-400 font-mono">${(roiAmount * 1.4).toFixed(0)}</span>
              </div>
              <div className="p-3 bg-slate-950 border border-slate-800/80 rounded-xl ring-1 ring-emerald-500/30">
                <span className="text-[10px] uppercase font-mono tracking-widest text-slate-500 block">ZipIntel Automated Cost</span>
                <span className="text-lg font-bold text-emerald-400 font-mono">${(roiAmount * 0.15).toFixed(0)}</span>
              </div>
              <div className="p-3 bg-slate-950 border border-slate-800/80 rounded-xl bg-blue-950/20">
                <span className="text-[10px] uppercase font-mono tracking-widest text-slate-500 block">Net Monthly Savings Moat</span>
                <span className="text-lg font-bold text-blue-400 font-mono">${(roiAmount * 1.25).toFixed(0)}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

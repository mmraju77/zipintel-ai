import React from 'react';
import { FileText, Download, Printer } from 'lucide-react';

interface PDFReportProps {
  zipCode?: string;
  region?: string;
  countryCode?: string;
}

export const PDFReport: React.FC<PDFReportProps> = ({ zipCode, region, countryCode }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex justify-end no-print">
      <button
        onClick={handlePrint}
        className="flex items-center gap-2 px-5 py-2.5 bg-[#deff9a] hover:bg-[#c9f57d] text-midnight rounded-xl font-black text-[11px] uppercase tracking-widest transition-all active:scale-95 shadow-lg shadow-[#deff9a]/10 group"
      >
        <FileText className="w-4 h-4 text-midnight group-hover:scale-110 transition-transform" />
        Export Audit Report
        <Download className="w-3.5 h-3.5 opacity-50" />
      </button>
    </div>
  );
};

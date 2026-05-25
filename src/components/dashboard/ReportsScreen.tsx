/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  FileText, 
  Download, 
  Sparkles, 
  Cpu, 
  TrendingUp, 
  CheckCircle2, 
  Layers,
  ArrowRight
} from 'lucide-react';

export default function ReportsScreen() {
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const reports = [
    { id: 'REP-01', title: 'Q2 Premium Vendor Efficiency Analysis', format: 'PDF', size: '2.4 MB', date: 'May 20, 2026', desc: 'Detailed response latencies and conversion rates compiled across Synapse, NextGen and Pacific agencies.' },
    { id: 'REP-02', title: 'Talent Bench Sourcing Projection Dossier', format: 'XLSX', size: '1.8 MB', date: 'May 14, 2026', desc: 'Predictive modeling analytics forecasting available hotlist bench skills over the upcoming 90 days.' },
    { id: 'REP-03', title: 'Recruitment Agency Clearance Audit', format: 'CSV', size: '840 KB', date: 'May 08, 2026', desc: 'Aggregated submissions, interviews, and successful closures checked for compliance against SLA parameters.' }
  ];

  const handleDownloadReport = (repId: string) => {
    setDownloadingId(repId);
    setTimeout(() => {
      setDownloadingId(null);
      alert("Report downloaded successfully. System verification token cached.");
    }, 1200);
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* Title */}
      <div>
        <h2 className="text-xl font-display font-bold text-slate-900">Synthesized Management Reports</h2>
        <p className="text-slate-400 text-xs text-xs">Verify regulatory SLA compliance logs, extract conversion trends, and download XLS/PDF reports instantly</p>
      </div>

      {/* Reports panel list */}
      <div className="bg-white rounded-2xl border border-slate-200/60 p-4 shadow-sm space-y-4">
        <span className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-widest block">Available Download Logs</span>

        <div className="space-y-3">
          {reports.map((rep) => (
            <div 
              key={rep.id} 
              className="p-4 border border-slate-200 rounded-xl hover:shadow-xs hover:border-indigo-120 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-[9.5px] font-mono text-slate-400">
                  <span>{rep.id}</span>
                  <span className="w-1 h-1 rounded-full bg-slate-200" />
                  <span>{rep.date}</span>
                </div>
                <strong className="text-xs font-display text-slate-950 font-bold block">{rep.title}</strong>
                <p className="text-slate-500 text-[11px] font-sans pr-4 leading-normal">
                  {rep.desc}
                </p>
              </div>

              <div className="flex items-center gap-4 shrink-0 font-mono text-[10.5px]">
                <div className="text-right hidden sm:block leading-tight text-slate-400">
                  <strong>{rep.format} FILE</strong>
                  <span className="block text-[9.5px] font-light mt-0.5">{rep.size}</span>
                </div>

                <button
                  onClick={() => handleDownloadReport(rep.id)}
                  disabled={downloadingId !== null}
                  className="px-3 py-2 bg-indigo-600 hover:bg-slate-900 text-white rounded-lg text-xs font-bold uppercase cursor-pointer flex items-center gap-1.5 shadow-sm whitespace-nowrap transition-colors"
                >
                  <Download className={`h-3.5 w-3.5 ${downloadingId === rep.id ? 'animate-bounce' : ''}`} />
                  <span>{downloadingId === rep.id ? 'Processing...' : 'Download File'}</span>
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>

    </div>
  );
}

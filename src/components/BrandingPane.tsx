/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Users, Cpu, Activity, ShieldCheck, Zap, Layers, RefreshCw } from 'lucide-react';

interface MetricNode {
  id: number;
  label: string;
  value: string;
  change: string;
}

const METRICS: MetricNode[] = [
  { id: 1, label: "Daily Match Engine", value: "98.4%", change: "+2.1%" },
  { id: 2, label: "Active Job Gigs", value: "24 Live", change: "+4 today" },
  { id: 3, label: "Sourced profiles", value: "14.2K", change: "+1.3K today" },
];

const AI_INSIGHTS = [
  "Matched applicant Alex Reid to Senior React Specialist position with 98.7% accuracy index.",
  "AI parser extracted and summarized 412 PDF resumes in 3.1 seconds.",
  "Hot-list calendar synchronized across Tier-1 vendors with +45% placement velocity.",
  "Recruitment pipeline scored at optimal efficiency metrics: 0 blockages pending."
];

interface CandidateItem {
  name: string;
  role: string;
  avatarBg: string;
  progress: number;
  status: string;
  statusBg: string;
  statusColor: string;
}

const MOCK_CANDIDATES: CandidateItem[] = [
  { name: 'Alex Reid', role: 'Staffing Lead', avatarBg: 'bg-[#5B5BD6] text-white', progress: 98, status: '98.7% MATCH', statusBg: 'bg-[#5B5BD6]/10 border-[#5B5BD6]/20', statusColor: 'text-[#5B5BD6]' },
  { name: 'Marcus Chen', role: 'Solutions Architect', avatarBg: 'bg-[#7B61FF] text-white', progress: 75, status: 'SOURCED', statusBg: 'bg-slate-100 border-slate-200', statusColor: 'text-slate-650' },
  { name: 'Sarah Jenkins', role: 'Full-Stack Lead', avatarBg: 'bg-[#4F8CFF] text-white', progress: 92, status: 'INTERVIEW', statusBg: 'bg-[#4F8CFF]/10 border-[#4F8CFF]/20', statusColor: 'text-[#4F8CFF]' }
];

export default function BrandingPane() {
  const [insightIndex, setInsightIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setInsightIndex((prev) => (prev + 1) % AI_INSIGHTS.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-full w-full bg-[#F7F8FC] p-6 lg:p-10 flex flex-col justify-between overflow-hidden min-h-[500px]" id="branding-container">
      
      {/* Background radial highlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(ellipse_at_center,rgba(91,91,214,0.08)_0%,transparent_70%)] pointer-events-none" />

      {/* Floating active status tag */}
      <motion.div 
        initial={{ y: -15, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="absolute top-8 right-8 z-30 bg-[#5B5BD6] text-white font-sans text-[10px] font-semibold px-3 py-1.5 rounded-full border border-[#5B5BD6]/20 shadow-md flex items-center gap-2 select-none"
      >
        <Sparkles className="h-3.5 w-3.5 text-white animate-spin" style={{ animationDuration: '4s' }} />
        <span>Matching Candidates Live</span>
      </motion.div>

      {/* Visual background grids */}
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />

      {/* Platform Branding header */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-2.5 w-2.5 rounded-full bg-[#5B5BD6]" />
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">BENMYL PREVIEW UNIT</span>
        </div>
      </div>

      {/* Active Dashboard Mockup Screen - ClickUp / Teams inspired */}
      <div className="relative z-20 my-auto py-4 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, type: 'spring' }}
          className="w-full max-w-[420px] bg-white rounded-2xl border border-slate-200/60 shadow-[0_30px_60px_-15px_rgba(91,91,214,0.06)] p-5 space-y-4 select-none relative"
        >
          {/* Mock Browser/Teams control dots */}
          <div className="flex items-center gap-1.5 border-b border-slate-100 pb-3">
            <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
            <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
            <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
            <span className="ml-2 font-sans text-[10px] text-slate-400 font-semibold tracking-wide">BenMyl Collaboration Hub</span>
          </div>

          {/* Active Candidate Progress Rows */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">Neural Pipeline Feed</span>
              <Activity className="h-4 w-4 text-[#5B5BD6] animate-pulse" />
            </div>

            {MOCK_CANDIDATES.map((cand) => (
              <div key={cand.name} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0 gap-3">
                <div className="flex items-center gap-2.5">
                  <div className={`h-8 w-8 rounded-full ${cand.avatarBg} flex items-center justify-center font-sans font-bold text-xs tracking-tight shadow-sm shrink-0`}>
                    {cand.name.split(' ').map(n=>n[0]).join('')}
                  </div>
                  <div>
                    <h5 className="font-sans font-bold text-xs text-slate-900 leading-tight">{cand.name}</h5>
                    <p className="text-[10px] text-slate-400 font-medium">{cand.role}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 shrink-0">
                  <div className="w-12 h-1 bg-slate-100 rounded-full overflow-hidden hidden sm:block">
                    <div className="h-full bg-gradient-to-r from-[#5B5BD6] to-[#7B61FF] rounded-full" style={{ width: `${cand.progress}%` }} />
                  </div>
                  <span className={`text-[9px] font-black border rounded px-2 py-0.5 tracking-wide font-mono ${cand.statusBg} ${cand.statusColor}`}>
                    {cand.status}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* AI insights dynamic ticker */}
          <div className="bg-[#5B5BD6]/5 border border-[#5B5BD6]/10 rounded-xl p-3.5 space-y-1.5">
            <div className="flex items-center justify-between text-[9px] text-[#5B5BD6] font-mono font-bold">
              <span className="flex items-center gap-1.5">
                <Cpu className="h-3.5 w-3.5 animate-spin text-[#5B5BD6]" style={{ animationDuration: '6s' }} />
                <span>INTELLIGENT INSIGHTS</span>
              </span>
              <span>LIVE AI STREAM</span>
            </div>

            <div className="h-10 flex flex-col justify-center">
              <AnimatePresence mode="wait">
                <motion.p
                  key={insightIndex}
                  initial={{ opacity: 0, x: 5 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -5 }}
                  transition={{ duration: 0.3 }}
                  className="font-sans text-[11px] text-slate-650 leading-normal font-medium"
                >
                  {AI_INSIGHTS[insightIndex]}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Footer statistics pills */}
      <div className="relative z-10 grid grid-cols-3 gap-2.5 pt-4">
        {METRICS.map((met) => (
          <div key={met.id} className="bg-white border border-slate-200/60 rounded-xl p-3 shadow-xs flex flex-col justify-between">
            <span className="text-[9px] text-slate-400 font-sans font-bold uppercase tracking-wider block leading-tight">{met.label}</span>
            <div className="flex items-baseline justify-between mt-1">
              <span className="font-sans font-extrabold text-[15px] text-slate-800 leading-none">{met.value}</span>
              <span className="text-[8px] font-mono text-emerald-600 bg-emerald-50 px-1 py-0.5 rounded font-bold">{met.change}</span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

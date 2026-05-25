/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  TrendingUp, 
  Layers, 
  Users, 
  Cpu, 
  ArrowUpRight, 
  Download, 
  Sparkles, 
  Activity, 
  DollarSign, 
  Calendar 
} from 'lucide-react';

export default function AnalyticsScreen() {
  const [selectedTimeline, setSelectedTimeline] = useState<'30' | '90' | '365'>('30');
  const [showProjection, setShowProjection] = useState(false);

  const conversionMetrics = [
    { label: 'CV Submission Sourcing', count: '1,489', rate: '100%', fillWidth: 'w-full', bg: 'bg-indigo-650' },
    { label: 'AI Match Approved', count: '982', rate: '65.9%', fillWidth: 'w-2/3', bg: 'bg-indigo-500' },
    { label: 'Client Technical Interview', count: '310', rate: '20.8%', fillWidth: 'w-[20%]', bg: 'bg-indigo-400' },
    { label: 'Offers Released', count: '48', rate: '3.2%', fillWidth: 'w-[4%]', bg: 'bg-emerald-500' }
  ];

  return (
    <div className="space-y-6 pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-display font-bold text-slate-900">Workspace Analytic Intelligence</h2>
          <p className="text-slate-400 text-xs">Dynamic hiring conversion ratios, revenue indexes, and future intelligence forecasts</p>
        </div>

        {/* Timeline controls */}
        <div className="flex bg-slate-100 p-0.5 rounded-lg border border-slate-200 self-start sm:self-auto text-xs">
          <button 
            onClick={() => setSelectedTimeline('30')}
            className={`px-3 py-1.5 font-semibold rounded-md transition-all cursor-pointer ${
              selectedTimeline === '30' ? 'bg-white text-slate-950 shadow-xs' : 'text-slate-450 hover:text-slate-800'
            }`}
          >
            30 Days
          </button>
          <button 
            onClick={() => setSelectedTimeline('90')}
            className={`px-3 py-1.5 font-semibold rounded-md transition-all cursor-pointer ${
              selectedTimeline === '90' ? 'bg-white text-slate-950 shadow-xs' : 'text-slate-450 hover:text-slate-800'
            }`}
          >
            90 Days
          </button>
          <button 
            onClick={() => setSelectedTimeline('365')}
            className={`px-3 py-1.5 font-semibold rounded-md transition-all cursor-pointer ${
              selectedTimeline === '365' ? 'bg-white text-slate-950 shadow-xs' : 'text-slate-450 hover:text-slate-800'
            }`}
          >
            1 Year
          </button>
        </div>
      </div>

      {/* Grid of analytic stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl border border-slate-200/60 p-4 shadow-sm space-y-2">
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block font-bold">Q2 Revenue Growth</span>
          <div className="flex items-baseline justify-between">
            <h3 className="text-xl font-display font-bold text-slate-900">$248.5K</h3>
            <span className="text-xs font-mono font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">+18.4%</span>
          </div>
          <p className="text-[10px] text-slate-400 font-sans">Projected to score $340k Q2 overall</p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/60 p-4 shadow-sm space-y-2">
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block font-bold">Conversion Velocity index</span>
          <div className="flex items-baseline justify-between">
            <h3 className="text-xl font-display font-bold text-slate-900">11.4 Days</h3>
            <span className="text-xs font-mono font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">-1.5 Days</span>
          </div>
          <p className="text-[10px] text-slate-400 font-sans">Reduced bottleneck latency metrics</p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/60 p-4 shadow-sm space-y-2">
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block font-bold">CV Match Accuracy index</span>
          <div className="flex items-baseline justify-between">
            <h3 className="text-xl font-display font-bold text-slate-900">98.4%</h3>
            <span className="text-xs font-mono font-bold text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded">+0.4%</span>
          </div>
          <p className="text-[10px] text-indigo-500 font-sans">AI score validation alignment optimal</p>
        </div>
      </div>

      {/* Analytics Visual split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 relative items-stretch">
        
        {/* Interactive Charts Left Column (Col: 7) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/60 shadow-sm p-5 space-y-4 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-display font-bold text-xs text-slate-950">Recruiter Sourcing Trends</h3>
              <p className="text-[11px] text-slate-400">Total volume of active applicant streams mapped daily</p>
            </div>

            <button 
              onClick={() => setShowProjection(!showProjection)}
              className="px-2.5 py-1 text-[10px] font-mono font-bold border rounded bg-slate-50 hover:bg-indigo-50 text-slate-600 hover:text-indigo-650 transition-all cursor-pointer whitespace-nowrap"
            >
              {showProjection ? 'Hide AI Forecast' : 'Toggle AI Forecast'}
            </button>
          </div>

          {/* SVG Trends chart */}
          <div className="h-64 relative bg-slate-50/50 rounded-xl border border-slate-100 flex items-center justify-center p-2">
            <svg className="w-full h-full" viewBox="0 0 500 200" preserveAspectRatio="none">
              <defs>
                <linearGradient id="anGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#4c49d8" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#4c49d8" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="forcGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ff4e00" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="#ff4e00" stopOpacity="0" />
                </linearGradient>
              </defs>

              <line x1="0" y1="50" x2="500" y2="50" stroke="#f1f5f9" strokeWidth="1" />
              <line x1="0" y1="100" x2="500" y2="100" stroke="#f1f5f9" strokeWidth="1" />
              <line x1="0" y1="150" x2="500" y2="150" stroke="#f1f5f9" strokeWidth="1" />

              {/* Data path */}
              <path d="M 0,160 Q 100,100 200,130 T 400,60 L 500,80 L 500,200 L 0,200 Z" fill="url(#anGrad)" />
              <path d="M 0,160 Q 100,100 200,130 T 400,60" fill="none" stroke="#4c49d8" strokeWidth="3" />

              {/* Forecast path */}
              {showProjection && (
                <>
                  <path d="M 400,60 L 500,25" fill="none" stroke="#ff4e00" strokeWidth="2.5" strokeDasharray="4 4" />
                  <circle cx="500" cy="25" r="4.5" fill="#ff4e00" stroke="#ffffff" strokeWidth="1.5" />
                  <text x="390" y="45" fill="#ff4e00" fontSize="9.5" fontWeight="bold" fontFamily="monospace">FORECAST MATCHES +42%</text>
                </>
              )}

              <circle cx="400" cy="60" r="5" fill="#4c49d8" stroke="#ffffff" strokeWidth="2" />
            </svg>

            {/* Bottom dates */}
            <div className="absolute bottom-2 inset-x-4 flex justify-between text-[10px] font-mono text-slate-400">
              <span>WK 19</span>
              <span>WK 20</span>
              <span>WK 21 (CURRENT)</span>
              <span>WK 22 (PROJECTION)</span>
            </div>
          </div>
        </div>

        {/* Funnel conversion Right Column (Col: 5) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200/60 shadow-sm p-5 space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="font-display font-bold text-xs text-slate-950">Submission Conversion Funnel</h3>
            <p className="text-[11px] text-slate-400">Track candidates dropping latency from sourcing to offer release</p>
          </div>

          <div className="space-y-3">
            {conversionMetrics.map((met, index) => (
              <div key={index} className="space-y-1">
                <div className="flex items-center justify-between text-xs text-slate-700">
                  <span className="font-medium text-[11px] font-sans">{met.label}</span>
                  <span className="font-mono text-[9.5px] text-slate-400">{met.count} ({met.rate})</span>
                </div>
                <div className="w-full h-2 bg-slate-50 border border-slate-100 rounded-full overflow-hidden">
                  <div className={`h-full ${met.bg} rounded-full`} style={{ width: met.rate }} />
                </div>
              </div>
            ))}
          </div>

          <div className="bg-slate-50 p-3 rounded-xl border border-slate-150 flex items-center justify-between text-xs text-slate-655 font-sans">
            <span className="flex items-center gap-1.5">
              <Cpu className="h-4 w-4 text-indigo-500" />
              <span>Diagnostic predictions verified</span>
            </span>
            <button className="px-3 py-1 bg-slate-900 text-white rounded text-[10px] font-mono font-bold uppercase cursor-pointer">
              Export report
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  CreditCard, 
  CheckCircle, 
  CheckCircle2, 
  Cpu, 
  Layers, 
  TrendingUp, 
  Sparkles, 
  ArrowUpRight 
} from 'lucide-react';

export default function BillingScreen() {
  const [activeTier, setActiveTier] = useState<'Enterprise' | 'Startup'>('Enterprise');

  const plans = [
    { name: 'Core Startup', price: '$299/mo', desc: 'Accelerated sourcing limits suitable for growing operations.', features: ['Up to 10 active recruiters', '5,000 parsed resumes monthly', 'Prime vendor directory alignment'] },
    { name: 'Premium Enterprise', price: '$899/mo', desc: 'Complete autonomous talent operations with full matrix mappings.', features: ['Unlimited recruiters & bench', '50,000 parsed resumes monthly', 'Dynamic AI-Match broadcast pipelines', 'Priority 24/7 SLA Oracle support'] }
  ];

  const usageMeters = [
    { title: 'Parsed Resume Operations', value: '14,204 Usage', max: '50,000 Monthly limit', rate: '28.4%' },
    { title: 'Prime Vendor Broadcast Syncs', value: '842 Broadcasts', max: '2,500 Monthly limit', rate: '33.6%' }
  ];

  return (
    <div className="space-y-6 pb-12">
      
      {/* Title */}
      <div>
        <h2 className="text-xl font-display font-bold text-slate-900">Workspace Billing & Plan Management</h2>
        <p className="text-slate-400 text-xs text-xs">Verify active subscription parameters, audit usage thresholds, and upgrade team administrative seat caps</p>
      </div>

      {/* Usage Analytics row */}
      <div className="bg-white rounded-2xl border border-slate-200/60 p-4 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <span className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-widest block">Active Seat Allotments</span>
          <h3 className="text-lg font-display font-bold text-slate-950 mt-1">Enterprise Sourcing Hub plan</h3>
          <p className="text-xs text-slate-450 mt-0.5">Renews automatically on June 14, 2026. Charged to credit card ending in **4019.</p>
        </div>

        <div className="space-y-3.5">
          {usageMeters.map((met, index) => (
            <div key={index} className="space-y-1">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-slate-700">{met.title}</span>
                <span className="font-mono text-[10px] text-slate-400">{met.value} / {met.max}</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-650 rounded-full" style={{ width: met.rate }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Plans comparison list */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {plans.map((p, index) => (
          <div 
            key={index} 
            onClick={() => p.name.includes('Premium') ? setActiveTier('Enterprise') : setActiveTier('Startup')}
            className={`p-5 rounded-2xl border transition-all cursor-pointer space-y-4 flex flex-col justify-between ${
              (p.name.includes('Premium') && activeTier === 'Enterprise') || (p.name.includes('Startup') && activeTier === 'Startup')
                ? 'border-indigo-600 bg-indigo-50/5 shadow-md scale-[1.01]' 
                : 'border-slate-205 bg-white hover:border-slate-300'
            }`}
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <strong className="text-sm font-display text-slate-900 font-bold">{p.name}</strong>
                <span className="text-lg font-display font-extrabold text-indigo-705">{p.price}</span>
              </div>
              <p className="text-xs text-slate-450 leading-relaxed">
                {p.desc}
              </p>
            </div>

            <div className="border-t border-slate-100 pt-3.5 space-y-2 text-xs">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block font-bold">Included features</span>
              <ul className="space-y-1.5 pl-0 text-[11px] text-slate-650">
                {p.features.map((feat, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              type="button"
              className={`w-full py-2.5 rounded-xl text-xs font-bold uppercase font-mono mt-4 transition-all ${
                (p.name.includes('Premium') && activeTier === 'Enterprise') || (p.name.includes('Startup') && activeTier === 'Startup')
                  ? 'bg-slate-900 text-white shadow-xs cursor-default'
                  : 'bg-indigo-50 hover:bg-indigo-100 text-indigo-650'
              }`}
            >
              {(p.name.includes('Premium') && activeTier === 'Enterprise') || (p.name.includes('Startup') && activeTier === 'Startup')
                ? 'Currently Subscribed' 
                : 'Upgrade Workspace Plan'}
            </button>

          </div>
        ))}
      </div>

    </div>
  );
}

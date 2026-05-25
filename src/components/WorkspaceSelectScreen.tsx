/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, ArrowRight, Cpu, Sparkles, Command, Briefcase, Lock, ArrowLeft, Settings } from 'lucide-react';
import { AuthScreen, UserRole } from '../types';

interface WorkspaceSelectScreenProps {
  emailAddress: string;
  onSelectFlow: (role: UserRole) => void;
  onBack: () => void;
}

export default function WorkspaceSelectScreen({ emailAddress, onSelectFlow, onBack }: WorkspaceSelectScreenProps) {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-md mx-auto space-y-6"
      id="workspace-select-container"
    >
      {/* Header Banner */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-slate-700 transition-colors uppercase tracking-wider bg-transparent border-0 cursor-pointer"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Sign Out</span>
        </button>

        <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 text-[9px] font-mono tracking-widest uppercase font-bold">
          <ShieldCheck className="h-3.5 w-3.5" />
          <span>Authenticated</span>
        </div>
      </div>

      {/* Typography */}
      <div className="space-y-1.5 text-center sm:text-left">
        <h2 className="font-display text-2xl font-extrabold tracking-tight text-slate-900 leading-tight">
          Select Your <span className="bg-gradient-to-r from-[#5B5BD6] to-[#7B61FF] bg-clip-text text-transparent">Node Workspace</span>
        </h2>
        <p className="text-slate-500 text-xs leading-relaxed">
          Welcome back, <span className="text-slate-800 font-bold">{emailAddress || 'admin@benmyl.ai'}</span>. Choose which operational core workspace context you want to provision for this active session.
        </p>
      </div>

      {/* Workspace Roles Selection Cards */}
      <div className="space-y-4 pt-2">
        
        {/* ADMIN WORKSPACE (ACTIVE & SUCCESS FLOW) */}
        <motion.div
          whileHover={{ y: -3 }}
          onHoverStart={() => setHoveredCard('admin')}
          onHoverEnd={() => setHoveredCard(null)}
          onClick={() => onSelectFlow('staffing')} // staffing/admin flow is the fully completed dashboard
          className={`group relative overflow-hidden rounded-2xl border p-4 cursor-pointer transition-all ${
            hoveredCard === 'admin'
              ? 'border-[#5B5BD6] bg-[#5B5BD6]/5 shadow-lg shadow-[#5B5BD6]/5'
              : 'border-slate-200 bg-white hover:border-[#5B5BD6]/40'
          }`}
          id="select-admin-workspace"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#5B5BD6]/5 blur-2xl rounded-full" />
          
          <div className="flex gap-4 items-start relative z-10">
            {/* Icon Block */}
            <div className={`h-10 w-10 shrink-0 rounded-xl flex items-center justify-center transition-all ${
              hoveredCard === 'admin' ? 'bg-[#5B5BD6] text-white shadow-md' : 'bg-[#5B5BD6]/10 text-[#5B5BD6]'
            }`}>
              <Settings className="h-5 w-5" />
            </div>

            {/* Texts */}
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-slate-900 text-sm font-display group-hover:text-[#5B5BD6] transition-colors">
                  Enterprise Admin Hub
                </h3>
                <span className="text-[9px] font-mono font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full uppercase">
                  Active
                </span>
              </div>
              <p className="text-xs text-slate-550 leading-relaxed font-sans">
                Full programmatic control. View live placement matching grids, configure suppliers, handle contractor requirements, and audit automation pipelines.
              </p>
            </div>
          </div>

          {/* Bottom Action Hint */}
          <div className="mt-3 pt-3 border-t border-slate-100/80 flex items-center justify-end gap-1 text-[11px] font-bold text-[#5B5BD6]">
            <span>Enter Admin Dashboard</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </div>
        </motion.div>

        {/* RECRUITER WORKSPACE (ACTIVE RECRUITER COLLABORATIVE DESK) */}
        <motion.div
          whileHover={{ y: -3 }}
          onHoverStart={() => setHoveredCard('recruiter')}
          onHoverEnd={() => setHoveredCard(null)}
          onClick={() => onSelectFlow('recruiter')}
          className={`group relative overflow-hidden rounded-2xl border p-4 cursor-pointer transition-all ${
            hoveredCard === 'recruiter'
              ? 'border-[#7B61FF] bg-[#7B61FF]/5 shadow-lg shadow-[#7B61FF]/5'
              : 'border-slate-200 bg-white hover:border-[#7B61FF]/40'
          }`}
          id="select-recruiter-workspace"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#7B61FF]/5 blur-2xl rounded-full" />
          
          <div className="flex gap-4 items-start relative z-10">
            {/* Icon Block */}
            <div className={`h-10 w-10 shrink-0 rounded-xl flex items-center justify-center transition-all ${
              hoveredCard === 'recruiter' ? 'bg-[#7B61FF] text-white shadow-md' : 'bg-[#7B61FF]/10 text-[#7B61FF]'
            }`}>
              <Briefcase className="h-5 w-5" />
            </div>

            {/* Texts */}
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-slate-900 text-sm font-display group-hover:text-[#7B61FF] transition-colors">
                  Personal Recruiter Desk
                </h3>
                <span className="text-[9px] font-mono font-bold text-[#7B61FF] bg-[#7B61FF]/10 px-2 py-0.5 rounded-full uppercase">
                  Active
                </span>
              </div>
              <p className="text-xs text-slate-550 leading-relaxed font-sans font-medium">
                Collaborative staffing platform. View live candidate pipeline maps, query AI Recopilot summaries, coordinate Teams interviews, and manage contract layouts.
              </p>
            </div>
          </div>

          {/* Bottom Action Hint */}
          <div className="mt-3 pt-3 border-t border-slate-100/80 flex items-center justify-end gap-1 text-[11px] font-bold text-[#7B61FF]">
            <span>Enter Recruiter Workspace</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </div>
        </motion.div>

      </div>

      {/* Dynamic Trust Note */}
      <p className="text-center text-[10px] text-slate-400 font-mono uppercase tracking-wider pt-2">
        ● Secured by cryptographic multi-role policies
      </p>

    </motion.div>
  );
}

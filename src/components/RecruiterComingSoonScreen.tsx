/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowLeft, Terminal, Laptop, HelpCircle, Briefcase, Zap, Cpu } from 'lucide-react';

interface RecruiterComingSoonScreenProps {
  onBack: () => void;
  onEnterAdmin: () => void;
}

export default function RecruiterComingSoonScreen({ onBack, onEnterAdmin }: RecruiterComingSoonScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-lg mx-auto space-y-6 p-1"
      id="recruiter-coming-soon-container"
    >
      {/* Back button header */}
      <div>
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-slate-750 transition-colors uppercase tracking-wider bg-transparent border-0 cursor-pointer"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Change Workspace</span>
        </button>
      </div>

      {/* Hero Visual Teaser Section */}
      <div className="relative bg-slate-900 text-white rounded-3xl p-6 overflow-hidden border border-slate-800 shadow-xl">
        <div className="absolute top-0 right-0 w-48 h-48 bg-[#7B61FF]/10 blur-3xl rounded-full" />
        <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-[#5B5BD6]/10 blur-3xl rounded-full" />
        
        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#7B61FF]/20 text-[#9E86FF] text-[10px] font-mono tracking-widest uppercase font-bold border border-[#7B61FF]/30">
            <Sparkles className="h-3 w-3 animate-pulse" />
            <span>Neural Release Underway</span>
          </div>

          <h2 className="font-display text-2xl font-extrabold tracking-tight">
            Personal Recruiter Workspace
          </h2>
          <p className="text-slate-400 text-xs leading-relaxed max-w-md">
            Our autonomous recruiter desk is currently undergoing active neural system calibrations and Microsoft Teams workspace sync. We will expand this node node-by-node very soon!
          </p>
        </div>
      </div>

      {/* Feature Teasers List */}
      <div className="space-y-3">
        <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">
          What is coming to your Recruiter Desk:
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          
          <div className="p-3 bg-white rounded-2xl border border-slate-200/80 space-y-1.5">
            <div className="h-7 w-7 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Cpu className="h-4 w-4" />
            </div>
            <h4 className="font-bold text-slate-800 text-xs">
              Autonomous Match Engine
            </h4>
            <p className="text-[11px] text-slate-500 leading-normal">
              High-accuracy resume scoring and matching ratings based on real-time requirement schemas.
            </p>
          </div>

          <div className="p-3 bg-white rounded-2xl border border-slate-200/80 space-y-1.5">
            <div className="h-7 w-7 rounded-lg bg-[#7B61FF]/10 text-[#7B61FF] flex items-center justify-center">
              <Laptop className="h-4 w-4" />
            </div>
            <h4 className="font-bold text-slate-800 text-xs">
              Collaborative Video Screening
            </h4>
            <p className="text-[11px] text-[#292D32] leading-normal">
              Conduct direct, mock, or smart AI matches with inline chat, files transcript, and interactive screenshare.
            </p>
          </div>

          <div className="p-3 bg-white rounded-2xl border border-slate-200/80 space-y-1.5">
            <div className="h-7 w-7 rounded-lg bg-pink-50 text-pink-600 flex items-center justify-center">
              <Terminal className="h-4 w-4" />
            </div>
            <h4 className="font-bold text-[#343C44] text-xs">
              No-Code AI Prompters
            </h4>
            <p className="text-[11px] text-slate-500 leading-normal">
              Instruct autonomous agents to fetch candidates, send customized emails, or schedule evaluations instantly.
            </p>
          </div>

          <div className="p-3 bg-white rounded-2xl border border-slate-200/80 space-y-1.5 font-sans">
            <div className="h-7 w-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Zap className="h-4 w-4" />
            </div>
            <h4 className="font-bold text-slate-850 text-xs">
              Instant Teams Integration
            </h4>
            <p className="text-[11px] text-slate-500 leading-normal">
              Publish dossiers to shared Teams channels, assign task backlogs to recruiters, and sync notifications.
            </p>
          </div>

        </div>
      </div>

      {/* Solid call to action to help out developer testers */}
      <div className="pt-2">
        <button
          type="button"
          onClick={onEnterAdmin}
          className="w-full h-11 rounded-xl bg-gradient-to-r from-[#5B5BD6] to-[#7B61FF] hover:from-[#4949B8] hover:to-[#684DEC] text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.99] cursor-pointer"
        >
          <span>Explore Admin Hub Workspace Instead</span>
          <Sparkles className="h-4 w-4" />
        </button>
      </div>

    </motion.div>
  );
}

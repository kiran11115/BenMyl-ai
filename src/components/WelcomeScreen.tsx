/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles, Command, Shield, Users, Layers } from 'lucide-react';
import { AuthScreen } from '../types';

interface WelcomeScreenProps {
  onNavigate: (screen: AuthScreen) => void;
}

export default function WelcomeScreen({ onNavigate }: WelcomeScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-md mx-auto flex flex-col justify-between h-full space-y-8"
      id="welcome-container"
    >
      {/* Branding and Tagline */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-[#5B5BD6] to-[#7B61FF] flex items-center justify-center shadow-md shadow-[#5B5BD6]/20">
            <Command className="h-5 w-5 text-white" />
          </div>
          <div>
            <span className="font-display font-extrabold text-2xl tracking-tight text-slate-900">
              BenMyl<span className="text-[#5B5BD6] font-normal font-mono text-sm ml-1 px-1.5 py-0.5 rounded bg-[#5B5BD6]/10">AI</span>
            </span>
          </div>
        </div>

        <div className="space-y-2 pt-2">
          <h1 className="font-display text-3xl font-extrabold tracking-tight text-slate-900 leading-tight">
            The Autonomous <span className="text-[#5B5BD6]">Talent Platform</span>
          </h1>
          <p className="text-slate-500 text-sm leading-relaxed">
            Unite high-speed neural candidate screenings with premium collaborative sourcing desks. Designed for elite recruiters, sales squads, and enterprise staffing partners.
          </p>
        </div>
      </div>

      {/* Styled Inline Dynamic Illustration representing Workspace Collaboration */}
      <div className="w-full p-4 rounded-2xl bg-indigo-50/40 border border-slate-100/80 mt-2 space-y-3 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#7B61FF]/5 blur-xl rounded-full" />
        <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
          <span className="flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5 text-[#5B5BD6] animate-pulse" />
            <span>COLLABORATIVE HUB STATUS</span>
          </span>
          <span className="text-emerald-500 font-bold">● ONLINE</span>
        </div>

        {/* Minimal vector-like items representing team cooperation */}
        <div className="space-y-2 mt-1">
          <div className="flex items-center gap-2.5 bg-white p-2.5 rounded-xl border border-slate-100 shadow-xs">
            <div className="h-7 w-7 rounded-lg bg-[#5B5BD6]/10 flex items-center justify-center">
              <Users className="h-4 w-4 text-[#5B5BD6]" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-slate-800 leading-tight">Human Networks Sync</p>
              <p className="text-[10px] text-slate-400 truncate">Sourcing & placements running 4.5x faster</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 bg-white p-2.5 rounded-xl border border-slate-100 shadow-xs">
            <div className="h-7 w-7 rounded-lg bg-[#7B61FF]/10 flex items-center justify-center">
              <Layers className="h-4 w-4 text-[#7B61FF]" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-slate-800 leading-tight">Multi-Role Workspace</p>
              <p className="text-[10px] text-slate-400 truncate">ClickUp-inspired adaptive agent layouts</p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3 pt-4">
        <button
          type="button"
          id="btn-navigate-login"
          onClick={() => onNavigate(AuthScreen.LOGIN)}
          className="w-full h-12 rounded-xl bg-[#5B5BD6] hover:bg-[#4747B8] text-white font-semibold text-sm flex items-center justify-center gap-2 transition-all shadow-md shadow-[#5B5BD6]/15 hover:shadow-lg hover:shadow-[#5B5BD6]/20 cursor-pointer active:scale-[0.99]"
        >
          <span>Sign In to Workspace</span>
          <ArrowRight className="h-4.5 w-4.5" />
        </button>

        <button
          type="button"
          id="btn-navigate-signup"
          onClick={() => onNavigate(AuthScreen.SIGNUP)}
          className="w-full h-12 rounded-xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-200/80 font-semibold text-sm flex items-center justify-center gap-2 transition-all hover:border-[#5B5BD6]/30 cursor-pointer active:scale-[0.99] shadow-xs"
        >
          <span>Create Account</span>
        </button>
      </div>

      {/* Trust Badge */}
      <div className="text-center pt-2">
        <p className="inline-flex items-center gap-1.5 text-[10px] text-slate-400 uppercase font-mono tracking-wider">
          <Shield className="h-3 w-3 text-emerald-500" />
          <span>SOC-2 Type II Certified Workspace Integrity</span>
        </p>
      </div>
    </motion.div>
  );
}

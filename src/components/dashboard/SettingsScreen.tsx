/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sliders, 
  Cpu, 
  Users, 
  ShieldAlert, 
  Sparkles, 
  Clock, 
  CheckCircle2, 
  Database,
  Lock,
  ChevronDown
} from 'lucide-react';

export default function SettingsScreen() {
  const [activeSubTab, setActiveSubTab] = useState<'ai' | 'team' | 'workspace'>('ai');
  const [activeLLmModel, setActiveLLmModel] = useState('BenMyl Sourcing Oracle v4 (Fine-Tuned)');
  const [matchConfidence, setMatchConfidence] = useState(90);

  return (
    <div className="space-y-6 pb-12">
      
      {/* Title */}
      <div>
        <h2 className="text-xl font-display font-bold text-slate-900">Workspace Management Configurations</h2>
        <p className="text-slate-400 text-xs">Verify team seat parameters, calibrate neural matching LLM parameters, and configure security roles</p>
      </div>

      {/* Settings Navigation tab selectors */}
      <div className="bg-white rounded-2xl border border-slate-200/60 p-4 shadow-sm space-y-4">
        
        <div className="flex border-b border-slate-100 p-0.5 text-xs font-semibold">
          <button
            onClick={() => setActiveSubTab('ai')}
            className={`px-4 py-2 hover:text-slate-800 transition-all cursor-pointer border-b-2 ${
              activeSubTab === 'ai' ? 'border-indigo-600 text-indigo-650' : 'border-transparent text-slate-500'
            }`}
          >
            Neural AI Matching Parameters
          </button>
          <button
            onClick={() => setActiveSubTab('team')}
            className={`px-4 py-2 hover:text-slate-800 transition-all cursor-pointer border-b-2 ${
              activeSubTab === 'team' ? 'border-indigo-600 text-indigo-650' : 'border-transparent text-slate-500'
            }`}
          >
            Team seat permissions
          </button>
          <button
            onClick={() => setActiveSubTab('workspace')}
            className={`px-4 py-2 hover:text-slate-800 transition-all cursor-pointer border-b-2 ${
              activeSubTab === 'workspace' ? 'border-indigo-600 text-indigo-650' : 'border-transparent text-slate-500'
            }`}
          >
            Workspace Profile Settings
          </button>
        </div>

        {/* Configurations Fields based on active sub tab */}
        <div className="pt-2 min-h-[300px]">
          <AnimatePresence mode="wait">
            
            {/* SubTab 1: AI configurations */}
            {activeSubTab === 'ai' && (
              <motion.div 
                key="ai-settings"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4 max-w-lg text-xs"
              >
                <div className="space-y-1">
                  <label className="font-mono text-[9.5px] font-bold text-slate-400 uppercase tracking-widest block">Active Sourcing LLM Model</label>
                  <div className="relative">
                    <select 
                      className="w-full text-xs font-sans p-2.5 border border-slate-220 focus:border-indigo-500 rounded-xl outline-none bg-slate-50 text-slate-800 appearance-none cursor-pointer"
                      value={activeLLmModel}
                      onChange={(e) => setActiveLLmModel(e.target.value)}
                    >
                      <option value="BenMyl Sourcing Oracle v4 (Fine-Tuned)">BenMyl Sourcing Oracle v4 (Fine-Tuned)</option>
                      <option value="Gemini 1.5 Pro (Generalist Reasoning)">Gemini 1.5 Pro (Generalist Reasoning)</option>
                      <option value="Gemini 1.5 Flash (Latency Optimized)">Gemini 1.5 Flash (Latency Optimized)</option>
                    </select>
                    <ChevronDown className="absolute right-3.5 top-3 h-4 w-4 text-slate-550 pointer-events-none" />
                  </div>
                  <span className="text-[10px] text-slate-400">Our native fine-tuned model leverages 4.2M vetted technical recruiting profiles.</span>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <label className="font-mono text-[9.5px] font-bold text-slate-400 uppercase tracking-widest block">Confidence Rating Floor Threshold</label>
                    <span className="font-mono text-indigo-600 font-semibold">{matchConfidence}%</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="99"
                    className="w-full h-1 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-650"
                    value={matchConfidence}
                    onChange={(e) => setMatchConfidence(Number(e.target.value))}
                  />
                  <span className="text-[10px] text-slate-400 block pt-0.5">Filter out candidate matches that score below {matchConfidence}% accuracy.</span>
                </div>

                <div className="p-3 bg-indigo-50 rounded-xl border border-indigo-120 flex items-center justify-between text-indigo-900 leading-snug">
                  <div>
                    <strong className="block font-semibold">Active LLM Temperature Calibrated</strong>
                    <span className="text-[10px] font-light text-indigo-750">Optimized parameter limits to prevent hallucinated candidate indices.</span>
                  </div>
                  <span className="text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded text-[9px] font-mono font-bold border border-emerald-100">SAFE MODE</span>
                </div>
              </motion.div>
            )}

            {/* SubTab 2: Team and seat clearance levels */}
            {activeSubTab === 'team' && (
              <motion.div 
                key="team-settings"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4 max-w-lg text-xs"
              >
                <div className="space-y-2">
                  <span className="font-mono text-[9.5px] font-bold text-slate-400 uppercase tracking-widest block">Role Authorization Levels</span>
                  
                  <div className="space-y-2">
                    <div className="p-3 border border-slate-100 rounded-xl flex justify-between items-center bg-slate-50/50">
                      <div>
                        <strong className="text-slate-800 text-xs font-semibold block">Full Desk Recruiter Clearances</strong>
                        <span className="text-[10px] text-slate-400">Can provision new bench items & broadcast matching listings to candidates.</span>
                      </div>
                      <span className="text-[10.5px] font-mono text-indigo-650 font-bold bg-indigo-50 px-1.5 py-0.5 rounded border border-indigo-100 uppercase">GRANTED</span>
                    </div>

                    <div className="p-3 border border-slate-100 rounded-xl flex justify-between items-center bg-slate-50/50">
                      <div>
                        <strong className="text-slate-800 text-xs font-semibold block">Vendor Integration permissions</strong>
                        <span className="text-[10px] text-slate-400">Allows active vendors to push hotlist bench items to requirement indexes.</span>
                      </div>
                      <span className="text-[10.5px] font-mono text-emerald-600 font-bold bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100 uppercase">ACTIVE</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* SubTab 3: Workspace Profile Settings */}
            {activeSubTab === 'workspace' && (
              <motion.div 
                key="workspace-settings"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4 max-w-md text-xs font-sans text-slate-800"
              >
                <div className="space-y-1">
                  <label className="font-mono text-[9.5px] font-bold text-slate-400 uppercase tracking-widest block">Workspace Enterprise Name</label>
                  <input
                    type="text"
                    className="w-full p-2.5 border border-slate-250 focus:border-indigo-500 rounded-xl outline-none"
                    defaultValue="Alpha Staffing Network"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-mono text-[9.5px] font-bold text-slate-400 uppercase tracking-widest block">Administrative Subdomain</label>
                  <div className="relative">
                    <input
                      type="text"
                      className="w-full p-2.5 border border-slate-250 focus:border-indigo-500 rounded-xl outline-none"
                      defaultValue="alpha-recruits"
                    />
                    <span className="absolute right-3.5 top-3.5 font-mono text-[9.5px] text-slate-400 select-none">.benmyl.ai</span>
                  </div>
                </div>

                <button
                  type="button"
                  className="px-4 py-2.5 bg-indigo-600 hover:bg-slate-900 text-white rounded-xl text-xs font-bold uppercase cursor-pointer"
                  onClick={() => alert("Workspace parameters updated securely.")}
                >
                  Save settings
                </button>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

      </div>

    </div>
  );
}

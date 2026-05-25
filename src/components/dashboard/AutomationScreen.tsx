/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Cpu, 
  Sparkles, 
  Layers, 
  ArrowRight, 
  Play, 
  X, 
  CheckCircle, 
  Plus, 
  CheckCircle2, 
  ChevronRight,
  Database,
  Mail,
  Calendar,
  Zap
} from 'lucide-react';

interface Node {
  id: string;
  label: string;
  type: 'Trigger' | 'Condition' | 'Action';
  description: string;
  active: boolean;
  icon: React.ComponentType<{ className?: string }>;
}

export default function AutomationScreen() {
  const [triggerGlow, setTriggerGlow] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  const [nodes, setNodes] = useState<Node[]>([
    { id: 'N-1', label: 'Candidate Uploaded', type: 'Trigger', description: 'Parser parses CV attachment files', active: false, icon: Database },
    { id: 'N-2', label: 'CV Score Greater &gt;= 90%', type: 'Condition', description: 'Checks AI screening match index rating', active: false, icon: Cpu },
    { id: 'N-3', label: 'Auto Broadcaster Email Draft', type: 'Action', description: 'Dispenses email template to active prime vendors', active: false, icon: Mail },
    { id: 'N-4', label: 'Coordinate Interview Calendar', type: 'Action', description: 'Triggers Outlook calendar invites instantly', active: false, icon: Calendar }
  ]);

  const templates = [
    { name: 'Hot Bench Candidate Broadcast Routing', desc: 'Triggers instant verification, parses CV file, sets Marketable status tag and broadcasts details to core prime vendors.', icon: Zap },
    { name: 'Candidate Interview Loop Integration', desc: 'Auto checks client calendars when recruiter promotes candidate stage, coordinates suitable hours and updates ATS logs.', icon: Calendar },
    { name: 'Stale Bench Auto-reengagement Check', desc: 'Synthesizes auto-reengagement checks for bench profiles inactive for over 30 days, refreshing status tags.', icon: Cpu }
  ];

  const handleSimulateAutomation = () => {
    setTriggerGlow(true);
    
    // Stagger node activations progressively
    nodes.forEach((node, index) => {
      setTimeout(() => {
        setNodes(prev => prev.map((n, idx) => idx === index ? { ...n, active: true } : n));
      }, index * 450);
    });

    // Reset everything after sequence completes
    setTimeout(() => {
      setTriggerGlow(false);
      setNodes(prev => prev.map(n => ({ ...n, active: false })));
      alert("Automation Routine Simulation Complete. Zero configuration errors found.");
    }, 2400);
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-display font-bold text-slate-900">Workflow Automation Orchestrator</h2>
          <p className="text-slate-400 text-xs">Execute background scheduling parameters, coordinate system automated operations pipelines, and configure triggers</p>
        </div>

        <button
          onClick={handleSimulateAutomation}
          disabled={triggerGlow}
          className={`px-4 py-2.5 btn-royal-gold text-white rounded-xl text-xs font-semibold shadow-md flex items-center gap-2 transition-all cursor-pointer ${
            triggerGlow ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          <Play className="h-4 w-4 fill-white" />
          <span>Simulate Automation Sequence</span>
        </button>
      </div>

      {/* Main Builder layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 relative items-stretch">
        
        {/* Left Side: Visual Node Builder Flow (Col: 7) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/60 p-5 shadow-sm flex flex-col justify-between space-y-4 min-h-[460px]">
          <div>
            <h3 className="font-display font-bold text-xs text-slate-950">Active Routine Builder Map</h3>
            <p className="text-[11px] text-slate-400 font-sans">Simulated node flowchart tracking logic from trigger events</p>
          </div>

          {/* Sequential Nodes flow container */}
          <div className="space-y-3.5 max-w-[340px] mx-auto py-4">
            {nodes.map((node, index) => {
              const NodeIcon = node.icon;
              return (
                <div key={node.id} className="relative">
                  {/* Join line connector */}
                  {index < nodes.length - 1 && (
                    <div className="absolute left-6.5 top-12.5 bottom-[-15px] w-0.5 bg-slate-100 flex items-center z-0">
                      <div className={`w-full h-full ${node.active ? 'bg-indigo-500 transition-all duration-300' : 'bg-slate-200'}`} />
                    </div>
                  )}

                  <div className={`relative z-10 p-3.5 rounded-xl border flex items-center gap-3.5 transition-all duration-300 bg-white ${
                    node.active 
                      ? 'border-indigo-500 shadow-md scale-[1.02] bg-indigo-50/10' 
                      : 'border-slate-200 shadow-xs'
                  }`}>
                    <div className={`h-8 w-8 rounded-lg flex items-center justify-center border shrink-0 ${
                      node.active 
                        ? 'bg-indigo-600 border-indigo-600 text-white animate-pulse' 
                        : 'bg-slate-50 border-slate-200 text-slate-550'
                    }`}>
                      <NodeIcon className="h-4 w-4" />
                    </div>

                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className={`text-[8.5px] font-mono tracking-wider font-bold rounded uppercase px-1.5 py-0.2 ${
                          node.type === 'Trigger' 
                            ? 'bg-amber-100 text-amber-700' 
                            : node.type === 'Condition'
                            ? 'bg-indigo-100 text-indigo-700'
                            : 'bg-emerald-100 text-emerald-700'
                        }`}>
                          {node.type}
                        </span>
                        <strong className="text-xs text-slate-805 font-bold font-display">{node.label}</strong>
                      </div>
                      <p className="text-[10px] text-slate-400 mt-0.5 leading-snug">{node.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center">
            <span className="text-[10px] text-slate-405 font-mono">Drag actions from core registry to insert active rules</span>
          </div>
        </div>

        {/* Right Side: Templates Panel Card (Col: 5) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200/60 p-5 shadow-sm space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="font-display font-bold text-xs text-slate-950">Pre-Configured AI Templates</h3>
            <p className="text-[11px] text-slate-400">Pre-built automation routines ready to deploy on BenMyl workspace</p>
          </div>

          <div className="space-y-3">
            {templates.map((temp, index) => {
              const TempIcon = temp.icon;
              return (
                <div 
                  key={index} 
                  onClick={() => setSelectedTemplate(temp.name)}
                  className="p-3 bg-slate-50/50 hover:bg-slate-50 border border-slate-200 hover:border-indigo-200 rounded-xl transition-all cursor-pointer space-y-1 group"
                >
                  <div className="flex items-center gap-2">
                    <TempIcon className="h-4 w-4 text-indigo-500 shrink-0" />
                    <strong className="text-[11.5px] font-semibold text-slate-800 leading-tight group-hover:text-indigo-600 transition-colors">
                      {temp.name}
                    </strong>
                  </div>
                  <p className="text-[10.5px] text-slate-450 leading-relaxed pl-6 font-sans font-light">
                    {temp.desc}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="p-3 bg-indigo-50 rounded-xl border border-indigo-120 flex items-center justify-between text-xs text-indigo-900">
            <span className="font-medium">Selected Template Aligned</span>
            <span className="font-mono text-[9px] font-bold text-indigo-700">READY TO TRANSMIT</span>
          </div>
        </div>

      </div>

    </div>
  );
}

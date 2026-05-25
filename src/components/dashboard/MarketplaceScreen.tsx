/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Briefcase, 
  Search, 
  Sparkles, 
  Cpu, 
  MapPin, 
  TrendingUp, 
  Award, 
  RefreshCw, 
  Layers,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Users,
  Building,
  ArrowRight
} from 'lucide-react';

interface Talent {
  id: string;
  name: string;
  role: string;
  skills: string[];
  exp: number;
  score: number;
  rate: string;
  location: string;
  featuredVendor: string;
  connected: boolean;
}

export default function MarketplaceScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTech, setSelectedTech] = useState('All');
  const [selectedTalent, setSelectedTalent] = useState<Talent | null>(null);

  const [talents, setTalents] = useState<Talent[]>([
    { id: 'TAL-601', name: 'Nolan Vasquez', role: 'Staff React Engineer', skills: ['React', 'TypeScript', 'Tailwind', 'Next.js'], exp: 8, score: 98, rate: '$85/hr', location: 'Austin, TX', featuredVendor: 'Synapse Tech Sourcing', connected: false },
    { id: 'TAL-602', name: 'Zoe Sterling', role: 'Senior AWS DevOps Specialist', skills: ['Kubernetes', 'Terraform', 'AWS', 'GCP', 'Bash'], exp: 9, score: 95, rate: '$105/hr', location: 'New York, NY', featuredVendor: 'NextGen Staffing', connected: false },
    { id: 'TAL-603', name: 'Aarav Patel', role: 'Java Spring Boot Consultant', skills: ['Java', 'Spring Boot', 'Kafka', 'Docker'], exp: 6, score: 92, rate: '$75/hr', location: 'San Jose, CA', featuredVendor: 'Pacific Tech Consultants', connected: false },
    { id: 'TAL-604', name: 'Elena Rostova', role: 'Lead Solutions Architect', skills: ['Python', 'GCP', 'REST APIs', 'PostgreSQL'], exp: 11, score: 89, rate: '$120/hr', location: 'Remote', featuredVendor: 'Synapse Tech Sourcing', connected: false }
  ]);

  const handleToggleConnect = (talId: string) => {
    setTalents(prev => prev.map(t => {
      if (t.id === talId) {
        return { ...t, connected: !t.connected };
      }
      return t;
    }));
    const updatedTalent = talents.find(t => t.id === talId);
    if (updatedTalent) {
      alert(`Connection request routed securely. Aligning with ${updatedTalent.name} under ${updatedTalent.featuredVendor} protocol.`);
    }
  };

  const filteredTalents = talents.filter(t => {
    const matchesSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          t.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          t.featuredVendor.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesTech = selectedTech === 'All' || t.skills.some(sk => sk.toLowerCase() === selectedTech.toLowerCase());

    return matchesSearch && matchesTech;
  });

  return (
    <div className="space-y-6 pb-12">
      
      {/* Title */}
      <div>
        <h2 className="text-xl font-display font-bold text-slate-900">Futuristic Talent Marketplace</h2>
        <p className="text-slate-400 text-xs text-xs">Verify recommended bench experts, browse accredited staffing vendors, and execute instant connection agreements</p>
      </div>

      {/* Directory filters & listing panels */}
      <div className="bg-white rounded-2xl border border-slate-200/60 p-4 shadow-sm space-y-4">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-xl text-xs focus:border-indigo-500 focus:ring-1 focus:ring-indigo-100 outline-none transition-all placeholder:text-slate-400"
              placeholder="Search talent, featured vendors, or specific expertise indices..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            <SensibleFilterButton label="All Stacks" active={selectedTech === 'All'} onClick={() => setSelectedTech('All')} />
            <SensibleFilterButton label="React" active={selectedTech === 'React'} onClick={() => setSelectedTech('React')} />
            <SensibleFilterButton label="Kubernetes" active={selectedTech === 'Kubernetes'} onClick={() => setSelectedTech('Kubernetes')} />
            <SensibleFilterButton label="AWS" active={selectedTech === 'AWS'} onClick={() => setSelectedTech('AWS')} />
          </div>
        </div>

        {/* Talent Discovery Grid cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredTalents.map((t) => (
            <div 
              key={t.id} 
              className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs space-y-4 hover:shadow-md hover:border-indigo-100 transition-all group"
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2.5">
                  <div className="h-9 w-9 bg-slate-50 border border-slate-200 text-slate-700 font-display font-bold rounded-xl flex items-center justify-center text-xs shrink-0">
                    {t.name.split(' ').map(n=>n[0]).join('')}
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-xs text-slate-900 group-hover:text-indigo-650 transition-colors leading-tight">
                      {t.name}
                    </h4>
                    <span className="text-[9px] text-slate-400 font-mono tracking-wide">{t.role}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-[10px] font-mono text-indigo-700 font-bold bg-indigo-50/70 border border-indigo-120 px-1.5 py-0.5 rounded">
                  <Sparkles className="h-3 w-3 text-indigo-650 animate-bounce" />
                  <span>AI SPEC: {t.score}%</span>
                </div>
              </div>

              {/* Attributes block */}
              <div className="grid grid-cols-2 gap-2 text-xs leading-tight text-slate-600 font-sans">
                <div>
                  <span className="text-slate-400 text-[9px] block">Supplying Partner Vendor:</span>
                  <strong className="text-slate-750 font-semibold">{t.featuredVendor}</strong>
                </div>

                <div>
                  <span className="text-slate-400 text-[9px] block">Hour Rate target:</span>
                  <strong className="text-slate-750 font-semibold">{t.rate}</strong>
                </div>
              </div>

              {/* Skills list */}
              <div className="flex flex-wrap gap-1">
                {t.skills.map((s, idx) => (
                  <span key={idx} className="text-[9px] font-semibold bg-slate-50 border border-slate-150 text-slate-550 px-1.5 py-0.5 rounded font-mono">
                    {s}
                  </span>
                ))}
              </div>

              {/* Connect Actions line */}
              <div className="border-t border-slate-100 pt-3 flex items-center justify-between">
                <span className="text-[10px] text-slate-400 flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5" />
                  {t.location}
                </span>

                <button
                  onClick={() => handleToggleConnect(t.id)}
                  className={`px-3 py-1.5 text-[10px] font-bold font-mono uppercase rounded-lg transition-all cursor-pointer shadow-xs ${
                    t.connected 
                      ? 'bg-slate-50 border border-slate-200 text-slate-450 hover:bg-slate-100'
                      : 'bg-indigo-600 hover:bg-slate-900 text-white'
                  }`}
                >
                  {t.connected ? 'Requested Connect' : 'Instant Connect'}
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>

    </div>
  );
}

// Simple filter button component
function SensibleFilterButton({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 text-[11px] font-semibold border rounded-lg transition-all cursor-pointer whitespace-nowrap ${
        active 
          ? 'bg-slate-900 border-slate-900 text-white' 
          : 'bg-white border-slate-200 text-slate-550 hover:border-slate-300'
      }`}
    >
      {label}
    </button>
  );
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Briefcase, 
  Search, 
  MapPin, 
  Sparkles, 
  Cpu, 
  CheckCircle, 
  TrendingUp, 
  Send,
  Users,
  CheckCircle2,
  ChevronRight,
  Filter,
  BadgeAlert,
  ArrowRight
} from 'lucide-react';

interface BenchCandidate {
  id: string;
  name: string;
  role: string;
  skills: string[];
  exp: number;
  rate: string;
  status: 'Marketable' | 'In Interview' | 'Awaiting Offer' | 'Placed';
  visaStatus: string;
  location: string;
  vendorScore: number;
}

export default function BenchSalesScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTechFilter, setSelectedTechFilter] = useState('All');
  const [selectedCandidate, setSelectedCandidate] = useState<BenchCandidate | null>(null);
  const [triggerMatchLoading, setTriggerMatchLoading] = useState(false);
  const [matchReport, setMatchReport] = useState<string | null>(null);

  const [benchList, setBenchList] = useState<BenchCandidate[]>(() => {
    const cached = localStorage.getItem('benmyl_bench_list');
    if (cached) {
      try {
        return JSON.parse(cached);
      } catch (e) {
        // Fallback below
      }
    }
    const defaults: BenchCandidate[] = [
      { id: 'BC-109', name: 'Nolan Vance', role: 'Staff Front End Engineer', skills: ['React', 'TypeScript', 'Node.js', 'Next.js'], exp: 8, rate: '$85/hr', status: 'Marketable', visaStatus: 'US Citizen', location: 'Austin, TX', vendorScore: 98 },
      { id: 'BC-203', name: 'Zoe Sterling', role: 'Senior AWS DevOps Architect', skills: ['Terraform', 'Kubernetes', 'GCP', 'AWS', 'Python'], exp: 9, rate: '$105/hr', status: 'In Interview', visaStatus: 'H1B (Transferable)', location: 'New York, NY (Hybrid)', vendorScore: 92 },
      { id: 'BC-304', name: 'Aarav Patel', role: 'Full Stack Java Engineer', skills: ['Java 21', 'Spring Boot', 'Kafka', 'React', 'MongoDB'], exp: 6, rate: '$75/hr', status: 'Marketable', visaStatus: 'GC-EAD', location: 'San Jose, CA', vendorScore: 94 },
      { id: 'BC-402', name: 'Isabella Ricci', role: 'Core Machine Learning Engineer', skills: ['Python', 'PyTorch', 'TensorFlow', 'LLMs', 'SQL'], exp: 7, rate: '$120/hr', status: 'Awaiting Offer', visaStatus: 'L2-EAD', location: 'Remote', vendorScore: 97 },
      { id: 'BC-501', name: 'Brandon Cole', role: 'Lead Angular Architect', skills: ['Angular 17', 'TypeScript', 'RxJS', 'NgRx', 'Node'], exp: 11, rate: '$90/hr', status: 'Placed', visaStatus: 'US Citizen', location: 'Denver, CO (Remote)', vendorScore: 86 }
    ];
    localStorage.setItem('benmyl_bench_list', JSON.stringify(defaults));
    return defaults;
  });

  React.useEffect(() => {
    localStorage.setItem('benmyl_bench_list', JSON.stringify(benchList));
  }, [benchList]);

  const handleApplyRequirementMatch = (cand: BenchCandidate) => {
    setSelectedCandidate(cand);
    setTriggerMatchLoading(true);
    setMatchReport(null);

    setTimeout(() => {
      setTriggerMatchLoading(false);
      setMatchReport(`MATCH DIAGNOSTIC COMPLETED: Nolan's expertise is a 98.2% exact fit index with HSBC Requirement #4019 and Amazon Front End specialist spec. Generated email workflow broadcasted to 14 active, premium prime vendors.`);
    }, 1200);
  };

  const filteredBench = benchList.filter(b => {
    const matchesSearch = b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          b.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          b.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesTech = selectedTechFilter === 'All' || 
                        b.skills.some(s => s.toLowerCase() === selectedTechFilter.toLowerCase());

    return matchesSearch && matchesTech;
  });

  return (
    <div className="space-y-6 pb-12">
      
      {/* Title block */}
      <div>
        <h2 className="text-xl font-display font-bold text-slate-1000">Bench Sales Optimizer</h2>
        <p className="text-slate-400 text-xs">Calibrate Hot-List candidates, broadcast to prime vendors, and trigger requirement alignment algorithms</p>
      </div>

      {/* Stats summaries */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200/60 rounded-xl p-4 shadow-sm transition-all hover:shadow-xs">
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block font-bold">Total Bench Capacity</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-xl font-display font-bold text-slate-900">{benchList.length} Active</span>
            <span className="text-[9px] font-mono text-[#2563eb] bg-[#eff6ff] border border-blue-100 px-1.5 py-0.5 rounded font-bold uppercase">100% visible</span>
          </div>
        </div>

        <div className="bg-white border border-slate-200/60 rounded-xl p-4 shadow-sm transition-all hover:shadow-xs">
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block font-bold">Marketable Profiles</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-xl font-display font-bold text-slate-900">
              {benchList.filter(b => b.status === 'Marketable').length} Sourced
            </span>
            <span className="text-[10px] text-slate-400">Broadcasting...</span>
          </div>
        </div>

        <div className="bg-white border border-slate-200/60 rounded-xl p-4 shadow-sm transition-all hover:shadow-xs">
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block font-bold">Under Active Loop</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-xl font-display font-bold text-slate-900">
              {benchList.filter(b => b.status === 'In Interview' || b.status === 'Awaiting Offer').length} Candidates
            </span>
            <span className="text-[10px] text-amber-600 font-mono font-bold uppercase">High Close velocity</span>
          </div>
        </div>

        <div className="bg-white border border-slate-200/60 rounded-xl p-4 shadow-sm transition-all hover:shadow-xs">
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block font-bold">Hiring Placed Realized</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-xl font-display font-bold text-emerald-600">
              {benchList.filter(b => b.status === 'Placed').length} Secured
            </span>
            <span className="text-[10px] text-slate-400">Archived cycle</span>
          </div>
        </div>
      </div>

      {/* Main filter & Bench layout */}
      <div className="bg-white rounded-2xl border border-slate-200/60 p-4 shadow-sm space-y-4">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              className="w-full pl-10 pr-4 py-2 bg-[#f8fafc] border border-slate-200 rounded-xl text-xs focus:border-[#2563eb] focus:ring-1 focus:ring-[#eff6ff] outline-none transition-all placeholder:text-slate-400 font-medium text-slate-800"
              placeholder="Filter bench candidates by name, tech skills, location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setSelectedTechFilter('All')}
              className={`px-3 py-1.5 text-[11px] font-bold border rounded-lg transition-all cursor-pointer ${
                selectedTechFilter === 'All' 
                  ? 'bg-gradient-to-r from-[#1d4ed8] to-[#d4af37] border-transparent text-white shadow-sm' 
                  : 'bg-white text-slate-500 border-slate-200 hover:bg-gradient-to-r hover:from-[#0f172a] hover:to-[#eab308] hover:text-white hover:border-transparent'
              }`}
            >
              All Tech
            </button>
            <button
              onClick={() => setSelectedTechFilter('React')}
              className={`px-3 py-1.5 text-[11px] font-bold border rounded-lg transition-all cursor-pointer ${
                selectedTechFilter === 'React' 
                  ? 'bg-gradient-to-r from-[#1d4ed8] to-[#d4af37] border-transparent text-white shadow-sm' 
                  : 'bg-white text-slate-500 border-slate-200 hover:bg-gradient-to-r hover:from-[#0f172a] hover:to-[#eab308] hover:text-white hover:border-transparent'
              }`}
            >
              React
            </button>
            <button
              onClick={() => setSelectedTechFilter('Python')}
              className={`px-3 py-1.5 text-[11px] font-bold border rounded-lg transition-all cursor-pointer ${
                selectedTechFilter === 'Python' 
                  ? 'bg-gradient-to-r from-[#1d4ed8] to-[#d4af37] border-transparent text-white shadow-sm' 
                  : 'bg-white text-slate-500 border-slate-200 hover:bg-gradient-to-r hover:from-[#0f172a] hover:to-[#eab308] hover:text-white hover:border-transparent'
              }`}
            >
              Python
            </button>
          </div>
        </div>

        {/* Bench Grid of candidates */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredBench.map((cand) => (
            <div 
              key={cand.id} 
              className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs space-y-4 hover:shadow-md hover:border-[#2563eb]/40 transition-all group text-left"
            >
              {/* Header block */}
              <div className="flex justify-between items-start gap-2">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-[#eff6ff] text-[#2563eb] font-display font-bold flex items-center justify-center text-sm border border-blue-100">
                    {cand.name.split(' ').map(n=>n[0]).join('')}
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-xs text-slate-950 group-hover:text-[#2563eb] transition-colors leading-tight">
                      {cand.name}
                    </h4>
                    <span className="text-[10px] text-slate-400 font-mono tracking-wide">{cand.id} • {cand.visaStatus}</span>
                  </div>
                </div>

                <span className={`text-[9.5px] font-bold px-2 py-0.5 border rounded-full font-mono ${
                  cand.status === 'Marketable' 
                    ? 'status-pill-green'
                    : cand.status === 'In Interview'
                    ? 'status-pill-purple'
                    : cand.status === 'Awaiting Offer'
                    ? 'status-pill-blue'
                    : 'bg-slate-100 border-slate-250 text-slate-400'
                }`}>
                  {cand.status.toUpperCase()}
                </span>
              </div>

              {/* Core attributes */}
              <div className="space-y-1">
                <h5 className="text-[11px] font-bold text-slate-900 leading-none">{cand.role}</h5>
                <span className="text-[10px] text-slate-400 flex items-center gap-1 font-sans font-medium">
                  <MapPin className="h-3.5 w-3.5 shrink-0 text-[#2563eb]" />
                  {cand.location} • Rate target: <strong className="text-slate-800 font-semibold">{cand.rate}</strong>
                </span>
              </div>

              {/* Tech tag list */}
              <div className="flex flex-wrap gap-1">
                {cand.skills.map((s, index) => (
                  <span key={index} className="text-[9.5px] font-semibold bg-slate-50 border border-slate-150 px-2 py-0.5 rounded text-slate-550 font-mono">
                    {s}
                  </span>
                ))}
              </div>

              {/* Bench actions footer */}
              <div className="border-t border-slate-100 pt-3.5 flex items-center justify-between gap-3">
                <div className="flex items-center gap-1.5">
                  <Cpu className="h-3.5 w-3.5 text-[#2563eb] animate-spin" style={{ animationDuration: '4s' }} />
                  <span className="font-mono text-[9px] text-[#2563eb] font-bold bg-[#eff6ff] px-1.5 py-0.5 rounded uppercase tracking-wider">AI SCORE: {cand.vendorScore}%</span>
                </div>

                <button
                  type="button"
                  onClick={() => handleApplyRequirementMatch(cand)}
                  className="px-3 py-1.5 btn-royal-gold font-mono text-[10px] font-bold uppercase rounded-lg flex items-center gap-1 transition-all cursor-pointer shadow-xs"
                >
                  <span>Query AI-Match</span>
                  <ArrowRight className="h-3 w-3" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Floating neural diagnostic matching overlay modal */}
      <AnimatePresence>
        {selectedCandidate && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.35 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCandidate(null)}
              className="fixed inset-0 bg-slate-900"
            />
            
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-lg bg-white border border-slate-200 shadow-2xl rounded-2xl overflow-hidden z-10 p-5 space-y-4"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-1.5">
                  <Sparkles className="h-4.5 w-4.5 text-indigo-600 animate-spin" style={{ animationDuration: '3s' }} />
                  <h4 className="font-display font-bold text-slate-900 text-xs">AI Neural Sourcing Diagnostics Module</h4>
                </div>
                <button 
                  onClick={() => setSelectedCandidate(null)}
                  className="p-1 text-slate-400 hover:text-slate-650 cursor-pointer font-mono font-bold"
                >
                  Dismiss
                </button>
              </div>

              {triggerMatchLoading ? (
                <div className="py-8 flex flex-col items-center justify-center space-y-3">
                  <RefreshCw className="h-8 w-8 text-indigo-600 animate-spin" />
                  <span className="text-xs font-mono text-slate-600">Simulating Bench AI matrix requirement alignment...</span>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="p-3 bg-indigo-50 border border-indigo-100 rounded-xl space-y-2">
                    <span className="text-[10px] font-mono uppercase tracking-wide text-indigo-800 font-bold block">Match Matrix Results: {selectedCandidate.name}</span>
                    <p className="text-xs text-slate-800 leading-normal leading-relaxed">
                      {matchReport}
                    </p>
                  </div>

                  {/* AI suggestion vendors listing block */}
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest block">AI Recommended Vendors</span>
                    
                    <div className="space-y-1.5">
                      <div className="p-2 border border-slate-100 rounded-xl flex items-center justify-between text-xs bg-slate-50/50">
                        <div>
                          <strong className="text-slate-800 font-semibold text-[11px] block">Synapse Cloud Sourcing</strong>
                          <span className="text-[10px] font-mono text-slate-400">Response latency: 14m • Conversion trust index: 98%</span>
                        </div>
                        <span className="font-mono text-[10px] text-indigo-600 font-bold bg-indigo-50 px-1.5 py-0.5 rounded">AUTO-CONNECT ROUTED</span>
                      </div>

                      <div className="p-2 border border-slate-100 rounded-xl flex items-center justify-between text-xs bg-slate-50/50">
                        <div>
                          <strong className="text-slate-800 font-semibold text-[11px] block">NextGen Staffing Integrators</strong>
                          <span className="text-[10px] font-mono text-slate-400">Response latency: 22m • Conversion trust index: 94%</span>
                        </div>
                        <span className="font-mono text-[10px] text-slate-500 font-bold border border-slate-200 px-1.5 py-0.5 rounded">CONNECTED</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex justify-end">
                    <button
                      onClick={() => setSelectedCandidate(null)}
                      className="px-4 py-2 bg-[#0d1e3d] hover:bg-[#162e5c] btn-navy-yellow text-white text-xs font-bold font-mono uppercase rounded-xl shadow-md cursor-pointer"
                    >
                      Broadcast alignment & complete sync
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}

// Simple Refresh spinner replacement component icon
function RefreshCw(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
      <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
      <path d="M16 16h5v5" />
    </svg>
  );
}

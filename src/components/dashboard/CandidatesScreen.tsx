/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, 
  Search, 
  Sparkles, 
  Cpu, 
  ChevronRight, 
  BookOpen, 
  Calendar, 
  Briefcase, 
  Clock, 
  CheckCircle, 
  Paperclip,
  CheckCircle2,
  Phone,
  Mail,
  SlidersHorizontal,
  ChevronDown,
  LayoutGrid,
  List,
  MessageSquare,
  Plus,
  ArrowRight
} from 'lucide-react';

interface Candidate {
  id: string;
  name: string;
  role: string;
  email: string;
  experience: number;
  aiScore: number;
  stage: 'Sourced' | 'Technical Screening' | 'Client Interview' | 'Offered';
  skills: string[];
  lastUpdate: string;
  education: string;
  appliedDate: string;
  highlights: string[];
}

export default function CandidatesScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [stageFilter, setStageFilter] = useState('All');
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [viewMode, setViewMode] = useState<'board' | 'list'>('board');

  const [candidates, setCandidates] = useState<Candidate[]>([
    { id: 'CAND-9021', name: 'Nolan Vasquez', role: 'Staff React Engineer', email: 'n.vasquez@gmail.com', experience: 8, aiScore: 98, stage: 'Technical Screening', skills: ['React', 'TypeScript', 'TailwindCSS', 'Redux', 'Node.js', 'WebSockets'], lastUpdate: '10 mins ago', education: 'B.S. Computer Science - UT Austin', appliedDate: '2026-05-18', highlights: ['Led core frontend migration of legacy platform to modern Vite framework reducing build latency by 64%', 'Architected scalable state stores resolving high-volume telemetry race hazards', 'Strictly audited UI accessibility parameters resulting in WCAG AA certification compliance'] },
    { id: 'CAND-9022', name: 'Elena Rostova', role: 'Full Stack Staff Associate', email: 'elena.rost@outlook.com', experience: 10, aiScore: 95, stage: 'Offered', skills: ['Python', 'Django', 'GCP', 'PostgreSQL', 'Docker', 'Angular'], lastUpdate: '2 hours ago', education: 'M.S. Software Engineering - Stanford University', appliedDate: '2026-05-12', highlights: ['Designed robust server-side cache layers boosting API response throughput by 200%', 'Mentored dynamic cross-functional design teams consisting of 8 software engineers', 'Implemented secure federated SAML/OAuth Single Sign-On procedures'] },
    { id: 'CAND-9023', name: 'Aaliyah Jackson', role: 'Senior AWS DevOps Architect', email: 'aaliyah.jack@yahoo.com', experience: 7, aiScore: 92, stage: 'Sourced', skills: ['Terraform', 'Kubernetes', 'CI/CD Pipelines', 'AWS', 'Bash', 'Docker'], lastUpdate: '1 day ago', education: 'B.S. Information Tech - Georgia Tech', appliedDate: '2026-05-20', highlights: ['Synthesized automation scripting routines shrinking manual deployment checkpoints to zero', 'Spearheaded zero-downtime multi-AZ Docker hosting structures supporting 2M active clients', 'Cut quarterly cloud infrastructure costs by 34% by optimizing orphan disk volumes'] },
    { id: 'CAND-9024', name: 'Ji-Min Park', role: 'Data Systems Engineer', email: 'ji_min_99@naver.com', experience: 5, aiScore: 88, stage: 'Client Interview', skills: ['Java', 'Spring Boot', 'Spark', 'Hadoop', 'Kafka', 'Redis'], lastUpdate: '3 hours ago', education: 'B.S. Mathematics - KAIST', appliedDate: '2026-05-14', highlights: ['Constructed robust ingestion nodes digesting high-frequency stock tickers without dropped indices', 'Built custom telemetry logs verifying database shard replication latency limits', 'Migrated static monolithic database schemas to distributed distributed systems models'] },
    { id: 'CAND-9025', name: 'Liam Gallagher', role: 'Technical Program Consultant', email: 'liam.g@gallagher-ops.co', experience: 12, aiScore: 84, stage: 'Sourced', skills: ['Agile', 'Scrum', 'Enterprise Integration', 'System High Design', 'PMI'], lastUpdate: '3 days ago', education: 'M.B.A. Operations - London Business School', appliedDate: '2026-05-10', highlights: ['Synthesized scope of work parameters mapping out timeline milestones for 18 distinct teams', 'Maintained 99.8% project milestones delivery metrics over a rolling 24 month cycle', 'Negotiated key SLA standards with premium third-party service vendor integrations'] }
  ]);

  const filteredCandidates = candidates.filter(cand => {
    const matchesSearch = cand.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          cand.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          cand.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesStage = stageFilter === 'All' || cand.stage === stageFilter;
    return matchesSearch && matchesStage;
  });

  // Stages structure for the Kanban Board
  const boardStages = [
    { 
      key: 'Sourced' as const, 
      label: 'Next Up', 
      desc: 'Top target prospects', 
      headerClass: 'bg-[#f59e0b]', 
      pillClass: 'bg-[#fef3c7] text-[#d97706] border-[#fde68a]' 
    },
    { 
      key: 'Technical Screening' as const, 
      label: 'In Progress', 
      desc: ' Vetting loop & coding checks', 
      headerClass: 'bg-[#8b5cf6]', 
      pillClass: 'bg-[#f3e8ff] text-[#7c3aed] border-[#e9d5ff]' 
    },
    { 
      key: 'Client Interview' as const, 
      label: 'Review', 
      desc: 'Active stakeholder meetings', 
      headerClass: 'bg-[#0ea5e9]', 
      pillClass: 'bg-[#e0f2fe] text-[#0284c7] border-[#bae6fd]' 
    },
    { 
      key: 'Offered' as const, 
      label: 'Completed', 
      desc: 'Final contracts extended', 
      headerClass: 'bg-[#10b981]', 
      pillClass: 'bg-[#d1fae5] text-[#059669] border-[#a7f3d0]' 
    }
  ];

  const handleAddNewCandidate = (stageKey: string) => {
    const name = prompt("Enter Candidate Name:");
    if (!name) return;
    const role = prompt("Enter Engineering Title:", "Principal Software Architect");
    if (!role) return;

    const newCand: Candidate = {
      id: `CAND-${Math.floor(1000 + Math.random() * 9000)}`,
      name,
      role,
      email: `${name.toLowerCase().replace(/\s+/g, '')}@gmail.com`,
      experience: 6,
      aiScore: Math.floor(82 + Math.random() * 17),
      stage: stageKey as any,
      skills: ['React', 'TypeScript', 'Node.js'],
      lastUpdate: 'Just now',
      education: 'B.S. Corporate Systems Engineering',
      appliedDate: new Date().toISOString().split('T')[0],
      highlights: ['Excellent technical communication skills', 'Demonstrated core delivery architectures']
    };

    setCandidates(prev => [...prev, newCand]);
  };

  return (
    <div className="space-y-6 pb-12 relative font-sans">
      
      {/* Title & Stats */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block">Client Projects / Active Sourcing Board</span>
          <h2 className="text-2xl font-display font-bold text-slate-900 tracking-tight mt-0.5">Modern Candidate Pipeline</h2>
        </div>

        {/* View Mode Toggle & Quick Filter Stats badging */}
        <div className="flex items-center gap-3 self-start md:self-center">
          <div className="flex bg-white border border-slate-200 p-1 rounded-xl shadow-xs">
            <button
              onClick={() => setViewMode('board')}
              className={`p-1.5 px-3 rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-all ${
                viewMode === 'board'
                  ? 'bg-gradient-to-r from-[#1d4ed8] to-[#d4af37] text-white shadow-sm'
                  : 'text-slate-500 hover:bg-gradient-to-r hover:from-[#0f172a] hover:to-[#eab308] hover:text-white'
              }`}
              title="Kanban Board View"
            >
              <LayoutGrid className="h-3.5 w-3.5" />
              <span>Board View</span>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 px-3 rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-all ${
                viewMode === 'list'
                  ? 'bg-gradient-to-r from-[#1d4ed8] to-[#d4af37] text-white shadow-sm'
                  : 'text-slate-500 hover:bg-gradient-to-r hover:from-[#0f172a] hover:to-[#eab308] hover:text-white'
              }`}
              title="List Directory View"
            >
              <List className="h-3.5 w-3.5" />
              <span>List View</span>
            </button>
          </div>

          <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50/50 border border-indigo-100 text-indigo-700 text-[10px] font-mono uppercase rounded-xl tracking-wider font-bold">
            <Sparkles className="h-3.5 w-3.5 text-indigo-500" />
            <span>{candidates.filter(c => c.aiScore >= 90).length} Premium Targets</span>
          </span>
        </div>
      </div>

      {/* Global Filter Bar */}
      <div className="bg-white rounded-2xl border border-slate-200/60 p-4 shadow-sm space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              className="w-full pl-10 pr-4 py-2 bg-[#f8fafc] border border-slate-200 rounded-xl text-xs focus:border-[#2563eb] focus:ring-1 focus:ring-[#eff6ff] outline-none transition-all placeholder:text-slate-400 text-slate-800 font-medium"
              placeholder="Search candidate index by parsed skills, names, titles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {viewMode === 'list' && (
            <div className="flex items-center gap-1.5 flex-wrap">
              <SensibleFilterButton label="All" active={stageFilter === 'All'} onClick={() => setStageFilter('All')} />
              <SensibleFilterButton label="Sourced" active={stageFilter === 'Sourced'} onClick={() => setStageFilter('Sourced')} />
              <SensibleFilterButton label="Screening" active={stageFilter === 'Technical Screening'} onClick={() => setStageFilter('Technical Screening')} />
              <SensibleFilterButton label="Client Loop" active={stageFilter === 'Client Interview'} onClick={() => setStageFilter('Client Interview')} />
              <SensibleFilterButton label="Offered" active={stageFilter === 'Offered'} onClick={() => setStageFilter('Offered')} />
            </div>
          )}
        </div>
      </div>

      {/* RENDER VIEWS */}
      {viewMode === 'board' ? (
        /* KANBAN BOARD VIEW (Keitoto Studio Mockup design) */
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-stretch">
          {boardStages.map((stage) => {
            const stageCandidates = filteredCandidates.filter(c => c.stage === stage.key);
            return (
              <div 
                key={stage.key} 
                className="bg-[#f1f5f9]/60 rounded-2xl border border-slate-200/50 p-2.5 flex flex-col justify-between space-y-4 min-h-[500px]"
              >
                <div className="space-y-3">
                  {/* Column Header */}
                  <div className={`p-2.5 py-2.5 rounded-xl ${stage.headerClass} text-white flex items-center justify-between shadow-xs`}>
                    <div className="truncate pr-1.5">
                      <span className="font-display font-bold text-xs tracking-wide block">{stage.label}</span>
                      <span className="text-[8px] text-white/80 font-medium block truncate mt-0.5">{stage.desc}</span>
                    </div>
                    <span className="bg-white/25 text-white text-[10px] font-mono font-bold px-2 py-0.5 rounded-full shrink-0">
                      {stageCandidates.length}
                    </span>
                  </div>

                  {/* Column Cards stack */}
                  <div className="space-y-2.5">
                    {stageCandidates.length === 0 ? (
                      <div className="bg-white/40 border border-dashed border-slate-200 p-8 rounded-xl text-center">
                        <span className="text-[10px] font-mono text-slate-400 font-bold uppercase block">Drop Candidates Here</span>
                      </div>
                    ) : (
                      stageCandidates.map((cand) => (
                        <div 
                          key={cand.id}
                          onClick={() => setSelectedCandidate(cand)}
                          className="bg-white hover:border-[#2563eb]/40 hover:shadow-md border border-slate-200/80 rounded-xl p-3.5 space-y-3 shadow-xs cursor-pointer transition-all group"
                        >
                          <div className="space-y-1">
                            <span className="text-[8.5px] font-mono text-slate-405 font-bold uppercase tracking-wider block">
                              Experience: {cand.experience} yrs
                            </span>
                            <h4 className="font-display font-bold text-[#0f172a] text-[13px] leading-snug group-hover:text-[#2563eb] transition-all">
                              {cand.name}
                            </h4>
                            <p className="text-[10.5px] text-slate-500 font-medium leading-none block truncate">
                              {cand.role}
                            </p>
                          </div>

                          {/* Skills pill snippets */}
                          <div className="flex flex-wrap gap-1 pt-1">
                            {cand.skills.slice(0, 3).map((sk, index) => (
                              <span 
                                key={index}
                                className="text-[9px] bg-slate-50 text-slate-600 border border-slate-100 font-semibold font-mono rounded px-1.5 py-0.5"
                              >
                                {sk}
                              </span>
                            ))}
                            {cand.skills.length > 3 && (
                              <span className="text-[8px] text-slate-400 font-mono self-center">
                                +{cand.skills.length - 3}
                              </span>
                            )}
                          </div>

                          {/* Footer metadata alignment with avatars and comment bubbles */}
                          <div className="pt-2.5 border-t border-slate-100/65 flex items-center justify-between text-xs text-slate-400 font-mono">
                            <div className="flex items-center gap-1.5 shrink-0">
                              <div className="h-6 w-6 rounded-full bg-[#cbd5e1] text-slate-850 flex items-center justify-center text-[8.5px] font-bold border border-white">
                                {cand.name.split(' ').map(n=>n[0]).join('')}
                              </div>
                              <span className="text-[8.5px] font-bold uppercase tracking-widest text-[#2563eb] bg-[#eff6ff] px-1.5 rounded">
                                AI: {cand.aiScore}
                              </span>
                            </div>

                            <div className="flex items-center gap-2 text-[10px]">
                              <span className="flex items-center gap-0.5">
                                <MessageSquare className="h-3 w-3 text-slate-350" />
                                <span>3</span>
                              </span>
                              <span className="flex items-center gap-0.5">
                                <Clock className="h-3 w-3 text-slate-350" />
                                <span className="text-[9px]">2d</span>
                              </span>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* Dashed Add card button exactly mirroring "+ Add Card" placeholder */}
                <button
                  onClick={() => handleAddNewCandidate(stage.key)}
                  className="w-full py-2 bg-white/70 hover:bg-white border border-dashed border-slate-200 hover:border-[#2563eb]/45 rounded-xl text-[10.5px] font-mono text-slate-500 font-semibold tracking-wider hover:text-[#2563eb] cursor-pointer transition-all flex items-center justify-center gap-1.5"
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>Add Sourced Card</span>
                </button>
              </div>
            );
          })}
        </div>
      ) : (
        /* LIST DIRECTORY VIEW (Standard high-fidelity client list parameters) */
        <div className="bg-white rounded-2xl border border-slate-200/60 p-4 shadow-sm space-y-4">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                  <th className="py-3 px-4 font-bold">CANDIDATE</th>
                  <th className="py-3 px-4 font-bold">PIPELINE STAGE</th>
                  <th className="py-3 px-4 font-bold">EXPERIENCE</th>
                  <th className="py-3 px-4 font-bold">TOP METRICS & SKILLS</th>
                  <th className="py-3 px-4 text-right font-bold">AI RESUME SCORE</th>
                  <th className="py-3 px-4"></th>
                </tr>
              </thead>
              <tbody>
                {filteredCandidates.map((cand) => (
                  <tr 
                    key={cand.id} 
                    onClick={() => setSelectedCandidate(cand)}
                    className="border-b border-slate-100 hover:bg-slate-50/70 transition-colors cursor-pointer group"
                  >
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-full bg-slate-50 text-[#2563eb] border border-slate-200 flex items-center justify-center font-display font-semibold text-xs shrink-0">
                          {cand.name.split(' ').map(n=>n[0]).join('')}
                        </div>
                        <div>
                          <h4 className="font-display font-bold text-xs text-slate-900 group-hover:text-[#2563eb] transition-colors leading-tight">{cand.name}</h4>
                          <span className="text-[9.5px] text-slate-400 font-mono tracking-wide">{cand.email}</span>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full border uppercase ${
                        cand.stage === 'Sourced' 
                          ? 'bg-amber-50 text-amber-600 border-amber-100' 
                          : cand.stage === 'Technical Screening'
                          ? 'bg-purple-50 text-purple-600 border-purple-100'
                          : cand.stage === 'Client Interview'
                          ? 'bg-sky-50 text-sky-600 border-sky-100'
                          : 'bg-emerald-50 text-emerald-600 border-emerald-100'
                      }`}>
                        {cand.stage}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 font-mono text-xs text-slate-600 font-medium">
                      {cand.experience} Years
                    </td>

                    <td className="py-3.5 px-4 max-w-[220px]">
                      <div className="flex flex-wrap gap-1">
                        {cand.skills.slice(0, 3).map((sk, idx) => (
                          <span key={idx} className="text-[9px] bg-slate-50 border border-slate-150 px-1.5 py-0.5 rounded text-slate-605 font-mono font-semibold">
                            {sk}
                          </span>
                        ))}
                        {cand.skills.length > 3 && (
                          <span className="text-[9px] text-slate-400 font-mono">+{cand.skills.length - 3}</span>
                        )}
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5 font-mono">
                        <span className={`text-xs font-bold ${
                          cand.aiScore >= 90 ? 'text-[#2563eb]' : 'text-slate-700'
                        }`}>
                          {cand.aiScore}/100
                        </span>
                        <Sparkles className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-right text-slate-400 group-hover:text-[#2563eb] transition-all">
                      <ChevronRight className="h-4 w-4" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Resume Preview Drawer sideout */}
      <AnimatePresence>
        {selectedCandidate && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.25 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCandidate(null)}
              className="fixed inset-0 bg-slate-900 z-40 cursor-pointer"
            />
            
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 220 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-lg bg-white border-l border-slate-200 shadow-2xl z-50 p-6 flex flex-col justify-between overflow-y-auto"
            >
              <div className="space-y-6">
                
                {/* Header info */}
                <div className="flex items-center justify-between border-b border-slate-150 pb-4">
                  <div className="flex items-center gap-1.5 text-[10.5px] font-mono tracking-widest text-slate-400 font-bold uppercase">
                    <BookOpen className="h-4.5 w-4.5 text-[#2563eb]" />
                    <span>AI Parsed Resume Dossier</span>
                  </div>
                  <button 
                    onClick={() => setSelectedCandidate(null)}
                    className="p-1 px-3 rounded bg-slate-50 hover:bg-slate-100 text-slate-450 hover:text-slate-800 text-xs font-bold cursor-pointer transition-colors"
                  >
                    Close Screen
                  </button>
                </div>

                {/* Candidate bio summary */}
                <div className="flex items-start gap-4">
                  <div className="h-14 w-14 rounded-2xl bg-[#eff6ff] text-[#2563eb] border border-blue-100 flex items-center justify-center font-display font-extrabold text-xl shadow-inner mt-1">
                    {selectedCandidate.name.split(' ').map(n=>n[0]).join('')}
                  </div>
                  <div className="space-y-1.5 flex-1 text-left">
                    <h3 className="font-display font-bold text-base text-slate-950">{selectedCandidate.name}</h3>
                    <p className="text-xs font-semibold text-slate-650 leading-none">{selectedCandidate.role}</p>
                    <div className="flex flex-wrap gap-2 text-[10px] text-slate-450 font-mono pt-1">
                      <span className="flex items-center gap-1 bg-[#f8fafc] border border-slate-100 px-2 py-0.5 rounded">
                        <Mail className="h-3 w-3" /> {selectedCandidate.email}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Core Match metrics indicators */}
                <div className="bg-slate-50 border border-slate-150 rounded-xl p-4 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-200/50 pb-2">
                    <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">Neural Index Score</span>
                    <span className="text-xs font-bold text-[#2563eb] font-mono">{selectedCandidate.aiScore}% Match</span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs leading-relaxed font-sans text-left">
                    <div>
                      <span className="text-slate-400 text-[10px] block">Education parsed:</span>
                      <strong className="text-slate-800 font-semibold">{selectedCandidate.education}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 text-[10px] block">Applied timeline:</span>
                      <strong className="text-slate-800 font-semibold">{selectedCandidate.appliedDate}</strong>
                    </div>
                  </div>
                </div>

                {/* Skills tags list */}
                <div className="space-y-2 text-left">
                  <h5 className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">Identified Stack Indices</h5>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedCandidate.skills.map((s, index) => (
                      <span key={index} className="text-[10px] font-semibold bg-[#eff6ff] border border-blue-50 text-[#1e40af] px-2 py-0.5 rounded-md font-mono">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Highlighted bullets */}
                <div className="space-y-2 text-left">
                  <h5 className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">Parsed Achievement Logs (CV summary)</h5>
                  <div className="space-y-2 pr-1">
                    {selectedCandidate.highlights.map((h, i) => (
                      <div key={i} className="flex gap-2.5 text-xs text-slate-700 leading-relaxed align-top">
                        <span className="text-[#2563eb] font-bold font-mono shrink-0 select-none">#{i+1}</span>
                        <p>{h}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Simulated upcoming interview slot */}
                <div className="bg-slate-50/70 border border-slate-150 rounded-xl p-4 space-y-2.5 text-left">
                  <div className="flex items-center justify-between text-[10px] font-mono font-bold text-slate-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5 text-[#2563eb]" />
                      <span>UPCOMING INTERVIEW EVENT</span>
                    </span>
                    <span>AUTOMATED AGENDA</span>
                  </div>

                  <div className="flex items-center justify-between text-xs font-sans">
                    <div>
                      <strong className="text-slate-850 font-semibold">Technical vetting with AWS Architects Guild</strong>
                      <span className="block text-[10px] text-slate-400">May 24, 2026 • 10:00 AM EST</span>
                    </div>
                    <span className="text-[9px] font-mono font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100 uppercase whitespace-nowrap">
                      CALCULATED SCHEDULED
                    </span>
                  </div>
                </div>

              </div>

              {/* Drawer footer operational checks */}
              <div className="border-t border-slate-150 pt-4 flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    const nextStageMap: Record<Candidate['stage'], Candidate['stage']> = {
                      'Sourced': 'Technical Screening',
                      'Technical Screening': 'Client Interview',
                      'Client Interview': 'Offered',
                      'Offered': 'Sourced'
                    };
                    const nextStage = nextStageMap[selectedCandidate.stage];
                    setCandidates(prev => prev.map(c => c.id === selectedCandidate.id ? { ...c, stage: nextStage } : c));
                    setSelectedCandidate(c => c ? { ...c, stage: nextStage } : null);
                  }}
                  className="flex-1 py-3 btn-royal-gold text-white rounded-xl text-xs font-bold uppercase transition-all shadow-sm flex items-center justify-center gap-1.5 cursor-pointer font-mono"
                >
                  <span>Promote Sourcing Loop Stage</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
}

// Simple filter button component
function SensibleFilterButton({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 text-[11px] font-bold border rounded-lg transition-all cursor-pointer whitespace-nowrap ${
        active 
          ? 'bg-gradient-to-r from-[#1d4ed8] to-[#d4af37] border-transparent text-white shadow-sm' 
          : 'bg-white border-slate-200 text-slate-500 hover:bg-gradient-to-r hover:from-[#0f172a] hover:to-[#eab308] hover:text-white hover:border-transparent'
      }`}
    >
      {label}
    </button>
  );
}

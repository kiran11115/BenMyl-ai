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
  Users, 
  Mail, 
  Activity, 
  Layers,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Plus,
  X,
  Phone
} from 'lucide-react';

interface Requirement {
  id: string;
  title: string;
  clientName: string;
  assignedRecruiter: string;
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
  status: 'Open' | 'Sourcing' | 'In Interview' | 'Closed';
  location: string;
  salaryRange: string;
  skillsNeeded: string[];
  description: string;
  contactEmail?: string;
  contactPhone?: string;
}

export default function RequirementsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [selectedReq, setSelectedReq] = useState<Requirement | null>(null);
  const [showAiMatchReport, setShowAiMatchReport] = useState(false);
  const [showAddRequirementModal, setShowAddRequirementModal] = useState(false);

  // Requirement Core list
  const [requirements, setRequirements] = useState<Requirement[]>([
    { id: 'REQ-4019', title: 'Senior React & Node Engineer', clientName: 'HSBC Global Fintech', assignedRecruiter: 'Samantha Chen', priority: 'Critical', status: 'Sourcing', location: 'New York, NY (Hybrid)', salaryRange: '$140k - $170k', skillsNeeded: ['React', 'TypeScript', 'Node.js', 'Next.js', 'TailwindCSS'], description: 'Required to build robust investment dashboard interfaces, managing high-throughput WebSocket telemetries. 5+ years experience in reactive patterns.', contactEmail: 'sam.chen@benmyl.ai', contactPhone: '+1 (512) 809-1100' },
    { id: 'REQ-4022', title: 'Staff DevOps AWS Specialist', clientName: 'Enterprise Logistics Corp', assignedRecruiter: 'James Carter', priority: 'High', status: 'In Interview', location: 'Remote', salaryRange: '$160k - $190k', skillsNeeded: ['AWS', 'Terraform', 'Kubernetes', 'Docker', 'Bash'], description: 'Spearheading cloud deployment automation, cutting container orchestration failure metrics. High reliability standards required.', contactEmail: 'carter.j@logistics.corp', contactPhone: '+1 (415) 231-9008' },
    { id: 'REQ-4025', title: 'Python Backend Engineer (Core ML)', clientName: 'Innovate AI Labs', assignedRecruiter: 'Emily Robinson', priority: 'Medium', status: 'Open', location: 'San Francisco, CA', salaryRange: '$130k - $155k', skillsNeeded: ['Python', 'Django', 'PyTorch', 'LLMs', 'PostgreSQL'], description: 'Build foundational backend REST endpoints and coordinate with active ML model fine-tuning structures.', contactEmail: 'e.robinson@innovate.ai', contactPhone: '+1 (408) 291-1102' },
    { id: 'REQ-4029', title: 'Principal Java Architect', clientName: 'Capital Finance Network', assignedRecruiter: 'Samantha Chen', priority: 'Critical', status: 'Sourcing', location: 'Austin, TX', salaryRange: '$180k - $210k', skillsNeeded: ['Java 21', 'Spring Boot', 'Kafka', 'Redis', 'Microservices'], description: 'Leading payment ledger rewrite using event-driven microservices. Legacy code decomposition expert needed.', contactEmail: 'sam.chen@benmyl.ai', contactPhone: '+1 (512) 809-1100' }
  ]);

  // Modal Input state managers
  const [newTitle, setNewTitle] = useState('');
  const [newClientName, setNewClientName] = useState('');
  const [newRecruiter, setNewRecruiter] = useState('Samantha Chen');
  const [newPriority, setNewPriority] = useState<'Critical' | 'High' | 'Medium' | 'Low'>('High');
  const [newStatus, setNewStatus] = useState<'Open' | 'Sourcing' | 'In Interview' | 'Closed'>('Open');
  const [newLocation, setNewLocation] = useState('');
  const [newSalary, setNewSalary] = useState('');
  const [newSkills, setNewSkills] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPhone, setNewPhone] = useState('');

  const filteredReqs = requirements.filter(req => {
    const matchesSearch = req.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          req.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          req.skillsNeeded.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesPriority = priorityFilter === 'All' || req.priority === priorityFilter;
    return matchesSearch && matchesPriority;
  });

  const handleSaveRequirement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newClientName.trim()) {
      alert("Please fill in the Job Title and Client Name fields.");
      return;
    }

    const parsedSkills = newSkills 
      ? newSkills.split(',').map(s => s.trim()).filter(Boolean) 
      : ['General Consulting'];
      
    const newId = `REQ-${Math.floor(4030 + Math.random() * 2000)}`;

    const freshReq: Requirement = {
      id: newId,
      title: newTitle.trim(),
      clientName: newClientName.trim(),
      assignedRecruiter: newRecruiter.trim() || 'Samantha Chen',
      priority: newPriority,
      status: newStatus,
      location: newLocation.trim() || 'Remote Available',
      salaryRange: newSalary.trim() || '$130k - $160K',
      skillsNeeded: parsedSkills,
      description: newDescription.trim() || 'Custom requirements uploaded. Immediate placement target.',
      contactEmail: newEmail.trim() || 'hiring@benmyl.ai',
      contactPhone: newPhone.trim() || '+1 (555) 012-3401'
    };

    setRequirements(prev => [freshReq, ...prev]);

    // Clear and close
    setNewTitle('');
    setNewClientName('');
    setNewRecruiter('Samantha Chen');
    setNewPriority('High');
    setNewStatus('Open');
    setNewLocation('');
    setNewSalary('');
    setNewSkills('');
    setNewDescription('');
    setNewEmail('');
    setNewPhone('');
    setShowAddRequirementModal(false);
  };

  return (
    <div className="space-y-6 pb-12 relative font-sans">
      
      {/* Title Header with "+ Add" Action trigger */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-display font-bold text-slate-900">Open Staffing Requirements</h2>
          <p className="text-slate-400 text-xs">Verify open roles, priority metrics, recruiting assignments, and match index listings</p>
        </div>

        <button
          onClick={() => setShowAddRequirementModal(true)}
          className="px-4 py-2 bg-gradient-to-r from-[#1d4ed8] to-[#d4af37] text-white rounded-xl text-xs font-bold shadow-sm shadow-[#1d4ed8]/10 hover:shadow-md hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer flex items-center justify-center gap-1.5 self-start sm:self-auto"
        >
          <Plus className="h-4 w-4 text-white" />
          <span>Add Requirement</span>
        </button>
      </div>

      {/* Directory filters & Requirements matrix */}
      <div className="bg-white rounded-2xl border border-slate-205 p-4 shadow-sm space-y-4">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-xl text-xs focus:border-indigo-500 focus:ring-1 focus:ring-indigo-100 outline-none transition-all placeholder:text-slate-400"
              placeholder="Search specifications by role name, client name, or tech stacks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            <SensibleFilterButton label="All Priorities" active={priorityFilter === 'All'} onClick={() => setPriorityFilter('All')} />
            <SensibleFilterButton label="Critical" active={priorityFilter === 'Critical'} onClick={() => setPriorityFilter('Critical')} />
            <SensibleFilterButton label="High" active={priorityFilter === 'High'} onClick={() => setPriorityFilter('High')} />
            <SensibleFilterButton label="Medium" active={priorityFilter === 'Medium'} onClick={() => setPriorityFilter('Medium')} />
          </div>
        </div>

        {/* Requirements Directory List */}
        <div className="space-y-3.5">
          {filteredReqs.map((req) => (
            <div 
              key={req.id} 
              onClick={() => { setSelectedReq(req); setShowAiMatchReport(false); }}
              className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs hover:shadow-md hover:border-indigo-100 transition-all cursor-pointer group"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded border ${
                      req.priority === 'Critical' 
                        ? 'bg-red-50 text-red-600 border-red-100' 
                        : req.priority === 'High'
                        ? 'bg-amber-50 text-amber-600 border-amber-100'
                        : 'bg-indigo-50 text-indigo-650 border-indigo-120'
                    }`}>
                      {req.priority.toUpperCase()}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400 font-bold">{req.id} • {req.clientName}</span>
                    <span className="text-[9.5px] font-mono font-bold text-slate-500 border border-slate-200 bg-slate-50/50 px-1 py-0.2 rounded">
                      {req.status}
                    </span>
                  </div>

                  <h3 className="font-display font-extrabold text-xs text-slate-900 group-hover:text-indigo-650 transition-colors leading-tight">
                    {req.title}
                  </h3>

                  <div className="flex flex-wrap gap-1 pt-1">
                    {req.skillsNeeded.map((s, index) => (
                      <span key={index} className="text-[9.5px] font-semibold bg-slate-50 border border-slate-150 px-1.5 py-0.5 rounded text-slate-550 font-mono">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-4 shrink-0自-start sm:self-auto">
                  <div className="text-right hidden sm:block">
                    <span className="text-[10px] text-slate-400 block font-mono">Assigned Agent</span>
                    <strong className="text-xs font-semibold text-slate-800">{req.assignedRecruiter}</strong>
                  </div>

                  <div className="h-8 w-8 rounded-full bg-slate-50 text-slate-400 group-hover:text-indigo-600 border border-slate-200 flex items-center justify-center transition-all">
                    <ChevronRight className="h-4.5 w-4.5" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Detail overlay panel drawer */}
      <AnimatePresence>
        {selectedReq && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.25 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedReq(null)}
              className="fixed inset-0 bg-slate-900 z-40 cursor-pointer"
            />
            
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 220 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white border-l border-slate-200 shadow-2xl z-50 p-6 flex flex-col justify-between overflow-y-auto"
            >
              <div className="space-y-6">
                
                {/* Header */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <span className="text-[10px] font-mono tracking-widest text-slate-400 font-bold uppercase">Requirement Specs</span>
                  <button 
                    onClick={() => setSelectedReq(null)}
                    className="p-1 px-3 rounded bg-slate-50 hover:bg-slate-100 text-slate-450 hover:text-slate-650 text-xs font-bold cursor-pointer transition-colors"
                  >
                    Close Drawer
                  </button>
                </div>

                {/* Info block */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="bg-red-50 text-red-650 border border-red-100 text-[9px] font-bold px-1.5 py-0.5 rounded font-mono uppercase">
                      {selectedReq.priority} Target
                    </span>
                    <span className="text-[10px] font-mono text-slate-400 font-bold">Spec ID: {selectedReq.id}</span>
                  </div>

                  <h3 className="font-display font-bold text-base text-slate-950 leading-tight">
                    {selectedReq.title}
                  </h3>
                  <strong className="text-xs font-semibold text-slate-705 block">{selectedReq.clientName}</strong>
                </div>

                <div className="bg-slate-50 border border-slate-150 rounded-xl p-4 grid grid-cols-2 gap-3 text-xs leading-tight font-sans">
                  <div>
                    <span className="text-slate-410 text-[10px] uppercase font-mono tracking-wide block pb-0.5">Physical Location:</span>
                    <strong className="text-slate-800 font-bold">{selectedReq.location}</strong>
                  </div>

                  <div>
                    <span className="text-slate-410 text-[10px] uppercase font-mono tracking-wide block pb-0.5">Offered Compensation:</span>
                    <strong className="text-slate-800 font-bold">{selectedReq.salaryRange}</strong>
                  </div>
                </div>

                {/* Narrative JD */}
                <div className="space-y-1.5">
                  <h5 className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">Job Specifications Description</h5>
                  <p className="text-xs leading-relaxed text-slate-600 font-sans">
                    {selectedReq.description}
                  </p>
                </div>

                {/* Tech specifications tag cloud */}
                <div className="space-y-1.5">
                  <h5 className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">Demanded Skills Matrix</h5>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedReq.skillsNeeded.map((s, index) => (
                      <span key={index} className="text-[10px] font-semibold bg-slate-50 border border-slate-150 text-slate-650 px-2 py-0.5 rounded-md font-mono">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Contact specs display */}
                {(selectedReq.contactEmail || selectedReq.contactPhone) && (
                  <div className="space-y-1.5 p-3.5 bg-slate-50 rounded-xl border border-slate-150 text-xs">
                    <h5 className="text-[9px] font-mono font-bold text-slate-410 uppercase tracking-widest">Stakeholder Contacts</h5>
                    <div className="grid grid-cols-1 gap-1.5 text-slate-650 font-sans pt-1">
                      {selectedReq.contactEmail && (
                        <div className="flex items-center gap-2">
                          <Mail className="h-3.5 w-3.5 text-[#1d4ed8]" />
                          <span className="underline decoration-[#1d4ed8]/30 font-medium">{selectedReq.contactEmail}</span>
                        </div>
                      )}
                      {selectedReq.contactPhone && (
                        <div className="flex items-center gap-2">
                          <Phone className="h-3.5 w-3.5 text-[#d4af37]" />
                          <span>{selectedReq.contactPhone}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Recruiter Details */}
                <div className="p-3 border border-slate-100 rounded-xl flex items-center justify-between text-xs text-slate-700">
                  <div>
                    <span className="text-slate-400 text-[9px] font-mono uppercase tracking-wide block">ASSIGNED RECRUITING AGENT</span>
                    <strong className="font-semibold text-slate-850 block mt-0.5">{selectedReq.assignedRecruiter}</strong>
                  </div>
                  <span className="text-[9px] font-mono text-emerald-600 font-semibold uppercase bg-emerald-50 px-1.5 py-0.5 rounded">AUTO-SYNCD</span>
                </div>

                {/* AI Matrix suggestions preview */}
                <AnimatePresence>
                  {showAiMatchReport ? (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-3.5 rounded-xl bg-indigo-50 border border-indigo-120 text-xs leading-relaxed text-indigo-950 space-y-1.5"
                    >
                      <div className="flex items-center gap-1 text-[10px] font-mono font-bold text-indigo-800 uppercase tracking-wider">
                        <Sparkles className="h-3.5 w-3.5 text-indigo-600 animate-spin" style={{ animationDuration: '3s' }} />
                        <span>AI NEURAL RECOMMENDATIONS FOUND (3)</span>
                      </div>
                      
                      <div className="space-y-2 pt-1 font-sans">
                        <div className="flex items-center justify-between text-[11px] border-b border-indigo-100/50 pb-1.5">
                          <div>
                            <strong className="font-semibold block">Nolan Vasquez (Staff React)</strong>
                            <span className="text-[10px] text-indigo-650">On Bench • US Citizen • 8y EXP</span>
                          </div>
                          <span className="font-mono text-[10px] text-indigo-600 font-bold bg-white px-1 rounded">98.2% Fit</span>
                        </div>

                        <div className="flex items-center justify-between text-[11px] border-b border-indigo-100/50 pb-1.5 opacity-80">
                          <div>
                            <strong className="font-semibold block">Aarav Patel (Full Stack Spring)</strong>
                            <span className="text-[10px] text-indigo-650">On Bench • GC-EAD • 6y EXP</span>
                          </div>
                          <span className="font-mono text-[10px] text-slate-500 font-bold bg-white px-1 rounded">86.4% Fit</span>
                        </div>
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>

              </div>

              {/* Action tools */}
              <div className="border-t border-slate-150 pt-4 flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowAiMatchReport(true)}
                  className="flex-1 py-2.5 btn-royal-gold text-white rounded-xl text-xs font-bold uppercase transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer font-mono"
                >
                  <Cpu className="h-4 w-4" />
                  <span>Execute AI candidate Match sync</span>
                </button>
              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* 4. Connected Modal Dialog for Adding New Requirements */}
      <AnimatePresence>
        {showAddRequirementModal && (
          <div className="fixed inset-0 z-50 bg-[#0f172a]/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl border border-slate-200 shadow-2xl p-6 max-w-lg w-full relative space-y-4 my-8"
            >
              {/* Close Button Trigger */}
              <button 
                onClick={() => setShowAddRequirementModal(false)}
                className="absolute top-4 right-4 p-1 hover:bg-slate-105 text-slate-400 hover:text-slate-700 rounded-lg transition-colors cursor-pointer"
                type="button"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                <div className="h-8 w-8 rounded-lg bg-[#1d4ed8]/10 text-[#1d4ed8] flex items-center justify-center">
                  <Briefcase className="h-4.5 w-4.5" />
                </div>
                <div>
                  <h4 className="font-display font-extrabold text-slate-900 text-sm">Add New Job Requirement</h4>
                  <p className="text-[10px] text-slate-400 font-mono">AUTONOMOUS DISCOVERY ROUTER</p>
                </div>
              </div>

              <form onSubmit={handleSaveRequirement} className="space-y-3.5 text-xs">
                
                <div className="grid grid-cols-2 gap-3">
                  {/* Title */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block font-mono">Job Title *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Senior Frontend Principal"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      className="w-full px-3 py-1.5 border border-slate-200 focus:border-[#d4af37] bg-slate-50 focus:bg-white rounded-xl outline-none font-semibold text-slate-800"
                    />
                  </div>

                  {/* Client Name */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block font-mono">Client Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. HSBC Global Fintech"
                      value={newClientName}
                      onChange={(e) => setNewClientName(e.target.value)}
                      className="w-full px-3 py-1.5 border border-slate-200 focus:border-[#d4af37] bg-slate-50 focus:bg-white rounded-xl outline-none font-semibold text-slate-800"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {/* Recruiter */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block font-mono">Assigned Recruiter</label>
                    <input
                      type="text"
                      placeholder="e.g. Samantha Chen"
                      value={newRecruiter}
                      onChange={(e) => setNewRecruiter(e.target.value)}
                      className="w-full px-3 py-1.5 border border-slate-200 focus:border-[#d4af37] bg-slate-50 focus:bg-white rounded-xl outline-none font-semibold text-slate-800"
                    />
                  </div>

                  {/* Priority & Status */}
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block font-mono">Priority</label>
                      <select
                        value={newPriority}
                        onChange={(e: any) => setNewPriority(e.target.value)}
                        className="w-full px-2 py-1.5 border border-slate-200 focus:border-[#d4af37] bg-slate-50 focus:bg-white rounded-xl outline-none font-semibold text-slate-700"
                      >
                        <option value="Critical">Critical</option>
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block font-mono">Status</label>
                      <select
                        value={newStatus}
                        onChange={(e: any) => setNewStatus(e.target.value)}
                        className="w-full px-2 py-1.5 border border-slate-200 focus:border-[#d4af37] bg-slate-50 focus:bg-white rounded-xl outline-none font-semibold text-slate-700"
                      >
                        <option value="Open">Open</option>
                        <option value="Sourcing">Sourcing</option>
                        <option value="In Interview">In Interview</option>
                        <option value="Closed">Closed</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {/* Location */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block font-mono">Physical Location</label>
                    <input
                      type="text"
                      placeholder="e.g. New York, NY (Hybrid)"
                      value={newLocation}
                      onChange={(e) => setNewLocation(e.target.value)}
                      className="w-full px-3 py-1.5 border border-slate-200 focus:border-[#d4af37] bg-slate-50 focus:bg-white rounded-xl outline-none font-semibold text-slate-800"
                    />
                  </div>

                  {/* Salary Range */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block font-mono">Salary Range</label>
                    <input
                      type="text"
                      placeholder="e.g. $145k - $175k"
                      value={newSalary}
                      onChange={(e) => setNewSalary(e.target.value)}
                      className="w-full px-3 py-1.5 border border-slate-200 focus:border-[#d4af37] bg-slate-50 focus:bg-white rounded-xl outline-none font-semibold text-slate-800"
                    />
                  </div>
                </div>

                {/* Skills needed */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block font-mono">Skills Required (Comma separated)</label>
                  <input
                    type="text"
                    placeholder="React, TypeScript, Next.js, FastAPI"
                    value={newSkills}
                    onChange={(e) => setNewSkills(e.target.value)}
                    className="w-full px-3 py-1.5 border border-slate-200 focus:border-[#d4af37] bg-slate-50 focus:bg-white rounded-xl outline-none font-semibold text-slate-800"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {/* Contact Details - Email */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block font-mono">Contact Email</label>
                    <input
                      type="email"
                      placeholder="sam.chen@benmyl.ai"
                      value={newEmail}
                      onChange={(e) => setNewEmail(e.target.value)}
                      className="w-full px-3 py-1.5 border border-slate-200 focus:border-[#d4af37] bg-slate-50 focus:bg-white rounded-xl outline-none font-semibold text-slate-800"
                    />
                  </div>

                  {/* Contact Details - Phone */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block font-mono">Contact Phone</label>
                    <input
                      type="text"
                      placeholder="+1 (512) 809-1100"
                      value={newPhone}
                      onChange={(e) => setNewPhone(e.target.value)}
                      className="w-full px-3 py-1.5 border border-slate-200 focus:border-[#d4af37] bg-slate-50 focus:bg-white rounded-xl outline-none font-semibold text-slate-800"
                    />
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block font-mono">Job Description</label>
                  <textarea
                    placeholder="Required to build robust investment dashboard interfaces, managing high-throughput WebSocket telemetries..."
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    className="w-full h-18 p-2.5 border border-slate-200 focus:border-[#d4af37] bg-slate-50 focus:bg-white rounded-xl outline-none font-semibold text-slate-800 placeholder:text-slate-400 resize-none"
                  />
                </div>

                {/* Button actions */}
                <div className="grid grid-cols-2 gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowAddRequirementModal(false)}
                    className="py-2.5 px-3 border border-slate-200 hover:bg-slate-50 rounded-xl font-bold text-slate-650 cursor-pointer text-center"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="py-2.5 px-3 btn-royal-gold text-white font-bold rounded-xl flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <Plus className="h-4 w-4 text-white" />
                    <span>Save Requirement</span>
                  </button>
                </div>

              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}

// Simple filter helper
function SensibleFilterButton({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 text-[11px] font-bold border rounded-lg transition-all cursor-pointer whitespace-nowrap ${
        active 
          ? 'bg-gradient-to-r from-[#1d4ed8] to-[#d4af37] border-transparent text-white shadow-sm' 
          : 'bg-white border-slate-200 text-slate-550 hover:bg-gradient-to-r hover:from-[#0f172a] hover:to-[#eab308] hover:text-white hover:border-transparent'
      }`}
    >
      {label}
    </button>
  );
}

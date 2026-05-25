/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Upload, 
  FileText, 
  Sparkles, 
  Cpu, 
  CheckCircle2, 
  Search, 
  SlidersHorizontal, 
  ArrowRight, 
  Plus, 
  Clock, 
  Briefcase, 
  Check, 
  Database,
  Building,
  RefreshCw,
  MoreVertical,
  X
} from 'lucide-react';

interface BenchCandidate {
  id: string;
  name: string;
  role: string;
  skills: string[];
  experience: number;
  availability: 'Immediate' | '2 Weeks' | '1 Month' | 'Active Interviewing';
  vendorName: string;
  aiScore: number;
  status: 'Marketable' | 'Assigned' | 'Sourcing' | 'In Placement';
  uploadedAt: string;
}

interface UploadProgressFile {
  name: string;
  size: string;
  progress: number;
  status: 'uploading' | 'parsing' | 'completed';
  aiConfidence: number;
  parsedProfile?: {
    name: string;
    role: string;
    skills: string[];
    experience: number;
  };
}

interface UploadBenchScreenProps {
  onNavigateToReview: (candidateData: any) => void;
  onNavigateToJobs: (candidateData: any) => void;
}

export default function UploadBenchScreen({ onNavigateToReview, onNavigateToJobs }: UploadBenchScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [techFilter, setTechFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [vendorFilter, setVendorFilter] = useState('All');
  const [dragActive, setDragActive] = useState(false);
  
  // Custom form input state
  const [selectedVendorForm, setSelectedVendorForm] = useState('Synapse Sourcing');
  const [availabilityForm, setAvailabilityForm] = useState<'Immediate' | '2 Weeks' | '1 Month' | 'Active Interviewing'>('Immediate');

  // Interactive local list of bench candidates
  const [candidates, setCandidates] = useState<BenchCandidate[]>([
    { id: 'BENCH-401', name: 'Nolan Vasquez', role: 'Staff React Specialist', skills: ['React', 'TypeScript', 'Redux', 'TailwindCSS', 'Vite', 'Node.js'], experience: 8, availability: 'Immediate', vendorName: 'Synapse Sourcing', aiScore: 98, status: 'Marketable', uploadedAt: '2026-05-20' },
    { id: 'BENCH-402', name: 'Ji-Min Park', role: 'Data Systems Engineer', skills: ['Java', 'Spring Boot', 'Kafka', 'Spark', 'Hadoop', 'Redis'], experience: 5, availability: 'Immediate', vendorName: 'Pacific Tech Consultants', aiScore: 89, status: 'Sourcing', uploadedAt: '2026-05-19' },
    { id: 'BENCH-403', name: 'Elena Rostova', role: 'Lead Solutions Architect', skills: ['Python', 'GCP', 'PostgreSQL', 'Docker', 'Django'], experience: 10, availability: '2 Weeks', vendorName: 'NextGen Staffing Corp', aiScore: 95, status: 'In Placement', uploadedAt: '2026-05-18' },
    { id: 'BENCH-404', name: 'Marcus Sterling', role: 'Senior DevOps Architect', skills: ['AWS', 'Kubernetes', 'Terraform', 'CI/CD Pipelines', 'Bash'], experience: 7, availability: 'Active Interviewing', vendorName: 'Apex Talent Consortium', aiScore: 92, status: 'Marketable', uploadedAt: '24 hours ago' }
  ]);

  // Uploading and parsing files stack
  const [uploadQueue, setUploadQueue] = useState<UploadProgressFile[]>([]);
  const [selectedParsedPreview, setSelectedParsedPreview] = useState<UploadProgressFile | null>(null);

  // File Input Ref
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle drag / drop utility actions
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const processMockFile = (fileName: string, fileSizeStr: string) => {
    // Generate simulated parsing based on mock engineering data
    const parsePresets = [
      {
        name: 'Clara Vance',
        role: 'Senior Full Stack React Engineer',
        skills: ['React 19', 'TypeScript', 'GraphQL', 'TailwindCSS', 'Node.js', 'PostgreSQL'],
        experience: 7,
        confidence: 96
      },
      {
        name: 'Ethan Vance',
        role: 'Cloud Native Architect',
        skills: ['Kubernetes', 'AWS', 'Terraform', 'Docker', 'Python', 'Go'],
        experience: 11,
        confidence: 94
      },
      {
        name: 'Aiden Reed',
        role: 'React Native Mobile Developer',
        skills: ['React Native', 'Swift', 'Kotlin', 'Redux', 'JavaScript'],
        experience: 6,
        confidence: 91
      }
    ];

    const chosenPreset = parsePresets[Math.floor(Math.random() * parsePresets.length)];
    const uniqueFileName = `${chosenPreset.name.replace(/\s+/g, '_')}_Resume.pdf`;

    const newFileEntry: UploadProgressFile = {
      name: uniqueFileName,
      size: fileSizeStr,
      progress: 0,
      status: 'uploading',
      aiConfidence: chosenPreset.confidence,
      parsedProfile: {
        name: chosenPreset.name,
        role: chosenPreset.role,
        skills: chosenPreset.skills,
        experience: chosenPreset.experience
      }
    };

    setUploadQueue(prev => [newFileEntry, ...prev]);

    // Simulate upload transition progress
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 10;
      setUploadQueue(prev => 
        prev.map(f => {
          if (f.name === uniqueFileName) {
            const nextStatus = currentProgress >= 100 ? 'parsing' : 'uploading';
            return { ...f, progress: Math.min(currentProgress, 100), status: nextStatus as any };
          }
          return f;
        })
      );

      if (currentProgress >= 100) {
        clearInterval(interval);
        
        // Trigger AI Neural Parsing Phase
        setTimeout(() => {
          setUploadQueue(prev => 
            prev.map(f => {
              if (f.name === uniqueFileName) {
                // Auto promote preset preview to state
                const completedFile = { ...f, status: 'completed' as const };
                setSelectedParsedPreview(completedFile);
                return completedFile;
              }
              return f;
            })
          );
        }, 1200);
      }
    }, 150);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      const sizeStr = `${(droppedFile.size / (1024 * 1024)).toFixed(1)} MB`;
      processMockFile(droppedFile.name, sizeStr);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const chosenFile = e.target.files[0];
      const sizeStr = `${(chosenFile.size / (1024 * 1024)).toFixed(1)} MB`;
      processMockFile(chosenFile.name, sizeStr);
    }
  };

  // Add parsed candidate permanently to the bench table list
  const commitPreviewCandidateToBench = (previewFile: UploadProgressFile) => {
    if (!previewFile.parsedProfile) return;

    const newCand: BenchCandidate = {
      id: `BENCH-${Math.floor(405 + Math.random() * 500)}`,
      name: previewFile.parsedProfile.name,
      role: previewFile.parsedProfile.role,
      skills: previewFile.parsedProfile.skills,
      experience: previewFile.parsedProfile.experience,
      availability: availabilityForm,
      vendorName: selectedVendorForm,
      aiScore: previewFile.aiConfidence,
      status: 'Marketable',
      uploadedAt: 'Active Now'
    };

    setCandidates(prev => [newCand, ...prev]);
    setUploadQueue(prev => prev.filter(f => f.name !== previewFile.name));
    setSelectedParsedPreview(null);
  };

  // Compute stats on the fly
  const totalBenchCount = candidates.length;
  const immediateAvailableCount = candidates.filter(c => c.availability === 'Immediate').length;
  const averageConfidenceScore = Math.round(candidates.reduce((sum, c) => sum + c.aiScore, 0) / candidates.length);

  // Sifting and filter functions
  const availableTechnologies = ['All', 'React', 'Java', 'Python', 'AWS', 'Kubernetes', 'TypeScript'];
  const availableVendors = ['All', 'Synapse Sourcing', 'NextGen Staffing Corp', 'Pacific Tech Consultants', 'Apex Talent Consortium'];
  const statusLabels = ['All', 'Marketable', 'Sourcing', 'In Placement', 'Assigned'];

  const filteredCandidates = candidates.filter(cand => {
    const matchesSearch = cand.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          cand.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          cand.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesTech = techFilter === 'All' || cand.skills.some(s => s.toLowerCase().includes(techFilter.toLowerCase()));
    const matchesStatus = statusFilter === 'All' || cand.status === statusFilter;
    const matchesVendor = vendorFilter === 'All' || cand.vendorName === vendorFilter;

    return matchesSearch && matchesTech && matchesStatus && matchesVendor;
  });

  return (
    <div className="space-y-6 pb-12 relative font-sans">
      
      {/* 1. Header & AI Summary Cards */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-[#1d4ed8]">
            <Database className="h-3.5 w-3.5" />
            <span className="uppercase tracking-wide font-mono">Talent Ingress Orchestrator</span>
          </div>
          <h2 className="text-2xl font-display font-bold text-slate-900 tracking-tight mt-1">
            Upload Bench Candidates
          </h2>
          <p className="text-slate-500 text-xs">
            Accelerate placements in your hotlists. Seamlessly upload single or bulk consultant resumes to extract skill dimensions in real time.
          </p>
        </div>

        {/* Quick Simulation Actions */}
        <div className="flex items-center gap-2">
          <button 
            onClick={() => processMockFile("Candidate_Consultant.pdf", "1.4 MB")}
            className="px-3.5 py-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer transition-all"
          >
            <Plus className="h-3.5 w-3.5 text-[#1d4ed8]" />
            <span>Simulate Quick Resume Drop</span>
          </button>
        </div>
      </div>

      {/* 2. Top-tier OS Statistics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 bg-white rounded-2xl border border-slate-200/60 shadow-xs flex items-center gap-4">
          <div className="h-10 w-10 rounded-xl bg-[#1d4ed8]/10 text-[#1d4ed8] flex items-center justify-center font-mono font-bold text-lg">
            {totalBenchCount}
          </div>
          <div>
            <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 block font-bold">Total Active Bench</span>
            <strong className="text-[#0f172a] text-sm block">Vetted Consultants</strong>
          </div>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-slate-200/60 shadow-xs flex items-center gap-4">
          <div className="h-10 w-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-mono font-bold text-lg">
            {immediateAvailableCount}
          </div>
          <div>
            <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 block font-bold">Immediate Starts</span>
            <strong className="text-[#0f172a] text-sm block">Zero Clearance Latency</strong>
          </div>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-slate-200/60 shadow-xs flex items-center gap-4">
          <div className="h-10 w-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-mono font-bold text-lg">
            {averageConfidenceScore}%
          </div>
          <div>
            <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 block font-bold">AI Extraction Score</span>
            <strong className="text-[#0f172a] text-sm block">Precision Parsing V3</strong>
          </div>
        </div>

        <div className="p-4 bg-gradient-to-br from-[#1d4ed8] to-[#d4af37] rounded-2xl shadow-sm text-white flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[9px] uppercase font-mono tracking-widest text-[#f8fafc] font-bold">Operational Focus</span>
            <Sparkles className="h-3.5 w-3.5 text-[#eab308]" />
          </div>
          <div className="mt-2 text-xs">
            <p className="font-semibold text-[10px]">Autopilot Active</p>
            <span className="text-[#f1f5f9] text-[9.5px] leading-tight block mt-0.5">Matching uploaded benchmark skills automatically</span>
          </div>
        </div>
      </div>

      {/* 3. Drag Drop Zone & Live AI Parsing Previewer Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Drag Drop Card */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/60 shadow-xs p-6 space-y-5">
          <h3 className="font-display font-bold text-slate-900 text-sm flex items-center gap-2">
            <Upload className="h-4 w-4 text-[#1d4ed8]" />
            <span>Ingestion Pipeline</span>
          </h3>

          <div
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 cursor-pointer ${
              dragActive 
                ? 'border-[#1d4ed8] bg-[#1d4ed8]/5 scale-[0.99] ring-4 ring-[#d4af37]/20 shadow-md' 
                : 'border-slate-200 hover:border-[#1d4ed8] hover:bg-slate-50/50 hover:shadow-sm'
            }`}
          >
            <input 
              ref={fileInputRef}
              type="file" 
              accept=".pdf,.doc,.docx"
              className="hidden" 
              onChange={handleFileChange}
            />
            
            <div className="max-w-xs mx-auto space-y-3">
              <div className="h-12 w-12 rounded-xl bg-orange-50 text-[#d4af37] flex items-center justify-center mx-auto shadow-xs group-hover:scale-110 transition-transform">
                <Upload className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <p className="font-bold text-xs text-slate-800">Drag & drop candidate CVs or click to pick</p>
                <span className="text-[10px] text-slate-400 block">Accepted parameters: PDF, DOCX up to 12 MB. Supports Bulk processing simultaneously.</span>
              </div>
            </div>
          </div>

          {/* Live Ingress Progress Queue */}
          {uploadQueue.length > 0 && (
            <div className="space-y-3 border-t border-slate-100 pt-4">
              <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest block">Active Sourcing Feed ({uploadQueue.length})</span>
              <div className="space-y-2">
                {uploadQueue.map((file, idx) => (
                  <div 
                    key={idx} 
                    onClick={() => file.status === 'completed' && setSelectedParsedPreview(file)}
                    className={`p-3 border rounded-xl flex items-center justify-between gap-4 transition-all ${
                      file.status === 'completed' 
                        ? 'border-emerald-100 bg-emerald-50/20 cursor-pointer hover:border-[#d4af37] shadow-xs' 
                        : 'border-slate-150 bg-slate-50/50'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className={`p-2 rounded-lg ${file.status === 'completed' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-400'}`}>
                        {file.status === 'completed' ? (
                          <CheckCircle2 className="h-4 w-4" />
                        ) : (
                          <RefreshCw className="h-4 w-4 animate-spin" />
                        )}
                      </div>
                      <div className="truncate text-xs">
                        <strong className="block font-semibold text-slate-800 truncate">{file.name}</strong>
                        <span className="text-[9.5px] text-slate-400 block font-mono">Size: {file.size} • Status: <span className="uppercase text-[#1d4ed8] font-bold">{file.status}</span></span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      {file.status !== 'completed' && (
                        <div className="w-16 bg-slate-200 h-1.5 rounded-full overflow-hidden">
                          <div className="h-full bg-[#1d4ed8] rounded-full transition-all" style={{ width: `${file.progress}%` }}></div>
                        </div>
                      )}
                      
                      {file.status === 'completed' && (
                        <div className="text-right">
                          <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold font-mono px-2 py-0.5 rounded-lg border border-emerald-200 block">
                            {file.aiConfidence}% Score
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Preview Card: Structural AI Parsing Dossor Box */}
        <div className="lg:col-span-5">
          <AnimatePresence mode="wait">
            {selectedParsedPreview ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white rounded-2xl border border-slate-300/80 shadow-md p-5 space-y-4 ring-2 ring-[#d4af37]/25 relative"
              >
                <button 
                  onClick={() => setSelectedParsedPreview(null)}
                  className="absolute top-4 right-4 p-1 hover:bg-slate-100 rounded-lg text-slate-400 transition-colors cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>

                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-lg bg-indigo-50 text-[#1d4ed8] flex items-center justify-center">
                    <Sparkles className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-xs text-slate-900 uppercase tracking-wide">AI Extraction Complete!</h4>
                    <p className="text-[10px] text-slate-400">Preview generated for verification before committing bench seat</p>
                  </div>
                </div>

                {/* Extracted Form & Attributes block */}
                <div className="p-3 bg-slate-50 rounded-xl space-y-3 border border-slate-100 text-xs">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <span className="text-[9px] text-slate-400 font-mono block uppercase">Candidate Name</span>
                      <strong className="text-slate-800 font-bold block mt-0.5">{selectedParsedPreview.parsedProfile?.name}</strong>
                    </div>
                    <div>
                      <span className="text-[9px] text-slate-400 font-mono block uppercase">Engineering Track</span>
                      <strong className="text-slate-800 font-bold block mt-0.5">{selectedParsedPreview.parsedProfile?.role}</strong>
                    </div>
                  </div>

                  <div>
                    <span className="text-[9px] text-slate-400 font-mono block uppercase">Extracted Technology Blueprint</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {selectedParsedPreview.parsedProfile?.skills.map((skill, si) => (
                        <span key={si} className="bg-white border border-slate-200 text-[10px] text-slate-650 px-2 py-0.5 rounded-md font-mono font-medium">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <span className="text-[9px] text-slate-400 font-mono block uppercase">Years Experience Vetted</span>
                      <strong className="text-[#1d4ed8] font-bold block mt-0.5">{selectedParsedPreview.parsedProfile?.experience} Years</strong>
                    </div>
                    <div>
                      <span className="text-[9px] text-slate-400 font-mono block uppercase">Parsing Assurance Index</span>
                      <strong className="text-emerald-600 font-bold block mt-0.5">{(selectedParsedPreview.aiConfidence + 1.2).toFixed(1)}% Accurate</strong>
                    </div>
                  </div>
                </div>

                {/* Input Fields to route assignment */}
                <div className="space-y-3 pt-2">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block font-mono">Assign Vendor Partner</label>
                    <select 
                      value={selectedVendorForm}
                      onChange={(e) => setSelectedVendorForm(e.target.value)}
                      className="w-full mt-1 px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs outline-none focus:border-indigo-500 text-slate-700 font-semibold"
                    >
                      <option value="Synapse Sourcing">Synapse Sourcing</option>
                      <option value="Pacific Tech Consultants">Pacific Tech Consultants</option>
                      <option value="NextGen Staffing Corp">NextGen Staffing Corp</option>
                      <option value="Apex Talent Consortium">Apex Talent Consortium</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block font-mono">Current Availability status</label>
                    <select 
                      value={availabilityForm}
                      onChange={(e: any) => setAvailabilityForm(e.target.value)}
                      className="w-full mt-1 px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs outline-none focus:border-indigo-500 text-slate-700 font-semibold"
                    >
                      <option value="Immediate">Immediate Availability</option>
                      <option value="2 Weeks">2 Weeks Notice</option>
                      <option value="1 Month">1 Month Notice</option>
                      <option value="Active Interviewing">Active Interviewing and Offers</option>
                    </select>
                  </div>
                </div>

                {/* Actions to proceed with the profile */}
                <div className="grid grid-cols-2 gap-2 pt-2">
                  <button
                    onClick={() => {
                      // Call deep link passing extracted profile details
                      onNavigateToReview({
                        name: selectedParsedPreview.parsedProfile?.name,
                        role: selectedParsedPreview.parsedProfile?.role,
                        skills: selectedParsedPreview.parsedProfile?.skills,
                        experience: selectedParsedPreview.parsedProfile?.experience,
                        aiScore: selectedParsedPreview.aiConfidence,
                        vendorName: selectedVendorForm,
                        availability: availabilityForm
                      });
                    }}
                    className="py-2 px-3 border border-slate-205 hover:bg-slate-50 rounded-xl text-xs font-bold text-slate-650 flex items-center justify-center gap-1 cursor-pointer transition-all"
                  >
                    <span>Refine on Match Desk</span>
                    <ArrowRight className="h-3 w-3" />
                  </button>

                  <button
                    onClick={() => commitPreviewCandidateToBench(selectedParsedPreview)}
                    className="py-2 px-3 btn-royal-gold text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <Check className="h-3.5 w-3.5" />
                    <span>Commit to Hot List</span>
                  </button>
                </div>
              </motion.div>
            ) : (
              <div className="bg-[#f8fafc]/50 rounded-2xl border-2 border-dashed border-slate-200 p-8 text-center flex flex-col justify-center h-full min-h-[300px]">
                <Cpu className="h-8 w-8 text-slate-350 mx-auto animate-pulse" />
                <h4 className="font-display font-medium text-slate-500 text-xs uppercase tracking-wider mt-3">Ready for Neural Parsing</h4>
                <p className="text-[10px] text-slate-400 max-w-xs mx-auto mt-1 leading-relaxed">
                  Select or drag a CV on the left coordinate field. BenMyl will extract key vectors, experiences, missing criteria, and preview the profile index instantly.
                </p>
              </div>
            )}
          </AnimatePresence>
        </div>

      </div>

      {/* 4. Bench Candidate Table & Sifting Bar */}
      <div className="bg-white rounded-2xl border border-slate-200/60 shadow-xs p-5 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="font-display font-bold text-slate-900 text-sm">Vetted Bench Inventory</h3>
            <p className="text-slate-400 text-xs">Total list indexed in this workspace</p>
          </div>

          {/* Table Search & Dynamic Filtres bar */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative flex items-center">
              <Search className="h-3.5 w-3.5 absolute left-3 text-slate-400" />
              <input
                type="text"
                placeholder="Search candidates/skills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-[#1d4ed8] focus:bg-white w-48 text-indigo-950"
              />
            </div>

            {/* Tech filter dropdown */}
            <select
              value={techFilter}
              onChange={(e) => setTechFilter(e.target.value)}
              className="px-2 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-650 font-semibold outline-none focus:border-[#1d4ed8]"
            >
              <option value="All">All Tech</option>
              {availableTechnologies.filter(t => t !== 'All').map((tech, ti) => (
                <option key={ti} value={tech}>{tech}</option>
              ))}
            </select>

            {/* Partner Vendor filter */}
            <select
              value={vendorFilter}
              onChange={(e) => setVendorFilter(e.target.value)}
              className="px-2 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-650 font-semibold outline-none focus:border-[#1d4ed8]"
            >
              <option value="All">All Vendors</option>
              {availableVendors.filter(v => v !== 'All').map((ven, vi) => (
                <option key={vi} value={ven}>{ven}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Core Ingress Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-100 text-[10px] font-mono text-slate-400 uppercase tracking-widest font-bold">
                <th className="py-3 px-4">CANDIDATE CONSULTANT</th>
                <th className="py-3 px-4">ASSIGNED VENDOR</th>
                <th className="py-3 px-4">AVAILABILITY</th>
                <th className="py-3 px-4 text-center">EXPERIENCE</th>
                <th className="py-3 px-4 text-center">AI MATCH RATIO</th>
                <th className="py-3 px-4 text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {filteredCandidates.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-400">
                    No matching hot bench profiles identified for the active parameters.
                  </td>
                </tr>
              ) : (
                filteredCandidates.map((cand) => (
                  <tr key={cand.id} className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
                    <td className="py-3 px-4">
                      <div className="space-y-0.5">
                        <strong className="text-slate-850 block">{cand.name}</strong>
                        <span className="text-[10px] text-slate-500 font-mono tracking-wide block">{cand.role}</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {cand.skills.slice(0, 4).map((sk, sidx) => (
                            <span key={sidx} className="bg-slate-100 text-slate-500 font-mono text-[9px] px-1.5 py-0.2 rounded">
                              {sk}
                            </span>
                          ))}
                          {cand.skills.length > 4 && (
                            <span className="text-slate-400 text-[9px] font-mono font-medium">+{cand.skills.length - 4} more</span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 font-semibold text-slate-650">
                      <div className="flex items-center gap-1.5">
                        <Building className="h-3.5 w-3.5 text-slate-400" />
                        <span>{cand.vendorName}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        cand.availability === 'Immediate' 
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' 
                          : 'bg-indigo-50 text-indigo-700 border border-indigo-100'
                      }`}>
                        {cand.availability}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center font-mono font-bold text-slate-700">
                      {cand.experience} Years
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className="inline-block bg-[#1d4ed8]/5 text-[#1d4ed8] border border-[#1d4ed8]/20 font-bold px-2 py-0.5 rounded-lg font-mono">
                        {cand.aiScore}%
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => onNavigateToReview(cand)}
                          className="px-2 py-1 bg-slate-100 hover:bg-[#d4af37]/20 border border-slate-200 text-slate-700 hover:text-slate-900 rounded-lg text-[10px] font-bold transition-all cursor-pointer"
                        >
                          Review Resume
                        </button>
                        <button
                          onClick={() => onNavigateToJobs(cand)}
                          className="px-2.5 py-1 btn-[#1d4ed8] btn-royal-gold text-white rounded-lg text-[10px] font-bold transition-all cursor-pointer"
                        >
                          Find Jobs
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}

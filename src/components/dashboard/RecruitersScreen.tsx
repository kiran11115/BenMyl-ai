/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, 
  Search, 
  SlidersHorizontal, 
  Plus, 
  X, 
  TrendingUp, 
  Cpu, 
  Trophy, 
  Clock, 
  Layers, 
  ChevronRight, 
  Mail, 
  Phone, 
  ShieldAlert, 
  CheckCircle,
  FileText,
  UserCheck,
  Upload,
  Check,
  Sparkles,
  RefreshCw,
  Sliders,
  FileDown,
  AlertCircle,
  Linkedin
} from 'lucide-react';

interface Recruiter {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'Active' | 'Paused' | 'Reviewing';
  submissions: number;
  interviews: number;
  placements: number;
  aiScore: number;
  joinedDate: string;
  bio: string;
  linkedinUrl?: string;
}

// Simulated active performance metrics data over time for recruiters
const RECRUITER_PERFORMANCE_DATA: Record<string, { period: string; submissions: number; interviews: number; placements: number }[]> = {
  'REC-001': [
    { period: 'Jan 26', submissions: 20, interviews: 6, placements: 1 },
    { period: 'Feb 26', submissions: 28, interviews: 10, placements: 3 },
    { period: 'Mar 26', submissions: 32, interviews: 11, placements: 3 },
    { period: 'Apr 26', submissions: 34, interviews: 12, placements: 4 },
    { period: 'May 26', submissions: 28, interviews: 9, placements: 3 },
  ],
  'REC-002': [
    { period: 'Jan 26', submissions: 15, interviews: 3, placements: 1 },
    { period: 'Feb 26', submissions: 20, interviews: 5, placements: 2 },
    { period: 'Mar 26', submissions: 22, interviews: 5, placements: 1 },
    { period: 'Apr 26', submissions: 25, interviews: 5, placements: 2 },
    { period: 'May 26', submissions: 16, interviews: 4, placements: 2 },
  ],
  'REC-003': [
    { period: 'Jan 26', submissions: 18, interviews: 5, placements: 2 },
    { period: 'Feb 26', submissions: 22, interviews: 6, placements: 2 },
    { period: 'Mar 26', submissions: 25, interviews: 8, placements: 3 },
    { period: 'Apr 26', submissions: 25, interviews: 7, placements: 2 },
    { period: 'May 26', submissions: 20, interviews: 5, placements: 2 },
  ],
  'REC-004': [
    { period: 'Jan 26', submissions: 5, interviews: 1, placements: 0 },
    { period: 'Feb 26', submissions: 8, interviews: 2, placements: 1 },
    { period: 'Mar 26', submissions: 10, interviews: 3, placements: 1 },
    { period: 'Apr 26', submissions: 12, interviews: 4, placements: 1 },
    { period: 'May 26', submissions: 7, interviews: 2, placements: 0 },
  ],
  'REC-005': [
    { period: 'Jan 26', submissions: 0, interviews: 0, placements: 0 },
    { period: 'Feb 26', submissions: 1, interviews: 0, placements: 0 },
    { period: 'Mar 26', submissions: 3, interviews: 0, placements: 0 },
    { period: 'Apr 26', submissions: 4, interviews: 1, placements: 0 },
    { period: 'May 26', submissions: 4, interviews: 1, placements: 0 },
  ],
};

export default function RecruitersScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [selectedRecruiter, setSelectedRecruiter] = useState<Recruiter | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // Chart Interactive Sub-States settings
  const [chartRecruiterId, setChartRecruiterId] = useState<string>('All');
  const [chartMetric, setChartMetric] = useState<'all' | 'submissions' | 'interviews' | 'placements'>('all');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Initial mockup recruits list
  const [recruiters, setRecruiters] = useState<Recruiter[]>([
    { id: 'REC-001', name: 'Samantha Chen', email: 'samantha.c@benmyl.ai', phone: '+1 (555) 0192', status: 'Active', submissions: 142, interviews: 48, placements: 14, aiScore: 98, joinedDate: '2025-01-14', bio: 'Expert recruiters leader with focused experience in recruiting React and Core Engineering profiles.', linkedinUrl: 'https://linkedin.com/in/samantha-chen' },
    { id: 'REC-002', name: 'James Carter', email: 'j.carter@benmyl.ai', phone: '+1 (555) 0482', status: 'Active', submissions: 98, interviews: 22, placements: 8, aiScore: 89, joinedDate: '2025-03-22', bio: 'Specialist recruiter tracking Cloud, DevOps, Infrastructure architecture candidates.', linkedinUrl: 'https://linkedin.com/in/james-carter' },
    { id: 'REC-003', name: 'Emily Robinson', email: 'emily.r@benmyl.ai', phone: '+1 (555) 0841', status: 'Active', submissions: 110, interviews: 31, placements: 11, aiScore: 94, joinedDate: '2025-02-10', bio: 'Staffing manager covering executive search & program managers listings.', linkedinUrl: 'https://linkedin.com/in/emily-robinson' },
    { id: 'REC-004', name: 'David Zhang', email: 'd.zhang@benmyl.ai', phone: '+1 (555) 0912', status: 'Paused', submissions: 42, interviews: 12, placements: 3, aiScore: 78, joinedDate: '2025-05-01', bio: 'Junior recruiter. Transitioning to full-desk sourcing workflow.', linkedinUrl: 'https://linkedin.com/in/david-zhang' },
    { id: 'REC-005', name: 'Chloe Vance', email: 'chloe.v@benmyl.ai', phone: '+1 (555) 0381', status: 'Reviewing', submissions: 12, interviews: 2, placements: 0, aiScore: 65, joinedDate: '2026-04-18', bio: 'Dispatched sourcing assistant on-trial.', linkedinUrl: 'https://linkedin.com/in/chloe-vance' }
  ]);

  // Form Fields State
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newBio, setNewBio] = useState('');
  const [newLinkedinUrl, setNewLinkedinUrl] = useState('');

  // Bench Sourcing Hub state variables
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [isParsing, setIsParsing] = useState(false);
  const [isParsed, setIsParsed] = useState(false);
  const [parsingStep, setParsingStep] = useState('');
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);
  const [exportSuccess, setExportSuccess] = useState(false);
  const [evaluatingRecruiterId, setEvaluatingRecruiterId] = useState('REC-001');
  const [recruiterNotes, setRecruiterNotes] = useState('This consultant demonstrated high-quality architectural responses in our mock technical test. Recommended for immediate prime vendor dispatch.');
  
  // Parsed Profile schema
  const [parsedProfile, setParsedProfile] = useState<{
    name: string;
    role: string;
    skills: string[];
    exp: number;
    rate: string;
    location: string;
    visaStatus: string;
    vendorScore: number;
    brief: string;
  } | null>(null);

  const handleAddNewRecruiter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newEmail) return;

    const newRec: Recruiter = {
      id: `REC-00${recruiters.length + 1}`,
      name: newName,
      email: newEmail,
      phone: newPhone || '+1 (555) 0100',
      status: 'Active',
      submissions: 0,
      interviews: 0,
      placements: 0,
      aiScore: 85, // Default onboarding baseline score
      joinedDate: new Date().toISOString().split('T')[0],
      bio: newBio || 'AI-Onboarded custom team matching scout role.',
      linkedinUrl: newLinkedinUrl
    };

    setRecruiters([newRec, ...recruiters]);
    setNewName('');
    setNewEmail('');
    setNewPhone('');
    setNewBio('');
    setNewLinkedinUrl('');
    setShowAddModal(false);
  };

  const PRESET_PROFILES = [
    {
      name: 'Clara Vance',
      role: 'Senior Full Stack React Engineer',
      skills: ['React 19', 'TailwindCSS', 'TypeScript', 'Redux Toolkit', 'Vite'],
      exp: 7,
      rate: '$90/hr',
      location: 'Dallas, TX (Remote)',
      visaStatus: 'US Citizen',
      vendorScore: 96,
      brief: 'Exceptional frontend specialist with extensive layout proficiency and responsive performance expertise.'
    },
    {
      name: 'Ethan Vance',
      role: 'Staff AWS/Kubernetes DevOps Specialist',
      skills: ['Terraform', 'Kubernetes', 'AWS Cloud', 'Linux Shell', 'GitHub Actions'],
      exp: 10,
      rate: '$115/hr',
      location: 'Seattle, WA',
      visaStatus: 'GC-EAD',
      vendorScore: 95,
      brief: 'Senior Site Reliability architect expert in containerizing micro-service clusters and multi-tier databases.'
    },
    {
      name: 'Srinivasan Naidu',
      role: 'Principal Cloud Java Developer',
      skills: ['Java 21', 'Spring Boot', 'Apache Kafka', 'PostgreSQL', 'Docker'],
      exp: 8,
      rate: '$80/hr',
      location: 'Atlanta, GA (Hybrid)',
      visaStatus: 'H1B (Transfer Capable)',
      vendorScore: 92,
      brief: 'Enterprise backend veteran with focused knowledge in event-streaming patterns and asynchronous database sharding.'
    }
  ];

  const triggerParsingSimulate = (fileName: string, presetIndex: number | null) => {
    setUploadedFileName(fileName);
    setIsParsing(true);
    setIsParsed(false);
    setExportSuccess(false);
    setParsingStep('Initializing OCR text translation engine & sanitizing document structure...');
    
    setTimeout(() => {
      setParsingStep('Translating key tech tokens, cross-referencing industry skill taxonomy...');
    }, 600);

    setTimeout(() => {
      setParsingStep('Verifying visa eligibility credentials & evaluating target rate parameters...');
    }, 1200);

    setTimeout(() => {
      setIsParsing(false);
      setIsParsed(true);
      if (presetIndex !== null) {
        const preset = PRESET_PROFILES[presetIndex];
        setParsedProfile(preset);
      } else {
        const cleanName = fileName.substring(0, fileName.lastIndexOf('.')) || fileName;
        const fakeName = cleanName.replace(/_/g, ' ').replace(/-/g, ' ');
        const randomSkills = ['React', 'TypeScript', 'Node.js', 'Kubernetes', 'Python', 'AWS', 'Go', 'GCP'].sort(() => 0.5 - Math.random()).slice(0, 4);
        setParsedProfile({
          name: fakeName.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
          role: 'Full Stack Staff Consultant',
          skills: randomSkills,
          exp: Math.floor(Math.random() * 6) + 5,
          rate: `$${Math.floor(Math.random() * 40) + 75}/hr`,
          location: 'San Francisco, CA (Remote)',
          visaStatus: 'US Citizen',
          vendorScore: Math.floor(Math.random() * 15) + 84,
          brief: 'AI parsed consultant profile demonstrating expert versatility across core web infrastructures.'
        });
      }
    }, 1800);
  };

  const handleCustomFileUploadSimulate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    triggerParsingSimulate(f.name, null);
  };

  const handleExportToBenchList = () => {
    if (!parsedProfile) return;
    
    const cached = localStorage.getItem('benmyl_bench_list');
    let currentBench: any[] = [];
    if (cached) {
      try { currentBench = JSON.parse(cached); } catch(e) { }
    } else {
      currentBench = [
        { id: 'BC-109', name: 'Nolan Vance', role: 'Staff Front End Engineer', skills: ['React', 'TypeScript', 'Node.js', 'Next.js'], exp: 8, rate: '$85/hr', status: 'Marketable', visaStatus: 'US Citizen', location: 'Austin, TX', vendorScore: 98 },
        { id: 'BC-203', name: 'Zoe Sterling', role: 'Senior AWS DevOps Architect', skills: ['Terraform', 'Kubernetes', 'GCP', 'AWS', 'Python'], exp: 9, rate: '$105/hr', status: 'In Interview', visaStatus: 'H1B (Transferable)', location: 'New York, NY (Hybrid)', vendorScore: 92 },
        { id: 'BC-304', name: 'Aarav Patel', role: 'Full Stack Java Engineer', skills: ['Java 21', 'Spring Boot', 'Kafka', 'React', 'MongoDB'], exp: 6, rate: '$75/hr', status: 'Marketable', visaStatus: 'GC-EAD', location: 'San Jose, CA', vendorScore: 94 },
        { id: 'BC-402', name: 'Isabella Ricci', role: 'Core Machine Learning Engineer', skills: ['Python', 'PyTorch', 'TensorFlow', 'LLMs', 'SQL'], exp: 7, rate: '$120/hr', status: 'Awaiting Offer', visaStatus: 'L2-EAD', location: 'Remote', vendorScore: 97 },
        { id: 'BC-501', name: 'Brandon Cole', role: 'Lead Angular Architect', skills: ['Angular 17', 'TypeScript', 'RxJS', 'NgRx', 'Node'], exp: 11, rate: '$90/hr', status: 'Placed', visaStatus: 'US Citizen', location: 'Denver, CO (Remote)', vendorScore: 86 }
      ];
    }

    const newCandId = 'BC-' + Math.floor(Math.random() * 400 + 100);
    const newCand = {
      id: newCandId,
      name: parsedProfile.name,
      role: parsedProfile.role,
      skills: parsedProfile.skills,
      exp: parsedProfile.exp,
      rate: parsedProfile.rate,
      status: 'Marketable',
      visaStatus: parsedProfile.visaStatus,
      location: parsedProfile.location,
      vendorScore: parsedProfile.vendorScore
    };

    const updatedBench = [newCand, ...currentBench];
    localStorage.setItem('benmyl_bench_list', JSON.stringify(updatedBench));
    
    const updatedRecruiters = recruiters.map(r => {
      if (r.id === evaluatingRecruiterId) {
        return {
          ...r,
          submissions: r.submissions + 1,
          aiScore: Math.min(r.aiScore + 1, 100)
        };
      }
      return r;
    });
    setRecruiters(updatedRecruiters);

    setExportSuccess(true);
    setTimeout(() => {
      setExportSuccess(false);
      setUploadedFileName(null);
      setIsParsed(false);
      setParsedProfile(null);
    }, 4500);
  };

  const filteredRecruiters = recruiters.filter(r => {
    const matchesSearch = r.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          r.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          r.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'All' || r.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // Calculate quick totals
  const totalSubmissions = recruiters.reduce((sum, r) => sum + r.submissions, 0);
  const totalPlacements = recruiters.reduce((sum, r) => sum + r.placements, 0);
  const avgAiScore = Math.round(recruiters.reduce((sum, r) => sum + r.aiScore, 0) / recruiters.length);

  // Dynamic Recruiter Performance over time compilation
  const getPerformanceDataForRecruiter = (recId: string) => {
    if (recId === 'All') {
      const periods = ['Jan 26', 'Feb 26', 'Mar 26', 'Apr 26', 'May 26'];
      return periods.map(p => {
        let submissions = 0;
        let interviews = 0;
        let placements = 0;
        recruiters.forEach(r => {
          const hist = RECRUITER_PERFORMANCE_DATA[r.id] || [
            { period: 'Jan 26', submissions: Math.round(r.submissions * 0.15), interviews: Math.round(r.interviews * 0.15), placements: Math.round(r.placements * 0.15) },
            { period: 'Feb 26', submissions: Math.round(r.submissions * 0.20), interviews: Math.round(r.interviews * 0.20), placements: Math.round(r.placements * 0.20) },
            { period: 'Mar 26', submissions: Math.round(r.submissions * 0.25), interviews: Math.round(r.interviews * 0.25), placements: Math.round(r.placements * 0.25) },
            { period: 'Apr 26', submissions: Math.round(r.submissions * 0.22), interviews: Math.round(r.interviews * 0.22), placements: Math.round(r.placements * 0.22) },
            { period: 'May 26', submissions: Math.round(r.submissions * 0.18), interviews: Math.round(r.interviews * 0.18), placements: Math.round(r.placements * 0.18) },
          ];
          const pt = hist.find(h => h.period === p);
          if (pt) {
            submissions += pt.submissions;
            interviews += pt.interviews;
            placements += pt.placements;
          }
        });
        return { period: p, submissions, interviews, placements };
      });
    } else {
      const r = recruiters.find(rec => rec.id === recId);
      if (!r) return [];
      const hist = RECRUITER_PERFORMANCE_DATA[recId];
      if (hist) {
        return hist;
      } else {
        return [
          { period: 'Jan 26', submissions: Math.round(r.submissions * 0.12), interviews: Math.round(r.interviews * 0.12), placements: Math.round(r.placements * 0.12) },
          { period: 'Feb 26', submissions: Math.round(r.submissions * 0.18), interviews: Math.round(r.interviews * 0.18), placements: Math.round(r.placements * 0.18) },
          { period: 'Mar 26', submissions: Math.round(r.submissions * 0.28), interviews: Math.round(r.interviews * 0.28), placements: Math.round(r.placements * 0.28) },
          { period: 'Apr 26', submissions: Math.round(r.submissions * 0.24), interviews: Math.round(r.interviews * 0.24), placements: Math.round(r.placements * 0.24) },
          { period: 'May 26', submissions: Math.round(r.submissions * 0.18), interviews: Math.round(r.interviews * 0.18), placements: Math.round(r.placements * 0.18) },
        ];
      }
    }
  };

  const activeChartData = getPerformanceDataForRecruiter(chartRecruiterId);
  
  // Grid layout geometry for custom SVG chart
  const chartHeight = 140;
  const chartOffsetY = 20; // y-start at 20, y-end at 160
  const chartWidth = 480;
  const chartOffsetX = 50; // x-start at 50, x-end at 530

  const unifiedMax = Math.max(...activeChartData.map(d => Math.max(d.submissions, d.interviews, d.placements)), 12);

  const points = activeChartData.map((d, index) => {
    const x = chartOffsetX + (index * (chartWidth / (activeChartData.length - 1 || 1)));
    const ySub = chartOffsetY + chartHeight - (unifiedMax > 0 ? (d.submissions / unifiedMax) * chartHeight : 0);
    const yInt = chartOffsetY + chartHeight - (unifiedMax > 0 ? (d.interviews / unifiedMax) * chartHeight : 0);
    const yPlc = chartOffsetY + chartHeight - (unifiedMax > 0 ? (d.placements / unifiedMax) * chartHeight : 0);
    return { x, ySub, yInt, yPlc, ...d };
  });

  return (
    <div className="space-y-6 pb-12 relative">
      
      {/* Title Header split */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-display font-bold text-slate-900">Recruiters Management Engine</h2>
          <p className="text-slate-400 text-xs">Verify recruiter submissions, scoreboards, and administrative status thresholds</p>
        </div>

        <button 
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold shadow-lg glow-accent flex items-center gap-2 transition-all cursor-pointer self-start sm:self-auto"
        >
          <Plus className="h-4 w-4" />
          <span>Provision Recruiter</span>
        </button>
      </div>

      {/* Recruiter Activity Score Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl border border-slate-200/60 p-4 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-mono font-bold text-slate-400">Aggregated Submissions</span>
            <h3 className="text-xl font-display font-bold text-slate-900">{totalSubmissions}</h3>
            <p className="text-[9px] text-slate-400">Across active & trial pipelines</p>
          </div>
          <div className="p-3 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-500 shrink-0">
            <Layers className="h-5 w-5" />
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/60 p-4 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-mono font-bold text-slate-400">Total Placements</span>
            <h3 className="text-xl font-display font-bold text-slate-900">{totalPlacements}</h3>
            <p className="text-[9px] text-emerald-600 font-semibold">+4 Net this week</p>
          </div>
          <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-500 shrink-0">
            <Trophy className="h-5 w-5" />
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/60 p-4 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-mono font-bold text-slate-400">Avg Recruiter AI Score</span>
            <h3 className="text-xl font-display font-bold text-slate-900">{avgAiScore}%</h3>
            <p className="text-[9px] text-indigo-500 flex items-center gap-1">
              <Cpu className="h-3 w-3" /> Optimum Quality Index
            </p>
          </div>
          <div className="p-3 rounded-xl bg-purple-50 border border-purple-100 text-purple-500 shrink-0">
            <Cpu className="h-5 w-5 animate-pulse" />
          </div>
        </div>
      </div>

      {/* RECRUITERS INTUITIVE PERFORMANCE INTELLIGENCE CANVAS (Dark Blue with Gold) */}
      <div className="bg-gradient-to-r from-slate-900 to-indigo-950 border border-slate-800 rounded-3xl p-5 shadow-xl relative overflow-hidden text-white space-y-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-indigo-500 animate-ping" />
              <h3 className="font-display font-bold text-sm lg:text-base text-white">Recruiters Performance Sourcing Analytics</h3>
            </div>
            <p className="text-[11px] text-slate-300">Live analytics mapping recruiters submissions, interviews rate, and cumulative placements yield metrics over time</p>
          </div>
          
          <div className="flex flex-wrap items-center gap-2 text-xs">
            {/* Dropdown list */}
            <div className="flex items-center gap-1.5 bg-slate-800/80 p-1.5 rounded-xl border border-slate-700/60">
              <span className="text-[9px] font-mono uppercase tracking-wider text-slate-400 px-1">Agent Focus:</span>
              <select 
                value={chartRecruiterId}
                onChange={(e) => setChartRecruiterId(e.target.value)}
                className="bg-slate-900 text-amber-500 font-semibold border-none rounded-lg p-0.5 px-1.5 focus:ring-1 focus:ring-amber-500 outline-none cursor-pointer"
              >
                <option value="All">All Active Team (Aggregated)</option>
                {recruiters.map(r => (
                  <option key={r.id} value={r.id}>{r.name} ({r.id})</option>
                ))}
              </select>
            </div>

            {/* Metric pill controls */}
            <div className="flex bg-slate-800/80 p-1 rounded-xl border border-slate-700/60">
              {(['all', 'submissions', 'interviews', 'placements'] as const).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setChartMetric(m)}
                  className={`px-2.5 py-1 text-[10px] font-bold rounded-lg capitalize transition-all cursor-pointer ${
                    chartMetric === m 
                      ? 'bg-amber-505 text-slate-950 bg-amber-500 font-extrabold shadow-sm' 
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
          
          {/* Main SVG Graph */}
          <div className="lg:col-span-8 relative bg-slate-950/80 p-4 rounded-2xl border border-slate-800/50 flex flex-col justify-between">
            
            {/* Legends */}
            <div className="flex items-center gap-4 text-[9.5px] font-mono text-slate-300 pb-2 border-b border-white/5">
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-amber-500" />
                Submissions Sourced
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-indigo-400" />
                Technical Interviews
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                Placements Closed
              </span>
            </div>

            {/* Trend Canvas wrapper */}
            <div className="h-48 relative mt-3">
              <svg className="w-full h-full" viewBox="0 0 540 180" preserveAspectRatio="none">
                {/* Horizontal mesh grids */}
                {[0, 1, 2, 3, 4].map((grid, gIdx) => {
                  const yGrid = chartOffsetY + (gIdx * (chartHeight / 4));
                  const gridVal = Math.round(unifiedMax - (gIdx * (unifiedMax / 4)));
                  return (
                    <g key={grid}>
                      <line 
                        x1={chartOffsetX} 
                        y1={yGrid} 
                        x2={chartOffsetX + chartWidth} 
                        y2={yGrid} 
                        stroke="rgba(255, 255, 255, 0.05)" 
                        strokeWidth="1" 
                      />
                      <text 
                        x={chartOffsetX - 10} 
                        y={yGrid + 3} 
                        fill="rgba(255, 255, 255, 0.4)" 
                        fontSize="8" 
                        fontFamily="monospace" 
                        textAnchor="end"
                      >
                        {gridVal}
                      </text>
                    </g>
                  );
                })}

                {/* X labels */}
                {points.map((pt, index) => (
                  <text
                    key={index}
                    x={pt.x}
                    y={chartOffsetY + chartHeight + 14}
                    fill="rgba(255, 255, 255, 0.4)"
                    fontSize="8.5"
                    fontFamily="monospace"
                    textAnchor="middle"
                  >
                    {pt.period}
                  </text>
                ))}

                {/* Chart trend fills & stroke nodes */}
                {(chartMetric === 'all' || chartMetric === 'submissions') && (
                  <>
                    <path 
                      d={`M ${points[0].x},${chartOffsetY + chartHeight} ${points.map(pt => `L ${pt.x},${pt.ySub}`).join(' ')} L ${points[points.length - 1].x},${chartOffsetY + chartHeight} Z`}
                      fill="url(#goldGrad)"
                      opacity="0.08"
                    />
                    <path 
                      d={points.map((pt, idx) => `${idx === 0 ? 'M' : 'L'} ${pt.x},${pt.ySub}`).join(' ')}
                      fill="none"
                      stroke="#f59e0b" // amber-500
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                  </>
                )}

                {(chartMetric === 'all' || chartMetric === 'interviews') && (
                  <path 
                    d={points.map((pt, idx) => `${idx === 0 ? 'M' : 'L'} ${pt.x},${pt.yInt}`).join(' ')}
                    fill="none"
                    stroke="#818cf8" // indigo-400
                    strokeWidth="2"
                    strokeDasharray="4 3"
                    strokeLinecap="round"
                  />
                )}

                {(chartMetric === 'all' || chartMetric === 'placements') && (
                  <path 
                    d={points.map((pt, idx) => `${idx === 0 ? 'M' : 'L'} ${pt.x},${pt.yPlc}`).join(' ')}
                    fill="none"
                    stroke="#34d399" // emerald-400
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                )}

                {/* Hover vertical timeline highlight bar line */}
                {hoveredIndex !== null && (
                  <line 
                    x1={points[hoveredIndex].x} 
                    y1={chartOffsetY} 
                    x2={points[hoveredIndex].x} 
                    y2={chartOffsetY + chartHeight} 
                    stroke="#f59e0b" 
                    strokeWidth="1.2" 
                    strokeDasharray="3 3"
                    opacity="0.7"
                  />
                )}

                {/* Mini Circle point shapes */}
                {points.map((pt, index) => {
                  const isHovered = hoveredIndex === index;
                  return (
                    <g key={index}>
                      {(chartMetric === 'all' || chartMetric === 'submissions') && (
                        <circle 
                          cx={pt.x} 
                          cy={pt.ySub} 
                          r={isHovered ? 5.5 : 3.5} 
                          fill="#f59e0b" 
                          stroke="#020617" 
                          strokeWidth="1.5"
                          className="transition-all duration-150"
                        />
                      )}
                      
                      {(chartMetric === 'all' || chartMetric === 'interviews') && (
                        <circle 
                          cx={pt.x} 
                          cy={pt.yInt} 
                          r={isHovered ? 5 : 3} 
                          fill="#818cf8" 
                          stroke="#020617" 
                          strokeWidth="1.5"
                          className="transition-all duration-150"
                        />
                      )}

                      {(chartMetric === 'all' || chartMetric === 'placements') && (
                        <circle 
                          cx={pt.x} 
                          cy={pt.yPlc} 
                          r={isHovered ? 6 : 4} 
                          fill="#34d399" 
                          stroke="#020617" 
                          strokeWidth="1.5"
                          className="transition-all duration-150"
                        />
                      )}

                      {/* Invisible pointer hover capture blocks */}
                      <rect 
                        x={pt.x - 20}
                        y={chartOffsetY}
                        width="40"
                        height={chartHeight}
                        fill="transparent"
                        className="cursor-pointer"
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                      />
                    </g>
                  );
                })}

                <defs>
                  <linearGradient id="goldGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Absolutely positioned html tooltip */}
              {hoveredIndex !== null && (
                <div 
                  className="absolute z-10 bg-slate-900/95 border border-amber-500/30 rounded-xl p-2.5 shadow-xl backdrop-blur-md min-w-[150px] pointer-events-none"
                  style={{
                    left: `${Math.min(points[hoveredIndex].x - 10, 360)}px`,
                    top: `15px`
                  }}
                >
                  <p className="text-[9px] font-mono text-amber-500 font-extrabold uppercase tracking-widest border-b border-white/5 pb-1">
                    Snapshot: {points[hoveredIndex].period}
                  </p>
                  <div className="space-y-1.5 mt-2 font-mono text-[10.5px] text-slate-200">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Submissions:</span>
                      <span className="font-bold text-amber-400">{points[hoveredIndex].submissions}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Interviews:</span>
                      <span className="font-bold text-indigo-300">{points[hoveredIndex].interviews}</span>
                    </div>
                    <div className="flex justify-between border-b border-white/5 pb-1">
                      <span className="text-slate-400">Placements:</span>
                      <span className="font-bold text-emerald-400">{points[hoveredIndex].placements}</span>
                    </div>
                    <div className="flex justify-between text-[9px] pt-1 text-slate-350">
                      <span>Conv. Ratio:</span>
                      <span className="font-bold text-slate-100">
                        {points[hoveredIndex].submissions > 0 ? Math.round((points[hoveredIndex].interviews / points[hoveredIndex].submissions) * 100) : 0}%
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Intelligence summary panel on the right */}
          <div className="lg:col-span-4 bg-slate-900/40 p-4 rounded-2xl border border-slate-800/80 space-y-3.5 self-stretch flex flex-col justify-between">
            <div className="space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold block pb-1 border-b border-slate-800">
                AI MATCH DIAGNOSTIC
              </span>
              
              <div>
                <span className="text-[10px] text-slate-400 block font-mono">ACTIVE SELECTION INDEX:</span>
                <strong className="text-xs text-amber-500 font-display">
                  {chartRecruiterId === 'All' ? 'AGGREGATED TEAM METRICS' : recruiters.find(r => r.id === chartRecruiterId)?.name}
                </strong>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs text-slate-300">
                  <span>Hiring Sourcing Yield:</span>
                  <span className="font-mono text-emerald-400 font-bold">
                    {chartRecruiterId === 'All' 
                      ? `${Math.round((totalPlacements / (totalSubmissions || 1)) * 100)}% Conversion`
                      : `${Math.round(((recruiters.find(rec => rec.id === chartRecruiterId)?.placements ?? 0) / (recruiters.find(rec => rec.id === chartRecruiterId)?.submissions ?? 1)) * 100)}% Yield`
                    }
                  </span>
                </div>
                <div className="w-full h-1.5 bg-slate-950 rounded-full mt-1 overflow-hidden">
                  <div 
                    className="h-full bg-emerald-400 rounded-full" 
                    style={{ 
                      width: chartRecruiterId === 'All'
                        ? `${Math.max(10, Math.round((totalPlacements / (totalSubmissions || 1)) * 100))}%`
                        : `${Math.max(10, Math.round(((recruiters.find(rec => rec.id === chartRecruiterId)?.placements ?? 0) / (recruiters.find(rec => rec.id === chartRecruiterId)?.submissions ?? 1)) * 100))}%`
                    }} 
                  />
                </div>
              </div>
            </div>

            <div className="p-3 bg-black/30 rounded-xl border border-slate-800/70 text-[10px] text-slate-300 leading-relaxed font-sans space-y-1">
              <div className="flex items-center gap-1.5 text-amber-500 font-semibold mb-1">
                <Cpu className="h-3.5 w-3.5" />
                <span>Diagnostic Assessment</span>
              </div>
              <span>
                {chartRecruiterId === 'All' 
                  ? 'High technical pipeline integrity. All 5 matching nodes are synchronized.' 
                  : `Focus agency matching bounds verified. Agent exhibits steady submissions velocity.`
                }
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* Sourcing details & filters panel */}
      <div className="bg-white rounded-2xl border border-slate-200/60 p-4 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-xl text-xs focus:border-indigo-500 focus:ring-1 focus:ring-indigo-100 outline-none transition-all placeholder:text-slate-400"
              placeholder="Search by recruiter name, email address or credential ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2">
            <SensibleFilterButton label="All Active" active={filterStatus === 'All'} onClick={() => setFilterStatus('All')} />
            <SensibleFilterButton label="Active" active={filterStatus === 'Active'} onClick={() => setFilterStatus('Active')} />
            <SensibleFilterButton label="Paused" active={filterStatus === 'Paused'} onClick={() => setFilterStatus('Paused')} />
            <SensibleFilterButton label="Reviewing" active={filterStatus === 'Reviewing'} onClick={() => setFilterStatus('Reviewing')} />
          </div>
        </div>

        {/* Custom Data Grid Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                <th className="py-3 px-4 font-bold">RECRUITER PROFILE</th>
                <th className="py-3 px-4 font-bold">STATUS</th>
                <th className="py-3 px-4 font-bold text-center">SUBMISSIONS</th>
                <th className="py-3 px-4 text-center font-bold">INTERVIEWS</th>
                <th className="py-3 px-4 text-center font-bold">PLACEMENTS</th>
                <th className="py-3 px-4 text-right font-bold">AI SCORE</th>
                <th className="py-3 px-4"></th>
              </tr>
            </thead>
            <tbody>
              {filteredRecruiters.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-10 text-center text-slate-400 text-xs font-mono">
                    Zero recruiters matches identified. Refine search criteria index.
                  </td>
                </tr>
              ) : (
                filteredRecruiters.map((rec) => (
                  <motion.tr 
                    layoutId={`row-${rec.id}`}
                    onClick={() => {
                      setSelectedRecruiter(rec);
                      setChartRecruiterId(rec.id);
                    }}
                    key={rec.id} 
                    className="border-b border-slate-100 hover:bg-slate-50/70 transition-colors cursor-pointer group"
                  >
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-full bg-slate-100 text-slate-700 border border-slate-200 flex items-center justify-center font-display font-semibold text-xs shrink-0">
                          {rec.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <h4 className="font-display font-bold text-xs text-slate-900 group-hover:text-indigo-600 transition-colors leading-tight">{rec.name}</h4>
                            {rec.linkedinUrl && (
                              <a 
                                href={rec.linkedinUrl} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()} 
                                className="text-blue-600 hover:text-blue-800 transition-colors inline-block shrink-0"
                                title="LinkedIn Profile"
                              >
                                <Linkedin className="h-3.5 w-3.5" />
                              </a>
                            )}
                          </div>
                          <span className="text-[10px] text-slate-400 font-mono tracking-wide">{rec.id} • {rec.email}</span>
                        </div>
                      </div>
                    </td>
                    
                    <td className="py-3.5 px-4">
                      <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full border ${
                        rec.status === 'Active' 
                          ? 'bg-emerald-50 text-emerald-600 border-emerald-100' 
                          : rec.status === 'Paused'
                          ? 'bg-amber-50 text-amber-600 border-amber-100'
                          : 'bg-red-50 text-red-650 border-red-100'
                      }`}>
                        {rec.status.toUpperCase()}
                      </span>
                    </td>
                    
                    <td className="py-3.5 px-4 text-center font-mono font-medium text-xs text-slate-700">
                      {rec.submissions}
                    </td>

                    <td className="py-3.5 px-4 text-center font-mono font-medium text-xs text-slate-755">
                      {rec.interviews}
                    </td>

                    <td className="py-3.5 px-4 text-center font-mono font-bold text-xs text-emerald-600">
                      {rec.placements}
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5 font-mono">
                        <span className={`text-xs font-bold ${
                          rec.aiScore >= 90 ? 'text-indigo-600' : rec.aiScore >= 80 ? 'text-slate-700' : 'text-amber-600'
                        }`}>
                          {rec.aiScore}%
                        </span>
                        <div className="w-8 h-1 bg-slate-100 rounded-full overflow-hidden self-center">
                          <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${rec.aiScore}%` }} />
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-right text-slate-400 group-hover:text-indigo-600 transition-all">
                      <ChevronRight className="h-4 w-4" />
                    </td>

                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* RECRUITERS COLLABORATIVE BENCH PROFILE SOURCING HUB */}
      <div className="bg-[#fafbfc] rounded-3xl border border-slate-200/80 p-6 shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200/60 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-indigo-600 animate-pulse" />
              <h3 className="font-display font-bold text-base text-slate-900">Bench Profile Sourcing & Evaluation Console</h3>
            </div>
            <p className="text-xs text-slate-500">Provide resume files to simulate AI parsing, score alignment, and publish to active Bench hotkey sales list</p>
          </div>
          
          <div className="flex items-center gap-2 bg-indigo-50/80 px-3 py-1.5 rounded-xl border border-indigo-150">
            <span className="text-[10px] font-mono font-bold text-indigo-800 uppercase">Interactive Workspace</span>
          </div>
        </div>

        {exportSuccess && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="p-4 bg-emerald-50 border border-emerald-250 rounded-2xl flex items-start gap-3"
          >
            <CheckCircle className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h5 className="text-xs font-bold text-emerald-900 font-display">Bench Match Approved & Registered!</h5>
              <p className="text-[11px] text-emerald-700 leading-normal font-sans">
                Consultant <strong className="font-semibold">{parsedProfile?.name}</strong> has been assigned to <strong className="font-semibold">{recruiters.find(r=>r.id === evaluatingRecruiterId)?.name || 'the recruiting handler'}</strong>, assigned with submissions credits, and broadcasted to candidate hot-lists in localStorage.
              </p>
            </div>
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left panel: File dropzone & Selector */}
          <div className="lg:col-span-5 space-y-4">
            <div className="space-y-1.5">
              <label className="font-mono text-[10px] text-slate-400 font-bold uppercase block">1. Selected Recruiter Evaluator</label>
              <select
                value={evaluatingRecruiterId}
                onChange={(e) => setEvaluatingRecruiterId(e.target.value)}
                className="w-full text-xs p-2.5 bg-white border border-slate-200 rounded-xl outline-none focus:border-indigo-500 cursor-pointer text-slate-800"
              >
                {recruiters.map(r => (
                  <option key={r.id} value={r.id}>{r.name} ({r.id} - Score: {r.aiScore}%)</option>
                ))}
              </select>
            </div>

            {/* Simulated Drag and Drop Zone */}
            <div className="space-y-2">
              <label className="font-mono text-[10px] text-slate-400 font-bold uppercase block">2. Upload Resume / Profile File</label>
              
              <div className="relative border-2 border-dashed border-slate-200 hover:border-indigo-400 transition-colors rounded-2xl p-6 bg-white flex flex-col items-center justify-center text-center space-y-3 cursor-pointer group">
                <input 
                  type="file" 
                  accept=".pdf,.docx,.txt"
                  id="bench-resume-upload-input" 
                  className="hidden" 
                  onChange={handleCustomFileUploadSimulate}
                />
                <label htmlFor="bench-resume-upload-input" className="absolute inset-0 w-full h-full cursor-pointer z-10" />
                
                <Upload className="h-8 w-8 text-slate-400 group-hover:text-indigo-500 transition-colors" />
                
                <div className="space-y-1">
                  <p className="text-xs font-bold text-slate-800">Drag & drop profile document here</p>
                  <p className="text-[10px] text-slate-400">PDF, DOCX or TXT up to 10MB verified</p>
                </div>
                
                <span className="text-[10px] font-mono px-2.5 py-1.5 bg-slate-50 border border-slate-150 rounded-lg group-hover:bg-indigo-50 text-slate-500 group-hover:text-indigo-600 transition-all font-semibold select-none">
                  Browse Files
                </span>
              </div>
            </div>

            {/* Presets shortcut buttons to make it incredibly instant of recruiters */}
            <div className="space-y-2 bg-white p-4 rounded-2xl border border-slate-200/50">
              <span className="font-mono text-[9.5px] text-slate-400 font-bold uppercase block border-b border-slate-105 border-slate-100 pb-1.5 mb-2">
                Simulate Preset Consultant Resumes:
              </span>
              <div className="space-y-1.5">
                {PRESET_PROFILES.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => triggerParsingSimulate(`${preset.name.replace(/ /g, '_')}_Resume.pdf`, idx)}
                    className="w-full p-2.5 bg-slate-50 hover:bg-indigo-50 border border-slate-150 hover:border-indigo-200 text-left rounded-xl transition-all flex items-center justify-between text-xs cursor-pointer group"
                  >
                    <div>
                      <strong className="block text-slate-800 font-bold text-[11px] group-hover:text-indigo-700">{preset.name}</strong>
                      <span className="text-[10px] text-slate-400">{preset.role} • {preset.exp} Yrs Exp</span>
                    </div>
                    <span className="font-mono text-[9px] text-indigo-600 bg-indigo-50/50 px-1.5 py-0.5 rounded font-bold uppercase tracking-wider shrink-0">
                      Simulate Fit
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right panel: Parser State Dashboard */}
          <div className="lg:col-span-7">
            <div className="bg-white border border-slate-200/80 rounded-2xl min-h-[340px] flex flex-col justify-between overflow-hidden">
              
              {/* Header inside */}
              <div className="bg-slate-50/85 border-b border-slate-150 px-4 py-3 flex items-center justify-between">
                <span className="font-mono text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                  AI EVALUATOR INTERFACE
                </span>
                
                {uploadedFileName && (
                  <span className="text-[10px] font-mono text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded font-semibold max-w-[180px] truncate">
                    📄 {uploadedFileName}
                  </span>
                )}
              </div>

              {/* Inside Interactive Screen Body */}
              <div className="p-5 flex-1 flex flex-col justify-center">

                {!uploadedFileName && !isParsing && !isParsed && (
                  <div className="py-12 text-center space-y-3 max-w-sm mx-auto">
                    <div className="h-10 w-10 rounded-full bg-slate-50/80 text-slate-400 border border-slate-150 flex items-center justify-center mx-auto shadow-inner">
                      <FileText className="h-5 w-5" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-xs font-bold text-slate-800">No profile file loaded for review</h4>
                      <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
                        Choose a simulated candidate preset on the left or upload a word/pdf document to trigger the live recruitment parser index.
                      </p>
                    </div>
                  </div>
                )}

                {isParsing && (
                  <div className="py-12 flex flex-col items-center justify-center space-y-4 max-w-xs mx-auto text-center">
                    <div className="relative">
                      <RefreshCw className="h-9 w-9 text-indigo-600 animate-spin" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Cpu className="h-4 w-4 text-indigo-400 animate-pulse" />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono text-indigo-600 uppercase tracking-widest font-bold block">AI Pipeline Running</span>
                      <p className="text-xs text-slate-700 font-bold font-mono tracking-wide">{parsingStep}</p>
                    </div>
                  </div>
                )}

                {isParsed && parsedProfile && (
                  <div className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      
                      {/* Technical Profile summary */}
                      <div className="space-y-3.5 border-r border-slate-100 pr-0 sm:pr-4">
                        <div className="space-y-1">
                          <span className="text-[10px] text-slate-400 font-mono">EXTRACTED IDENTITY:</span>
                          <h4 className="font-display font-black text-slate-900 text-sm leading-tight">
                            {parsedProfile.name}
                          </h4>
                          <span className="font-semibold text-indigo-600 text-[11px] font-display block leading-none">
                            {parsedProfile.role}
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-[10.5px] font-mono">
                          <div className="bg-slate-50 p-2 rounded-lg border border-slate-150">
                            <span className="text-slate-400 block text-[9px]">EXP LEVEL:</span>
                            <strong className="text-slate-800 font-bold">{parsedProfile.exp} Years</strong>
                          </div>
                          <div className="bg-slate-50 p-2 rounded-lg border border-slate-150">
                            <span className="text-slate-400 block text-[9px]">TARGET RATE:</span>
                            <strong className="text-slate-800 font-bold">{parsedProfile.rate}</strong>
                          </div>
                          <div className="bg-slate-50 p-2 rounded-lg border border-slate-150">
                            <span className="text-slate-400 block text-[9px]">LOCATION:</span>
                            <strong className="text-slate-800 truncate block font-bold">{parsedProfile.location}</strong>
                          </div>
                          <div className="bg-slate-50 p-2 rounded-lg border border-slate-150">
                            <span className="text-slate-400 block text-[9px]">VISA STATUS:</span>
                            <strong className="text-slate-800 truncate block font-bold">{parsedProfile.visaStatus}</strong>
                          </div>
                        </div>

                        {/* Summary Block */}
                        <div className="p-2.5 bg-indigo-50/50 rounded-xl border border-indigo-100/50">
                          <span className="text-[9px] font-mono text-indigo-800 font-bold block mb-0.5">BENCH SUMMARY MATRIX:</span>
                          <p className="text-[10.5px] text-slate-700 leading-normal font-sans">
                            {parsedProfile.brief}
                          </p>
                        </div>
                      </div>

                      {/* Recruiter Evaluation Review */}
                      <div className="space-y-3 flex flex-col justify-between">
                        
                        {/* Skills List map */}
                        <div className="space-y-1.5">
                          <span className="text-[9.5px] text-slate-400 font-mono block">IDENTIFIED TECH STACK:</span>
                          <div className="flex flex-wrap gap-1">
                            {parsedProfile.skills.map((skill, sIdx) => (
                              <span key={sIdx} className="text-[9.5px] font-bold font-mono bg-slate-100 border border-slate-150 rounded px-1.5 py-0.5 text-slate-750 text-slate-700">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Recruiter input note */}
                        <div className="space-y-1.5 mt-2">
                          <label className="text-[9.5px] text-slate-400 font-mono block uppercase">Recruiter Diagnostic Memo:</label>
                          <textarea
                            rows={3}
                            value={recruiterNotes}
                            onChange={(e) => setRecruiterNotes(e.target.value)}
                            className="w-full text-[11px] p-2 bg-slate-50 border border-slate-200 focus:border-indigo-400 outline-none rounded-xl text-slate-700 leading-normal font-sans"
                            placeholder="Add customizable review comments before hot-listing..."
                          />
                        </div>

                        {/* Trust Assessment radar */}
                        <div className="bg-slate-900 rounded-xl p-2.5 border border-slate-800 flex items-center justify-between gap-3 text-white">
                          <div className="space-y-0.5 shrink-0">
                            <span className="text-[9px] text-slate-400 font-mono">CALIBRATION SCORE:</span>
                            <strong className="text-sm font-display text-amber-500 font-bold block">{parsedProfile.vendorScore}% Confidence</strong>
                          </div>
                          <div className="flex-1 max-w-[125px] h-1.5 bg-slate-950 rounded-full overflow-hidden self-center">
                            <div className="h-full bg-amber-500 rounded-full" style={{ width: `${parsedProfile.vendorScore}%` }} />
                          </div>
                        </div>

                      </div>

                    </div>
                  </div>
                )}

              </div>

              {/* Parsed Profile Confirmation Footer Buttons */}
              {isParsed && parsedProfile && (
                <div className="bg-slate-50 border-t border-slate-200 px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setUploadedFileName(null);
                      setIsParsed(false);
                      setParsedProfile(null);
                    }}
                    className="w-full sm:w-auto px-4 py-2 border border-slate-250 text-slate-600 rounded-lg text-xs font-semibold hover:bg-slate-100 cursor-pointer text-center"
                  >
                    Clear Results
                  </button>

                  <button
                    type="button"
                    onClick={handleExportToBenchList}
                    className="w-full sm:w-auto px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold font-mono uppercase tracking-wide flex items-center justify-center gap-1.5 shadow-md hover:shadow-lg transition-all cursor-pointer"
                  >
                    <CheckCircle className="h-4 w-4" />
                    <span>Authorize & Hot-List Profile</span>
                  </button>
                </div>
              )}

            </div>
          </div>

        </div>

      </div>

      {/* Recruiter Details Drawer Overlay */}
      <AnimatePresence>
        {selectedRecruiter && (
          <>
            {/* Backdrop cover */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.25 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedRecruiter(null)}
              className="fixed inset-0 bg-slate-900 z-40 cursor-pointer"
            />
            {/* Slideout card panel */}
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white border-l border-slate-200 shadow-2xl z-50 p-6 flex flex-col justify-between overflow-y-auto"
            >
              <div className="space-y-6">
                
                {/* Header detail */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <span className="text-[10px] font-mono font-bold text-slate-400">AGENT SPECIFICATION</span>
                  <button 
                    onClick={() => setSelectedRecruiter(null)}
                    className="p-1 px-2.5 rounded bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-slate-600 text-xs font-semibold cursor-pointer"
                  >
                    Close
                  </button>
                </div>

                {/* Profile Display Box */}
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-700 flex items-center justify-center font-display font-extrabold text-xl shadow-inner">
                    {selectedRecruiter.name.split(' ').map(n=>n[0]).join('')}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-display font-bold text-base text-slate-900">{selectedRecruiter.name}</h3>
                      {selectedRecruiter.linkedinUrl && (
                        <a 
                          href={selectedRecruiter.linkedinUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 transition-colors inline-block"
                          title="LinkedIn Profile"
                        >
                          <Linkedin className="h-4.5 w-4.5" />
                        </a>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="bg-indigo-50 border border-indigo-150 text-[9px] font-bold px-1.5 py-0.5 rounded uppercase font-mono tracking-wide text-indigo-700">
                        {selectedRecruiter.id}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">Joined {selectedRecruiter.joinedDate}</span>
                    </div>
                  </div>
                </div>

                {/* Performance Indicators */}
                <div className="bg-slate-50 rounded-xl border border-slate-100 p-4 space-y-3.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-slate-400">PERFORMANCE SUMMARY</span>
                    <div className="flex items-center gap-1 text-[11px] font-bold text-indigo-600">
                      <Cpu className="h-3.5 w-3.5 animate-spin" style={{ animationDuration: '4s' }} />
                      <span>{selectedRecruiter.aiScore}% Trust Level</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="bg-white border border-slate-200/40 p-2.5 rounded-lg shadow-xs">
                      <span className="text-[9px] block text-slate-400">Total Subs</span>
                      <strong className="text-sm font-display text-slate-900 font-bold">{selectedRecruiter.submissions}</strong>
                    </div>
                    <div className="bg-white border border-slate-200/40 p-2.5 rounded-lg shadow-xs">
                      <span className="text-[9px] block text-slate-400">Interviews</span>
                      <strong className="text-sm font-display text-slate-900 font-bold">{selectedRecruiter.interviews}</strong>
                    </div>
                    <div className="bg-white border border-slate-200/40 p-2.5 rounded-lg shadow-xs">
                      <span className="text-[9px] block text-slate-400">Placements</span>
                      <strong className="text-sm font-display text-emerald-600 font-bold">{selectedRecruiter.placements}</strong>
                    </div>
                  </div>
                </div>

                {/* Bio Description Details */}
                <div className="space-y-2">
                  <h5 className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">Sourcing Specialization</h5>
                  <p className="text-xs leading-relaxed text-slate-600 bg-slate-50/50 p-3 rounded-lg border border-slate-150 font-sans">
                    {selectedRecruiter.bio}
                  </p>
                </div>

                {/* Contact information details */}
                <div className="space-y-2.5 pt-2">
                  <h5 className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">Secure Credentials Integrity</h5>
                  
                  <div className="flex items-center gap-2.5 text-xs text-slate-650">
                    <Mail className="h-4 w-4 text-slate-400 shrink-0" />
                    <span>{selectedRecruiter.email}</span>
                  </div>

                  <div className="flex items-center gap-2.5 text-xs text-slate-650">
                    <Phone className="h-4 w-4 text-slate-400 shrink-0" />
                    <span>{selectedRecruiter.phone}</span>
                  </div>
                </div>

              </div>

              {/* Drawer footer tools */}
              <div className="border-t border-slate-100 pt-4 flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    const nextStatus = selectedRecruiter.status === 'Active' ? 'Paused' : 'Active';
                    setRecruiters(prev => prev.map(r => r.id === selectedRecruiter.id ? { ...r, status: nextStatus } : r));
                    setSelectedRecruiter(r => r ? { ...r, status: nextStatus } : null);
                  }}
                  className="flex-1 py-2 text-center border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-xl text-xs font-semibold cursor-pointer"
                >
                  {selectedRecruiter.status === 'Active' ? 'Pause Clearance' : 'Re-Activate Admin'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setRecruiters(prev => prev.filter(r => r.id !== selectedRecruiter.id));
                    setSelectedRecruiter(null);
                  }}
                  className="py-2 px-4 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl text-xs font-semibold cursor-pointer shrink-0"
                >
                  Revoke Provision
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Provision Recruiter Modal Dialog overlay */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.35 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAddModal(false)}
              className="fixed inset-0 bg-slate-900"
            />
            
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-md bg-white border border-slate-100 shadow-2xl rounded-2xl overflow-hidden z-10 p-5 space-y-4"
            >
              <div className="flex items-center justify-between border-b border-slate-50 pb-3">
                <div className="flex items-center gap-1.5">
                  <UserCheck className="h-4.5 w-4.5 text-indigo-600 animate-pulse" />
                  <span className="font-display font-bold text-slate-900 text-sm">Provision Recruitment Agent</span>
                </div>
                <button 
                  onClick={() => setShowAddModal(false)}
                  className="p-1 text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <form onSubmit={handleAddNewRecruiter} className="space-y-4 text-xs font-sans">
                <div className="space-y-1">
                  <label className="font-mono text-[10px] text-slate-400 font-bold uppercase block">Recruiter Full Name</label>
                  <input
                    type="text"
                    required
                    className="w-full p-2.5 border border-slate-200 focus:border-indigo-500 rounded-xl outline-none text-slate-800"
                    placeholder="e.g. Samantha Jenkins"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-mono text-[10px] text-slate-400 font-bold uppercase block">Professional Work Email</label>
                  <input
                    type="email"
                    required
                    className="w-full p-2.5 border border-slate-200 focus:border-indigo-500 rounded-xl outline-none text-slate-800"
                    placeholder="e.g. s.jenkins@benmyl.ai"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-mono text-[10px] text-slate-400 font-bold uppercase block">Workspace Phone Identifier</label>
                  <input
                    type="text"
                    className="w-full p-2.5 border border-slate-200 focus:border-indigo-500 rounded-xl outline-none text-slate-800"
                    placeholder="e.g. +1 (555) 0184"
                    value={newPhone}
                    onChange={(e) => setNewPhone(e.target.value)}
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-mono text-[10px] text-slate-400 font-bold uppercase block">LinkedIn Profile URL</label>
                  <input
                    type="url"
                    className="w-full p-2.5 border border-slate-200 focus:border-indigo-500 rounded-xl outline-none text-slate-800"
                    placeholder="e.g. https://www.linkedin.com/in/jenkins"
                    value={newLinkedinUrl}
                    onChange={(e) => setNewLinkedinUrl(e.target.value)}
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-mono text-[10px] text-slate-400 font-bold uppercase block">Sourcing Specialization Profile</label>
                  <textarea
                    rows={2}
                    className="w-full p-2.5 border border-slate-200 focus:border-indigo-500 rounded-xl outline-none text-slate-800 leading-normal"
                    placeholder="e.g. Focused on Senior Frontend stack engineering, GCP operations, and Node developer positions."
                    value={newBio}
                    onChange={(e) => setNewBio(e.target.value)}
                  />
                </div>

                <div className="flex gap-2 pt-3 border-t border-slate-50">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="flex-1 py-2.5 text-center bg-slate-50 hover:bg-slate-100 text-slate-650 rounded-xl font-semibold cursor-pointer"
                  >
                    Cancel Action
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 text-center bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold shadow-md cursor-pointer"
                  >
                    Validate & Provision
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

// Simple filter button helper to keep formatting consistent
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

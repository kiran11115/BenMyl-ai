/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FileText, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  TrendingUp, 
  Calendar, 
  Briefcase, 
  Clock, 
  Plus, 
  Send, 
  ChevronRight, 
  ArrowLeft,
  ThumbsUp,
  ThumbsDown,
  Mail,
  Smartphone,
  MapPin,
  Cpu,
  BookOpen,
  MessageSquare,
  BadgeAlert,
  Compass
} from 'lucide-react';

interface CandidateProfile {
  name: string;
  role: string;
  skills: string[];
  experience: number;
  aiScore: number;
  email: string;
  phone: string;
  location: string;
  education: string;
  summary: string;
  strengths: string[];
  weaknesses: string[];
  missingSkills: string[];
  employmentGaps: string;
  interviewQuestions: string[];
  experienceDetails: Array<{
    period: string;
    role: string;
    company: string;
    points: string[];
  }>;
}

const DEFAULT_PRESETS: Record<string, CandidateProfile> = {
  'Nolan Vasquez': {
    name: 'Nolan Vasquez',
    role: 'Staff React Engineer',
    skills: ['React', 'TypeScript', 'Redux', 'TailwindCSS', 'Vite', 'Node.js', 'WebSockets', 'GraphQL'],
    experience: 8,
    aiScore: 98,
    email: 'n.vasquez@gmail.com',
    phone: '+1 (512) 809-4011',
    location: 'Austin, TX (Hybrid)',
    education: 'B.S. Computer Science - UT Austin',
    summary: 'Expert high-performance frontend engineer specializing in micro-frontend architectures, React rendering algorithms, and enterprise core design libraries. Proven history of speeding up UI operations and mentoring complex multi-disciplinary software engineers.',
    strengths: [
      'Led core micro-frontend migration shrinking client bundling latencies by 64%',
      'Architected custom thread-safe responsive telemetry systems',
      'Extensive state storage optimization (Redux Toolkit, Zustand)'
    ],
    weaknesses: [
      'Limited experience in back-end high volume transactional DB clusters',
      'Has not managed cold deployments in Kubernetes clusters directly'
    ],
    missingSkills: ['Kubernetes', 'Go language', 'Apache Kafka'],
    employmentGaps: 'None. Seamless 8 year progressive career timeline verified.',
    interviewQuestions: [
      'Explain how you resolved the telemetry state race conditions in your previous React project.',
      'How do you manage cross-application shared components in a micro-frontend architecture safely?',
      'Describe your approach to optimizing heavy virtual lists with 10k+ continuous scroll rows.'
    ],
    experienceDetails: [
      {
        period: '2023 - Present',
        role: 'Staff UI Architect',
        company: 'Apex Capital Banking Systems',
        points: [
          'Designed enterprise-grade central React rendering components serving 24 separate internal software teams.',
          'Migrated legacy monolithic client views to modular Vite compilation schemas, reclaiming 45% local compilation speeds.'
        ]
      },
      {
        period: '2019 - 2023',
        role: 'Senior React Developer',
        company: 'Stellar Sourcing Solutions',
        points: [
          'Spearheaded custom state orchestration frameworks decreasing page telemetry rendering overheads by 3.2X.',
          'Mentored 6 junior software engineers on modern clean architecture directives and test-driven coverage targets.'
        ]
      }
    ]
  },
  'Ji-Min Park': {
    name: 'Ji-Min Park',
    role: 'Data Systems Engineer',
    skills: ['Java', 'Spring Boot', 'Kafka', 'Spark', 'Hadoop', 'Redis', 'Python', 'SQL'],
    experience: 5,
    aiScore: 89,
    email: 'ji_min_99@naver.com',
    phone: '+1 (408) 291-7643',
    location: 'San Jose, CA (Remote)',
    education: 'B.S. Mathematics - KAIST Univ',
    summary: 'Systems developer with rigorous logical backgrounds focused on data ingestion systems, event-driven backends, and low latency caching. Specialized in big data pipeline structures.',
    strengths: [
      'Built multi-zone Kafka streaming topologies processing peak loads',
      'Solid mathematical foundations ideal for data engineering optimizations',
      'Engineered memory-mapped telemetry caching layers'
    ],
    weaknesses: [
      'Limited production React or modern CSS layout development experience',
      'Fewer years in enterprise cloud container orchestration fields'
    ],
    missingSkills: ['Docker', 'AWS IAM', 'Terraform'],
    employmentGaps: '3-Month career pause in 2021 during master course transition.',
    interviewQuestions: [
      'What partition keys and replication factors would you choose to prevent out of order streams in Kafka?',
      'How does Redis in-memory lookup compare to disk-based engines under heavy multi-threading?'
    ],
    experienceDetails: [
      {
        period: '2022 - 2026',
        role: 'Backend Data Systems Specialist',
        company: 'FinTech Integrators Corp',
        points: [
          'Rebuilt legacy ETL jobs reducing raw file intake runtimes from 8 hours down to 40 minutes.',
          'Engineered Spark cluster partitions which cleared heavy analytical write blocks.'
        ]
      }
    ]
  },
  'Elena Rostova': {
    name: 'Elena Rostova',
    role: 'Lead Solutions Architect',
    skills: ['Python', 'Django', 'GCP', 'PostgreSQL', 'Docker', 'Angular', 'FastAPI'],
    experience: 10,
    aiScore: 95,
    email: 'elena.rost@outlook.com',
    phone: '+1 (650) 441-2890',
    location: 'San Francisco, CA (Hybrid)',
    education: 'M.S. Software Engineering - Stanford University',
    summary: 'Accomplished engineering architect with 10 years of professional background managing Google Cloud infrastructure, Django endpoints, and unified responsive application pipelines.',
    strengths: [
      'Solid tenure with enterprise Python application engines and GCP security',
      'Spearheaded robust secure tenant-isolation structures for financial SaaS clients',
      'Extensive mentorship backgrounds overseeing team velocity metrics'
    ],
    weaknesses: [
      'Does not have extensive mobile or swift deployment backgrounds',
      'Has not managed React 19 concurrent features within the past calendar year'
    ],
    missingSkills: ['React Native', 'AWS CloudFormation'],
    employmentGaps: 'None. Progression through Lead roles.',
    interviewQuestions: [
      'Describe how you designed secure tenant-isolation schemes in PostgreSQL database levels.',
      'What were the primary caching guidelines you established when setting up the GCP proxy layers?'
    ],
    experienceDetails: [
      {
        period: '2020 - Present',
        role: 'Principal SaaS Solutions Lead',
        company: 'CloudCore Technologies',
        points: [
          'Vetted architecture schemas for multi-tenant frameworks serving 400k concurrent active daily leads.',
          'Optimized PostgreSQL index paths and read replicas, recovering peak hours query timeouts by 40%.'
        ]
      }
    ]
  }
};

interface ReviewResumeScreenProps {
  passedCandidate?: any; // Received deep-linked profile properties
  onNavigateBack?: () => void;
  onNavigateToJobs?: (candidate: any) => void;
}

export default function ReviewResumeScreen({ passedCandidate, onNavigateBack, onNavigateToJobs }: ReviewResumeScreenProps) {
  const [selectedCandidateKey, setSelectedCandidateKey] = useState<string>('Nolan Vasquez');
  const [candidateProfile, setCandidateProfile] = useState<CandidateProfile>(DEFAULT_PRESETS['Nolan Vasquez']);
  const [notesText, setNotesText] = useState('');
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');
  
  // Custom smart recruiter logs
  const [actionHistory, setActionHistory] = useState<string[]>([]);

  // Update when deep linked candidate changes or active dropdown selection triggers
  useEffect(() => {
    if (passedCandidate && passedCandidate.name) {
      // Form template based on incoming values
      const merged: CandidateProfile = {
        name: passedCandidate.name,
        role: passedCandidate.role || 'Senior Software Engineer',
        skills: passedCandidate.skills || ['React', 'TypeScript', 'TailwindCSS'],
        experience: passedCandidate.experience || 6,
        aiScore: passedCandidate.aiScore || 90,
        email: passedCandidate.email || `${passedCandidate.name.toLowerCase().replace(/\s+/g, '')}@benmyl.ai`,
        phone: passedCandidate.phone || '+1 (555) 019-9014',
        location: passedCandidate.location || 'Remote Available',
        education: passedCandidate.education || 'B.S. Computer Science Analytics',
        summary: `Dynamic engineering expert specialized across core ${passedCandidate.skills?.join(', ') || 'technical'} spaces. Extracted with high-fidelity BenMyl neural parser mechanisms.`,
        strengths: [
          `Recognized master across ${passedCandidate.skills?.[0] || 'core technologies'}`,
          `High parsing assurance score: ${passedCandidate.aiScore || 90}%`
        ],
        weaknesses: [
          'High demand profile. Expected marketplace retention cycles look highly expedited.'
        ],
        missingSkills: ['System Design Orchestration', 'Secondary DB Cache'],
        employmentGaps: 'Zero gaps detected.',
        interviewQuestions: [
          `Describe your architectural roadmap when structuring complex ${passedCandidate.skills?.[0]} applications.`,
          'How do you manage cross-department integrations safely under rigorous deployments?'
        ],
        experienceDetails: [
          {
            period: '2022 - Present',
            role: passedCandidate.role || 'Tech Specialist',
            company: passedCandidate.vendorName || 'Consolidated Staffing Agency',
            points: [
              'Vetted and delivered robust, enterprise-cleared production lines with high efficiency.'
            ]
          }
        ]
      };
      setCandidateProfile(merged);
    } else {
      // Standard local preset loading
      setCandidateProfile(DEFAULT_PRESETS[selectedCandidateKey]);
    }
  }, [passedCandidate, selectedCandidateKey]);

  const handleRecruiterAction = (actionLabel: string, colorClass: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setActionHistory(prev => [`[${timestamp}] Executed: "${actionLabel}" for Candidate: ${candidateProfile.name}`, ...prev]);
    alert(`Success: Action "${actionLabel}" registered. Automated workspace triggers generated.`);
  };

  const handleSaveNotes = (e: React.FormEvent) => {
    e.preventDefault();
    setSaveStatus('saving');
    setTimeout(() => {
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 2000);
    }, 1000);
  };

  return (
    <div className="space-y-6 pb-12 relative font-sans">
      
      {/* 1. Header Navigation and Preset Selector */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          {onNavigateBack && (
            <button 
              onClick={onNavigateBack}
              className="flex items-center gap-1.5 text-xs text-[#1d4ed8] hover:text-[#d4af37] cursor-pointer transition-colors font-semibold"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Return to Ingress Board</span>
            </button>
          )}
          <h2 className="text-2xl font-display font-bold text-slate-900 tracking-tight mt-1">
            Review Candidate Resume
          </h2>
          <p className="text-slate-500 text-xs mt-0.5">
            Evaluate parsed resume details side-by-side with BenMyl's AI analysis, missing skill recommendations, and custom matching scores.
          </p>
        </div>

        {/* Change candidate dropdown to review alternative presets */}
        {!passedCandidate && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-bold font-mono uppercase">Alternate Preset:</span>
            <select
              value={selectedCandidateKey}
              onChange={(e) => setSelectedCandidateKey(e.target.value)}
              className="px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 font-semibold outline-none focus:border-[#d4af37]"
            >
              <option value="Nolan Vasquez">Nolan Vasquez (Staff React - 8y)</option>
              <option value="Elena Rostova">Elena Rostova (Lead Solutions - 10y)</option>
              <option value="Ji-Min Park">Ji-Min Park (Data Systems - 5y)</option>
            </select>
          </div>
        )}
      </div>

      {/* 2. Double Sided Split Screen Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Left Side Column: Interactive HTML Rendered Resume PDF Sheet */}
        <div className="lg:col-span-6 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 flex flex-col justify-between shadow-xs ring-1 ring-slate-100 relative min-h-[680px]">
          
          <div className="space-y-6">
            {/* Resume Watermark Indicator */}
            <div className="absolute top-4 right-4 flex items-center gap-1 bg-slate-50 border border-slate-150 px-2.5 py-1 rounded-lg text-[9px] font-mono text-slate-450 uppercase">
              <FileText className="h-3 w-3 text-slate-400" />
              <span>Vetted Resume Layout</span>
            </div>

            {/* Resume Name Header */}
            <div className="border-b border-slate-100 pb-5 space-y-1.5">
              <h3 className="text-2xl font-display font-bold text-slate-900 tracking-tight">{candidateProfile.name}</h3>
              <p className="text-xs font-semibold text-[#1d4ed8] uppercase font-mono tracking-wider">{candidateProfile.role}</p>
              
              {/* Contact parameters grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-3 text-[10.5px] text-slate-550 border-t border-slate-50 mt-3">
                <div className="flex items-center gap-2">
                  <Mail className="h-3.5 w-3.5 text-slate-400" />
                  <span>{candidateProfile.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Smartphone className="h-3.5 w-3.5 text-slate-400" />
                  <span>{candidateProfile.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-3.5 w-3.5 text-slate-400" />
                  <span>{candidateProfile.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="h-3.5 w-3.5 text-slate-400" />
                  <span>{candidateProfile.education}</span>
                </div>
              </div>
            </div>

            {/* Resume Section: Executive Profile */}
            <div className="space-y-2">
              <h4 className="text-[10px] font-mono uppercase text-slate-400 tracking-widest font-bold">EXECUTIVE PROFILE</h4>
              <p className="text-xs text-slate-650 leading-relaxed font-sans">{candidateProfile.summary}</p>
            </div>

            {/* Resume Section: Core Capabilities and Skills */}
            <div className="space-y-2">
              <h4 className="text-[10px] font-mono uppercase text-slate-400 tracking-widest font-bold">PROFESSIONAL TECHNOLOGY STACK</h4>
              <div className="flex flex-wrap gap-1.5">
                {candidateProfile.skills.map((skill, idx) => (
                  <span key={idx} className="bg-slate-50 text-slate-700 hover:bg-slate-100 text-[10.5px] px-2.5 py-1 rounded-lg border border-slate-200/60 font-mono font-medium tracking-wide">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Resume Section: Career Timeline details */}
            <div className="space-y-3 pt-2">
              <h4 className="text-[10px] font-mono uppercase text-[#d4af37] tracking-widest font-bold">PROFESSIONAL HISTORY</h4>
              
              <div className="space-y-4">
                {candidateProfile.experienceDetails.map((exp, eIdx) => (
                  <div key={eIdx} className="space-y-1.5 relative pl-4 border-l border-slate-100">
                    <div className="absolute top-1 left-[-4.5px] h-2 w-2 rounded-full bg-[#d4af37]" />
                    <div className="flex items-center justify-between text-xs">
                      <strong className="font-bold text-slate-800">{exp.role}</strong>
                      <span className="text-[10px] text-slate-400 font-mono font-bold uppercase">{exp.period}</span>
                    </div>
                    <p className="text-[11px] font-semibold text-slate-500">{exp.company}</p>
                    
                    <ul className="list-disc list-inside space-y-1 text-slate-600 text-[10.5px] leading-relaxed pt-1">
                      {exp.points.map((pt, pIdx) => (
                        <li key={pIdx}>{pt}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sourcing provenance indicator footer inside resume */}
          <div className="border-t border-slate-100 pt-4 mt-8 flex items-center justify-between text-[9px] font-mono text-slate-400 font-bold uppercase">
            <span>Verified Source Network: BenMyl Staffing</span>
            <span>ID: {candidateProfile.name.toUpperCase().slice(0,3)}-{candidateProfile.experience}Y</span>
          </div>

        </div>

        {/* Right Side Column: Dynamic Premium AI Resume Analysis Panel */}
        <div className="lg:col-span-6 space-y-4 flex flex-col justify-between">
          
          {/* Box 1: AI Match Score & Core Recommendation Index Badge */}
          <div className="bg-white rounded-2xl border border-slate-200/60 p-5 shadow-xs flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-1">
                <span className="text-[9.5px] font-mono uppercase text-slate-400 font-bold tracking-widest">Decision Engine Verdict:</span>
                <span className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-[9px] font-bold px-1.5 py-0.2 rounded font-mono uppercase">Strong Match</span>
              </div>
              <h4 className="font-display font-extrabold text-slate-900 text-sm">Autonomous Placement Assurance</h4>
              <p className="text-[10.5px] text-slate-500">Perfect alignment detected based on experience taxonomy algorithms.</p>
            </div>

            <div className="text-center bg-gradient-to-tr from-[#1d4ed8] to-[#d4af37] p-[1.5px] rounded-2xl shadow-sm shrink-0">
              <div className="bg-white rounded-2xl p-3 px-4 text-center">
                <span className="block text-2xl font-mono font-extrabold text-[#1d4ed8]">{candidateProfile.aiScore}%</span>
                <span className="text-[8.5px] font-mono text-slate-400 font-bold uppercase tracking-wider block">Fit Ratio</span>
              </div>
            </div>
          </div>

          {/* Box 2: Deep-dive Strengths, Weaknesses & Gap Analysis list */}
          <div className="bg-white rounded-2xl border border-slate-200/60 p-5 shadow-xs space-y-4">
            <h3 className="font-display font-bold text-slate-950 text-xs uppercase tracking-wide flex items-center gap-1.5">
              <Cpu className="h-4 w-4 text-[#1d4ed8]" />
              <span>Diagnostic Core Metrics</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Strengths list column */}
              <div className="p-3 bg-emerald-50/20 rounded-xl border border-emerald-100 space-y-2">
                <span className="text-[9.5px] font-mono font-bold text-emerald-800 uppercase tracking-wider flex items-center gap-1">
                  <ThumbsUp className="h-3 w-3 text-emerald-600" />
                  <span>Key Skill Strengths</span>
                </span>
                <ul className="space-y-1.5 text-[10.5px] text-slate-650 font-sans leading-snug">
                  {candidateProfile.strengths.map((str, i) => (
                    <li key={i} className="flex items-start gap-1">
                      <span className="text-emerald-500 mt-0.5">•</span>
                      <span>{str}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Weaknesses list column */}
              <div className="p-3 bg-amber-50/25 rounded-xl border border-amber-100 space-y-2">
                <span className="text-[9.5px] font-mono font-bold text-amber-800 uppercase tracking-wider flex items-center gap-1">
                  <ThumbsDown className="h-3 w-3 text-amber-600" />
                  <span>Technical Constraints</span>
                </span>
                <ul className="space-y-1.5 text-[10.5px] text-slate-650 font-sans leading-snug">
                  {candidateProfile.weaknesses.map((weak, i) => (
                    <li key={i} className="flex items-start gap-1">
                      <span className="text-amber-500 mt-0.5">•</span>
                      <span>{weak}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

            {/* Gap and missing criteria parameters */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-2 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-wider block">Missing Tech Criteria:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {candidateProfile.missingSkills.map((sk, idx) => (
                      <span key={idx} className="bg-pink-50 text-pink-700 text-[9px] px-1.5 py-0.2 rounded font-mono font-semibold border border-pink-100 flex items-center gap-0.5">
                        <BadgeAlert className="h-2.5 w-2.5" />
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-wider block">Timeline Gap Analysis:</span>
                  <p className="text-[10.5px] font-semibold text-slate-700 mt-1">{candidateProfile.employmentGaps}</p>
                </div>
              </div>
            </div>

          </div>

          {/* Box 3: AI-Generated Recruiter Suggestions for Interview Loops */}
          <div className="bg-white rounded-2xl border border-slate-200/60 p-5 shadow-xs space-y-3.5">
            <h3 className="font-display font-bold text-slate-950 text-xs uppercase tracking-wide flex items-center gap-1.5">
              <MessageSquare className="h-4 w-4 text-[#d4af37]" />
              <span>Suggested Interview Questions</span>
            </h3>

            <div className="space-y-2">
              {candidateProfile.interviewQuestions.map((q, idx) => (
                <div key={idx} className="p-2.5 border border-slate-100 bg-[#f8fafc] rounded-xl text-xs space-y-1">
                  <div className="flex items-center gap-1 text-[8.5px] font-mono font-bold text-indigo-700 uppercase tracking-wide">
                    <span>Question {idx + 1}</span>
                    <span>• Sourcing Metric</span>
                  </div>
                  <p className="text-slate-750 font-semibold leading-relaxed">"{q}"</p>
                </div>
              ))}
            </div>
          </div>

          {/* Box 4: Interactive Recruitment Note Space */}
          <form onSubmit={handleSaveNotes} className="bg-white rounded-2xl border border-[#cbd5e1]/60 p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-[10px] uppercase font-mono tracking-widest text-slate-400 font-bold block">Internal Recruiter Memo Pad</label>
              {saveStatus === 'saved' && (
                <span className="text-[10px] text-emerald-600 font-mono font-bold flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3" /> Memo Saved
                </span>
              )}
            </div>

            <textarea
              className="w-full h-16 p-2.5 border border-slate-200 focus:border-[#d4af37] bg-slate-50 focus:bg-white rounded-xl text-xs outline-none transition-all placeholder:text-slate-400 text-slate-800"
              placeholder="Inject custom assessments, communication milestones, or salary clearance indexes here..."
              value={notesText}
              onChange={(e) => setNotesText(e.target.value)}
            />

            <div className="flex items-center justify-between">
              <p className="text-[9px] text-slate-400 leading-none">Shared securely with active primary hiring stakeholders.</p>
              <button
                type="submit"
                className="px-4 py-1.5 bg-slate-900 text-white rounded-lg text-[10.5px] font-semibold hover:bg-slate-800 cursor-pointer transition-colors"
                disabled={saveStatus === 'saving'}
              >
                {saveStatus === 'saving' ? 'Syncing...' : 'Save Memo'}
              </button>
            </div>
          </form>

          {/* Box 5: Recruitment Actions Footer Panel bar */}
          <div className="bg-slate-50 rounded-2xl border border-slate-200 p-4 shadow-sm flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-1.5">
              <button
                onClick={() => handleRecruiterAction('Candidate Shortlisted', 'bg-emerald-600')}
                className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-xs transition-colors cursor-pointer"
              >
                Shortlist
              </button>
              
              <button
                onClick={() => handleRecruiterAction('Role Interview scheduled', 'bg-indigo-600')}
                className="px-3.5 py-1.5 bg-[#1d4ed8] hover:bg-blue-700 text-white font-bold rounded-lg text-xs transition-colors cursor-pointer"
              >
                Schedule Interview
              </button>

              <button
                onClick={() => handleRecruiterAction('Broadcasting dossier to partner vendors', 'bg-indigo-650')}
                className="px-3.5 py-1.5 bg-slate-700 hover:bg-slate-800 text-white font-bold rounded-lg text-xs transition-colors cursor-pointer"
              >
                Submit to Vendor
              </button>

              <button
                onClick={() => handleRecruiterAction('Candidate Rejected', 'bg-rose-600')}
                className="px-3.5 py-1.5 bg-slate-100 hover:bg-rose-50 text-rose-600 border border-slate-205 font-bold rounded-lg text-xs transition-colors cursor-pointer"
              >
                Reject
              </button>
            </div>

            {onNavigateToJobs && (
              <button
                onClick={() => {
                  onNavigateToJobs(candidateProfile);
                }}
                className="px-4 py-2 btn-royal-gold text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-sm shrink-0"
              >
                <Compass className="h-4 w-4" />
                <span>View Matching Jobs</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

        </div>

      </div>

      {actionHistory.length > 0 && (
        <div className="bg-[#f8fafc] border border-slate-200 p-4 rounded-xl space-y-1.5 text-xs text-slate-550">
          <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest block">Recruiter Live Audit Operations Log:</span>
          <div className="space-y-1">
            {actionHistory.slice(0, 3).map((log, idx) => (
              <p key={idx} className="font-mono text-[9.5px]">{log}</p>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}

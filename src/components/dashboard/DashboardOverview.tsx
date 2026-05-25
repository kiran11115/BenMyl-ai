/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Users, 
  Layers, 
  TrendingUp, 
  Award, 
  ArrowUpRight, 
  Plus, 
  Search, 
  Bell, 
  Command, 
  Activity, 
  Cpu, 
  Briefcase, 
  CheckCircle2, 
  ArrowRight,
  RefreshCw,
  Send,
  Calendar,
  Clock,
  List,
  Grid,
  FileText,
  Video,
  Phone,
  Check,
  CheckCheck,
  Circle,
  MessageSquare,
  HelpCircle,
  SlidersHorizontal,
  ChevronDown,
  X,
  Lock,
  PlusCircle,
  Undo
} from 'lucide-react';

interface DashboardOverviewProps {
  userRole?: string;
  emailAddress?: string;
  companyName?: string;
  onNavigateTab: (tabId: string) => void;
  onExecuteCommand: (cmd: string) => void;
}

// All stage values for Candidates
type PipelineStage = 'Sourced' | 'Submitted' | 'Interview Scheduled' | 'Shortlisted' | 'Offered' | 'Hired' | 'Rejected';

export default function DashboardOverview({ 
  userRole = 'staffing', 
  emailAddress = 'admin@benmyl.ai', 
  companyName = 'BenMyl Operations', 
  onNavigateTab, 
  onExecuteCommand 
}: DashboardOverviewProps) {
  
  // ============================================
  // GENERIC STAFFING DASHBOARD OVERVIEW STATES & ASSETS
  // ============================================
  const [activeChartTab, setActiveChartTab] = useState<'sourcing' | 'revenue'>('sourcing');
  const [commandInput, setCommandInput] = useState('');
  const [triggerAiLoading, setTriggerAiLoading] = useState(false);
  const [aiResponseText, setAiResponseText] = useState<string | null>(null);

  const stats = [
    { label: 'Active Recruiters', value: '38', change: '+12%', trend: 'up', color: 'indigo', icon: Users },
    { label: 'Open Requirements', value: '142', change: '+8%', trend: 'up', color: 'purple', icon: Briefcase },
    { label: 'Candidate Submissions', value: '1,489', change: '+24%', trend: 'up', color: 'blue', icon: Layers },
    { label: 'Hiring Success Rate', value: '94.2%', change: '+4.1%', trend: 'up', color: 'emerald', icon: Award },
  ];

  const presets = [
    { label: "Find React developers with 5+ years", cmd: "Find Senior React developers in NYC with 5+ years experience" },
    { label: "Show inactive recruiters", cmd: "Show active recruiters with zero candidate submissions this week" },
    { label: "Generate vendor report", cmd: "Analyze and compile active Q2 premium vendor efficiency metrics" },
    { label: "Predict hiring closure rate", cmd: "Predict expected closing velocity index for hot requirements" }
  ];

  const recentActivities = [
    { id: 1, type: 'match', time: '2 mins ago', msg: 'AI-Match paired Candidate "Nolan V." with Staffing Requirement #4019 (98.2% Match Score)', sub: 'Sourcing Engine' },
    { id: 2, type: 'submission', time: '14 mins ago', msg: 'Recruiter Samantha Chen submitted 4 candidates to "Cloud Solutions Engineer" at Enterprise Tech', sub: 'Submission Gateway' },
    { id: 3, type: 'requirement', time: '1 hour ago', msg: 'New Priority requirement added: Senior Devops Specialist for HSBC Global', sub: 'Client Mapping' },
    { id: 4, type: 'vendor', time: '2 hours ago', msg: 'Vendor "Synapse Sourcing" updated 8 hot-list bench profiles with verified credentials', sub: 'Bench Validation' },
  ];

  const handleRunPreset = (cmdText: string) => {
    setCommandInput(cmdText);
    handleSearchCommand(cmdText);
  };

  const handleSearchCommand = (query: string) => {
    if (!query.trim()) return;
    setTriggerAiLoading(true);
    setAiResponseText(null);

    setTimeout(() => {
      setTriggerAiLoading(false);
      if (query.toLowerCase().includes('react')) {
        setAiResponseText('Found 14 matching candidates on bench with React Core expertise. 3 matching candidates are with status [AVAL_IMMEDIATE] (GPA 4.9/5.0). Would you like to auto-trigger a screening campaign?');
      } else if (query.toLowerCase().includes('inactive')) {
        setAiResponseText('Identified 3 active agents with < 2 submissions this week. Suggested workflow automation triggered: Auto-email coaching alert sent securely.');
      } else if (query.toLowerCase().includes('vendor')) {
        setAiResponseText('Report synthesized. Synapse Sourcing ranked #1 in Q2 response latency (14m). Click on Reports Tab to export the full analytics sheet.');
      } else {
        setAiResponseText('Predictive model calculates an overall 84.6% confidence rating for close-ratio this month (+5.4% against historical baseline). Bench capacity looks optimal.');
      }
    }, 1400);
  };


  // ============================================
  // HIGH-FIDELITY RECRUITER DESK STATES & ASSETS
  // ============================================
  const [clickupView, setClickupView] = useState<'list' | 'kanban' | 'table' | 'timeline'>('kanban');
  const [recruiterSearch, setRecruiterSearch] = useState('');
  const [dashboardDensity, setDashboardDensity] = useState<'compact' | 'relaxed'>('relaxed');
  
  // Custom layout ordering (ClickUp Widget Reordering Simulation)
  const [widgetOrder, setWidgetOrder] = useState<string[]>(['metrics', 'jobs', 'pipeline', 'collaboration', 'bench', 'scheduling', 'offer', 'analytics']);
  
  // Active requirements mapping
  const [requirements, setRequirements] = useState([
    { id: 'REQ-4019', title: 'Senior React Developer', client: 'HSBC Global Fintech', priority: 'Critical', vendorAllocated: 'Synapse Sourcing', status: 'Active', comments: 4, commentsList: ['Samantha: Nolan V is perfect here', 'Alex: Rate verified at $110/hr'] },
    { id: 'REQ-4022', title: 'AWS Cloud DevOps Architect', client: 'Amazon Web Engineering', priority: 'High', vendorAllocated: 'Elite Sourcing Partners', status: 'Active', comments: 1, commentsList: ['Aaliyah Jackson submitted in progress'] },
    { id: 'REQ-4025', title: 'Data Systems Integration Engineer', client: 'Capital Finance Network', priority: 'Medium', vendorAllocated: 'Direct Channel', status: 'Pending Approval', comments: 0, commentsList: [] },
    { id: 'REQ-4027', title: 'Lead Cybersecurity Consultant', client: 'Innovate AI Labs', priority: 'Low', vendorAllocated: 'SecureTalent Inc', status: 'Active', comments: 2, commentsList: ['Draft offer in progress'] }
  ]);

  const [activeReqIdForComments, setActiveReqIdForComments] = useState<string | null>(null);
  const [newCommentText, setNewCommentText] = useState('');
  
  // Candidates dataset for pipeline and resume drawer
  const [candidates, setCandidates] = useState([
    { id: 'CAND-9011', name: 'Nolan Vasquez', role: 'Staff React Engineer', email: 'n.vasquez@gmail.com', experience: 8, aiScore: 98, stage: 'Technical Screening' as PipelineStage, skills: ['React', 'TypeScript', 'TailwindCSS', 'Redux', 'Node.js', 'WebSockets'], education: 'B.S. Computer Science - UT Austin', file: 'Nolan_Vasquez_FrontEnd_Staffing.pdf', rating: 4.9, matchSummary: 'Direct match for HSBC requirement. Verified high score in modern hooks and microfrontend optimizations.', note: 'Spoke on 5/21: highly motivated, prefers hybrid remote setup.' },
    { id: 'CAND-9012', name: 'Elena Rostova', role: 'Staff Associate Full Stack', email: 'elena.rost@outlook.com', experience: 10, aiScore: 95, stage: 'Offered' as PipelineStage, skills: ['Python', 'Django', 'GCP', 'PostgreSQL', 'Docker', 'Angular'], education: 'M.S. Software Engineering - Stanford University', file: 'Elena_Rostova_Fullstack_Dev.pdf', rating: 4.7, matchSummary: 'Outstanding backend scaling background. Great developer leadership credentials.', note: 'Contract parameters being routed for approval.' },
    { id: 'CAND-9013', name: 'Aaliyah Jackson', role: 'Senior AWS DevOps Architect', email: 'aaliyah.jack@yahoo.com', experience: 7, aiScore: 92, stage: 'Sourced' as PipelineStage, skills: ['Terraform', 'Kubernetes', 'CI/CD Pipelines', 'AWS', 'Bash', 'Docker'], education: 'B.S. Information Tech - Georgia Tech', file: 'Aaliyah_Jackson_AWS_Architect.pdf', rating: 4.6, matchSummary: 'Solid automation infrastructure engineer. Automated multiple developer sandboxes to single-click deployments.', note: 'Scheduled screening loop invitation sent.' },
    { id: 'CAND-9014', name: 'Ji-Min Park', role: 'Data Systems Engineer', email: 'ji_min_99@naver.com', experience: 5, aiScore: 88, stage: 'Interview Scheduled' as PipelineStage, skills: ['Java', 'Spring Boot', 'Spark', 'Hadoop', 'Kafka', 'Redis'], education: 'B.S. Mathematics - KAIST', file: 'Ji_Min_Park_Data_Systems.pdf', rating: 4.5, matchSummary: 'High-volume stream loading specialist. Experience writing custom Kafka stream state decorators.', note: 'HSBC Tech panel scheduled for May 24.' },
    { id: 'CAND-9015', name: 'Marcus Sterling', role: 'Cybersecurity Analyst', email: 'm.sterling@secure.org', experience: 6, aiScore: 84, stage: 'Shortlisted' as PipelineStage, skills: ['SIEM', 'Penetration Testing', 'IDS/IPS', 'SAML', 'Okta'], education: 'B.S. Cyber Security - Purdue', file: 'Marcus_Sterling_Security.pdf', rating: 4.4, matchSummary: 'Strong compliance background. Implemented complex zero-trust networks for banking clients.', note: 'Initial phone screen passed successfully.' }
  ]);

  const [selectedCandidate, setSelectedCandidate] = useState<typeof candidates[0] | null>(null);
  const [pipelineFilter, setPipelineFilter] = useState<'All' | 'Premium'>('All');
  
  // Interactive Custom Candidate upload
  const [resumeDropActive, setResumeDropActive] = useState(false);
  const [resumeUploadSuccess, setResumeUploadSuccess] = useState(false);
  const [isParsingResume, setIsParsingResume] = useState(false);

  // Teams channel / Message integration
  const [teamsChannels, setTeamsChannels] = useState([
    { id: 'chan-1', name: 'General Staffing', unread: 2, messages: [
      { sender: 'Samantha Chen', text: 'Hey guys! We have a critical react requirements slot opened at HSBC.', time: '10:14 AM' },
      { sender: 'Alex Rivera', text: 'On it! Nolan Vasquez was placed on hotbench yesterday. Checking specs now.', time: '10:15 AM' }
    ]},
    { id: 'chan-2', name: 'Candidate Sourcing Alerts', unread: 0, messages: [
      { sender: 'S Sourcing Oracle', text: 'Parsing complete: Aaliyah Jackson CV scoring shows 92.5% AWS suitability index.', time: 'Yesterday' }
    ]},
    { id: 'chan-3', name: 'Feedback & Approvals', unread: 1, messages: [
      { sender: 'Samantha Chen', text: 'Marcus approved Elena Rostova draft offer parameters.', time: '09:00 AM' }
    ]}
  ]);
  const [activeChannelId, setActiveChannelId] = useState('chan-1');
  const [liveChatMessageInput, setLiveChatMessageInput] = useState('');
  const [smartAgentTyping, setSmartAgentTyping] = useState(false);
  
  // Scheduling States (Interviews calendar & evaluation form)
  const [interviews, setInterviews] = useState([
    { id: 'int-1', candidate: 'Ji-Min Park', role: 'Data Systems Engineer', round: 'Technical Panel (Round 2)', date: 'May 24, 2026', time: '2:00 PM EST', link: 'teams.microsoft.com/m/40192', feedbackScore: 4.5, feedbackSubmitted: true, ratings: { coding: 4.5, systemDesign: 4.2, communication: 4.8 } },
    { id: 'int-2', candidate: 'Nolan Vasquez', role: 'Staff React Engineer', round: 'System Architecture (Round 3)', date: 'May 25, 2026', time: '11:00 AM EST', link: 'teams.microsoft.com/m/31201', feedbackScore: 0, feedbackSubmitted: false, ratings: { coding: 0, systemDesign: 0, communication: 0 } }
  ]);
  const [selectedMeetingForEvaluation, setSelectedMeetingForEvaluation] = useState<typeof interviews[0] | null>(null);
  
  // Feedback scoring values
  const [commScore, setCommScore] = useState(4);
  const [codeScore, setCodeScore] = useState(4);
  const [architectureScore, setArchitectureScore] = useState(4);

  // Contract & Offer generator states
  const [offerTemplate, setOfferTemplate] = useState({
    candidateId: 'CAND-9011',
    clientName: 'HSBC Global Fintech',
    salaryRate: '$165,000 / Year',
    effectiveDate: 'June 01, 2026',
    signingBonus: '$10,000',
    termType: 'Full-Time Position',
    benefitsPackage: 'Standard Premium Health, 401(k) 5% Match, 20 Days PTO',
    signatureAuthority: 'James Carter (Managing Director)'
  });
  const [selectedOfferCandidateId, setSelectedOfferCandidateId] = useState('CAND-9011');
  const [offerStatus, setOfferStatus] = useState<'draft' | 'pending_approval' | 'sent' | 'executed'>('draft');
  const [isGeneratingDocument, setIsGeneratingDocument] = useState(false);

  // AI Recopilot persistent assistance panel
  const [copilotExpanded, setCopilotExpanded] = useState(false);
  const [copilotInput, setCopilotInput] = useState('');
  const [copilotReplies, setCopilotReplies] = useState([
    { role: 'assistant', text: '👋 Hi recruiter! I am your AI Recopilot. Ask me to formulate rejection emails, write a role description, or summarize candidate profiles instantly.' }
  ]);
  const [isCopilotTyping, setIsCopilotTyping] = useState(false);

  // Analytics tab state for interactive widget chart
  const [recruiterChartMode, setRecruiterChartMode] = useState<'submissions' | 'interviews'>('submissions');

  // Trigger automated simulation items to feel real-time
  useEffect(() => {
    if (userRole !== 'recruiter') return;
    
    // Simulate periodic teams messages
    const chatTimer = setTimeout(() => {
      setTeamsChannels(prev => prev.map(chan => {
        if (chan.id === 'chan-1') {
          return {
            ...chan,
            unread: chan.unread + 1,
            messages: [
              ...chan.messages,
              { sender: 'Samantha Chen', text: 'Just finalized client rate alignment with HSBC! Let us submit Nolan ASAP.', time: '11:41 AM' }
            ]
          };
        }
        return chan;
      }));
    }, 12000);

    return () => clearTimeout(chatTimer);
  }, [userRole]);

  // Synchronize offer letter candidate changes
  useEffect(() => {
    const matched = candidates.find(c => c.id === selectedOfferCandidateId);
    if (matched) {
      setOfferTemplate(prev => ({
        ...prev,
        candidateId: matched.id,
        salaryRate: matched.experience >= 8 ? '$175,000 / Year' : '$145,000 / Year'
      }));
    }
  }, [selectedOfferCandidateId, candidates]);

  // Drag simulation / layout shifting triggers
  const shiftWidgetUp = (widgetId: string) => {
    const index = widgetOrder.indexOf(widgetId);
    if (index > 0) {
      const newOrder = [...widgetOrder];
      newOrder[index] = newOrder[index - 1];
      newOrder[index - 1] = widgetId;
      setWidgetOrder(newOrder);
    }
  };

  const shiftWidgetDown = (widgetId: string) => {
    const index = widgetOrder.indexOf(widgetId);
    if (index >= 0 && index < widgetOrder.length - 1) {
      const newOrder = [...widgetOrder];
      newOrder[index] = newOrder[index + 1];
      newOrder[index + 1] = widgetId;
      setWidgetOrder(newOrder);
    }
  };


  // ============================================
  // RECRUITER ACTIONS HANDLERS
  // ============================================
  
  // Custom interactive CV Upload parsing hook
  const handleResumeSimulatedDrop = (e: React.FormEvent) => {
    e.preventDefault();
    setIsParsingResume(true);
    setResumeUploadSuccess(false);

    setTimeout(() => {
      setIsParsingResume(false);
      setResumeUploadSuccess(true);
      
      // Concat candidate dynamically
      const names = ['Kiran Penumatsa', 'Clara Vance', 'Rohan Gupta', 'Teresa Meyer'];
      const chosenName = names[Math.floor(Math.random() * names.length)];
      const newCandidate = {
        id: `CAND-${Math.floor(1000 + Math.random() * 9000)}`,
        name: chosenName,
        role: 'Full Stack Engineer (AI Capable)',
        email: `${chosenName.toLowerCase().replace(/\s+/g, '')}@gmail.com`,
        experience: 6,
        aiScore: Math.floor(91 + Math.random() * 8),
        stage: 'Sourced' as PipelineStage,
        skills: ['React 18', 'TypeScript', 'Node.js', 'Vite', 'Recharts'],
        education: 'B.S. Software Engineering - Stanford',
        file: `${chosenName.replace(/\s+/g, '_')}_parsed_CV.pdf`,
        rating: 4.6,
        matchSummary: 'Parsed candidate perfectly. High compliance with standard front-end pipelines and server-side state logic.',
        note: 'Uploaded via interactive file ingress dropzone.'
      };

      setCandidates(prev => [newCandidate, ...prev]);
    }, 1800);
  };

  // Add requirement custom comments
  const handleAddComment = (reqId: string) => {
    if (!newCommentText.trim()) return;
    setRequirements(prev => prev.map(req => {
      if (req.id === reqId) {
        return {
          ...req,
          comments: req.comments + 1,
          commentsList: [...req.commentsList, `Me (Recruiter): ${newCommentText}`]
        };
      }
      return req;
    }));
    setNewCommentText('');
  };

  // Move candidate pipeline stage directly
  const cycleCandidateStage = (candId: string) => {
    const stagesList: PipelineStage[] = ['Sourced', 'Submitted', 'Interview Scheduled', 'Shortlisted', 'Offered', 'Hired', 'Rejected'];
    setCandidates(prev => prev.map(cand => {
      if (cand.id === candId) {
        const nextIdx = (stagesList.indexOf(cand.stage) + 1) % stagesList.length;
        const nextStage = stagesList[nextIdx];
        
        // Log activity update
        onExecuteCommand(`Auto-Logged Stage Shift: Moved ${cand.name} to [${nextStage}] status.`);
        
        return {
          ...cand,
          stage: nextStage,
          lastUpdate: 'Just now'
        };
      }
      return cand;
    }));
    // Synchronize current drawer view if open
    if (selectedCandidate && selectedCandidate.id === candId) {
      const idx = stagesList.indexOf(selectedCandidate.stage);
      const nextStage = stagesList[(idx + 1) % stagesList.length];
      setSelectedCandidate({
        ...selectedCandidate,
        stage: nextStage
      });
    }
  };

  // Teams live response generator
  const sendTeamsMessageInput = () => {
    if (!liveChatMessageInput.trim()) return;
    const msg = { sender: 'Me (Workspace Master)', text: liveChatMessageInput, time: 'Just now' };
    
    setTeamsChannels(prev => prev.map(chan => {
      if (chan.id === activeChannelId) {
        return {
          ...chan,
          messages: [...chan.messages, msg]
        };
      }
      return chan;
    }));

    const inputMsgLower = liveChatMessageInput.toLowerCase();
    setLiveChatMessageInput('');
    setSmartAgentTyping(true);

    // Auto agent responses
    setTimeout(() => {
      setSmartAgentTyping(false);
      let answerText = "Understood. The operational node is processing coordinates.";
      
      if (inputMsgLower.includes('submit') || inputMsgLower.includes('nolan')) {
        answerText = "🤖 **AI Submissions Bot**: Verified Nolan Vasquez matched dossier specs. Preparing candidate package for submission to HSBC gold-channel portal.";
      } else if (inputMsgLower.includes('rate') || inputMsgLower.includes('salary')) {
        answerText = "🏦 **Billing Oracle**: HSBC financial baseline accepts maximum billable rate limits of $115/hr for Staff candidates. Offer parameters fall exactly within parameters.";
      } else if (inputMsgLower.includes('interview') || inputMsgLower.includes('schedule')) {
        answerText = "📅 **Microsoft Teams Integrator**: Syncing candidate outlook calendar triggers for next Tuesday afternoon. Auto-invites will populate in recruiter panels.";
      }

      setTeamsChannels(prev => prev.map(chan => {
        if (chan.id === activeChannelId) {
          return {
            ...chan,
            messages: [...chan.messages, { sender: 'AI Recopilot Assist', text: answerText, time: 'Just now' }]
          };
        }
        return chan;
      }));
    }, 1500);
  };

  // Feedback scoring submitter
  const submitMeetingFeedback = () => {
    if (!selectedMeetingForEvaluation) return;
    const computedTotal = parseFloat(((commScore + codeScore + architectureScore) / 3).toFixed(1));
    
    setInterviews(prev => prev.map(int => {
      if (int.id === selectedMeetingForEvaluation.id) {
        return {
          ...int,
          feedbackSubmitted: true,
          feedbackScore: computedTotal,
          ratings: { coding: codeScore, systemDesign: architectureScore, communication: commScore }
        };
      }
      return int;
    }));

    // Update candidate ratings
    setCandidates(prev => prev.map(cand => {
      if (cand.name === selectedMeetingForEvaluation.candidate) {
        return {
          ...cand,
          rating: computedTotal
        };
      }
      return cand;
    }));

    setSelectedMeetingForEvaluation(null);
  };

  // Offer Letter execution
  const processOfferDispatch = () => {
    setIsGeneratingDocument(true);
    setTimeout(() => {
      setIsGeneratingDocument(false);
      setOfferStatus('sent');
      
      // Update candidate stage to Offered
      setCandidates(prev => prev.map(cand => {
        if (cand.id === selectedOfferCandidateId) {
          return { ...cand, stage: 'Offered' as PipelineStage };
        }
        return cand;
      }));
    }, 1500);
  };

  // Recopilot Smart prompts
  const submitCopilotPrompt = () => {
    if (!copilotInput.trim()) return;
    const userMsg = { role: 'user', text: copilotInput };
    setCopilotReplies(prev => [...prev, userMsg]);
    
    const query = copilotInput.toLowerCase();
    setCopilotInput('');
    setIsCopilotTyping(true);

    setTimeout(() => {
      setIsCopilotTyping(false);
      let reply = "I am mapping requirements specifications to evaluate optimal solutions.";
      
      if (query.includes('rejection') || query.includes('polite')) {
        reply = `📄 **AI Draft Rejection Email**:\n\nSubject: Update regarding your application\n\nDear [Candidate_Name],\n\nThank you for taking the time to meet our technical vetting board. We were incredibly impressed by your credentials. While we have decided to proceed with other candidates whose specs match current client SLAs more tightly, we would love to keep you mapped to our active hotbench pipeline for upcoming React 18 roles.\n\nWishing you outstanding success in your search.\n\nWarmly,\nRecruiting Operations Teams`;
      } else if (query.includes('jd') || query.includes('job description') || query.includes('react')) {
        reply = `📄 **AI Job Description Generator**:\n\n**Role Title**: Staff React 18 Developer\n**Skills Required**: React 18, Vite, Custom State Engines (Redux/Zustand), Tailwind CSS, TypeScript.\n**Account**: HSBC Global Fintech SLA\n**Specs**: Core tasks include profiling bundle dimensions, optimizing paint loops, and maintaining multi-user WebSocket integrations. Apply with pristine test metrics.`;
      } else if (query.includes('summarize') || query.includes('nolan')) {
        reply = `📄 **AI Profile Summary (Nolan Vasquez)**:\n\nStaff React Engineer with 8+ years experience. Led 6 core product re-architectures reducing DOM paint latencies using pure hook structures. Scored 98.2% exact fit on cognitive sourcing algorithms. High potential, verified background indices.`;
      }

      setCopilotReplies(prev => [...prev, { role: 'assistant', text: reply }]);
    }, 1200);
  };


  // ============================================
  // RENDERING CONTROLLERS
  // ============================================
  
  // RENDER STAFFING ADMIN VIEW (Existing dashboard)
  if (userRole !== 'recruiter') {
    return (
      <div className="space-y-6 pb-12" id="staffing-dashboard-overview">
        {/* Welcome Banner Card */}
        <div className="relative overflow-hidden bg-gradient-to-r from-slate-900 to-[#5B5BD6]/80 p-6 md:p-8 rounded-3xl border border-slate-800 shadow-xl text-white">
          <div className="absolute inset-0 grid-bg opacity-15 pointer-events-none" />
          <div className="absolute -right-16 -top-16 w-64 h-64 bg-[#7B61FF]/20 blur-[120px] rounded-full pointer-events-none" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 rounded-full text-indigo-100 text-[10px] font-mono tracking-widest uppercase">
                <Sparkles className="h-3 w-3 text-white animate-spin" style={{ animationDuration: '4s' }} />
                Enterprise AI Portal Enabled
              </div>
              <h1 className="text-2xl md:text-3xl font-display font-bold tracking-tight">
                Welcome Back to BenMyl
              </h1>
              <p className="text-slate-300 text-sm max-w-xl font-sans">
                Your autonomous recruitment workflow is calibrated and running. AI neural screens completed <strong className="text-indigo-100">14,204 parsing jobs</strong> successfully today.
              </p>
            </div>
            
            <div className="flex gap-3 shrink-0">
              <button 
                onClick={() => onNavigateTab('ai-assistant')}
                className="px-4 py-2.5 bg-[#5B5BD6] hover:bg-[#4747B8] text-white rounded-xl text-xs font-semibold flex items-center gap-2 cursor-pointer border-0 transition-colors"
                id="staffing_ai_launch_btn"
              >
                <Cpu className="h-4 w-4" />
                <span>Launch AI Workspace</span>
              </button>
              <button 
                onClick={() => onNavigateTab('automation')}
                className="px-4 py-2.5 bg-white/10 hover:bg-white/15 text-white/90 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer border-0"
              >
                <span>View Active Routines</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Futuristic Command Bar */}
        <div className="bg-white rounded-2xl border border-slate-200/60 p-4 shadow-sm space-y-3 text-left">
          <label className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <Command className="h-3.5 w-3.5 text-[#5B5BD6]" />
            <span>Interactive Neural Command Interface</span>
          </label>
          
          <div className="relative flex items-center">
            <div className="absolute left-4 text-slate-400">
              <Search className="h-5 w-5" />
            </div>
            <input
              type="text"
              className="w-full pl-11 pr-24 py-3.5 rounded-xl border border-slate-200 text-sm focus:border-[#5B5BD6] focus:ring-2 focus:ring-[#5B5BD6]/10 placeholder:text-slate-400 outline-none transition-all text-slate-800"
              placeholder="Type a recruiter, requirement, or AI neural action e.g. 'Show active recruiters with 5+ years React experience'..."
              value={commandInput}
              onChange={(e) => setCommandInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearchCommand(commandInput)}
            />
            <button
              onClick={() => handleSearchCommand(commandInput)}
              className="absolute right-2 px-4 py-2 bg-[#5B5BD6] hover:bg-[#4747B8] text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors border-0"
            >
              <span>Ask AI</span>
              <Send className="h-3 w-3" />
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 pt-1.5">
            <span className="text-[10px] text-slate-400 mr-1.5 font-sans">Quick Prompts:</span>
            {presets.map((p, index) => (
              <button
                key={index}
                onClick={() => handleRunPreset(p.cmd)}
                className="px-3 py-1.5 bg-slate-50 border border-slate-200 text-slate-600 hover:text-[#5B5BD6] hover:border-[#5B5BD6]/30 hover:bg-[#5B5BD6]/5 text-[11px] font-medium rounded-lg transition-all cursor-pointer whitespace-nowrap"
              >
                {p.label}
              </button>
            ))}
          </div>

          <AnimatePresence>
            {triggerAiLoading && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="p-3 bg-[#5B5BD6]/5 rounded-xl border border-[#5B5BD6]/10 flex items-center justify-center gap-2.5 mt-2"
              >
                <RefreshCw className="h-4 w-4 text-[#5B5BD6] animate-spin" />
                <span className="text-xs font-mono text-[#5B5BD6] tracking-wide">AI Neural processor analyzing requirement matrix indexes...</span>
              </motion.div>
            )}

            {!triggerAiLoading && aiResponseText && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="p-4 bg-[#5B5BD6]/5 border border-[#5B5BD6]/15 rounded-xl space-y-2 mt-2"
              >
                <div className="flex items-center justify-between text-[10px] font-mono font-semibold text-[#5B5BD6] uppercase tracking-wider">
                  <span className="flex items-center gap-1">
                    <Cpu className="h-3.5 w-3.5 text-[#5B5BD6] animate-pulse" />
                    <span>Interactive Resolution Node Completed</span>
                  </span>
                  <span>Response Confidence: 99.4%</span>
                </div>
                <p className="text-xs text-slate-900 font-sans leading-relaxed">
                  {aiResponseText}
                </p>
                <div className="flex justify-end gap-2 pt-1 border-t border-[#5B5BD6]/10">
                  <button 
                    onClick={() => { setAiResponseText(null); setCommandInput(''); }}
                    className="px-2.5 py-1 text-slate-400 hover:text-slate-600 text-[10px] font-medium uppercase border-0 bg-transparent cursor-pointer"
                  >
                    Dismiss
                  </button>
                  <button 
                    onClick={() => {
                      onNavigateTab(commandInput.toLowerCase().includes('report') ? 'reports' : 'ai-assistant');
                    }}
                    className="px-3 py-1 bg-indigo-600 hover:bg-indigo-700 text-white text-[10px] font-semibold uppercase rounded-md shadow-sm border-0 cursor-pointer"
                  >
                    Execute Auto-Workflow
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Grid of Key AI Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div 
                key={index} 
                className="bg-white rounded-2xl border border-slate-200/60 p-5 shadow-sm space-y-3 relative overflow-hidden group hover:shadow-md transition-all duration-300 text-left"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-400 tracking-wide font-sans">{item.label}</span>
                  <div className="p-2 rounded-xl bg-slate-50 text-[#5B5BD6] border border-slate-100">
                    <IconComponent className="h-4.5 w-4.5 text-[#5B5BD6]" />
                  </div>
                </div>
                
                <div className="flex items-baseline justify-between">
                  <h3 className="text-2xl font-display font-bold text-slate-900 tracking-tight">{item.value}</h3>
                  <span className="text-xs font-mono font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                    {item.change}
                  </span>
                </div>
                
                <div className="pt-2 border-t border-slate-50 flex items-center justify-between text-[10px] text-slate-400">
                  <span>Last calibrated 5m ago</span>
                  <span className="text-emerald-600 flex items-center gap-0.5">
                    <ArrowUpRight className="h-3 w-3" />
                    <span>Optimal Flow</span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Layout Split: Analytics Visualizer & Active Alert Log Timeline */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/60 p-5 shadow-sm flex flex-col justify-between space-y-4 text-left">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="font-display font-bold text-slate-950 text-sm">Hiring Activity Velocity Index</h3>
                <p className="text-slate-400 text-xs">Real-time mapping of applicant pipelines & revenue capture</p>
              </div>
              
              <div className="flex bg-slate-100 p-0.5 rounded-lg border border-slate-200 self-start">
                <button
                  onClick={() => setActiveChartTab('sourcing')}
                  className={`px-3 py-1 rounded-md text-xs font-semibold cursor-pointer border-0 transition-all ${
                    activeChartTab === 'sourcing' 
                      ? 'bg-white text-slate-950 shadow-sm' 
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  Pipeline Volume
                </button>
                <button
                  onClick={() => setActiveChartTab('revenue')}
                  className={`px-3 py-1 rounded-md text-xs font-semibold cursor-pointer border-0 transition-all ${
                    activeChartTab === 'revenue' 
                      ? 'bg-white text-[#1F2937] shadow-sm' 
                      : 'text-slate-500 hover:text-slate-850'
                  }`}
                >
                  Revenue Stream (k$)
                </button>
              </div>
            </div>

            <div className="h-64 w-full relative flex items-center justify-center p-2 bg-slate-50/50 rounded-xl border border-slate-100">
              {activeChartTab === 'sourcing' ? (
                <svg className="w-full h-full animate-fade-in" viewBox="0 0 500 200" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#5B5BD6" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#5B5BD6" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  <line x1="0" y1="40" x2="500" y2="40" stroke="#f1f5f9" strokeWidth="1" />
                  <line x1="0" y1="100" x2="500" y2="100" stroke="#f1f5f9" strokeWidth="1" />
                  <line x1="0" y1="160" x2="500" y2="160" stroke="#f1f5f9" strokeWidth="1" />
                  
                  <path d="M 0,160 Q 100,60 200,100 T 400,30 L 500,80 L 500,200 L 0,200 Z" fill="url(#chartGradient)" />
                  <path d="M 0,160 Q 100,60 200,100 T 400,30 L 500,80" fill="none" stroke="#5B5BD6" strokeWidth="3" strokeLinecap="round" />
                  
                  <circle cx="200" cy="100" r="5" fill="#5B5BD6" stroke="#ffffff" strokeWidth="2" />
                  <circle cx="400" cy="30" r="5" fill="#ef4444" stroke="#ffffff" strokeWidth="2" />
                  
                  <text x="210" y="95" fill="#5B5BD6" fontSize="9" fontWeight="bold" fontFamily="monospace">982 NEW SOURCED</text>
                  <text x="410" y="35" fill="#ef4444" fontSize="9" fontWeight="bold" fontFamily="monospace">MAX CAP (1.4K)</text>
                </svg>
              ) : (
                <svg className="w-full h-full animate-fade-in" viewBox="0 0 500 200" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="revGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#7B61FF" stopOpacity="0.2" />
                      <stop offset="100%" stopColor="#7B61FF" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <line x1="0" y1="40" x2="500" y2="40" stroke="#f1f5f9" strokeWidth="1" />
                  <line x1="0" y1="100" x2="500" y2="100" stroke="#f1f5f9" strokeWidth="1" />
                  <line x1="0" y1="160" x2="500" y2="160" stroke="#f1f5f9" strokeWidth="1" />
                  
                  <path d="M 0,190 L 80,160 L 160,110 L 240,120 L 320,80 L 400,60 L 500,40 L 500,200 L 0,200 Z" fill="url(#revGradient)" />
                  <path d="M 0,190 L 80,160 L 160,110 L 240,120 L 320,80 L 400,60 L 500,40" fill="none" stroke="#7B61FF" strokeWidth="3" strokeLinecap="round" />
                  
                  <circle cx="320" cy="80" r="5" fill="#7B61FF" stroke="#ffffff" strokeWidth="2" />
                  <circle cx="500" cy="40" r="5" fill="#10b981" stroke="#ffffff" strokeWidth="2" />
                  
                  <text x="330" y="85" fill="#7B61FF" fontSize="9" fontWeight="bold" fontFamily="monospace">$480K Q1</text>
                  <text x="440" y="35" fill="#10b981" fontSize="9" fontWeight="bold" fontFamily="monospace">$894K PROJ</text>
                </svg>
              )}

              <div className="absolute bottom-2 inset-x-4 flex justify-between text-[10px] font-mono text-slate-400">
                <span>MONDAY</span>
                <span>TUESDAY</span>
                <span>WEDNESDAY</span>
                <span>THURSDAY</span>
                <span>FRIDAY (CURRENT)</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-3 border-t border-slate-100">
              <div>
                <span className="text-[10px] uppercase font-mono block text-slate-400">Avg Recruitment Cycle</span>
                <span className="text-sm font-semibold text-slate-800 font-sans">11.4 Days</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-mono block text-slate-400">AI Score Success rate</span>
                <span className="text-sm font-semibold text-[#5B5BD6] font-sans">98.4% Accuracy</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-mono block text-slate-400">Yield Index growth</span>
                <span className="text-sm font-semibold text-emerald-600 font-sans">+14% Growth</span>
              </div>
            </div>
          </div>

          {/* Live Activity & Alert Log Timeline */}
          <div className="bg-white rounded-2xl border border-slate-200/60 p-5 shadow-sm space-y-4 text-left">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-display font-bold text-slate-950 text-sm">Autonomous Activity Log</h3>
                <p className="text-slate-400 text-xs">Live triggers from sourcing systems</p>
              </div>
              <Activity className="h-4.5 w-4.5 text-[#5B5BD6] animate-pulse" />
            </div>

            <div className="space-y-4 max-h-72 overflow-y-auto pr-1">
              {recentActivities.map((act) => (
                <div key={act.id} className="relative pl-5 border-l border-slate-100 pb-3 last:pb-0">
                  <div className="absolute -left-1.5 top-1 h-3 w-3 rounded-full bg-[#5B5BD6] border border-white" />
                  
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[11px] font-medium text-slate-400">
                      <span className="font-mono text-[#5B5BD6] bg-[#5B5BD6]/5 px-1.5 py-0.5 rounded text-[10px] font-semibold">
                        {act.sub}
                      </span>
                      <span>{act.time}</span>
                    </div>
                    <p className="text-[11px] text-slate-700 leading-normal font-sans">
                      {act.msg}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 flex items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                <span className="text-[11px] text-slate-500 leading-none">Security token protocol compliant</span>
              </div>
              <span className="font-mono text-[10px] text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded font-bold">● EXCELLENT</span>
            </div>
          </div>
        </div>

        {/* Quick Action Operations Pane */}
        <div className="bg-white rounded-2xl border border-slate-200/60 p-5 shadow-sm space-y-4 text-left">
          <div>
            <h3 className="font-display font-bold text-slate-950 text-sm">Quick Action Command Console</h3>
            <p className="text-slate-400 text-xs">Launch background processes or manual calibration flows instantly</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div 
              onClick={() => onNavigateTab('recruiters')}
              className="p-4 rounded-xl border border-slate-150 bg-slate-50/50 hover:bg-[#5B5BD6]/5 hover:border-[#5B5BD6]/20 transition-all cursor-pointer space-y-2 group"
            >
              <div className="h-10 w-10 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-[#5B5BD6]">
                <Users className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-display font-semibold text-xs text-slate-900 group-hover:text-[#5B5BD6]">Add New Recruiter</h4>
                <p className="text-[10px] text-slate-400 leading-tight">Configure profile, access limits, and KPI scoreboards.</p>
              </div>
            </div>

            <div 
              onClick={() => onNavigateTab('requirements')}
              className="p-4 rounded-xl border border-slate-150 bg-slate-50/50 hover:bg-[#7b61ff]/5 hover:border-[#7b61ff]/20 transition-all cursor-pointer space-y-2 group"
            >
              <div className="h-10 w-10 rounded-lg bg-purple-50 border border-purple-100 flex items-center justify-center text-[#7b61ff]">
                <Briefcase className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-display font-semibold text-xs text-slate-900 group-hover:text-[#7b61ff]">Post Open Requirement</h4>
                <p className="text-[10px] text-slate-400 leading-tight">Map client specs and triggers to premium vendors instantly.</p>
              </div>
            </div>

            <div 
              onClick={() => onNavigateTab('ai-assistant')}
              className="p-4 rounded-xl border border-slate-150 bg-slate-50/50 hover:bg-emerald-500/5 hover:border-emerald-200 transition-all cursor-pointer space-y-2 group"
            >
              <div className="h-10 w-10 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
                <Sparkles className="h-5 w-5 animate-spin" style={{ animationDuration: '6s' }} />
              </div>
              <div>
                <h4 className="font-display font-semibold text-xs text-slate-900 group-hover:text-emerald-600">Auto Neural Match Sync</h4>
                <p className="text-[10px] text-slate-400 leading-tight">Audit talent inventory profiles against hot vacancies.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }


  // ============================================
  // RENDER COMPLETE RECRUITER DESK VIEWPORTS
  // ============================================
  return (
    <div className="space-y-6 pb-12 relative font-sans text-left" id="recruiter-workspace-root">
      
      {/* 1. Collapsible Recopilot Floating Assist Trigger & Drawer */}
      <div className="fixed bottom-6 left-6 z-40">
        <motion.button
          onClick={() => setCopilotExpanded(!copilotExpanded)}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.98 }}
          className="h-12 border-0 rounded-2xl bg-gradient-to-r from-[#5B5BD6] to-[#7B61FF] text-white font-semibold text-xs px-4 flex items-center gap-2 shadow-2xl cursor-pointer"
        >
          <Sparkles className="h-4 w-4 animate-pulse" />
          <span>{copilotExpanded ? 'Hide AI Recopilot' : 'Open AI Recopilot'}</span>
        </motion.button>
      </div>

      <AnimatePresence>
        {copilotExpanded && (
          <div className="fixed inset-0 z-45 flex justify-end">
            {/* Backdrop click dismiss */}
            <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-3xs" onClick={() => setCopilotExpanded(false)} />
            
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 24, stiffness: 180 }}
              className="w-full max-w-sm bg-white h-full relative z-10 shadow-2xl border-l border-slate-200 flex flex-col justify-between"
              id="ai-recopilot-drawer"
            >
              {/* Header */}
              <div className="p-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-lg bg-[#5B5BD6]/15 text-[#5B5BD6] flex items-center justify-center">
                    <Cpu className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-xs text-slate-900">AI Recopilot</h4>
                    <span className="text-[8px] font-mono font-bold text-[#5B5BD6] uppercase tracking-wider">BenMyl Operations Helper</span>
                  </div>
                </div>
                <button onClick={() => setCopilotExpanded(false)} className="bg-transparent border-0 text-slate-400 hover:text-slate-600 cursor-pointer">
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Chat Thread */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#F8FAF9]/30">
                {copilotReplies.map((reply, rIdx) => (
                  <div key={rIdx} className={`flex ${reply.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`p-3 rounded-2xl max-w-[85%] text-xs leading-relaxed whitespace-pre-wrap ${
                      reply.role === 'user' 
                        ? 'bg-[#5B5BD6] text-white rounded-br-none' 
                        : 'bg-white border border-slate-200 text-slate-800 rounded-bl-none shadow-3xs'
                    }`}>
                      {reply.text}
                    </div>
                  </div>
                ))}
                {isCopilotTyping && (
                  <div className="flex justify-start">
                    <div className="bg-white border border-slate-200 p-2.5 px-3 rounded-xl flex items-center gap-1">
                      <RefreshCw className="h-3.5 w-3.5 text-[#5B5BD6] animate-spin" />
                      <span className="text-[10px] text-slate-400 font-mono">Recopilot reasoning...</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Smart Prompt Suggestions */}
              <div className="p-3 bg-slate-50/50 border-t border-slate-100 flex flex-wrap gap-1.5 justify-center">
                <button onClick={() => { setCopilotInput('Draft a polite rejection email'); }} className="px-2.5 py-1 rounded bg-white border border-slate-200 text-[10px] text-slate-600 hover:text-[#5B5BD6]">Rejection Draft</button>
                <button onClick={() => { setCopilotInput('Generate a React Job Description'); }} className="px-2.5 py-1 rounded bg-white border border-slate-200 text-[10px] text-slate-600 hover:text-[#5B5BD6]">Write React JD</button>
                <button onClick={() => { setCopilotInput('Summarize Candidate Nolan Vasquez'); }} className="px-2.5 py-1 rounded bg-white border border-slate-200 text-[10px] text-slate-600 hover:text-[#5B5BD6]">Summarize Nolan</button>
              </div>

              {/* Input */}
              <div className="p-4 border-t border-slate-100">
                <div className="flex gap-2 relative">
                  <input
                    type="text"
                    value={copilotInput}
                    onChange={(e) => setCopilotInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && submitCopilotPrompt()}
                    placeholder="Ask Recopilot to write emails, JDs, or audit..."
                    className="w-full text-xs rounded-xl border border-slate-200 pl-3 pr-10 py-2.5 focus:border-[#5B5BD6] outline-none"
                  />
                  <button onClick={submitCopilotPrompt} className="absolute right-1.5 top-1.5 h-7 w-7 border-0 bg-[#5B5BD6] text-white flex items-center justify-center rounded-lg hover:bg-opacity-90 cursor-pointer">
                    <Send className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Recruiter Workspace Core Top Bar */}
      <div className="relative overflow-hidden bg-white border border-slate-200/80 p-5 md:p-6 rounded-3xl shadow-sm text-slate-900">
        <div className="absolute top-0 right-0 w-36 h-36 bg-[#5B5BD6]/5 blur-2xl rounded-full" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#7B61FF]/4 blur-2xl rounded-full" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1 bg-indigo-50 border border-indigo-150 px-2.5 py-0.5 rounded-full text-[#5B5BD6] text-[9px] font-mono tracking-widest uppercase font-bold">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Personal Recruiter Core</span>
            </div>
            <h1 className="text-xl md:text-2xl font-display font-extrabold tracking-tight text-slate-950">
              Operations Center • Workspace #27
            </h1>
            <p className="text-slate-500 text-xs font-sans leading-relaxed">
              Assigned Recruiter Desk for <span className="text-slate-800 font-bold">{emailAddress || 'recruiter@benmyl.ai'}</span>. Managing active requirements streams, Outlook sync, and cognitive screening pipelines.
            </p>
          </div>

          {/* Quick Toolbar settings */}
          <div className="flex items-center gap-2 shrink-0 flex-wrap">
            <div className="flex bg-slate-100 p-0.5 rounded-xl border border-slate-200 select-none">
              <button 
                onClick={() => setDashboardDensity('relaxed')} 
                className={`py-1 px-2 text-[10px] font-bold rounded-lg ${dashboardDensity === 'relaxed' ? 'bg-white text-slate-900 shadow-3xs' : 'text-slate-400 hover:text-slate-650'}`}
              >
                Normal Grid
              </button>
              <button 
                onClick={() => setDashboardDensity('compact')} 
                className={`py-1 px-2 text-[10px] font-bold rounded-lg ${dashboardDensity === 'compact' ? 'bg-white text-slate-900 shadow-3xs' : 'text-slate-400 hover:text-slate-650'}`}
              >
                Compact Desk
              </button>
            </div>
            
            <button 
              onClick={() => onExecuteCommand('Audit entire active candidate queue with HSBC spec requirements.')}
              className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-[10.5px] font-bold text-slate-600 hover:text-[#5B5BD6] hover:border-[#5B5BD6]/30 cursor-pointer transition-all flex items-center gap-1"
            >
              <RefreshCw className="h-3 w-3 animate-pulse" />
              <span>Recalibrate Match Scores</span>
            </button>
          </div>
        </div>
      </div>

      {/* RENDER MODULAR RECRUITER CUSTOM DOCK IN DENSITY STYLE */}
      <div className={`grid grid-cols-1 ${dashboardDensity === 'relaxed' ? 'lg:grid-cols-3' : 'lg:grid-cols-4'} gap-6`}>
        
        {/* LOOP THROUGH CUSTOMIZABLE SORTED WIDGETS */}
        {widgetOrder.map((widgetId) => {
          
          // ============================================
          // 2. ACTIVE METRICS KPI PANEL
          // ============================================
          if (widgetId === 'metrics') {
            return (
              <div key={widgetId} className="lg:col-span-3 bg-white rounded-2xl border border-slate-200/60 p-4 shadow-sm flex flex-col justify-between" id="recruiter-metrics-panel">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <div className="flex items-center gap-1.5">
                    <Award className="h-4.5 w-4.5 text-[#5B5BD6]" />
                    <h3 className="font-display font-black text-slate-900 text-xs uppercase tracking-wider">Operational Yield Scoreboard</h3>
                  </div>
                  <div className="flex gap-1">
                    <button onClick={() => shiftWidgetDown('metrics')} className="h-5 w-5 bg-slate-100 border-0 rounded text-[9px] hover:bg-slate-200 cursor-pointer">▼</button>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
                  <div className="p-3 bg-slate-50 rounded-xl space-y-1">
                    <span className="text-[9px] font-mono text-slate-400 uppercase tracking-wider">Active Submissions</span>
                    <strong className="block font-display text-xl text-[#00203f]">142</strong>
                    <span className="text-[10px] text-emerald-600 font-mono font-bold">+18% This Week</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl space-y-1">
                    <span className="text-[9px] font-mono text-slate-400 uppercase tracking-wider">Interview Ratio</span>
                    <strong className="block font-display text-xl text-indigo-600">84.2%</strong>
                    <span className="text-[10px] text-slate-400 font-mono font-bold">Standard Gold SLA</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl space-y-1">
                    <span className="text-[9px] font-mono text-slate-400 uppercase tracking-wider">Placements Secured</span>
                    <strong className="block font-display text-xl text-emerald-600">14 Vacancies</strong>
                    <span className="text-[10px] text-emerald-600 font-mono font-bold">$1.2M Capture Pool</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl space-y-1">
                    <span className="text-[9px] font-mono text-slate-400 uppercase tracking-wider">Response Latency</span>
                    <strong className="block font-display text-xl text-orange-600">&lt; 14 Mins</strong>
                    <span className="text-[10px] text-orange-600 font-mono font-bold">Excellent Ratio</span>
                  </div>
                </div>
              </div>
            );
          }

          // ============================================
          // 3. JOB REQUIREMENTS WORKSPACE (CLICKUP STYLE)
          // ============================================
          if (widgetId === 'jobs') {
            return (
              <div key={widgetId} className="lg:col-span-3 bg-white rounded-2xl border border-slate-200/60 p-5 shadow-sm space-y-4" id="recruiter-jobs-clickup-workspace">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <Briefcase className="h-5 w-5 text-[#5B5BD6]" />
                    <div>
                      <h3 className="font-display font-extrabold text-slate-900 text-sm">Job Requirements Workspace</h3>
                      <p className="text-[10px] text-slate-405 leading-none">ClickUp-inspired task dashboard loop</p>
                    </div>
                  </div>

                  {/* Views Toggles */}
                  <div className="flex items-center gap-1">
                    <div className="flex bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-[10px]">
                      <button onClick={() => setClickupView('kanban')} className={`py-1 px-2.5 rounded-md font-bold ${clickupView === 'kanban' ? 'bg-white text-slate-900' : 'text-slate-400'}`}>Kanban View</button>
                      <button onClick={() => setClickupView('table')} className={`py-1 px-2.5 rounded-md font-bold ${clickupView === 'table' ? 'bg-white text-slate-900' : 'text-slate-400'}`}>Table View</button>
                      <button onClick={() => setClickupView('list')} className={`py-1 px-2.5 rounded-md font-bold ${clickupView === 'list' ? 'bg-white text-slate-900' : 'text-slate-400'}`}>List View</button>
                      <button onClick={() => setClickupView('timeline')} className={`py-1 px-2.5 rounded-md font-bold ${clickupView === 'timeline' ? 'bg-white text-slate-900' : 'text-slate-400'}`}>Timeline View</button>
                    </div>
                    <div className="flex border-l border-slate-200 pl-1.5 gap-0.5">
                      <button onClick={() => shiftWidgetUp('jobs')} className="h-5 w-5 bg-slate-100 hover:bg-slate-200 border-0 rounded text-[9px] cursor-pointer">▲</button>
                      <button onClick={() => shiftWidgetDown('jobs')} className="h-5 w-5 bg-slate-100 hover:bg-slate-200 border-0 rounded text-[9px] cursor-pointer">▼</button>
                    </div>
                  </div>
                </div>

                {/* Requirements Rendering Views */}
                <div>
                  {clickupView === 'table' && (
                    <div className="overflow-x-auto border border-slate-200/80 rounded-2xl bg-[#FCFDFE]">
                      <table className="w-full text-left border-collapse text-xs select-text">
                        <thead>
                          <tr className="bg-slate-50 border-b border-slate-100 text-[9px] font-mono text-slate-400 uppercase tracking-widest font-bold">
                            <th className="py-2.5 px-3">REQ CODE</th>
                            <th className="py-2.5 px-3">JD TITLE</th>
                            <th className="py-2.5 px-3">CLIENT ACCOUNT</th>
                            <th className="py-2.5 px-3">PRIORITY</th>
                            <th className="py-2.5 px-3">ALLOCATED SUPPLIER</th>
                            <th className="py-2.5 px-3 text-right">COMMENTS</th>
                          </tr>
                        </thead>
                        <tbody>
                          {requirements.map((req) => (
                            <tr key={req.id} className="border-b border-slate-100 hover:bg-[#5B5BD6]/5 transition-colors">
                              <td className="py-2.5 px-3 font-mono font-bold text-slate-500">{req.id}</td>
                              <td className="py-2.5 px-3 font-sans font-bold text-slate-800">{req.title}</td>
                              <td className="py-2.5 px-3 text-slate-550 font-medium">{req.client}</td>
                              <td className="py-2.5 px-3">
                                <span className={`px-2 py-0.5 rounded text-[8.5px] font-mono font-bold uppercase tracking-wider ${
                                  req.priority === 'Critical' ? 'bg-red-50 text-red-600 border border-red-100' :
                                  req.priority === 'High' ? 'bg-amber-50 text-amber-600 border border-amber-100' :
                                  'bg-slate-50 text-slate-500'
                                }`}>
                                  {req.priority}
                                </span>
                              </td>
                              <td className="py-2.5 px-3 text-indigo-600 font-mono text-[10px] font-semibold">{req.vendorAllocated}</td>
                              <td className="py-2.5 px-3 text-right">
                                <button 
                                  onClick={() => setActiveReqIdForComments(activeReqIdForComments === req.id ? null : req.id)}
                                  className="text-[10px] border-0 bg-transparent text-[#5B5BD6] font-bold hover:underline cursor-pointer"
                                >
                                  {req.comments} Comments
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {clickupView === 'kanban' && (
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      {['Critical', 'High', 'Medium', 'Low'].map((prio) => {
                        const prioReqs = requirements.filter(r => r.priority === prio);
                        return (
                          <div key={prio} className="bg-slate-50 p-3 rounded-2xl border border-slate-150 space-y-3">
                            <div className="flex items-center justify-between pb-1 border-b border-slate-200">
                              <span className={`text-[9px] font-mono uppercase tracking-widest font-extrabold ${
                                prio === 'Critical' ? 'text-rose-600' :
                                prio === 'High' ? 'text-amber-600' :
                                'text-slate-500'
                              }`}>{prio} priority</span>
                              <span className="text-[10px] font-mono font-bold text-slate-400 bg-white px-2 py-0.5 rounded-full border border-slate-200/40">{prioReqs.length}</span>
                            </div>

                            <div className="space-y-2">
                              {prioReqs.map(req => (
                                <div key={req.id} className="bg-white border border-slate-200 p-3 rounded-xl flex flex-col justify-between h-28 hover:shadow-xs transition-shadow">
                                  <div className="space-y-1">
                                    <span className="text-[8px] font-mono text-indigo-500 font-bold block">{req.id} • {req.client}</span>
                                    <strong className="text-[11px] block leading-tight text-slate-800 line-clamp-2">{req.title}</strong>
                                  </div>
                                  <div className="flex items-center justify-between pt-1 border-t border-slate-50 mt-1">
                                    <span className="text-[8.5px] font-mono font-bold text-teal-600 uppercase bg-teal-50 px-1.5 rounded">{req.status}</span>
                                    <button 
                                      onClick={() => setActiveReqIdForComments(req.id)}
                                      className="text-[9px] border-0 bg-[#5B5BD6]/5 text-[#5B5BD6] px-1.5 py-0.5 rounded font-bold hover:bg-[#5B5BD6]/10"
                                    >
                                      Chat ({req.comments})
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {clickupView === 'list' && (
                    <div className="space-y-2">
                      {requirements.map((req) => (
                        <div key={req.id} className="p-3.5 bg-[#FBFDFD] border border-slate-200 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-3 hover:border-indigo-200 transition-all">
                          <div className="flex items-center gap-3">
                            <span className="text-[10px] font-mono text-[#5B5BD6] font-bold bg-[#5B5BD6]/5 p-1 rounded border border-[#5B5BD6]/10">{req.id}</span>
                            <div className="text-left leading-normal">
                              <strong className="text-xs font-semibold text-slate-900 block">{req.title}</strong>
                              <span className="text-[10px] text-slate-400">Account Company: {req.client} • Allocated partner supplier: <span className="font-semibold text-slate-600">{req.vendorAllocated}</span></span>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2 self-end md:self-center">
                            <span className={`text-[8.5px] font-mono px-2 py-0.5 rounded font-bold uppercase tracking-wider ${
                              req.priority === 'Critical' ? 'bg-rose-50 text-rose-600 border border-rose-100' : 'bg-slate-50 text-slate-500'
                            }`}>{req.priority}</span>
                            <button 
                              onClick={() => setActiveReqIdForComments(req.id)}
                              className="text-[11px] font-bold text-[#5B5BD6] hover:underline bg-transparent border-0"
                            >
                              Notes & Comments ({req.comments})
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {clickupView === 'timeline' && (
                    <div className="border border-slate-150 rounded-2xl bg-slate-50 p-4 space-y-3 font-mono text-[10px]">
                      <div className="flex justify-between border-b pb-1.5 text-slate-400 text-[9px] font-bold">
                        <span>MAY W3</span>
                        <span>MAY W4 (CURRENT)</span>
                        <span>JUN W1</span>
                        <span>JUN W2</span>
                      </div>
                      
                      <div className="space-y-2 text-left">
                        {requirements.map((req, rIdx) => (
                          <div key={req.id} className="flex items-center gap-4">
                            <span className="w-20 truncate block shrink-0 font-bold text-slate-500">{req.id}</span>
                            <div className="flex-1 bg-white h-6 rounded-lg border border-slate-200 relative overflow-hidden">
                              <div 
                                className="absolute h-full bg-indigo-500/25 border-l-4 border-indigo-500" 
                                style={{ 
                                  left: `${rIdx * 15 + 5}%`, 
                                  width: `${40 + rIdx * 5}%` 
                                }}
                              >
                                <span className="text-[8.5px] px-2 leading-6 block truncate text-indigo-950 font-bold font-sans">{req.title}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Collapsible Requirement Chat Panel drawer inside job workspace */}
                <AnimatePresence>
                  {activeReqIdForComments && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3"
                    >
                      <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                        <span className="text-[9px] font-mono font-bold text-[#5B5BD6] uppercase tracking-widest">
                          Requirement Thread: {activeReqIdForComments}
                        </span>
                        <button onClick={() => setActiveReqIdForComments(null)} className="h-5 w-5 bg-transparent border-0 text-slate-400 hover:text-slate-600 block cursor-pointer">
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </div>

                      <div className="space-y-2 max-h-36 overflow-y-auto w-full text-left bg-white p-3 rounded-lg border border-slate-150">
                        {requirements.find(r => r.id === activeReqIdForComments)?.commentsList.length === 0 ? (
                          <p className="text-[10px] text-slate-400 py-2">No comments posted yet. Start formatting candidate qualifications!</p>
                        ) : (
                          requirements.find(r => r.id === activeReqIdForComments)?.commentsList.map((comm, idx) => (
                            <div key={idx} className="text-[10.5px] pb-1 border-b border-slate-50 last:border-0 leading-relaxed font-sans text-slate-700">
                              {comm}
                            </div>
                          ))
                        )}
                      </div>

                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={newCommentText}
                          onChange={(e) => setNewCommentText(e.target.value)}
                          placeholder="Type team comment, rate update, spec adjustments..."
                          className="flex-1 text-xs rounded-lg border border-slate-200 pl-3.5 py-1.5 bg-white outline-none"
                        />
                        <button 
                          onClick={() => handleAddComment(activeReqIdForComments)}
                          className="px-3 bg-[#5B5BD6] hover:bg-[#4747B8] text-white text-[10.5px] font-bold rounded-lg border-0 cursor-pointer transition-all"
                        >
                          Comment
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          }

          // ============================================
          // 4. CANDIDATE MANAGEMENT FLOW (PIPELINE CARD BOARD / WORKSPACE)
          // ============================================
          if (widgetId === 'pipeline') {
            return (
              <div key={widgetId} className="lg:col-span-3 bg-white rounded-2xl border border-slate-200/60 p-5 shadow-sm space-y-4" id="candidate-pipeline-workspace">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-[#5B5BD6]" />
                    <div>
                      <h3 className="font-display font-extrabold text-slate-900 text-sm">Interactive Sourcing Pipeline</h3>
                      <p className="text-[10px] text-slate-405 leading-none">Move candidates across lifecycle stages</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-wrap">
                    <div className="flex bg-slate-100 p-0.5 rounded-lg border border-indigo-50 text-[10px]">
                      <button onClick={() => setPipelineFilter('All')} className={`py-1 px-2.5 rounded-md font-bold ${pipelineFilter === 'All' ? 'bg-white text-slate-900' : 'text-slate-400'}`}>All Candidates</button>
                      <button onClick={() => setPipelineFilter('Premium')} className={`py-1 px-2.5 rounded-md font-bold ${pipelineFilter === 'Premium' ? 'bg-white text-slate-900' : 'text-slate-400'}`}>AI Match &gt; 90%</button>
                    </div>
                    <div className="flex border-l pl-2 gap-0.5">
                      <button onClick={() => shiftWidgetUp('pipeline')} className="h-5 w-5 bg-slate-100 border-0 rounded text-[9px] cursor-pointer">▲</button>
                      <button onClick={() => shiftWidgetDown('pipeline')} className="h-5 w-5 bg-slate-100 border-0 rounded text-[9px] cursor-pointer">▼</button>
                    </div>
                  </div>
                </div>

                {/* Resume drop/upload simulator zone */}
                <form 
                  onSubmit={handleResumeSimulatedDrop}
                  className={`border-2 border-dashed p-4 rounded-2xl text-center cursor-pointer transition-all ${
                    resumeDropActive ? 'border-[#5B5BD6] bg-[#5B5BD6]/5' : 'border-slate-200 hover:border-[#5B5BD6]/40 bg-slate-50/50'
                  }`}
                  onDragOver={(e) => { e.preventDefault(); setResumeDropActive(true); }}
                  onDragLeave={() => setResumeDropActive(false)}
                  onDrop={(e) => { e.preventDefault(); setResumeDropActive(false); handleResumeSimulatedDrop(e); }}
                >
                  <label className="cursor-pointer space-y-1 block md:flex md:items-center md:justify-center md:gap-3">
                    <input type="file" className="hidden" onChange={handleResumeSimulatedDrop} />
                    <Layers className="h-7 w-7 text-indigo-500 mx-auto md:mx-0 animate-bounce" />
                    <div className="text-left md:leading-normal">
                      <strong className="text-[11.5px] block text-slate-800">Splat/Drag Applicant CV Here</strong>
                      <span className="text-[9.5px] text-slate-450 block">Simulate automated ingress parsing engine (React, TypeScript, DevOps, Spring Boot)</span>
                    </div>
                    <button type="submit" className="hidden">Submit File</button>
                  </label>

                  <AnimatePresence>
                    {isParsingResume && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-2.5 text-xs text-[#5B5BD6] bg-indigo-50 rounded-xl mt-3 flex items-center justify-center gap-2">
                        <RefreshCw className="h-4 w-4 animate-spin text-[#5B5BD6]" />
                        <span>AI Cognitive Sourcing Oracle parsing file contents & indexing metadata...</span>
                      </motion.div>
                    )}

                    {resumeUploadSuccess && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-2.5 text-xs text-emerald-700 bg-emerald-50 rounded-xl mt-3 flex items-center justify-center gap-1.5 font-bold">
                        <CheckCheck className="h-4.5 w-4.5" />
                        <span>Candidate parsing successfully loaded on bench! check top pipeline queues.</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </form>

                {/* Spliced horizontal candidate queue board */}
                <div className="flex gap-3 overflow-x-auto pb-2 select-text w-full">
                  {['Sourced', 'Submitted', 'Interview Scheduled', 'Shortlisted', 'Offered'].map((stageKey) => {
                    const stageCands = candidates.filter(c => {
                      const matStage = c.stage === stageKey;
                      const matFilter = pipelineFilter === 'All' || c.aiScore >= 90;
                      return matStage && matFilter;
                    });
                    
                    return (
                      <div key={stageKey} className="w-56 shrink-0 bg-slate-50 p-2.5 rounded-2xl border border-slate-150 flex flex-col h-72">
                        <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                          <span className="text-[9.5px] font-mono font-bold text-slate-500 truncate uppercase">{stageKey}</span>
                          <span className="text-[9px] font-mono text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded-full font-bold">{stageCands.length}</span>
                        </div>

                        <div className="space-y-2 mt-2 overflow-y-auto flex-1 no-scrollbar pr-0.5 text-left">
                          {stageCands.length === 0 ? (
                            <span className="text-[9px] font-mono text-slate-400 block pt-4 text-center">Empty stage.</span>
                          ) : (
                            stageCands.map(cand => (
                              <div 
                                key={cand.id}
                                className="bg-white border border-slate-200 rounded-xl p-2.5 hover:border-[#5B5BD6] cursor-pointer transition-colors relative"
                                onClick={() => setSelectedCandidate(cand)}
                              >
                                <div className="space-y-1">
                                  <div className="flex items-center justify-between">
                                    <span className="text-[8px] text-slate-400 font-mono font-bold uppercase">{cand.id}</span>
                                    <span className="text-[8px] font-mono font-bold text-emerald-600 bg-emerald-50 px-1 rounded">Score: {cand.aiScore}%</span>
                                  </div>
                                  <strong className="text-[11px] text-slate-800 leading-tight block truncate pr-5">{cand.name}</strong>
                                  <span className="text-[9.5px] text-slate-450 block truncate">{cand.role}</span>
                                </div>

                                <div className="flex gap-1.5 pt-1.5 border-t border-slate-100 mt-2">
                                  <button 
                                    onClick={(e) => { e.stopPropagation(); cycleCandidateStage(cand.id); }}
                                    className="p-1 px-1.5 text-[8.5px] font-mono font-bold text-[#5B5BD6] bg-[#5B5BD6]/5 hover:bg-[#5B5BD6]/15 rounded border-0 cursor-pointer"
                                    title="Move candidate to next core pipeline stage dynamically"
                                  >
                                    Cycle Stage →
                                  </button>
                                </div>
                              </div>
                            ))
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Candidate detailed overlay drawer preview */}
                <AnimatePresence>
                  {selectedCandidate && (
                    <div className="fixed inset-0 z-50 flex justify-end select-text">
                      <div className="absolute inset-0 bg-slate-950/25 backdrop-blur-3xs" onClick={() => setSelectedCandidate(null)} />
                      
                      <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        className="w-full max-w-md bg-white h-full relative z-10 shadow-2xl p-6 overflow-y-auto space-y-6 flex flex-col justify-between"
                        id="candidate-detail-drawer"
                      >
                        <div className="space-y-6">
                          <div className="flex items-center justify-between border-b pb-3">
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-xs font-bold text-[#5B5BD6] bg-[#5B5BD6]/5 px-2 py-0.5 rounded uppercase border border-[#5B5BD6]/10">{selectedCandidate.id}</span>
                              <span className="text-[10px] text-emerald-600 font-mono font-extrabold bg-emerald-50 px-2 rounded-full">AI Match: {selectedCandidate.aiScore}%</span>
                            </div>
                            <button onClick={() => setSelectedCandidate(null)} className="bg-transparent border-0 text-slate-400 hover:text-indigo-600 cursor-pointer">
                              <X className="h-5 w-5" />
                            </button>
                          </div>

                          {/* Candidate bio */}
                          <div className="space-y-2 text-left">
                            <h3 className="font-display font-extrabold text-[#00203f] text-lg leading-tight">{selectedCandidate.name}</h3>
                            <p className="text-indigo-600 font-bold text-xs leading-none">{selectedCandidate.role}</p>
                            <span className="text-[10px] text-slate-400 block font-mono">Work Email: {selectedCandidate.email} • Experience: {selectedCandidate.experience} Years</span>
                          </div>

                          {/* Sourcing Stage selector */}
                          <div className="p-3 bg-indigo-50 border border-indigo-100 rounded-xl space-y-1.5 text-left">
                            <span className="text-[8.5px] font-mono text-indigo-500 uppercase font-bold tracking-widest block leading-none">Current Sourcing Stage</span>
                            <div className="flex items-center justify-between">
                              <strong className="text-xs text-slate-800 font-display font-bold uppercase">{selectedCandidate.stage}</strong>
                              <button 
                                onClick={() => cycleCandidateStage(selectedCandidate.id)}
                                className="px-2 py-0.5 border border-indigo-200 rounded text-[9px] bg-white text-indigo-600 font-bold cursor-pointer hover:bg-slate-50"
                              >
                                Advance Stage
                              </button>
                            </div>
                          </div>

                          {/* Mock Resume document viewer */}
                          <div className="bg-slate-50 rounded-2xl border border-slate-200/80 p-4 space-y-3 prose-xs text-left">
                            <span className="text-[9px] font-mono font-bold text-slate-450 uppercase flex items-center gap-1">
                              <FileText className="h-3.5 w-3.5 text-indigo-500" />
                              <span>{selectedCandidate.file}</span>
                            </span>
                            
                            <div className="bg-white border text-[11px] leading-relaxed p-4 rounded-xl font-sans text-slate-700 space-y-2 max-h-56 overflow-y-auto border-slate-150">
                              <strong className="block text-slate-900 font-bold">PROFESSIONAL DOSSIER METRICS:</strong>
                              <p>{selectedCandidate.matchSummary}</p>
                              <strong className="block text-slate-900 font-bold">CORE TECHNICAL COMPLIANCE SKILLS:</strong>
                              <div className="flex flex-wrap gap-1">
                                {selectedCandidate.skills.map(s => (
                                  <span key={s} className="bg-slate-100 p-1 rounded font-mono text-[9px] text-[#00203f] font-semibold">{s}</span>
                                ))}
                              </div>
                              <strong className="block text-slate-900 font-bold">ACADEMIC CREDENTIALS:</strong>
                              <p className="font-mono text-[10.5px]">{selectedCandidate.education}</p>
                              <strong className="block text-slate-900 font-bold">RECRUITER COLLABORATOR LOGS:</strong>
                              <p className="italic text-slate-500">"{selectedCandidate.note}"</p>
                            </div>
                          </div>
                        </div>

                        {/* Direct action tools inside drawer */}
                        <div className="pt-4 border-t border-slate-100 flex gap-2">
                          <button 
                            onClick={() => { setSelectedOfferCandidateId(selectedCandidate.id); setSelectedCandidate(null); setWidgetOrder(['offer', 'metrics', 'jobs', 'pipeline', 'collaboration', 'bench', 'scheduling', 'analytics']); }}
                            className="flex-1 py-11/2 px-4 rounded-xl bg-[#5B5BD6] hover:bg-[#4747B8] text-white text-xs font-bold transition-all border-0 cursor-pointer h-10 shadow-md"
                          >
                            Draft Offer letter
                          </button>
                          <button 
                            onClick={() => { setCopilotExpanded(true); setCopilotInput(`Summarize credentials and highlight core strengths for candidate ${selectedCandidate.name}.`); }}
                            className="bg-purple-50 text-purple-700 px-3 hover:bg-purple-100 rounded-xl text-xs font-bold border-0 cursor-pointer h-10"
                          >
                            Recopilot Audit
                          </button>
                        </div>
                      </motion.div>
                    </div>
                  )}
                </AnimatePresence>
              </div>
            );
          }

          // ============================================
          // 5. MICROSOFT TEAMS COLLABORATIVE HUB (CHANNELS PANEL)
          // ============================================
          if (widgetId === 'collaboration') {
            return (
              <div key={widgetId} className="lg:col-span-3 bg-white rounded-2xl border border-slate-200/60 p-5 shadow-sm space-y-4" id="recruiter-teams-collaboration-hub">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-indigo-500" />
                    <div>
                      <h3 className="font-display font-extrabold text-slate-900 text-sm">Teams Collaborative Channels</h3>
                      <p className="text-[10px] text-slate-405 leading-none">Microsoft Teams style notification sync</p>
                    </div>
                  </div>
                  <div className="flex gap-0.5">
                    <button onClick={() => shiftWidgetUp('collaboration')} className="h-5 w-5 bg-slate-100 hover:bg-slate-200 border-0 rounded text-[9px] cursor-pointer">▲</button>
                    <button onClick={() => shiftWidgetDown('collaboration')} className="h-5 w-5 bg-slate-100 hover:bg-slate-200 border-0 rounded text-[9px] cursor-pointer">▼</button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-64">
                  {/* Channels Sidebar List */}
                  <div className="md:col-span-1 bg-slate-50 p-2 rounded-xl flex flex-col justify-between border border-slate-150">
                    <div className="space-y-1.5 text-left">
                      <span className="text-[8.5px] uppercase font-mono tracking-widest text-slate-400 font-bold block pt-1 pr-1 pl-1">Operational Channels</span>
                      
                      <div className="space-y-1 w-full">
                        {teamsChannels.map(chan => (
                          <button
                            key={chan.id}
                            onClick={() => {
                              setActiveChannelId(chan.id);
                              // Clear unreads
                              setTeamsChannels(prev => prev.map(c => c.id === chan.id ? { ...c, unread: 0 } : c));
                            }}
                            className={`w-full text-left p-2 rounded-lg text-xs font-semibold flex items-center justify-between transition-colors border-0 cursor-pointer ${
                              chan.id === activeChannelId 
                                ? 'bg-indigo-600 text-white shadow-3xs' 
                                : 'text-slate-600 bg-transparent hover:bg-slate-200/50'
                            }`}
                          >
                            <span className="truncate"># {chan.name}</span>
                            {chan.unread > 0 && (
                              <span className="bg-rose-600 text-[8px] text-white font-mono px-1.5 py-0.5 rounded-full font-bold">{chan.unread}</span>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="bg-white border p-2 rounded-lg hover:bg-slate-50 cursor-pointer border-slate-150 text-[10.5px]">
                      <span className="font-mono text-[8px] uppercase block text-slate-400 font-bold leading-none">Workspace CRM Status</span>
                      <strong className="text-emerald-600 block mt-1">● Dynamics 365 Sync</strong>
                    </div>
                  </div>

                  {/* Active Channel Message Streams */}
                  <div className="md:col-span-3 border border-slate-150 rounded-xl flex flex-col justify-between p-3 select-text bg-[#FAFBFB]">
                    <div className="space-y-3 overflow-y-auto flex-1 no-scrollbar pr-0.5 text-left max-h-48">
                      {teamsChannels.find(c => c.id === activeChannelId)?.messages.map((m, mIdx) => (
                        <div key={mIdx} className="space-y-1">
                          <div className="flex items-center gap-1.5">
                            <span className="text-[10.5px] font-extrabold text-slate-900 leading-none">{m.sender}</span>
                            <span className="text-[8px] font-mono text-slate-400 leading-none">{m.time}</span>
                          </div>
                          <p className="text-[11px] leading-relaxed text-slate-700 pl-0.5 font-sans whitespace-pre-wrap">{m.text}</p>
                        </div>
                      ))}
                      {smartAgentTyping && (
                        <div className="flex items-center gap-1 font-mono text-[9px] text-indigo-500 bg-indigo-50 p-1 px-2.5 rounded-lg w-max select-none">
                          <RefreshCw className="h-3 w-3 animate-spin shrink-0" />
                          <span>Sourcing agent copilot formatting response...</span>
                        </div>
                      )}
                    </div>

                    <div className="flex gap-2 pt-2 border-t border-slate-150/85 mt-2">
                      <input
                        type="text"
                        value={liveChatMessageInput}
                        onChange={(e) => setLiveChatMessageInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && sendTeamsMessageInput()}
                        placeholder={`Message #${teamsChannels.find(c => c.id === activeChannelId)?.name}...`}
                        className="flex-1 text-xs rounded-lg border border-slate-200 pl-3.5 py-1.5 bg-white outline-none"
                      />
                      <button 
                        onClick={sendTeamsMessageInput}
                        className="px-3 bg-indigo-600 hover:bg-indigo-700 text-white text-[10.5px] font-bold rounded-lg border-0 cursor-pointer h-8 shadow-3xs"
                      >
                        Send
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          }

          // ============================================
          // 6. BENCH SALES HOTBENCH REGISTRY
          // ============================================
          if (widgetId === 'bench') {
            return (
              <div key={widgetId} className="lg:col-span-3 bg-white rounded-2xl border border-slate-200/60 p-5 shadow-sm space-y-4" id="bench-sales-recruiter-registry">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <Layers className="h-5 w-5 text-indigo-500" />
                    <div>
                      <h3 className="font-display font-extrabold text-slate-900 text-sm">Active Hotbench Allocation</h3>
                      <p className="text-[10px] text-slate-405 leading-none">Manage bench availabilities & rate specs</p>
                    </div>
                  </div>
                  <div className="flex gap-0.5">
                    <button onClick={() => shiftWidgetUp('bench')} className="h-5 w-5 bg-slate-100 hover:bg-slate-200 border-0 rounded text-[9px] cursor-pointer">▲</button>
                    <button onClick={() => shiftWidgetDown('bench')} className="h-5 w-5 bg-slate-100 hover:bg-slate-200 border-0 rounded text-[9px] cursor-pointer">▼</button>
                  </div>
                </div>

                <div className="overflow-x-auto border border-slate-200 rounded-2xl bg-[#FCFDFE]">
                  <table className="w-full text-left border-collapse text-xs select-text">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-100 text-[9px] font-mono text-slate-400 uppercase tracking-widest font-bold">
                        <th className="py-2.5 px-3">BENCH ADVISER</th>
                        <th className="py-2.5 px-3">TECHNICAL SPECIALTY</th>
                        <th className="py-2.5 px-3">AVAILABILITY</th>
                        <th className="py-2.5 px-3">TARGET BILLING RATE</th>
                        <th className="py-2.5 px-3 text-right">ACTION</th>
                      </tr>
                    </thead>
                    <tbody>
                      {candidates.map((cand) => (
                        <tr key={cand.id} className="border-b border-slate-100 hover:bg-indigo-50/50 transition-colors">
                          <td className="py-2.5 px-3 font-semibold text-slate-900">{cand.name}</td>
                          <td className="py-2.5 px-3">
                            <div className="flex flex-wrap gap-1">
                              {cand.skills.slice(0, 3).map(s => (
                                <span key={s} className="bg-slate-100 p-0.5 px-1.5 rounded font-mono text-[9px] text-[#00203f] font-bold">{s}</span>
                              ))}
                            </div>
                          </td>
                          <td className="py-2.5 px-3">
                            <span className={`px-2 py-0.5 rounded text-[8px] font-mono font-bold uppercase tracking-wider ${
                              cand.stage === 'Offered' ? 'bg-slate-100 text-slate-500 border border-slate-200/60' :
                              cand.stage === 'Interview Scheduled' ? 'bg-amber-50 text-amber-600 border border-amber-100' :
                              'bg-emerald-50 text-emerald-700 border border-emerald-100'
                            }`}>
                              {cand.stage === 'Offered' ? 'Committed / Closed' : cand.stage === 'Interview Scheduled' ? 'In Loop' : 'Available Immediately'}
                            </span>
                          </td>
                          <td className="py-2.5 px-3 font-mono text-[10.5px] font-bold text-slate-650">
                            {cand.experience >= 8 ? '$110/Hr' : '$90/Hr'}
                          </td>
                          <td className="py-2.5 px-3 text-right">
                            <button 
                              onClick={() => { setSelectedOfferCandidateId(cand.id); setWidgetOrder(['offer', 'metrics', 'jobs', 'pipeline', 'collaboration', 'bench', 'scheduling', 'analytics']); }}
                              className="text-[10px] font-bold text-[#5B5BD6] hover:underline bg-transparent border-0 cursor-pointer"
                            >
                              Dispatch Dossier
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            );
          }

          // ============================================
          // 7. TEAMS SCHEDULER & MEETINGS WIDGETS
          // ============================================
          if (widgetId === 'scheduling') {
            return (
              <div key={widgetId} className="lg:col-span-3 bg-white rounded-2xl border border-slate-200/60 p-5 shadow-sm space-y-4" id="interviews-scheduling-workspace">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-[#5B5BD6]" />
                    <div>
                      <h3 className="font-display font-extrabold text-slate-900 text-sm">Teams Interviews Scheduling</h3>
                      <p className="text-[10px] text-slate-405 leading-none">Verify panel feedback status and timeline slots</p>
                    </div>
                  </div>
                  <div className="flex gap-0.5">
                    <button onClick={() => shiftWidgetUp('scheduling')} className="h-5 w-5 bg-slate-100 hover:bg-slate-200 border-0 rounded text-[9px] cursor-pointer">▲</button>
                    <button onClick={() => shiftWidgetDown('scheduling')} className="h-5 w-5 bg-slate-100 hover:bg-slate-200 border-0 rounded text-[9px] cursor-pointer">▼</button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  {/* Calendar details */}
                  <div className="md:col-span-3 space-y-2 text-left select-text">
                    {interviews.map(meet => (
                      <div key={meet.id} className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-indigo-200 transition-colors">
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="text-[9px] font-mono font-bold text-[#5B5BD6] bg-[#5B5BD6]/5 px-2 rounded uppercase border border-[#5B5BD6]/10 leading-none">{meet.id}</span>
                            <span className="text-[10px] text-[#00203f] font-bold leading-none">{meet.round}</span>
                          </div>
                          <strong className="block text-xs text-slate-905">{meet.candidate}</strong>
                          <span className="text-[9.5px] text-slate-405 block font-mono">{meet.date} at {meet.time}</span>
                        </div>

                        <div className="flex gap-1.5 self-end sm:self-center">
                          {meet.feedbackSubmitted ? (
                            <span className="text-[9px] font-mono font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded border border-emerald-100">Feedback: {meet.feedbackScore} ⭐</span>
                          ) : (
                            <button
                              onClick={() => setSelectedMeetingForEvaluation(meet)}
                              className="px-2.5 py-1 rounded text-[9.5px] font-bold bg-[#5B5BD6] hover:bg-[#4747B8] text-white cursor-pointer border-0 shadow-3xs"
                            >
                              Post Feedback
                            </button>
                          )}
                          <a href={`https://${meet.link}`} target="_blank" rel="noreferrer" className="p-1 px-2.5 rounded text-[9.5px] font-bold text-[#00203F] border border-slate-205 bg-white hover:bg-slate-50/55 flex items-center gap-1 no-underline">
                            <Video className="h-3 w-3 text-[#00203F]" />
                            <span>Teams Call</span>
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Feedback form slot */}
                  <div className="md:col-span-2 bg-slate-50 p-3 rounded-2xl border border-slate-150 relative overflow-hidden flex flex-col justify-between">
                    {selectedMeetingForEvaluation ? (
                      <div className="space-y-3 text-left">
                        <div className="flex items-center justify-between border-b pb-1.5 hover:border-slate-300">
                          <strong className="text-[10px] font-mono uppercase text-[#5B5BD6]">Evaluation Form</strong>
                          <button onClick={() => setSelectedMeetingForEvaluation(null)} className="h-5 w-5 bg-transparent border-0 text-slate-400 hover:text-slate-600 cursor-pointer">
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                        
                        <div>
                          <strong className="text-xs text-slate-800 leading-none block">{selectedMeetingForEvaluation.candidate}</strong>
                          <span className="text-[9.5px] text-slate-405 font-mono">{selectedMeetingForEvaluation.round}</span>
                        </div>

                        {/* Ratings */}
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-[11px] leading-tight">
                            <span>Coding Skills:</span>
                            <div className="flex gap-1">
                              {[1, 2, 3, 4, 5].map(v => (
                                <button key={v} onClick={() => setCodeScore(v)} className={`h-5 w-5 text-[10px] font-bold rounded ${codeScore === v ? 'bg-indigo-600 text-white' : 'bg-white text-slate-400'}`}>{v}</button>
                              ))}
                            </div>
                          </div>
                          <div className="flex items-center justify-between text-[11px] leading-tight">
                            <span>System Architecture:</span>
                            <div className="flex gap-1">
                              {[1, 2, 3, 4, 5].map(v => (
                                <button key={v} onClick={() => setArchitectureScore(v)} className={`h-5 w-5 text-[10px] font-bold rounded ${architectureScore === v ? 'bg-indigo-600 text-white' : 'bg-white text-slate-400'}`}>{v}</button>
                              ))}
                            </div>
                          </div>
                          <div className="flex items-center justify-between text-[11px] leading-tight">
                            <span>Communication Core:</span>
                            <div className="flex gap-1">
                              {[1, 2, 3, 4, 5].map(v => (
                                <button key={v} onClick={() => setCommScore(v)} className={`h-5 w-5 text-[10px] font-bold rounded ${commScore === v ? 'bg-indigo-600 text-white' : 'bg-white text-slate-400'}`}>{v}</button>
                              ))}
                            </div>
                          </div>
                        </div>

                        <button 
                          onClick={submitMeetingFeedback}
                          className="w-full text-center py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-[10.5px] font-bold rounded-lg border-0 cursor-pointer leading-none mt-2 shadow-3xs"
                        >
                          Submit Core Rating Map
                        </button>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full text-center p-4">
                        <Clock className="h-7 w-7 text-indigo-500 animate-pulse" />
                        <strong className="text-[11.5px] text-slate-700 mt-2 block">Zero Evaluations Selected</strong>
                        <p className="text-[9.5px] text-slate-400 max-w-[130px] leading-tight mt-1">Select Post Feedback button inside meeting timeline card to execute rating metrics</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          }

          // ============================================
          // 8. SIDE-BY-SIDE CONTRACTS & OFFER EDITOR 
          // ============================================
          if (widgetId === 'offer') {
            return (
              <div key={widgetId} className="lg:col-span-3 bg-white rounded-2xl border border-slate-200/60 p-5 shadow-sm space-y-4" id="contracts-offers-editor-workspace">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-indigo-500" />
                    <div>
                      <h3 className="font-display font-extrabold text-slate-900 text-sm">Contract & Offer Management</h3>
                      <p className="text-[10px] text-slate-405 leading-none">Side-by-side splitscreen document drawer</p>
                    </div>
                  </div>
                  <div className="flex gap-0.5">
                    <button onClick={() => shiftWidgetUp('offer')} className="h-5 w-5 bg-slate-100 hover:bg-slate-200 border-0 rounded text-[9px] cursor-pointer">▲</button>
                    <button onClick={() => shiftWidgetDown('offer')} className="h-5 w-5 bg-slate-100 hover:bg-slate-200 border-0 rounded text-[9px] cursor-pointer">▼</button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-5 gap-6 text-left select-text">
                  
                  {/* Left Column selectors */}
                  <div className="md:col-span-2 space-y-4 bg-slate-50 p-4 rounded-2xl border border-slate-150">
                    <div className="space-y-1">
                      <label className="text-[9px] font-mono uppercase text-slate-400 block font-bold">Candidate Selector</label>
                      <select 
                        className="w-full text-xs rounded-lg border border-slate-200 p-2 outline-none bg-white font-bold"
                        value={selectedOfferCandidateId}
                        onChange={(e) => { setSelectedOfferCandidateId(e.target.value); setOfferStatus('draft'); }}
                      >
                        {candidates.map(cand => (
                          <option key={cand.id} value={cand.id}>{cand.name} • {cand.role}</option>
                        ))}
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-1">
                        <label className="text-[9px] font-mono uppercase text-slate-400 block font-bold">Salary / Hour Rate</label>
                        <input 
                          type="text" 
                          value={offerTemplate.salaryRate} 
                          onChange={(e) => setOfferTemplate({ ...offerTemplate, salaryRate: e.target.value })}
                          className="w-full text-xs rounded-lg border border-slate-200 p-2 outline-none bg-white"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-mono uppercase text-slate-400 block font-bold">Signing Bonus</label>
                        <input 
                          type="text" 
                          value={offerTemplate.signingBonus} 
                          onChange={(e) => setOfferTemplate({ ...offerTemplate, signingBonus: e.target.value })}
                          className="w-full text-xs rounded-lg border border-slate-200 p-2 outline-none bg-white"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[9px] font-mono uppercase text-slate-400 block font-bold">Benefits Package Core</label>
                      <input 
                        type="text" 
                        value={offerTemplate.benefitsPackage} 
                        onChange={(e) => setOfferTemplate({ ...offerTemplate, benefitsPackage: e.target.value })}
                        className="w-full text-xs rounded-lg border border-slate-200 p-2 outline-none bg-white"
                      />
                    </div>

                    <div className="space-y-1 pt-2 border-t mt-2">
                      <label className="text-[9px] font-mono uppercase text-slate-400 block font-bold">Approval Status</label>
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className={`px-2 py-0.5 rounded font-bold ${
                          offerStatus === 'sent' ? 'bg-emerald-50 text-emerald-600' :
                          'bg-indigo-50 text-indigo-600'
                        }`}>{offerStatus === 'sent' ? 'Sent for e-sign' : 'Local parameters approved'}</span>
                        
                        <button 
                          onClick={() => setOfferStatus(prev => prev === 'draft' ? 'pending_approval' : 'draft')}
                          className="text-[10px] border-0 bg-transparent text-indigo-600 hover:underline font-bold"
                        >
                          Change State
                        </button>
                      </div>
                    </div>

                    <button 
                      onClick={processOfferDispatch}
                      className="w-full text-center py-2.5 bg-indigo-600 hover:bg-[#4747B8] text-white text-xs font-bold rounded-xl border-0 cursor-pointer h-10 shadow-3xs"
                    >
                      {isGeneratingDocument ? 'Generating Document CRM payload...' : 'Advance Offer to Candidate'}
                    </button>
                  </div>

                  {/* Right Column PDF layout viewer */}
                  <div className="md:col-span-3 border border-slate-200 bg-slate-100 rounded-3xl p-5 flex flex-col justify-between h-[310px] relative shadow-inner overflow-y-auto w-full">
                    <div className="space-y-3 prose-xs">
                      <div className="flex justify-between items-center bg-white/45 p-1 rounded-xl">
                        <span className="text-[8.5px] font-mono uppercase tracking-widest block text-slate-500 font-bold">BENMYL SYSTEM OFFER</span>
                        <span className="text-[8px] font-mono text-indigo-600">OFFER-LETTER-HSBC-W2</span>
                      </div>
                      
                      <div className="text-[10.5px] leading-relaxed text-slate-600 space-y-3">
                        <div className="leading-snug">
                          <strong>Candidate Name:</strong> {candidates.find(c => c.id === selectedOfferCandidateId)?.name || 'Kiran Penumatsa'}<br />
                          <strong>Position Title:</strong> {candidates.find(c => c.id === selectedOfferCandidateId)?.role || 'Staff Engineer'}<br />
                          <strong>Client Employer:</strong> {offerTemplate.clientName}<br />
                          <strong>Term Type Level:</strong> {offerTemplate.termType}
                        </div>
                        <p className="font-sans text-[10px] text-left italic bg-white p-2.5 rounded-lg border">
                          "We are pleased to extend this formal offer letter parameter. Your agreed base rate compensation aligns at {offerTemplate.salaryRate} with signing bonus parameters of {offerTemplate.signingBonus}. Core perks package contains {offerTemplate.benefitsPackage}. Please finalize execution."
                        </p>
                        <div className="text-[9px] font-mono text-slate-400">
                          E-Sign Authority: {offerTemplate.signatureAuthority} <br />
                          Document verified under BenMyl SLA parameters.
                        </div>
                      </div>
                    </div>

                    <div className="absolute inset-0 bg-[#001224]/5 whitespace-normal pointer-events-none flex items-center justify-center font-mono text-xl opacity-20 transform -rotate-12 select-none">
                      {offerStatus === 'sent' ? 'E-SIGN SENT' : 'PREVIEW ONLY'}
                    </div>
                  </div>

                </div>
              </div>
            );
          }

          // ============================================
          // 9. PLACEMENT & CONVERSIONS ANALYTICS (SVG CHARTS)
          // ============================================
          if (widgetId === 'analytics') {
            return (
              <div key={widgetId} className="lg:col-span-3 bg-white rounded-2xl border border-slate-200/60 p-5 shadow-sm space-y-4" id="recruiter-placement-analytics">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-indigo-500" />
                    <div>
                      <h3 className="font-display font-extrabold text-slate-900 text-sm">Placement & Sourcing Analytics</h3>
                      <p className="text-[10px] text-slate-405 leading-none">Interactive graphical recruiters metrics chart</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-[10px] select-none">
                      <button onClick={() => setRecruiterChartMode('submissions')} className={`py-1 px-2.5 rounded-md font-bold ${recruiterChartMode === 'submissions' ? 'bg-white text-slate-900 shadow-3xs' : 'text-slate-404 hover:text-slate-700'}`}>Submissions</button>
                      <button onClick={() => setRecruiterChartMode('interviews')} className={`py-1 px-2.5 rounded-md font-bold ${recruiterChartMode === 'interviews' ? 'bg-white text-slate-900 shadow-3xs' : 'text-slate-404 hover:text-slate-700'}`}>Interviews</button>
                    </div>
                    <div className="flex border-l pl-2 gap-0.5">
                      <button onClick={() => shiftWidgetUp('analytics')} className="h-5 w-5 bg-slate-100 border-0 rounded text-[9px] cursor-pointer">▲</button>
                      <button onClick={() => shiftWidgetDown('analytics')} className="h-5 w-5 bg-slate-100 border-0 rounded text-[9px] cursor-pointer">▼</button>
                    </div>
                  </div>
                </div>

                <div className="h-56 w-full relative flex items-center justify-center p-2 bg-slate-50 rounded-xl border border-slate-150">
                  {recruiterChartMode === 'submissions' ? (
                    <svg className="w-full h-full animate-fade-in" viewBox="0 0 500 200" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="chartRec1" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#5B5BD6" stopOpacity="0.25" />
                          <stop offset="100%" stopColor="#5B5BD6" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      <path d="M 0,160 c 50,-30 80,10 140,-50 c 60,-60 100,-20 180,-80 c 80,-60 120,-10 180,-10 L 500,200 L 0,200 Z" fill="url(#chartRec1)" />
                      <path d="M 0,160 c 50,-30 80,10 140,-50 c 60,-60 100,-20 180,-80 c 80,-60 120,-10 180,-10" fill="none" stroke="#5B5BD6" strokeWidth="3" />
                      <circle cx="320" cy="30" r="5" fill="#5B5BD6" stroke="#ffffff" strokeWidth="2" />
                      <text x="330" y="35" fill="#5B5BD6" fontSize="9" fontWeight="bold" fontFamily="monospace">142 TOTAL</text>
                    </svg>
                  ) : (
                    <svg className="w-full h-full animate-fade-in" viewBox="0 0 500 200" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="chartRec2" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#7B61FF" stopOpacity="0.25" />
                          <stop offset="100%" stopColor="#7B61FF" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      <path d="M 0,180 Q 120,40 240,110 T 500,60 L 500,200 L 0,200 Z" fill="url(#chartRec2)" />
                      <path d="M 0,180 Q 120,40 240,110 T 500,60" fill="none" stroke="#7B61FF" strokeWidth="3" />
                      <circle cx="240" cy="110" r="5" fill="#7B61FF" stroke="#ffffff" strokeWidth="2" />
                      <text x="250" y="115" fill="#7B61FF" fontSize="9" fontWeight="bold" fontFamily="monospace">84% INTERVIEWS RATIO</text>
                    </svg>
                  )}

                  <div className="absolute bottom-2 inset-x-4 flex justify-between text-[8px] font-mono text-slate-400 font-bold">
                    <span>JAN</span>
                    <span>FEB</span>
                    <span>MAR</span>
                    <span>APR</span>
                    <span>MAY (RECRUITER TARGET)</span>
                  </div>
                </div>
              </div>
            );
          }

          return null;
        })}

      </div>

    </div>
  );
}

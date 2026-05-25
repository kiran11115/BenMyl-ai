/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Briefcase, 
  Users, 
  Layers, 
  Cpu, 
  Sparkles, 
  TrendingUp, 
  HelpCircle, 
  Bell, 
  Search, 
  Command, 
  Building, 
  MessageSquare, 
  Database, 
  Download, 
  CreditCard, 
  Sliders, 
  FolderLock, 
  Maximize2,
  Minimize2,
  ChevronLeft,
  ChevronRight,
  LogOut,
  SlidersHorizontal,
  FolderKanban,
  CheckCircle2,
  MapPin,
  Upload,
  FileText,
  Compass,
  X,
  ChevronDown,
  Phone,
  Video,
  PhoneOff,
  Paperclip,
  Mic,
  Send,
  Volume2,
  Tv,
  CheckCheck,
  Loader2,
  Lock,
  Menu,
  Activity,
  UserPlus,
  Pin,
  Play,
  Pause
} from 'lucide-react';

import DashboardOverview from './DashboardOverview';
import RecruitersScreen from './RecruitersScreen';
import BenchSalesScreen from './BenchSalesScreen';
import CandidatesScreen from './CandidatesScreen';
import VendorsScreen from './VendorsScreen';
import RequirementsScreen from './RequirementsScreen';
import AiAssistantScreen from './AiAssistantScreen';
import AnalyticsScreen from './AnalyticsScreen';
import AutomationScreen from './AutomationScreen';
import MessagesHub from './MessagesHub';
import MarketplaceScreen from './MarketplaceScreen';
import ReportsScreen from './ReportsScreen';
import BillingScreen from './BillingScreen';
import SettingsScreen from './SettingsScreen';

import UploadBenchScreen from './UploadBenchScreen';
import ReviewResumeScreen from './ReviewResumeScreen';
import ViewJobsScreen from './ViewJobsScreen';
import InterviewsScreen from './InterviewsScreen';
import ContractsScreen from './ContractsScreen';

import WorkspaceSidebar from './WorkspaceSidebar';
import WorkspaceRightPanel from './WorkspaceRightPanel';

interface WorkspaceDashboardProps {
  userRole: string;
  emailAddress: string;
  companyName: string;
  onLogout: () => void;
}

interface NavDropdownItem {
  label: string;
  tabId: string;
  badge?: string;
  action?: () => void;
}

interface GroupedNavItem {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
  glow?: boolean;
  children?: NavDropdownItem[];
  tabId?: string;
}

export default function WorkspaceDashboard({ userRole, emailAddress, companyName, onLogout }: WorkspaceDashboardProps) {
  const [activeTab, setActiveTab] = useState<string>(() => {
    const roleMap: Record<string, string> = {
      recruiter: 'dashboard',
      sales: 'bench-sales',
      staffing: 'recruiters',
      vendor: 'vendors',
      hiring_manager: 'requirements'
    };
    return roleMap[userRole] || 'dashboard';
  });

  const [activeWorkspace, setActiveWorkspace] = useState('Workspace Primary (North America)');
  const [showWorkspaceDropdown, setShowWorkspaceDropdown] = useState(false);
  const [showNotificationCenter, setShowNotificationCenter] = useState(false);
  
  // Mobile Navigation toggling
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMobileCategory, setActiveMobileCategory] = useState<string | null>(null);

  // Quick Global Action Dialog
  const [showQuickActionDialog, setShowQuickActionDialog] = useState(false);

  // Hover tracker for enterprise dropdown menus
  const [hoveredMenuId, setHoveredMenuId] = useState<string | null>(null);

  // New Collapsible Layout States
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isRightPanelOpen, setIsRightPanelOpen] = useState(true);
  const [activeRightPanelTab, setActiveRightPanelTab] = useState<'copilot' | 'activity'>('copilot');
  const [workspaceNotes, setWorkspaceNotes] = useState<string[]>([
    '👉 Review Nolan V. FrontEnd dossier credentials.',
    '📞 Call HSBC hiring manager about contract billing terms.',
    '🌟 Calibrate active match score presets for React roles.'
  ]);
  const [noteInputText, setNoteInputText] = useState('');

  // Simulated notification list
  const [notifications, setNotifications] = useState([
    { id: 1, text: 'AI-Match paired Candidate "Nolan V." with HSBC Requirement', time: '2m ago' },
    { id: 2, text: 'Vendor "Synapse Sourcing" posted 4 senior React CVs', time: '14m ago' },
    { id: 3, text: 'Billing usage threshold warning at 80% limit', time: '1h ago' }
  ]);

  // Command Search console states
  const [searchTerm, setSearchTerm] = useState('');
  const [searchedActionOutput, setSearchedActionOutput] = useState<string | null>(null);
  const [workflowCandidate, setWorkflowCandidate] = useState<any>(null);

  // ============================================
  // FLOATING MESSAGING SYSTEM STATE VARIABLES
  // ============================================
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isChatMaximized, setIsChatMaximized] = useState(false);
  const [chatViewMode, setChatViewMode] = useState<'list' | 'thread'>('list');
  const [activeChatId, setActiveChatId] = useState<number>(1);
  const [chatSearchText, setChatSearchText] = useState('');
  const [chatInputText, setChatInputText] = useState('');
  
  // Call States
  const [activeCall, setActiveCall] = useState<'voice' | 'video' | null>(null);
  const [callTimer, setCallTimer] = useState(0);
  const [callMuted, setCallMuted] = useState(false);
  const [callVideoOff, setCallVideoOff] = useState(false);
  const [callScreenSharing, setCallScreenSharing] = useState(false);
  const [callTranscript, setCallTranscript] = useState<string[]>([]);
  
  // Audio playback simulator states
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);
  const [audioProgress, setAudioProgress] = useState(0);

  // AI-Assisted simulation states
  const [isAiTyping, setIsAiTyping] = useState(false);
  const [pinnedMessageId, setPinnedMessageId] = useState<number | null>(1);

  // Dynamic Floating toast notifications for real-time engagement
  const [floatingNotification, setFloatingNotification] = useState<{ id: number; text: string; sender: string } | null>(null);

  // Sound play simulation flag 
  const [muteFloatingAudios, setMuteFloatingAudios] = useState(false);

  // Chat conversation threads initialized
  const [chatThreads, setChatThreads] = useState([
    { 
      id: 1, 
      name: 'Samantha Chen (Internal Staffing)', 
      avatarBg: 'bg-[#00203F] text-[#36ECDE]', 
      lastMessage: 'Let us align parameters on HSBC Requirement #4019 tomorrow afternoon at 2 PM EST.', 
      time: '08:44 AM', 
      unreadCount: 2, 
      type: 'Internal',
      online: true,
      role: 'Staffing Director',
      transcript: [
        { sender: 'Samantha Chen', text: 'Hey, did you review Nolan Vasquez\'s parsed resume credentials on the bench Hot-List?', time: '08:30 AM' },
        { sender: 'System Ref', text: '[CV] Nolan_Vasquez_FrontEnd_Staffing_Match.pdf', time: '08:32 AM' },
        { sender: 'James Carter', text: 'Yes, looking spotless. CV match score shows 98.2% exact fit on HSBC specs.', time: '08:35 AM' },
        { sender: 'Samantha Chen', text: '[AUDIO] Briefing note regarding vendor rate terms', time: '08:40 AM' },
        { sender: 'Samantha Chen', text: 'Splendid. I am going to trigger vendor broadcast email. Let us align parameters on HSBC Requirement #4019 tomorrow afternoon at 2 PM EST.', time: '08:44 AM' }
      ]
    },
    { 
      id: 2, 
      name: 'Synapse Sourcing Channel (Vendor)', 
      avatarBg: 'bg-[#2F2F2F] text-[#36ECDE]', 
      lastMessage: 'Submitted 4 candidates to AWS DevOps architect vacancy. Please audit immediately.', 
      time: '08:12 AM', 
      unreadCount: 0, 
      type: 'Vendor',
      online: true,
      role: 'Tier-1 Vendor Lead',
      transcript: [
        { sender: 'Aris Thorne (Synapse)', text: 'Our technical screening committee just finalized assessment metrics for 4 senior candidates.', time: '08:00 AM' },
        { sender: 'Aris Thorne (Synapse)', text: 'Submitted 4 candidates to AWS DevOps architect vacancy. Please audit immediately.', time: '08:12 AM' }
      ]
    },
    { 
      id: 3, 
      name: 'BenMyl Sourcing Oracle (AI Engine)', 
      avatarBg: 'bg-[#36ECDE] text-[#00203f]', 
      lastMessage: 'Ready to assist matching your high-priority hiring roles.', 
      time: 'Yesterday', 
      unreadCount: 0, 
      type: 'AI Assistant',
      online: true,
      role: 'Cognitive Recruiter Model',
      transcript: [
        { sender: 'Oracle AI', text: 'Daily bench calibration successfully synthesized. 14 new candidates identified securely across all channels.', time: 'Yesterday' }
      ]
    }
  ]);

  const activeChat = chatThreads.find(t => t.id === activeChatId) || chatThreads[0];

  // Smart suggestions pills inside active floating chat window
  const getSmartSuggestions = () => {
    if (activeChat.type === 'AI Assistant') {
      return [
        { key: 'assess', label: '🤖 Suitability Fit' },
        { key: 'reports', label: '📊 Generate report' },
        { key: 'auto', label: '⚡ Run automations' }
      ];
    }
    return [
      { key: 'fit', label: '🤖 Oracle Suitability Fit test' },
      { key: 'follow', label: '📝 Generate draft follow-up' },
      { key: 'calendar', label: '📅 Dispatch calendar align' }
    ];
  };

  // Grouped Navigation menu structures (Top Navigation Menu Configuration)
  const groupedNavigation: GroupedNavItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: Layers, tabId: 'dashboard' },
    { 
      id: 'talent', 
      label: 'Talent', 
      icon: Users,
      children: [
        { label: 'Upload Bench', tabId: 'upload-bench' },
        { label: 'Review Resume', tabId: 'review-resume' },
        { label: 'Matching Jobs', tabId: 'view-jobs' },
        { label: 'Candidate Pipeline', tabId: 'candidates' },
        { label: 'Shortlisted Candidates', tabId: 'candidates' }
      ] 
    },
    { id: 'recruiters', label: 'Recruiters', icon: Users, tabId: 'recruiters' },
    { id: 'bench-sales', label: 'Bench Sales', icon: Database, tabId: 'bench-sales' },
    { 
      id: 'business', 
      label: 'Business', 
      icon: Briefcase,
      children: [
        { label: 'Vendors', tabId: 'vendors' },
        { label: 'Clients', tabId: 'clients' },
        { label: 'Requirements', tabId: 'requirements' }
      ] 
    },
    { 
      id: 'ai-hub', 
      label: 'AI Assistant', 
      icon: Sparkles,
      glow: true,
      children: [
        { label: 'AI Chat', tabId: 'ai-assistant', badge: 'NEW' },
        { label: 'Resume Intelligence', tabId: 'review-resume' },
        { label: 'AI Reports', tabId: 'reports' },
        { label: 'AI Automations', tabId: 'automation' }
      ] 
    },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp, tabId: 'analytics' },
    { 
      id: 'workspace', 
      label: 'Workspace', 
      icon: SlidersHorizontal,
      children: [
        { label: 'Workflow Automation', tabId: 'automation' },
        { label: 'Messages', tabId: 'messages', action: () => { setIsChatOpen(true); setChatViewMode('list'); } },
        { label: 'Marketplace', tabId: 'marketplace' },
        { label: 'Notifications', tabId: 'dashboard', action: () => setShowNotificationCenter(true) }
      ] 
    },
    { 
      id: 'system', 
      label: 'System', 
      icon: Sliders,
      children: [
        { label: 'Platform Reports', tabId: 'reports' },
        { label: 'Billing Settings', tabId: 'billing' },
        { label: 'Account Settings', tabId: 'settings' },
        { label: 'Security Protocols', tabId: 'settings' },
        { label: 'Team Permissions', tabId: 'settings' }
      ] 
    }
  ];

  // Helper checking if a group header is currently active
  const isGroupActive = (item: GroupedNavItem) => {
    if (item.tabId) return activeTab === item.tabId;
    if (item.children) {
      return item.children.some(child => child.tabId === activeTab);
    }
    return false;
  };

  // Handles global search routing in command header
  const handleGlobalCommandSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    const term = searchTerm.toLowerCase();
    
    if (term.includes('upload') || term.includes('ingress') || term.includes('drop')) {
      setActiveTab('upload-bench');
      setSearchedActionOutput('Routed to Bench Candidate Ingress & CV Upload Center.');
    } else if (term.includes('resume') || term.includes('parse') || term.includes('review')) {
      setActiveTab('review-resume');
      setSearchedActionOutput('Routed to AI Resume Splitscreen Vetting Desk.');
    } else if (term.includes('job') || term.includes('match') || term.includes('discovery')) {
      setActiveTab('view-jobs');
      setSearchedActionOutput('Routed to AI Job Match recommendations cockpit.');
    } else if (term.includes('recruiter') || term.includes('samantha')) {
      setActiveTab('recruiters');
      setSearchedActionOutput('Routed to Recruiters Desk.');
    } else if (term.includes('bench') || term.includes('sales')) {
      setActiveTab('bench-sales');
      setSearchedActionOutput('Routed to Hotbench Calibration Center.');
    } else if (term.includes('candidate') || term.includes('cv')) {
      setActiveTab('candidates');
      setSearchedActionOutput('Routed to Candidate dossier pipelines.');
    } else if (term.includes('billing') || term.includes('plan')) {
      setActiveTab('billing');
      setSearchedActionOutput('Routed to Seat allowances billings panel.');
    } else if (term.includes('ai') || term.includes('oracle') || term.includes('chat')) {
      setActiveTab('ai-assistant');
      setSearchedActionOutput('Routed to Neural Oracle Workspace chat.');
    } else if (term.includes('automation') || term.includes('routine')) {
      setActiveTab('automation');
      setSearchedActionOutput('Routed to Operational workflow triggers builder.');
    } else if (term.includes('vendor')) {
      setActiveTab('vendors');
      setSearchedActionOutput('Routed to Vendor latencies audit directory.');
    } else if (term.includes('client')) {
      setActiveTab('clients');
      setSearchedActionOutput('Routed to Client accounts.');
    } else {
      setSearchedActionOutput(`Command parsed successfully. Executed keyword index mapping for "${searchTerm}".`);
    }

    setSearchTerm('');
    setTimeout(() => setSearchedActionOutput(null), 3000);
  };

  // Automated notification toast simulation trigger (triggers periodically to make platform feel alive)
  useEffect(() => {
    const notifyTimer = setTimeout(() => {
      setFloatingNotification({
        id: Date.now(),
        sender: 'Samantha Chen',
        text: 'Just review that Nolan Vasquez matched dossier! Can we fast-track with HSBC POC?'
      });
    }, 15000);

    return () => clearTimeout(notifyTimer);
  }, []);

  // Voice/Video Call timer interval hook
  useEffect(() => {
    let interval: any = null;
    if (activeCall) {
      setCallTranscript([
        "🎙️ Secure holographic voice feed established.",
        `📡 Cognitive Sourcing NLP Transcriber initialized - ${activeCall.toUpperCase()} FEED.`
      ]);
      setCallTimer(0);
      
      interval = setInterval(() => {
        setCallTimer(prev => prev + 1);
        
        const dialogues = [
          "Samantha: Hey! Glad you picked up. I was looking at that 98.2% candidate on the Oracle fit board.",
          "Me: Yes, Nolan Vasquez's profile looks incredible, with native React 18, Vite and custom state engines experience.",
          "Samantha: Incredible. Did you confirm if their rate specs match with the $180k hybrid cap standard of HSBC?",
          "AI Assistant SmartNote: Rate spec aligns exactly. The Hotbench pipeline has calibrated all allowances.",
          "Samantha: Outstanding! Let us finalize and push this submit button during our 2:00 PM sync today.",
          "Me: Agreed, I will schedule calendar invite.",
          "Samantha: Awesome. Speak with you shortly. Bye!"
        ];
        
        setCallTranscript(prev => {
          const index = Math.floor(prev.length / 2) - 1;
          if (index >= 0 && index < dialogues.length && prev.indexOf(dialogues[index]) === -1) {
            return [...prev, dialogues[index]];
          }
          return prev;
        });
      }, 3500);
    } else {
      setCallTimer(0);
      setCallTranscript([]);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [activeCall]);

  // Handle smart suggestions or normal sent messaging
  const handleSendFloatingMessage = (textToSend: string) => {
    const message = textToSend.trim();
    if (!message) return;

    const userMsg = {
      sender: 'Me (Workspace Master)',
      text: message,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    // Update state locally
    setChatThreads(prev => prev.map(t => {
      if (t.id === activeChatId) {
        return {
          ...t,
          lastMessage: message.startsWith('[') ? 'Shared attachment object' : message,
          time: 'Just now',
          transcript: [...t.transcript, userMsg]
        };
      }
      return t;
    }));

    setChatInputText('');
    
    // Set automated AI Assistant typing simulator action
    setIsAiTyping(true);
    
    setTimeout(() => {
      setIsAiTyping(false);
      let reply = "Your message is logged secure-channel. AI Broker is analyzing alignment.";
      
      const textLower = message.toLowerCase();
      if (textLower.includes('assess') || textLower.includes('suitability') || textLower.includes('fit')) {
        reply = "🤖 **Oracle AI Sourcing Report:** Nolan Vasquez holds a 98.2% exact match index with HSBC #4019. Candidate strengths mapped: React 18 frontend, large-scale bundle calibrator tools, optimized rendering tree. Bench status: Active.";
      } else if (textLower.includes('follow') || textLower.includes('draft') || textLower.includes('write')) {
        reply = "🤖 **AI Draft Agent:** 'Hi Samantha, following up on Nolan Vasquez. Mapped technical credentials match HSBC specs perfectly. Let's fast track alignment at our 2 PM sync.'";
      } else if (textLower.includes('calendar') || textLower.includes('schedule') || textLower.includes('align') || textLower.includes('invite')) {
        reply = "📅 **AI Calendar Dispatcher:** Calendar sync triggered. Sending HSBC Alignment Invite to Samantha Chen and James Carter for May 23, 2026, at 2:00 PM EST.";
      } else if (textLower.includes('report') || textLower.includes('stats')) {
        reply = "📊 **AI Synthesized Reporting:** Synthesizing active bench calibration list. Samantha: 142 submissions. Placements: 14. Average Match: 98%. Active vacancy slots in North America: 32.";
      } else if (textLower.includes('auto') || textLower.includes('run')) {
        reply = "⚡ **Automation Node Activated:** 4 background routines checked. Auto-matching candidate profiles is running. Standard webhook initialized.";
      }

      const botMsg = {
        sender: 'Oracle AI Bot',
        text: reply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setChatThreads(prev => prev.map(t => {
        if (t.id === activeChatId) {
          return {
            ...t,
            lastMessage: reply.slice(0, 100) + '...',
            time: 'Just now',
            transcript: [...t.transcript, botMsg]
          };
        }
        return t;
      }));
    }, 1200);
  };

  const renderClientsScreen = () => {
    const clientsList = [
      { id: 'CLI-5001', name: 'HSBC Global Fintech Group', requirementsOpen: 14, headCountMapped: 84, activeSlaTier: 'Premium Gold SLA', conversionRate: '98.2%', pointOfContact: 'Marcus Reid' },
      { id: 'CLI-5002', name: 'Amazon Web Engineering Services', requirementsOpen: 22, headCountMapped: 142, activeSlaTier: 'Exclusive Partner SLA', conversionRate: '94.6%', pointOfContact: 'Sarah Vance' },
      { id: 'CLI-5003', name: 'Capital Finance Network', requirementsOpen: 8, headCountMapped: 31, activeSlaTier: 'Standard Support SLA', conversionRate: '88.1%', pointOfContact: 'David Sterling' },
      { id: 'CLI-5004', name: 'Innovate AI Labs', requirementsOpen: 5, headCountMapped: 12, activeSlaTier: 'Standard Support SLA', conversionRate: '92.4%', pointOfContact: 'Alexander Chen' }
    ];

    return (
      <div className="space-y-6 pb-12">
        <div>
          <h2 className="text-xl font-display font-bold text-slate-1000">Enterprise Clients Registry</h2>
          <p className="text-slate-450 text-xs">Verify active client account groups, open JDs capacity slots, and historical recruitment closure velocities</p>
        </div>

        <div className="bg-white rounded-[20px] border border-slate-200/60 p-5 shadow-xs space-y-4">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-100 text-[10px] font-mono text-slate-400 raw-bold uppercase tracking-widest font-bold">
                  <th className="py-3 px-4">ACCOUNT COMPANY</th>
                  <th className="py-3 px-4">SLA tier level</th>
                  <th className="py-3 px-4 text-center">OPEN REQs</th>
                  <th className="py-3 px-4 text-center">PLACED CANDIDATES</th>
                  <th className="py-3 px-4 text-right">CONVERSATION SUCCESS RATIO</th>
                </tr>
              </thead>
              <tbody>
                {clientsList.map((cli) => (
                  <tr key={cli.id} className="border-b border-slate-100 hover:bg-slate-50/60 transition-colors">
                    <td className="py-3.5 px-4 font-sans font-semibold">
                      <div>
                        <strong className="text-slate-850 block">{cli.name}</strong>
                        <span className="text-[10px] text-slate-400 font-mono">{cli.id} • Point of contact: {cli.pointOfContact}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-[10.5px] text-[#00203f]">
                      <span className="bg-[#36ECDE]/10 border border-[#36ECDE]/30 px-2 py-0.5 rounded-full font-mono uppercase tracking-wide">
                        {cli.activeSlaTier}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-center font-mono font-medium">{cli.requirementsOpen} Active</td>
                    <td className="py-3.5 px-4 text-center font-mono text-emerald-600 font-bold">{cli.headCountMapped} Closed</td>
                    <td className="py-3.5 px-4 text-right text-[#00203f] font-mono font-extrabold">{cli.conversionRate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  // Custom renderer for messages including [AUDIO] or [CV] tags inside floating messager chat
  const renderFloatingMessageContent = (text: string) => {
    if (text.startsWith('[CV]')) {
      const fileName = text.replace('[CV]', '').trim();
      return (
        <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-3 space-y-2 mt-1 shadow-xs text-[#00203F] max-w-sm">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 bg-red-100 text-red-700 flex items-center justify-center rounded-lg">
              <FileText className="h-4.5 w-4.5" />
            </div>
            <div className="truncate text-left leading-tight">
              <strong className="text-[10.5px] block text-[#00203f] truncate font-medium">{fileName}</strong>
              <span className="text-[8px] text-slate-400 font-mono">PDF Format • 364 KB</span>
            </div>
          </div>
          <div className="flex gap-1.5 pt-1.5 border-t border-slate-100">
            <button 
              type="button"
              onClick={() => {
                setActiveTab('review-resume');
                setIsChatOpen(false);
              }}
              className="text-[9px] font-bold font-mono text-[#36ECDE] bg-[#00203F] px-2 py-1 rounded-md hover:bg-slate-800 transition-all cursor-pointer flex items-center gap-1"
            >
              <Cpu className="h-2.5 w-2.5 animate-pulse" />
              <span>AI Vetting Desk</span>
            </button>
            <button 
              type="button" 
              onClick={() => {
                alert(`Simulating downloaded document object: ${fileName}`);
              }}
              className="text-[9px] font-bold text-slate-500 hover:text-[#00203F] font-mono px-2 py-1"
            >
              Download
            </button>
          </div>
        </div>
      );
    }
    
    if (text.startsWith('[AUDIO]')) {
      const memoTitle = text.replace('[AUDIO]', '').trim();
      const isPlaying = playingAudioId === memoTitle;
      return (
        <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-3 space-y-2 mt-1 shadow-xs text-[#00203F] max-w-sm">
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => {
                if (isPlaying) {
                  setPlayingAudioId(null);
                } else {
                  setPlayingAudioId(memoTitle);
                  setAudioProgress(0);
                }
              }}
              className="h-7 w-7 rounded-full bg-[#00203F] text-[#36ECDE] flex items-center justify-center hover:scale-105 active:scale-95 transition-all cursor-pointer shrink-0"
            >
              {isPlaying ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3 fill-[#36ECDE]" />}
            </button>
            <div className="flex-1 text-left select-none">
              <span className="text-[8px] text-slate-400 block font-mono font-bold uppercase tracking-wider">Voice Memo note</span>
              <strong className="text-[10.5px] text-[#00203F] font-semibold leading-tight block truncate">{memoTitle}</strong>
              <div className="flex items-center gap-0.5 mt-1.5 h-3">
                {[1, 2, 3, 2, 1, 3, 4, 2, 3, 1, 4, 3, 2, 4, 1, 2, 3, 1].map((val, idx) => (
                  <div 
                    key={idx} 
                    className={`w-[2.5px] rounded-full transition-all ${
                      isPlaying ? 'bg-[#36ECDE]' : 'bg-slate-300'
                    }`}
                    style={{ 
                      height: `${val * (isPlaying ? Math.sin(callTimer * 2 + idx) * 2 + 6 : 2)}px`
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      );
    }

    return <p className="whitespace-pre-line leading-relaxed text-[11px] font-sans text-slate-800">{text}</p>;
  };

  return (
    <div className="flex flex-col bg-[#F7F8FC] h-screen text-[#1F2937] antialiased font-sans overflow-hidden">
      
      {/* ====================================================
          1. TEAMS WORKSPACE TOP HEADER BAR
          ==================================================== */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 select-none shrink-0 shadow-2xs">
        <div className="px-6 py-3 flex items-center justify-between gap-4">
          
          {/* Logo & Switcher controls */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="flex items-center gap-2">
              <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-[#5B5BD6] to-[#7B61FF] flex items-center justify-center text-white shrink-0 shadow-sm">
                <Cpu className="h-4.5 w-4.5" />
              </div>
              <div className="hidden sm:block">
                <strong className="font-display font-extrabold text-[#5B5BD6] text-xs tracking-tight uppercase leading-none block">BenMyl</strong>
                <span className="text-[8px] font-mono text-slate-400 uppercase tracking-widest font-bold block mt-0.5 leading-none">Workspace OS</span>
              </div>
            </div>

            {/* Selector dropdown for active workspaces */}
            <div className="relative border-l border-slate-200 pl-3">
              <button 
                onClick={() => setShowWorkspaceDropdown(!showWorkspaceDropdown)}
                className="bg-slate-50 hover:bg-slate-100 border border-slate-200 px-2.5 py-1.5 rounded-xl flex items-center gap-1.5 text-xs transition-colors cursor-pointer text-[#1F2937] font-semibold"
              >
                <div className="text-left max-w-[130px] truncate leading-none">
                  <span className="text-[7.5px] font-mono text-slate-400 uppercase tracking-widest block font-bold">Active NODE</span>
                  <span className="block truncate text-[10.5px] font-bold text-slate-800 mt-0.5">{activeWorkspace.split('(')[1]?.replace(')', '') || activeWorkspace}</span>
                </div>
                <ChevronDown className="h-3 w-3 text-slate-400 shrink-0" />
              </button>

              <AnimatePresence>
                {showWorkspaceDropdown && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setShowWorkspaceDropdown(false)} />
                    <motion.div 
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                      className="absolute top-11 left-0 bg-white border border-slate-200 rounded-xl shadow-xl p-1.5 z-20 w-60 space-y-1"
                    >
                      <button 
                        onClick={() => { setActiveWorkspace('Workspace Primary (North America)'); setShowWorkspaceDropdown(false); }}
                        className="w-full text-left p-2 hover:bg-slate-50 rounded-lg text-xs font-semibold text-[#1F2937]"
                      >
                        Workspace Primary (North America)
                      </button>
                      <button 
                        onClick={() => { setActiveWorkspace('Workspace Sourcing (APAC)'); setShowWorkspaceDropdown(false); }}
                        className="w-full text-left p-2 hover:bg-slate-50 rounded-lg text-xs font-semibold text-[#1F2937]"
                      >
                        Workspace Sourcing (APAC)
                      </button>
                    </motion.div>
                  </>
                )}
              </  AnimatePresence>
            </div>
          </div>

          {/* AI Search & Command Bar (Centered workspace-style) */}
          <div className="flex items-center gap-2 max-w-lg flex-1 justify-center">
            <form onSubmit={handleGlobalCommandSearch} className="relative w-full max-w-md flex items-center">
              <div className="absolute left-3 text-slate-400">
                <Command className="h-3.5 w-3.5" />
              </div>
              <input
                type="text"
                className="w-full pl-8 pr-16 py-2 border border-slate-200 focus:border-[#5B5BD6] bg-slate-50 rounded-xl text-xs outline-none focus:bg-white transition-all placeholder:text-slate-400 text-slate-800"
                placeholder="Ask AI, e.g. /parse Clara, /match jobs, show candidates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button
                type="submit"
                className="absolute right-1 px-2.5 py-1 bg-[#5B5BD6] hover:bg-[#4747B8] text-white rounded-lg text-[8.5px] font-mono uppercase tracking-wider cursor-pointer font-extrabold transition-colors"
                id="ask_ai_top_nav"
              >
                ASK AI
              </button>
            </form>
          </div>

          {/* Right utility elements (Quick Action, Alerts, Right Panel Panel Toggle, Profile) */}
          <div className="flex items-center gap-2.5">
            {/* Quick action trigger button */}
            <button
              onClick={() => setShowQuickActionDialog(true)}
              className="bg-[#5B5BD6] text-[#FFFFFF] py-2 px-3 rounded-xl text-xs font-semibold hover:bg-[#4747B8] shrink-0 cursor-pointer flex items-center gap-1.5 hover:shadow-sm transition-all"
              title="Global Quick Action"
            >
              <UserPlus className="h-4 w-4" />
              <span className="hidden md:inline text-[10.5px]">Quick Create</span>
            </button>

            {/* Toggle right sidebar panel */}
            <button
              onClick={() => setIsRightPanelOpen(!isRightPanelOpen)}
              className={`p-2 border rounded-xl cursor-pointer transition-colors relative ${
                isRightPanelOpen 
                  ? 'bg-[#5B5BD6]/10 border-[#5B5BD6]/30 text-[#5B5BD6]' 
                  : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-500 hover:text-slate-850'
              }`}
              title={isRightPanelOpen ? "Close side utility panel" : "Open side utility panel"}
            >
              <Activity className="h-4 w-4" />
              {isRightPanelOpen && <span className="absolute top-1 right-1 h-1.5 w-1.5 bg-[#4F8CFF] rounded-full animate-ping" />}
            </button>

            {/* Notification Drawer trigger badge */}
            <div className="relative">
              <button 
                onClick={() => setShowNotificationCenter(!showNotificationCenter)}
                className="p-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-500 hover:text-slate-850 rounded-xl cursor-pointer transition-colors relative"
              >
                <Bell className="h-4 w-4" />
                <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-[#7B61FF] ring-2 ring-white animate-pulse" />
              </button>

              <AnimatePresence>
                {showNotificationCenter && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setShowNotificationCenter(false)} />
                    <motion.div 
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="absolute right-0 top-11 w-80 bg-white border border-slate-200 shadow-2xl rounded-2xl p-4 z-20 space-y-3"
                    >
                      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                        <span className="text-[9.5px] font-mono font-bold text-[#5B5BD6] uppercase tracking-widest">Active Alerts</span>
                        <button 
                          onClick={() => { setNotifications([]); setShowNotificationCenter(false); }}
                          className="text-[9px] hover:text-[#5B5BD6] font-bold"
                        >
                          Clear
                        </button>
                      </div>

                      <div className="space-y-2 max-h-60 overflow-y-auto w-full">
                        {notifications.length === 0 ? (
                          <p className="text-[10.5px] text-slate-400 py-4 text-center">Zero notification parameters active.</p>
                        ) : (
                          notifications.map((not) => (
                            <div key={not.id} className="p-2 border border-slate-50 rounded-lg text-[10.5px] bg-slate-50 leading-relaxed font-sans text-slate-700 text-left w-full">
                              <p>{not.text}</p>
                              <span className="block text-[8px] font-mono text-slate-400 text-right mt-1">{not.time}</span>
                            </div>
                          ))
                        )}
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            {/* Profile badge header */}
            <div className="sm:flex hidden items-center gap-2 border-l border-slate-200 pl-3">
              <div className="h-8 w-8 rounded-lg bg-[#5B5BD6]/10 text-[#5B5BD6] flex items-center justify-center font-display font-bold text-[10px] shrink-0 uppercase">
                {userRole.toUpperCase().slice(0, 2)}
              </div>
              <div className="text-left text-xs leading-none">
                <strong className="block text-slate-950 font-semibold text-[10.5px] max-w-[100px] truncate">{emailAddress.split('@')[0]}</strong>
                <span className="text-[8px] font-mono text-[#5B5BD6] font-bold uppercase mt-0.5 block">{userRole}</span>
              </div>
            </div>

            {/* Mobile menu trigger */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 bg-slate-50 border border-slate-200 text-[#1F2937] rounded-xl cursor-pointer"
            >
              <Menu className="h-4.5 w-4.5" />
            </button>
          </div>
        </div>

        {/* Global Search Feedback Notification banner */}
        <AnimatePresence>
          {searchedActionOutput && (
            <motion.div 
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -30, opacity: 0 }}
              className="absolute top-16 left-6 right-6 z-50 p-2.5 rounded-xl bg-[#5B5BD6] text-white text-xs text-center font-mono shadow-md"
            >
              {searchedActionOutput}
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Mobile Hamburger Drawer Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <div className="fixed inset-0 bg-[#00203F]/40 backdrop-blur-xs z-40 transition-opacity" onClick={() => setIsMobileMenuOpen(false)} />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-80 bg-white z-50 shadow-2xl p-6 flex flex-col justify-between overflow-y-auto"
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-lg bg-[#00203F] flex items-center justify-center text-white font-bold">
                      <Cpu className="h-4.5 w-4.5 text-[#36ECDE]" />
                    </div>
                    <div>
                      <strong className="text-slate-900 block leading-none font-display">BENMYL SOURCING</strong>
                      <span className="text-[8px] font-mono text-slate-400">Mobile Hub Node</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-1.5 bg-slate-50 rounded-lg hover:bg-slate-100 cursor-pointer"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <div className="space-y-1">
                  {groupedNavigation.map((group) => {
                    const isSelected = activeMobileCategory === group.id;
                    return (
                      <div key={group.id} className="border-b border-slate-50 py-1.5">
                        <button
                          onClick={() => {
                            if (group.tabId) {
                              setActiveTab(group.tabId);
                              setIsMobileMenuOpen(false);
                            } else {
                              setActiveMobileCategory(isSelected ? null : group.id);
                            }
                          }}
                          className="w-full text-left py-2 font-semibold text-xs flex justify-between items-center text-[#00203F] hover:bg-slate-50 rounded-lg px-2"
                        >
                          <div className="flex items-center gap-2">
                            <group.icon className="h-4 w-4 text-[#00203F]/60" />
                            <span>{group.label}</span>
                          </div>
                          {group.children && <ChevronDown className={`h-3 w-3 transition-transform ${isSelected ? 'rotate-180' : ''}`} />}
                        </button>

                        <AnimatePresence>
                          {group.children && isSelected && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="pl-6 space-y-1 bg-slate-50/50 p-2 rounded-lg mt-1"
                            >
                              {group.children.map((child, childIdx) => (
                                <button
                                  key={childIdx}
                                  onClick={() => {
                                    if (child.action) {
                                      child.action();
                                    } else {
                                      setActiveTab(child.tabId);
                                    }
                                    setIsMobileMenuOpen(false);
                                  }}
                                  className="w-full text-left py-1.5 font-medium text-[11px] text-slate-600 hover:text-[#00203F]"
                                >
                                  {child.label}
                                </button>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Mobile disconnect footer */}
              <div className="space-y-4 pt-6 border-t border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-[#00203f]/10 text-[#00203F] flex items-center justify-center font-bold font-display text-xs">
                    {userRole[0]?.toUpperCase()}
                  </div>
                  <div className="text-left text-xs leading-none">
                    <strong className="block text-slate-850 font-bold">{emailAddress.split('@')[0]}</strong>
                    <span className="text-[10px] text-slate-400 mt-1 block">{companyName}</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={onLogout}
                  className="w-full py-2.5 rounded-xl border border-rose-200 text-rose-600 hover:bg-rose-50 text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Disconnect Session</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Quick Action Global Overlay Drawer */}
      <AnimatePresence>
        {showQuickActionDialog && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="fixed inset-0 bg-[#00203F]/65 backdrop-blur-xs transition-opacity" onClick={() => setShowQuickActionDialog(false)} />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-zinc-900 border border-zinc-800 rounded-[28px] max-w-md w-full shadow-2xl p-6 relative overflow-hidden text-white"
            >
              {/* Highlight gradient */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#36ECDE]/10 rounded-full blur-2xl pointer-events-none" />
              
              <div className="flex justify-between items-center pb-3 border-b border-zinc-805">
                <h3 className="font-display font-bold text-sm text-white flex items-center gap-2">
                  <Sparkles className="h-4.5 w-4.5 text-[#36ECDE] animate-pulse" />
                  <span>EXPRESS DISPATCH CONSOLE</span>
                </h3>
                <button 
                  onClick={() => setShowQuickActionDialog(false)}
                  className="p-1 bg-zinc-800 rounded-lg hover:bg-zinc-700 cursor-pointer text-zinc-400"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>

              <div className="mt-4 space-y-3.5">
                <p className="text-[11px] text-zinc-400 leading-relaxed font-sans">
                  Instantly execute workspace workflows. Select your operations parameter matching standard staffing lifecycle:
                </p>

                <div className="grid grid-cols-2 gap-2.5 text-left text-xs font-sans font-semibold">
                  <button
                    onClick={() => {
                      setActiveTab('upload-bench');
                      setShowQuickActionDialog(false);
                    }}
                    className="p-3 rounded-lg bg-zinc-800 border border-zinc-700 hover:border-[#36ECDE] text-left hover:bg-zinc-800/80 transition-all flex flex-col gap-1 text-white"
                  >
                    <Upload className="h-4 w-4 text-[#36ECDE]" />
                    <span className="font-bold text-[11px]">Upload Bench</span>
                    <span className="text-[8px] text-zinc-500 font-mono">Ingress candidates</span>
                  </button>

                  <button
                    onClick={() => {
                      setActiveTab('review-resume');
                      setShowQuickActionDialog(false);
                    }}
                    className="p-3 rounded-lg bg-zinc-800 border border-zinc-700 hover:border-[#36ECDE] text-left hover:bg-zinc-800/80 transition-all flex flex-col gap-1 text-white"
                  >
                    <Cpu className="h-4 w-4 text-[#36ECDE]" />
                    <span className="font-bold text-[11px]">Review Resumes</span>
                    <span className="text-[8px] text-zinc-500 font-mono">AI Parsers splitscreen</span>
                  </button>

                  <button
                    onClick={() => {
                      setActiveTab('view-jobs');
                      setShowQuickActionDialog(false);
                    }}
                    className="p-3 rounded-lg bg-zinc-800 border border-zinc-700 hover:border-[#36ECDE] text-left hover:bg-zinc-800/80 transition-all flex flex-col gap-1 text-white"
                  >
                    <Compass className="h-4 w-4 text-[#36ECDE]" />
                    <span className="font-bold text-[11px]">Matching Jobs</span>
                    <span className="text-[8px] text-zinc-500 font-mono">Run fit test indices</span>
                  </button>

                  <button
                    onClick={() => {
                      setActiveTab('ai-assistant');
                      setShowQuickActionDialog(false);
                    }}
                    className="p-3 rounded-lg bg-zinc-800 border border-zinc-700 hover:border-[#36ECDE] text-left hover:bg-zinc-800/80 transition-all flex flex-col gap-1 text-white"
                  >
                    <Sparkles className="h-4 w-4 text-[#36ECDE]" />
                    <span className="font-bold text-[11px]">AI Assistant</span>
                    <span className="text-[8px] text-zinc-500 font-mono">Holographic Oracle chat</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {floatingNotification && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40 }}
            className="fixed bottom-24 right-6 z-55 max-w-sm w-full bg-[#00203F] border border-[#36ECDE]/30 p-4 rounded-2xl shadow-2xl flex gap-3 text-white cursor-pointer select-none"
            onClick={() => {
              setIsChatOpen(true);
              setChatViewMode('thread');
              setActiveChatId(1);
              setFloatingNotification(null);
            }}
          >
            <div className="h-9 w-9 rounded-full bg-[#36ECDE] text-[#00203F] flex items-center justify-center font-bold text-xs shrink-0 font-display shadow-inner">
              SC
            </div>
            <div className="text-left leading-normal flex-1">
              <strong className="text-[11px] block font-semibold text-white">{floatingNotification.sender} (Staffing)</strong>
              <p className="text-[10px] text-zinc-300 mt-0.5 line-clamp-2">{floatingNotification.text}</p>
              <span className="text-[8px] font-mono text-[#36ECDE] block mt-1">Click to join floating session</span>
            </div>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setFloatingNotification(null);
              }}
              className="text-zinc-400 hover:text-white shrink-0 self-start"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>


      {/* ====================================================
          2. CORE VIEWPORT WRAPPER
          ==================================================== */}
      <div className="flex-1 flex overflow-hidden bg-[#F5F7FB]">
        {/* Left Side Navigation Workspace Panel */}
        <WorkspaceSidebar 
          activeTab={activeTab}
          onNavigateTab={setActiveTab}
          isSidebarCollapsed={isSidebarCollapsed}
          setIsSidebarCollapsed={setIsSidebarCollapsed}
          companyName={companyName}
          userRole={userRole}
          emailAddress={emailAddress}
          onLogout={onLogout}
        />

        {/* Central main content timeline graph */}
        <div className="flex-1 flex flex-col min-w-0 bg-[#F5F7FB] overflow-hidden relative border-r border-[#E6E9EC]">
          
          {/* Render View Port workspace tabs */}
          <main className="flex-1 p-6 md:p-8 overflow-y-auto w-full mx-auto relative content-viewport select-text">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="w-full"
            >
              {activeTab === 'dashboard' && (
                <DashboardOverview 
                  userRole={userRole}
                  emailAddress={emailAddress}
                  companyName={companyName}
                  onNavigateTab={setActiveTab}
                  onExecuteCommand={(cmd) => {
                    setSearchTerm(cmd);
                    handleGlobalCommandSearch({ preventDefault: () => {} } as React.FormEvent);
                  }}
                />
              )}

              {activeTab === 'upload-bench' && (
                <UploadBenchScreen 
                  onNavigateToReview={(cand) => {
                    setWorkflowCandidate(cand);
                    setActiveTab('review-resume');
                  }}
                  onNavigateToJobs={(cand) => {
                    setWorkflowCandidate(cand);
                    setActiveTab('view-jobs');
                  }}
                />
              )}

              {activeTab === 'review-resume' && (
                <ReviewResumeScreen 
                  passedCandidate={workflowCandidate}
                  onNavigateBack={() => setActiveTab('upload-bench')}
                  onNavigateToJobs={(cand) => {
                    setWorkflowCandidate(cand);
                    setActiveTab('view-jobs');
                  }}
                />
              )}

              {activeTab === 'view-jobs' && (
                <ViewJobsScreen 
                  passedCandidate={workflowCandidate}
                  onNavigateBack={() => setActiveTab('review-resume')}
                />
              )}

              {activeTab === 'recruiters' && <RecruitersScreen />}
              {activeTab === 'bench-sales' && <BenchSalesScreen />}
              {activeTab === 'candidates' && <CandidatesScreen />}
              {activeTab === 'interviews' && <InterviewsScreen />}
              {activeTab === 'contracts' && <ContractsScreen />}
              {activeTab === 'vendors' && <VendorsScreen />}
              {activeTab === 'clients' && renderClientsScreen()}
              {activeTab === 'requirements' && <RequirementsScreen />}
              {activeTab === 'ai-assistant' && <AiAssistantScreen userRole={userRole} companyName={companyName} />}
              {activeTab === 'analytics' && <AnalyticsScreen />}
              {activeTab === 'automation' && <AutomationScreen />}
              {activeTab === 'messages' && <MessagesHub />}
              {activeTab === 'marketplace' && <MarketplaceScreen />}
              {activeTab === 'reports' && <ReportsScreen />}
              {activeTab === 'billing' && <BillingScreen />}
              {activeTab === 'settings' && <SettingsScreen />}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* RIGHT COLLAPSIBLE PRODUCTIVITY UTILITY WORKSPACE */}
      {isRightPanelOpen && (
        <WorkspaceRightPanel 
          onTriggerQuickAction={setActiveTab}
          onSendChatMessage={handleSendFloatingMessage}
          workspaceNotes={workspaceNotes}
          setWorkspaceNotes={setWorkspaceNotes}
        />
      )}
    </div>

      {/* ====================================================
          3. FUTURISTIC FLOATING MESSAGING COCKPIT
          ==================================================== */}
      
      {/* Dynamic Floating Message Launcher button at the bottom-right */}
      <div className="fixed bottom-6 right-6 z-40 select-none">
        <motion.button
          onClick={() => {
            setIsChatOpen(!isChatOpen);
            setChatViewMode('list');
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="h-14 w-14 bg-gradient-to-br from-[#00203F] to-[#2F2F2F] hover:from-slate-800 hover:to-zinc-900 border-2 border-[#36ECDE] text-white rounded-full flex items-center justify-center shadow-2xl relative cursor-pointer group-hover:scale-105 active:scale-95 transition-all outline-none"
          title="Toggle Brain Workspace Chat"
        >
          {/* Pulsing ring outline matching Neon Mint theme */}
          <div className="absolute inset-[-4px] rounded-full ring-2 ring-[#36ECDE]/30 animate-pulse pointer-events-none" />
          
          {isChatOpen ? (
            <X className="h-5 w-5 text-[#36ECDE]" />
          ) : (
            <MessageSquare className="h-5 w-5 text-[#36ECDE]" />
          )}

          {/* Unread message badge */}
          {!isChatOpen && (
            <span className="h-5 w-5 bg-rose-600 rounded-full text-[9px] text-white flex items-center justify-center font-bold absolute -top-1 -right-1 border border-white leading-none">
              2
            </span>
          )}
        </motion.button>
      </div>

      {/* Interactive Expandable Floating Chat Workspace Card */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className={`fixed z-40 bg-white/95 backdrop-blur-md rounded-[24px] border border-slate-200/80 shadow-2xl flex flex-col overflow-hidden select-none font-sans ${
              isChatMaximized 
                ? 'bottom-24 right-6 w-[880px] h-[580px] max-w-full' 
                : 'bottom-24 right-6 w-96 h-[510px]'
            }`}
          >
            {/* Header: drag control node & actions toolbar */}
            <div className="bg-[#00203F] px-4 py-3 text-white flex items-center justify-between pointer-events-auto border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="relative">
                  <div className="h-2 w-2 rounded-full bg-[#36ECDE] animate-ping" />
                  <div className="h-2 w-2 rounded-full bg-[#36ECDE] absolute top-0 left-0" />
                </div>
                <div>
                  <strong className="text-[11px] font-mono uppercase tracking-widest text-[#36ECDE] block leading-none">AI Sourcing Flow</strong>
                  <span className="text-[9px] text-slate-300 block leading-none font-sans mt-0.5 font-light">Interactive Slack/Discord layer</span>
                </div>
              </div>

              {/* Call indicator & workspace panel utility buttons */}
              <div className="flex items-center gap-2">
                {chatViewMode === 'thread' && (
                  <div className="flex items-center gap-1 border-r border-white/15 pr-2 mr-1">
                    <button
                      onClick={() => setActiveCall('voice')}
                      className="p-1 px-1.5 hover:bg-white/10 rounded-md text-slate-300 hover:text-[#36ECDE] transition-colors cursor-pointer"
                      title="Simulate Voice Alignment Call"
                    >
                      <Phone className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={() => setActiveCall('video')}
                      className="p-1 px-1.5 hover:bg-white/10 rounded-md text-slate-300 hover:text-[#36ECDE] transition-colors cursor-pointer"
                      title="Simulate Holographic Video Call"
                    >
                      <Video className="h-3.5 w-3.5" />
                    </button>
                  </div>
                )}

                {/* Maximize and Minimize triggers */}
                <button
                  onClick={() => setIsChatMaximized(!isChatMaximized)}
                  className="p-1 hover:bg-white/10 rounded-md text-[#36ECDE] transition-colors cursor-pointer"
                  title={isChatMaximized ? 'Return to Compact' : 'Maximize Workspace Layout'}
                >
                  {isChatMaximized ? <Minimize2 className="h-3.5 w-3.5" /> : <Maximize2 className="h-3.5 w-3.5" />}
                </button>
                
                {/* Close card button */}
                <button
                  onClick={() => setIsChatOpen(false)}
                  className="p-1 hover:bg-white/10 rounded-md text-slate-300 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            {/* Simulated Live voice or video alignment call screen inside messaging workspace */}
            <AnimatePresence>
              {activeCall && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-[#001224]/95 backdrop-blur-xl z-50 flex flex-col justify-between p-6 text-white text-center font-sans"
                >
                  <div className="space-y-1">
                    <div className="inline-block bg-teal-505/10 border border-[#36ECDE]/30 px-2.5 py-1 rounded-full text-[8.5px] font-mono uppercase text-[#36ECDE] tracking-widest animate-pulse">
                      HOLOGRAPHIC {activeCall.toUpperCase()} FEED ACTIVE
                    </div>
                    <h4 className="font-display font-bold text-xs text-slate-100 uppercase tracking-wider block pt-2">
                      Alignment Session
                    </h4>
                    <span className="text-[10px] text-zinc-400 font-mono">
                      {activeChat.name} • {activeChat.role}
                    </span>
                  </div>

                  {/* Pulsing layout audio waveform representer */}
                  <div className="my-3 py-4 flex flex-col items-center justify-center space-y-4">
                    <div className="relative">
                      {/* Pulse rings */}
                      <span className="absolute inset-0 rounded-full bg-[#36ECDE]/20 scale-125 animate-ping" />
                      <span className="absolute inset-0 rounded-full bg-[#36ECDE]/10 scale-150 animate-pulse" />
                      
                      {activeCall === 'video' && !callVideoOff ? (
                        <div className="h-16 w-32 rounded-xl bg-zinc-900 border border-[#36ECDE] overflow-hidden flex items-center justify-center relative shadow-2xl">
                          {/* Simulated camera capture screen */}
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Tv className="h-8 w-8 text-[#36ECDE]/50 animate-bounce" />
                          </div>
                          <span className="absolute bottom-1 right-1 text-[7px] font-mono bg-black/60 px-1 py-0.5">SAM_CAM_FEED</span>
                        </div>
                      ) : (
                        <div className="h-14 w-14 rounded-full bg-slate-900 border border-[#36ECDE]/50 flex items-center justify-center">
                          <Volume2 className="h-5 w-5 text-[#36ECDE] animate-bounce" />
                        </div>
                      )}
                    </div>

                    {/* Timer */}
                    <span className="text-xs font-mono font-bold text-[#36ECDE]">
                      {Math.floor(callTimer / 60).toString().padStart(2, '0')}:{(callTimer % 60).toString().padStart(2, '0')}
                    </span>

                    {/* Real-time speech-to-text transcript feed scrolling live */}
                    <div className="w-full max-w-sm h-28 overflow-y-auto bg-black/40 border border-white/5 p-3 rounded-lg text-left space-y-1.5 scrollbar-thin">
                      {callTranscript.map((line, idx) => (
                        <p key={idx} className="text-[9.5px] font-sans text-zinc-350 leading-relaxed font-light">
                          {line.startsWith('S') ? (
                            <strong className="text-[#36ECDE]">{line.split(':')[0]}:</strong>
                          ) : line.startsWith('Me') ? (
                            <strong className="text-indigo-400">{line.split(':')[0]}:</strong>
                          ) : (
                            <strong className="text-zinc-400">🤖 AI Translator:</strong>
                          )}
                          {line.includes(':') ? line.split(':')[1] : line}
                        </p>
                      ))}
                      {isAiTyping && <span className="text-[8px] font-mono text-[#36ECDE] tracking-wider animate-pulse uppercase select-none">AI Scribing audio thread...</span>}
                    </div>
                  </div>

                  {/* Audio Call controls strip */}
                  <div className="flex items-center justify-center gap-3">
                    <button
                      onClick={() => setCallMuted(!callMuted)}
                      className={`p-2.5 rounded-full cursor-pointer transition-colors ${
                        callMuted ? 'bg-[#36ECDE] text-[#00203F]' : 'bg-zinc-800 text-slate-300 hover:bg-zinc-700'
                      }`}
                      title={callMuted ? 'Unmute microphone' : 'Mute microphone'}
                    >
                      <Mic className="h-4 w-4" />
                    </button>

                    {activeCall === 'video' && (
                      <button
                        onClick={() => setCallVideoOff(!callVideoOff)}
                        className={`p-2.5 rounded-full cursor-pointer transition-colors ${
                          callVideoOff ? 'bg-indigo-600 text-white' : 'bg-zinc-800 text-slate-300 hover:bg-zinc-700'
                        }`}
                        title={callVideoOff ? 'Trigger WebCam Capture ON' : 'Trigger WebCam Capture OFF'}
                      >
                        <Tv className="h-4 w-4" />
                      </button>
                    )}

                    <button
                      onClick={() => setActiveCall(null)}
                      className="p-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-full cursor-pointer"
                      title="Disconnect session channel"
                    >
                      <PhoneOff className="h-4.5 w-4.5" />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Split screen canvas layout inside card limits */}
            <div className="flex-1 flex overflow-hidden bg-[#E6E9EC]/40 relative">
              
              {/* Sidebar conversation selection panel: Only rendered in Maximized mode or Compact List mode */}
              {(isChatMaximized || chatViewMode === 'list') && (
                <div className={`shrink-0 border-r border-slate-200 p-3.5 space-y-3 flex flex-col justify-between bg-white h-full ${
                  isChatMaximized ? 'w-64' : 'w-full'
                }`}>
                  <div className="space-y-3 flex flex-col flex-1 overflow-y-auto">
                    {/* Header text */}
                    <div>
                      <strong className="text-[10px] font-mono uppercase text-slate-400 font-bold tracking-wider">Holographic Channels</strong>
                    </div>

                    {/* Chat thread query search box */}
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2 h-3.5 w-3.5 text-slate-400" />
                      <input
                        type="text"
                        className="w-full pl-8 pr-3 py-1.5 border border-slate-200 focus:border-[#00203f] bg-slate-50 rounded-lg text-[10.5px] outline-none"
                        placeholder="Search channel thread..."
                        value={chatSearchText}
                        onChange={(e) => setChatSearchText(e.target.value)}
                      />
                    </div>

                    {/* Conversational list stream */}
                    <div className="space-y-1.5 flex-1 overflow-y-auto">
                      {chatThreads
                        .filter(t => t.name.toLowerCase().includes(chatSearchText.toLowerCase()))
                        .map((thread) => {
                          const isActive = thread.id === activeChatId;
                          return (
                            <div
                              key={thread.id}
                              onClick={() => {
                                setActiveChatId(thread.id);
                                setChatViewMode('thread');
                              }}
                              className={`p-2.5 rounded-xl border text-left cursor-pointer transition-all space-y-1 ${
                                isActive 
                                  ? 'border-[#00203f] bg-[#00203f]/5 shadow-xs' 
                                  : 'border-slate-100 hover:bg-slate-50/70'
                              }`}
                            >
                              <div className="flex justify-between items-start gap-1">
                                <div className="flex items-center gap-1.5">
                                  <div className={`h-6.5 w-6.5 rounded-full flex items-center justify-center font-display font-extrabold text-[10px] shrink-0 border border-slate-200 ${thread.avatarBg}`}>
                                    {thread.name.split(' ').map(n=>n[0]).slice(0, 2).join('')}
                                  </div>
                                  <div className="truncate shrink">
                                    <strong className="text-[10.5px] text-slate-900 font-semibold block truncate leading-none">{thread.name.split(' ')[0]} {thread.name.split(' ')[1] || ''}</strong>
                                    <span className="text-[8px] font-mono text-slate-400 block tracking-wider uppercase mt-0.5 leading-none font-bold">
                                      {thread.type}
                                    </span>
                                  </div>
                                </div>
                                <span className="text-[7.5px] text-slate-400 font-mono whitespace-nowrap pt-0.5">{thread.time}</span>
                              </div>
                              <p className="text-[9.5px] text-slate-450 truncate whitespace-nowrap pl-0.5">{thread.lastMessage}</p>
                            </div>
                          );
                        })}
                    </div>
                  </div>

                  {/* Direct bottom utilities inside floating conversation list */}
                  <div className="pt-2 border-t border-slate-100 text-center flex items-center justify-between text-[9px] font-mono text-slate-400 leading-none">
                    <span>Broker state: Active</span>
                    <button 
                      onClick={() => setMuteFloatingAudios(!muteFloatingAudios)}
                      className="hover:text-[#00203F] text-[8.5px] font-bold cursor-pointer"
                    >
                      {muteFloatingAudios ? '🔇 Muted' : '🔊 Audios ON'}
                    </button>
                  </div>
                </div>
              )}

              {/* Chat column thread active conversations panel: Only rendered in Maximized mode or Compact Chat screen */}
              {(isChatMaximized || chatViewMode === 'thread') && (
                <div className="flex-1 flex flex-col justify-between bg-white h-full relative">
                  
                  {/* Thread sub banner header */}
                  <div className="px-4 py-2 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center text-xs">
                    <div className="truncate text-left leading-normal">
                      <div className="flex items-center gap-1.5">
                        {chatViewMode === 'thread' && !isChatMaximized && (
                          <button
                            onClick={() => setChatViewMode('list')}
                            className="p-1 hover:bg-slate-200 text-slate-500 rounded-md shrink-0 cursor-pointer mr-0.5"
                            title="Back to Sourcing Channels list"
                          >
                            <ChevronLeft className="h-4.5 w-4.5" />
                          </button>
                        )}
                        <strong className="text-[11.5px] font-display font-extrabold text-slate-900 truncate block">
                          {activeChat.name}
                        </strong>
                      </div>
                      <span className="text-[8.5px] font-mono text-slate-405 block uppercase leading-none font-semibold mt-0.5">
                        {activeChat.type} • Status: Secure holographic
                      </span>
                    </div>

                    <div className="flex gap-1">
                      {/* Pinned toggle marker */}
                      <button
                        onClick={() => {
                          setPinnedMessageId(pinnedMessageId ? null : 1);
                        }}
                        className={`p-1 rounded hover:bg-slate-200 cursor-pointer ${pinnedMessageId ? 'text-amber-500' : 'text-slate-400'}`}
                        title="Display Pinned AI Broadcast Announcement"
                      >
                        <Pin className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Pinned Oracle notification bar wrapper */}
                  <AnimatePresence>
                    {pinnedMessageId && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="bg-amber-50/50 border-b border-amber-100 p-2 px-4 text-left flex justify-between items-center text-[9px] text-amber-900 gap-2 font-mono leading-relaxed"
                      >
                        <span className="truncate">
                          📌 <strong>Pinned:</strong> Alignment sync scheduled on HSBC Requirements node tomorrow afternoon at 2 PM EST.
                        </span>
                        <button onClick={() => setPinnedMessageId(null)} className="text-slate-400 hover:text-slate-600 shrink-0">
                          <X className="h-3 w-3" />
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Scrolling chat messages list stream */}
                  <div className="flex-1 p-4 overflow-y-auto space-y-4 shadow-inner">
                    {activeChat.transcript.map((chat, idx) => {
                      const isMe = chat.sender.includes('Me');
                      return (
                        <div
                          key={idx}
                          className={`flex flex-col gap-1 max-w-[85%] ${
                            isMe ? 'ml-auto items-end' : 'mr-auto'
                          }`}
                        >
                          <span className="text-[8px] font-mono text-slate-400 uppercase tracking-widest leading-none font-bold block">
                            {chat.sender}
                          </span>

                          <div className={`p-3 rounded-2xl text-[10.5px] shadow-xs ${
                            isMe 
                              ? 'bg-[#00203F] text-white rounded-tr-none' 
                              : 'bg-slate-100 border border-slate-200 text-slate-900 rounded-tl-none'
                          }`}>
                            {renderFloatingMessageContent(chat.text)}
                            <div className="flex items-center justify-end gap-1 mt-1 opacity-75">
                              <span className="block text-[7.5px] font-mono uppercase text-right leading-none">
                                {chat.time}
                              </span>
                              {isMe && <CheckCheck className="text-[#36ECDE] h-3 w-3 inline leading-none shrink-0" />}
                            </div>
                          </div>
                        </div>
                      );
                    })}

                    {/* AI Thinking typing placeholder indicators */}
                    {isAiTyping && (
                      <div className="flex items-center gap-1 text-[9px] text-[#00203f] font-mono tracking-wider bg-[#36ECDE]/15 border border-[#36ECDE]/30 p-2.5 rounded-xl max-w-[200px] select-none animate-pulse">
                        <Loader2 className="h-3 w-3 animate-spin shrink-0 text-[#00203f]" />
                        <span>Oracle AI calculating suitability...</span>
                      </div>
                    )}
                  </div>

                  {/* Suggestion capsules/pills ribbon */}
                  <div className="px-3.5 py-2.5 bg-slate-50/80 border-t border-slate-150 overflow-x-auto min-h-[40px]">
                    <div className="flex items-center gap-1.5 min-w-max pb-0.5">
                      {getSmartSuggestions().map((sug, sIdx) => (
                        <button
                          key={sIdx}
                          type="button"
                          onClick={() => {
                            handleSendFloatingMessage(sug.label);
                          }}
                          className="py-1 px-2.5 rounded-full bg-white hover:bg-slate-100 border border-slate-200 text-[#00203F] font-semibold text-[9px] cursor-pointer whitespace-nowrap hover:scale-103 active:scale-97 transition-all flex items-center gap-1 shadow-2xs"
                        >
                          <span>{sug.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Input sending elements form */}
                  <form 
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSendFloatingMessage(chatInputText);
                    }} 
                    className="p-3 border-t border-slate-150 bg-white flex items-center gap-2"
                  >
                    {/* Simulated file clip attachment button */}
                    <button
                      type="button"
                      onClick={() => {
                        const files = [
                          '[CV] Nolan_Vasquez_FrontEnd_Staffing_Match.pdf',
                          '[CV] Aligned_Technical_Parameters_AWS.xlsx',
                          '[CV] AWS_Cloud_Architect_Calibrated_Dossier.pdf'
                        ];
                        const randomFile = files[Math.floor(Math.random() * files.length)];
                        handleSendFloatingMessage(randomFile);
                      }}
                      className="p-2 hover:bg-slate-100 text-slate-400 hover:text-[#00203F] rounded-lg shrink-0 cursor-pointer"
                      title="Attach candidates dossier Object directly"
                    >
                      <Paperclip className="h-4.5 w-4.5" />
                    </button>

                    <input
                      type="text"
                      className="flex-1 p-2.5 border border-slate-200 focus:border-[#00203F] rounded-xl text-xs outline-none bg-slate-50 text-[#00203F] placeholder:text-slate-400"
                      placeholder="Ask Oracle AI matching, or chat securely..."
                      value={chatInputText}
                      onChange={(e) => setChatInputText(e.target.value)}
                    />

                    {/* Speech waveform simulator note toggle button */}
                    <button
                      type="button"
                      onClick={() => {
                        handleSendFloatingMessage('[AUDIO] Sourcing memo regarding rate allowance indexes');
                      }}
                      className="p-2 hover:bg-slate-100 text-slate-400 hover:text-red-500 rounded-lg shrink-0 cursor-pointer"
                      title="Record voice note memo"
                    >
                      <Mic className="h-4.5 w-4.5" />
                    </button>

                    <button
                      type="submit"
                      disabled={!chatInputText.trim()}
                      className="p-2.5 bg-[#00203F] text-[#36ECDE] rounded-xl cursor-pointer hover:bg-slate-800 disabled:opacity-40 flex items-center justify-center shrink-0 transition-all shadow-xs"
                    >
                      <Send className="h-4 w-4" />
                    </button>
                  </form>
                  
                </div>
              )}

            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

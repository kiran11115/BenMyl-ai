/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { simulateChatResponse, simulateResumeParse, simulateEmailGeneration } from '../../utils/geminiClient';
import { 
  Sparkles, 
  Cpu, 
  Send, 
  Bot, 
  User, 
  FileText, 
  Mail, 
  Mic, 
  Volume2, 
  MicOff, 
  UploadCloud, 
  ArrowRight,
  Clipboard,
  CheckCircle,
  Brain,
  RefreshCw,
  Sliders,
  Sparkle,
  Plus,
  Trash2,
  HelpCircle,
  X,
  ChevronRight,
  ChevronDown,
  Paperclip,
  Check,
  ExternalLink,
  Play,
  Pause,
  Menu,
  CheckCircle2,
  ListTodo
} from 'lucide-react';

interface ChatMessage {
  id: number;
  sender: 'ai' | 'user';
  text: string;
  time: string;
  // Dynamic fields for custom GPT UI cards
  parsedData?: any;
  emailDraft?: string;
  isVoiceActive?: boolean;
}

interface Thread {
  id: string;
  title: string;
  description: string;
  category: string;
  model: string;
  initialMessage: string;
}

interface AiAssistantScreenProps {
  userRole?: string;
  companyName?: string;
}

export default function AiAssistantScreen({ userRole = 'recruiter', companyName = 'Alpha Staffing Network' }: AiAssistantScreenProps) {
  // Preset Threads / Specialized GPT Sourcing Agents
  const PRESET_THREADS: Thread[] = [
    {
      id: 'default',
      title: 'Oracle Sourcing Intel',
      description: 'Find, parse, and score talent matching rules.',
      category: 'Talent Acquisition',
      model: 'Oracle Cognitive v4 (Flash)',
      initialMessage: `Greetings! I am the BenMyl Sourcing Oracle initialized for ${companyName}. As a ${userRole}, ask me to locate benchmark candidates, parse resumes to calculate fit indices, or write high-conversion outreach copy.`
    },
    {
      id: 'resume-agent',
      title: 'CV Intelligent Parser',
      description: 'Vets unstructured resumes for core fit.',
      category: 'Resume Analysis',
      model: 'Cognitive Extractor v2',
      initialMessage: 'Drop paste structured talent matrices or CV profiles here. I will extract tech stacks, highlight key achievements, list metrics, and calibrate alignment instantly.'
    },
    {
      id: 'email-bot',
      title: 'Outreach Convincer',
      description: 'Composes personalized engagement copy.',
      category: 'Communications',
      model: 'Synthetic Mailer v1',
      initialMessage: 'Ready to write targeted candidate recruitment pitches. Provide a name, a role track, and candidate highlights to write automated outreach emails.'
    },
    {
      id: 'voice-node',
      title: 'Verbal Diagnostics Feed',
      description: 'Converts dictated guidelines to workspace routines.',
      category: 'Voice Command',
      model: 'ListenFlow NLP v2',
      initialMessage: 'Secure verbal command link activated. Click the microphone in the pill console below and dictate your sourcing directives to align filters conversationally.'
    }
  ];

  const [activeThreadId, setActiveThreadId] = useState<string>('default');
  const [messagesByThread, setMessagesByThread] = useState<Record<string, ChatMessage[]>>({
    default: [
      { 
        id: 1, 
        sender: 'ai', 
        text: PRESET_THREADS[0].initialMessage, 
        time: '08:50 AM' 
      }
    ],
    'resume-agent': [
      {
        id: 2,
        sender: 'ai',
        text: PRESET_THREADS[1].initialMessage,
        time: '08:50 AM'
      }
    ],
    'email-bot': [
      {
        id: 3,
        sender: 'ai',
        text: PRESET_THREADS[2].initialMessage,
        time: '08:50 AM'
      }
    ],
    'voice-node': [
      {
        id: 4,
        sender: 'ai',
        text: PRESET_THREADS[3].initialMessage,
        time: '08:50 AM'
      }
    ]
  });

  const [chatInput, setChatInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isAiTyping, setIsAiTyping] = useState(false);
  const [showToolbox, setShowToolbox] = useState(false); // Collapsible power-user Sourcing Toolbox drawer
  const [toolboxTab, setToolboxTab] = useState<'parser' | 'email' | 'voice'>('parser');
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Resume Parser state inside Toolbox helper
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [pastedResumeText, setPastedResumeText] = useState('');
  const [parsingResults, setParsingResults] = useState<any | null>(null);
  const [isParsing, setIsParsing] = useState(false);
  const [parseError, setParseError] = useState<string | null>(null);

  // Email Generator state inside Toolbox helper
  const [emailCandidate, setEmailCandidate] = useState('Nolan Vasquez');
  const [emailRole, setEmailRole] = useState('Staff React Architect');
  const [emailContext, setEmailContext] = useState('led core micro-frontend architecture migration, reducing build latency by over 60%');
  const [isGeneratingEmail, setIsGeneratingEmail] = useState(false);
  const [emailOutput, setEmailOutput] = useState(
    `Subject: Hot Bench Candidate available instantly - Staff Front End React Engineer (8y EXP)\n\nDear Talent Acquisition Lead,\n\nI hope this message finds you well.\n\nI wanted to bring to your immediate attention a stellar hot-bench developer currently available under BenMyl network's high priority matching clearance:\n\nCandidate Profile: Nolan Vasquez\nRole Track: Senior/Staff Frontend React Architect\nVerified Stack: React Core, TypeScript, Next.js, Redux, Node, Tailwind CSS\nYears of Experience: 8 Years verified\nRate Target: $85/hr (Contract equivalent/W2 support)\n\nNolan recently led core micro-frontend architecture migration at capital banking organizations, reducing build latency figures by over 60%. His security clearances have been fully vetted by BenMyl integration portals.\n\nPlease let me know if we can schedule a quick brief sync with Nolan tomorrow morning.\n\nWarm regards,\nSourcing Integrity Lead\nAlpha Staffing Network`
  );

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const activeThread = PRESET_THREADS.find(t => t.id === activeThreadId) || PRESET_THREADS[0];
  const activeMessages = messagesByThread[activeThreadId] || [];

  // Speech Recognition API setup
  const recognitionRef = useRef<any>(null);

  // Auto scroll down chat messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeMessages, isAiTyping]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const rec = new SpeechRecognition();
        rec.continuous = false;
        rec.interimResults = false;
        rec.lang = 'en-US';

        rec.onresult = (e: any) => {
          const transcript = e.results[0][0].transcript;
          if (transcript) {
            setChatInput(transcript);
            submitUserInquiry(transcript);
          }
          setIsRecording(false);
        };

        rec.onerror = (e: any) => {
          console.error('Speech recognition error:', e);
          setIsRecording(false);
        };

        rec.onend = () => {
          setIsRecording(false);
        };

        recognitionRef.current = rec;
      }
    }
  }, [activeThreadId, messagesByThread]);

  const handleVoiceToggle = () => {
    if (!recognitionRef.current) {
      alert("Voice speech services are currently simulated in this context. Double check that microphone clearance permissions are enabled inside metadata configurations.");
      // Trigger voice simulation response as a fallback
      simulateVoiceInstruction();
      return;
    }

    if (isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
    } else {
      setIsRecording(true);
      recognitionRef.current.start();
    }
  };

  const simulateVoiceInstruction = () => {
    setIsRecording(true);
    setTimeout(() => {
      setIsRecording(false);
      const simulatedText = "Check hotbench reactivity candidates matching HSBC requisitions";
      setChatInput(simulatedText);
      submitUserInquiry(simulatedText);
    }, 2800);
  };

  const submitUserInquiry = async (text: string) => {
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now(),
      sender: 'user',
      text: text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    // Update messages local state
    setMessagesByThread(prev => {
      const current = prev[activeThreadId] || [];
      return {
        ...prev,
        [activeThreadId]: [...current, userMsg]
      };
    });

    setChatInput('');
    setIsAiTyping(true);

    try {
      let textResponse = "";
      let parsedData: any = null;
      let emailDraft: string | undefined = undefined;

      const lowerText = text.toLowerCase();
      // Intelligent routing for conversational results to make the modern GPT look extremely responsive!
      if (lowerText.includes("parse") || lowerText.includes("resume") || lowerText.includes("cv") || lowerText.includes("clara")) {
        textResponse = "I have initiated the CV Extraction Engine to parse files using our structured matching algorithm. Below are the finalized suitability metrics calculated:";
        parsedData = {
          name: "Clara Vance",
          role: "Senior Full Stack React Engineer",
          matchScore: "96/100",
          keySkills: ["React 19", "TypeScript", "TailwindCSS", "Node.js", "PostgreSQL"],
          highlights: [
            "Vetted core client micro-frontend transitions.",
            "Reduced UI frame latency by 40% with smart hook refactoring.",
            "Architected stable state synchronization for offshore teams."
          ]
        };
      } else if (lowerText.includes("email") || lowerText.includes("write") || lowerText.includes("outreach") || lowerText.includes("campaign")) {
        const candidateName = lowerText.includes("srinivasan") ? "Srinivasan Naidu" : "Nolan Vasquez";
        const trkRole = lowerText.includes("srinivasan") ? "Senior Java Specialist" : "Staff React Architect";
        const customCtx = "led frontend modular builds, reducing build delays by over 60%";
        
        emailDraft = await simulateEmailGeneration(candidateName, trkRole, customCtx, companyName);
        textResponse = `Perfect. I have drafted custom outbound candidate positioning copy for **${candidateName}** matching standard master brokerage service terms:`;
      } else {
        // Standard conversational chat helper
        textResponse = await simulateChatResponse([...activeMessages, userMsg], userRole, companyName);
      }

      const aiMsg: ChatMessage = {
        id: Date.now() + 1,
        sender: 'ai',
        text: textResponse,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        parsedData,
        emailDraft
      };

      setMessagesByThread(prev => {
        const current = prev[activeThreadId] || [];
        return {
          ...prev,
          [activeThreadId]: [...current, aiMsg]
        };
      });
    } catch (err: any) {
      const errorMsg: ChatMessage = {
        id: Date.now() + 1,
        sender: 'ai',
        text: `Error connecting to Oracle neural channel: ${err.message || 'Verification timed out.'}`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessagesByThread(prev => {
        const current = prev[activeThreadId] || [];
        return {
          ...prev,
          [activeThreadId]: [...current, errorMsg]
        };
      });
    } finally {
      setIsAiTyping(false);
    }
  };

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || isAiTyping) return;
    const input = chatInput;
    submitUserInquiry(input);
  };

  // Click prompt starter
  const executePromptStarter = (promptText: string) => {
    if (isAiTyping) return;
    submitUserInquiry(promptText);
  };

  // Reset active session
  const handleClearContext = () => {
    setMessagesByThread(prev => ({
      ...prev,
      [activeThreadId]: [
        {
          id: Date.now(),
          sender: 'ai',
          text: `Chat context flushed for active agent. ${activeThread.initialMessage}`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]
    }));
  };

  // Simulated CV shortcuts
  const SAMPLE_RESUMES = [
    {
      title: "Clara Vance (React Dev)",
      text: "Candidate: Clara Vance\nRole: Senior Full Stack React Engineer\nExperience: 7 Years\nSkills: React 19, TypeScript, TailwindCSS, Node.js, PostgreSQL\nAchievements: Guided high fidelity UI design transformations. Implemented fast routing for ecommerce. Reduced client-side state lag by 40% using custom React hooks."
    },
    {
      title: "Ethan Vance (DevOps)",
      text: "Candidate: Ethan Vance\nRole: Staff DevOps Architect\nExperience: 10 Years\nSkills: Kubernetes, AWS, Terraform, Docker, Python\nAchievements: Built isolated self-healing node clusters. Decreased developer environment spin up times by 75%. Migrated multi-region service databases without loss."
    },
    {
      title: "Srinivasan Naidu (Java)",
      text: "Candidate: Srinivasan Naidu\nRole: Principal Cloud Java Specialist\nExperience: 8 Years\nSkills: Java 21, Spring Boot, Apache Kafka, Docker, Kubernetes\nAchievements: Scaled sub-second financial transaction layers. Orchestrated heavy load event brokers with Kafka. Mentored dual timezone agile pods."
    }
  ];

  const handleSampleResumeSelect = (text: string) => {
    setPastedResumeText(text);
    setUploadedFileName("Preset_Simulation_Resume.txt");
  };

  const handleParseResume = async () => {
    if (!pastedResumeText.trim()) {
      setParseError("Please input or paste some resume text first.");
      return;
    }

    setIsParsing(true);
    setParsingResults(null);
    setParseError(null);

    try {
      const parsed = await simulateResumeParse(
        pastedResumeText,
        uploadedFileName || "pasted_text_input.txt"
      );
      setParsingResults(parsed);
      
      // Inject parsed result as a nice simulated card inside the ChatGPT screen too!
      const userAnnounce: ChatMessage = {
        id: Date.now(),
        sender: 'user',
        text: `Command run: Parse resume profile (${uploadedFileName || "pasted_input"}).`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      const parsedAnnounce: ChatMessage = {
        id: Date.now() + 1,
        sender: 'ai',
        text: "I have imported the raw text profile into our workspace core. Here's the extraction schematic:",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        parsedData: parsed
      };

      setMessagesByThread(prev => {
        const current = prev[activeThreadId] || [];
        return {
          ...prev,
          [activeThreadId]: [...current, userAnnounce, parsedAnnounce]
        };
      });

    } catch (err: any) {
      setParseError(err.message || "Failed to parse profile.");
    } finally {
      setIsParsing(false);
    }
  };

  const handleGenerateCustomEmail = async () => {
    setIsGeneratingEmail(true);
    try {
      const output = await simulateEmailGeneration(
        emailCandidate,
        emailRole,
        emailContext,
        companyName
      );
      setEmailOutput(output);

      // Inject email output neatly into the ChatGPT viewport as an interactive feed bubble!
      const userAnnounce: ChatMessage = {
        id: Date.now(),
        sender: 'user',
        text: `Command run: Write custom outreach email for candidate "${emailCandidate}" targeting "${emailRole}".`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      const emailAnnounce: ChatMessage = {
        id: Date.now() + 1,
        sender: 'ai',
        text: "Outbound placement pitch generated successfully. Review or customize the draft below:",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        emailDraft: output
      };

      setMessagesByThread(prev => {
        const current = prev[activeThreadId] || [];
        return {
          ...prev,
          [activeThreadId]: [...current, userAnnounce, emailAnnounce]
        };
      });

    } catch (err: any) {
      alert("Error generating outreach email: " + err.message);
    } finally {
      setIsGeneratingEmail(false);
    }
  };

  return (
    <div className="space-y-5 pb-12">
      {/* Title block */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200/50 pb-3">
        <div>
          <h2 className="text-lg font-display font-bold text-[#00203F] flex items-center gap-2">
            <Bot className="h-5.5 w-5.5 text-[#36ECDE] fill-[#00203f]" />
            <span>AI Assistant Copilot</span>
          </h2>
          <p className="text-slate-450 text-[11px] font-medium">
            Next-generation ChatGPT-inspired sourcing suite powered by Google Gemini. Parse CVs, map talent calibrations, and craft placement communications.
          </p>
        </div>
        <div className="flex items-center gap-1.5 self-start sm:self-center">
          {/* Sourcing toolbox toggler - power user indicator */}
          <button
            onClick={() => setShowToolbox(!showToolbox)}
            className={`px-3 py-1.5 rounded-xl text-[10.5px] font-semibold border transition-all cursor-pointer flex items-center gap-1.5 ${
              showToolbox 
                ? 'bg-[#00203F] text-[#36ECDE] border-[#36ECDE]/30 shadow-sm' 
                : 'bg-white text-slate-600 hover:text-[#00203F] hover:bg-slate-50 border-slate-250'
            }`}
          >
            <Sliders className="h-3.5 w-3.5" />
            <span>{showToolbox ? 'Hide Sourcing Toolbox' : 'Show Sourcing Toolbox'}</span>
          </button>
          
          <div className="hidden sm:flex items-center gap-1 px-3 py-1.5 bg-[#36ECDE]/10 border border-[#36ECDE]/30 rounded-full text-[#00203F] text-[9.5px] font-mono uppercase tracking-wider font-bold">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping inline-block shrink-0" />
            <span>{activeThread.model}</span>
          </div>
        </div>
      </div>

      {/* Main GPT split grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        
        {/* LEFT COLUMN: GPT Side Menu (Spans 3 cols on wide viewports) */}
        <div className="lg:col-span-3 bg-[#00203F] text-slate-100 rounded-[22px] border border-[#002d59] p-4 flex flex-col justify-between h-[650px] shadow-sm select-none">
          <div className="space-y-4">
            
            {/* Thread Header action */}
            <button
              onClick={() => {
                setActiveThreadId('default');
                handleClearContext();
              }}
              className="w-full bg-[#1b3a56] hover:bg-[#264b6e] border border-[#36ECDE]/20 text-[#36ECDE] py-2.5 px-3 rounded-xl flex items-center justify-between text-xs font-bold font-sans cursor-pointer transition-all hover:scale-[1.01]"
            >
              <div className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                <span>Initialize Session</span>
              </div>
              <span className="text-[7.5px] font-mono tracking-widest bg-[#36ECDE] text-[#00203f] px-1 py-0.5 rounded font-black">NEW</span>
            </button>

            {/* Sourcing Agents Panel selector */}
            <div className="space-y-2">
              <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest block pl-1">Active Sourcing Agents</span>
              
              <div className="space-y-1.5 max-h-[380px] overflow-y-auto pr-1">
                {PRESET_THREADS.map((th) => {
                  const isSelected = th.id === activeThreadId;
                  return (
                    <button
                      key={th.id}
                      onClick={() => {
                        setActiveThreadId(th.id);
                        // Make sure we carry messages
                        if (!messagesByThread[th.id]) {
                          setMessagesByThread(prev => ({
                            ...prev,
                            [th.id]: [{ id: Date.now(), sender: 'ai', text: th.initialMessage, time: '08:50 AM' }]
                          }));
                        }
                      }}
                      className={`w-full text-left p-2.5 rounded-xl transition-all cursor-pointer flex flex-col gap-1 ${
                        isSelected 
                          ? 'bg-[#1b3a56] border-l-3 border-[#36ECDE] text-white shadow-inner' 
                          : 'text-slate-350 hover:bg-[#002d59]/50 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <strong className="text-xs font-semibold leading-tight truncate">{th.title}</strong>
                        <span className="text-[7px] font-mono bg-white/10 text-slate-300 px-1 rounded-sm uppercase tracking-wide">
                          {th.category.split(' ')[0]}
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-400 truncate font-sans font-medium">{th.description}</p>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Sidebar System Telemetry Controls */}
          <div className="space-y-2 pt-4 border-t border-[#1b3a56] text-slate-400 text-[10px]">
            <div className="flex justify-between items-center text-[9px] font-medium font-sans">
              <span>Sourcing Engine status</span>
              <span className="text-emerald-400 font-mono font-bold uppercase">SECURED</span>
            </div>
            <div className="p-2.5 bg-[#00172e] rounded-xl border border-[#1b3a56] space-y-1 font-mono text-[9px]">
              <div className="flex justify-between">
                <span>Model clearance</span>
                <span className="text-[#36ECDE] font-bold">L4 Clearance</span>
              </div>
              <div className="flex justify-between">
                <span>Calibration weights</span>
                <span>Adaptive (0.2)</span>
              </div>
              <div className="flex justify-between">
                <span>Context tokens</span>
                <span className="text-slate-300">12,410 used</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT AREA: Main Conversational ChatGPT Workspace + Collapsible Toolbox */}
        <div className={`grid grid-cols-12 gap-0 border border-slate-205 rounded-[22px] bg-white overflow-hidden shadow-sm h-[650px] relative ${
          showToolbox ? 'lg:col-span-9' : 'lg:col-span-9'
        }`}>
          
          {/* Column A: ChatGPT chat window container (spans full-width if toolbox is closed) */}
          <div className={`flex flex-col justify-between h-full bg-[#FAFAFC] ${
            showToolbox ? 'col-span-12 lg:col-span-7 border-r border-slate-200' : 'col-span-12'
          }`}>
            
            {/* Chat Workspace Header menu */}
            <div className="px-4 py-3 bg-white border-b border-slate-105 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 bg-[#00203f]/5 text-[#00203F] flex items-center justify-center rounded-lg border border-slate-200">
                  <Cpu className="h-4 w-4" />
                </div>
                <div className="text-left">
                  <h4 className="font-display font-bold text-xs text-[#00203F] leading-tight flex items-center gap-1">
                    <span>{activeThread.title}</span>
                    <span className="text-[8px] font-mono text-slate-400 font-bold">({activeThread.model})</span>
                  </h4>
                  <span className="block text-[8px] font-mono text-emerald-600 font-bold uppercase tracking-wider">BenMyl calibrated workspace active</span>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={handleClearContext}
                  className="px-2.5 py-1 text-[9.5px] font-bold font-mono text-slate-450 hover:text-[#00203F] bg-slate-50 border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors uppercase cursor-pointer"
                  title="Flash current conversation thread history"
                >
                  Reload Context
                </button>
              </div>
            </div>

            {/* AI Conversation Scroll Hub flow */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 scrollbar-thin scroll-smooth min-h-0 bg-slate-50/40">
              
              {/* Modern ChatGPT Empty State Welcome Screen */}
              {activeMessages.length <= 1 && (
                <div className="py-8 px-4 flex flex-col items-center justify-center text-center max-w-xl mx-auto space-y-5 select-none h-full">
                  <div className="relative">
                    <div className="absolute inset-0 bg-[#36ECDE]/20 rounded-full blur-xl animate-pulse" />
                    <div className="relative h-14 w-14 rounded-2xl bg-gradient-to-tr from-[#00203F] to-[#264b6e] text-white flex items-center justify-center shadow-md">
                      <Sparkles className="h-7 w-7 text-[#36ECDE] animate-pulse" />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <h3 className="font-display font-extrabold text-[#00203F] text-base leading-tight">
                      How can I facilitate your sourcing today?
                    </h3>
                    <p className="text-slate-400 text-xs font-sans max-w-md mx-auto leading-relaxed">
                      Select custom workspace prompts below to automatically simulate recruiting pipelines, analyze candidate profiles, or construct outreach emails.
                    </p>
                  </div>

                  {/* Bento Prompts starters */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full text-left pt-3">
                    <button
                      type="button"
                      onClick={() => executePromptStarter("Scan hotbench for senior React matching specifications.")}
                      className="p-3 bg-white hover:bg-slate-50 border border-slate-200 hover:border-[#36ECDE] rounded-xl flex flex-col gap-1 transition-all text-[#00203F] cursor-pointer text-xs"
                    >
                      <div className="flex items-center gap-1 text-[#36ECDE]">
                        <Cpu className="h-3.5 w-3.5" />
                        <span className="font-bold text-[10.5px]">🔍 Scan React talent list</span>
                      </div>
                      <span className="text-[9.5px] text-slate-400 leading-normal font-sans font-medium">Verify credentials and calculate high fit index candidates instantly.</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setPastedResumeText(SAMPLE_RESUMES[0].text);
                        setUploadedFileName("Clara_Vance_Staffing_Match.pdf");
                        executePromptStarter("Deep-parse candidate resume text for Clara Vance.");
                      }}
                      className="p-3 bg-white hover:bg-slate-50 border border-slate-200 hover:border-[#36ECDE] rounded-xl flex flex-col gap-1 transition-all text-[#00203F] cursor-pointer text-xs"
                    >
                      <div className="flex items-center gap-1 text-[#36ECDE]">
                        <FileText className="h-3.5 w-3.5" />
                        <span className="font-bold text-[10.5px]">📄 Deep-parse Clara's CV</span>
                      </div>
                      <span className="text-[9.5px] text-slate-400 leading-normal font-sans font-medium">Run structured resume parameter calculations and extract highlighted achievements.</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => executePromptStarter("Write outbound outreach email copy targeting Nolan Vasquez.")}
                      className="p-3 bg-white hover:bg-slate-50 border border-slate-200 hover:border-[#36ECDE] rounded-xl flex flex-col gap-1 transition-all text-[#00203F] cursor-pointer text-xs"
                    >
                      <div className="flex items-center gap-1 text-[#36ECDE]">
                        <Mail className="h-3.5 w-3.5" />
                        <span className="font-bold text-[10.5px]">📧 Outline outrage positioning</span>
                      </div>
                      <span className="text-[9.5px] text-slate-400 leading-normal font-sans font-medium">Draft custom brokerage copy targeting enterprise project managers with highlights.</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        if (showToolbox) {
                          setToolboxTab('voice');
                        } else {
                          setShowToolbox(true);
                          setToolboxTab('voice');
                        }
                        executePromptStarter("Initialize speech voice directives stream.");
                      }}
                      className="p-3 bg-white hover:bg-slate-50 border border-slate-200 hover:border-[#36ECDE] rounded-xl flex flex-col gap-1 transition-all text-[#00203F] cursor-pointer text-xs"
                    >
                      <div className="flex items-center gap-1 text-[#36ECDE]">
                        <Mic className="h-3.5 w-3.5" />
                        <span className="font-bold text-[10.5px]">🎙️ Run verbal directives node</span>
                      </div>
                      <span className="text-[9.5px] text-slate-400 leading-normal font-sans font-medium">Dictate filters and trigger simulated pipelines using voice transcript modules.</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Chat messages stream */}
              {activeMessages.map((m) => (
                <div 
                  key={m.id} 
                  className={`flex gap-3 max-w-[85%] ${
                    m.sender === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'
                  }`}
                >
                  <div className={`h-7 w-7 rounded-lg flex items-center justify-center text-xs shrink-0 select-none ${
                    m.sender === 'user' 
                      ? 'bg-[#00203F] text-[#36ECDE] font-bold border border-[#36ECDE]/30' 
                      : 'bg-white text-slate-700 border border-slate-200 shadow-xs'
                  }`}>
                    {m.sender === 'user' ? <User className="h-3.5 w-3.5" /> : <Bot className="h-3.5 w-3.5 text-[#00203F]" />}
                  </div>

                  <div className="space-y-2">
                    <div className={`rounded-xl p-3.5 text-xs leading-relaxed font-sans ${
                      m.sender === 'user' 
                        ? 'bg-gradient-to-br from-[#00203F] to-[#12314e] text-white rounded-tr-none shadow-xs' 
                        : 'bg-white border border-slate-150 text-slate-850 rounded-tl-none shadow-xs'
                    }`}>
                      <p className="whitespace-pre-wrap font-medium">{m.text}</p>
                      
                      {/* DYNAMIC CARD 1: Rendered Parsed Resume UI block inside chat feed */}
                      {m.parsedData && (
                        <div className="mt-3.5 bg-slate-50/80 border border-slate-200/80 rounded-xl p-3.5 space-y-3 shadow-xs text-[#00203F] text-left">
                          <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
                            <div>
                              <strong className="font-display font-extrabold text-[#00203f] text-xs block">{m.parsedData.name}</strong>
                              <span className="text-[9px] text-slate-400 block mt-0.5">{m.parsedData.role}</span>
                            </div>
                            <span className="font-mono text-[8.5px] text-[#00203f] font-extrabold bg-[#36ECDE]/15 border border-[#36ECDE]/30 px-2 py-0.5 rounded shadow-xs">
                              🎯 {m.parsedData.matchScore} Fit Score
                            </span>
                          </div>

                          <div className="space-y-1">
                            <span className="text-[8.5px] font-bold text-slate-400 font-mono uppercase block">Identified Core Expertise:</span>
                            <div className="flex flex-wrap gap-1">
                              {m.parsedData.keySkills?.map((s: string, idx: number) => (
                                <span key={idx} className="bg-white border border-slate-200 text-[8.5px] px-1.5 py-0.5 rounded font-mono text-slate-700 font-bold">
                                  {s}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div className="space-y-1">
                            <span className="text-[8.5px] font-bold text-slate-400 font-mono uppercase block">AI Extracted Highlights:</span>
                            <ul className="list-disc list-inside space-y-0.5 text-slate-650 text-[10.5px] leading-relaxed font-semibold">
                              {m.parsedData.highlights?.map((h: string, idx: number) => (
                                <li key={idx} className="text-slate-600">{h}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}

                      {/* DYNAMIC CARD 2: Rendered outreach email compose box inside active feed */}
                      {m.emailDraft && (
                        <div className="mt-3 bg-slate-100/80 border border-slate-200/80 rounded-xl p-3 text-left space-y-2.5">
                          <div className="flex items-center justify-between border-b border-slate-200 pb-1.5">
                            <span className="text-[9.5px] font-mono text-slate-405 font-extrabold uppercase">Generated Outbound Copy</span>
                            <button
                              onClick={() => {
                                navigator.clipboard.writeText(m.emailDraft || "");
                                alert("Copy successful! Sourcing Brokerage positioning draft copied securely.");
                              }}
                              className="text-[9px] font-mono font-bold text-[#00203F] hover:text-[#36ECDE] bg-white border border-slate-250 p-1 rounded-md flex items-center gap-1 cursor-pointer"
                            >
                              <Clipboard className="h-3 w-3" />
                              <span>Copy Draft</span>
                            </button>
                          </div>
                          <pre className="text-[9.5px] font-mono text-slate-700 whitespace-pre-wrap max-h-36 overflow-y-auto leading-relaxed bg-white/70 p-2.5 rounded-lg border border-slate-150">
                            {m.emailDraft}
                          </pre>
                        </div>
                      )}

                      <span className="block text-[8px] font-mono mt-2 text-right uppercase tracking-wider opacity-60">
                        {m.time}
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              {/* Simulated typing response wrapper */}
              {isAiTyping && (
                <div className="flex gap-3 max-w-[80%] mr-auto">
                  <div className="h-7 w-7 rounded-lg bg-white border border-slate-200 text-[#00203F] flex items-center justify-center text-xs shrink-0 select-none shadow-xs">
                    <Bot className="h-3.5 w-3.5 text-[#00203F] animate-pulse" />
                  </div>
                  <div className="bg-white border border-slate-150 rounded-xl p-3.5 rounded-tl-none flex items-center gap-1.5 shadow-xs">
                    <span className="w-1.5 h-1.5 bg-[#36ECDE] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 bg-[#36ECDE] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 bg-[#36ECDE] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Conversational Pill bottom input control box */}
            <div className="p-4 bg-white border-t border-slate-105 shrink-0 select-none">
              <form onSubmit={handleChatSubmit} className="flex flex-col gap-2">
                <div className="relative border border-slate-250 bg-[#FAFAFC] focus-within:border-[#00203F] rounded-[24px] pr-20 pl-4 py-2 flex items-center transition-all bg-white shadow-xs">
                  
                  {/* File Upload Attachment Trigger option */}
                  <button
                    type="button"
                    onClick={() => {
                      setShowToolbox(true);
                      setToolboxTab('parser');
                      alert("Opening PDF resume parsing input inside the Sourcing Toolbox. Pick design templates on the right panel!");
                    }}
                    className="p-1.5 text-slate-450 hover:text-[#00203F] hover:bg-slate-100 rounded-full transition-colors cursor-pointer shrink-0 mr-1.5"
                    title="Attach Candidate PDF / CV Resume text"
                  >
                    <Paperclip className="h-4.5 w-4.5" />
                  </button>

                  <input
                    type="text"
                    disabled={isAiTyping}
                    className="w-full text-xs outline-none bg-transparent placeholder:text-slate-400 text-slate-800 py-1 font-medium"
                    placeholder={`Query Oracle or select options preset. (e.g., Clara Vance, react list)...`}
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                  />

                  {/* Absolute positioning of control togglers */}
                  <div className="absolute right-2 flex items-center gap-1">
                    
                    {/* Voice Dictation mic selector */}
                    <button
                      type="button"
                      onClick={handleVoiceToggle}
                      className={`p-1.5 rounded-full border transition-colors cursor-pointer ${
                        isRecording 
                          ? 'bg-red-50 border-red-200 text-red-600' 
                          : 'bg-white hover:bg-slate-50 border-slate-200 text-[#00203F]'
                      }`}
                      title="Run voice dictate instruction"
                    >
                      {isRecording ? <MicOff className="h-3.5 w-3.5 animate-pulse" /> : <Mic className="h-3.5 w-3.5" />}
                    </button>

                    {/* Dispatch command button */}
                    <button
                      type="submit"
                      disabled={isAiTyping || !chatInput.trim()}
                      className="p-2 bg-[#00203f] hover:bg-slate-800 text-[#36ECDE] rounded-full shadow-xs cursor-pointer disabled:opacity-35 transition-all"
                      title="Send instructions"
                    >
                      <Send className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>

                {/* Verification footnote */}
                <div className="flex sm:flex-row flex-col justify-between items-center px-2 text-[9.5px] font-sans font-medium text-slate-405 gap-1 select-none">
                  <span>Model: Oracle-Core-Flash v4 (32k Context Window)</span>
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                    <span>Cleansed data workspace environment.</span>
                  </span>
                </div>
              </form>
            </div>
          </div>

          {/* Column B: Collapsible Sourcing Toolbox Plugin Pane (Spans 5 cols when active) */}
          <AnimatePresence>
            {showToolbox && (
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 'auto', opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="col-span-12 lg:col-span-5 h-full bg-white flex flex-col justify-between border-l border-slate-200"
              >
                {/* Toolbox Tab Selector Header */}
                <div className="flex bg-[#FAFAFC] border-b border-slate-105 p-1 relative">
                  <button
                    onClick={() => setToolboxTab('parser')}
                    className={`flex-1 py-3 text-center text-[10.5px] font-bold cursor-pointer border-b-2 transition-all ${
                      toolboxTab === 'parser' 
                        ? 'border-[#00203F] text-[#00203F] bg-white shadow-xs' 
                        : 'border-transparent text-slate-505 hover:text-slate-800'
                    }`}
                  >
                    Resume Utility
                  </button>
                  <button
                    onClick={() => setToolboxTab('email')}
                    className={`flex-1 py-3 text-center text-[10.5px] font-bold cursor-pointer border-b-2 transition-all ${
                      toolboxTab === 'email' 
                        ? 'border-[#00203F] text-[#00203F] bg-white shadow-xs' 
                        : 'border-transparent text-slate-505 hover:text-slate-800'
                    }`}
                  >
                    Outreach Email
                  </button>
                  <button
                    onClick={() => setToolboxTab('voice')}
                    className={`flex-1 py-3 text-center text-[10.5px] font-bold cursor-pointer border-b-2 transition-all ${
                      toolboxTab === 'voice' 
                        ? 'border-[#00203F] text-[#00203F] bg-white shadow-xs' 
                        : 'border-transparent text-slate-550 hover:text-slate-850'
                    }`}
                  >
                    Vocal Dictation
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowToolbox(false)}
                    className="absolute right-1 top-1 h-5 w-5 bg-slate-100 hover:bg-slate-200 flex items-center justify-center rounded-md cursor-pointer text-slate-600"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>

                {/* Scrollable Tool Workspace */}
                <div className="flex-1 p-4 overflow-y-auto min-h-0 select-none">
                  
                  {/* Tool 1: Resume Parser Panel */}
                  {toolboxTab === 'parser' && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                        <span className="text-[9px] font-mono text-slate-400 font-extrabold uppercase tracking-widest block">Core Sourcing Intelligence Parser</span>
                        <span className="text-[#00203F] text-[8px] font-black font-mono tracking-wider bg-[#36ECDE]/15 px-2 py-0.5 rounded uppercase">Structured Extractor</span>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[9.5px] font-mono font-bold text-slate-400 uppercase tracking-wide block">Raw Resume / CV text payload:</label>
                        <textarea
                          rows={4}
                          className="w-full text-[10.5px] p-2.5 bg-slate-50 border border-slate-200 outline-none rounded-xl text-slate-805 font-sans leading-relaxed text-left focus:border-[#00203F]"
                          placeholder="Paste raw unstructured candidate profile text details here to extract parameters..."
                          value={pastedResumeText}
                          onChange={(e) => setPastedResumeText(e.target.value)}
                        />
                      </div>

                      {/* Simulation Presets */}
                      <div className="bg-slate-50/80 p-2.5 rounded-xl border border-slate-150 space-y-1">
                        <span className="text-[8.5px] font-mono font-bold text-slate-405 block border-b border-slate-200 pb-1">Simulated Sample Files Selection:</span>
                        <div className="grid grid-cols-3 gap-1 px-0.5 pt-1 text-[9px] font-semibold text-slate-600">
                          {SAMPLE_RESUMES.map((r, idx) => (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => handleSampleResumeSelect(r.text)}
                              className={`border p-1.5 rounded text-center truncate cursor-pointer uppercase text-[8.5px] tracking-wide font-black transition-colors ${
                                pastedResumeText === r.text 
                                  ? 'bg-[#00203F] hover:bg-slate-900 text-[#36ECDE] border-[#00203F]' 
                                  : 'bg-white hover:bg-slate-50 border-slate-200 hover:text-[#00203F]'
                              }`}
                            >
                              {r.title.split(' ')[0]}
                            </button>
                          ))}
                        </div>
                      </div>

                      {parseError && (
                        <div className="p-2 bg-red-50 border border-red-200 text-red-650 rounded-lg text-[10px] leading-relaxed">
                          {parseError}
                        </div>
                      )}

                      <button
                        type="button"
                        onClick={handleParseResume}
                        disabled={isParsing}
                        className="w-full py-2.5 bg-[#00203F] hover:bg-slate-800 text-[#36ECDE] border border-[#36ECDE]/30 font-bold rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50 shadow-xs"
                      >
                        {isParsing ? <RefreshCw className="h-4 w-4 animate-spin text-[#36ECDE]" /> : <Cpu className="h-4 w-4 text-[#36ECDE]" />}
                        <span>{isParsing ? "Extracting parameters..." : "Extract Profile schematic"}</span>
                      </button>

                      {/* Parser Output Dashboard layout */}
                      {parsingResults && (
                        <div className="bg-slate-50/80 border border-slate-200 rounded-xl p-3 space-y-2.5 shadow-inner text-left text-xs">
                          <div className="flex items-center justify-between border-b border-slate-200 pb-1.5">
                            <div>
                              <strong className="font-display font-extrabold text-[#00203F] block leading-tight">{parsingResults.name}</strong>
                              <span className="text-[9px] text-slate-450 block mt-0.5">{parsingResults.role}</span>
                            </div>
                            <span className="font-mono text-[9px] text-[#00203f] font-extrabold bg-[#36ECDE]/20 px-2 py-0.5 rounded shadow-xs shrink-0 self-start">
                              🎯 {parsingResults.matchScore} Fit Score
                            </span>
                          </div>

                          <div className="space-y-1">
                            <span className="text-[8.5px] font-bold text-slate-400 font-mono uppercase block">Identified Core Skillsets:</span>
                            <div className="flex flex-wrap gap-1">
                              {parsingResults.keySkills?.map((k: string, idx: number) => (
                                <span key={idx} className="bg-white border border-slate-200 text-[8.5px] px-1.5 py-0.5 rounded font-mono text-slate-705 font-bold">
                                  {k}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div className="space-y-1">
                            <span className="text-[8.5px] font-bold text-slate-400 font-mono uppercase block">Calibration Achievements Highlights:</span>
                            <ul className="list-disc list-inside space-y-0.5 text-slate-650 text-[10.5px] font-sans">
                              {parsingResults.highlights?.map((h: string, idx: number) => (
                                <li key={idx} className="text-slate-550 leading-relaxed">{h}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Tool 2: Outreach Email Composing Utility */}
                  {toolboxTab === 'email' && (
                    <div className="space-y-3.5">
                      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                        <span className="text-[9px] font-mono text-slate-400 font-extrabold uppercase tracking-widest block font-sans">AI Outreach Synthesizer</span>
                        <span className="text-[#00203F] text-[8px] font-bold font-mono bg-emerald-50 text-emerald-700 border border-emerald-150 px-2 py-0.5 rounded uppercase font-sans">Outbound Broker</span>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="space-y-1">
                          <label className="text-slate-400 font-mono text-[9px] font-extrabold block uppercase">Candidate Name</label>
                          <input 
                            type="text" 
                            className="w-full p-2 border border-slate-200 focus:border-[#00203F] rounded-lg outline-none text-[#00203F] font-semibold text-[11px]" 
                            value={emailCandidate}
                            onChange={(e) => setEmailCandidate(e.target.value)}
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-slate-400 font-mono text-[9px] font-extrabold block uppercase">Target Vacancy</label>
                          <input 
                            type="text" 
                            className="w-full p-2 border border-slate-200 focus:border-[#00203F] rounded-lg outline-none text-[#00203F] font-semibold text-[11px]" 
                            value={emailRole}
                            onChange={(e) => setEmailRole(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="space-y-1 text-xs">
                        <label className="text-slate-400 font-mono text-[9px] font-extrabold block uppercase">Broker achievements credentialscontext</label>
                        <textarea 
                          className="w-full p-2 border border-slate-200 focus:border-[#00203F] rounded-lg outline-none text-slate-800 text-[10.5px] leading-relaxed" 
                          rows={2}
                          value={emailContext}
                          onChange={(e) => setEmailContext(e.target.value)}
                        />
                      </div>

                      <button
                        onClick={handleGenerateCustomEmail}
                        disabled={isGeneratingEmail}
                        className="w-full py-2 bg-[#00203f] text-[#36ECDE] text-[10.5px] font-mono font-bold uppercase rounded-lg shadow-inner cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        {isGeneratingEmail ? <RefreshCw className="h-3.5 w-3.5 animate-spin" /> : <Sparkles className="h-3.5 w-3.5 text-amber-400" />}
                        <span>{isGeneratingEmail ? "Synthesizing Copy..." : "Synthesize outreachtemplate"}</span>
                      </button>

                      <div className="relative">
                        <textarea
                          rows={6}
                          className="w-full p-2.5 bg-slate-50 border border-slate-150 rounded-xl text-slate-850 font-mono text-[9.5px] leading-relaxed outline-none focus:border-[#00203F]"
                          value={emailOutput}
                          onChange={(e) => setEmailOutput(e.target.value)}
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setCopiedEmail(true);
                            navigator.clipboard.writeText(emailOutput);
                            setTimeout(() => setCopiedEmail(false), 2000);
                          }}
                          className="absolute right-2 bottom-2 bg-white border border-slate-200 text-slate-655 hover:bg-slate-50 text-[9px] font-bold px-2 py-1.5 rounded-lg flex items-center gap-1 shadow-xs cursor-pointer"
                        >
                          {copiedEmail ? <CheckCircle className="h-3 w-3 text-emerald-500" /> : <Clipboard className="h-3 w-3" />}
                          <span>{copiedEmail ? 'Copied' : 'Copy'}</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Tool 3: Verbal Dictation visualizer */}
                  {toolboxTab === 'voice' && (
                    <div className="space-y-6 text-center py-6">
                      <span className="text-[10px] font-mono text-slate-400 font-black uppercase tracking-widest block">Secure Vocal NLP Transcriber</span>

                      {isRecording ? (
                        <div className="space-y-4">
                          <div className="flex items-center justify-center gap-1.5 h-16">
                            <span className="w-1 h-6 bg-[#36ECDE] rounded animate-bounce" style={{ animationDelay: '0.1s' }} />
                            <span className="w-1 h-10 bg-[#36ECDE] rounded animate-bounce" style={{ animationDelay: '0.3s' }} />
                            <span className="w-1.5 h-12 bg-[#00203F] rounded animate-bounce" style={{ animationDelay: '0s' }} />
                            <span className="w-1 h-8 bg-[#36ECDE] rounded animate-bounce" style={{ animationDelay: '0.4s' }} />
                            <span className="w-1 h-4 bg-[#00203F] rounded animate-bounce" style={{ animationDelay: '0.2s' }} />
                          </div>

                          <div className="space-y-1">
                            <strong className="text-xs text-slate-800 block">Listening actively...</strong>
                            <span className="text-[10px] text-slate-450 font-mono block leading-relaxed px-4 text-slate-500">
                              "Simulating speech detection model. Dictate your staffing rules clearly."
                            </span>
                          </div>

                          <button
                            type="button"
                            onClick={() => setIsRecording(false)}
                            className="p-3.5 rounded-full bg-red-100 hover:bg-red-200 text-red-650 transition-all cursor-pointer inline-block border border-red-200"
                          >
                            <MicOff className="h-5 w-5" />
                          </button>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <div className="h-16 flex items-center justify-center">
                            <Volume2 className="h-8 w-8 text-slate-350 animate-pulse" />
                          </div>

                          <div className="space-y-1">
                            <strong className="text-xs text-slate-850 block">Voice Directives Ready</strong>
                            <span className="text-[10px] text-slate-455 font-mono block leading-relaxed px-4 text-slate-500">
                              Simulate dictation input commands directly. We convert voice parameters into conversational search variables in your thread.
                            </span>
                          </div>

                          <button
                            type="button"
                            onClick={simulateVoiceInstruction}
                            className="p-3.5 rounded-full bg-[#00203F] hover:bg-slate-800 text-[#36ECDE] border border-[#36ECDE]/30 transition-all cursor-pointer inline-block shadow-md"
                          >
                            <Mic className="h-5 w-5" />
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                </div>

                {/* Toolbox Footer help */}
                <div className="p-3 bg-[#FAFAFC] border-t border-slate-105 text-[9.5px] text-slate-405 font-sans font-medium text-center shadow-xs">
                  Sourcing Tools are fully synced with active chat parameters automatically.
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

      </div>

    </div>
  );
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MessageSquare, 
  Search, 
  Send, 
  Sparkles, 
  Bot, 
  User, 
  Paperclip, 
  Mic, 
  CheckCheck, 
  ChevronRight,
  RefreshCw,
  PhoneCall,
  Activity,
  Maximize2,
  FileText,
  BadgeAlert
} from 'lucide-react';

interface ChatThread {
  id: number;
  name: string;
  avatarBg: string;
  lastMessage: string;
  time: string;
  unreadCount: number;
  type: 'Internal' | 'Vendor' | 'AI Assistant';
  transcript: { sender: string; text: string; time: string }[];
}

export default function MessagesHub() {
  const [activeThreadId, setActiveThreadId] = useState<number>(1);
  const [typedMessage, setTypedMessage] = useState('');
  const [showAiSummary, setShowAiSummary] = useState(false);
  const [isSummarizing, setIsSummarizing] = useState(false);

  const [threads, setThreads] = useState<ChatThread[]>([
    { 
      id: 1, 
      name: 'Samantha & James (Internal Staffing)', 
      avatarBg: 'bg-indigo-50 border-indigo-120 text-indigo-700', 
      lastMessage: 'Let us align parameters on HSBC Requirement #4019 tomorrow afternoon at 2 PM EST.', 
      time: '08:44 AM', 
      unreadCount: 2, 
      type: 'Internal',
      transcript: [
        { sender: 'Samantha Chen', text: 'Hey James, did you review Nolan Vasquez\'s parsed resume credentials on the bench Hot-List?', time: '08:30 AM' },
        { sender: 'James Carter', text: 'Yes, looking spotless. CV match score shows 98.2% exact fit on HSBC specs.', time: '08:35 AM' },
        { sender: 'Samantha Chen', text: 'Splendid. I am going to trigger vendor broadcast email. Let us align parameters on HSBC Requirement #4019 tomorrow afternoon at 2 PM EST.', time: '08:44 AM' }
      ]
    },
    { 
      id: 2, 
      name: 'Synapse Sourcing Channel (Vendor)', 
      avatarBg: 'bg-emerald-50 border-emerald-120 text-emerald-700', 
      lastMessage: 'Submitted 4 candidates to AWS DevOps architect vacancy. Please audit immediately.', 
      time: '08:12 AM', 
      unreadCount: 0, 
      type: 'Vendor',
      transcript: [
        { sender: 'Aris Thorne (Synapse)', text: 'Our technical screening committee just finalized assessment metrics for 4 senior candidates.', time: '08:00 AM' },
        { sender: 'Aris Thorne (Synapse)', text: 'Submitted 4 candidates to AWS DevOps architect vacancy. Please audit immediately.', time: '08:12 AM' }
      ]
    },
    { 
      id: 3, 
      name: 'BenMyl Sourcing Oracle (AI Engine)', 
      avatarBg: 'bg-purple-50 border-purple-120 text-purple-700', 
      lastMessage: 'Awaiting your instruction matching Q2 hot-list benchmarks.', 
      time: 'Yesterday', 
      unreadCount: 0, 
      type: 'AI Assistant',
      transcript: [
        { sender: 'Oracle AI', text: 'Daily bench calibration successfully synthesized. 14 new candidates identified.', time: 'Yesterday' }
      ]
    }
  ]);

  const activeThread = threads.find(t => t.id === activeThreadId) || threads[0];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!typedMessage.trim()) return;

    // Add message locally
    const newMessage = {
      sender: 'Me (Workspace Master)',
      text: typedMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setThreads(prev => prev.map(t => {
      if (t.id === activeThreadId) {
        return {
          ...t,
          lastMessage: typedMessage,
          time: 'Just now',
          transcript: [...t.transcript, newMessage]
        };
      }
      return t;
    }));

    setTypedMessage('');
  };

  const handleGenerateSummary = () => {
    setIsSummarizing(true);
    setShowAiSummary(false);

    setTimeout(() => {
      setIsSummarizing(false);
      setShowAiSummary(true);
    }, 1100);
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* Title */}
      <div>
        <h2 className="text-xl font-display font-bold text-slate-900">Workspace Sourcing Communications</h2>
        <p className="text-slate-400 text-xs">Coordinate with recruiters, verify vendor submissions and leverage real-time AI summaries</p>
      </div>

      {/* Main layout split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Left Column chat threads list (Col: 4) */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200/60 shadow-sm p-4 space-y-4 h-[500px] flex flex-col overflow-y-auto">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-xs outline-none focus:border-indigo-500 bg-slate-50 placeholder:text-slate-400"
              placeholder="Search chat channel..."
            />
          </div>

          <div className="space-y-2 flex-1 overflow-y-auto">
            {threads.map((t) => (
              <div 
                key={t.id} 
                onClick={() => setActiveThreadId(t.id)}
                className={`p-3 rounded-xl border transition-all cursor-pointer space-y-1.5 ${
                  t.id === activeThreadId 
                    ? 'border-indigo-550 bg-indigo-50/20 shadow-xs' 
                    : 'border-slate-100 hover:bg-slate-50/70'
                }`}
              >
                <div className="flex justify-between items-start gap-1">
                  <div className="flex items-center gap-2">
                    <div className={`h-7 w-7 rounded-full flex items-center justify-center font-display font-semibold text-[10px] shrink-0 border ${t.avatarBg}`}>
                      {t.name.split(' ').map(n=>n[0]).slice(0,2).join('')}
                    </div>
                    <div>
                      <strong className="text-[11.5px] font-bold text-slate-900 leading-tight block">{t.name}</strong>
                      <span className="text-[8.5px] font-mono text-slate-400 tracking-wider font-bold block mt-0.5 uppercase">
                        {t.type}
                      </span>
                    </div>
                  </div>

                  <span className="text-[9px] text-slate-400 font-mono font-light whitespace-nowrap">{t.time}</span>
                </div>

                <p className="text-[10px] text-slate-450 leading-snug line-clamp-1 pr-1 font-sans">
                  {t.lastMessage}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column active thread viewport (Col: 8) */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200/60 shadow-sm flex flex-col justify-between h-[500px]">
          
          {/* Thread Header */}
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <div>
              <strong className="font-display font-bold text-xs text-slate-900">{activeThread.name}</strong>
              <div className="flex items-center gap-1.5 mt-0.5 font-mono text-[9px] text-slate-400">
                <span>Active Channel Feed</span>
                <span className="w-1 h-1 rounded-full bg-slate-200" />
                <span className="text-indigo-600 font-bold uppercase">{activeThread.type} SECURE CHANNEL</span>
              </div>
            </div>

            <div className="flex gap-2">
              <button 
                onClick={handleGenerateSummary}
                className="px-2.5 py-1 text-[10px] font-mono font-bold uppercase rounded bg-slate-50 hover:bg-indigo-50 hover:text-indigo-750 transition-all border border-slate-150 flex items-center gap-1 cursor-pointer"
              >
                <Sparkles className="h-3 w-3 text-indigo-500 animate-spin" style={{ animationDuration: '4s' }} />
                <span>AI Summarize Thread</span>
              </button>
            </div>
          </div>

          {/* Active messages list viewport */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            {activeThread.transcript.map((chat, idx) => (
              <div 
                key={idx} 
                className={`flex flex-col gap-1 max-w-[80%] ${
                  chat.sender.includes('Me') ? 'ml-auto items-end' : 'mr-auto'
                }`}
              >
                <span className="text-[9px] font-mono text-slate-405 font-bold tracking-wider uppercase">
                  {chat.sender}
                </span>

                <div className={`p-3 rounded-xl text-xs font-sans leading-relaxed ${
                  chat.sender.includes('Me')
                    ? 'bg-indigo-600 text-white rounded-tr-none shadow-xs'
                    : 'bg-slate-50 border border-slate-110 text-slate-850 rounded-tl-none'
                }`}>
                  <p>{chat.text}</p>
                  <span className="block text-[8px] font-mono text-right mt-1 opacity-70 whitespace-nowrap uppercase">
                    {chat.time}
                  </span>
                </div>
              </div>
            ))}

            {/* Simulated Live summary overlay box */}
            <AnimatePresence>
              {isSummarizing && (
                <div className="p-4 bg-indigo-50/40 border border-indigo-100 rounded-xl flex items-center justify-center gap-2.5 text-xs text-indigo-850">
                  <RefreshCw className="h-4 w-4 text-indigo-500 animate-spin" />
                  <span className="font-mono">Generating NLP Conversation summary dossier...</span>
                </div>
              )}

              {!isSummarizing && showAiSummary && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="p-4 bg-indigo-50 border border-indigo-120 rounded-xl space-y-2"
                >
                  <div className="flex items-center justify-between text-[9.5px] font-mono font-bold text-indigo-850 uppercase tracking-wider">
                    <span className="flex items-center gap-1">
                      <Sparkles className="h-3.5 w-3.5" />
                      <span>Sourcing Summarizer Insights</span>
                    </span>
                    <span>NLP Summary</span>
                  </div>
                  <p className="text-xs text-slate-850 leading-relaxed font-sans font-light">
                    <strong>Conversation Focus:</strong> Aligning parameters & candidate suitability checks regarding Nolan Vasquez.
                    <br />
                    <strong>Deliverable Agenda:</strong> Team alignment meeting scheduled securely regarding Requirement #4019 on <strong>May 22, 2026 at 2:00 PM EST.</strong>
                    <br />
                    <strong>Next Action Step:</strong> Sourcing broadcaster has parsed the bench indices to provide prime coverage.
                  </p>
                  <div className="flex justify-end gap-1.5 pt-1 border-t border-indigo-100/50">
                    <button 
                      onClick={() => setShowAiSummary(false)}
                      className="text-[9.5px] font-mono text-slate-400 hover:text-slate-650 uppercase"
                    >
                      Dismiss Summary
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Form input messaging */}
          <form onSubmit={handleSendMessage} className="p-4 border-t border-slate-100 flex items-center gap-2">
            <input
              type="text"
              className="flex-1 p-2.5 border border-slate-200 rounded-lg text-xs outline-none focus:border-indigo-500 bg-slate-50 text-slate-850 placeholder:text-slate-450"
              placeholder="Send message securely to channel..."
              value={typedMessage}
              onChange={(e) => setTypedMessage(e.target.value)}
            />
            <button
              type="submit"
              className="p-2.5 bg-indigo-600 hover:bg-slate-900 text-white rounded-lg cursor-pointer flex items-center justify-center"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>

        </div>

      </div>

    </div>
  );
}
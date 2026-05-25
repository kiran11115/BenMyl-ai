import React, { useState } from 'react';
import { 
  Sparkles, 
  Activity, 
  Plus, 
  X, 
  CheckCircle2, 
  TrendingUp, 
  FileText, 
  Clock, 
  Cpu, 
  Pin 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface RightPanelProps {
  onTriggerQuickAction: (tabId: string) => void;
  onSendChatMessage: (text: string) => void;
  workspaceNotes: string[];
  setWorkspaceNotes: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function WorkspaceRightPanel({
  onTriggerQuickAction,
  onSendChatMessage,
  workspaceNotes,
  setWorkspaceNotes
}: RightPanelProps) {
  const [activeTab, setActiveTab] = useState<'copilot' | 'activity'>('copilot');
  const [newNote, setNewNote] = useState('');

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim()) return;
    setWorkspaceNotes(prev => [newNote.trim(), ...prev]);
    setNewNote('');
  };

  const handleDeleteNote = (idxToDelete: number) => {
    setWorkspaceNotes(prev => prev.filter((_, idx) => idx !== idxToDelete));
  };

  const activities = [
    { title: 'AI-Match Complete', desc: 'Nolan Vasquez paired with HSBC #4019 (98.2%)', time: '2m ago', type: 'match' },
    { title: 'CSV Upload', desc: 'Aris Thorne uploaded 4 senior hotbench profiles', time: '14m ago', type: 'upload' },
    { title: 'Routine Trigger', desc: 'Self-governing rate compliance routine completed', time: '1h ago', type: 'routine' },
    { title: 'Client Account Linked', desc: 'Amazon Web Engineering linked Exclusive gold SLA', time: '2h ago', type: 'link' }
  ];

  return (
    <aside className="w-80 border-l border-slate-200 bg-white flex flex-col h-full overflow-hidden select-none">
      {/* Dynamic Tab Selector header */}
      <div className="flex border-b border-slate-100 shrink-0">
        <button
          type="button"
          onClick={() => setActiveTab('copilot')}
          className={`flex-1 py-3 text-[11px] font-mono tracking-wider uppercase font-bold flex items-center justify-center gap-1.5 transition-all text-center border-b-2 cursor-pointer ${
            activeTab === 'copilot' 
              ? 'text-[#5B5BD6] border-[#5B5BD6] bg-[#5B5BD6]/5' 
              : 'text-slate-400 border-transparent hover:text-slate-700 hover:bg-slate-50'
          }`}
        >
          <Sparkles className="h-3.5 w-3.5" />
          <span>AI Copilot</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('activity')}
          className={`flex-1 py-3 text-[11px] font-mono tracking-wider uppercase font-bold flex items-center justify-center gap-1.5 transition-all text-center border-b-2 cursor-pointer ${
            activeTab === 'activity' 
              ? 'text-[#5B5BD6] border-[#5B5BD6] bg-[#5B5BD6]/5' 
              : 'text-slate-400 border-transparent hover:text-slate-700 hover:bg-slate-50'
          }`}
        >
          <Activity className="h-3.5 w-3.5" />
          <span>Notes & Logs</span>
        </button>
      </div>

      {/* Main content body inside Panel */}
      <div className="flex-1 overflow-y-auto p-4 space-y-5 no-scrollbar">
        <AnimatePresence mode="wait">
          {activeTab === 'copilot' ? (
            <motion.div
              key="copilot"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4 text-left"
            >
              {/* Dynamic status indicators */}
              <div className="p-3 bg-[#EEF2F8] border border-slate-200/80 rounded-2xl space-y-2">
                <span className="text-[7.5px] font-mono tracking-widest text-[#5B5BD6] uppercase font-bold block">
                  Autopilot Operational
                </span>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-800 font-sans">Match Accuracy</span>
                  <span className="text-xs font-mono font-bold text-[#4F8CFF]">94.2% Success</span>
                </div>
                <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-[#4F8CFF] h-full animate-pulse-subtle" style={{ width: '94.2%' }} />
                </div>
              </div>

              {/* Bullet Quick Dispatch Actions */}
              <div className="space-y-2.5">
                <strong className="text-[9.5px] uppercase font-mono tracking-wider text-slate-400 font-bold block">
                  Copilot Hotkey Triggers
                </strong>
                
                <div className="space-y-2">
                  <button
                    onClick={() => {
                      onTriggerQuickAction('review-resume');
                      onSendChatMessage('🤖 Suitability Fit');
                    }}
                    className="w-full p-2.5 rounded-xl border border-slate-200 hover:border-[#5B5BD6] bg-white text-left transition-all hover:bg-slate-50/60 flex items-center gap-2 text-xs text-[#1F2937]"
                  >
                    <div className="h-7 w-7 rounded-lg bg-[#4F8CFF]/15 text-[#4F8CFF] flex items-center justify-center shrink-0">
                      <Cpu className="h-3.5 w-3.5" />
                    </div>
                    <div>
                      <strong className="block text-[11px] font-semibold text-slate-800">Suitability Fit Audit</strong>
                      <span className="text-[9px] text-slate-400 block line-clamp-1">Process Nolan V. credentials</span>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      onTriggerQuickAction('reports');
                      onSendChatMessage('📊 Generate report');
                    }}
                    className="w-full p-2.5 rounded-xl border border-slate-200 hover:border-[#5B5BD6] bg-white text-left transition-all hover:bg-slate-50/60 flex items-center gap-2 text-xs text-[#1F2937]"
                  >
                    <div className="h-7 w-7 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">
                      <FileText className="h-3.5 w-3.5" />
                    </div>
                    <div>
                      <strong className="block text-[11px] font-semibold text-slate-800">Synthesize Match Report</strong>
                      <span className="text-[9px] text-slate-400 block line-clamp-1">Extract full bench stats index</span>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      onSendChatMessage('📅 Dispatch calendar align');
                    }}
                    className="w-full p-2.5 rounded-xl border border-slate-200 hover:border-[#5B5BD6] bg-white text-left transition-all hover:bg-slate-50/60 flex items-center gap-2 text-xs text-[#1F2937]"
                  >
                    <div className="h-7 w-7 rounded-lg bg-indigo-500/10 text-[#5B5BD6] flex items-center justify-center shrink-0">
                      <Clock className="h-3.5 w-3.5" />
                    </div>
                    <div>
                      <strong className="block text-[11px] font-semibold text-slate-800">Schedule HSBC Alignment</strong>
                      <span className="text-[9px] text-slate-400 block line-clamp-1">Draft follow-up invite tomorrow</span>
                    </div>
                  </button>
                </div>
              </div>

              {/* Recommendation highlights banner */}
              <div className="p-3.5 rounded-2xl bg-gradient-to-br from-[#5B5BD6] to-[#7B61FF] text-white space-y-2 relative overflow-hidden shadow-xs">
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full blur-xl pointer-events-none" />
                <strong className="text-[8.5px] font-mono uppercase tracking-widest text-[#EEF2F8] block font-bold">
                  Match Recommendation
                </strong>
                <p className="text-[11px] leading-relaxed text-slate-50 font-sans">
                  Nolan Vasquez registers <strong>98.2% compatibility</strong> index for HSBC Senior React Core role. Recommended actions: dispatch to client vetting.
                </p>
                <div className="flex gap-2 pt-1">
                  <button 
                    onClick={() => onTriggerQuickAction('review-resume')}
                    className="px-2.5 py-1.5 bg-white text-[#5B5BD6] rounded-lg text-[9px] font-mono tracking-wider font-extrabold cursor-pointer uppercase hover:scale-[1.02] transition-transform"
                  >
                    Vetting Desk
                  </button>
                  <button 
                    onClick={() => onTriggerQuickAction('view-jobs')}
                    className="px-2.5 py-1.5 bg-white/15 text-white rounded-lg text-[9px] font-mono tracking-wider font-semibold cursor-pointer uppercase hover:scale-[1.02] transition-transform"
                  >
                    Explore Jobs
                  </button>
                </div>
              </div>

            </motion.div>
          ) : (
            <motion.div
              key="activity"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4 text-left"
            >
              {/* Timeline panel list */}
              <div className="space-y-2.5">
                <strong className="text-[9.5px] uppercase font-mono tracking-wider text-slate-450 font-bold block">
                  Colleague Activity Stream
                </strong>
                <div className="space-y-2 max-h-[160px] overflow-y-auto no-scrollbar border border-slate-100 p-2.5 rounded-xl bg-slate-50/50">
                  {activities.map((act, actIdx) => (
                    <div key={actIdx} className="flex gap-2 text-xs border-b border-slate-50 pb-2 last:border-0 last:pb-0">
                      <div className="h-1.5 w-1.5 rounded-full bg-[#5B5BD6] mt-1.5 shrink-0 animate-pulse" />
                      <div>
                        <strong className="text-[10.5px] block font-semibold text-[#1F2937]">{act.title}</strong>
                        <span className="text-[9.5px] text-[#6B7280] block leading-tight">{act.desc}</span>
                        <span className="text-[8px] font-mono text-slate-400 mt-0.5 block">{act.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Editable Sticky note notepad widget container */}
              <div className="space-y-3">
                <strong className="text-[9.5px] uppercase font-mono tracking-wider text-slate-400 font-bold block">
                  Interactive Notepad
                </strong>

                {/* Notepad addition form */}
                <form onSubmit={handleAddNote} className="flex gap-1.5">
                  <input
                    type="text"
                    placeholder="Write a quick sticky memo..."
                    className="flex-1 px-2.5 py-1.5 border border-slate-200 focus:border-[#5B5BD6] rounded-xl text-[10.5px] outline-none placeholder:text-slate-400 text-slate-800"
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="px-2.5 py-1.5 bg-[#5B5BD6] text-white hover:bg-slate-800 rounded-xl flex items-center justify-center cursor-pointer transition-colors shrink-0"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </form>

                {/* Sticky notes list block */}
                <div className="space-y-2">
                  {workspaceNotes.length === 0 ? (
                    <p className="text-[9.5px] text-slate-400 py-3 text-center">No active notepad memos.</p>
                  ) : (
                    workspaceNotes.map((note, noteIdx) => (
                      <div 
                        key={noteIdx} 
                        className="p-2.5 rounded-xl bg-[#EEF2F8] border border-slate-200 text-[10.5px] text-slate-700 leading-normal flex justify-between items-start group/note relative"
                      >
                        <div className="flex-1 pr-4 text-left">
                          <p className="font-sans font-medium">{note}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleDeleteNote(noteIdx)}
                          className="text-slate-400 hover:text-rose-500 opacity-60 hover:opacity-100 transition-opacity absolute right-1.5 top-1.5"
                          title="Delete note"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>

            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mini indicator tracker */}
      <div className="p-3 text-center border-t border-slate-100 bg-slate-50/50 text-[9px] font-mono text-slate-405">
        <span>Session broker secure pipeline</span>
      </div>
    </aside>
  );
}

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calendar as CalendarIcon, 
  Video, 
  Clock, 
  Users, 
  Building, 
  Plus, 
  Search, 
  ChevronRight, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  Send, 
  MessageSquare, 
  Award, 
  Trash, 
  Star,
  Compass, 
  Check,
  ChevronLeft,
  CalendarDays,
  UserCheck,
  ListTodo,
  ExternalLink,
  MapPin,
  FileCheck2
} from 'lucide-react';

interface CandidateInterview {
  id: string;
  name: string;
  role: string;
  currentRound: 'Screening' | 'Technical' | 'Coding' | 'Management' | 'HR';
  time: string;
  date: string;
  timeZone: 'EST' | 'PST' | 'IST' | 'GMT';
  panel: string[];
  meetingPlatform: 'Microsoft Teams' | 'Zoom' | 'Google Meet';
  meetingLink: string;
  candidateAvailability: string[];
  status: 'Scheduled' | 'Confirmed' | 'Completed' | 'Cancelled';
  feedback?: {
    technicalRating: number;
    communicationRating: number;
    teamFitRating: number;
    comments: string;
    decision: 'Advance' | 'Reject' | 'Hold';
  };
}

export default function InterviewsScreen() {
  const [interviews, setInterviews] = useState<CandidateInterview[]>([
    {
      id: 'INT-401',
      name: 'Nolan Vasquez',
      role: 'Staff React Engineer',
      currentRound: 'Coding',
      time: '11:00 AM',
      date: '2026-05-24',
      timeZone: 'EST',
      panel: ['Sarah Sterling', 'Danielle Cooper'],
      meetingPlatform: 'Microsoft Teams',
      meetingLink: 'https://teams.microsoft.com/l/meetup-join/benmyl-interview-staff-react',
      candidateAvailability: ['May 24, 11 AM - 1 PM EST', 'May 25, 2 PM - 4 PM EST'],
      status: 'Confirmed'
    },
    {
      id: 'INT-402',
      name: 'Clara Jenkins',
      role: 'Senior DevOps Architect',
      currentRound: 'Technical',
      time: '02:00 PM',
      date: '2026-05-24',
      timeZone: 'PST',
      panel: ['Sarah Sterling', 'Marcus Vance'],
      meetingPlatform: 'Google Meet',
      meetingLink: 'https://meet.google.com/benmyl-devops-round-two',
      candidateAvailability: ['May 24, 1 PM - 4 PM PST', 'May 26, 11 AM - 12 PM PST'],
      status: 'Scheduled'
    },
    {
      id: 'INT-403',
      name: 'Elena Rostova',
      role: 'Principal Java Architect',
      currentRound: 'Management',
      time: '09:00 AM',
      date: '2026-05-25',
      timeZone: 'GMT',
      panel: ['Samantha Chen', 'Aaliyah Reed'],
      meetingPlatform: 'Zoom',
      meetingLink: 'https://zoom.us/j/9082314546',
      candidateAvailability: ['May 25, 9 AM - 11 AM GMT'],
      status: 'Confirmed'
    },
    {
      id: 'INT-404',
      name: 'Aiden Vance',
      role: 'Machine Learning Lead',
      currentRound: 'Screening',
      time: '10:00 AM',
      date: '2026-05-22',
      timeZone: 'EST',
      panel: ['Samantha Chen'],
      meetingPlatform: 'Microsoft Teams',
      meetingLink: 'https://teams.microsoft.com/l/meetup-join/benmyl-screening-aiden-ml',
      candidateAvailability: ['May 22, 10 AM EST'],
      status: 'Completed',
      feedback: {
        technicalRating: 5,
        communicationRating: 4.5,
        teamFitRating: 4.8,
        comments: 'Strong foundational math and deep-learning expertise. Built beautiful models for financial fraud detection. Strongly recommend advancing to Technical Evaluation stage.',
        decision: 'Advance'
      }
    }
  ]);

  const [activeInterviewId, setActiveInterviewId] = useState<string>('INT-401');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRoundFilter, setSelectedRoundFilter] = useState<string>('All');
  
  // Create / Schedule Interview State
  const [isScheduling, setIsScheduling] = useState(false);
  const [newCandName, setNewCandName] = useState('');
  const [newCandRole, setNewCandRole] = useState('Staff React Engineer');
  const [newRound, setNewRound] = useState<'Screening' | 'Technical' | 'Coding' | 'Management' | 'HR'>('Technical');
  const [newDate, setNewDate] = useState('2026-05-25');
  const [newTime, setNewTime] = useState('11:00 AM');
  const [newTimeZone, setNewTimeZone] = useState<'EST' | 'PST' | 'IST' | 'GMT'>('EST');
  const [newPanel, setNewPanel] = useState('Sarah Sterling');
  const [newPlatform, setNewPlatform] = useState<'Microsoft Teams' | 'Zoom' | 'Google Meet'>('Microsoft Teams');

  // Interactive Calendar State
  const [currentCalendarDay, setCurrentCalendarDay] = useState<number>(24);

  // Collaboration Comments State
  const [collaborationComments, setCollaborationComments] = useState<{ [key: string]: { id: number; author: string; text: string; time: string }[] }>({
    'INT-401': [
      { id: 1, author: 'Sarah Sterling', text: 'I completed Nolan’s resume clearance review. The candidate had excellent frontend architectural responses is ready for the coding phase.', time: '09:12 AM' },
      { id: 2, author: 'Admin Dispatcher', text: 'Teams online coordinate linkage initialized successfully.', time: '09:15 AM' }
    ]
  });
  const [liveCommentText, setLiveCommentText] = useState('');

  // Sourcing Feedback Form State
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [scoreTechnical, setScoreTechnical] = useState(4);
  const [scoreCommunication, setScoreCommunication] = useState(4);
  const [scoreTeamFit, setScoreTeamFit] = useState(4);
  const [textFeedback, setTextFeedback] = useState('');
  const [decisionFeedback, setDecisionFeedback] = useState<'Advance' | 'Reject' | 'Hold'>('Advance');

  // AI Copilot Availability Assistant State
  const [copilotFeedbackDraft, setCopilotFeedbackDraft] = useState<string>('');
  const [isAiLoading, setIsAiLoading] = useState(false);

  const activeInterview = interviews.find(i => i.id === activeInterviewId) || interviews[0];

  const handleCreateInterview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCandName.trim()) return;

    const newInt: CandidateInterview = {
      id: `INT-${Math.floor(405 + Math.random() * 500)}`,
      name: newCandName,
      role: newCandRole,
      currentRound: newRound,
      time: newTime,
      date: newDate,
      timeZone: newTimeZone,
      panel: newPanel.split(',').map(s => s.trim()),
      meetingPlatform: newPlatform,
      meetingLink: `https://meet.benmyl.com/${newCandName.toLowerCase().replace(/ /g, '-')}-${newRound.toLowerCase()}`,
      candidateAvailability: [`${newDate}, ${newTime} ${newTimeZone}`],
      status: 'Scheduled'
    };

    setInterviews(prev => [...prev, newInt]);
    setActiveInterviewId(newInt.id);
    setIsScheduling(false);
    // Reset Form Input
    setNewCandName('');
  };

  const handlePostComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!liveCommentText.trim()) return;

    const newComment = {
      id: Date.now(),
      author: 'You (Lead Recruiter)',
      text: liveCommentText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setCollaborationComments(prev => ({
      ...prev,
      [activeInterview.id]: [...(prev[activeInterview.id] || []), newComment]
    }));
    setLiveCommentText('');
  };

  const handleSubmitFeedback = () => {
    setInterviews(prev => prev.map(item => {
      if (item.id === activeInterview.id) {
        return {
          ...item,
          status: 'Completed',
          feedback: {
            technicalRating: scoreTechnical,
            communicationRating: scoreCommunication,
            teamFitRating: scoreTeamFit,
            comments: textFeedback || 'No specified commentary entered.',
            decision: decisionFeedback
          }
        };
      }
      return item;
    }));
    setShowFeedbackModal(false);
    setTextFeedback('');
  };

  const handleTriggerAiAssistant = () => {
    setIsAiLoading(true);
    setCopilotFeedbackDraft('');
    setTimeout(() => {
      setIsAiLoading(false);
      setCopilotFeedbackDraft(
        `Dear ${activeInterview.name},\n\nWe are excited to proceed to your **${activeInterview.currentRound} Round** on the BenMyl Hiring OS!\n\n📅 **Date:** ${activeInterview.date}\n⏰ **Time:** ${activeInterview.time} ${activeInterview.timeZone}\n💻 **Portal:** Join securely via ${activeInterview.meetingPlatform} at ${activeInterview.meetingLink}\n\nOur team is looking forward to connecting with you!\n\nBest regards,\nBenMyl Recruiting Team`
      );
    }, 1200);
  };

  const handleStatusChange = (status: 'Scheduled' | 'Confirmed' | 'Completed' | 'Cancelled') => {
    setInterviews(prev => prev.map(item => {
      if (item.id === activeInterview.id) {
        return { ...item, status };
      }
      return item;
    }));
  };

  const filteredInterviews = interviews.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.currentRound.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRound = selectedRoundFilter === 'All' || item.currentRound === selectedRoundFilter;
    return matchesSearch && matchesRound;
  });

  return (
    <div className="flex flex-col h-full bg-[#F5F7FB] select-text">
      
      {/* HEADER CONTROLS BAR */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4 shrink-0">
        <div>
          <div className="flex items-center gap-1 text-xs text-[#6264A7] font-semibold">
            <CalendarIcon className="h-3.5 w-3.5" />
            <span>Microsoft Teams Calendar Coordination Desk</span>
          </div>
          <h2 className="text-2xl font-display font-bold text-slate-950 tracking-tight mt-0.5">
            Interviews Coordinator
          </h2>
          <p className="text-slate-500 text-xs">
            Manage scheduling queues, track multi-round panel ratings, and sync live meeting linkage with recruiter-grade AI assist modules.
          </p>
        </div>

        <button
          onClick={() => setIsScheduling(true)}
          className="bg-[#6264A7] hover:bg-[#505290] text-white py-2 px-4 rounded-xl text-xs font-bold shrink-0 transition-colors cursor-pointer flex items-center gap-1.5 shadow-sm"
        >
          <Plus className="h-4 w-4" />
          <span>Schedule Sourcing Coordination</span>
        </button>
      </div>

      {/* CORE GRID DESK */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-5 overflow-hidden">
        
        {/* LEFT COLUMN: INTERVIEW list + CALENDAR GRID */}
        <div className="lg:col-span-4 flex flex-col gap-4 overflow-y-auto pr-1">
          
          {/* SEARCH & FILTERS PANEL */}
          <div className="bg-white p-3 rounded-2xl border border-slate-200/60 shadow-xs space-y-2.5 shrink-0">
            <div className="relative">
              <Search className="h-4 w-4 absolute left-3 top-2.5 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search candidates/roles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 pl-9 pr-3 py-2 rounded-xl text-xs outline-none focus:bg-white text-slate-850"
              />
            </div>
            
            <div className="flex flex-wrap gap-1">
              {['All', 'Screening', 'Technical', 'Coding', 'Management', 'HR'].map((round) => (
                <button
                  key={round}
                  onClick={() => setSelectedRoundFilter(round)}
                  className={`px-2.5 py-1 text-[10px] rounded-lg border transition-colors font-semibold cursor-pointer ${
                    selectedRoundFilter === round 
                      ? 'bg-[#6264A7] text-white border-transparent'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-500 border-slate-200'
                  }`}
                >
                  {round}
                </button>
              ))}
            </div>
          </div>

          {/* DYNAMIC MINICARDS - WEEK TIMELINE CALENDAR FEED */}
          <div className="bg-white p-3.5 rounded-2xl border border-slate-200/60 shadow-xs space-y-3 shrink-0">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
                <CalendarDays className="h-3.5 w-3.5 text-[#6264A7]" />
                <span>Weekly Coordination Schedule</span>
              </span>
              <span className="text-[10.5px] font-bold text-slate-700">May 2026</span>
            </div>

            {/* Daily Grid Numbers strip */}
            <div className="grid grid-cols-7 gap-1 text-center font-sans">
              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, dIdx) => (
                <span key={dIdx} className="text-[9px] text-slate-400 font-mono uppercase font-bold">{day}</span>
              ))}
              {[20, 21, 22, 23, 24, 25, 26].map((dayNum) => {
                const isSelected = currentCalendarDay === dayNum;
                const hasInterview = interviews.some(i => i.date === `2026-05-${dayNum}`);
                return (
                  <button
                    key={dayNum}
                    type="button"
                    onClick={() => {
                      setCurrentCalendarDay(dayNum);
                      const matching = interviews.find(i => i.date === `2026-05-${dayNum}`);
                      if (matching) {
                        setActiveInterviewId(matching.id);
                      }
                    }}
                    className={`p-2 font-display font-bold text-xs rounded-lg transition-all cursor-pointer relative ${
                      isSelected 
                        ? 'bg-[#6264A7] text-white font-extrabold shadow-xs' 
                        : 'bg-slate-50 text-slate-650 hover:bg-slate-100'
                    }`}
                  >
                    <span>{dayNum}</span>
                    {hasInterview && (
                      <span className={`absolute bottom-1 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full ${isSelected ? 'bg-white' : 'bg-[#6264A7]'}`} />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* ACTIVE CANDIDATES QUEUE - CLICKUP LABELED STATUS CARDS */}
          <div className="space-y-2.5">
            <span className="text-[9px] font-mono leading-none font-bold text-slate-400 tracking-wider uppercase block">
              Active Sourcing Pipelines ({filteredInterviews.length})
            </span>

            {filteredInterviews.length === 0 ? (
              <div className="bg-white/50 border border-slate-200 rounded-2xl p-6 text-center">
                <p className="text-[11px] text-slate-400">No matching coordination events detected.</p>
              </div>
            ) : (
              filteredInterviews.map((item) => {
                const isActive = item.id === activeInterview.id;
                const progressColor = 
                  item.currentRound === 'Screening' ? 'bg-slate-500 text-slate-700' :
                  item.currentRound === 'Technical' ? 'bg-blue-500 text-blue-700' :
                  item.currentRound === 'Coding' ? 'bg-purple-500 text-purple-700' :
                  item.currentRound === 'Management' ? 'bg-amber-500 text-amber-700' : 'bg-emerald-500 text-emerald-700';

                const statusBg = 
                  item.status === 'Completed' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                  item.status === 'Cancelled' ? 'bg-rose-50 text-rose-600 border-rose-100' :
                  item.status === 'Confirmed' ? 'bg-blue-50 text-blue-750 border-blue-100' :
                  'bg-orange-50 text-orange-700 border-orange-100';

                return (
                  <div
                    key={item.id}
                    onClick={() => setActiveInterviewId(item.id)}
                    className={`bg-white p-4 rounded-2xl border transition-all cursor-pointer select-none space-y-3 shadow-2xs hover:shadow-sm ${
                      isActive 
                        ? 'border-[#6264A7] ring-1 ring-[#6264A7]/30 scale-[1.002]'
                        : 'border-slate-200/60 hover:border-slate-350'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-mono font-bold text-[#6264A7]">{item.id}</span>
                        <span className={`w-1.5 h-1.5 rounded-full ${progressColor}`} />
                        <span className="text-[10.5px] font-bold text-slate-800">{item.currentRound} Round</span>
                      </div>
                      <span className={`px-2 py-0.5 border text-[9.5px] font-mono font-bold uppercase rounded-md ${statusBg}`}>
                        {item.status}
                      </span>
                    </div>

                    <div className="space-y-0.5 text-left">
                      <h4 className="font-display font-extrabold text-xs text-slate-900 truncate">{item.name}</h4>
                      <p className="text-[10.5px] text-slate-500 truncate leading-none">{item.role}</p>
                    </div>

                    <div className="flex items-center justify-between text-[10px] text-slate-400 font-medium">
                      <div className="flex items-center gap-1 font-mono">
                        <Clock className="h-3 w-3 shrink-0" />
                        <span>{item.date} @ {item.time} {item.timeZone}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-3 w-3 text-slate-350" />
                        <span className="font-semibold block max-w-[60px] truncate">{item.panel[0]}</span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}

          </div>

        </div>

        {/* CENTER VIEW: MICROSOFT TEAMS STYLE COLLABORATOR / INTERVIEW DETAIL DESK */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200/60 shadow-xs overflow-y-auto p-5 flex flex-col justify-between">
          <div className="space-y-5">
            {/* Standard teams style banner */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="h-8.5 w-8.5 rounded-lg bg-[#6264A7]/10 text-[#6264A7] flex items-center justify-center font-display font-medium text-xs">
                  {activeInterview.name.toUpperCase().slice(0, 2)}
                </div>
                <div className="text-left text-xs leading-none">
                  <strong className="block text-slate-900 font-extrabold text-sm">{activeInterview.name}</strong>
                  <span className="text-[10px] text-slate-400 mt-1 block font-mono">{activeInterview.role}</span>
                </div>
              </div>

              {/* Action dropdown for active status switching */}
              <div className="flex items-center gap-1.5">
                <span className="text-[9.5px] font-mono text-slate-400 font-bold uppercase">Status:</span>
                <select 
                  value={activeInterview.status}
                  onChange={(e) => handleStatusChange(e.target.value as any)}
                  className="bg-slate-50 border border-slate-200 text-[10px] font-bold rounded-lg p-1.5 focus:border-[#6264A7] text-slate-755 outline-none"
                >
                  <option value="Scheduled">Scheduled</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            {/* CALENDAR METRICS BOX */}
            <div className="bg-[#6264A7]/5 border border-[#6264A7]/10 p-3.5 rounded-xl space-y-3 text-left">
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-mono font-bold text-[#6264A7] uppercase tracking-widest block">Timing Parameters</span>
                <span className="bg-white text-[#6264A7] border border-[#6264A7]/20 rounded-md font-mono text-[9px] font-bold uppercase px-2 py-0.5">
                  Multi-Timezone Sync
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-[8.5px] text-slate-400 font-mono tracking-wider block uppercase">Coordinated Date</span>
                  <strong className="text-slate-800 font-bold flex items-center gap-1 mt-0.5">
                    <CalendarIcon className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                    <span>{activeInterview.date}</span>
                  </strong>
                </div>
                <div>
                  <span className="text-[8.5px] text-slate-400 font-mono tracking-wider block uppercase">Time Zone Slot</span>
                  <strong className="text-slate-800 font-bold flex items-center gap-1 mt-0.5">
                    <Clock className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                    <span>{activeInterview.time} {activeInterview.timeZone}</span>
                  </strong>
                </div>
              </div>
            </div>

            {/* TEAMS FLOATING MEETING ACCESS COMPACT */}
            <div className="p-4 border border-indigo-100 rounded-xl bg-gradient-to-br from-[#7B83EB]/5 to-transparent flex items-center justify-between text-left gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-[10.5px] text-[#6264A7] font-bold font-mono uppercase">
                  <Video className="h-4 w-4" />
                  <span>{activeInterview.meetingPlatform} Connected</span>
                </div>
                <p className="text-[10px] text-slate-400 max-w-xs leading-relaxed">
                  Autogenerated matching link synchronized to recruiter internal databases is active.
                </p>
              </div>

              <a 
                href={activeInterview.meetingLink} 
                target="_blank" 
                rel="noreferrer"
                className="bg-[#6264A7] hover:bg-[#505290] text-white p-2.5 rounded-lg text-xs font-bold transition-all shadow-2xs cursor-pointer flex items-center justify-center shrink-0"
                title="Launch Virtual Portal"
              >
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>

            {/* TIMELINE ROUNDS FLOW */}
            <div className="space-y-2">
              <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest block text-left">
                Hiring OS Coordination Rounds Tracker
              </span>

              <div className="flex items-center justify-between text-[10px] bg-slate-50 border border-slate-100 p-2 rounded-xl relative overflow-hidden">
                {['Screening', 'Technical', 'Coding', 'Management', 'HR'].map((stage, idx) => {
                  const isPassed = ['Screening', 'Technical', 'Coding', 'Management', 'HR'].indexOf(activeInterview.currentRound) >= idx;
                  const isCurrent = activeInterview.currentRound === stage;
                  
                  return (
                    <div key={stage} className="flex flex-col items-center gap-1 z-10 flex-1 relative">
                      <div className={`h-4.5 w-4.5 rounded-full flex items-center justify-center text-[8.5px] font-mono font-bold transition-colors ${
                        isCurrent ? 'bg-[#6264A7] text-white shadow-xs' :
                        isPassed ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-500'
                      }`}>
                        {isPassed && !isCurrent ? <Check className="h-3 w-3" /> : idx + 1}
                      </div>
                      <span className={`text-[8px] font-mono font-bold tracking-tight lowercase truncate block max-w-[48px] ${
                        isCurrent ? 'text-[#6264A7]' : 'text-slate-400'
                      }`}>
                        {stage}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* PANEL ASSIGNMENTS & CANDIDATE AVAILABILITY LISTS */}
            <div className="grid grid-cols-2 gap-4 text-xs text-left">
              <div className="space-y-1.5">
                <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest block">Hiring Panels Assigned</span>
                <div className="space-y-1">
                  {activeInterview.panel.map((panCircle, pIdx) => (
                    <div key={pIdx} className="flex items-center gap-1.5 p-1 px-2 border border-slate-150 bg-slate-50 rounded-lg text-slate-700 font-semibold text-[10.5px]">
                      <UserCheck className="h-3 w-3 text-slate-400 shrink-0" />
                      <span>{panCircle}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest block">Consultant Availability</span>
                <div className="space-y-1">
                  {activeInterview.candidateAvailability.map((avlStr, aIdx) => (
                    <div key={aIdx} className="p-1 px-2 border border-[#7B83EB]/15 bg-[#7B83EB]/5 rounded-lg text-[#6264A7] font-semibold text-[9.5px] truncate font-mono">
                      {avlStr}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* INTERACTIVE ROUND FEEDBACK COLLECTION STREAK */}
            <div className="p-4 bg-[#F8FAFC]/55 border border-slate-200/60 rounded-xl text-left space-y-3 relative">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="text-[9px] font-mono font-bold text-[#6264A7] uppercase tracking-widest block flex items-center gap-1">
                  <Award className="h-3.5 w-3.5 text-indigo-400" />
                  <span>Evaluation & Feedback Package</span>
                </span>

                <button
                  onClick={() => {
                    setScoreTechnical(activeInterview.feedback?.technicalRating || 4);
                    setScoreCommunication(activeInterview.feedback?.communicationRating || 4);
                    setScoreTeamFit(activeInterview.feedback?.teamFitRating || 4);
                    setTextFeedback(activeInterview.feedback?.comments || '');
                    setDecisionFeedback(activeInterview.feedback?.decision || 'Advance');
                    setShowFeedbackModal(true);
                  }}
                  className="bg-[#6264A7]/15 hover:bg-[#6264A7]/25 text-[#6264A7] text-[10px] font-bold px-2 py-1 rounded-lg transition-colors cursor-pointer"
                >
                  {activeInterview.feedback ? 'Update Log' : 'Grade Feedback'}
                </button>
              </div>

              {activeInterview.feedback ? (
                <div className="space-y-2.5 text-xs">
                  <div className="grid grid-cols-3 gap-2.5 text-center">
                    <div className="p-1 border border-slate-100 bg-white rounded-lg">
                      <span className="text-[8px] text-slate-400 font-mono block uppercase">Technical</span>
                      <strong className="text-[#6264A7] font-extrabold text-xs">{activeInterview.feedback.technicalRating}/5.0</strong>
                    </div>
                    <div className="p-1 border border-slate-100 bg-white rounded-lg">
                      <span className="text-[8px] text-slate-400 font-mono block uppercase">Comm</span>
                      <strong className="text-[#6264A7] font-extrabold text-xs">{activeInterview.feedback.communicationRating}/5.0</strong>
                    </div>
                    <div className="p-1 border border-slate-100 bg-white rounded-lg">
                      <span className="text-[8px] text-slate-400 font-mono block uppercase">Cultural Fit</span>
                      <strong className="text-[#6264A7] font-extrabold text-xs">{activeInterview.feedback.teamFitRating}/5.0</strong>
                    </div>
                  </div>

                  <div className="p-2 border border-slate-100 bg-white rounded-lg leading-relaxed text-[10.5px]">
                    <strong className="text-slate-800">Evaluator Synthesis: </strong>
                    <span className="text-slate-550 italic">"{activeInterview.feedback.comments}"</span>
                  </div>

                  <div className="flex items-center gap-1.5 text-[10.5px]">
                    <span className="font-semibold text-slate-400">DECISION VERDICT:</span>
                    <span className={`px-2 py-0.5 rounded-md font-mono font-bold text-[9px] uppercase ${
                      activeInterview.feedback.decision === 'Advance' ? 'bg-emerald-100 text-emerald-850' : 
                      activeInterview.feedback.decision === 'Reject' ? 'bg-rose-100 text-rose-850' :
                      'bg-amber-100 text-amber-850'
                    }`}>
                      {activeInterview.feedback.decision}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="text-center py-2">
                  <AlertCircle className="h-6 w-6 text-slate-350 mx-auto animate-pulse" />
                  <p className="text-[10px] text-slate-400 mt-1 leading-normal max-w-xs mx-auto">
                    Panel grading index has empty entries. Complete feedback above once interview closes to finalize the sourcing log.
                  </p>
                </div>
              )}
            </div>

          </div>

          {/* TEAMS COLLABORATIVE CHAT COMMISSARY DIALOGUE (LOWER BLOCK) */}
          <div className="border-t border-slate-100 pt-3.5 mt-4 space-y-3 flex flex-col justify-end text-left">
            <span className="text-[9px] font-mono leading-none font-bold text-slate-400 tracking-wider uppercase block">
              Recruiter Collaboration Discussion Log
            </span>
            
            {/* Scrollable text container */}
            <div className="space-y-1.5 max-h-[140px] overflow-y-auto pr-1">
              {(collaborationComments[activeInterview.id] || []).length === 0 ? (
                <p className="text-[9.5px] text-slate-350 italic">No notes pinned yet on this candidate workspace. Pin comments below.</p>
              ) : (
                (collaborationComments[activeInterview.id] || []).map((notItem) => (
                  <div key={notItem.id} className="p-2 bg-slate-50 border border-slate-100 rounded-xl leading-relaxed text-[10px] space-y-0.5">
                    <div className="flex items-center justify-between text-slate-450 font-bold font-mono text-[8px] uppercase">
                      <span>{notItem.author}</span>
                      <span>{notItem.time}</span>
                    </div>
                    <p className="text-slate-650 leading-relaxed">{notItem.text}</p>
                  </div>
                ))
              )}
            </div>

            <form onSubmit={handlePostComment} className="flex gap-1.5 relative">
              <input 
                type="text" 
                placeholder="Post an internal commentary to hiring teams..."
                value={liveCommentText}
                onChange={(e) => setLiveCommentText(e.target.value)}
                className="flex-1 bg-slate-50 border border-slate-200 py-1.5 px-3 rounded-xl text-xs outline-none focus:bg-white text-slate-800"
              />
              <button 
                type="submit"
                className="bg-[#6264A7] hover:bg-[#505290] text-white p-2 rounded-xl transition-colors cursor-pointer"
              >
                <Send className="h-3.5 w-3.5" />
              </button>
            </form>
          </div>

        </div>

        {/* RIGHT COLUMN: AI SCHEDULING ASSISTANT COGNITIVE PANEL */}
        <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200/60 shadow-xs p-4 flex flex-col justify-between overflow-y-auto">
          <div className="space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-2 text-left">
              <Sparkles className="h-4.5 w-4.5 text-[#6264A7] animate-pulse" />
              <div>
                <strong className="font-display font-extrabold text-xs text-slate-900 block">AI Scheduling Assistant</strong>
                <span className="text-[9px] font-mono text-slate-400 font-bold uppercase block">BenMyl Autopilot Node</span>
              </div>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl text-left space-y-2 text-xs text-slate-650 leading-relaxed">
              <p className="font-mono font-bold text-[9px] text-[#6264A7] uppercase block">Analysis Overview:</p>
              <p>• <strong>Panels Availability match:</strong> 100% (Sarah Sterling free at May 24, 11:00 AM)</p>
              <p>• <strong>Coordinated time zones:</strong> Synchronized successfully (EST to recruiter PST)</p>
              <p>• <strong>Automated Reminders:</strong> Active (24 hr before and 1 hr before invite trigger)</p>
            </div>

            <div className="space-y-2 text-left">
              <strong className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wider block">Coordinated Message Composer</strong>
              <p className="text-[10px] text-slate-400 leading-normal">
                Generate an elegant MS Teams-compatible calendar invitation payload containing coordination logs to send to {activeInterview.name}.
              </p>

              <button
                type="button"
                onClick={handleTriggerAiAssistant}
                disabled={isAiLoading}
                className="w-full bg-[#6264A7]/10 hover:bg-[#6264A7]/20 text-[#6264A7] border border-[#6264A7]/30 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                {isAiLoading ? (
                  <span className="h-4 w-4 border-2 border-[#6264A7] border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Sparkles className="h-3.5 w-3.5" />
                    <span>Auto-Draft Workspace Email</span>
                  </>
                )}
              </button>
            </div>

            <AnimatePresence>
              {copilotFeedbackDraft && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="space-y-2 text-left"
                >
                  <label className="text-[9px] font-mono font-bold text-[#6264A7] uppercase block">Draft invitation package</label>
                  <div className="relative">
                    <textarea 
                      readOnly
                      value={copilotFeedbackDraft}
                      rows={11}
                      className="w-full bg-slate-55 bg-indigo-50/20 border border-indigo-100 rounded-xl p-3 text-[10px] font-mono text-slate-700 leading-relaxed select-text outline-none focus:ring-1 focus:ring-[#6264A7]"
                    />
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(copilotFeedbackDraft);
                      }}
                      className="absolute right-2.5 bottom-2.5 bg-white border border-slate-200 text-slate-650 text-[9px] font-bold py-1 px-2 rounded-lg cursor-pointer hover:bg-slate-50 transition-colors"
                    >
                      Copy Payload
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Recruiter system notification alert lines inside margin */}
          <div className="mt-4 p-2.5 bg-slate-50 border border-slate-100 rounded-xl text-[9px] font-mono text-slate-405 leading-relaxed text-center">
            🔒 Fully GDPR and SOC2 Compliant. Encrypted workspace session.
          </div>
        </div>

      </div>

      {/* SCHEDULE INTERVIEW DIALOGUE FLOATING OVERLAY MODAL */}
      <AnimatePresence>
        {isScheduling && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl border border-slate-250 shadow-2xl p-6 max-w-md w-full relative space-y-4 text-left"
            >
              <button 
                onClick={() => setIsScheduling(false)}
                className="absolute top-4 right-4 p-1 rounded-lg hover:bg-slate-105 text-slate-400 hover:text-slate-750 transition-colors cursor-pointer text-xs font-mono font-extrabold"
              >
                X
              </button>

              <div className="flex items-center gap-2 pb-1 border-b border-slate-100">
                <CalendarIcon className="h-5 w-5 text-[#6264A7]" />
                <div>
                  <h4 className="font-display font-extrabold text-slate-900 text-sm">Schedule Candidate Coordination</h4>
                  <p className="text-[10px] text-slate-400">Initialize dynamic interview tracking indexes on the cockpit</p>
                </div>
              </div>

              <form onSubmit={handleCreateInterview} className="space-y-3.5 text-xs">
                {/* Name */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block font-mono">Consultant Candidate Name</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Nolan Vasquez"
                    required
                    value={newCandName}
                    onChange={(e) => setNewCandName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 py-1.5 px-3 rounded-xl outline-none font-semibold text-slate-850"
                  />
                </div>

                {/* Target Role & Stage */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block font-mono">Job Position Role</label>
                    <select 
                      value={newCandRole}
                      onChange={(e) => setNewCandRole(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 p-2 rounded-xl text-xs font-semibold focus:border-[#6264A7] outline-none text-slate-800"
                    >
                      <option value="Staff React Engineer">Staff React Engineer</option>
                      <option value="Senior DevOps Architect">Senior DevOps Architect</option>
                      <option value="Principal Java Architect">Principal Java Architect</option>
                      <option value="Machine Learning Lead">Machine Learning Lead</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block font-mono">Current Track Stage</label>
                    <select 
                      value={newRound}
                      onChange={(e) => setNewRound(e.target.value as any)}
                      className="w-full bg-slate-50 border border-slate-200 p-2 rounded-xl text-xs font-semibold focus:border-[#6264A7] outline-none text-slate-800"
                    >
                      <option value="Screening">Review Sourcing Screen</option>
                      <option value="Technical">Technical Interview</option>
                      <option value="Coding">Coding Evaluation</option>
                      <option value="Management">Management Round</option>
                      <option value="HR">HR / Negotiation</option>
                    </select>
                  </div>
                </div>

                {/* Date & Time */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block font-mono">Date Coordinate</label>
                    <input 
                      type="date"
                      value={newDate}
                      onChange={(e) => setNewDate(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 p-1.5 rounded-xl text-xs outline-none text-slate-800"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block font-mono">Time & Zone</label>
                    <div className="flex gap-1">
                      <input 
                        type="text"
                        placeholder="11:00 AM"
                        value={newTime}
                        onChange={(e) => setNewTime(e.target.value)}
                        className="w-3/5 bg-slate-50 border border-slate-200 p-1.5 rounded-xl text-xs outline-none text-slate-800"
                      />
                      <select 
                        value={newTimeZone}
                        onChange={(e) => setNewTimeZone(e.target.value as any)}
                        className="w-2/5 bg-slate-50 border border-slate-200 p-1.5 rounded-xl text-xs outline-none text-slate-800"
                      >
                        <option value="EST">EST</option>
                        <option value="PST">PST</option>
                        <option value="IST">IST</option>
                        <option value="GMT">GMT</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Panel assignments */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block font-mono">Assigned Hiring Panels (Comma Delimited)</label>
                  <input 
                    type="text" 
                    placeholder="Sarah Sterling, Marcus Vance"
                    value={newPanel}
                    onChange={(e) => setNewPanel(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 p-1.5 rounded-xl text-xs outline-none text-slate-800"
                  />
                </div>

                {/* Virtual Link Platforms */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block font-mono">Virtual Platform Integration</label>
                  <select 
                    value={newPlatform}
                    onChange={(e) => setNewPlatform(e.target.value as any)}
                    className="w-full bg-slate-50 border border-slate-200 p-2 rounded-xl text-xs font-semibold focus:border-[#6264A7] outline-none text-slate-805"
                  >
                    <option value="Microsoft Teams">Microsoft Teams Integration</option>
                    <option value="Google Meet">Google Meet</option>
                    <option value="Zoom">Zoom Video Communications</option>
                  </select>
                </div>

                {/* Submit & Cancel triggers */}
                <div className="grid grid-cols-2 gap-2.5 pt-3">
                  <button
                    type="button"
                    onClick={() => setIsScheduling(false)}
                    className="py-2.5 px-3 border border-slate-205 hover:bg-slate-50 rounded-xl text-xs font-bold text-slate-650 cursor-pointer text-center"
                  >
                    Discard Changes
                  </button>
                  <button
                    type="submit"
                    className="py-2.5 px-3 bg-[#6264A7] text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1 cursor-pointer hover:bg-[#505290] transition-colors"
                  >
                    <span>Commit Coordination</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* FEEDBACK ASSESSMENT OVERLAY PANEL MODAL */}
      <AnimatePresence>
        {showFeedbackModal && (
          <div className="fixed inset-0 z-50 bg-slate-905/60 bg-opacity-70 backdrop-blur-xs flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="bg-white rounded-3xl border border-slate-250 shadow-2xl p-6 max-w-md w-full text-left space-y-4"
            >
              <div className="flex items-center gap-2 pb-1 border-b border-slate-100">
                <FileCheck2 className="h-5 w-5 text-[#6264A7]" />
                <div>
                  <h4 className="font-display font-extrabold text-slate-900 text-sm">Active Candidate Evaluation Form</h4>
                  <p className="text-[10px] text-slate-400">Record specific candidate score metrics on {activeInterview.name}</p>
                </div>
              </div>

              <div className="space-y-3.5 text-xs">
                {/* Tech rating */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="text-[10px] font-bold text-slate-400 uppercase font-mono">Core Technical Expertise rating</label>
                    <strong className="text-[#6264A7]">{scoreTechnical}/5.0</strong>
                  </div>
                  <input 
                    type="range" 
                    min="1" 
                    max="5" 
                    step="0.5"
                    value={scoreTechnical}
                    onChange={(e) => setScoreTechnical(parseFloat(e.target.value))}
                    className="w-full accent-[#6264A7]"
                  />
                </div>

                {/* Comm rating */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="text-[10px] font-bold text-slate-400 uppercase font-mono">SLA Communication Clarity index</label>
                    <strong className="text-[#6264A7]">{scoreCommunication}/5.0</strong>
                  </div>
                  <input 
                    type="range" 
                    min="1" 
                    max="5" 
                    step="0.5"
                    value={scoreCommunication}
                    onChange={(e) => setScoreCommunication(parseFloat(e.target.value))}
                    className="w-full accent-[#6264A7]"
                  />
                </div>

                {/* Cultural fit */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="text-[10px] font-bold text-slate-400 uppercase font-mono">Cultural Team Fit compatibility</label>
                    <strong className="text-[#6264A7]">{scoreTeamFit}/5.0</strong>
                  </div>
                  <input 
                    type="range" 
                    min="1" 
                    max="5" 
                    step="0.5"
                    value={scoreTeamFit}
                    onChange={(e) => setScoreTeamFit(parseFloat(e.target.value))}
                    className="w-full accent-[#6264A7]"
                  />
                </div>

                {/* Notes comments */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase block font-mono">Detailed Synthesis Comments</label>
                  <textarea 
                    placeholder="Core strengths, growth vectors, design capabilities..."
                    rows={3}
                    value={textFeedback}
                    onChange={(e) => setTextFeedback(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-205 p-2 rounded-xl outline-none font-medium text-slate-800"
                  />
                </div>

                {/* Recommendation status */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase block font-mono">Sourcing Recommendation</label>
                  <div className="grid grid-cols-3 gap-2">
                    {['Advance', 'Hold', 'Reject'].map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => setDecisionFeedback(option as any)}
                        className={`py-2 border rounded-xl text-center text-xs font-bold transition-all cursor-pointer ${
                          decisionFeedback === option 
                            ? option === 'Advance' ? 'bg-emerald-500 border-transparent text-white' :
                              option === 'Reject' ? 'bg-rose-550 bg-rose-500 border-transparent text-white' :
                              'bg-amber-500 border-transparent text-white'
                            : 'bg-slate-50 hover:bg-slate-100 text-slate-500 border-slate-200'
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Button actions */}
                <div className="grid grid-cols-2 gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowFeedbackModal(false)}
                    className="py-2.5 px-3 border border-slate-210 rounded-xl hover:bg-slate-50 font-bold text-slate-600 text-center cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSubmitFeedback}
                    className="py-2.5 px-3 bg-[#6264A7] text-white font-bold rounded-xl flex items-center justify-center cursor-pointer hover:bg-[#505290]"
                  >
                    Save Sourcing Log
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}

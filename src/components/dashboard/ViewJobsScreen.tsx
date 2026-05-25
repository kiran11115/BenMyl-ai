import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Building, 
  MapPin, 
  DollarSign, 
  Bookmark, 
  BookmarkCheck,
  Send, 
  Sparkles, 
  Users, 
  Layers, 
  Search, 
  SlidersHorizontal, 
  Check, 
  Compass, 
  Clock, 
  Activity, 
  Plus, 
  MessageSquare, 
  Share2, 
  Eye, 
  Briefcase,
  AlertCircle,
  FileText,
  UserCheck,
  Heart,
  ChevronDown,
  X,
  Play,
  Trash2,
  Filter
} from 'lucide-react';

interface Job {
  id: string;
  title: string;
  companyName: string;
  location: string;
  salary: string;
  experienceNeeded: number;
  matchScore: number;
  workMode: 'Remote' | 'Hybrid' | 'Onsite';
  visaType: 'H1B' | 'GC-EAD' | 'Citizen' | 'L1' | 'Any';
  employmentType: 'Contract' | 'Full-Time';
  primaryTech: string;
  allSkills: string[];
  description: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'Draft' | 'Active' | 'On Hold' | 'Closed';
  postingChannels: { internal: boolean; external: boolean };
  assignedClientOrVendor: string;
  contactRecruiter: {
    name: string;
    email: string;
  };
  logoType?: string;
  applicantsCount?: number;
  postedTime?: string;
  experienceLevel?: 'Entry level' | 'Intermediate' | 'Expert';
}

interface ViewJobsScreenProps {
  passedCandidate?: any;
  onNavigateBack?: () => void;
}

export default function ViewJobsScreen({ passedCandidate, onNavigateBack }: ViewJobsScreenProps) {
  const [selectedCandidate, setSelectedCandidate] = useState<any>(null);

  // Core Jobs Data state updated to mirror the requested mockup exactly!
  const [jobs, setJobs] = useState<Job[]>([
    {
      id: 'JOB-001',
      title: 'Product designer',
      companyName: 'MetaMask',
      logoType: 'metamask',
      location: 'New York, NY (Remote)',
      salary: '$250/hr',
      experienceNeeded: 2,
      matchScore: 98,
      workMode: 'Remote',
      visaType: 'GC-EAD',
      employmentType: 'Full-Time',
      primaryTech: 'Figma',
      allSkills: ['Figma', 'UI/UX', 'Prototyping', 'User Research'],
      description: 'Doing the right thing for investors is what we\'re all about at Vanguard, and that in. Lead component systems redesign and user telemetry tests.',
      priority: 'High',
      status: 'Active',
      postingChannels: { internal: true, external: true },
      assignedClientOrVendor: 'ConsenSys MetaMask',
      contactRecruiter: { name: 'Sarah Sterling', email: 's.sterl@keycapital.net' },
      applicantsCount: 25,
      postedTime: 'Posted 12 days ago',
      experienceLevel: 'Entry level'
    },
    {
      id: 'JOB-002',
      title: 'Sr. UX Designer',
      companyName: 'Netflix',
      logoType: 'netflix',
      location: 'Los Gatos, CA (Hybrid)',
      salary: '$195/hr',
      experienceNeeded: 8,
      matchScore: 95,
      workMode: 'Hybrid',
      visaType: 'Citizen',
      employmentType: 'Contract',
      primaryTech: 'Product Strategy',
      allSkills: ['Interactive Prototypes', 'Design Systems', 'Motion', 'A/B Testing'],
      description: 'Netflix is one of the world\'s leading streaming entertainment services with over 200 million members. Collaborate closely with our core player interface builders.',
      priority: 'High',
      status: 'Active',
      postingChannels: { internal: true, external: true },
      assignedClientOrVendor: 'Netflix Sourcing',
      contactRecruiter: { name: 'Marcus Vance', email: 'vance@corecorp.io' },
      applicantsCount: 14,
      postedTime: 'Posted 5 days ago',
      experienceLevel: 'Expert'
    },
    {
      id: 'JOB-003',
      title: 'Product designer',
      companyName: 'Microsoft',
      logoType: 'microsoft',
      location: 'Redmond, WA (Onsite)',
      salary: '$210/hr',
      experienceNeeded: 5,
      matchScore: 92,
      workMode: 'Onsite',
      visaType: 'Citizen',
      employmentType: 'Full-Time',
      primaryTech: 'Design Systems',
      allSkills: ['Figma', 'System Architecture', 'C#', 'Vetting'],
      description: 'Welcome to Lightspeed LA, the first U.S.-based, AAA game development studio supporting Xbox Game initiatives. We seek visionary designers to shape interface hubs.',
      priority: 'Medium',
      status: 'Active',
      postingChannels: { internal: true, external: false },
      assignedClientOrVendor: 'Microsoft Talent Lab',
      contactRecruiter: { name: 'Marcus Vance', email: 'vance@corecorp.io' },
      applicantsCount: 58,
      postedTime: 'Posted 4 days ago',
      experienceLevel: 'Intermediate'
    },
    {
      id: 'JOB-004',
      title: 'Product designer',
      companyName: 'Reddit',
      logoType: 'reddit',
      location: 'San Francisco, CA (Remote)',
      salary: '$120/hr',
      experienceNeeded: 10,
      matchScore: 89,
      workMode: 'Remote',
      visaType: 'Any',
      employmentType: 'Contract',
      primaryTech: 'React',
      allSkills: ['React', 'Community Design', 'TailwindCSS'],
      description: 'Prelim is how banks onboard their customers for business checking accounts. Reddit is hiring seasoned UI designers to construct beautiful community feeds.',
      priority: 'Low',
      status: 'Active',
      postingChannels: { internal: false, external: true },
      assignedClientOrVendor: 'Reddit Inc',
      contactRecruiter: { name: 'Danielle Cooper', email: 'd.coop@stellartech.io' },
      applicantsCount: 23,
      postedTime: 'Posted 22 days ago',
      experienceLevel: 'Expert'
    },
    {
      id: 'JOB-005',
      title: 'Backend Dev.',
      companyName: 'Google',
      logoType: 'google',
      location: 'Mountain View, CA (Hybrid)',
      salary: '$260/hr',
      experienceNeeded: 6,
      matchScore: 94,
      workMode: 'Hybrid',
      visaType: 'H1B',
      employmentType: 'Full-Time',
      primaryTech: 'Go',
      allSkills: ['Go', 'gRPC', 'Kubernetes', 'Spanner'],
      description: 'Coolfire is on a mission to make those networks safer by resolving active security loopholes. Create distributed back-end structures delivering low latency metrics.',
      priority: 'High',
      status: 'Active',
      postingChannels: { internal: true, external: true },
      assignedClientOrVendor: 'Google Sourcing Solutions',
      contactRecruiter: { name: 'Samantha Chen', email: 'sam.chen@benmyl.ai' },
      applicantsCount: 21,
      postedTime: 'Posted 2 days ago',
      experienceLevel: 'Intermediate'
    },
    {
      id: 'JOB-006',
      title: 'SMM Manager',
      companyName: 'Spotify',
      logoType: 'spotify',
      location: 'Stockholm (Remote)',
      salary: '$170/hr',
      experienceNeeded: 4,
      matchScore: 87,
      workMode: 'Remote',
      visaType: 'Any',
      employmentType: 'Full-Time',
      primaryTech: 'Social',
      allSkills: ['Copywriting', 'Content Strategy', 'Analytical Tools'],
      description: 'Join us as we increase access to modern streaming models, helping audio musicians gather global listeners. We seek a Social Content marketing wizard.',
      priority: 'Medium',
      status: 'Active',
      postingChannels: { internal: true, external: true },
      assignedClientOrVendor: 'Spotify HR Group',
      contactRecruiter: { name: 'Aaliyah Reed', email: 'a.reed@nextgen.net' },
      applicantsCount: 73,
      postedTime: 'Posted 8 days ago',
      experienceLevel: 'Intermediate'
    },
    {
      id: 'JOB-901',
      title: 'Principal Front-End React Component Architect',
      companyName: 'Apex Capital Banking Systems',
      logoType: 'apex',
      location: 'Austin, TX (Hybrid)',
      salary: '$185k - $210k',
      experienceNeeded: 8,
      matchScore: 98,
      workMode: 'Hybrid',
      visaType: 'GC-EAD',
      employmentType: 'Full-Time',
      primaryTech: 'React',
      allSkills: ['React', 'TypeScript', 'Redux', 'WebSockets', 'Vite'],
      description: 'Lead high-performance design component rewrite serving core checkout experiences. Seeking seasoned micro-frontend developers.',
      priority: 'High',
      status: 'Active',
      postingChannels: { internal: true, external: true },
      assignedClientOrVendor: 'Apex Systems Corp',
      contactRecruiter: { name: 'Sarah Sterling', email: 's.sterl@keycapital.net' },
      applicantsCount: 42,
      postedTime: 'Posted 11 days ago',
      experienceLevel: 'Expert'
    },
    {
      id: 'JOB-902',
      title: 'Senior Solutions Engineer (Django & GC Cluster)',
      companyName: 'CloudCore Technologies',
      logoType: 'cloud',
      location: 'San Francisco, CA (Hybrid)',
      salary: '$160k - $185k',
      experienceNeeded: 10,
      matchScore: 95,
      workMode: 'Hybrid',
      visaType: 'Citizen',
      employmentType: 'Full-Time',
      primaryTech: 'Python',
      allSkills: ['Python', 'Django', 'GCP', 'PostgreSQL', 'Docker'],
      description: 'Help scale multi-region PostgreSQL replicas and coordinate tenant security pipelines over robust cloud architectures.',
      priority: 'Medium',
      status: 'Active',
      postingChannels: { internal: true, external: false },
      assignedClientOrVendor: 'CloudCore Corp',
      contactRecruiter: { name: 'Marcus Vance', email: 'vance@corecorp.io' },
      applicantsCount: 19,
      postedTime: 'Posted 14 days ago',
      experienceLevel: 'Expert'
    }
  ]);

  const [activeJobId, setActiveJobId] = useState<string>('JOB-001');
  const [savedJobs, setSavedJobs] = useState<string[]>(['JOB-001', 'JOB-002']); // MetaMask & Netflix saved initially as per standard heart display
  const [appliedJobs, setAppliedJobs] = useState<string[]>([]);

  // Search & Filters state managers
  const [techQuery, setTechQuery] = useState('');
  const [locationQuery, setLocationQuery] = useState('');
  const [selectedJobTypes, setSelectedJobTypes] = useState<string[]>(['Full time', 'Part time', 'Project work']);
  const [selectedExperienceLevels, setSelectedExperienceLevels] = useState<string[]>(['Intermediate', 'Expert']);
  const [maxSalary, setMaxSalary] = useState<number>(280);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  
  // Sort state
  const [sortBy, setSortBy] = useState<'Recent' | 'Salary' | 'Match'>('Recent');
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  // Creative Job Form state
  const [isCreatingJob, setIsCreatingJob] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCompany, setNewCompany] = useState('');
  const [newRate, setNewRate] = useState('$130k - $150k');
  const [newLoc, setNewLoc] = useState('Austin, TX');
  const [newMode, setNewMode] = useState<'Remote' | 'Hybrid' | 'Onsite'>('Remote');
  const [newVisa, setNewVisa] = useState<'H1B' | 'GC-EAD' | 'Citizen' | 'L1' | 'Any'>('Any');
  const [newType, setNewType] = useState<'Contract' | 'Full-Time'>('Full-Time');
  const [newPriority, setNewPriority] = useState<'High' | 'Medium' | 'Low'>('High');
  const [newVendorClient, setNewVendorClient] = useState('');
  const [newSkillsInput, setNewSkillsInput] = useState('React, TypeScript');
  const [newDesc, setNewDesc] = useState('');

  // Sourcing Copilot state
  const [isAiGenerating, setIsAiGenerating] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  // Detail Side Drawer Toggle
  const [isDetailDrawerOpen, setIsDetailDrawerOpen] = useState(false);

  // Recruiter notes/comments state
  const [collaborationComments, setCollaborationComments] = useState<{ [key: string]: { id: number; author: string; text: string; time: string }[] }>({
    'JOB-001': [
      { id: 1, author: 'Sarah Sterling', text: 'Sourcing speed prioritized. High telemetry response scores mapped.', time: '08:44 AM' },
      { id: 2, author: 'Samantha Chen', text: 'Candidate Nolan Vasquez matches the portfolio index spectacularly.', time: '09:12 AM' }
    ],
    'JOB-002': [
      { id: 1, author: 'Marcus Vance', text: 'Hiring stakeholders requested direct interview scheduling parameters.', time: 'Yesterday' }
    ]
  });
  const [liveCommentText, setLiveCommentText] = useState('');

  // Matchmaking candidates pool
  const [matchedCandidateProfiles, setMatchedCandidateProfiles] = useState([
    { name: 'Nolan Vasquez', skillScore: 98, experience: 8, location: 'Austin, TX', skills: 'React, TS, Redux', matched: true },
    { name: 'Sanjay Kumar', skillScore: 84, experience: 6, location: 'New York, NY', skills: 'React, Angular, JS', matched: false },
    { name: 'Sophia Chen', skillScore: 78, experience: 5, location: 'San Francisco, CA', skills: 'React, Webpack, CSS', matched: false }
  ]);

  // Sync candidate if passed from prior streams
  useEffect(() => {
    if (passedCandidate) {
      setSelectedCandidate(passedCandidate);
      if (passedCandidate.skills && passedCandidate.skills.length > 0) {
        setTechQuery(passedCandidate.skills[0]);
      }
    } else {
      setSelectedCandidate({
        name: 'Nolan Vasquez',
        role: 'Staff React Engineer',
        skills: ['React', 'TypeScript', 'Redux', 'WebSockets', 'Vite'],
        experience: 8
      });
    }
  }, [passedCandidate]);

  const activeJob = jobs.find(j => j.id === activeJobId) || jobs[0];

  const handleCreateJobSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newJob: Job = {
      id: `JOB-${Math.floor(100 + Math.random() * 800)}`,
      title: newTitle,
      companyName: newCompany || 'Internal Enterprise Dept',
      location: newLoc,
      salary: newRate,
      experienceNeeded: 5,
      matchScore: 91,
      workMode: newMode,
      visaType: newVisa,
      employmentType: newType,
      primaryTech: newSkillsInput.split(',')[0] || 'Design Systems',
      allSkills: newSkillsInput.split(',').map(s => s.trim()),
      description: newDesc || 'Standard corporate requirements logged by lead recruiter.',
      priority: newPriority,
      status: 'Active',
      postingChannels: { internal: true, external: true },
      assignedClientOrVendor: newVendorClient || 'BenMyl Prime Staffing',
      contactRecruiter: { name: 'You (Lead Recruiter)', email: 'recruiter@benmyl.com' },
      logoType: 'generic',
      applicantsCount: 1,
      postedTime: 'Posted Just now',
      experienceLevel: 'Intermediate'
    };

    setJobs(prev => [newJob, ...prev]);
    setActiveJobId(newJob.id);
    setIsCreatingJob(false);
    triggerToast('New Branded Job Spec Added Successfully!');

    // Reset Creation Fields
    setNewTitle('');
    setNewCompany('');
    setNewDesc('');
  };

  const triggerToast = (msg: string) => {
    setToastMsg(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3200);
  };

  const handleTriggerAiDescription = () => {
    if (!newTitle.trim()) {
      triggerToast('Please supply a Job Title first to generate JDs.');
      return;
    }
    setIsAiGenerating(true);
    setTimeout(() => {
      setIsAiGenerating(false);
      setNewDesc(
        `### Professional Job Specifications - ${newTitle}\n\nWe are actively seeking a highly skilled **${newTitle}** to join our engineering division at **${newCompany || 'Apex Systems'}**.\n\n#### Core Responsibilities:\n* Architect polished, production-ready interfaces matching beautiful design specs.\n* Maintain excellent code composition using best-practice styling parameters (Tailwind, modern layout frames).\n* Collaborate on continuous integration schedules alongside design teams.\n\n#### Vetted Skill Profiles:\n* Practical mastery of: ${newSkillsInput || 'Figma, Tailwind, React, Product Architecture'}.`
      );
      triggerToast('Sourcing AI parsed and prepared the JD spec!');
    }, 1200);
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
      [activeJob.id]: [...(prev[activeJob.id] || []), newComment]
    }));
    setLiveCommentText('');
  };

  const handleSaveToggle = (jobId: string) => {
    setSavedJobs(prev => 
      prev.includes(jobId) ? prev.filter(id => id !== jobId) : [...prev, jobId]
    );
    triggerToast(savedJobs.includes(jobId) ? 'Removed from favorites' : 'Saved to favorites');
  };

  const handleExecuteQuickApply = (jobId: string) => {
    setAppliedJobs(prev => [...prev, jobId]);
    triggerToast('Matched Candidate transmitted securely to stakeholder group!');
  };

  const handleStatusChange = (status: 'Draft' | 'Active' | 'On Hold' | 'Closed') => {
    setJobs(prev => prev.map(item => {
      if (item.id === activeJob.id) {
        return { ...item, status };
      }
      return item;
    }));
  };

  const handleChannelToggle = (channel: 'internal' | 'external') => {
    setJobs(prev => prev.map(item => {
      if (item.id === activeJob.id) {
        const postingChannels = { ...item.postingChannels, [channel]: !item.postingChannels[channel] };
        return { ...item, postingChannels };
      }
      return item;
    }));
  };

  const handleShareRequirement = () => {
    const inviteLink = `https://benmyl.com/careers/jobs/${activeJob.id}?ref=recruiter`;
    navigator.clipboard.writeText(inviteLink);
    triggerToast('Job spec invite link copied!');
  };

  // Toggle Filters
  const handleToggleJobType = (type: string) => {
    setSelectedJobTypes(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const handleToggleExperience = (level: string) => {
    setSelectedExperienceLevels(prev =>
      prev.includes(level) ? prev.filter(l => l !== level) : [...prev, level]
    );
  };

  const handleClearAllFilters = () => {
    setTechQuery('');
    setLocationQuery('');
    setSelectedJobTypes([]);
    setSelectedExperienceLevels([]);
    setMaxSalary(300);
    setSelectedCategory('All');
    triggerToast('All filtering structures cleared!');
  };

  // Dynamic filter logic
  const filteredJobs = jobs.filter(job => {
    // Text search
    const matchesKeyword = !techQuery ? true : (
      job.title.toLowerCase().includes(techQuery.toLowerCase()) ||
      job.companyName.toLowerCase().includes(techQuery.toLowerCase()) ||
      job.allSkills.some(s => s.toLowerCase().includes(techQuery.toLowerCase()))
    );

    const matchesLocation = !locationQuery ? true : (
      job.location.toLowerCase().includes(locationQuery.toLowerCase())
    );

    // Job Type mapping matches to mockup checkboxes:
    // "Full time" checkbox, "Part time" checkbox, "Project work" checkbox etc.
    const isFullTimeChecked = selectedJobTypes.includes('Full time');
    const isPartTimeChecked = selectedJobTypes.includes('Part time');
    const isContractChecked = selectedJobTypes.includes('Project work');
    const isInternshipChecked = selectedJobTypes.includes('Internship');
    const isVolunteeringChecked = selectedJobTypes.includes('Volunteering');

    let matchesType = true;
    if (selectedJobTypes.length > 0) {
      matchesType = false;
      if (isFullTimeChecked && job.employmentType === 'Full-Time') matchesType = true;
      if (isPartTimeChecked && job.employmentType === 'Contract' && job.workMode !== 'Remote') matchesType = true; // simulated split
      if (isContractChecked && job.employmentType === 'Contract') matchesType = true;
      if (isInternshipChecked && job.experienceNeeded <= 2) matchesType = true;
      if (isVolunteeringChecked && job.salary.includes('/hr') && parseInt(job.salary.replace(/\D/g, '')) < 130) matchesType = true;
    }

    // Experience Level matcher
    let matchesExperience = true;
    if (selectedExperienceLevels.length > 0) {
      matchesExperience = false;
      const jobExpLevel = job.experienceLevel || (job.experienceNeeded <= 3 ? 'Entry level' : job.experienceNeeded <= 7 ? 'Intermediate' : 'Expert');
      
      if (selectedExperienceLevels.includes('Entry level') && jobExpLevel === 'Entry level') matchesExperience = true;
      if (selectedExperienceLevels.includes('Intermediate') && jobExpLevel === 'Intermediate') matchesExperience = true;
      if (selectedExperienceLevels.includes('Expert') && jobExpLevel === 'Expert') matchesExperience = true;
    }

    // Max Salary range limit parser
    // Parsed from "$250/hr" or "$185k - $210k"
    const valString = job.salary.replace(/\D/g, ''); 
    const valSalaryNum = valString.length > 3 ? parseInt(valString.slice(0, 3)) : parseInt(valString) || 120;
    const matchesSalary = valSalaryNum <= maxSalary;

    // Dropdown Categories Filter Selection
    const matchesCategory = selectedCategory === 'All' ? true : (
      job.primaryTech.toLowerCase().includes(selectedCategory.toLowerCase()) ||
      job.title.toLowerCase().includes(selectedCategory.toLowerCase())
    );

    return matchesKeyword && matchesLocation && matchesType && matchesExperience && matchesSalary && matchesCategory;
  });

  // Sort Filter List
  const sortedJobs = [...filteredJobs].sort((a, b) => {
    if (sortBy === 'Salary') {
      const getNum = (s: string) => parseInt(s.replace(/\D/g, '')) || 0;
      return getNum(b.salary) - getNum(a.salary);
    }
    if (sortBy === 'Match') {
      return b.matchScore - a.matchScore;
    }
    // Default 'Recent': sorts standard sequence (newly added first)
    return 0;
  });

  // Render Premium Corporate Logo visually matching the user image
  const renderCompanyLogo = (logoType?: string, companyName?: string) => {
    const type = logoType?.toLowerCase() || companyName?.toLowerCase() || '';

    if (type.includes('metamask')) {
      return (
        <div className="w-11 h-11 rounded-full bg-blue-50/80 flex items-center justify-center text-blue-600 shadow-sm shrink-0 border border-blue-100 relative">
          <span className="text-xl font-bold font-mono tracking-tighter">∞</span>
        </div>
      );
    }
    if (type.includes('netflix')) {
      return (
        <div className="w-11 h-11 rounded-full bg-red-50 flex items-center justify-center text-red-600 shadow-sm shrink-0 border border-red-100 relative">
          <span className="text-sm font-black font-serif">N</span>
        </div>
      );
    }
    if (type.includes('microsoft')) {
      return (
        <div className="w-11 h-11 rounded-full bg-slate-50 flex items-center justify-center shadow-sm shrink-0 border border-slate-100 p-2.5 relative">
          <div className="grid grid-cols-2 gap-0.5 w-full h-full">
            <div className="bg-[#F25022] rounded-2xs" />
            <div className="bg-[#7FBA00] rounded-2xs" />
            <div className="bg-[#01A6F0] rounded-2xs" />
            <div className="bg-[#FFB900] rounded-2xs" />
          </div>
        </div>
      );
    }
    if (type.includes('reddit')) {
      return (
        <div className="w-11 h-11 rounded-full bg-[#FF4500]/10 flex items-center justify-center text-[#FF4500] shadow-sm shrink-0 border border-orange-100 relative">
          <span className="text-sm">👾</span>
        </div>
      );
    }
    if (type.includes('google')) {
      return (
        <div className="w-11 h-11 rounded-full bg-neutral-50 flex items-center justify-center shadow-sm shrink-0 border border-neutral-200 relative select-none">
          <span className="font-extrabold text-[#4285F4] text-xs">G</span>
          <span className="absolute bottom-1 right-2 text-[6px] font-sans text-red-550 font-bold">o</span>
        </div>
      );
    }
    if (type.includes('spotify')) {
      return (
        <div className="w-11 h-11 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 shadow-sm shrink-0 border border-emerald-100 relative">
          <span className="text-sm">🎵</span>
        </div>
      );
    }
    if (type.includes('apex')) {
      return (
        <div className="w-11 h-11 rounded-full bg-violet-100 text-violet-750 flex items-center justify-center shrink-0 font-bold border border-violet-200">
          <span className="text-[10px] font-mono font-black">AP</span>
        </div>
      );
    }
    if (type.includes('cloud')) {
      return (
        <div className="w-11 h-11 rounded-full bg-sky-50 text-sky-700 flex items-center justify-center shrink-0 border border-sky-100">
          <span className="text-sm">☁</span>
        </div>
      );
    }
    return (
      <div className="w-11 h-11 rounded-full bg-gray-100 text-gray-700 flex items-center justify-center shrink-0 border border-gray-200">
        <Building className="w-4.5 h-4.5 text-gray-500" />
      </div>
    );
  };

  return (
    <div id="view_jobs_master_screen" className="flex flex-col h-full bg-[#F5F7FB] select-text font-sans pb-16">
      
      {/* 1. TOAST ALERTS STACK */}
      <AnimatePresence>
        {showToast && (
          <motion.div 
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-55 bg-[#0f172a] text-white px-5 py-3 rounded-2xl shadow-xl text-xs font-semibold flex items-center gap-2 border border-slate-700/80"
          >
            <Sparkles className="h-4 w-4 text-emerald-400" />
            <span>{toastMsg}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. THE HIGH-CONTRAST HEADER BANNER ("Find Your Dream Job Here") */}
      <div className="w-full bg-[#0b0c10] text-[#f8fafc] rounded-3xl p-8 mb-8 relative overflow-hidden shadow-xl shadow-slate-900/10 border border-slate-930">
        {/* Subtle geometric circles background */}
        <div className="absolute -top-16 -right-16 w-60 h-60 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-60 h-60 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-6 max-w-4xl mx-auto">
          {/* Header Top Navigation back element (if requested) */}
          <div className="flex items-center justify-between">
            {onNavigateBack ? (
              <button 
                onClick={onNavigateBack}
                className="flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-300 transition-colors font-semibold"
              >
                <Compass className="h-3.5 w-3.5" />
                <span>Back to Selection Desk</span>
              </button>
            ) : (
              <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono tracking-widest font-bold">
                <Compass className="h-3.5 w-3.5 text-blue-400 animate-pulse" />
                <span>BENMYL RECRUIT PORTAL</span>
              </div>
            )}

            <button
              onClick={() => setIsCreatingJob(true)}
              className="bg-blue-600 hover:bg-blue-505 bg-gradient-to-r from-blue-600 to-blue-550 text-white font-bold py-1.5 px-3.5 rounded-lg text-xs transition-transform cursor-pointer hover:scale-103"
            >
              + Create Spec Job
            </button>
          </div>

          {/* Slogan Head / Title */}
          <div className="flex items-center gap-3">
            <h1 className="text-3xl md:text-4xl font-display font-extrabold tracking-tight">
              Find Your Dream Job Here
            </h1>
            <span className="text-white text-3xl font-light">✦</span>
          </div>

          {/* DUAL SEARCH TRAIN COMPONENT (Magnificent Overlaid Design) */}
          <div className="bg-white rounded-2xl md:rounded-full p-2.5 shadow-xl flex flex-col md:flex-row items-stretch md:items-center gap-2 border border-slate-250">
            {/* Left section: keyword */}
            <div className="flex-1 flex items-center pr-3 pl-2.5">
              <Search className="h-4.5 w-4.5 text-gray-400 shrink-0 mr-2.5" />
              <input 
                type="text" 
                placeholder="Job title or keyword"
                value={techQuery}
                onChange={(e) => setTechQuery(e.target.value)}
                className="w-full bg-transparent text-xs text-slate-800 outline-none placeholder:text-gray-400 font-medium py-1.5"
              />
              {techQuery && (
                <button type="button" onClick={() => setTechQuery('')} className="text-gray-400 hover:text-gray-650 px-1">
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            {/* Split divider vertical */}
            <div className="hidden md:block w-px h-6 bg-slate-200" />

            {/* Right section: geography */}
            <div className="flex-1 flex items-center pr-3 pl-2.5">
              <MapPin className="h-4.5 w-4.5 text-gray-400 shrink-0 mr-2.5" />
              <input 
                type="text" 
                placeholder="Add country or city"
                value={locationQuery}
                onChange={(e) => setLocationQuery(e.target.value)}
                className="w-full bg-transparent text-xs text-slate-800 outline-none placeholder:text-gray-400 font-medium py-1.5"
              />
              {locationQuery && (
                <button type="button" onClick={() => setLocationQuery('')} className="text-gray-400 hover:text-gray-650 px-1">
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            {/* Right Action Trigger CTA */}
            <button 
              type="button" 
              onClick={() => triggerToast(`Filtered down to: ${techQuery || 'All jobs'} in ${locationQuery || 'Anywhere'}`)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs py-2.5 px-6 rounded-xl md:rounded-full cursor-pointer transition-colors shrink-0"
            >
              Search
            </button>
          </div>
        </div>
      </div>

      {/* 3. CORE CONTENT SPLIT GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* INTERACTIVE FILTERS LEFT SIDEBAR (Col 3) */}
        <aside className="lg:col-span-3 space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-6">
            
            {/* Filter Header Row */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-1.5">
                <SlidersHorizontal className="h-4 w-4 text-slate-900" />
                <h3 className="font-display font-black text-xs text-slate-900 uppercase tracking-wider">Interactive Filters</h3>
              </div>
              <button 
                type="button"
                onClick={handleClearAllFilters}
                className="text-[11px] font-bold text-red-500 hover:text-red-600 transition-colors cursor-pointer"
              >
                Clear all
              </button>
            </div>

            {/* Category selection */}
            <div className="space-y-2.5">
              <label className="text-[10px] font-mono font-extrabold text-slate-400 uppercase tracking-widest block text-left">
                Job categories
              </label>
              <div className="relative">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 p-2 text-xs rounded-xl text-slate-705 outline-none font-medium focus:border-slate-800 transition-colors pl-3 pr-8 appearance-none cursor-pointer"
                >
                  <option value="All">All Categories</option>
                  <option value="Figma">Figma / UI Design</option>
                  <option value="Product Strategy">Product Strategy</option>
                  <option value="Design Systems">Design Systems Systems</option>
                  <option value="React">React FrontEnd</option>
                  <option value="Go">Go / Cloud Backend</option>
                  <option value="Social">Marketing / SMM</option>
                </select>
                <ChevronDown className="h-3.5 w-3.5 absolute right-3.5 top-3.5 text-gray-450 pointer-events-none" />
              </div>
            </div>

            {/* Job Type checklist checklist */}
            <div className="space-y-3">
              <label className="text-[10px] font-mono font-extrabold text-slate-400 uppercase tracking-widest block text-left">
                Job Type
              </label>
              <div className="space-y-2">
                {['Full time', 'Part time', 'Internship', 'Project work', 'Volunteering'].map((type) => {
                  const jobTypeChecked = selectedJobTypes.includes(type);
                  return (
                    <button
                      key={type}
                      type="button"
                      onClick={() => handleToggleJobType(type)}
                      className="flex items-center gap-3 text-xs text-slate-700 hover:text-slate-950 cursor-pointer text-left w-full group py-0.5"
                    >
                      <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
                        jobTypeChecked ? 'bg-slate-900 border-slate-900 text-white' : 'border-slate-300 bg-white group-hover:border-slate-400'
                      }`}>
                        {jobTypeChecked && <Check className="w-3.5 h-3.5 stroke-[3px]" />}
                      </div>
                      <span className={jobTypeChecked ? 'font-semibold text-slate-950 text-[11.5px]' : 'text-slate-600 text-[11.5px]'}>{type}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Salary Range dual layout limit slider */}
            <div className="space-y-3 pt-1">
              <label className="text-[10px] font-mono font-extrabold text-slate-400 uppercase tracking-widest block text-left">
                Salary Limit
              </label>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="bg-slate-100 text-slate-800 px-2 py-0.5 rounded font-mono font-bold">$50k</span>
                  <span className="text-slate-400 text-[10px]">TO</span>
                  <span className="bg-slate-100 text-slate-800 px-2 py-0.5 rounded font-mono font-bold">${maxSalary}k</span>
                </div>
                
                <div className="relative pt-1.5">
                  <input 
                    type="range"
                    min="50"
                    max="300"
                    value={maxSalary}
                    onChange={(e) => setMaxSalary(Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-900 focus:outline-none"
                  />
                  <div className="flex items-center justify-between pt-1 text-[9px] font-mono text-slate-400">
                    <span>MIN: $50 /hr or k</span>
                    <span>MAX LIMIT: $300</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Experience Level checklist checklist */}
            <div className="space-y-3 pt-1">
              <label className="text-[10px] font-mono font-extrabold text-slate-400 uppercase tracking-widest block text-left">
                Experience Level
              </label>

              <div className="space-y-2">
                {[
                  { key: 'Entry level', label: 'Entry level', count: '392' },
                  { key: 'Intermediate', label: 'Intermediate', count: '124' },
                  { key: 'Expert', label: 'Expert', count: '3,921' }
                ].map((level) => {
                  const expChecked = selectedExperienceLevels.includes(level.key);
                  return (
                    <button
                      key={level.key}
                      type="button"
                      onClick={() => handleToggleExperience(level.key)}
                      className="flex items-center justify-between text-xs text-slate-700 hover:text-slate-950 cursor-pointer text-left w-full group py-0.5"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
                          expChecked ? 'bg-slate-900 border-slate-900 text-white' : 'border-slate-300 bg-white group-hover:border-slate-400'
                        }`}>
                          {expChecked && <Check className="w-3.5 h-3.5 stroke-[3px]" />}
                        </div>
                        <span className={expChecked ? 'font-semibold text-slate-950 text-[11.5px]' : 'text-slate-600 text-[11.5px]'}>{level.label}</span>
                      </div>
                      <span className="text-[10.5px] text-slate-400 font-mono font-bold">{level.count}</span>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>
        </aside>

        {/* RECOMMENDED JOBS MAIN PORTION (Col 9) */}
        <section className="lg:col-span-9 space-y-5">
          
          {/* Main header row for jobs portion */}
          <div className="flex items-center justify-between">
            <div className="text-left">
              <h2 className="text-xl md:text-2xl font-display font-extrabold text-slate-950 tracking-tight">
                Recommended jobs
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Showing {sortedJobs.length} matches based on your interactive filters
              </p>
            </div>

            {/* Sort Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setShowSortDropdown(!showSortDropdown)}
                className="bg-white border border-slate-200 hover:border-slate-300 py-1.5 px-3.5 rounded-full text-xs font-bold text-slate-800 flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>Most {sortBy === 'Recent' ? 'recent' : sortBy === 'Salary' ? 'lucrative' : 'compatible'}</span>
                <SlidersHorizontal className="h-3 w-3 text-slate-400" />
              </button>

              <AnimatePresence>
                {showSortDropdown && (
                  <>
                    <div className="fixed inset-0 z-25" onClick={() => setShowSortDropdown(false)} />
                    <motion.div 
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                      className="absolute right-0 top-9 w-40 bg-white border border-slate-200 rounded-xl shadow-lg p-1.5 z-30 text-left space-y-0.5"
                    >
                      <button 
                        onClick={() => { setSortBy('Recent'); setShowSortDropdown(false); }}
                        className={`w-full text-left p-2 rounded-lg text-xs font-semibold ${sortBy === 'Recent' ? 'bg-slate-50 text-blue-600' : 'text-slate-700 hover:bg-slate-50/70'}`}
                      >
                        Most recent
                      </button>
                      <button 
                        onClick={() => { setSortBy('Salary'); setShowSortDropdown(false); }}
                        className={`w-full text-left p-2 rounded-lg text-xs font-semibold ${sortBy === 'Salary' ? 'bg-slate-50 text-blue-600' : 'text-slate-700 hover:bg-slate-50/70'}`}
                      >
                        Highest Salary
                      </button>
                      <button 
                        onClick={() => { setSortBy('Match'); setShowSortDropdown(false); }}
                        className={`w-full text-left p-2 rounded-lg text-xs font-semibold ${sortBy === 'Match' ? 'bg-slate-50 text-blue-600' : 'text-slate-700 hover:bg-slate-50/70'}`}
                      >
                        Match Score
                      </button>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* DYNAMIC CARDS PORTION */}
          {sortedJobs.length === 0 ? (
            <div className="bg-white rounded-3xl p-16 border border-slate-200 text-center space-y-3">
              <div className="mx-auto h-12 w-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-400">
                <AlertCircle className="h-6 w-6" />
              </div>
              <div>
                <strong className="block text-slate-800 text-sm">No job matches found</strong>
                <p className="text-xs text-slate-400 max-w-sm mx-auto mt-1">
                  Try loosening your filter metrics (Job Type, Salary or Experience Level) to discover active opportunities.
                </p>
              </div>
              <button 
                onClick={handleClearAllFilters}
                className="bg-slate-900 text-white px-4 py-2 rounded-xl text-xs font-bold"
              >
                Reset Filter Setup
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {sortedJobs.map((item) => {
                const isSaved = savedJobs.includes(item.id);
                const isSelected = item.id === activeJobId;
                
                // Experience level tag matching mockup colors: purple, green, orange/amber pastel pills
                const expLevel = item.experienceLevel || (item.experienceNeeded <= 3 ? 'Entry level' : item.experienceNeeded <= 7 ? 'Intermediate' : 'Expert');
                
                const expTagColors = 
                  expLevel === 'Entry level' ? 'bg-purple-100/60 text-purple-700 border-purple-200/40' :
                  expLevel === 'Intermediate' ? 'bg-[#3b82f6]/10 text-blue-700 border-blue-200/40' :
                  'bg-violet-100 text-violet-700 border-violet-200';

                const modeTagColors = 
                  item.workMode === 'Remote' ? 'bg-amber-100/60 text-amber-700 border-amber-200/40' :
                  item.workMode === 'Hybrid' ? 'bg-teal-100/60 text-teal-700 border-teal-200/40' :
                  'bg-slate-100 text-slate-600 border-slate-200/40';

                const rateTagColors = 'bg-emerald-100/60 text-emerald-700 border-emerald-200/40';

                return (
                  <motion.div
                    layoutId={`job-card-${item.id}`}
                    key={item.id}
                    onClick={() => {
                      setActiveJobId(item.id);
                      setIsDetailDrawerOpen(true);
                    }}
                    className={`bg-white p-5 rounded-[22px] border transition-all cursor-pointer text-left flex flex-col justify-between h-64 hover:scale-102 hover:shadow-lg relative overflow-hidden group/card ${
                      isSelected 
                        ? 'border-blue-500 shadow-md ring-1 ring-blue-500/20' 
                        : 'border-[#E5E7EB]/50 shadow-2xs hover:border-slate-350'
                    }`}
                  >
                    {/* Top Row: Brand Logo circle + Heart Save Icon */}
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        {renderCompanyLogo(item.logoType, item.companyName)}
                        
                        <div className="leading-tight text-left max-w-[150px] truncate">
                          <h4 className="font-display font-extrabold text-[13.5px] text-slate-900 group-hover/card:text-blue-600 transition-colors truncate">
                            {item.title}
                          </h4>
                          <span className="text-[10px] text-slate-400 font-semibold tracking-tight block truncate mt-0.5">
                            {item.companyName} &bull; {item.applicantsCount || 10} Applicants
                          </span>
                        </div>
                      </div>

                      {/* Toggling Heart button */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSaveToggle(item.id);
                        }}
                        className={`p-1.5 rounded-full hover:bg-slate-50 transition-colors shrink-0 z-10`}
                      >
                        <Heart className={`h-4.5 w-4.5 transition-all ${
                          isSaved ? 'text-red-500 fill-red-500 scale-110' : 'text-slate-300 hover:text-slate-400'
                        }`} />
                      </button>
                    </div>

                    {/* Middle Tag Row Badges */}
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      <span className={`px-2.5 py-0.5 border text-[9.5px] font-bold rounded-full uppercase tracking-wide leading-none ${expTagColors}`}>
                        {expLevel}
                      </span>
                      <span className={`px-2.5 py-0.5 border text-[9.5px] font-bold rounded-full uppercase tracking-wide leading-none ${modeTagColors}`}>
                        {item.workMode}
                      </span>
                      <span className={`px-2.5 py-0.5 border text-[9.5px] font-bold rounded-full uppercase tracking-wide leading-none ${rateTagColors}`}>
                        {item.employmentType}
                      </span>
                    </div>

                    {/* Compact job short description */}
                    <p className="text-[11.5px] text-slate-500 font-medium line-clamp-2 leading-relaxed text-left pt-1">
                      {item.description}
                    </p>

                    {/* Bottom Footer Row: Price + clock */}
                    <div className="flex items-center justify-between border-t border-slate-50/80 pt-3 mt-1.5">
                      <strong className="text-base font-black text-slate-900 font-mono tracking-tight shrink-0">
                        {item.salary}
                      </strong>
                      
                      <div className="flex items-center gap-1 text-[10px] text-slate-400 font-semibold font-mono">
                        <Clock className="w-3.5 h-3.5 text-slate-350" />
                        <span>{item.postedTime || 'Posted 5 days ago'}</span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}

        </section>

      </div>

      {/* 4. DETAIL SIDE DRAWER (Enterprise-grade Vetting Desk) */}
      <AnimatePresence>
        {isDetailDrawerOpen && (
          <>
            {/* Dark glass backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.35 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDetailDrawerOpen(false)}
              className="fixed inset-0 bg-slate-900 z-45"
            />

            {/* Sliding Panel sheet */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 220 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-lg bg-white z-50 shadow-2xl p-6 overflow-y-auto border-l border-slate-205 flex flex-col justify-between"
            >
              <div className="space-y-6">
                
                {/* Drawer Header Navbar */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-[9.5px] font-mono font-bold text-blue-500 bg-blue-50 border border-blue-105 px-2 py-0.5 rounded uppercase leading-none">
                      {activeJob.id}
                    </span>
                    <strong className="text-xs text-slate-400 font-bold uppercase tracking-wider font-mono">Specification Details Panel</strong>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleShareRequirement}
                      className="p-1.5 hover:bg-slate-50 rounded-lg text-slate-450 hover:text-slate-800 transition-colors cursor-pointer"
                      title="Copy Job Link"
                    >
                      <Share2 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setIsDetailDrawerOpen(false)}
                      className="p-1 px-1.5 bg-slate-50 hover:bg-slate-100 text-slate-500 rounded-lg cursor-pointer font-bold"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Branded Job Logo + Title Display */}
                <div className="bg-slate-50/80 p-5 border border-slate-200/50 rounded-2xl text-left space-y-4">
                  <div className="flex items-start gap-3.5">
                    {renderCompanyLogo(activeJob.logoType, activeJob.companyName)}
                    <div className="leading-tight">
                      <span className="bg-blue-100/70 text-blue-700 text-[9px] font-black font-mono px-2 py-0.5 rounded uppercase tracking-wider">
                        {activeJob.primaryTech} Focus
                      </span>
                      <h3 className="text-base md:text-lg font-display font-black text-slate-900 tracking-tight block mt-1">
                        {activeJob.title}
                      </h3>
                      <p className="text-xs text-slate-500 font-bold mt-0.5">{activeJob.companyName} &bull; {activeJob.location}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-200/50 text-[11px] font-mono">
                    <div className="text-left">
                      <span className="text-[8px] text-slate-400 block uppercase font-bold tracking-wider">Mapping Agency / HR:</span>
                      <strong className="text-slate-850 font-extrabold">{activeJob.assignedClientOrVendor}</strong>
                    </div>
                    <div className="text-left">
                      <span className="text-[8px] text-slate-400 block uppercase font-bold tracking-wider">Financial Rate Index:</span>
                      <strong className="text-[#059669] font-black">{activeJob.salary}</strong>
                    </div>
                  </div>
                </div>

                {/* Status configuration controls */}
                <div className="bg-slate-50/80 p-4 rounded-xl border border-slate-100 text-left space-y-3">
                  <span className="text-[9.5px] font-mono font-bold text-blue-500 uppercase tracking-wider block">Workflow Controls & Publishing</span>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[8.5px] text-slate-405 font-mono uppercase font-bold tracking-wider block">Hiring Status</label>
                      <select 
                        value={activeJob.status}
                        onChange={(e) => handleStatusChange(e.target.value as any)}
                        className="bg-white border border-slate-200 text-xs font-bold rounded-lg p-2 filter-dropdown text-slate-800 outline-none block w-full outline-none focus:border-slate-800"
                      >
                        <option value="Draft">Draft</option>
                        <option value="Active">Active Sourcing</option>
                        <option value="On Hold">On Hold</option>
                        <option value="Closed">Closed</option>
                      </select>
                    </div>

                    <div className="space-y-1 select-none">
                      <label className="text-[8.5px] text-slate-405 font-mono uppercase font-bold tracking-wider block">Target Channel</label>
                      <div className="flex gap-2.5 items-center mt-2.5">
                        <label className="flex items-center gap-1.5 text-xs cursor-pointer font-semibold">
                          <input 
                            type="checkbox" 
                            checked={activeJob.postingChannels.internal}
                            onChange={() => handleChannelToggle('internal')}
                            className="rounded accent-blue-600 h-3.5 w-3.5"
                          />
                          <span>Internal</span>
                        </label>
                        <label className="flex items-center gap-1.5 text-xs cursor-pointer font-semibold">
                          <input 
                            type="checkbox" 
                            checked={activeJob.postingChannels.external}
                            onChange={() => handleChannelToggle('external')}
                            className="rounded accent-blue-600 h-3.5 w-3.5"
                          />
                          <span>External</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Full description JD */}
                <div className="p-4 bg-white border border-slate-200 p-4 rounded-2xl text-left text-xs leading-relaxed text-slate-700 whitespace-pre-wrap font-sans">
                  <strong className="text-[9.5px] font-mono font-bold text-slate-400 uppercase tracking-widest block border-b border-slate-100 pb-1 mb-2.5">
                    Job Specifications Description
                  </strong>
                  {activeJob.description}
                </div>

                {/* Sourcing AI Matchmaking profiles */}
                <div className="bg-blue-50/40 border border-blue-100/80 p-4 rounded-2xl space-y-3 text-left">
                  <div className="flex items-center justify-between pb-1 border-b border-blue-100">
                    <span className="text-[10px] font-mono font-bold text-blue-600 uppercase tracking-widest block flex items-center gap-1">
                      <Users className="h-3.5 w-3.5" />
                      <span>AI Matchmaker recommendations</span>
                    </span>
                    <span className="text-[10px] text-blue-600 font-bold font-mono">3 candidates matched</span>
                  </div>

                  <div className="space-y-2 text-xs">
                    {matchedCandidateProfiles.map((cand, idx) => {
                      const isApplied = appliedJobs.includes(activeJob.id);
                      return (
                        <div key={idx} className="bg-white p-3 border border-slate-150 rounded-xl flex items-center justify-between gap-3 text-slate-700">
                          <div className="space-y-0.5 leading-none">
                            <strong className="block text-slate-850 text-xs font-black">{cand.name}</strong>
                            <p className="text-[9.5px] font-semibold text-slate-400 font-mono mt-0.5">{cand.experience} Yrs Exp &bull; {cand.location}</p>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold font-mono px-2 py-0.5 rounded-full border border-emerald-100">
                              {cand.skillScore}% score
                            </span>

                            <button
                              type="button"
                              onClick={() => handleExecuteQuickApply(activeJob.id)}
                              disabled={isApplied}
                              className={`text-[10.5px] font-bold px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                                isApplied 
                                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-100 font-semibold'
                                  : 'bg-slate-900 border border-slate-900 hover:bg-slate-850 text-white'
                              }`}
                            >
                              {isApplied ? 'Sourced ✓' : 'Sift Apply'}
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Recruiter discuss thread log */}
                <div className="border-t border-slate-150 pt-4 space-y-3 text-left">
                  <span className="text-[10px] font-mono leading-none font-bold text-slate-400 tracking-wider uppercase block">
                    Commentary discussion log
                  </span>
                  
                  <div className="space-y-1.5 max-h-[160px] overflow-y-auto pr-1">
                    {(collaborationComments[activeJob.id] || []).length === 0 ? (
                      <p className="text-[10.5px] text-slate-350 italic">No notes pinned on this active vacancy spec yet.</p>
                    ) : (
                      (collaborationComments[activeJob.id] || []).map((notItem) => (
                        <div key={notItem.id} className="p-3 bg-slate-50 border border-slate-100 rounded-xl leading-relaxed text-xs">
                          <div className="flex items-center justify-between text-slate-400 font-bold font-mono text-[8.5px] uppercase">
                            <span>{notItem.author}</span>
                            <span>{notItem.time}</span>
                          </div>
                          <p className="text-slate-700 leading-relaxed mt-1 font-medium">{notItem.text}</p>
                        </div>
                      ))
                    )}
                  </div>

                  <form onSubmit={handlePostComment} className="flex gap-2">
                    <input 
                      type="text" 
                      placeholder="Discuss this vacancy internally..."
                      value={liveCommentText}
                      onChange={(e) => setLiveCommentText(e.target.value)}
                      className="flex-1 bg-slate-50 border border-slate-200 py-2 px-3 rounded-xl text-xs outline-none focus:bg-white text-slate-800 font-medium"
                    />
                    <button 
                      type="submit"
                      className="bg-blue-600 hover:bg-blue-750 text-white p-2.5 rounded-xl transition-colors cursor-pointer block shrink-0"
                    >
                      <Send className="h-3.5 w-3.5" />
                    </button>
                  </form>
                </div>

              </div>

              {/* Action Drawer Footer */}
              <div className="pt-6 border-t border-slate-150 flex gap-2.5 mt-6">
                <button
                  type="button"
                  onClick={() => handleSaveToggle(activeJob.id)}
                  className="flex-1 py-2.5 px-3 border border-slate-225 hover:bg-slate-50 rounded-xl text-xs font-bold text-slate-655 cursor-pointer text-center"
                >
                  {savedJobs.includes(activeJob.id) ? 'Favorite Pinned ✓' : 'Add to Favorites'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    handleExecuteQuickApply(activeJob.id);
                    setIsDetailDrawerOpen(false);
                  }}
                  className="flex-1 py-2.5 px-3 bg-slate-950 text-white text-xs font-bold rounded-xl text-center cursor-pointer hover:bg-slate-800"
                >
                  Sift Submit Profile
                </button>
              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* 5. JOB CREATION SPEC MODAL (Brings high fidelity dialog parameters) */}
      <AnimatePresence>
        {isCreatingJob && (
          <div className="fixed inset-0 z-55 flex items-center justify-center p-4">
            {/* backdrop filter overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.55 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-[#00203f]/70"
              onClick={() => setIsCreatingJob(false)}
            />

            <motion.form
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              onSubmit={handleCreateJobSubmit}
              className="bg-white rounded-[26px] border border-slate-200 max-w-lg w-full shadow-2xl relative z-10 overflow-hidden text-slate-850 p-6 space-y-4 text-left max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center gap-2 border-b border-slate-100 pb-3 justify-between">
                <div className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5 text-blue-600 animate-pulse" />
                  <div>
                    <h3 className="font-display font-extrabold text-slate-900 text-sm">Add Staff Sourcing Candidate Spec</h3>
                    <p className="text-[10px] text-slate-400">Deploy a fresh corporate requirement instantly</p>
                  </div>
                </div>
                <button 
                  type="button" 
                  onClick={() => setIsCreatingJob(false)}
                  className="p-1 px-1.5 hover:bg-slate-50 text-slate-400 hover:text-slate-600 rounded-lg text-xs"
                >
                  <X className="h-4.5 w-4.5" />
                </button>
              </div>

              <div className="space-y-3.5 text-xs">
                {/* Position Job Title */}
                <div className="space-y-1">
                  <label className="text-[9.5px] font-bold text-slate-450 uppercase tracking-wider block font-mono">Job Title / Role Name</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Senior Principal UI Designer"
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 py-1.5 px-3 rounded-xl font-semibold text-slate-900 outline-none focus:bg-white focus:border-blue-500 transition-colors"
                  />
                </div>

                {/* Company & Client Mapping */}
                <div className="grid grid-cols-2 gap-3.5">
                  <div className="space-y-1">
                    <label className="text-[9.5px] font-bold text-slate-455 uppercase tracking-wider block font-mono">Company / Spec Brand</label>
                    <input 
                      type="text" 
                      placeholder="e.g. MetaMask"
                      required
                      value={newCompany}
                      onChange={(e) => setNewCompany(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 py-1.5 px-3 rounded-xl font-semibold text-slate-900 outline-none focus:bg-white focus:border-blue-500 transition-colors"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9.5px] font-bold text-slate-455 uppercase tracking-wider block font-mono">Location & Bounds</label>
                    <input 
                      type="text" 
                      placeholder="Austin, TX (Remote)"
                      required
                      value={newLoc}
                      onChange={(e) => setNewLoc(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 py-1.5 px-3 rounded-xl font-semibold text-slate-900 outline-none focus:bg-white focus:border-blue-500 transition-colors"
                    />
                  </div>
                </div>

                {/* Priority, Visa and Terms limits */}
                <div className="grid grid-cols-3 gap-2.5 text-xs font-semibold">
                  <div className="space-y-1">
                    <label className="text-[8.5px] text-slate-400 font-mono uppercase tracking-wider block">Visa Constraint</label>
                    <select
                      value={newVisa}
                      onChange={(e) => setNewVisa(e.target.value as any)}
                      className="w-full bg-slate-50 border border-slate-200 p-1.5 rounded-xl outline-none focus:border-blue-550"
                    >
                      <option value="Any">Any Visa</option>
                      <option value="Citizen">US Citizen</option>
                      <option value="GC-EAD">Green Card/EAD</option>
                      <option value="H1B">H1B Sponsorship</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[8.5px] text-slate-400 font-mono uppercase tracking-wider block">Requirement Priority</label>
                    <select
                      value={newPriority}
                      onChange={(e) => setNewPriority(e.target.value as any)}
                      className="w-full bg-slate-50 border border-slate-200 p-1.5 rounded-xl outline-none focus:border-blue-550"
                    >
                      <option value="High">🔴 High Priority</option>
                      <option value="Medium">🟡 Medium</option>
                      <option value="Low">⚪ Low</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[8.5px] text-slate-400 font-mono uppercase tracking-wider block">Employment Mode</label>
                    <select
                      value={newType}
                      onChange={(e) => setNewType(e.target.value as any)}
                      className="w-full bg-slate-50 border border-slate-200 p-1.5 rounded-xl outline-none focus:border-blue-550"
                    >
                      <option value="Full-Time">Full-Time (W2)</option>
                      <option value="Contract">Project Contract</option>
                    </select>
                  </div>
                </div>

                {/* Sub-elements: Rate parameters + skills tags */}
                <div className="grid grid-cols-2 gap-3.5">
                  <div className="space-y-1">
                    <label className="text-[9.5px] font-bold text-slate-455 uppercase tracking-wider block font-mono">Rate Allocation</label>
                    <input 
                      type="text" 
                      placeholder="e.g. $250/hr"
                      required
                      value={newRate}
                      onChange={(e) => setNewRate(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 py-1.5 px-3 rounded-xl font-semibold text-slate-905 outline-none focus:bg-white focus:border-blue-500 transition-colors"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9.5px] font-bold text-slate-455 uppercase tracking-wider block font-mono">Vetted Primary Tech</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Figma, React, Go"
                      required
                      value={newSkillsInput}
                      onChange={(e) => setNewSkillsInput(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 py-1.5 px-3 rounded-xl font-semibold text-slate-905 outline-none focus:bg-white focus:border-blue-500 transition-colors"
                    />
                  </div>
                </div>

                {/* JD parameters with Copilot integration */}
                <div className="space-y-1.5 relative">
                  <div className="flex items-center justify-between">
                    <label className="text-[9.5px] font-bold text-slate-450 font-mono uppercase block">Requirement Details / JD Description</label>
                    <button
                      type="button"
                      onClick={handleTriggerAiDescription}
                      disabled={isAiGenerating}
                      className="text-[10px] text-blue-600 font-bold flex items-center gap-1.5 bg-blue-50 hover:bg-blue-100 border border-blue-105 px-2 py-0.5 rounded-lg transition-all"
                    >
                      {isAiGenerating ? (
                        <span className="h-3 w-3 border-2 border-blue-650 border-t-transparent rounded-full animate-spin block" />
                      ) : (
                        <>
                          <Sparkles className="h-3.5 w-3.5" />
                          <span>Copilot Auto-Generate Description</span>
                        </>
                      )}
                    </button>
                  </div>
                  <textarea 
                    placeholder="Provide bespoke candidate JD specs, or tap the Sourcing Copilot trigger above for zero-latency drafting."
                    rows={5}
                    value={newDesc}
                    onChange={(e) => setNewDesc(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl outline-none font-mono text-[10.5px] text-slate-800 leading-relaxed font-semibold placeholder:text-gray-400"
                  />
                </div>

              </div>

              <div className="pt-4 border-t border-slate-100 flex gap-2 justify-end">
                <button
                  type="button"
                  onClick={() => setIsCreatingJob(false)}
                  className="py-2 px-4 border border-slate-200 hover:bg-slate-50 rounded-xl font-bold text-slate-550 text-xs text-center cursor-pointer"
                >
                  Discard Spec
                </button>
                <button
                  type="submit"
                  className="py-2 px-4 bg-slate-900 text-white font-bold rounded-xl text-xs flex items-center justify-center cursor-pointer hover:bg-slate-800"
                >
                  Publish Branded Spec
                </button>
              </div>

            </motion.form>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}

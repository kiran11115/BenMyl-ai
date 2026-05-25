import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FileText, 
  FileCheck2, 
  ShieldCheck, 
  Sparkles, 
  Plus, 
  Search, 
  Eye, 
  Share2, 
  Printer, 
  ChevronRight, 
  Calculator, 
  AlertCircle, 
  RefreshCw, 
  Check,
  Building,
  UserCheck,
  Calendar,
  Lock,
  LockOpen,
  DollarSign
} from 'lucide-react';

interface RecruitmentContract {
  id: string;
  title: string;
  type: 'Client Agreement' | 'Vendor Agreement' | 'Offer Letter';
  clientName: string;
  vendorName?: string;
  candidateName?: string;
  payRate?: number; // Pay rate for contractor (e.g. $80/hr)
  billRate?: number; // Billing rate to Client (e.g. $110/hr)
  status: 'Draft' | 'Under Review' | 'HR Approved' | 'Signed' | 'Active' | 'Expired';
  signingAuthority: string;
  expiryDate: string;
  version: string;
  documentBody: string;
  clauses: { original: string; localized: string }[];
}

export default function ContractsScreen() {
  const [contracts, setContracts] = useState<RecruitmentContract[]>([
    {
      id: 'SOW-901',
      title: 'Master Service SOW - Staff React Architect',
      type: 'Client Agreement',
      clientName: 'Apex Capital Banking Systems',
      billRate: 120,
      payRate: 90,
      status: 'HR Approved',
      signingAuthority: 'Nolan Vasquez / Sarah Sterling',
      expiryDate: '2027-05-31',
      version: 'v1.2',
      documentBody: `STATEMENT OF WORK (SOW)

This Statement of Work ("SOW") is entered into pursuant to the Master Services Agreement between BenMyl Recruiting ("Provider") and Apex Capital Banking Systems ("Client").

1. SERVICES DESCRIPTION:
The Provider agrees to furnish Staff React Architectural consultancy services. Consultant Nolan Vasquez will lead high-performance component redesigns and coordinate checkout service integration under standard Agile sprints.

2. COMPENSATION RATE:
Client shall compensate Provider at the standard corporate bill rate of $120.00 per hour for all approved on-project service hours recorded on official time management sheets.

3. WORK PRODUCT / INTELLECTUAL PROPERTY:
All deliverables, interface visual codes, and specifications developed by Consultant under this engagement shall immediately become client property. Provider warrants strict SOC2 compliance adherence.`,
      clauses: [
        { original: 'SLA standard response timeline for engineer critical bugs: 2 hours flat.', localized: 'SLA response timeline localized: 4 hours (Apex dev server maintenance overlap allowed).' },
        { original: 'Termination for convenience notice window: 30 days written email.', localized: 'Termination for convenience notice window customized: 14 days flat (Rapid vendor support clause).' }
      ]
    },
    {
      id: 'VEN-202',
      title: 'C2C Vendor Agreement - Synapse DevOps',
      type: 'Vendor Agreement',
      clientName: 'CloudCore Technologies',
      vendorName: 'Synapse Sourcing',
      billRate: 110,
      payRate: 85,
      status: 'Active',
      signingAuthority: 'Marcus Vance / Jerry Miller',
      expiryDate: '2026-11-30',
      version: 'v2.0',
      documentBody: `VENDOR SERVICES COVENANT

This Covenant outlines C2C subcontractor sourcing provisions managed by Synapse Sourcing ("Vendor") on behalf of BenMyl clients.

1. SCOPE OF ENGAGEMENT:
Primary placement of DevOps architect consultant Clara Jenkins onto CloudCore cloud-scale replications.

2. FINANCIAL PAYMENT PROFILE:
Invoice settlement is restricted to Net-30 payment intervals originating from client approval stamps. Subcontractor payment is set at $85.00 per hour flat, maintaining clear statutory contractor compliance parameters.

3. INDEMNITY & LIABILITY INDICES:
Vendor agrees to fully hold harmless BenMyl Recruiting against direct contractor non-delivery, technical negligence, or unexcused premature engagement departure.`,
      clauses: [
        { original: 'Non-compete restrictive duration: 12 months from offboarding date.', localized: 'Non-compete duration reduced to 6 months to accommodate staffing velocity.' }
      ]
    },
    {
      id: 'OFR-503',
      title: 'Hiring Offer Letter - ML Lead Architect',
      type: 'Offer Letter',
      clientName: 'FinTech Integrators Corp',
      candidateName: 'Aiden Vance',
      payRate: 145000, // Annual Salary W2
      status: 'Draft',
      signingAuthority: 'Samantha Chen / Aiden Vance',
      expiryDate: '2026-06-15',
      version: 'v1.0',
      documentBody: `OFFER OF EMPLOYMENT

Aiden Vance ("Candidate"), we are delighted to extend our formal employment offer for the role of Machine Learning Lead Architect under W2 Permanent parameters.

1. REMUNERATION SCALE:
Your starting base annual package is designated at $145,000.00, disbursed in equal twice-monthly payroll operations, alongside complete executive health and equity package indices.

2. CONFIDENTIALITY ASSURANCES:
Candidate covenants to uphold total non-disclosure indices over core trade systems, AI weights, and user financial telemetry models.`,
      clauses: []
    }
  ]);

  const [activeContractId, setActiveContractId] = useState<string>('SOW-901');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTypeFilter, setSelectedTypeFilter] = useState<string>('All');

  // Interactive Digital Signature State
  const [showSignatureModal, setShowSignatureModal] = useState(false);
  const [typingSignature, setTypingSignature] = useState('');
  const [isSigningSubmitting, setIsSigningSubmitting] = useState(false);
  const [digitalHash, setDigitalHash] = useState<string | null>(null);

  // Margin Margin Calculator State
  const [calcBillRate, setCalcBillRate] = useState<number>(120);
  const [calcPayRate, setCalcPayRate] = useState<number>(90);

  // Dynamic side-by-side comparison clause index
  const [comparingLauses, setComparingLauses] = useState(false);

  // Create Contract Form State
  const [isCreatingModel, setIsCreatingModel] = useState(false);
  const [formTitle, setFormTitle] = useState('');
  const [formType, setFormType] = useState<'Client Agreement' | 'Vendor Agreement' | 'Offer Letter'>('Client Agreement');
  const [formClient, setFormClient] = useState('');
  const [formPayRate, setFormPayRate] = useState(85);
  const [formBillRate, setFormBillRate] = useState(110);
  const [formBody, setFormBody] = useState('');

  const activeContract = contracts.find(c => c.id === activeContractId) || contracts[0];

  const calculateMarginPercentage = (bill: number, pay: number) => {
    if (bill <= 0) return '0.0%';
    const margin = bill - pay;
    return `${((margin / bill) * 100).toFixed(1)}%`;
  };

  const handleCreateContractSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) return;

    const newContract: RecruitmentContract = {
      id: `${formType === 'Client Agreement' ? 'SOW' : formType === 'Vendor Agreement' ? 'VEN' : 'OFR'}-${Math.floor(600 + Math.random() * 300)}`,
      title: formTitle,
      type: formType,
      clientName: formClient,
      payRate: formPayRate,
      billRate: formBillRate,
      status: 'Draft',
      signingAuthority: `Lead Recruiter / ${formClient}`,
      expiryDate: '2027-12-31',
      version: 'v1.0',
      documentBody: formBody || `ELEGANT AGREEMENT TEMPLATE\n\n${formTitle}\n\n1. SCOPE:\nProvision of general talent staffing services for client ${formClient}.\n\n2. COMMERCIALS:\nInitial billing rate specified at $${formBillRate}.00 / hr with pay rate at $${formPayRate}.00 / hr.\n\n3. GENERAL TERMS:\nStrict confidential recruitment parameters apply. Fully SOC2 validated.`,
      clauses: []
    };

    setContracts(prev => [...prev, newContract]);
    setActiveContractId(newContract.id);
    setIsCreatingModel(false);
    
    // Reset Form fields
    setFormTitle('');
    setFormClient('');
    setFormBody('');
  };

  const handleExecuteEsignatureSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!typingSignature.trim()) return;

    setIsSigningSubmitting(true);
    setTimeout(() => {
      const generatedHash = `SHA256-${Math.random().toString(36).substring(2, 10).toUpperCase()}-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
      setDigitalHash(generatedHash);
      setIsSigningSubmitting(false);
      
      setContracts(prev => prev.map(item => {
        if (item.id === activeContract.id) {
          return {
            ...item,
            status: 'Active',
            documentBody: `${item.documentBody}\n\n=========================================\n✓ ELECTRONICALLY SIGNED SECURE\nSignee: ${typingSignature}\nDate: ${new Date().toLocaleDateString()}\nSha256 Token Hash Check: ${generatedHash}\nStatus: LICENSED & COMPLIANT CONTRACT\n=========================================`
          };
        }
        return item;
      }));

      setShowSignatureModal(false);
      setTypingSignature('');
    }, 1200);
  };

  const filteredContracts = contracts.filter(c => {
    const matchesSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          c.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedTypeFilter === 'All' || c.type === selectedTypeFilter;
    return matchesSearch && matchesType;
  });

  return (
    <div className="flex flex-col h-full bg-[#F5F7FB] select-text">
      
      {/* HEADER CONTROLS BAR */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4 shrink-0">
        <div>
          <div className="flex items-center gap-1 text-xs text-[#1e293b] font-semibold">
            <Lock className="h-3.5 w-3.5 text-slate-400" />
            <span>Secure Enterprise Contract SOW Repository</span>
          </div>
          <h2 className="text-2xl font-display font-bold text-slate-950 tracking-tight mt-0.5">
            Agreements & SOW Desk
          </h2>
          <p className="text-slate-500 text-xs">
            Review client SOW frameworks, track legal milestones, perform draft comparisons, and electronically sign placement documentations under full legal compliance.
          </p>
        </div>

        <button
          onClick={() => setIsCreatingModel(true)}
          className="bg-slate-900 hover:bg-slate-800 text-white py-2 px-4 rounded-xl text-xs font-bold shrink-0 transition-colors cursor-pointer flex items-center gap-1.5 shadow-sm"
        >
          <Plus className="h-4 w-4" />
          <span>Draft New Agreement</span>
        </button>
      </div>

      {/* CORE WORKSPACE PANEL GRID */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-5 overflow-hidden">
        
        {/* LEFT COLUMN: LIST OF AGREEMENTS & MARGIN CALCULATOR */}
        <div className="lg:col-span-4 flex flex-col gap-4 overflow-y-auto pr-1">
          
          {/* SEARCH & FILTERS CONTROLS */}
          <div className="bg-white p-3 rounded-2xl border border-slate-200/60 shadow-xs space-y-2.5 shrink-0">
            <div className="relative">
              <Search className="h-4 w-4 absolute left-3 top-2.5 text-slate-405 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search contract frameworks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 pl-9 pr-3 py-2 rounded-xl text-xs outline-none focus:bg-white text-slate-850"
              />
            </div>
            
            <div className="flex flex-wrap gap-1">
              {['All', 'Client Agreement', 'Vendor Agreement', 'Offer Letter'].map((typeKey) => (
                <button
                  key={typeKey}
                  onClick={() => setSelectedTypeFilter(typeKey)}
                  className={`px-2.5 py-1 text-[10px] rounded-lg border transition-all font-semibold cursor-pointer ${
                    selectedTypeFilter === typeKey 
                      ? 'bg-slate-900 text-white border-transparent shadow-2xs'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-500 border-slate-200'
                  }`}
                >
                  {typeKey === 'Client Agreement' ? 'SOWs' : typeKey === 'Vendor Agreement' ? 'C2Cs' : typeKey === 'Offer Letter' ? 'Offers' : 'All'}
                </button>
              ))}
            </div>
          </div>

          {/* CONTRACTS SUBMISSION QUEUE */}
          <div className="space-y-2.5">
            <span className="text-[9px] font-mono leading-none font-bold text-slate-400 tracking-wider uppercase block text-left">
              Archived Legal Agreements ({filteredContracts.length})
            </span>

            {filteredContracts.length === 0 ? (
              <div className="bg-white/50 border border-slate-200 rounded-2xl p-6 text-center">
                <p className="text-[11px] text-slate-400">No matching legally-binding agreements saved.</p>
              </div>
            ) : (
              filteredContracts.map((item) => {
                const isActive = item.id === activeContract.id;
                
                const statusColor = 
                  item.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                  item.status === 'Signed' ? 'bg-teal-50 text-teal-700 border-teal-100' :
                  item.status === 'HR Approved' ? 'bg-[#6264A7]/10 text-[#6264A7] border-[#6264A7]/20' :
                  item.status === 'Under Review' ? 'bg-amber-50 text-amber-700 border-amber-100' :
                  item.status === 'Expired' ? 'bg-rose-50 text-rose-700 border-rose-100' :
                  'bg-slate-50 text-slate-500 border-slate-200';

                return (
                  <div
                    key={item.id}
                    onClick={() => setActiveContractId(item.id)}
                    className={`bg-white p-4 rounded-2xl border transition-all cursor-pointer text-left select-none space-y-3.5 shadow-2xs hover:shadow-xs ${
                      isActive 
                        ? 'border-slate-900 ring-1 ring-slate-900/30 scale-[1.002]'
                        : 'border-slate-200/60 hover:border-slate-350'
                    }`}
                  >
                    <div className="flex items-center justify-between pointer-events-none">
                      <div className="flex items-center gap-1.5 font-mono text-[10px] font-bold">
                        <FileText className="h-3.5 w-3.5 text-slate-400" />
                        <span className="text-slate-800">{item.id}</span>
                        <span className="text-slate-300">•</span>
                        <span className="text-slate-400 font-medium">{item.version}</span>
                      </div>
                      <span className={`px-2 py-0.5 border text-[9px] font-mono font-bold uppercase rounded-md ${statusColor}`}>
                        {item.status}
                      </span>
                    </div>

                    <div className="space-y-0.5 pointer-events-none">
                      <h4 className="font-display font-extrabold text-xs text-slate-900 line-clamp-1">{item.title}</h4>
                      <p className="text-[10.5px] text-slate-500 flex items-center gap-1 py-0.5">
                        <Building className="h-3 w-3 text-slate-400 shrink-0" />
                        <span className="truncate">Client: {item.clientName}</span>
                      </p>
                    </div>

                    {/* Financial rate breakdown in ClickUp style footer block */}
                    {item.billRate && item.payRate && (
                      <div className="grid grid-cols-3 gap-1 Bg-slate-50 bg-slate-50/50 p-2 rounded-xl text-[10px] border border-slate-100 font-sans pointer-events-none">
                        <div>
                          <span className="text-[8px] text-slate-400 uppercase font-mono block">Bill Rate</span>
                          <strong className="text-slate-800 font-extrabold">${item.billRate}/hr</strong>
                        </div>
                        <div>
                          <span className="text-[8px] text-slate-400 uppercase font-mono block">Pay Rate</span>
                          <strong className="text-slate-800 font-extrabold">${item.payRate}/hr</strong>
                        </div>
                        <div>
                          <span className="text-[8px] text-slate-400 uppercase font-mono block">Gross Margin</span>
                          <strong className="text-emerald-700 font-extrabold">{calculateMarginPercentage(item.billRate, item.payRate)}</strong>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>

          {/* DYNAMIC GROSS MARGIN CALCULATOR WIDGET */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200/60 shadow-xs text-left space-y-3 shrink-0">
            <span className="text-[9px] font-mono font-bold text-slate-450 text-slate-400 uppercase tracking-widest block flex items-center gap-1 border-b border-slate-100 pb-1.5">
              <Calculator className="h-3.5 w-3.5 text-slate-800" />
              <span>Sourcing Gross Margin Calculator</span>
            </span>

            <div className="space-y-2.5 text-xs text-slate-650">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[9.5px] font-bold text-slate-450 text-slate-400 uppercase tracking-wider block font-mono">Client Hourly Bill ($)</label>
                  <div className="relative">
                    <span className="absolute left-2.5 top-1.5 text-slate-400 text-xs">$</span>
                    <input 
                      type="number" 
                      value={calcBillRate}
                      onChange={(e) => setCalcBillRate(parseFloat(e.target.value) || 0)}
                      className="w-full bg-slate-50 border border-slate-200 pl-6 pr-2 py-1.5 rounded-lg text-xs outline-none font-bold text-slate-850"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[9.5px] font-bold text-slate-450 text-slate-400 uppercase tracking-wider block font-mono">Consultant Pay ($)</label>
                  <div className="relative">
                    <span className="absolute left-2.5 top-1.5 text-slate-400 text-xs">$</span>
                    <input 
                      type="number" 
                      value={calcPayRate}
                      onChange={(e) => setCalcPayRate(parseFloat(e.target.value) || 0)}
                      className="w-full bg-slate-50 border border-slate-200 pl-6 pr-2 py-1.5 rounded-lg text-xs outline-none font-bold text-slate-850"
                    />
                  </div>
                </div>
              </div>

              {/* Dynamic margins visual display strip */}
              <div className="p-3 bg-slate-900 text-white rounded-xl flex items-center justify-between">
                <div>
                  <span className="text-[8px] text-slate-400 uppercase font-mono block">Gross Margin Percentage</span>
                  <strong className="text-xl font-display font-extrabold tracking-tight text-white">
                    {calculateMarginPercentage(calcBillRate, calcPayRate)}
                  </strong>
                </div>

                <div className="text-right">
                  <span className="text-[8px] text-slate-400 uppercase font-mono block">Net Margin Spread</span>
                  <strong className="text-lg font-display font-bold text-emerald-400">
                    +${(calcBillRate - calcPayRate).toFixed(1)}/hr
                  </strong>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* MIDDLE COLUMN: MODERN LEGAL DOCUMENT VIEWER */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200/60 shadow-xs flex flex-col justify-between overflow-hidden">
          
          {/* Document actions subheader */}
          <div className="p-4 border-b border-slate-100 flex items-center justify-between shrink-0">
            <div className="text-left">
              <span className="text-[8.5px] text-slate-400 font-mono font-bold uppercase tracking-widest block">Active Legal Frame View</span>
              <strong className="text-xs font-bold text-slate-850 truncate block max-w-[200px]">{activeContract.title}</strong>
            </div>

            <div className="flex items-center gap-1.5">
              <button 
                onClick={() => setComparingLauses(!comparingLauses)}
                className={`py-1.5 px-2.5 border rounded-lg text-[10px] font-bold transition-all cursor-pointer flex items-center gap-1 ${
                  comparingLauses 
                    ? 'bg-slate-900 border-slate-900 text-white' 
                    : 'bg-white hover:bg-slate-50 text-slate-650 border-slate-200'
                }`}
              >
                <RefreshCw className="h-3 w-3 shrink-0" />
                <span>Original Comparison</span>
              </button>

              <button 
                onClick={() => window.print()}
                className="p-1.5 border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 rounded-lg cursor-pointer"
                title="Print contract sheet"
              >
                <Printer className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* ACTIVE DOCUMENT LEGAL PAPER */}
          <div className="flex-1 overflow-y-auto bg-slate-100 p-6 flex justify-center items-start">
            <div className="w-full max-w-2xl bg-white p-8 md:p-10 rounded-xs border border-slate-300 shadow-sm relative font-serif text-slate-800 text-[11.5px] leading-relaxed select-text tracking-wide whitespace-pre-wrap min-h-[550px] overflow-hidden text-left">
              
              {/* Drafting watermarks block */}
              {activeContract.status === 'Draft' && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none text-rose-500/10 font-mono font-extrabold text-5xl uppercase tracking-widest rotate-[35deg]">
                  DRAFT SPECIFICATION
                </div>
              )}
              {activeContract.status === 'HR Approved' && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none text-[#6264A7]/5 font-mono font-extrabold text-4xl uppercase tracking-widest rotate-[35deg]">
                  HR LEGAL CLEARANCE
                </div>
              )}
              {activeContract.status === 'Active' && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none text-emerald-500/10 font-mono font-extrabold text-5xl uppercase tracking-widest rotate-[35deg]">
                  LICENSED & COMPLIANT
                </div>
              )}

              {/* Document emblem decorative header block */}
              <div className="border-b-2 border-double border-slate-400 pb-5 mb-6 text-center">
                <h3 className="font-sans font-black text-slate-900 uppercase tracking-widest text-base">BENMYL CORE RECRUITMENT SERVICES</h3>
                <span className="text-[8px] font-mono text-slate-400 uppercase tracking-widest font-bold">Standard Regulatory Sourcing Covenant</span>
              </div>

              {/* Body */}
              {activeContract.documentBody}

            </div>
          </div>

          {/* ELECTRONIC SIGNATURE ENGAGEMENT CALL (LOWER DRAWER CONTROLLER) */}
          <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 shrink-0 text-left">
            <div className="space-y-1 text-left">
              <strong className="text-xs font-bold text-slate-850 block">Approval Signing Signatures Milestone</strong>
              <p className="text-[10px] text-slate-400 max-w-xs leading-normal font-sans">
                {activeContract.status === 'Active' 
                  ? 'This document has finalized client electronic credentials and is fully active.'
                  : 'Requires validation trigger. Recruiter digital authorization can push to fully signed on client DB.'}
              </p>
            </div>

            {activeContract.status !== 'Active' && activeContract.status !== 'Signed' ? (
              <button
                onClick={() => {
                  setTypingSignature('');
                  setShowSignatureModal(true);
                }}
                className="bg-slate-900 hover:bg-slate-800 text-white font-bold py-2 px-4 rounded-xl text-xs transition-all cursor-pointer flex items-center justify-center gap-1.5"
                title="Execute Signatures"
              >
                <LockOpen className="h-4 w-4 text-emerald-400" />
                <span>Sign Digitally Now</span>
              </button>
            ) : (
              <div className="flex items-center gap-1.5 self-end sm:self-center">
                <span className="bg-emerald-50 border border-emerald-250 text-emerald-800 rounded-xl px-3 py-1.5 text-xs font-bold flex items-center gap-1 leading-none shadow-xs">
                  <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>Secure Signed Compliant</span>
                </span>
              </div>
            )}
          </div>

        </div>

        {/* RIGHT COLUMN: AI CONTRACT SUMMARY & APP COGNITIVE LOGS SCREEN */}
        <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200/60 shadow-xs p-4 flex flex-col justify-between overflow-y-auto">
          
          <div className="space-y-4">
            
            {/* AI Summarizer Title */}
            <div className="flex items-center gap-2 border-b border-slate-100 pb-2 text-left">
              <Sparkles className="h-4.5 w-4.5 text-slate-850 animate-pulse" />
              <div>
                <strong className="font-display font-extrabold text-xs text-slate-900 block">AI Lease & Lease Sourcing Summary</strong>
                <span className="text-[9px] font-mono text-slate-400 font-bold uppercase block">Agreement Analyzer Autopilot</span>
              </div>
            </div>

            {/* Standard Metrics Extractor */}
            <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl text-left space-y-2 text-xs text-slate-650 leading-relaxed font-sans">
              <p className="font-mono font-bold text-[9px] text-slate-800 uppercase block">Analysis extraction tokens:</p>
              <p>• <strong>Primary Partner Entity:</strong> {activeContract.clientName}</p>
              {activeContract.vendorName && <p>• <strong>C2C Vendor Subcontract:</strong> {activeContract.vendorName}</p>}
              {activeContract.candidateName && <p>• <strong>Intended Candidate target:</strong> {activeContract.candidateName}</p>}
              <p>• <strong>Expiration Coherence:</strong> {activeContract.expiryDate} (Reminders active)</p>
              <p>• <strong>Security Verification Status:</strong> fully cleared</p>
            </div>

            {/* Side-by-Side original Template clauses comparative review */}
            {comparingLauses && (
              <div className="space-y-3.5 text-left text-xs bg-[#6264A7]/5 border border-[#6264A7]/15 p-3 rounded-xl">
                <span className="text-[9px] font-mono font-bold text-[#6264A7] uppercase tracking-wider block">Side-by-Side Clause Reconciler</span>
                
                {activeContract.clauses.length === 0 ? (
                  <p className="text-[9.5px] italic text-slate-400 leading-normal">This agreement has direct standard-templated sections with zero customized clause rewrites.</p>
                ) : (
                  activeContract.clauses.map((clauseObj, clIdx) => (
                    <div key={clIdx} className="space-y-1 border-b border-indigo-100/50 pb-2 last:border-none last:pb-0">
                      <div>
                        <span className="text-[8px] font-mono font-bold text-slate-400 uppercase block">Standard Original:</span>
                        <p className="text-[9px] text-slate-500 italic">"{clauseObj.original}"</p>
                      </div>
                      <div>
                        <span className="text-[8px] font-mono font-bold text-[#6264A7] uppercase block">Customized & Localized:</span>
                        <p className="text-[9.5px] text-slate-800 font-semibold leading-snug">"{clauseObj.localized}"</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Approval Milestones Timeline */}
            <div className="space-y-2.5 text-left">
              <strong className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wider block">Approval Status Milestone Trace</strong>
              
              <div className="space-y-2.5 relative border-l border-slate-200 pl-3 ml-2 text-xs font-sans">
                <div className="relative">
                  <span className="absolute -left-5 top-1 h-3.5 w-3.5 rounded-full bg-emerald-500 border-4 border-white flex items-center justify-center" />
                  <strong className="text-slate-800 text-[10.5px] block font-semibold leading-none">Draft Initialized</strong>
                  <span className="text-[9px] text-slate-400 font-mono tracking-normal leading-normal">System Template • v1.0</span>
                </div>

                <div className="relative">
                  <span className={`absolute -left-5 top-1 h-3.5 w-3.5 rounded-full border-4 border-white flex items-center justify-center ${
                    ['HR Approved', 'Signed', 'Active'].includes(activeContract.status) ? 'bg-emerald-500' : 'bg-slate-300'
                  }`} />
                  <strong className="text-slate-800 text-[10.5px] block font-semibold leading-none">HR Legal Signoff</strong>
                  <span className="text-[9px] text-slate-400 font-mono tracking-normal leading-normal">Verified by Sarah Sterling</span>
                </div>

                <div className="relative">
                  <span className={`absolute -left-5 top-1 h-3.5 w-3.5 rounded-full border-4 border-white flex items-center justify-center ${
                    ['Signed', 'Active'].includes(activeContract.status) ? 'bg-emerald-500' : 'bg-slate-300'
                  }`} />
                  <strong className="text-slate-800 text-[10.5px] block font-semibold leading-none">Mutual electronic Signatures</strong>
                  <span className="text-[9px] text-slate-400 font-mono tracking-normal leading-normal">Recipient validated payload</span>
                </div>
              </div>
            </div>

          </div>

          {/* GDPR Legal notices and reminders at page margin */}
          <div className="mt-4 p-3 bg-slate-50 border border-slate-100 rounded-xl text-[9px] font-mono text-slate-445 leading-normal text-center">
            🔔 <strong>Reminders:</strong> Automatic renewal notifications will post 60-days before expirations securely.
          </div>

        </div>

      </div>

      {/* CREATE BRAND NEW AGREEMENT SPECIFICATION MODAL */}
      <AnimatePresence>
        {isCreatingModel && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl border border-slate-250 shadow-2xl p-6 max-w-lg w-full relative space-y-4 text-left"
            >
              <button 
                onClick={() => setIsCreatingModel(false)}
                className="absolute top-4 right-4 p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-750 transition-colors text-xs font-mono font-bold font-mono"
              >
                X
              </button>

              <div className="flex items-center gap-2 pb-1 border-b border-slate-100">
                <FileText className="h-5 w-5 text-slate-800" />
                <div>
                  <h4 className="font-display font-extrabold text-slate-900 text-sm">Draft New Sourcing Agreement SOW</h4>
                  <p className="text-[10px] text-slate-400">Initialize contract terms, pay/bill rates and generate dynamic templates</p>
                </div>
              </div>

              <form onSubmit={handleCreateContractSubmit} className="space-y-3.5 text-xs font-sans">
                {/* Title */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block font-mono">Agreement Title</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Master SOW - Senior Django Placement"
                    required
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-205 py-1.5 px-3 rounded-xl outline-none font-semibold text-slate-800"
                  />
                </div>

                {/* Type & Client Mappings */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block font-mono">Agreement Category Type</label>
                    <select 
                      value={formType}
                      onChange={(e) => setFormType(e.target.value as any)}
                      className="w-full bg-slate-50 border border-slate-205 p-2 rounded-xl outline-none font-semibold text-slate-800"
                    >
                      <option value="Client Agreement">SOW (Client Agreement)</option>
                      <option value="Vendor Agreement">C2C Agreement (Vendor)</option>
                      <option value="Offer Letter">Hiring Offer Letter</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block font-mono">Primary Partner Entity Client</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Apex Banking Systems"
                      value={formClient}
                      required
                      onChange={(e) => setFormClient(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-205 p-1.5 rounded-xl outline-none font-semibold text-slate-800"
                    />
                  </div>
                </div>

                {/* Rate details controls */}
                <div className="grid grid-cols-2 gap-3 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-[#6264A7] uppercase tracking-wider block font-mono">Suggested Bill Rate ($/hr)</label>
                    <input 
                      type="number"
                      value={formBillRate}
                      onChange={(e) => setFormBillRate(parseInt(e.target.value) || 0)}
                      className="w-full bg-white border border-slate-200 p-1.5 rounded-lg text-xs font-bold text-slate-800"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-[#6264A7] uppercase tracking-wider block font-mono">Suggested pay Rate ($/hr)</label>
                    <input 
                      type="number"
                      value={formPayRate}
                      onChange={(e) => setFormPayRate(parseInt(e.target.value) || 0)}
                      className="w-full bg-white border border-slate-200 p-1.5 rounded-lg text-xs font-bold text-slate-800"
                    />
                  </div>
                </div>

                {/* Custom Body drafting */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase block font-mono">Localized Terms Framework Text Body (Optional)</label>
                  <textarea 
                    placeholder="If empty, standard SOC2 validated enterprise covenants will auto populate on the paper sheet..."
                    rows={4}
                    value={formBody}
                    onChange={(e) => setFormBody(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-205 p-2 rounded-xl outline-none font-medium text-slate-800"
                  />
                </div>

                {/* Submit button controls */}
                <div className="grid grid-cols-2 gap-2.5 pt-3">
                  <button
                    type="button"
                    onClick={() => setIsCreatingModel(false)}
                    className="py-2.5 px-3 border border-slate-205 hover:bg-slate-50 rounded-xl text-xs font-bold text-slate-650 cursor-pointer text-center"
                  >
                    Discard Draft
                  </button>
                  <button
                    type="submit"
                    className="py-2.5 px-3 bg-slate-900 text-white font-bold rounded-xl text-xs flex items-center justify-center cursor-pointer hover:bg-slate-800 transition-colors"
                  >
                    <span>Commit Agreement</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* SECURE DIGITAL INTEGRITY ESIGNATURE SIGNING DIALOG FLOATING MODAL OVERLAY */}
      <AnimatePresence>
        {showSignatureModal && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="bg-white rounded-3xl border border-slate-250 shadow-2xl p-6 max-w-sm w-full text-left space-y-4"
            >
              <div className="flex items-center gap-2 pb-1 border-b border-slate-100">
                <FileCheck2 className="h-5 w-5 text-emerald-600" />
                <div>
                  <h4 className="font-display font-extrabold text-slate-900 text-sm">Legal Electronic E-Sign Desk</h4>
                  <p className="text-[10px] text-slate-400 font-sans">Authorize placement terms of {activeContract.id} securely</p>
                </div>
              </div>

              <form onSubmit={handleExecuteEsignatureSubmit} className="space-y-3.5 text-xs text-left">
                <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl text-slate-600 font-sans leading-relaxed text-[10.5px]">
                  By signing, you warrant full compliance with state independent contractor laws and authorize regulatory payment channels matching specified details.
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-450 text-slate-400 uppercase tracking-widest block font-mono">Type Authorized Full Name Signature</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Sarah Sterling"
                    required
                    value={typingSignature}
                    onChange={(e) => setTypingSignature(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-205 py-2 px-3 rounded-xl font-serif text-sm font-extrabold text-center tracking-wide outline-none text-slate-900 focus:bg-white"
                  />
                  <span className="text-[8.5px] text-slate-400 font-mono tracking-normal block text-center mt-1">
                    Matches standard legal visual typography cursive scripts
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2.5 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowSignatureModal(false)}
                    className="py-2.5 px-3 border border-slate-210 rounded-xl hover:bg-slate-50 font-bold text-slate-600 text-center cursor-pointer"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={isSigningSubmitting}
                    className="py-2.5 px-3 bg-[#10b981] hover:bg-[#059669] text-white font-extrabold rounded-xl flex items-center justify-center cursor-pointer transition-colors"
                  >
                    {isSigningSubmitting ? (
                      <span className="h-3 w-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <span>Sign Securing</span>
                    )}
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

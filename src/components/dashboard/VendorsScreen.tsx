/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Building, 
  Search, 
  Sparkles, 
  Cpu, 
  MapPin, 
  TrendingUp, 
  PhoneCall, 
  MessageSquare, 
  Activity, 
  Layers,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Clock
} from 'lucide-react';

interface Vendor {
  id: string;
  name: string;
  category: 'Full-Service IT' | 'Staffing Prime' | 'Direct Recruiter Agency' | 'Niche Tech';
  contactPerson: string;
  email: string;
  trustScore: number;
  latencyMin: number; // Avg response latency in minutes
  activeRequirements: number;
  totalSubmissions: number;
  location: string;
  phone: string;
  notes: string;
}

export default function VendorsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVendorCategory, setSelectedVendorCategory] = useState('All');
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);

  const [vendors, setVendors] = useState<Vendor[]>([
    { id: 'VND-2001', name: 'Synapse Tech Sourcing', category: 'Full-Service IT', contactPerson: 'Aris Thorne', email: 'a.thorne@synapsetech.co', trustScore: 98, latencyMin: 14, activeRequirements: 12, totalSubmissions: 310, location: 'San Francisco, CA', phone: '+1 (415) 0184', notes: 'Core tier-1 vendor providing vetted DevOps and AWS engineering specialists. Extremely compliant latency rating.' },
    { id: 'VND-2002', name: 'NextGen Staffing Integrators', category: 'Staffing Prime', contactPerson: 'Sarah Jenkins', email: 'sarah.j@nextgenstaff.org', trustScore: 94, latencyMin: 22, activeRequirements: 8, totalSubmissions: 148, location: 'Dallas, TX', phone: '+1 (214) 0492', notes: 'Specializes in high volume sourcing of Java and Database engineers. Fast track screening pipeline.' },
    { id: 'VND-2003', name: 'Pacific Tech Consultants', category: 'Niche Tech', contactPerson: 'Yuki Moria', email: 'y.moria@pacifictech.co.jp', trustScore: 89, latencyMin: 45, activeRequirements: 5, totalSubmissions: 92, location: 'Seattle, WA', phone: '+1 (206) 0391', notes: 'Japan-US bilingual engineering staff focus. Excellent vetting procedures.' },
    { id: 'VND-2004', name: 'Apex Talent Consortium', category: 'Direct Recruiter Agency', contactPerson: 'Markus Vance', email: 'm.vance@apextalent.net', trustScore: 82, latencyMin: 58, activeRequirements: 9, totalSubmissions: 110, location: 'New York, NY', phone: '+1 (646) 0281', notes: 'Generalist recruitment group supporting marketing, finance and tech positions.' },
    { id: 'VND-2005', name: 'Stellar Tech Bench', category: 'Niche Tech', contactPerson: 'Danielle Cooper', email: 'd.coop@stellartech.io', trustScore: 76, latencyMin: 110, activeRequirements: 2, totalSubmissions: 24, location: 'Boston, MA', phone: '+1 (617) 0914', notes: 'Small scale niche staffing. Highly selective, slightly longer response cycles.' }
  ]);

  const filteredVendors = vendors.filter(v => {
    const matchesSearch = v.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          v.contactPerson.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          v.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCat = selectedVendorCategory === 'All' || v.category === selectedVendorCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-6 pb-12 relative">
      
      {/* Title block */}
      <div>
        <h2 className="text-xl font-display font-bold text-slate-900">Premium Vendor Directorate</h2>
        <p className="text-slate-400 text-xs">Analyze vendor Trust scores, active requirement submissions, and communication latency tracking matrices</p>
      </div>

      {/* Directory filters & Grid setup */}
      <div className="bg-white rounded-2xl border border-slate-200/60 p-4 shadow-sm space-y-4">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-xl text-xs focus:border-indigo-500 focus:ring-1 focus:ring-indigo-100 outline-none transition-all placeholder:text-slate-400"
              placeholder="Search vendor directory by vendor name, representative, or voucher ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            <SensibleFilterButton label="All Categories" active={selectedVendorCategory === 'All'} onClick={() => setSelectedVendorCategory('All')} />
            <SensibleFilterButton label="Full-Service IT" active={selectedVendorCategory === 'Full-Service IT'} onClick={() => setSelectedVendorCategory('Full-Service IT')} />
            <SensibleFilterButton label="Staffing Prime" active={selectedVendorCategory === 'Staffing Prime'} onClick={() => setSelectedVendorCategory('Staffing Prime')} />
            <SensibleFilterButton label="Niche Tech" active={selectedVendorCategory === 'Niche Tech'} onClick={() => setSelectedVendorCategory('Niche Tech')} />
          </div>
        </div>

        {/* Vendors visual cards grid list */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredVendors.map((vnd) => (
            <div 
              key={vnd.id} 
              onClick={() => setSelectedVendor(vnd)}
              className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col justify-between h-[230px] hover:shadow-md hover:border-indigo-100 transition-all cursor-pointer group"
            >
              <div className="space-y-3">
                <div className="flex justify-between items-start gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="h-9 w-9 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 flex items-center justify-center font-bold text-xs shrink-0">
                      <Building className="h-4.5 w-4.5 text-indigo-500" />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-xs text-slate-900 group-hover:text-indigo-650 transition-colors leading-tight">{vnd.name}</h4>
                      <span className="text-[9px] text-slate-400 font-mono tracking-wide">{vnd.category} • {vnd.id}</span>
                    </div>
                  </div>

                  <span className={`text-[9px] font-bold px-1.5 py-0.5 border rounded-full font-mono shrink-0 select-none ${
                    vnd.trustScore >= 90 
                      ? 'bg-emerald-50 text-emerald-600 border-emerald-100' 
                      : vnd.trustScore >= 80 
                      ? 'bg-indigo-50 text-indigo-650 border-indigo-120'
                      : 'bg-amber-50 text-amber-600 border-amber-100'
                  }`}>
                    🛡️ {vnd.trustScore}%
                  </span>
                </div>

                <div className="space-y-1 text-xs">
                  <p className="text-slate-500 font-sans text-[11px] leading-relaxed line-clamp-2">
                    {vnd.notes}
                  </p>
                </div>
              </div>

              {/* Grid stat blocks */}
              <div className="border-t border-slate-100 pt-3 flex items-center justify-between text-[10px] font-mono">
                <div className="flex items-center gap-1 text-slate-450">
                  <Clock className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                  <span>{vnd.latencyMin}m Avg Latency</span>
                </div>

                <span className="text-indigo-650 font-bold bg-indigo-50/70 px-1.5 py-0.5 rounded uppercase">
                  {vnd.activeRequirements} Req Active
                </span>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Vendor Profile dialog slide out */}
      <AnimatePresence>
        {selectedVendor && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.25 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedVendor(null)}
              className="fixed inset-0 bg-slate-900 z-40 cursor-pointer"
            />
            
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 220 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white border-l border-slate-200 shadow-2xl z-50 p-6 flex flex-col justify-between overflow-y-auto"
            >
              <div className="space-y-6">
                
                {/* Drawer Header */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <span className="text-[10px] font-mono tracking-widest text-slate-400 font-bold uppercase">Vendor Audit Spec</span>
                  <button 
                    onClick={() => setSelectedVendor(null)}
                    className="p-1 px-3 rounded bg-slate-50 hover:bg-slate-100 text-slate-450 hover:text-slate-650 text-xs font-semibold cursor-pointer"
                  >
                    Close Drawer
                  </button>
                </div>

                {/* Profile Identity info */}
                <div className="flex items-center gap-4">
                  <div className="h-14 w-14 rounded-2xl bg-indigo-50 border border-indigo-120 text-indigo-700 flex items-center justify-center shrink-0">
                    <Building className="h-7 w-7" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-base text-slate-950 leading-tight">{selectedVendor.name}</h3>
                    <div className="flex items-center gap-1.5 mt-1 font-mono text-[10px]">
                      <span className="text-slate-400">{selectedVendor.id}</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                      <span className="text-indigo-650 font-bold uppercase">{selectedVendor.category}</span>
                    </div>
                  </div>
                </div>

                {/* Performance Analytics Dashboard */}
                <div className="bg-slate-50 border border-slate-150 rounded-xl p-4 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-200/50 pb-2">
                    <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">Sourcing Conversion Rates</span>
                    <span className="text-xs font-bold text-emerald-600 font-mono">Tier-1 Qualified</span>
                  </div>

                  <div className="grid grid-cols-2 gap-3.5 font-sans leading-tight">
                    <div>
                      <span className="text-[10px] text-slate-400 block pb-0.5 font-medium">Aggregated Subs:</span>
                      <strong className="text-xs text-slate-800 font-semibold">{selectedVendor.totalSubmissions} CVs Sourced</strong>
                    </div>

                    <div>
                      <span className="text-[10px] text-slate-400 block pb-0.5 font-medium">Avg Latency Sourcing:</span>
                      <strong className="text-xs text-indigo-650 font-semibold">{selectedVendor.latencyMin} Minutes response</strong>
                    </div>
                  </div>

                  <div className="pt-2">
                    <div className="flex items-center justify-between text-[10px] font-mono font-semibold text-indigo-900 pb-1">
                      <span>Trust Calibration Score</span>
                      <span>{selectedVendor.trustScore}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-indigo-600 rounded-full" style={{ width: `${selectedVendor.trustScore}%` }} />
                    </div>
                  </div>
                </div>

                {/* About Notes metadata */}
                <div className="space-y-2">
                  <h5 className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">Administrative vetting notes</h5>
                  <p className="text-xs leading-relaxed text-slate-650 bg-slate-50/50 p-3 rounded-lg border border-slate-150 font-sans">
                    {selectedVendor.notes}
                  </p>
                </div>

                {/* Representative details */}
                <div className="space-y-2.5">
                  <h5 className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">Authorized Contact Person</h5>
                  <div className="p-3 border border-slate-100 rounded-xl space-y-1.5 text-xs text-slate-700">
                    <strong className="font-semibold">{selectedVendor.contactPerson}</strong>
                    <span className="block text-slate-400 font-mono text-[10px]">{selectedVendor.email} • {selectedVendor.phone}</span>
                  </div>
                </div>

              </div>

              {/* Action buttons */}
              <div className="border-t border-slate-150 pt-4 flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    const changedScore = Math.min(100, selectedVendor.trustScore + 2);
                    setVendors(prev => prev.map(v => v.id === selectedVendor.id ? { ...v, trustScore: changedScore } : v));
                    setSelectedVendor(v => v ? { ...v, trustScore: changedScore } : null);
                  }}
                  className="flex-1 py-2 text-center bg-indigo-50 hover:bg-indigo-100 text-indigo-650 rounded-xl text-xs font-semibold cursor-pointer border border-indigo-150"
                >
                  Increment Vetting Trust
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
}

// Simple filter button component helper
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

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Building2, Users2, Mail, CheckCircle2, Command, ArrowRight } from 'lucide-react';
import { AuthScreen } from '../types';

interface SuccessScreenProps {
  userRole: string;
  emailAddress: string;
  companyName: string;
  onResetAll: () => void;
  onNavigateDashboard?: () => void;
}

export default function SuccessScreen({ userRole, emailAddress, companyName, onResetAll, onNavigateDashboard }: SuccessScreenProps) {
  const [companyType, setCompanyType] = useState('agency');
  const [teamSize, setTeamSize] = useState('11-50');
  const [teammateEmails, setTeammateEmails] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const COMPANY_TYPES = [
    { id: 'agency', label: 'Recruitment Agency' },
    { id: 'corporate', label: 'Corporate HR' },
    { id: 'startup', label: 'Fast Growth Startup' },
    { id: 'vendor', label: 'Tier-1 Staffing Supplier' }
  ];

  const TEAM_SIZES = [
    { id: '1-10', label: '1 - 10 members' },
    { id: '11-50', label: '11 - 50 members' },
    { id: '51-200', label: '51 - 200 members' },
    { id: '201+', label: '201+ enterprises' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Speed up workspace configuration
    setTimeout(() => {
      setIsSubmitting(false);
      setIsFinished(true);

      // Transition smoothly into actual workspace Dashboard
      setTimeout(() => {
        if (onNavigateDashboard) {
          onNavigateDashboard();
        }
      }, 900);
    }, 1100);
  };

  const handleSkip = () => {
    setIsFinished(true);
    if (onNavigateDashboard) {
      onNavigateDashboard();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-md mx-auto"
      id="workspace-setup-container"
    >
      <div className="space-y-6">
        
        {/* Decorative Top header icon */}
        <div className="flex justify-center">
          <div className="h-14 w-14 rounded-2xl bg-gradient-to-tr from-[#5B5BD6] to-[#7B61FF] flex items-center justify-center text-white shadow-md shadow-[#5B5BD6]/10">
            <Command className="h-6 w-6" />
          </div>
        </div>

        {/* Header Title */}
        <div className="text-center space-y-1.5">
          <span className="text-[10px] px-2.5 py-1 bg-emerald-50 text-emerald-750 rounded-full font-bold uppercase tracking-wider font-mono">
            Step 3 of 3: Workspace Calibration
          </span>
          <h2 className="font-display text-2xl font-extrabold tracking-tight text-slate-900 leading-snug">
            Configure Your New Workspace
          </h2>
          <p className="text-slate-500 text-xs">
            Almost done! Calibrate BenMyl's AI screening templates to fit your team size & operations perfectly.
          </p>
        </div>

        {isFinished ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-6 bg-white border border-slate-100 rounded-2xl text-center space-y-3 shadow-md"
          >
            <div className="flex justify-center">
              <CheckCircle2 className="h-10 w-10 text-emerald-500 animate-bounce" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Workspace Ready to Launch!</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Setting candidate pools and routing triggers under the <strong>{(userRole || 'Recruiter').toUpperCase()}</strong> profile...
            </p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Company type choice */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block font-mono">
                Company Structure:
              </label>
              <div className="grid grid-cols-2 gap-2">
                {COMPANY_TYPES.map((type) => {
                  const isSelected = companyType === type.id;
                  return (
                    <button
                      key={type.id}
                      type="button"
                      id={`setup-company-${type.id}`}
                      onClick={() => setCompanyType(type.id)}
                      className={`py-2.5 px-3 rounded-xl border text-center transition-all text-xs font-semibold cursor-pointer ${
                        isSelected 
                          ? 'bg-[#5B5BD6]/10 border-[#5B5BD6] text-[#5B5BD6]'
                          : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {type.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Team Size Choice */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block font-mono">
                Team Size:
              </label>
              <div className="grid grid-cols-2 gap-2">
                {TEAM_SIZES.map((size) => {
                  const isSelected = teamSize === size.id;
                  return (
                    <button
                      key={size.id}
                      type="button"
                      id={`setup-size-${size.id}`}
                      onClick={() => setTeamSize(size.id)}
                      className={`py-2.5 px-3 rounded-xl border text-center transition-all text-xs font-semibold cursor-pointer ${
                        isSelected 
                          ? 'bg-[#7B61FF]/10 border-[#7B61FF] text-[#7B61FF]'
                          : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {size.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Invite Teammates (Optional) */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block font-mono">
                  Invite Teammates (Optional):
                </label>
                <span className="text-[9px] text-slate-400 uppercase font-mono">COMMA SEPARATED</span>
              </div>
              
              <div className="relative">
                <div className="absolute left-3.5 top-3 p-1 rounded transition-colors text-slate-400">
                  <Mail className="h-4 w-4" />
                </div>
                <input
                  type="text"
                  id="invite-emails-input"
                  placeholder="e.g. recruit.lead@company.com, sourcer@company.com"
                  value={teammateEmails}
                  onChange={(e) => setTeammateEmails(e.target.value)}
                  className="w-full bg-white text-slate-900 text-xs rounded-xl pl-11 pr-4 py-3 h-10 border border-slate-205 focus:border-[#5B5BD6] focus:ring-2 focus:ring-[#5B5BD6]/10 outline-none transition-all font-sans"
                />
              </div>
            </div>

            {/* Form actions flow */}
            <div className="flex flex-col gap-2 pt-2">
              <button
                type="submit"
                id="workspace-setup-submit-btn"
                disabled={isSubmitting}
                className="w-full h-11 rounded-xl bg-[#5B5BD6] hover:bg-[#4747B8] text-white font-semibold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs active:scale-[0.99]"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                    <span>Calibrating custom workspace...</span>
                  </div>
                ) : (
                  <>
                    <span>Complete Workspace Setup</span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>

              <button
                type="button"
                id="workspace-setup-skip-btn"
                onClick={handleSkip}
                className="w-full h-10 rounded-xl bg-white hover:bg-slate-50 text-slate-500 border border-slate-200 text-xs font-semibold transition-all cursor-pointer"
              >
                Configure Later / Skip Setup
              </button>
            </div>

          </form>
        )}

      </div>
    </motion.div>
  );
}

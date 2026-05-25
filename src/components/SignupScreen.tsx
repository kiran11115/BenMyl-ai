/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Users, 
  TrendingUp, 
  Building2, 
  Briefcase, 
  UserCheck, 
  User,
  Mail, 
  Lock, 
  Building, 
  ArrowLeft, 
  ArrowRight,
  Shield, 
  Sparkles, 
  Command 
} from 'lucide-react';
import { AuthScreen, UserRole, RoleOption } from '../types';

interface SignupScreenProps {
  onNavigate: (screen: AuthScreen) => void;
  onSubmitSuccess: (selectedRole: UserRole, email: string, company: string) => void;
}

const ROLE_OPTIONS: RoleOption[] = [
  {
    id: 'recruiter',
    title: 'Recruiter',
    description: 'Autonomous workflows & AI screening.',
    icon: 'Briefcase',
    tag: 'AGENCY & CORPORATE',
  },
  {
    id: 'sales',
    title: 'Bench Sales',
    description: 'Hot-list optimization & faster placement.',
    icon: 'TrendingUp',
    tag: 'REPRESENTATION',
  },
  {
    id: 'staffing',
    title: 'Staffing Hub',
    description: 'High-volume contractors & client management.',
    icon: 'Building2',
    tag: 'ENTERPRISE',
  },
  {
    id: 'vendor',
    title: 'Tier-1 Vendor',
    description: 'Deliver human networks to partners.',
    icon: 'Users',
    tag: 'SUPPLIER',
  },
  {
    id: 'hiring_manager',
    title: 'Hiring Lead',
    description: 'Direct requirements approval & live match.',
    icon: 'UserCheck',
    tag: 'CLIENT DIRECT',
  },
];

export default function SignupScreen({ onNavigate, onSubmitSuccess }: SignupScreenProps) {
  const [fullname, setFullname] = useState('');
  const [workEmail, setWorkEmail] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>('recruiter');

  // Input focus highlights
  const [nameFocused, setNameFocused] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [companyFocused, setCompanyFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [confirmFocused, setConfirmFocused] = useState(false);

  // Form errors
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const renderIcon = (iconName: string, isSelected: boolean) => {
    const props = { className: `h-4 w-4 ${isSelected ? 'text-white' : 'text-[#5B5BD6]'}` };
    switch (iconName) {
      case 'Briefcase': return <Briefcase {...props} />;
      case 'TrendingUp': return <TrendingUp {...props} />;
      case 'Building2': return <Building2 {...props} />;
      case 'Users': return <Users {...props} />;
      case 'UserCheck': return <UserCheck {...props} />;
      default: return <Building {...props} />;
    }
  };

  const handleCreateAccount = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!fullname.trim()) newErrors.fullname = 'Full name is required';
    if (!workEmail.trim()) {
      newErrors.workEmail = 'Work email is required';
    } else if (!/\S+@\S+\.\S+/.test(workEmail)) {
      newErrors.workEmail = 'Please provide a valid work email';
    }
    if (!companyName.trim()) newErrors.companyName = 'Company name is required';
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    if (confirmPassword !== password) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    // Simulate fast secure register handshake
    setTimeout(() => {
      setIsSubmitting(false);
      onSubmitSuccess(selectedRole, workEmail, companyName);
    }, 1300);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-xl mx-auto"
      id="signup-container"
    >
      <div className="space-y-6">
        {/* Navigation Action Header */}
        <div className="flex items-center justify-between mb-2">
          <button
            type="button"
            id="signup-back-to-welcome"
            onClick={() => onNavigate(AuthScreen.WELCOME)}
            className="flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-slate-700 transition-colors uppercase tracking-wider"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Welcome Screen</span>
          </button>

          <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#7B61FF]/10 text-[#7B61FF] font-mono tracking-widest uppercase">
            Create Account
          </span>
        </div>

        {/* Form Title */}
        <div className="space-y-1">
          <h1 className="font-display text-2xl lg:text-3xl font-extrabold tracking-tight text-slate-900 leading-tight">
            Provision <span className="bg-gradient-to-r from-[#5B5BD6] to-[#7B61FF] bg-clip-text text-transparent font-extrabold">BenMyl Node</span>
          </h1>
          <p className="text-slate-500 text-sm">
            Launch your own collaborative workspace and claim your unified database index today.
          </p>
        </div>

        {/* Input Form Fields */}
        <form onSubmit={handleCreateAccount} className="space-y-4">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Full Name */}
            <div className="relative">
              <div className={`absolute left-3.5 top-1/2 -translate-y-1/2 p-1 rounded-md transition-colors ${nameFocused ? 'text-[#5B5BD6]' : 'text-slate-400'}`}>
                <User className="h-4 w-4" />
              </div>
              <input
                type="text"
                id="input-signup-name"
                placeholder="Full Name"
                value={fullname}
                onChange={(e) => {
                  setFullname(e.target.value);
                  if (errors.fullname) setErrors(prev => ({ ...prev, fullname: '' }));
                }}
                onFocus={() => setNameFocused(true)}
                onBlur={() => setNameFocused(false)}
                className={`w-full bg-white text-slate-900 text-sm rounded-xl pl-11 pr-4 h-12 border ${
                  errors.fullname ? 'border-red-300 focus:ring-2 focus:ring-red-100' : nameFocused ? 'border-[#5B5BD6] ring-2 ring-[#5B5BD6]/10' : 'border-slate-200 hover:border-slate-300'
                } outline-none transition-all font-sans`}
              />
              {errors.fullname && <p className="text-[10px] text-red-500 mt-0.5 pl-2">{errors.fullname}</p>}
            </div>

            {/* Work Email */}
            <div className="relative">
              <div className={`absolute left-3.5 top-1/2 -translate-y-1/2 p-1 rounded-md transition-colors ${emailFocused ? 'text-[#5B5BD6]' : 'text-slate-400'}`}>
                <Mail className="h-4 w-4" />
              </div>
              <input
                type="text"
                id="input-signup-email"
                placeholder="Work Email Address"
                value={workEmail}
                onChange={(e) => {
                  setWorkEmail(e.target.value);
                  if (errors.workEmail) setErrors(prev => ({ ...prev, workEmail: '' }));
                }}
                onFocus={() => setEmailFocused(true)}
                onBlur={() => setEmailFocused(false)}
                className={`w-full bg-white text-slate-900 text-sm rounded-xl pl-11 pr-4 h-12 border ${
                  errors.workEmail ? 'border-red-300 focus:ring-2 focus:ring-red-100' : emailFocused ? 'border-[#5B5BD6] ring-2 ring-[#5B5BD6]/10' : 'border-slate-200 hover:border-slate-300'
                } outline-none transition-all font-sans`}
              />
              {errors.workEmail && <p className="text-[10px] text-red-500 mt-0.5 pl-2">{errors.workEmail}</p>}
            </div>
          </div>

          {/* Company Name */}
          <div className="relative">
            <div className={`absolute left-3.5 top-1/2 -translate-y-1/2 p-1 rounded-md transition-colors ${companyFocused ? 'text-[#5B5BD6]' : 'text-slate-400'}`}>
              <Building className="h-4 w-4" />
            </div>
            <input
              type="text"
              id="input-signup-company"
              placeholder="Enterprise / Company Name"
              value={companyName}
              onChange={(e) => {
                setCompanyName(e.target.value);
                if (errors.companyName) setErrors(prev => ({ ...prev, companyName: '' }));
              }}
              onFocus={() => setCompanyFocused(true)}
              onBlur={() => setCompanyFocused(false)}
              className={`w-full bg-white text-slate-900 text-sm rounded-xl pl-11 pr-4 h-12 border ${
                errors.companyName ? 'border-red-300 focus:ring-2 focus:ring-red-100' : companyFocused ? 'border-[#5B5BD6] ring-2 ring-[#5B5BD6]/10' : 'border-slate-200 hover:border-slate-300'
              } outline-none transition-all font-sans`}
            />
            {errors.companyName && <p className="text-[10px] text-red-500 mt-0.5 pl-2">{errors.companyName}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Password */}
            <div className="relative">
              <div className={`absolute left-3.5 top-1/2 -translate-y-1/2 p-1 rounded-md transition-colors ${passwordFocused ? 'text-[#5B5BD6]' : 'text-slate-400'}`}>
                <Lock className="h-4 w-4" />
              </div>
              <input
                type="password"
                id="input-signup-password"
                placeholder="Password (Min 8 Chars)"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password) setErrors(prev => ({ ...prev, password: '' }));
                }}
                onFocus={() => setPasswordFocused(true)}
                onBlur={() => setPasswordFocused(false)}
                className={`w-full bg-white text-slate-900 text-sm rounded-xl pl-11 pr-4 h-12 border ${
                  errors.password ? 'border-red-300 focus:ring-2 focus:ring-red-100' : passwordFocused ? 'border-[#5B5BD6] ring-2 ring-[#5B5BD6]/10' : 'border-slate-200 hover:border-slate-300'
                } outline-none transition-all font-sans`}
              />
              {errors.password && <p className="text-[10px] text-red-500 mt-0.5 pl-2">{errors.password}</p>}
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <div className={`absolute left-3.5 top-1/2 -translate-y-1/2 p-1 rounded-md transition-colors ${confirmFocused ? 'text-[#5B5BD6]' : 'text-slate-400'}`}>
                <Lock className="h-4 w-4" />
              </div>
              <input
                type="password"
                id="input-signup-confirm"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  if (errors.confirmPassword) setErrors(prev => ({ ...prev, confirmPassword: '' }));
                }}
                onFocus={() => setConfirmFocused(true)}
                onBlur={() => setConfirmFocused(false)}
                className={`w-full bg-white text-slate-900 text-sm rounded-xl pl-11 pr-4 h-12 border ${
                  errors.confirmPassword ? 'border-red-300 focus:ring-2 focus:ring-red-100' : confirmFocused ? 'border-[#5B5BD6] ring-2 ring-[#5B5BD6]/10' : 'border-slate-200 hover:border-slate-300'
                } outline-none transition-all font-sans`}
              />
              {errors.confirmPassword && <p className="text-[10px] text-red-500 mt-0.5 pl-2">{errors.confirmPassword}</p>}
            </div>
          </div>

          {/* Role Selection Option - Elegant Grid */}
          <div className="space-y-2 pt-2">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block font-mono">
              Assign Platform Security Role:
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {ROLE_OPTIONS.map((opt) => {
                const isSelected = selectedRole === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    id={`opt-role-${opt.id}`}
                    onClick={() => setSelectedRole(opt.id)}
                    className={`flex items-start text-left p-2.5 rounded-xl border transition-all cursor-pointer ${
                      isSelected 
                        ? 'bg-gradient-to-r from-[#5B5BD6] to-[#7B61FF] text-white border-transparent shadow-md shadow-[#5B5BD6]/15' 
                        : 'bg-white border-slate-205 text-slate-700 hover:bg-slate-50 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex gap-2">
                      <div className={`mt-0.5 h-6.5 w-6.5 rounded-lg flex items-center justify-center shrink-0 border ${
                        isSelected ? 'bg-white/20 border-white/10' : 'bg-[#5B5BD6]/5 border-[#5B5BD6]/10'
                      }`}>
                        {renderIcon(opt.icon, isSelected)}
                      </div>
                      <div>
                        <h4 className={`text-xs font-semibold leading-tight ${isSelected ? 'text-white' : 'text-slate-900'}`}>{opt.title}</h4>
                        <p className={`text-[9.5px] leading-tight mt-0.5 ${isSelected ? 'text-indigo-100' : 'text-slate-400'}`}>{opt.description}</p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Core Terms Consent */}
          <div className="text-[10px] text-slate-400 text-center font-sans">
            By creating an account, you authorize BenMyl administrative provisioning policies.
          </div>

          {/* Create Account Submit Button */}
          <button
            type="submit"
            id="signup-submit-button"
            disabled={isSubmitting}
            className="w-full relative overflow-hidden group h-12 rounded-xl bg-[#5B5BD6] hover:bg-[#4747B8] text-white font-semibold text-sm flex items-center justify-center gap-2 transition-all active:scale-[0.99] cursor-pointer shadow-xs"
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center gap-2">
                <div className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                <span>Publishing security domain...</span>
              </div>
            ) : (
              <>
                <span>Create Platform Account</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        {/* Back to sign in redirection */}
        <div className="text-center pt-3 border-t border-slate-100">
          <p className="text-xs text-slate-400 font-sans">
            Already verified on BenMyl workspace?{' '}
            <button
              type="button"
              id="link-to-signin"
              onClick={() => onNavigate(AuthScreen.LOGIN)}
              className="font-bold text-[#5B5BD6] hover:text-[#7B61FF] transition-all"
            >
              Sign In Instead
            </button>
          </p>
        </div>
      </div>
    </motion.div>
  );
}

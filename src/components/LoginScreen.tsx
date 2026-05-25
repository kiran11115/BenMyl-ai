/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Eye, EyeOff, Mail, Lock, ArrowRight, Shield, ArrowLeft } from 'lucide-react';
import { AuthScreen } from '../types';

interface LoginScreenProps {
  onNavigate: (screen: AuthScreen) => void;
  onSubmitSuccess: (email: string) => void;
}

export default function LoginScreen({ onNavigate, onSubmitSuccess }: LoginScreenProps) {
  const [email, setEmail] = useState('admin@benmyl.ai');
  const [password, setPassword] = useState('workspaceAdminPassword123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  
  // Highlighting states for premium input focus
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  
  // Validation States
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    let isValid = true;
    if (!email) {
      setEmailError('Email address is required');
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Please enter a valid work email');
      isValid = false;
    } else {
      setEmailError('');
    }

    if (!password) {
      setPasswordError('Password is required');
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      isValid = false;
    } else {
      setPasswordError('');
    }

    return isValid;
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    // Simulate premium server-side authentication
    setTimeout(() => {
      setIsSubmitting(false);
      onSubmitSuccess(email);
    }, 1200);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-md mx-auto"
      id="login-container"
    >
      <div className="space-y-6">
        {/* Navigation back and header banner */}
        <div className="flex items-center justify-between mb-2">
          <button
            type="button"
            id="back-to-welcome-btn"
            onClick={() => onNavigate(AuthScreen.WELCOME)}
            className="flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-slate-700 transition-colors uppercase tracking-wider"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Welcome Screen</span>
          </button>

          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#5B5BD6]/10 text-[#5B5BD6] text-[10px] font-mono tracking-widest uppercase">
            <Shield className="h-3 w-3" />
            <span>Secure Gate</span>
          </div>
        </div>

        {/* Title */}
        <div className="space-y-1.5">
          <h1 className="font-display text-2xl lg:text-3xl font-extrabold tracking-tight text-slate-950 leading-tight">
            Sign In to <span className="bg-gradient-to-r from-[#5B5BD6] to-[#7B61FF] bg-clip-text text-transparent">BenMyl</span>
          </h1>
          <p className="text-slate-500 text-sm">
            Enter your credentials to securely access your BenMyl node workspace.
          </p>
        </div>

        {/* Auth Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          
          {/* Email input */}
          <div className="relative">
            <div className={`absolute left-3.5 top-1/2 -translate-y-1/2 p-1 rounded-md transition-all duration-300 ${emailFocused ? 'text-[#5B5BD6]' : 'text-slate-400'}`}>
              <Mail className="h-4 w-4" />
            </div>

            <input
              type="text"
              id="input-login-email"
              placeholder="Work Email Address"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (emailError) setEmailError('');
              }}
              onFocus={() => setEmailFocused(true)}
              onBlur={() => setEmailFocused(false)}
              className={`w-full bg-white text-slate-900 text-sm rounded-xl pl-11 pr-4 py-3.5 transition-all duration-300 border ${
                emailError 
                  ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-100' 
                  : emailFocused 
                    ? 'border-[#5B5BD6] ring-2 ring-[#5B5BD6]/10 shadow-xs' 
                    : 'border-slate-200 hover:border-slate-300'
              } h-12 outline-none font-sans`}
            />

            {emailError && (
              <p className="text-xs text-red-500 mt-1 pl-1 flex items-center gap-1 font-medium">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-red-500" />
                {emailError}
              </p>
            )}
          </div>

          {/* Password Input */}
          <div className="relative">
            <div className={`absolute left-3.5 top-1/2 -translate-y-1/2 p-1 rounded-md transition-all duration-300 ${passwordFocused ? 'text-[#5B5BD6]' : 'text-slate-400'}`}>
              <Lock className="h-4 w-4" />
            </div>

            <input
              type={showPassword ? 'text' : 'password'}
              id="input-login-password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (passwordError) setPasswordError('');
              }}
              onFocus={() => setPasswordFocused(true)}
              onBlur={() => setPasswordFocused(false)}
              className={`w-full bg-white text-slate-900 text-sm rounded-xl pl-11 pr-11 py-3.5 transition-all duration-300 border ${
                passwordError 
                  ? 'border-red-301 focus:border-red-500 focus:ring-2 focus:ring-red-100' 
                  : passwordFocused 
                    ? 'border-[#5B5BD6] ring-2 ring-[#5B5BD6]/10 shadow-xs' 
                    : 'border-slate-200 hover:border-slate-300'
              } h-12 outline-none font-sans`}
            />

            <button
              type="button"
              id="toggle-show-pass-btn"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 h-8 w-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-colors"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>

            {passwordError && (
              <p className="text-xs text-red-500 mt-1 pl-1 flex items-center gap-1 font-medium">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-red-500" />
                {passwordError}
              </p>
            )}
          </div>

          {/* Remember & Forgot Row */}
          <div className="flex items-center justify-between text-xs sm:text-xs font-sans pb-1">
            <label className="flex items-center gap-2 cursor-pointer group text-slate-500">
              <input
                type="checkbox"
                id="checkbox-remember-me"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                className="rounded border-slate-300 text-[#5B5BD6] focus:ring-[#5B5BD6] h-4 w-4"
              />
              <span className="select-none group-hover:text-slate-800 transition-colors">Keep me signed in</span>
            </label>
            <button
              type="button"
              id="forgot-password-btn"
              onClick={() => onNavigate(AuthScreen.FORGOT)}
              className="font-bold text-[#5B5BD6] hover:text-[#7B61FF] transition-all"
            >
              Forgot Password?
            </button>
          </div>

          {/* Login Button with AI Gradient styling */}
          <button
            type="submit"
            id="login-submit-button"
            disabled={isSubmitting}
            className="w-full relative overflow-hidden group h-12 rounded-xl bg-[#5B5BD6] hover:bg-[#4747B8] text-white font-semibold text-sm flex items-center justify-center gap-2 transition-all active:scale-[0.99] cursor-pointer shadow-xs"
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center gap-2">
                <div className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                <span>Authenticating Workspace...</span>
              </div>
            ) : (
              <>
                <span>Sign In</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        {/* Redirect to sign up */}
        <div className="text-center pt-4 border-t border-slate-100">
          <p className="text-xs text-slate-400 font-sans">
            New enterprise node partner?{' '}
            <button
              type="button"
              id="link-to-signup"
              onClick={() => onNavigate(AuthScreen.SIGNUP)}
              className="font-bold text-[#5B5BD6] hover:text-[#7B61FF] transition-all"
            >
              Create an Account
            </button>
          </p>
        </div>
      </div>
    </motion.div>
  );
}

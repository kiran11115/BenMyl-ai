/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, ArrowLeft, ArrowRight, ShieldAlert, Sparkles, Send, Inbox, RefreshCw } from 'lucide-react';
import { AuthScreen } from '../types';

interface ForgotPasswordScreenProps {
  onNavigate: (screen: AuthScreen) => void;
  onSendLinkSuccess: (email: string) => void;
}

export default function ForgotPasswordScreen({ onNavigate, onSendLinkSuccess }: ForgotPasswordScreenProps) {
  const [email, setEmail] = useState('');
  const [emailFocused, setEmailFocused] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleRecover = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setEmailError('Address is required to transmit instructions');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Please supply a valid work email handle');
      return;
    }
    setEmailError('');

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSent(true);
      onSendLinkSuccess(email);
    }, 1500);
  };

  const isEmailFloating = emailFocused || email.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-md mx-auto"
    >
      <div className="space-y-6">
        {/* Back Link */}
        <button
          type="button"
          onClick={() => onNavigate(AuthScreen.LOGIN)}
          className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-[#1d4ed8] transition-colors uppercase tracking-wider"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to 로그인 Entry</span>
        </button>

        {/* Title */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-amber-50 text-amber-700 text-xs font-medium border border-amber-100">
            <ShieldAlert className="h-3.5 w-3.5" />
            <span>Vault Recovery</span>
          </div>
          <h2 className="font-display text-2xl lg:text-3xl font-bold tracking-tight text-slate-900">
            Forgot Password?
          </h2>
          <p className="text-slate-500 text-sm">
            Provide the workspace work email registered to your node, and our automated dispatcher will issue a quantum reset URL token.
          </p>
        </div>

        <AnimatePresence mode="wait">
          {!isSent ? (
            <motion.form
              key="forgot-form"
              onSubmit={handleRecover}
              className="space-y-5"
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              {/* Floating label input */}
              <div className="relative">
                <div className={`absolute left-3 top-1/2 -translate-y-1/2 p-1.5 rounded transition-all duration-300 ${emailFocused ? 'text-indigo-600' : 'text-slate-400'}`}>
                  <Mail className="h-4 w-4" />
                </div>

                <label 
                  className={`absolute left-11 transition-all duration-300 pointer-events-none ${
                    isEmailFloating 
                      ? 'top-1.5 text-[10px] font-semibold text-indigo-600 uppercase tracking-wider' 
                      : 'top-1/2 -translate-y-1/2 text-sm text-slate-400'
                  }`}
                >
                  Registered Work Email
                </label>

                <input
                  type="text"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (emailError) setEmailError('');
                  }}
                  onFocus={() => setEmailFocused(true)}
                  onBlur={() => setEmailFocused(false)}
                  className={`w-full bg-white text-slate-900 text-sm rounded-xl pl-11 pr-4 transition-all duration-300 border ${
                    emailError 
                      ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-100' 
                      : emailFocused 
                        ? 'border-indigo-500 ring-2 ring-indigo-50 pt-5 pb-1.5' 
                        : 'border-slate-200 hover:border-slate-300 pt-5 pb-1.5'
                  } h-12 outline-none`}
                />

                {emailError && (
                  <p className="text-xs text-red-500 mt-1.5 pl-1 flex items-center gap-1 font-medium">
                    <span className="inline-block w-1 h-1 rounded-full bg-red-500" />
                    {emailError}
                  </p>
                )}
              </div>

              {/* Submit trigger */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full relative overflow-hidden group h-12 rounded-xl btn-royal-gold text-white font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                    <span>Resolving node keys...</span>
                  </div>
                ) : (
                  <>
                    <span>Transmit Security Token</span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </motion.form>
          ) : (
            <motion.div
              key="forgot-success"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl border border-indigo-100 bg-indigo-50/20 p-6 space-y-6 text-center glow-purple"
            >
              <div className="mx-auto h-12 w-12 rounded-xl bg-indigo-600/10 flex items-center justify-center">
                <Inbox className="h-6 w-6 text-indigo-600 animate-bounce" />
              </div>

              <div className="space-y-2">
                <h3 className="font-display font-bold text-lg text-indigo-950">Security Token Dispatched!</h3>
                <p className="text-slate-500 text-xs leading-relaxed max-w-sm mx-auto">
                  An authorized cryptographic reset URL packet has been dispatched to <span className="font-semibold text-slate-800">{email}</span>. Please verify your inbox structure, spam tags, or click below to simulate immediate token validation!
                </p>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={() => setIsSent(false)}
                  className="flex-1 h-11 rounded-xl border border-slate-200 hover:border-slate-300 bg-white text-slate-700 text-xs font-semibold hover:bg-slate-50 transition-colors uppercase tracking-wider"
                >
                  Change Email
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate(AuthScreen.RESET)}
                  className="flex-1 h-11 rounded-xl btn-royal-gold text-white text-xs font-bold transition-all uppercase tracking-wider inline-flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Test Reset Form</span>
                  <ArrowRight className="h-4.5 w-4.5" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

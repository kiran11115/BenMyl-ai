/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, KeyRound, Sparkles, RefreshCw } from 'lucide-react';
import { AuthScreen } from '../types';

interface OtpScreenProps {
  userRole: string;
  emailAddress: string;
  onNavigate: (screen: AuthScreen) => void;
  onSubmitSuccess: () => void;
}

export default function OtpScreen({ userRole, emailAddress, onNavigate, onSubmitSuccess }: OtpScreenProps) {
  const [digits, setDigits] = useState<string[]>(Array(6).fill(''));
  const inputRefs = useRef<HTMLInputElement[]>([]);
  
  // States of validation
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  // Timer calculations
  const [timeLeft, setTimeLeft] = useState(119); // 1 minute 59 seconds
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (timeLeft <= 0) {
      setCanResend(true);
      return;
    }
    const interval = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLeft]);

  // Focus the first element on startup
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  // Handle Resend OTP button
  const handleResend = () => {
    setTimeLeft(119);
    setCanResend(false);
    setDigits(Array(6).fill(''));
    setErrorMessage('');
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  };

  // Convert timer seconds to readable format
  const formatTime = (seconds: number) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
  };

  const handleDigitChange = (index: number, val: string) => {
    const sanitizedValue = val.replace(/[^0-9]/g, '');
    const newDigits = [...digits];
    newDigits[index] = sanitizedValue.slice(-1); // only take last char
    setDigits(newDigits);
    setErrorMessage('');

    // Shift focus forward if entering a value
    if (sanitizedValue && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-submit when exactly 6 digits are complete
    const completeCode = newDigits.join('');
    if (completeCode.length === 6) {
      verifyCode(completeCode);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      const newDigits = [...digits];
      
      if (!digits[index] && index > 0) {
        newDigits[index - 1] = '';
        setDigits(newDigits);
        inputRefs.current[index - 1]?.focus();
      } else {
        newDigits[index] = '';
        setDigits(newDigits);
      }
      setErrorMessage('');
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').trim().replace(/[^0-9]/g, '');
    if (!pastedData) return;

    const newDigits = [...digits];
    for (let i = 0; i < 6; i++) {
      if (pastedData[i]) {
        newDigits[i] = pastedData[i];
      }
    }
    setDigits(newDigits);
    const completeCode = newDigits.join('').slice(0, 6);
    if (completeCode.length === 6) {
      verifyCode(completeCode);
    }
  };

  const verifyCode = (code: string) => {
    setIsVerifying(true);
    setErrorMessage('');

    setTimeout(() => {
      setIsVerifying(false);
      setIsSuccess(true);
      
      setTimeout(() => {
        onSubmitSuccess();
      }, 1200);
    }, 1400);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-md mx-auto"
      id="otp-container"
    >
      <div className="space-y-6">
        
        {/* Verification Lock Graphic */}
        <div className="flex justify-center">
          <div className="relative h-20 w-20 flex items-center justify-center">
            <div className="absolute inset-0 rounded-2xl bg-[#5B5BD6]/5 animate-pulse" />
            <div className="relative h-14 w-14 rounded-xl bg-white shadow-sm border border-slate-205/60 flex items-center justify-center">
              {isSuccess ? (
                <ShieldCheck className="h-7 w-7 text-emerald-500 animate-bounce" />
              ) : isVerifying ? (
                <RefreshCw className="h-6 w-6 text-[#5B5BD6] animate-spin" />
              ) : (
                <KeyRound className="h-6 w-6 text-[#5B5BD6]" />
              )}
            </div>
          </div>
        </div>

        {/* Header Text */}
        <div className="text-center space-y-1.5">
          <span className="text-[10px] font-bold text-[#5B5BD6] uppercase tracking-widest font-mono">
            Security Authorization Check
          </span>
          <h2 className="font-display text-2xl font-extrabold tracking-tight text-slate-900">
            {isSuccess ? 'Domain Authenticated' : 'Verify Domain Access'}
          </h2>
          <p className="text-slate-500 text-xs leading-relaxed max-w-xs mx-auto">
            A 6-digit cryptographic verification key has been sent to: <br/>
            <span className="font-bold text-slate-800 break-all">{emailAddress || 'agent@benmyl.ai'}</span>
          </p>
        </div>

        {/* Inputs */}
        <div className="space-y-4">
          <div className="flex justify-between gap-2 max-w-[290px] mx-auto px-1 py-1">
            {digits.map((digit, index) => (
              <input
                key={index}
                type="text"
                pattern="[0-9]*"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                ref={(el) => {
                  if (el) inputRefs.current[index] = el;
                }}
                onChange={(e) => handleDigitChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                disabled={isVerifying || isSuccess}
                className={`w-10 h-12 text-center font-display font-extrabold text-lg rounded-xl border bg-white text-slate-900 transition-all focus:outline-none focus:ring-4 ${
                  isSuccess 
                    ? 'border-emerald-300 bg-emerald-50/10 text-emerald-600'
                    : isVerifying
                      ? 'border-slate-100 bg-slate-50 text-slate-400 cursor-not-allowed'
                      : digit 
                        ? 'border-[#5B5BD6] ring-2 ring-[#5B5BD6]/10 font-bold' 
                        : 'border-slate-200 hover:border-slate-300 focus:border-[#5B5BD6] focus:ring-[#5B5BD6]/10'
                }`}
              />
            ))}
          </div>

          {/* Verification Status Banner */}
          <AnimatePresence mode="wait">
            {errorMessage && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="p-3 rounded-xl bg-red-50 text-red-750 text-xs font-semibold text-center border border-red-105"
              >
                {errorMessage}
              </motion.div>
            )}
            
            {isVerifying && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center justify-center gap-1.5 text-[#5B5BD6] text-xs font-mono"
              >
                <div className="h-3.5 w-3.5 rounded-full border-2 border-[#5B5BD6]/30 border-t-[#5B5BD6] animate-spin" />
                <span>Publishing secure cryptographic key handshake...</span>
              </motion.div>
            )}

            {isSuccess && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center gap-1 leading-none text-center"
              >
                <p className="text-emerald-600 text-xs font-bold flex items-center gap-1">
                  <Sparkles className="h-3.5 w-3.5 text-emerald-500 animate-spin" />
                  <span>Handshake Secured</span>
                </p>
                <span className="text-[10px] text-slate-400 font-mono">WORKSPACE SETTING ONLINE</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Expiry Counter */}
          {!isSuccess && (
            <div className="flex flex-col items-center gap-2 pt-4 text-center text-xs text-slate-400 border-t border-slate-100/80">
              <div className="flex items-center gap-1.5 font-sans">
                <span>The key expires in:</span>
                <span className={`font-mono font-extrabold px-1.5 py-0.5 rounded ${timeLeft < 30 ? 'text-red-500 bg-red-50' : 'text-slate-700 bg-slate-50'}`}>
                  {formatTime(timeLeft)}
                </span>
              </div>

              <div>
                Haven't received the key?{' '}
                {canResend ? (
                  <button
                    type="button"
                    onClick={handleResend}
                    className="font-bold text-[#5B5BD6] hover:text-[#7B61FF] transition-colors inline-block focus:outline-none cursor-pointer"
                  >
                    Resend Code
                  </button>
                ) : (
                  <span className="text-slate-350 italic">
                    Resend code in {timeLeft}s
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Lock, Check, X, ShieldAlert, Sparkles, Command, Eye, EyeOff, RotateCw } from 'lucide-react';
import { AuthScreen } from '../types';

interface ResetPasswordScreenProps {
  onNavigate: (screen: AuthScreen) => void;
}

export default function ResetPasswordScreen({ onNavigate }: ResetPasswordScreenProps) {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  
  const [newFocused, setNewFocused] = useState(false);
  const [confirmFocused, setConfirmFocused] = useState(false);

  // Success state triggering the Modal
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isRotating, setIsRotating] = useState(false);

  // Real-time rules checklist
  const rules = {
    length: newPassword.length >= 8,
    digit: /[0-9]/.test(newPassword),
    special: /[^A-Za-z0-9]/.test(newPassword),
    upper: /[A-Z]/.test(newPassword)
  };

  const getStrengthScore = () => {
    let score = 0;
    if (rules.length) score++;
    if (rules.digit) score++;
    if (rules.special) score++;
    if (rules.upper) score++;
    return score;
  };

  const getStrengthText = (score: number) => {
    if (newPassword.length === 0) return { label: 'Empty', color: 'bg-slate-200 text-slate-400', width: 'w-0' };
    if (score <= 1) return { label: 'Unsafe Level', color: 'bg-red-500 text-red-500', width: 'w-1/4' };
    if (score === 2) return { label: 'Moderate Protection', color: 'bg-amber-400 text-amber-500', width: 'w-2/4' };
    if (score === 3) return { label: 'Highly Secure', color: 'bg-indigo-500 text-indigo-500', width: 'w-3/4' };
    return { label: 'Quantum Safeguarded', color: 'bg-emerald-500 text-emerald-500', width: 'w-full' };
  };

  const score = getStrengthScore();
  const strength = getStrengthText(score);

  const [confirmError, setConfirmError] = useState('');

  const handleReset = (e: React.FormEvent) => {
    e.preventDefault();
    if (score < 3) {
      setConfirmError('Please meet at least 3 password security criteria list rules.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setConfirmError('Security credentials mismatch. Please double-check.');
      return;
    }
    setConfirmError('');
    setIsRotating(true);

    setTimeout(() => {
      setIsRotating(false);
      setShowSuccessModal(true);
    }, 1500);
  };

  const isNewFloating = newFocused || newPassword.length > 0;
  const isConfirmFloating = confirmFocused || confirmPassword.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-md mx-auto relative"
    >
      <div className="space-y-6">
        {/* Header Title */}
        <div className="space-y-2">
          <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest font-mono">
            Credential Calibration
          </span>
          <h2 className="font-display text-2xl lg:text-3xl font-bold tracking-tight text-slate-900">
            Rotate Node Password
          </h2>
          <p className="text-slate-500 text-sm">
            Please define a master credential pair key set below to restore access to the BenMyl SaaS cluster.
          </p>
        </div>

        {/* Input Form */}
        <form onSubmit={handleReset} className="space-y-5">
          {/* New password field */}
          <div className="relative">
            <div className={`absolute left-3 top-1/2 -translate-y-1/2 p-1.5 rounded transition-all duration-300 ${newFocused ? 'text-indigo-600' : 'text-slate-400'}`}>
              <Lock className="h-4 w-4" />
            </div>

            <label 
              className={`absolute left-11 transition-all duration-300 pointer-events-none ${
                isNewFloating 
                  ? 'top-1.5 text-[10px] font-semibold text-indigo-600 uppercase tracking-wider' 
                  : 'top-1/2 -translate-y-1/2 text-sm text-slate-400'
              }`}
            >
              New Master Password
            </label>

            <input
              type={showPass ? 'text' : 'password'}
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value);
                if (confirmError) setConfirmError('');
              }}
              onFocus={() => setNewFocused(true)}
              onBlur={() => setNewFocused(false)}
              className="w-full bg-white text-slate-900 text-sm rounded-xl pl-11 pr-11 h-12 border border-slate-200 hover:border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-50 outline-none transition-all duration-300 pt-5 pb-1.5"
            />

            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute right-3 top-1/2 -translate-y-1/2 h-8 w-8 text-slate-400 hover:text-slate-600 flex items-center justify-center rounded-lg hover:bg-slate-50 transition-colors"
            >
              {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>

          {/* Real-time security metrics visuals */}
          {newPassword.length > 0 && (
            <div className="space-y-3 p-3.5 rounded-xl border border-slate-100 bg-slate-50/50">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500">Security Index Rating:</span>
                <span className={`font-semibold ${strength.color === 'bg-red-500 text-red-500' ? 'text-red-500' : strength.color.includes('amber') ? 'text-amber-600' : strength.color.includes('indigo') ? 'text-indigo-600' : 'text-emerald-600'}`}>
                  {strength.label}
                </span>
              </div>

              {/* Strength scale graphic */}
              <div className="h-1.5 w-full bg-slate-200/60 rounded-full overflow-hidden">
                <div className={`h-full transition-all duration-300 ${strength.color} ${strength.width}`} />
              </div>

              {/* Checklist rules breakdown */}
              <div className="grid grid-cols-2 gap-2 pt-1 font-mono text-[9px] lg:text-[10px] text-slate-500">
                <div className="flex items-center gap-1.5">
                  {rules.length ? <Check className="h-3 w-3 text-emerald-500 stroke-[3px]" /> : <X className="h-3 w-3 text-slate-300" />}
                  <span>8+ characters</span>
                </div>
                <div className="flex items-center gap-1.5">
                  {rules.digit ? <Check className="h-3 w-3 text-emerald-500 stroke-[3px]" /> : <X className="h-3 w-3 text-slate-300" />}
                  <span>Contains numbers</span>
                </div>
                <div className="flex items-center gap-1.5">
                  {rules.special ? <Check className="h-3 w-3 text-emerald-500 stroke-[3px]" /> : <X className="h-3 w-3 text-slate-300" />}
                  <span>Special character</span>
                </div>
                <div className="flex items-center gap-1.5">
                  {rules.upper ? <Check className="h-3 w-3 text-emerald-500 stroke-[3px]" /> : <X className="h-3 w-3 text-slate-300" />}
                  <span>Upper case letter</span>
                </div>
              </div>
            </div>
          )}

          {/* Confirm Input Gate */}
          <div className="relative">
            <div className={`absolute left-3 top-1/2 -translate-y-1/2 p-1.5 rounded transition-all duration-300 ${confirmFocused ? 'text-indigo-600' : 'text-slate-400'}`}>
              <Lock className="h-4 w-4" />
            </div>

            <label 
              className={`absolute left-11 transition-all duration-300 pointer-events-none ${
                isConfirmFloating 
                  ? 'top-1.5 text-[10px] font-semibold text-indigo-600 uppercase tracking-wider' 
                  : 'top-1/2 -translate-y-1/2 text-sm text-slate-400'
              }`}
            >
              Verify Master Password
            </label>

            <input
              type={showConfirmPass ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                if (confirmError) setConfirmError('');
              }}
              onFocus={() => setConfirmFocused(true)}
              onBlur={() => setConfirmFocused(false)}
              className="w-full bg-white text-slate-900 text-sm rounded-xl pl-11 pr-11 h-12 border border-slate-200 hover:border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-50 outline-none transition-all duration-300 pt-5 pb-1.5"
            />

            <button
              type="button"
              onClick={() => setShowConfirmPass(!showConfirmPass)}
              className="absolute right-3 top-1/2 -translate-y-1/2 h-8 w-8 text-slate-400 hover:text-slate-600 flex items-center justify-center rounded-lg hover:bg-slate-50 transition-colors"
            >
              {showConfirmPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>

          {/* Validation reports error */}
          {confirmError && (
            <p className="text-xs text-red-500 pl-1 font-medium flex items-center gap-1 mt-1">
              <span className="inline-block h-1.5 w-1.5 bg-red-500 rounded-full" />
              {confirmError}
            </p>
          )}

          {/* Submit action */}
          <button
            type="submit"
            disabled={isRotating || newPassword.length === 0}
            className={`w-full relative overflow-hidden group h-12 rounded-xl text-white font-bold text-sm flex items-center justify-center gap-2 transition-all ${
              newPassword.length > 0 && !isRotating
                ? 'btn-royal-gold cursor-pointer'
                : 'bg-slate-100 text-slate-400 cursor-not-allowed'
            }`}
          >
            {isRotating ? (
              <div className="flex items-center justify-center gap-2 font-mono">
                <RotateCw className="h-4 w-4 animate-spin shrink-0" />
                <span>Synchronizing rotated keyhashes...</span>
              </div>
            ) : (
              <>
                <span>Commit rotated keypair</span>
                <Check className="h-4 w-4 group-hover:scale-110 transition-transform" />
              </>
            )}
          </button>
        </form>

        {/* Back Link bottom */}
        <div className="text-center pt-2">
          <button
            type="button"
            onClick={() => onNavigate(AuthScreen.LOGIN)}
            className="text-xs font-bold text-[#1d4ed8] hover:text-[#d4af37] transition-all"
          >
            Recall previous credentials? Return to login
          </button>
        </div>
      </div>

      {/* SUCCESS OVERLAY POPUP MODAL */}
      <AnimatePresence>
        {showSuccessModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop Blur screen */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setShowSuccessModal(false);
                onNavigate(AuthScreen.LOGIN);
              }}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />

            {/* Modal Card Layout */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-sm bg-white rounded-2xl p-6 shadow-2xl border border-slate-100 text-center space-y-5"
            >
              <div className="mx-auto h-12 w-12 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
                <Check className="h-6 w-6 stroke-[3px]" />
              </div>

              <div className="space-y-2">
                <h3 className="font-display font-bold text-xl text-slate-900">Keys Re-Rotated!</h3>
                <p className="text-slate-500 text-xs leading-relaxed max-w-xs mx-auto">
                  Your cryptographic credentials have been authorized. High-entropy encryption has been bound to your active domain workspace.
                </p>
              </div>

              {/* Informational bullet lines */}
              <div className="text-left bg-slate-50 border border-slate-100 rounded-xl p-3 space-y-2 font-mono text-[10px] text-slate-400">
                <div className="flex items-center justify-between">
                  <span>Authorized Endpoint:</span>
                  <span className="text-slate-700 font-bold">Node-A392</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Cryptographic Protocol:</span>
                  <span className="text-indigo-600 font-bold">SHA3-512</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  setShowSuccessModal(false);
                  onNavigate(AuthScreen.LOGIN);
                }}
                className="w-full h-11 rounded-xl btn-royal-gold text-white font-bold text-sm flex items-center justify-center gap-1.5 transition-all active:scale-[0.99] cursor-pointer"
              >
                <Command className="h-4 w-4" />
                <span>Access Login Portal</span>
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

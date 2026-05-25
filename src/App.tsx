/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  Command, 
  Cpu, 
  LogOut, 
  Database 
} from 'lucide-react';

import { AuthScreen, UserRole } from './types';
import { RootState, loginSuccess, signupSuccess, logout, setActiveScreen, setEmailAddress, setUserRole } from './store/index.ts';
import BrandingPane from './components/BrandingPane';
import WelcomeScreen from './components/WelcomeScreen';
import LoginScreen from './components/LoginScreen';
import SignupScreen from './components/SignupScreen';
import OtpScreen from './components/OtpScreen';
import ForgotPasswordScreen from './components/ForgotPasswordScreen';
import ResetPasswordScreen from './components/ResetPasswordScreen';
import SuccessScreen from './components/SuccessScreen';
import WorkspaceSelectScreen from './components/WorkspaceSelectScreen';
import RecruiterComingSoonScreen from './components/RecruiterComingSoonScreen';
import WorkspaceDashboard from './components/dashboard/WorkspaceDashboard';

export default function App() {
  const dispatch = useDispatch();
  
  // Master state parameters from Redux
  const { activeScreen, userRole, emailAddress, companyName } = useSelector(
    (state: RootState) => state.auth
  );

  // Triggered when Login succeeds -> routes to Workspace selection
  const handleLoginSuccess = (email: string) => {
    dispatch(loginSuccess({ email }));
  };

  // Triggered when Signup step completes -> captures state and routes to OTP
  const handleSignupSuccess = (role: UserRole, email: string, company: string) => {
    dispatch(signupSuccess({ role, email, company }));
  };

  // Triggered when Forgot password form completes -> mock saves target email
  const handleForgotSuccess = (email: string) => {
    dispatch(setEmailAddress(email));
  };

  // Triggered when OTP verification completes -> routes to success dashboard
  const handleOtpSuccess = () => {
    dispatch(setActiveScreen(AuthScreen.SUCCESS));
  };

  // State restarter
  const handleResetAll = () => {
    dispatch(logout());
  };


  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col justify-between font-sans relative antialiased overflow-x-hidden">
      
      {/* Absolute top grid subtle background */}
      <div className="absolute inset-x-0 top-0 h-[500px] grid-bg opacity-40 pointer-events-none" />

      {activeScreen === AuthScreen.DASHBOARD ? (
        <div className="flex-1 relative z-10 w-full">
          <WorkspaceDashboard 
            userRole={userRole}
            emailAddress={emailAddress}
            companyName={companyName}
            onLogout={handleResetAll}
          />
        </div>
      ) : (
        /* Primary Workspace Split Section */
        <main className="flex-1 flex flex-col lg:flex-row w-full max-w-7xl mx-auto lg:px-6 lg:py-10 relative z-10 items-stretch">
          
          {/* Core Layout Card */}
          <div className="w-full bg-white lg:rounded-3xl lg:shadow-xl lg:shadow-slate-100 border border-slate-200/50 flex flex-col lg:flex-row overflow-hidden min-h-[620px] lg:min-h-[720px]">
            
            {/* Left Side: Active Authentication Form Card */}
            <div className="w-full lg:w-[480px] xl:w-[520px] shrink-0 flex flex-col justify-center p-6 sm:p-10 lg:p-12 bg-white relative">
              <div className="absolute top-4 right-4 text-[9px] font-mono text-slate-400 select-none hidden sm:inline-block tracking-wider">
                SECURE INTEGRITY CONTROL
              </div>

              <div className="w-full">
                <AnimatePresence mode="wait">
                  {activeScreen === AuthScreen.WELCOME && (
                    <div key="welcome" className="w-full animate-in fade-in duration-300">
                      <WelcomeScreen
                        onNavigate={(screen) => dispatch(setActiveScreen(screen))}
                      />
                    </div>
                  )}

                  {activeScreen === AuthScreen.LOGIN && (
                    <div key="login" className="w-full animate-in fade-in duration-300">
                      <LoginScreen 
                        onNavigate={(screen) => dispatch(setActiveScreen(screen))}
                        onSubmitSuccess={handleLoginSuccess}
                      />
                    </div>
                  )}

                  {activeScreen === AuthScreen.SIGNUP && (
                    <div key="signup" className="w-full animate-in fade-in duration-300">
                      <SignupScreen 
                        onNavigate={(screen) => dispatch(setActiveScreen(screen))}
                        onSubmitSuccess={handleSignupSuccess}
                      />
                    </div>
                  )}

                  {activeScreen === AuthScreen.OTP && (
                    <div key="otp" className="w-full animate-in fade-in duration-300">
                      <OtpScreen 
                        userRole={userRole}
                        emailAddress={emailAddress}
                        onNavigate={(screen) => dispatch(setActiveScreen(screen))}
                        onSubmitSuccess={handleOtpSuccess}
                      />
                    </div>
                  )}

                  {activeScreen === AuthScreen.FORGOT && (
                    <div key="forgot" className="w-full animate-in fade-in duration-300">
                      <ForgotPasswordScreen 
                        onNavigate={(screen) => dispatch(setActiveScreen(screen))}
                        onSendLinkSuccess={handleForgotSuccess}
                      />
                    </div>
                  )}

                  {activeScreen === AuthScreen.RESET && (
                    <div key="reset" className="w-full animate-in fade-in duration-300">
                      <ResetPasswordScreen 
                        onNavigate={(screen) => dispatch(setActiveScreen(screen))}
                      />
                    </div>
                  )}

                  {activeScreen === AuthScreen.SUCCESS && (
                    <div key="success" className="w-full animate-in fade-in duration-300">
                      <SuccessScreen 
                        userRole={userRole}
                        emailAddress={emailAddress}
                        companyName={companyName}
                        onResetAll={handleResetAll}
                        onNavigateDashboard={() => dispatch(setActiveScreen(AuthScreen.WORKSPACE_SELECT))}
                      />
                    </div>
                  )}

                  {activeScreen === AuthScreen.WORKSPACE_SELECT && (
                    <div key="workspace-select" className="w-full animate-in fade-in duration-300">
                      <WorkspaceSelectScreen 
                        emailAddress={emailAddress}
                        onSelectFlow={(role) => {
                          dispatch(setUserRole(role));
                          dispatch(setActiveScreen(AuthScreen.DASHBOARD));
                        }}
                        onBack={handleResetAll}
                      />
                    </div>
                  )}

                  {activeScreen === AuthScreen.RECRUITER_COMING_SOON && (
                    <div key="recruiter-coming-soon" className="w-full animate-in fade-in duration-300">
                      <RecruiterComingSoonScreen 
                        onBack={() => dispatch(setActiveScreen(AuthScreen.WORKSPACE_SELECT))}
                        onEnterAdmin={() => {
                          dispatch(setUserRole('staffing'));
                          dispatch(setActiveScreen(AuthScreen.DASHBOARD));
                        }}
                      />
                    </div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Right Side: Branding and simulated stats illustrations (hidden on mobile, right block on desktop) */}
            <div className="flex-1 border-t lg:border-t-0 lg:border-l border-slate-100 shrink-0 overflow-hidden">
              <BrandingPane />
            </div>

          </div>
        </main>
      )}

    </div>
  );
}

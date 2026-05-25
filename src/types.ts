/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export enum AuthScreen {
  WELCOME = 'WELCOME',
  LOGIN = 'LOGIN',
  SIGNUP = 'SIGNUP',
  OTP = 'OTP',
  FORGOT = 'FORGOT',
  RESET = 'RESET',
  SUCCESS = 'SUCCESS',
  WORKSPACE_SELECT = 'WORKSPACE_SELECT',
  RECRUITER_COMING_SOON = 'RECRUITER_COMING_SOON',
  DASHBOARD = 'DASHBOARD'
}

export type UserRole = 'recruiter' | 'sales' | 'staffing' | 'vendor' | 'hiring_manager';

export interface RoleOption {
  id: UserRole;
  title: string;
  description: string;
  icon: string; // Lucide icon name
  tag: string;
}

export interface SignupState {
  step: number; // 1: Role selection, 2: Account setup, 3: AI customization
  role: UserRole | null;
  companyName: string;
  workEmail: string;
  password?: string;
  workspaceName: string;
  aiAssistants: string[];
}

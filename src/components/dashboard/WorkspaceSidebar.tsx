import React from 'react';
import { 
  Layers, 
  Briefcase, 
  Users, 
  UserPlus, 
  Database, 
  Building, 
  FolderKanban, 
  TrendingUp, 
  MessageSquare, 
  Sparkles, 
  Activity, 
  FileText, 
  CreditCard, 
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  LogOut
} from 'lucide-react';
import { motion } from 'motion/react';

interface SidebarProps {
  activeTab: string;
  onNavigateTab: (tabId: string) => void;
  isSidebarCollapsed: boolean;
  setIsSidebarCollapsed: (collapsed: boolean) => void;
  companyName: string;
  userRole: string;
  emailAddress: string;
  onLogout: () => void;
}

export default function WorkspaceSidebar({
  activeTab,
  onNavigateTab,
  isSidebarCollapsed,
  setIsSidebarCollapsed,
  companyName,
  userRole,
  emailAddress,
  onLogout
}: SidebarProps) {

  const sidebarGroups = [
    {
      title: 'Core Workspace',
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: Layers, tabId: 'dashboard' },
        { id: 'jobs', label: 'Jobs', icon: Briefcase, tabId: 'view-jobs' },
        { id: 'candidates', label: 'Candidates', icon: Users, tabId: 'candidates' },
        { id: 'interviews', label: 'Interviews', icon: FolderKanban, tabId: 'interviews' },
        { id: 'contracts', label: 'Contracts', icon: FileText, tabId: 'contracts' },
        { id: 'recruiters', label: 'Recruiters', icon: UserPlus, tabId: 'recruiters' },
        { id: 'bench-sales', label: 'Bench Sales', icon: Database, tabId: 'bench-sales' },
      ]
    },
    {
      title: 'Partners & Clients',
      items: [
        { id: 'vendors', label: 'Vendors', icon: Building, tabId: 'vendors' },
        { id: 'clients', label: 'Clients', icon: FolderKanban, tabId: 'clients' },
      ]
    },
    {
      title: 'Intelligence & Analytics',
      items: [
        { id: 'messages', label: 'Messages', icon: MessageSquare, tabId: 'messages' },
        { id: 'ai-assistant', label: 'AI Assistant', icon: Sparkles, tabId: 'ai-assistant', glow: true },
        { id: 'workflow', label: 'Workflow', icon: Activity, tabId: 'automation' },
        { id: 'analytics', label: 'Analytics', icon: TrendingUp, tabId: 'analytics' },
        { id: 'reports', label: 'Reports', icon: FileText, tabId: 'reports' },
      ]
    },
    {
      title: 'System settings',
      items: [
        { id: 'billing', label: 'Billing', icon: CreditCard, tabId: 'billing' },
        { id: 'settings', label: 'Settings', icon: SlidersHorizontal, tabId: 'settings' }
      ]
    }
  ];

  return (
    <aside 
      className={`border-r border-slate-200 bg-white flex flex-col justify-between h-full select-none relative transition-all duration-300 ${
        isSidebarCollapsed ? 'w-18' : 'w-64'
      }`}
    >
      <div className="flex-1 flex flex-col overflow-y-auto no-scrollbar py-4 px-3 space-y-5">
        {/* Toggle Collapse Button floating in right header margin */}
        <div className="flex items-center justify-end border-b border-slate-100 pb-2.5">
          {!isSidebarCollapsed && (
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#5B5BD6] font-bold block mr-auto pl-1">
              Hiring OS Node
            </span>
          )}
          <button 
            type="button"
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="p-1 px-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-500 hover:text-[#5B5BD6] transition-all cursor-pointer shadow-2xs"
            title={isSidebarCollapsed ? "Expand panel" : "Collapse panel"}
          >
            {isSidebarCollapsed ? <ChevronRight className="h-4.5 w-4.5" /> : <ChevronLeft className="h-4.5 w-4.5" />}
          </button>
        </div>

        {/* Group Render listings */}
        <div className="space-y-4">
          {sidebarGroups.map((group, gIdx) => (
            <div key={gIdx} className="space-y-1">
              {!isSidebarCollapsed && (
                <span className="text-[8.5px] uppercase font-mono tracking-wider text-slate-400 font-bold block px-2 mb-1.5 font-sans">
                  {group.title}
                </span>
              )}
              <div className="space-y-0.5">
                {group.items.map((item) => {
                  const isActive = activeTab === item.tabId;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => onNavigateTab(item.tabId)}
                      className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-xs font-semibold select-none group/nav cursor-pointer transition-all ${
                        isActive 
                          ? 'bg-[#5B5BD6]/10 text-[#5B5BD6] border-l-[3px] border-[#5B5BD6] shadow-2xs font-bold' 
                          : 'text-[#6B7280] hover:text-[#1F2937] hover:bg-slate-50/80'
                      } ${item.glow ? 'relative bg-[#7B61FF]/5 border border-[#7B61FF]/20 text-[#5B5BD6] animate-pulse-subtle' : ''}`}
                      title={item.label}
                    >
                      <item.icon className={`h-4.5 w-4.5 transition-transform group-hover/nav:scale-105 shrink-0 ${
                        isActive ? 'text-[#5B5BD6]' : 'text-[#6B7280]/80 group-hover/nav:text-[#1F2937]'
                      }`} />
                      
                      {!isSidebarCollapsed && (
                        <span className="truncate flex-1 text-left">{item.label}</span>
                      )}
                      
                      {!isSidebarCollapsed && item.glow && (
                        <span className="h-2 w-2 rounded-full bg-[#4F8CFF] animate-pulse shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Profile logout actions */}
      <div className="p-3 border-t border-slate-100 bg-slate-50/50 space-y-3">
        {!isSidebarCollapsed ? (
          <div className="space-y-2">
            <div className="flex items-center gap-2 shrink-0">
              <div className="h-8.5 w-8.5 rounded-lg bg-[#5B5BD6]/10 text-[#5B5BD6] border border-[#5B5BD6]/20 flex items-center justify-center font-display font-medium text-xs">
                {userRole.toUpperCase().slice(0, 2)}
              </div>
              <div className="text-left text-xs leading-none overflow-hidden flex-1">
                <strong className="block text-[#1F2937] font-semibold text-[10.5px] truncate">{emailAddress.split('@')[0]}</strong>
                <span className="text-[8px] font-mono text-slate-400 uppercase tracking-widest mt-0.5 block truncate">{userRole}</span>
              </div>
            </div>
            
            <button
              onClick={onLogout}
              className="w-full py-1.5 rounded-lg border border-rose-200/60 text-rose-500 hover:bg-rose-50 text-[10px] font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2.5">
            <div className="h-8 w-8 rounded-lg bg-[#5B5BD6]/10 text-[#5B5BD6] flex items-center justify-center font-bold text-xs select-none">
              {userRole[0]?.toUpperCase()}
            </div>
            <button 
              onClick={onLogout} 
              className="p-1.5 border border-rose-200 text-rose-500 hover:bg-rose-50 rounded-lg hover:text-rose-600 transition-colors"
              title="Logout Session"
            >
              <LogOut className="h-3.5 w-3.5" />
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}

import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types';
import { Bell, Search, UserCheck, LogOut, ChevronDown, CheckCircle2, Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface NavbarProps {
  onOpenNotifications: () => void;
  unreadCount: number;
  onToggleSidebar?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenNotifications, unreadCount, onToggleSidebar }) => {
  const { user, switchRole, logout } = useAuth();
  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();

  const roles: { key: UserRole; label: string }[] = [
    { key: 'SUPER_ADMIN', label: 'Super Admin' },
    { key: 'HR_ADMIN', label: 'HR Admin' },
    { key: 'HR_EXECUTIVE', label: 'HR Executive' },
    { key: 'FINANCE', label: 'Finance' },
    { key: 'TEAM_LEAD', label: 'Team Lead' },
    { key: 'EMPLOYEE', label: 'Employee' },
    { key: 'IT_ADMIN', label: 'IT Admin' },
  ];

  return (
    <header className="h-16 bg-white border-b border-slate-200 px-4 md:px-6 flex items-center justify-between sticky top-0 z-30 shadow-xs">
      {/* Mobile Toggle & Search Bar */}
      <div className="flex items-center gap-3 flex-1 max-w-md">
        {onToggleSidebar && (
          <button
            onClick={onToggleSidebar}
            className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition"
            aria-label="Toggle Navigation Menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}

        <div className="relative w-full max-w-xs md:max-w-sm">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
          />
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2 md:gap-4">
        {/* Role Switcher Pill */}
        <div className="relative">
          <button
            onClick={() => setShowRoleMenu(!showRoleMenu)}
            className="flex items-center gap-1.5 md:gap-2 px-2.5 md:px-3 py-1.5 bg-brand-50 hover:bg-brand-100/80 border border-brand-200 rounded-lg text-[11px] md:text-xs font-semibold text-brand-700 transition"
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Role:</span>
            <span>{user?.role.replace('_', ' ')}</span>
            <ChevronDown className="w-3 h-3 text-brand-500" />
          </button>

          {showRoleMenu && (
            <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-2">
              <div className="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                Switch Role Context
              </div>
              {roles.map((r) => (
                <button
                  key={r.key}
                  onClick={() => {
                    switchRole(r.key);
                    setShowRoleMenu(false);
                  }}
                  className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-slate-50 ${
                    user?.role === r.key ? 'text-brand-600 font-semibold bg-brand-50/50' : 'text-slate-700'
                  }`}
                >
                  <span>{r.label}</span>
                  {user?.role === r.key && <CheckCircle2 className="w-3.5 h-3.5 text-brand-600" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Notifications Bell */}
        <button
          onClick={onOpenNotifications}
          className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-lg transition"
        >
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
          )}
        </button>

        {/* Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2 md:gap-3 pl-1 md:pl-2 py-1 rounded-lg hover:bg-slate-50 transition"
          >
            <img
              src={user?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}
              alt="Avatar"
              className="w-8 h-8 rounded-full object-cover ring-2 ring-brand-500/20"
            />
            <div className="text-left hidden md:block">
              <div className="text-xs font-semibold text-slate-800">{user?.fullName || 'User'}</div>
              <div className="text-[11px] text-slate-400">{user?.designation}</div>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
          </button>

          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-100 py-1 z-50">
              <div className="px-4 py-2 border-b border-slate-100">
                <p className="text-xs font-semibold text-slate-800">{user?.fullName}</p>
                <p className="text-[11px] text-slate-400">{user?.email}</p>
              </div>
              <button
                onClick={() => {
                  logout();
                  navigate('/login');
                }}
                className="w-full text-left px-4 py-2 text-xs text-red-600 hover:bg-red-50 flex items-center gap-2"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

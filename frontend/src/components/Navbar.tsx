import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { UserRole } from '../types';
import { Bell, Search, UserCheck, LogOut, ChevronDown, CheckCircle2, Menu, Sun, Moon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface NavbarProps {
  onOpenNotifications: () => void;
  unreadCount: number;
  onToggleSidebar?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenNotifications, unreadCount, onToggleSidebar }) => {
  const { user, switchRole, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
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

  // Auto-hide dropdown menus when scrolling or clicking outside
  useEffect(() => {
    if (!showRoleMenu && !showUserMenu) return;

    const handleScroll = () => {
      setShowRoleMenu(false);
      setShowUserMenu(false);
    };

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.role-switcher-container') && !target.closest('.user-menu-container')) {
        setShowRoleMenu(false);
        setShowUserMenu(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { capture: true, passive: true });
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('scroll', handleScroll, { capture: true });
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showRoleMenu, showUserMenu]);

  return (
    <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 md:px-6 flex items-center justify-between sticky top-0 z-30 shadow-xs transition-colors duration-200">
      {/* Mobile Toggle & Search Bar */}
      <div className="flex items-center gap-3 flex-1 max-w-md">
        {onToggleSidebar && (
          <button
            onClick={onToggleSidebar}
            className="lg:hidden p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition"
            aria-label="Toggle Navigation Menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}

        <div className="relative w-full max-w-xs md:max-w-sm">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-9 pr-3 py-1.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 rounded-lg text-xs md:text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-colors"
          />
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2 md:gap-3">
        {/* Theme Switcher Toggle */}
        <button
          onClick={toggleTheme}
          title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
          aria-label="Toggle Theme"
          className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all duration-200 active:scale-95 flex items-center justify-center"
        >
          {theme === 'dark' ? (
            <Sun className="w-5 h-5 text-amber-400 animate-in spin-in-90 duration-300" />
          ) : (
            <Moon className="w-5 h-5 text-slate-600 hover:text-indigo-600 transition-colors" />
          )}
        </button>

        {/* Role Switcher Pill */}
        <div className="relative role-switcher-container">
          <button
            onClick={() => {
              setShowUserMenu(false);
              setShowRoleMenu(!showRoleMenu);
            }}
            className="flex items-center gap-1.5 md:gap-2 px-2.5 md:px-3 py-1.5 bg-brand-50 dark:bg-brand-950/40 hover:bg-brand-100/80 dark:hover:bg-brand-900/50 border border-brand-200 dark:border-brand-800/50 rounded-xl text-[11px] md:text-xs font-semibold text-brand-700 dark:text-brand-300 transition-all duration-200 active:scale-95 shadow-xs"
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Role:</span>
            <span>{user?.role.replace('_', ' ')}</span>
            <ChevronDown className={`w-3.5 h-3.5 text-brand-500 transition-transform duration-300 ${showRoleMenu ? 'rotate-180' : ''}`} />
          </button>

          {showRoleMenu && (
            <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-100/80 dark:border-slate-800 py-2 z-50 animate-dropdown overflow-hidden">
              <div className="px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 border-b border-slate-100/80 dark:border-slate-800 mb-1">
                Switch Role Context
              </div>
              {roles.map((r) => (
                <button
                  key={r.key}
                  onClick={() => {
                    switchRole(r.key);
                    setShowRoleMenu(false);
                  }}
                  className={`w-full text-left px-3.5 py-2 text-xs flex items-center justify-between hover:bg-brand-50/60 dark:hover:bg-slate-800/80 transition-colors duration-150 ${
                    user?.role === r.key ? 'text-brand-600 dark:text-brand-400 font-bold bg-brand-50/80 dark:bg-slate-800' : 'text-slate-700 dark:text-slate-200'
                  }`}
                >
                  <span>{r.label}</span>
                  {user?.role === r.key && <CheckCircle2 className="w-3.5 h-3.5 text-brand-600 dark:text-brand-400 shrink-0" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Notifications Bell */}
        <button
          onClick={onOpenNotifications}
          className="relative p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all duration-200 active:scale-95"
        >
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white dark:ring-slate-900"></span>
          )}
        </button>

        {/* Profile Dropdown */}
        <div className="relative user-menu-container">
          <button
            onClick={() => {
              setShowRoleMenu(false);
              setShowUserMenu(!showUserMenu);
            }}
            className="flex items-center gap-2 md:gap-3 pl-1 md:pl-2 py-1 pr-2 rounded-xl hover:bg-slate-100/80 dark:hover:bg-slate-800 transition-all duration-200 active:scale-95"
          >
            <img
              src={user?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}
              alt="Avatar"
              className="w-8 h-8 rounded-full object-cover ring-2 ring-brand-500/20"
            />
            <div className="text-left hidden md:block">
              <div className="text-xs font-semibold text-slate-800 dark:text-slate-200">{user?.fullName || 'User'}</div>
              <div className="text-[11px] text-slate-400 dark:text-slate-500">{user?.designation}</div>
            </div>
            <ChevronDown className={`w-3.5 h-3.5 text-slate-400 hidden sm:block transition-transform duration-300 ${showUserMenu ? 'rotate-180' : ''}`} />
          </button>

          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-52 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-100/80 dark:border-slate-800 py-1.5 z-50 animate-dropdown overflow-hidden">
              <div className="px-4 py-2.5 border-b border-slate-100/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50">
                <p className="text-xs font-bold text-slate-800 dark:text-slate-100">{user?.fullName}</p>
                <p className="text-[11px] text-slate-400 dark:text-slate-400 truncate">{user?.email}</p>
              </div>
              <button
                onClick={() => {
                  logout();
                  navigate('/login');
                }}
                className="w-full text-left px-4 py-2.5 text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 flex items-center gap-2 transition-colors duration-150"
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

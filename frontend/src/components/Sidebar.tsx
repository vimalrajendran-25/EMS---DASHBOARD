import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  LayoutDashboard,
  Users,
  Clock,
  CalendarDays,
  DollarSign,
  Bell,
  Building2,
  ShieldCheck,
  X,
} from 'lucide-react';

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const role = user?.role || 'EMPLOYEE';

  const isSuperAdmin = role === 'SUPER_ADMIN';
  const isHR = role === 'HR_ADMIN' || role === 'HR_EXECUTIVE' || isSuperAdmin;
  const isFinance = role === 'FINANCE' || isSuperAdmin;

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-40 lg:hidden"
        ></div>
      )}

      <aside
        className={`fixed lg:sticky top-0 left-0 z-50 w-64 bg-slate-900 text-slate-300 flex flex-col h-screen border-r border-slate-800 transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Brand Header */}
        <div className="h-16 px-6 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-500 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-brand-500/20">
              EMS
            </div>
            <div>
              <h1 className="text-sm font-bold text-white tracking-wide">EMS PORTAL</h1>
              <p className="text-[10px] text-brand-400 font-medium tracking-wider uppercase">Enterprise Portal</p>
            </div>
          </div>

          {/* Mobile Close Button */}
          {onClose && (
            <button
              onClick={onClose}
              className="lg:hidden p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Navigation Links */}
        <div className="flex-1 px-4 py-6 space-y-6 overflow-y-auto">
          {/* Dashboards Section */}
          <div>
            <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2">Dashboards</p>
            <div className="space-y-1">
              {(isSuperAdmin || isHR) && (
                <NavLink
                  to="/dashboard/admin"
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition ${
                      isActive ? 'bg-brand-600 text-white shadow-md' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                    }`
                  }
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Admin Dashboard</span>
                </NavLink>
              )}

              {isHR && (
                <NavLink
                  to="/dashboard/hr"
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition ${
                      isActive ? 'bg-brand-600 text-white shadow-md' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                    }`
                  }
                >
                  <Building2 className="w-4 h-4" />
                  <span>HR Dashboard</span>
                </NavLink>
              )}

              <NavLink
                to="/dashboard/employee"
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition ${
                    isActive ? 'bg-brand-600 text-white shadow-md' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                  }`
                }
              >
                <Users className="w-4 h-4" />
                <span>My Dashboard</span>
              </NavLink>
            </div>
          </div>

          {/* Modules Section */}
          <div>
            <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2">Core Modules</p>
            <div className="space-y-1">
              <NavLink
                to="/employees"
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition ${
                    isActive ? 'bg-brand-600 text-white shadow-md' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                  }`
                }
              >
                <Users className="w-4 h-4" />
                <span>Employee Directory</span>
              </NavLink>

              <NavLink
                to="/attendance"
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition ${
                    isActive ? 'bg-brand-600 text-white shadow-md' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                  }`
                }
              >
                <Clock className="w-4 h-4" />
                <span>Attendance Management</span>
              </NavLink>

              <NavLink
                to="/leaves"
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition ${
                    isActive ? 'bg-brand-600 text-white shadow-md' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                  }`
                }
              >
                <CalendarDays className="w-4 h-4" />
                <span>Leave System</span>
              </NavLink>

              {(isFinance || isSuperAdmin || isHR) && (
                <NavLink
                  to="/payroll"
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition ${
                      isActive ? 'bg-brand-600 text-white shadow-md' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                    }`
                  }
                >
                  <DollarSign className="w-4 h-4" />
                  <span>Payroll System</span>
                </NavLink>
              )}

              <NavLink
                to="/notifications"
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition ${
                    isActive ? 'bg-brand-600 text-white shadow-md' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                  }`
                }
              >
                <Bell className="w-4 h-4" />
                <span>Notification Center</span>
              </NavLink>
            </div>
          </div>

          {/* Security & Audit */}
          {isSuperAdmin && (
            <div>
              <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2">System Governance</p>
              <div className="space-y-1">
                <div className="flex items-center gap-3 px-3 py-2 text-xs text-slate-400 hover:bg-slate-800 rounded-lg cursor-pointer">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Security Audit Logs</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Info */}
        <div className="p-4 border-t border-slate-800 text-[11px] text-slate-500">
          <p className="font-semibold text-slate-400">Enterprise v2.4.0</p>
          <p>Spring Boot 3 + React Suite</p>
        </div>
      </aside>
    </>
  );
};

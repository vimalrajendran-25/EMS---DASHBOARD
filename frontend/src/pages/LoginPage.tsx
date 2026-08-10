import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { authService } from '../services/api';
import { Lock, Mail, Building2, ArrowRight, ChevronDown, UserCheck, Sparkles, Sun, Moon } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('admin@ems.com');
  const [password, setPassword] = useState('password123');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showDemoDropdown, setShowDemoDropdown] = useState(false);
  const { login } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const demoAccounts = [
    { label: 'Super Admin', email: 'admin@ems.com', role: 'Executive CTO' },
    { label: 'HR Admin', email: 'hr.admin@ems.com', role: 'Head of HR' },
    { label: 'Finance Controller', email: 'finance@ems.com', role: 'Payroll Lead' },
    { label: 'Employee', email: 'employee@ems.com', role: 'Software Engineer' },
  ];

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await authService.login(email, password);
      login(res);
      if (res.role === 'SUPER_ADMIN') {
        navigate('/dashboard/admin');
      } else if (res.role.includes('HR')) {
        navigate('/dashboard/hr');
      } else {
        navigate('/dashboard/employee');
      }
    } catch (err: any) {
      setError('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 dark:bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden transition-colors duration-200">
      {/* Top Right Theme Switcher */}
      <button
        onClick={toggleTheme}
        title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
        className="absolute top-6 right-6 p-2.5 rounded-2xl bg-white/10 dark:bg-slate-800/80 backdrop-blur-md text-white border border-white/10 dark:border-slate-700 hover:bg-white/20 dark:hover:bg-slate-700 transition-all duration-200 active:scale-95 z-20 flex items-center gap-2 text-xs font-semibold"
      >
        {theme === 'dark' ? (
          <>
            <Sun className="w-4 h-4 text-amber-400" />
            <span>Light Mode</span>
          </>
        ) : (
          <>
            <Moon className="w-4 h-4 text-indigo-300" />
            <span>Dark Mode</span>
          </>
        )}
      </button>

      {/* Background Decorative Gradients */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-brand-600/20 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl"></div>

      <div className="w-full max-w-md bg-white/95 dark:bg-slate-900/90 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-white/20 dark:border-slate-800 relative z-10">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-600 to-indigo-500 flex items-center justify-center text-white font-bold text-lg mx-auto shadow-lg shadow-brand-500/30 mb-3">
            EMS
          </div>
          <h1 className="text-2xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight">EMS Portal</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Employee Management & HR Portal</p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-600 dark:text-rose-300 text-xs font-semibold">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
              Corporate Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
                placeholder="admin@ems.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-xs pt-1">
            <label className="flex items-center gap-2 text-slate-600 dark:text-slate-400 cursor-pointer">
              <input type="checkbox" className="rounded border-slate-300 dark:border-slate-700 text-brand-600 dark:bg-slate-800 focus:ring-brand-500" defaultChecked />
              <span>Remember device</span>
            </label>
            <a href="#forgot" className="text-brand-600 dark:text-brand-400 hover:underline font-semibold">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-700 hover:to-indigo-700 active:scale-[0.98] text-white font-semibold rounded-xl text-sm shadow-lg shadow-brand-500/25 flex items-center justify-center gap-2 transition-all duration-200 ease-out cursor-pointer"
          >
            {loading ? 'Authenticating...' : 'Sign In to Portal'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Demo Quick Accounts Dropdown */}
        <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800">
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowDemoDropdown(!showDemoDropdown)}
              className="w-full py-2.5 px-4 bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-100/90 dark:hover:bg-slate-800 border border-slate-200/90 dark:border-slate-700/80 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center justify-between transition-all duration-200 active:scale-95 shadow-xs"
            >
              <div className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-brand-600 dark:text-brand-400" />
                <span>Select Demo Account...</span>
              </div>
              <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${showDemoDropdown ? 'rotate-180' : ''}`} />
            </button>

            {showDemoDropdown && (
              <div className="absolute left-0 right-0 mt-2 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-100/90 dark:border-slate-800 p-2 z-50 animate-dropdown-down overflow-hidden space-y-1">
                <p className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 border-b border-slate-100 dark:border-slate-800">
                  Quick One-Click Logins
                </p>
                {demoAccounts.map((acc) => (
                  <button
                    key={acc.email}
                    type="button"
                    onClick={() => {
                      setEmail(acc.email);
                      setPassword('password123');
                      setShowDemoDropdown(false);
                    }}
                    className="w-full p-2.5 rounded-xl hover:bg-brand-50/70 dark:hover:bg-slate-800/80 flex items-center justify-between text-xs transition-colors duration-150 group text-left"
                  >
                    <div>
                      <div className="font-bold text-slate-800 dark:text-slate-200 group-hover:text-brand-700 dark:group-hover:text-brand-400">{acc.label}</div>
                      <div className="text-[11px] text-slate-400 dark:text-slate-500">{acc.email}</div>
                    </div>
                    <span className="text-[10px] bg-slate-100 dark:bg-slate-800 group-hover:bg-brand-100 dark:group-hover:bg-brand-950 group-hover:text-brand-700 dark:group-hover:text-brand-300 text-slate-600 dark:text-slate-400 px-2 py-0.5 rounded font-medium transition-colors">
                      {acc.role}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};


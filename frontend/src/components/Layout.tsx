import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';
import { notificationService } from '../services/api';
import { NotificationItem } from '../types';
import { X, Bell, CheckCircle, Info, AlertTriangle } from 'lucide-react';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const location = useLocation();

  useEffect(() => {
    notificationService.getAll().then(setNotifications);
  }, []);

  // Automatically close notifications drawer and mobile sidebar whenever route/tab changes
  useEffect(() => {
    setShowNotifications(false);
    setIsMobileSidebarOpen(false);
  }, [location.pathname]);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const markRead = (id: number) => {
    notificationService.markAsRead(id).then(() => {
      setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)));
    });
  };

  return (
    <div className="h-screen w-screen overflow-hidden flex bg-[#f4f6f9] dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-200">
      <Sidebar isOpen={isMobileSidebarOpen} onClose={() => setIsMobileSidebarOpen(false)} />
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        <Navbar
          onOpenNotifications={() => setShowNotifications(true)}
          unreadCount={unreadCount}
          onToggleSidebar={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
        />
        <main className="flex-1 p-4 md:p-6 overflow-y-auto">{children}</main>
      </div>

      {/* Notification Drawer */}
      {showNotifications && (
        <div
          onClick={() => setShowNotifications(false)}
          className="fixed inset-0 z-50 flex justify-end bg-slate-900/40 dark:bg-slate-950/60 backdrop-blur-xs"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-sm sm:w-96 bg-white dark:bg-slate-900 h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-200 border-l border-slate-100 dark:border-slate-800"
          >
            <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-brand-600 dark:text-brand-400" />
                <h3 className="font-bold text-slate-800 dark:text-slate-100 text-sm">Notification Drawer</h3>
                <span className="bg-brand-100 dark:bg-brand-950 text-brand-700 dark:text-brand-300 text-xs px-2 py-0.5 rounded-full font-semibold border border-brand-200/50 dark:border-brand-800/50">
                  {unreadCount} unread
                </span>
              </div>
              <button
                onClick={() => setShowNotifications(false)}
                className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-400 dark:text-slate-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {notifications.map((n) => (
                <div
                  key={n.id}
                  onClick={() => markRead(n.id)}
                  className={`p-3 rounded-xl border transition cursor-pointer ${
                    n.isRead
                      ? 'bg-slate-50/60 dark:bg-slate-800/40 border-slate-100 dark:border-slate-800/60'
                      : 'bg-brand-50/40 dark:bg-brand-950/30 border-brand-100 dark:border-brand-900/50 shadow-xs'
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    {n.category === 'LEAVE' ? (
                      <Info className="w-4 h-4 text-brand-500 mt-0.5" />
                    ) : n.category === 'PAYROLL' ? (
                      <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5" />
                    )}
                    <div className="flex-1">
                      <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">{n.title}</h4>
                      <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 line-clamp-2">{n.message}</p>
                      <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-1.5">
                        {new Date(n.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

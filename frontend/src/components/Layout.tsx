import React, { useState, useEffect } from 'react';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';
import { notificationService } from '../services/api';
import { NotificationItem } from '../types';
import { X, Bell, CheckCircle, Info, AlertTriangle } from 'lucide-react';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  useEffect(() => {
    notificationService.getAll().then(setNotifications);
  }, []);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const markRead = (id: number) => {
    notificationService.markAsRead(id).then(() => {
      setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)));
    });
  };

  return (
    <div className="min-h-screen flex bg-[#f4f6f9]">
      <Sidebar isOpen={isMobileSidebarOpen} onClose={() => setIsMobileSidebarOpen(false)} />
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar
          onOpenNotifications={() => setShowNotifications(true)}
          unreadCount={unreadCount}
          onToggleSidebar={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
        />
        <main className="flex-1 p-4 md:p-6 overflow-y-auto">{children}</main>
      </div>

      {/* Notification Drawer */}
      {showNotifications && (
        <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/30 backdrop-blur-xs">
          <div className="w-full max-w-sm sm:w-96 bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-200">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-brand-600" />
                <h3 className="font-bold text-slate-800 text-sm">Notification Drawer</h3>
                <span className="bg-brand-100 text-brand-700 text-xs px-2 py-0.5 rounded-full font-semibold">
                  {unreadCount} unread
                </span>
              </div>
              <button
                onClick={() => setShowNotifications(false)}
                className="p-1 hover:bg-slate-100 rounded-lg text-slate-400"
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
                    n.isRead ? 'bg-slate-50/60 border-slate-100' : 'bg-brand-50/40 border-brand-100 shadow-xs'
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
                      <h4 className="text-xs font-bold text-slate-800">{n.title}</h4>
                      <p className="text-xs text-slate-600 mt-1 line-clamp-2">{n.message}</p>
                      <p className="text-[10px] text-slate-400 mt-1.5">
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

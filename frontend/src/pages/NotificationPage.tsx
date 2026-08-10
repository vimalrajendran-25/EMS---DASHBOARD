import React, { useState, useEffect } from 'react';
import { notificationService } from '../services/api';
import { NotificationItem } from '../types';
import { Bell, CheckCircle, Info, AlertTriangle, ShieldCheck, Mail } from 'lucide-react';

export const NotificationPage: React.FC = () => {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [filterCategory, setFilterCategory] = useState<string>('ALL');

  useEffect(() => {
    notificationService.getAll().then(setNotifications);
  }, []);

  const filtered = notifications.filter((n) => {
    if (filterCategory === 'ALL') return true;
    return n.category === filterCategory;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-extrabold text-slate-800 tracking-tight">Notification Center & Outbound Logs</h1>
        <p className="text-xs text-slate-500 mt-0.5">Realtime system broadcasts, email notifications, and activity logs</p>
      </div>

      {/* Categories Filter */}
      <div className="flex items-center gap-2 border-b border-slate-200 text-xs font-semibold text-slate-500 pb-1">
        <button
          onClick={() => setFilterCategory('ALL')}
          className={`px-3 py-1.5 rounded-lg transition ${
            filterCategory === 'ALL' ? 'bg-brand-600 text-white font-bold' : 'hover:bg-slate-100 text-slate-700'
          }`}
        >
          All Notifications
        </button>
        <button
          onClick={() => setFilterCategory('SYSTEM')}
          className={`px-3 py-1.5 rounded-lg transition ${
            filterCategory === 'SYSTEM' ? 'bg-brand-600 text-white font-bold' : 'hover:bg-slate-100 text-slate-700'
          }`}
        >
          System Updates
        </button>
        <button
          onClick={() => setFilterCategory('LEAVE')}
          className={`px-3 py-1.5 rounded-lg transition ${
            filterCategory === 'LEAVE' ? 'bg-brand-600 text-white font-bold' : 'hover:bg-slate-100 text-slate-700'
          }`}
        >
          Leave Alerts
        </button>
        <button
          onClick={() => setFilterCategory('PAYROLL')}
          className={`px-3 py-1.5 rounded-lg transition ${
            filterCategory === 'PAYROLL' ? 'bg-brand-600 text-white font-bold' : 'hover:bg-slate-100 text-slate-700'
          }`}
        >
          Payroll Dispatch
        </button>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filtered.map((item) => (
          <div key={item.id} className="kuber-card p-4 flex items-start gap-4">
            <div className="p-2.5 bg-brand-50 text-brand-600 rounded-xl mt-0.5">
              <Bell className="w-5 h-5" />
            </div>

            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-slate-800">{item.title}</h4>
                <span className="text-[10px] font-mono text-slate-400">
                  {new Date(item.timestamp).toLocaleString()}
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-1">{item.message}</p>
              <div className="mt-2 flex items-center gap-3 text-[10px]">
                <span className="px-2 py-0.5 bg-slate-100 font-bold rounded text-slate-600">{item.category}</span>
                <span className="text-emerald-600 font-semibold flex items-center gap-1">
                  <Mail className="w-3 h-3" /> Email & In-App Notification Sent
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

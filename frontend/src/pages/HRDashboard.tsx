import React, { useEffect, useState } from 'react';
import { StatCard } from '../components/StatCard';
import { dashboardService, leaveService } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { LeaveRequest } from '../types';
import { MetricDetailModal, MetricType } from '../components/MetricDetailModal';
import {
  FileText,
  UserPlus,
  UserX,
  Calendar,
  CheckCircle,
  XCircle,
  Clock,
  Info,
  X,
} from 'lucide-react';

export const HRDashboard: React.FC = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<any>(null);
  const [pendingLeaves, setPendingLeaves] = useState<LeaveRequest[]>([]);
  const [toastMessage, setToastMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
  const [selectedMetric, setSelectedMetric] = useState<MetricType>(null);

  useEffect(() => {
    dashboardService.getHrStats().then(setStats);
    fetchPendingLeaves();
  }, []);

  const showToast = (text: string, type: 'success' | 'error' = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const fetchPendingLeaves = () => {
    leaveService.getAll().then((list) => {
      setPendingLeaves(list.filter((l) => l.status === 'PENDING'));
    });
  };

  const canApproveLeave = (leaveItem: LeaveRequest): { allowed: boolean; reason?: string } => {
    if (!user) return { allowed: false, reason: 'Not authenticated' };

    const isSuperAdmin = user.role === 'SUPER_ADMIN';
    const isHRRole = user.role.includes('HR');

    // Super Admin has full authority to approve any leave request
    if (isSuperAdmin) {
      return { allowed: true };
    }

    if (!isHRRole) {
      return { allowed: false, reason: 'Requires HR or Super Admin role' };
    }

    // HR users cannot approve their own self-applied leave request
    const isSelf =
      leaveItem.employee?.id === user.id ||
      leaveItem.employee?.user?.id === user.id ||
      leaveItem.employee?.user?.email === user.email;

    if (isSelf) {
      return { allowed: false, reason: 'Self-approval not permitted (Requires Super Admin)' };
    }

    return { allowed: true };
  };

  const handleLeaveAction = (id: number, status: 'APPROVED' | 'REJECTED') => {
    leaveService.updateStatus(id, status, user?.fullName || 'Sophia Martinez (Head of HR)', 'Approved via HR Portal').then(() => {
      if (status === 'APPROVED') {
        showToast('Leave request approved successfully!', 'success');
      } else {
        showToast('Leave request rejected.', 'error');
      }
      setPendingLeaves((prev) => prev.filter((l) => l.id !== id));
      dashboardService.getHrStats().then(setStats);
    });
  };

  const newJoiners = [
    { name: 'Aarav Patel', role: 'Full Stack Engineer', dept: 'Engineering', joining: '2026-08-12', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150' },
    { name: 'Ananya Roy', role: 'UX Designer', dept: 'Design', joining: '2026-08-15', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150' },
    { name: 'Karan Malhotra', role: 'QA Lead', dept: 'Engineering', joining: '2026-08-18', avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150' },
  ];

  const interviews = [
    { candidate: 'Rohan Gupta', position: 'DevOps Engineer', time: '02:00 PM Today', interviewer: 'Alex Wright' },
    { candidate: 'Meera Nair', position: 'Product Manager', time: '04:30 PM Today', interviewer: 'Sophia Martinez' },
    { candidate: 'Vikram Singh', position: 'Frontend Developer', time: '11:00 AM Tomorrow', interviewer: 'Priya Sharma' },
  ];

  return (
    <div className="space-y-6">
      {/* Toast Alert Message Banner */}
      {toastMessage && (
        <div className={`p-4 rounded-xl flex items-center justify-between border shadow-lg transition-all duration-300 text-xs font-semibold ${
          toastMessage.type === 'success' ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : 'bg-rose-50 text-rose-800 border-rose-200'
        }`}>
          <div className="flex items-center gap-2.5">
            {toastMessage.type === 'success' ? (
              <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
            ) : (
              <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
            )}
            <span className="text-xs font-bold">{toastMessage.text}</span>
          </div>
          <button onClick={() => setToastMessage(null)} className="p-1 hover:bg-black/5 rounded text-slate-400 hover:text-slate-700">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Page Header */}
      <div>
        <h1 className="text-xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight">HR Command Center</h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Manage Leave Approvals, Onboarding, and Recruitment Pipelines</p>
      </div>

      {/* Top Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Pending Approvals"
          value={pendingLeaves.length}
          subtext="Requires HR review"
          icon={FileText}
          iconBgColor="bg-amber-50"
          iconColor="text-amber-600"
          onClick={() => setSelectedMetric('active')}
        />
        <StatCard
          title="New Joiners (Aug)"
          value={stats?.newJoinersThisMonth || 5}
          subtext="3 onboarding today"
          icon={UserPlus}
          iconBgColor="bg-emerald-50"
          iconColor="text-emerald-600"
          onClick={() => setSelectedMetric('workforce')}
        />
        <StatCard
          title="Exit Requests"
          value={stats?.pendingExits || 1}
          subtext="Notice period active"
          icon={UserX}
          iconBgColor="bg-rose-50"
          iconColor="text-rose-600"
          onClick={() => setSelectedMetric('workforce')}
        />
        <StatCard
          title="Scheduled Interviews"
          value={stats?.upcomingInterviews || 4}
          subtext="Next 48 hours"
          icon={Calendar}
          iconBgColor="bg-indigo-50"
          iconColor="text-indigo-600"
          onClick={() => setSelectedMetric('attendance')}
        />
      </div>

      {/* Row 2: Pending Leave Requests & Upcoming Interviews */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pending Leave Requests */}
        <div className="lg:col-span-2 kuber-card p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-slate-800 dark:text-slate-100 text-sm">Pending Leave Requests</h3>
              <p className="text-xs text-slate-400 dark:text-slate-500">Review employee leave applications requiring authorization</p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-0.5 bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 rounded-full border border-amber-200/50 dark:border-amber-900/50">
              {pendingLeaves.length} Action Needed
            </span>
          </div>

          {pendingLeaves.length === 0 ? (
            <div className="text-center py-10 border border-dashed border-slate-200 dark:border-slate-800 rounded-xl">
              <CheckCircle className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
              <p className="text-xs font-semibold text-slate-700 dark:text-slate-200">All leave requests cleared!</p>
              <p className="text-[11px] text-slate-400 dark:text-slate-500">No pending approvals at this time.</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {pendingLeaves.map((leave) => (
                <div key={leave.id} className="py-3.5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-brand-100 dark:bg-brand-950 text-brand-700 dark:text-brand-300 font-bold flex items-center justify-center text-xs">
                      {leave.employee?.firstName?.[0]}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-800 dark:text-slate-100">
                        {leave.employee?.firstName} {leave.employee?.lastName}{' '}
                        <span className="font-normal text-slate-400 dark:text-slate-500">({leave.employee?.department})</span>
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        <strong className="text-slate-700 dark:text-slate-200">{leave.leaveType} LEAVE</strong> • {leave.startDate} to {leave.endDate} ({leave.totalDays} days)
                      </p>
                      <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">Reason: "{leave.reason}"</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {(() => {
                      const check = canApproveLeave(leave);
                      if (check.allowed) {
                        return (
                          <>
                            <button
                              onClick={() => handleLeaveAction(leave.id, 'APPROVED')}
                              className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1 shadow-xs transition"
                            >
                              <CheckCircle className="w-3.5 h-3.5" /> Approve
                            </button>
                            <button
                              onClick={() => handleLeaveAction(leave.id, 'REJECTED')}
                              className="px-3 py-1 bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 dark:hover:bg-rose-900/60 text-rose-600 dark:text-rose-300 rounded-lg text-xs font-semibold flex items-center gap-1 transition"
                            >
                              <XCircle className="w-3.5 h-3.5" /> Reject
                            </button>
                          </>
                        );
                      } else {
                        return (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-200/80 dark:border-amber-900/50 rounded-lg text-[10px] font-semibold">
                            <Info className="w-3 h-3 text-amber-500 shrink-0" />
                            {check.reason}
                          </span>
                        );
                      }
                    })()}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Interview Schedule */}
        <div className="kuber-card p-5">
          <h3 className="font-bold text-slate-800 dark:text-slate-100 text-sm mb-1">ATS Interview Pipeline</h3>
          <p className="text-xs text-slate-400 dark:text-slate-500 mb-4">Upcoming candidate evaluation rounds</p>

          <div className="space-y-3">
            {interviews.map((item, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">{item.candidate}</h4>
                  <span className="text-[10px] font-semibold px-2 py-0.5 bg-brand-100 dark:bg-brand-950 text-brand-700 dark:text-brand-300 rounded-md">
                    {item.position}
                  </span>
                </div>
                <div className="flex items-center gap-4 mt-2 text-[11px] text-slate-500 dark:text-slate-400">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-brand-500 dark:text-brand-400" /> {item.time}
                  </span>
                  <span>Interviewer: {item.interviewer}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 3: New Joiners Onboarding List */}
      <div className="kuber-card p-5">
        <h3 className="font-bold text-slate-800 dark:text-slate-100 text-sm mb-1">New Joiners Onboarding Tracker</h3>
        <p className="text-xs text-slate-400 dark:text-slate-500 mb-4">Digital onboarding, document verification, and asset allocation status</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {newJoiners.map((joiner, idx) => (
            <div key={idx} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center gap-3">
              <img src={joiner.avatar} alt="Joiner" className="w-12 h-12 rounded-full object-cover ring-2 ring-brand-500/20" />
              <div>
                <h4 className="text-xs font-bold text-slate-800 dark:text-slate-100">{joiner.name}</h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">{joiner.role} • {joiner.dept}</p>
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-[10px] font-semibold px-2 py-0.5 bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 rounded">
                    Joining: {joiner.joining}
                  </span>
                  <span className="text-[10px] text-slate-400 dark:text-slate-500">Assets Assigned</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Metric Detail Modal */}
      <MetricDetailModal type={selectedMetric} onClose={() => setSelectedMetric(null)} />
    </div>
  );
};

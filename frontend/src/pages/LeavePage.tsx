import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { leaveService } from '../services/api';
import { LeaveRequest } from '../types';
import { Calendar, Plus, CheckCircle, XCircle, Clock, X, Info } from 'lucide-react';

export const LeavePage: React.FC = () => {
  const { user } = useAuth();
  const [leaves, setLeaves] = useState<LeaveRequest[]>([]);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'requests' | 'holidays'>('requests');

  const [leaveType, setLeaveType] = useState<'CASUAL' | 'SICK' | 'EARNED'>('CASUAL');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reason, setReason] = useState('');

  const isHR = user?.role === 'SUPER_ADMIN' || user?.role.includes('HR');

  useEffect(() => {
    fetchLeaves();
  }, [user]);

  const fetchLeaves = () => {
    if (isHR) {
      leaveService.getAll().then(setLeaves);
    } else {
      leaveService.getByEmployee(user?.id || 4).then(setLeaves);
    }
  };

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();
    await leaveService.apply({
      employeeId: user?.id || 4,
      leaveType,
      startDate,
      endDate,
      totalDays: 2,
      reason,
    });
    setShowApplyModal(false);
    fetchLeaves();
  };

  const handleAction = async (id: number, status: 'APPROVED' | 'REJECTED') => {
    await leaveService.updateStatus(id, status, user?.fullName || 'HR Admin', 'Processed via Leave Portal');
    fetchLeaves();
  };

  const holidays = [
    { date: '2026-08-15', name: 'Independence Day', day: 'Saturday', type: 'National Holiday' },
    { date: '2026-10-02', name: 'Gandhi Jayanti', day: 'Friday', type: 'National Holiday' },
    { date: '2026-11-08', name: 'Diwali Festival', day: 'Sunday', type: 'Festival' },
    { date: '2026-12-25', name: 'Christmas Day', day: 'Friday', type: 'Festival' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-extrabold text-slate-800 tracking-tight">Leave Management System</h1>
          <p className="text-xs text-slate-500 mt-0.5">Submit leave applications, track balance accrual, and review team requests</p>
        </div>

        <button
          onClick={() => setShowApplyModal(true)}
          className="px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-semibold shadow-md shadow-brand-500/20 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Apply For Leave
        </button>
      </div>

      {/* Leave Balance Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
        <div className="kuber-card p-4 flex items-center justify-between border-l-4 border-l-brand-500">
          <div>
            <p className="text-slate-400 font-semibold">Casual Leave (CL)</p>
            <h3 className="text-xl font-bold text-slate-800 mt-0.5">10 <span className="text-xs font-normal text-slate-400">/ 12 days</span></h3>
          </div>
          <span className="p-2.5 bg-brand-50 text-brand-600 rounded-xl font-bold">CL</span>
        </div>

        <div className="kuber-card p-4 flex items-center justify-between border-l-4 border-l-emerald-500">
          <div>
            <p className="text-slate-400 font-semibold">Sick Leave (SL)</p>
            <h3 className="text-xl font-bold text-slate-800 mt-0.5">7 <span className="text-xs font-normal text-slate-400">/ 8 days</span></h3>
          </div>
          <span className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl font-bold">SL</span>
        </div>

        <div className="kuber-card p-4 flex items-center justify-between border-l-4 border-l-indigo-500">
          <div>
            <p className="text-slate-400 font-semibold">Earned Leave (EL)</p>
            <h3 className="text-xl font-bold text-slate-800 mt-0.5">14 <span className="text-xs font-normal text-slate-400">/ 15 days</span></h3>
          </div>
          <span className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl font-bold">EL</span>
        </div>

        <div className="kuber-card p-4 flex items-center justify-between border-l-4 border-l-amber-500">
          <div>
            <p className="text-slate-400 font-semibold">Comp-Off Days</p>
            <h3 className="text-xl font-bold text-slate-800 mt-0.5">2 <span className="text-xs font-normal text-slate-400">available</span></h3>
          </div>
          <span className="p-2.5 bg-amber-50 text-amber-600 rounded-xl font-bold">CO</span>
        </div>
      </div>

      {/* Tabs: Requests vs Holiday Calendar */}
      <div className="flex items-center gap-2 border-b border-slate-200 text-xs font-semibold text-slate-500">
        <button
          onClick={() => setActiveTab('requests')}
          className={`px-4 py-2 border-b-2 transition ${
            activeTab === 'requests' ? 'border-brand-600 text-brand-600 font-bold' : 'border-transparent hover:text-slate-800'
          }`}
        >
          Leave Applications & Approvals ({leaves.length})
        </button>
        <button
          onClick={() => setActiveTab('holidays')}
          className={`px-4 py-2 border-b-2 transition ${
            activeTab === 'holidays' ? 'border-brand-600 text-brand-600 font-bold' : 'border-transparent hover:text-slate-800'
          }`}
        >
          2026 Company Holiday Calendar
        </button>
      </div>

      {activeTab === 'requests' ? (
        <div className="kuber-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  <th className="py-3.5 px-4">Applicant</th>
                  <th className="py-3.5 px-4">Leave Type</th>
                  <th className="py-3.5 px-4">Duration</th>
                  <th className="py-3.5 px-4">Total Days</th>
                  <th className="py-3.5 px-4">Reason</th>
                  <th className="py-3.5 px-4">Status</th>
                  {isHR && <th className="py-3.5 px-4 text-right">Approval Actions</th>}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {leaves.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 transition">
                    <td className="py-3 px-4 font-bold text-slate-800">
                      {item.employee?.firstName} {item.employee?.lastName}
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 bg-brand-50 text-brand-700 font-bold rounded text-[10px]">
                        {item.leaveType}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-600 font-mono">{item.startDate} to {item.endDate}</td>
                    <td className="py-3 px-4 font-semibold text-slate-700">{item.totalDays} Days</td>
                    <td className="py-3 px-4 text-slate-500 max-w-xs truncate">{item.reason}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        item.status === 'APPROVED' ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' :
                        item.status === 'REJECTED' ? 'bg-rose-50 text-rose-600 border border-rose-200' : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    {isHR && (
                      <td className="py-3 px-4 text-right">
                        {item.status === 'PENDING' ? (
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => handleAction(item.id, 'APPROVED')}
                              className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold text-[10px] flex items-center gap-1"
                            >
                              <CheckCircle className="w-3 h-3" /> Approve
                            </button>
                            <button
                              onClick={() => handleAction(item.id, 'REJECTED')}
                              className="px-2.5 py-1 bg-rose-50 text-rose-600 hover:bg-rose-100 rounded-lg font-semibold text-[10px]"
                            >
                              Reject
                            </button>
                          </div>
                        ) : (
                          <span className="text-[11px] text-slate-400">Decision Finalized</span>
                        )}
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {holidays.map((h, idx) => (
            <div key={idx} className="kuber-card p-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-brand-50 text-brand-600 font-bold flex flex-col items-center justify-center text-xs">
                <span>{h.date.split('-')[1]}</span>
                <span className="text-base font-extrabold">{h.date.split('-')[2]}</span>
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-800">{h.name}</h4>
                <p className="text-[11px] text-slate-500">{h.day} • {h.type}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Apply Leave Modal */}
      {showApplyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-slate-800 text-sm">Submit Leave Application</h3>
              <button onClick={() => setShowApplyModal(false)} className="p-1 text-slate-400 hover:bg-slate-100 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleApply} className="mt-4 space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Leave Category</label>
                <select
                  value={leaveType}
                  onChange={(e) => setLeaveType(e.target.value as any)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                >
                  <option value="CASUAL">Casual Leave (CL)</option>
                  <option value="SICK">Sick Leave (SL)</option>
                  <option value="EARNED">Earned Leave (EL)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Start Date</label>
                  <input
                    type="date"
                    required
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">End Date</label>
                  <input
                    type="date"
                    required
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Reason for Leave</label>
                <textarea
                  rows={3}
                  required
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Explain brief reason for leave..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
                ></textarea>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button type="button" onClick={() => setShowApplyModal(false)} className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl font-semibold">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-xl font-semibold shadow-md">
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { attendanceService } from '../services/api';
import { Attendance } from '../types';
import { Clock, MapPin, CheckCircle, AlertTriangle, Calendar, Plus, X } from 'lucide-react';

export const AttendancePage: React.FC = () => {
  const { user } = useAuth();
  const [attendanceList, setAttendanceList] = useState<Attendance[]>([]);
  const [showCorrectionModal, setShowCorrectionModal] = useState(false);
  const [correctionReason, setCorrectionReason] = useState('');

  useEffect(() => {
    attendanceService.getByEmployee(user?.id || 4).then(setAttendanceList);
  }, [user]);

  const handleApplyCorrection = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Attendance Regularization Request submitted to HR for approval.');
    setShowCorrectionModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-extrabold text-slate-800 tracking-tight">Attendance Management & Rules Engine</h1>
          <p className="text-xs text-slate-500 mt-0.5">Punch tracking, shift overtime calculation, and attendance regularization</p>
        </div>

        <button
          onClick={() => setShowCorrectionModal(true)}
          className="px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-semibold shadow-md shadow-brand-500/20 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Request Attendance Correction
        </button>
      </div>

      {/* Rule Engine Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
        <div className="kuber-card p-4 border-l-4 border-l-amber-500">
          <p className="font-bold text-slate-800">Late Mark Policy</p>
          <p className="text-slate-500 mt-1">Punch In after 09:15 AM marks employee as LATE.</p>
        </div>
        <div className="kuber-card p-4 border-l-4 border-l-rose-500">
          <p className="font-bold text-slate-800">Half-Day Rule</p>
          <p className="text-slate-500 mt-1">Total work hours &lt; 4.5 hrs auto-flags HALF_DAY.</p>
        </div>
        <div className="kuber-card p-4 border-l-4 border-l-indigo-500">
          <p className="font-bold text-slate-800">Overtime Logic</p>
          <p className="text-slate-500 mt-1">Work hours &gt; 9.0 hrs qualifies for overtime pay calculation.</p>
        </div>
        <div className="kuber-card p-4 border-l-4 border-l-emerald-500">
          <p className="font-bold text-slate-800">WFH & Geofence</p>
          <p className="text-slate-500 mt-1">Hybrid punch records verified with location address tag.</p>
        </div>
      </div>

      {/* Attendance Matrix Log */}
      <div className="kuber-card overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-bold text-slate-800 text-sm">Monthly Attendance Matrix Log</h3>
          <span className="text-xs text-slate-400 font-semibold">August 2026</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                <th className="py-3.5 px-4">Date</th>
                <th className="py-3.5 px-4">Employee</th>
                <th className="py-3.5 px-4">Punch In</th>
                <th className="py-3.5 px-4">Punch Out</th>
                <th className="py-3.5 px-4">Work Hours</th>
                <th className="py-3.5 px-4">Overtime</th>
                <th className="py-3.5 px-4">Mode</th>
                <th className="py-3.5 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {attendanceList.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50 transition">
                  <td className="py-3 px-4 font-semibold text-slate-700">{item.date}</td>
                  <td className="py-3 px-4 font-bold text-slate-800">
                    {item.employee?.firstName} {item.employee?.lastName}
                  </td>
                  <td className="py-3 px-4 font-mono text-slate-600">{item.punchIn || '09:14 AM'}</td>
                  <td className="py-3 px-4 font-mono text-slate-600">{item.punchOut || '06:18 PM'}</td>
                  <td className="py-3 px-4 font-bold text-slate-800">{item.workHours || 9.1} hrs</td>
                  <td className="py-3 px-4 text-indigo-600 font-semibold">{item.overtimeHours || 0.1} hrs</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded font-semibold text-[10px]">
                      {item.workType || 'OFFICE'}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      item.status === 'LATE' ? 'bg-amber-50 text-amber-600 border border-amber-200' : 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                    }`}>
                      {item.status || 'PRESENT'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Regularization Modal */}
      {showCorrectionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-slate-800 text-sm">Attendance Regularization Request</h3>
              <button onClick={() => setShowCorrectionModal(false)} className="p-1 text-slate-400 hover:bg-slate-100 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleApplyCorrection} className="mt-4 space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Target Date</label>
                <input type="date" required className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl" defaultValue="2026-08-10" />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Reason for Missed Punch / Correction</label>
                <textarea
                  rows={3}
                  required
                  value={correctionReason}
                  onChange={(e) => setCorrectionReason(e.target.value)}
                  placeholder="System glitch / Client meeting away from office..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
                ></textarea>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button type="button" onClick={() => setShowCorrectionModal(false)} className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl font-semibold">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-xl font-semibold shadow-md">
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

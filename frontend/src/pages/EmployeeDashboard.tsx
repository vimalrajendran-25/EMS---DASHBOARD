import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { attendanceService, leaveService, payrollService } from '../services/api';
import { Attendance, LeaveRequest, Payroll } from '../types';
import {
  Clock,
  MapPin,
  CheckCircle,
  Calendar,
  FileText,
  Laptop,
  CheckSquare,
  Megaphone,
  TrendingUp,
} from 'lucide-react';

export const EmployeeDashboard: React.FC = () => {
  const { user } = useAuth();
  const [punchedIn, setPunchedIn] = useState(false);
  const [punchTime, setPunchTime] = useState<string | null>(null);
  const [workType, setWorkType] = useState('OFFICE');
  const [timeElapsed, setTimeElapsed] = useState('04:18:22');
  const [leaveHistory, setLeaveHistory] = useState<LeaveRequest[]>([]);
  const [payrollHistory, setPayrollHistory] = useState<Payroll[]>([]);
  const [attendanceLog, setAttendanceLog] = useState<Attendance[]>([]);

  useEffect(() => {
    // Timer ticker
    const timer = setInterval(() => {
      const parts = timeElapsed.split(':').map(Number);
      let sec = parts[2] + 1;
      let min = parts[1];
      let hr = parts[0];
      if (sec >= 60) {
        sec = 0;
        min += 1;
      }
      if (min >= 60) {
        min = 0;
        hr += 1;
      }
      setTimeElapsed(
        `${String(hr).padStart(2, '0')}:${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`
      );
    }, 1000);
    return () => clearInterval(timer);
  }, [timeElapsed]);

  useEffect(() => {
    attendanceService.getByEmployee(user?.id || 4).then(setAttendanceLog);
    leaveService.getByEmployee(user?.id || 4).then(setLeaveHistory);
    payrollService.getByEmployee(user?.id || 4).then(setPayrollHistory);
  }, [user]);

  const handlePunchIn = () => {
    attendanceService.punchIn(user?.id || 4, workType, 'HQ Tech Park Bangalore').then((att) => {
      setPunchedIn(true);
      setPunchTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    });
  };

  const handlePunchOut = () => {
    attendanceService.punchOut(user?.id || 4).then(() => {
      setPunchedIn(false);
      setPunchTime(null);
    });
  };

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="p-4 sm:p-6 bg-gradient-to-r from-slate-900 via-slate-800 to-brand-950 text-white rounded-2xl shadow-xl flex flex-col md:flex-row items-stretch md:items-center justify-between gap-6">
        <div>
          <span className="px-2.5 py-0.5 bg-brand-500/20 text-brand-300 text-[11px] font-bold rounded-md uppercase tracking-wider">
            Employee Workspace
          </span>
          <h1 className="text-xl sm:text-2xl font-bold mt-1">Welcome back, {user?.fullName}! 👋</h1>
          <p className="text-xs text-slate-300 mt-1">
            {user?.designation} • {user?.department} • ID: {user?.employeeId}
          </p>
        </div>

        {/* Live Punch In / Out Card */}
        <div className="bg-white/10 backdrop-blur-md border border-white/10 p-4 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6">
          <div className="text-left sm:text-right">
            <p className="text-[10px] uppercase font-bold text-slate-300">Shift Clock (09:00 - 18:00)</p>
            <div className="text-2xl font-mono font-bold tracking-wider text-emerald-400 mt-0.5">
              {punchedIn ? timeElapsed : '00:00:00'}
            </div>
            <p className="text-[11px] text-slate-300">
              Status: <span className="font-semibold text-white">{punchedIn ? `Punched In (${punchTime})` : 'Not Punched In'}</span>
            </p>
          </div>

          <div className="space-y-2">
            <select
              value={workType}
              onChange={(e) => setWorkType(e.target.value)}
              className="bg-slate-800 border border-slate-700 text-white text-xs rounded-lg px-2.5 py-1 focus:outline-none"
            >
              <option value="OFFICE">Office Mode</option>
              <option value="WFH">WFH Mode</option>
              <option value="FIELD">Field Duty</option>
            </select>

            {!punchedIn ? (
              <button
                onClick={handlePunchIn}
                className="w-full px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs rounded-lg shadow-md flex items-center justify-center gap-1.5 transition"
              >
                <Clock className="w-4 h-4" /> Punch In Now
              </button>
            ) : (
              <button
                onClick={handlePunchOut}
                className="w-full px-4 py-2 bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs rounded-lg shadow-md flex items-center justify-center gap-1.5 transition"
              >
                <Clock className="w-4 h-4" /> Punch Out
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Row 1: Leave Balance Breakdown */}
      <div>
        <h3 className="font-bold text-slate-800 dark:text-slate-100 text-sm mb-3">Leave Balance Summary (2026)</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="kuber-card p-4 border-l-4 border-l-brand-500">
            <p className="text-xs text-slate-400 dark:text-slate-500 font-semibold">Casual Leave (CL)</p>
            <h4 className="text-xl font-bold text-slate-800 dark:text-slate-100 mt-1">10 <span className="text-xs font-normal text-slate-400 dark:text-slate-500">/ 12 remaining</span></h4>
          </div>
          <div className="kuber-card p-4 border-l-4 border-l-emerald-500">
            <p className="text-xs text-slate-400 dark:text-slate-500 font-semibold">Sick Leave (SL)</p>
            <h4 className="text-xl font-bold text-slate-800 dark:text-slate-100 mt-1">7 <span className="text-xs font-normal text-slate-400 dark:text-slate-500">/ 8 remaining</span></h4>
          </div>
          <div className="kuber-card p-4 border-l-4 border-l-indigo-500">
            <p className="text-xs text-slate-400 dark:text-slate-500 font-semibold">Earned Leave (EL)</p>
            <h4 className="text-xl font-bold text-slate-800 dark:text-slate-100 mt-1">14 <span className="text-xs font-normal text-slate-400 dark:text-slate-500">/ 15 remaining</span></h4>
          </div>
          <div className="kuber-card p-4 border-l-4 border-l-amber-500">
            <p className="text-xs text-slate-400 dark:text-slate-500 font-semibold">Comp-Off Balance</p>
            <h4 className="text-xl font-bold text-slate-800 dark:text-slate-100 mt-1">2 <span className="text-xs font-normal text-slate-400 dark:text-slate-500">Days available</span></h4>
          </div>
        </div>
      </div>

      {/* Row 2: Assigned Tasks, Announcements & Company Assets */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sprint Tasks */}
        <div className="kuber-card p-5">
          <div className="flex items-center gap-2 mb-3">
            <CheckSquare className="w-4 h-4 text-brand-600 dark:text-brand-400" />
            <h3 className="font-bold text-slate-800 dark:text-slate-100 text-sm">Sprint Tasks & Deliverables</h3>
          </div>

          <div className="space-y-2.5">
            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
              <div>
                <p className="font-bold text-slate-800 dark:text-slate-200">Refactor Auth Middleware</p>
                <p className="text-[11px] text-slate-400 dark:text-slate-500">Sprint 14 • Due Tomorrow</p>
              </div>
              <span className="px-2 py-0.5 bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 text-[10px] font-bold rounded">In Progress</span>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
              <div>
                <p className="font-bold text-slate-800 dark:text-slate-200">Spring Boot API Docs Swagger</p>
                <p className="text-[11px] text-slate-400 dark:text-slate-500">Sprint 14 • Completed</p>
              </div>
              <span className="px-2 py-0.5 bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-[10px] font-bold rounded">Done</span>
            </div>
          </div>
        </div>

        {/* System Announcements */}
        <div className="kuber-card p-5">
          <div className="flex items-center gap-2 mb-3">
            <Megaphone className="w-4 h-4 text-amber-500" />
            <h3 className="font-bold text-slate-800 dark:text-slate-100 text-sm">Company Announcements</h3>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3 bg-amber-50/60 dark:bg-amber-950/30 border border-amber-100 dark:border-amber-900/50 rounded-xl">
              <h4 className="font-bold text-slate-800 dark:text-slate-200">Independence Day Holiday Notice</h4>
              <p className="text-slate-600 dark:text-slate-400 mt-1">The office will remain closed on August 15th, 2026. Happy Independence Day!</p>
              <p className="text-[10px] text-amber-700 dark:text-amber-400 mt-2 font-semibold">Posted by HR Team</p>
            </div>
          </div>
        </div>

        {/* Assets & KPI Progress */}
        <div className="kuber-card p-5">
          <div className="flex items-center gap-2 mb-3">
            <Laptop className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <h3 className="font-bold text-slate-800 dark:text-slate-100 text-sm">Assigned Assets & Equipment</h3>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-lg">
              <span className="font-semibold text-slate-700 dark:text-slate-300">MacBook Pro 16" M3 Max</span>
              <span className="text-[10px] font-mono bg-slate-200 dark:bg-slate-700 px-1.5 py-0.5 rounded text-slate-800 dark:text-slate-200">AST-8921</span>
            </div>
            <div className="flex items-center justify-between p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-lg">
              <span className="font-semibold text-slate-700 dark:text-slate-300">Dell UltraSharp 27" Monitor</span>
              <span className="text-[10px] font-mono bg-slate-200 dark:bg-slate-700 px-1.5 py-0.5 rounded text-slate-800 dark:text-slate-200">AST-4412</span>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
            <div className="flex justify-between items-center text-xs mb-1">
              <span className="font-bold text-slate-800 dark:text-slate-100">Q3 Performance KPI Goal</span>
              <span className="text-brand-600 dark:text-brand-400 font-bold">92%</span>
            </div>
            <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-brand-600 rounded-full w-[92%]"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

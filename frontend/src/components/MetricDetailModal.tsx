import React from 'react';
import { X, Users, UserCheck, Clock, DollarSign, ArrowUpRight, CheckCircle2, AlertCircle, Building2, Calendar, FileText, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export type MetricType = 'workforce' | 'active' | 'attendance' | 'payroll' | null;

interface MetricDetailModalProps {
  type: MetricType;
  onClose: () => void;
}

export const MetricDetailModal: React.FC<MetricDetailModalProps> = ({ type, onClose }) => {
  const navigate = useNavigate();

  if (!type) return null;

  const handleNavigate = (path: string) => {
    onClose();
    navigate(path);
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-800 text-slate-800 dark:text-slate-100 overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200"
      >
        {/* Modal Header */}
        {type === 'workforce' && (
          <div className="px-6 py-5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white font-bold">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-base text-white">Total Workforce Analytics</h3>
                <p className="text-xs text-blue-100">Headcount distribution & employment types</p>
              </div>
            </div>
            <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-white/10 text-blue-100 hover:text-white transition">
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        {type === 'active' && (
          <div className="px-6 py-5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white font-bold">
                <UserCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-base text-white">Active Workforce & Leave Status</h3>
                <p className="text-xs text-emerald-100">Active status, leaves, and daily presence breakdown</p>
              </div>
            </div>
            <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-white/10 text-emerald-100 hover:text-white transition">
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        {type === 'attendance' && (
          <div className="px-6 py-5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white font-bold">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-base text-white">Daily Attendance Insights</h3>
                <p className="text-xs text-indigo-100">93.1% Present rate • Shift & punch timings</p>
              </div>
            </div>
            <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-white/10 text-indigo-100 hover:text-white transition">
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        {type === 'payroll' && (
          <div className="px-6 py-5 bg-gradient-to-r from-amber-600 to-orange-600 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white font-bold">
                <DollarSign className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-base text-white">Monthly Payroll Disbursal</h3>
                <p className="text-xs text-amber-100">Jul 2026 Salary breakdown & department costs</p>
              </div>
            </div>
            <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-white/10 text-amber-100 hover:text-white transition">
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Modal Content Body */}
        <div className="p-6 overflow-y-auto space-y-5">
          {/* Workforce Detail View */}
          {type === 'workforce' && (
            <>
              <div className="grid grid-cols-3 gap-3">
                <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-100 text-center">
                  <div className="text-2xl font-extrabold text-blue-700">48</div>
                  <div className="text-xs font-semibold text-blue-900 mt-0.5">Total Workforce</div>
                </div>
                <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-100 text-center">
                  <div className="text-2xl font-extrabold text-emerald-700">38</div>
                  <div className="text-xs font-semibold text-emerald-900 mt-0.5">Full-Time (80%)</div>
                </div>
                <div className="p-4 rounded-xl bg-purple-50/70 border border-purple-100 text-center">
                  <div className="text-2xl font-extrabold text-purple-700">10</div>
                  <div className="text-xs font-semibold text-purple-900 mt-0.5">Contract & Interns</div>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5">
                  Department Headcount Distribution
                </h4>
                <div className="space-y-2">
                  {[
                    { dept: 'Engineering', count: 20, pct: '41.6%', lead: 'Marcus Vance' },
                    { dept: 'Human Resources', count: 8, pct: '16.6%', lead: 'Sophia Martinez' },
                    { dept: 'Marketing & Sales', count: 8, pct: '16.6%', lead: 'Rajesh Kumar' },
                    { dept: 'Finance & Payroll', count: 6, pct: '12.5%', lead: 'David Chen' },
                    { dept: 'Operations & IT', count: 6, pct: '12.5%', lead: 'Robert Fox' },
                  ].map((d) => (
                    <div key={d.dept} className="p-3 rounded-xl border border-slate-100 bg-slate-50/50 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2.5">
                        <Building2 className="w-4 h-4 text-blue-600" />
                        <div>
                          <span className="font-bold text-slate-800">{d.dept}</span>
                          <span className="text-[11px] text-slate-400 block">Lead: {d.lead}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="font-bold text-slate-800">{d.count} Emps</span>
                        <span className="text-[11px] text-slate-500 block">{d.pct} of total</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Active Employees View */}
          {type === 'active' && (
            <>
              <div className="grid grid-cols-3 gap-3">
                <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-100 text-center">
                  <div className="text-2xl font-extrabold text-emerald-700">44</div>
                  <div className="text-xs font-semibold text-emerald-900 mt-0.5">Active Workforce</div>
                </div>
                <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-100 text-center">
                  <div className="text-2xl font-extrabold text-amber-700">3</div>
                  <div className="text-xs font-semibold text-amber-900 mt-0.5">On Leave Today</div>
                </div>
                <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-100 text-center">
                  <div className="text-2xl font-extrabold text-blue-700">4</div>
                  <div className="text-xs font-semibold text-blue-900 mt-0.5">WFH Remote</div>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5">
                  Employees Currently On Approved Leave
                </h4>
                <div className="space-y-2">
                  {[
                    { name: 'Priya Sharma', role: 'Senior Software Engineer', type: 'Casual Leave', duration: 'Aug 10 - Aug 12', status: 'Approved' },
                    { name: 'Amit Patel', role: 'QA Lead', type: 'Sick Leave', duration: 'Aug 10 - Aug 11', status: 'Approved' },
                    { name: 'Vikram Singh', role: 'Frontend Developer', type: 'Privilege Leave', duration: 'Aug 08 - Aug 14', status: 'Approved' },
                  ].map((l) => (
                    <div key={l.name} className="p-3 rounded-xl border border-amber-100 bg-amber-50/30 flex items-center justify-between text-xs">
                      <div>
                        <div className="font-bold text-slate-800">{l.name}</div>
                        <div className="text-[11px] text-slate-500">{l.role} • <strong className="text-amber-700">{l.type}</strong></div>
                      </div>
                      <div className="text-right">
                        <span className="text-[11px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded font-semibold">{l.duration}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Attendance View */}
          {type === 'attendance' && (
            <>
              <div className="grid grid-cols-4 gap-2.5">
                <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-100 text-center">
                  <div className="text-xl font-extrabold text-emerald-700">36</div>
                  <div className="text-[11px] font-semibold text-emerald-900 mt-0.5">On-Time</div>
                </div>
                <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-100 text-center">
                  <div className="text-xl font-extrabold text-amber-700">5</div>
                  <div className="text-[11px] font-semibold text-amber-900 mt-0.5">Late Arrival</div>
                </div>
                <div className="p-3 rounded-xl bg-blue-50/70 border border-blue-100 text-center">
                  <div className="text-xl font-extrabold text-blue-700">4</div>
                  <div className="text-[11px] font-semibold text-blue-900 mt-0.5">WFH</div>
                </div>
                <div className="p-3 rounded-xl bg-rose-50/70 border border-rose-100 text-center">
                  <div className="text-xl font-extrabold text-rose-700">3</div>
                  <div className="text-[11px] font-semibold text-rose-900 mt-0.5">On Leave</div>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5">
                  Today's Punch Audit Snapshot
                </h4>
                <div className="space-y-2">
                  {[
                    { name: 'Alexander Wright', time: '09:02 AM', status: 'On-Time', loc: 'HQ Office (Bangalore)' },
                    { name: 'Sophia Martinez', time: '09:14 AM', status: 'On-Time', loc: 'HQ Office (Bangalore)' },
                    { name: 'Priya Sharma', time: '09:42 AM', status: 'Late Arrival (+12m)', loc: 'WFH Home Location' },
                    { name: 'David Chen', time: '08:55 AM', status: 'On-Time', loc: 'HQ Office (Bangalore)' },
                  ].map((a) => (
                    <div key={a.name} className="p-3 rounded-xl border border-slate-100 bg-slate-50/50 flex items-center justify-between text-xs">
                      <div>
                        <div className="font-bold text-slate-800">{a.name}</div>
                        <div className="text-[11px] text-slate-400">{a.loc}</div>
                      </div>
                      <div className="text-right">
                        <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                          a.status.includes('Late') ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                        }`}>
                          {a.time} ({a.status})
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Payroll View */}
          {type === 'payroll' && (
            <>
              <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/80 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-amber-800 uppercase tracking-wider">Gross Payroll Output (Jul 2026)</span>
                  <div className="text-3xl font-extrabold text-amber-900 mt-0.5">₹42,50,000</div>
                  <span className="text-xs text-amber-700">100% Disbursed via Direct Bank Deposit</span>
                </div>
                <div className="px-3 py-1 bg-amber-600 text-white font-semibold text-xs rounded-full">
                  Status: Completed
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5">
                  Cost Breakdown & Components
                </h4>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl border border-slate-100 bg-slate-50/60">
                    <span className="text-slate-400 block">Base Salaries:</span>
                    <strong className="text-slate-800 text-sm">₹34,80,000</strong>
                  </div>
                  <div className="p-3 rounded-xl border border-slate-100 bg-slate-50/60">
                    <span className="text-slate-400 block">Allowances & HRA:</span>
                    <strong className="text-slate-800 text-sm">₹5,20,000</strong>
                  </div>
                  <div className="p-3 rounded-xl border border-slate-100 bg-slate-50/60">
                    <span className="text-slate-400 block">Employer PF & ESI:</span>
                    <strong className="text-slate-800 text-sm">₹2,50,000</strong>
                  </div>
                  <div className="p-3 rounded-xl border border-slate-100 bg-slate-50/60">
                    <span className="text-slate-400 block">Total Net Payout:</span>
                    <strong className="text-emerald-700 text-sm">₹39,80,000</strong>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Modal Footer with Quick Action */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200/80 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-xl text-xs font-semibold transition"
          >
            Close
          </button>

          {type === 'workforce' && (
            <button
              onClick={() => handleNavigate('/employees')}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-md transition"
            >
              Go to Employee Directory <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}

          {type === 'active' && (
            <button
              onClick={() => handleNavigate('/leaves')}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-md transition"
            >
              Go to Leave Management <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}

          {type === 'attendance' && (
            <button
              onClick={() => handleNavigate('/attendance')}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-md transition"
            >
              Go to Attendance System <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}

          {type === 'payroll' && (
            <button
              onClick={() => handleNavigate('/payroll')}
              className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-md transition"
            >
              Go to Payroll System <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

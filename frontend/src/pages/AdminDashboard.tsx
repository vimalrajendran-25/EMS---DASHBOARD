import React, { useEffect, useState } from 'react';
import { StatCard } from '../components/StatCard';
import { dashboardService } from '../services/api';
import {
  Users,
  UserCheck,
  Clock,
  DollarSign,
  TrendingDown,
  Ticket,
  Activity,
  ArrowUpRight,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    dashboardService.getAdminStats().then(setStats);
  }, []);

  const employeeGrowthData = [
    { month: 'Jan', headcount: 32 },
    { month: 'Feb', headcount: 35 },
    { month: 'Mar', headcount: 38 },
    { month: 'Apr', headcount: 41 },
    { month: 'May', headcount: 43 },
    { month: 'Jun', headcount: 45 },
    { month: 'Jul', headcount: 48 },
  ];

  const departmentData = [
    { name: 'Engineering', count: 20, color: '#3b82f6' },
    { name: 'Human Resources', count: 8, color: '#ec4899' },
    { name: 'Finance & Payroll', count: 6, color: '#10b981' },
    { name: 'Marketing', count: 8, color: '#f59e0b' },
    { name: 'Operations', count: 6, color: '#8b5cf6' },
  ];

  const attendanceSplit = [
    { name: 'Present On-Time', value: 36, color: '#10b981' },
    { name: 'Late Arrival', value: 5, color: '#f59e0b' },
    { name: 'WFH', value: 4, color: '#3b82f6' },
    { name: 'On Leave', value: 3, color: '#ef4444' },
  ];

  const payrollMonthly = [
    { month: 'Mar', amount: 3800000 },
    { month: 'Apr', amount: 3950000 },
    { month: 'May', amount: 4100000 },
    { month: 'Jun', amount: 4150000 },
    { month: 'Jul', amount: 4250000 },
  ];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-extrabold text-slate-800 tracking-tight">Executive Admin Dashboard</h1>
          <p className="text-xs text-slate-500 mt-0.5">Real-time Organization Analytics & Workforce Metrics</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold rounded-full flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Live System Status: Normal
          </span>
        </div>
      </div>

      {/* Top Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Workforce"
          value={stats?.totalEmployees || 48}
          trend="+12% YoY"
          subtext="vs last year"
          icon={Users}
          iconBgColor="bg-blue-50"
          iconColor="text-blue-600"
        />
        <StatCard
          title="Active Employees"
          value={stats?.activeEmployees || 44}
          subtext={`${stats?.onLeaveEmployees || 3} on leave today`}
          icon={UserCheck}
          iconBgColor="bg-emerald-50"
          iconColor="text-emerald-600"
        />
        <StatCard
          title="Today's Attendance"
          value={`${stats?.presentToday || 41} / ${stats?.activeEmployees || 44}`}
          trend="93% Present"
          icon={Clock}
          iconBgColor="bg-indigo-50"
          iconColor="text-indigo-600"
        />
        <StatCard
          title="Monthly Payroll"
          value={`₹${((stats?.totalPayrollProcessed || 4250000) / 100000).toFixed(1)} Lakhs`}
          subtext="Jul 2026 Processed"
          icon={DollarSign}
          iconBgColor="bg-amber-50"
          iconColor="text-amber-600"
        />
      </div>

      {/* Row 2: Headcount Growth Chart & Attendance Split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Headcount Growth Area Chart */}
        <div className="lg:col-span-2 kuber-card p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-slate-800 text-sm">Workforce Growth Trend</h3>
              <p className="text-xs text-slate-400">Headcount expansion over last 7 months</p>
            </div>
            <span className="text-xs font-semibold text-brand-600 flex items-center gap-1">
              +33% Expansion <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={employeeGrowthData}>
                <defs>
                  <linearGradient id="growthGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" tickLine={false} axisLine={{ stroke: '#e2e8f0' }} tick={{ fontSize: 12 }} />
                <YAxis tickLine={false} axisLine={{ stroke: '#e2e8f0' }} tick={{ fontSize: 12 }} />
                <Tooltip />
                <Area type="monotone" dataKey="headcount" stroke="#3b82f6" strokeWidth={2.5} fillOpacity={1} fill="url(#growthGradient)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Attendance Split Donut */}
        <div className="kuber-card p-5">
          <h3 className="font-bold text-slate-800 text-sm mb-1">Attendance Breakdown</h3>
          <p className="text-xs text-slate-400 mb-4">Today's workforce presence status</p>

          <div className="h-48 relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={attendanceSplit} cx="50%" cy="50%" innerRadius={55} outerRadius={75} paddingAngle={4} dataKey="value">
                  {attendanceSplit.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-slate-100 text-xs">
            {attendanceSplit.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></span>
                <span className="text-slate-600">{item.name}: <strong className="text-slate-800">{item.value}</strong></span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 3: Monthly Payroll Bar Chart & Department Headcount */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Monthly Payroll Expense */}
        <div className="lg:col-span-2 kuber-card p-5">
          <h3 className="font-bold text-slate-800 text-sm mb-1">Payroll Outflow Analytics</h3>
          <p className="text-xs text-slate-400 mb-4">Monthly gross salary payouts (in INR)</p>

          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={payrollMonthly}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" tickLine={false} axisLine={{ stroke: '#e2e8f0' }} tick={{ fontSize: 12 }} />
                <YAxis tickFormatter={(v) => `₹${(v / 100000).toFixed(0)}L`} tickLine={false} axisLine={{ stroke: '#e2e8f0' }} tick={{ fontSize: 12 }} />
                <Tooltip formatter={(value: any) => [`₹${Number(value).toLocaleString()}`, 'Payroll Payout']} />
                <Bar dataKey="amount" fill="#6366f1" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Department Distribution */}
        <div className="kuber-card p-5">
          <h3 className="font-bold text-slate-800 text-sm mb-1">Department Headcount</h3>
          <p className="text-xs text-slate-400 mb-4">Distribution by team function</p>

          <div className="space-y-3">
            {departmentData.map((dept) => (
              <div key={dept.name}>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-slate-700">{dept.name}</span>
                  <span className="text-slate-500">{dept.count} emps</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${(dept.count / 48) * 100}%`,
                      backgroundColor: dept.color,
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Audit Activities */}
      <div className="kuber-card p-5">
        <div className="flex items-center gap-2 mb-4">
          <Activity className="w-4 h-4 text-brand-600" />
          <h3 className="font-bold text-slate-800 text-sm">System Real-time Audit Stream</h3>
        </div>

        <div className="divide-y divide-slate-100">
          {(stats?.recentActivities || [
            { action: 'PUNCH_IN', userEmail: 'employee@ems.com', details: 'Punched in at 09:14 AM (WFH)', timestamp: '2026-08-10T09:14:00' },
            { action: 'LEAVE_APPLY', userEmail: 'hr.admin@ems.com', details: 'Submitted Casual Leave for Aug 15', timestamp: '2026-08-10T08:30:00' },
            { action: 'PAYROLL_PROCESSED', userEmail: 'finance@ems.com', details: 'Batch payroll output generated for July', timestamp: '2026-08-09T17:00:00' },
          ]).map((act: any, idx: number) => (
            <div key={idx} className="py-3 flex items-center justify-between text-xs">
              <div className="flex items-center gap-3">
                <span className="px-2 py-0.5 rounded font-mono text-[10px] font-bold bg-slate-100 text-slate-700">
                  {act.action}
                </span>
                <span className="text-slate-800 font-semibold">{act.userEmail}</span>
                <span className="text-slate-500">{act.details}</span>
              </div>
              <span className="text-slate-400 text-[11px]">
                {new Date(act.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

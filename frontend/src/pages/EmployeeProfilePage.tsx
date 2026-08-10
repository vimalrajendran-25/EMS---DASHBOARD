import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { employeeService } from '../services/api';
import { Employee } from '../types';
import {
  User,
  Briefcase,
  DollarSign,
  FileText,
  Laptop,
  Clock,
  Calendar,
  Network,
  ArrowLeft,
  CheckCircle2,
} from 'lucide-react';

export const EmployeeProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [activeTab, setActiveTab] = useState<'personal' | 'professional' | 'payroll' | 'assets' | 'org'>('personal');
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      employeeService.getById(Number(id)).then(setEmployee);
    }
  }, [id]);

  if (!employee) {
    return <div className="p-6 text-xs font-semibold text-slate-500">Loading 360° Employee Profile...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Top Bar Navigation */}
      <button
        onClick={() => navigate('/employees')}
        className="flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-brand-600 transition"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Employee Directory
      </button>

      {/* Header Profile Card */}
      <div className="kuber-card p-6 flex flex-col md:flex-row items-center justify-between gap-6 bg-gradient-to-r from-white via-slate-50 to-brand-50/30">
        <div className="flex items-center gap-5">
          <div className="w-20 h-20 rounded-2xl bg-brand-600 text-white font-bold text-2xl flex items-center justify-center shadow-lg shadow-brand-500/20 overflow-hidden">
            {employee.user?.avatarUrl ? (
              <img src={employee.user.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
            ) : (
              `${employee.firstName[0]}${employee.lastName[0]}`
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-extrabold text-slate-800">{employee.firstName} {employee.lastName}</h1>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                {employee.status}
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium mt-0.5">{employee.designation} • {employee.department}</p>
            <p className="text-[11px] font-mono text-slate-400 mt-1">ID: {employee.employeeId} | Joined: {employee.dateOfJoining}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right text-xs">
            <p className="text-slate-400">Shift Schedule</p>
            <p className="font-semibold text-slate-700">{employee.shiftName}</p>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 text-xs font-semibold text-slate-500 overflow-x-auto pb-1">
        <button
          onClick={() => setActiveTab('personal')}
          className={`px-4 py-2 rounded-t-lg transition flex items-center gap-1.5 ${
            activeTab === 'personal' ? 'bg-white border-t-2 border-t-brand-600 text-brand-600 shadow-xs' : 'hover:text-slate-800'
          }`}
        >
          <User className="w-3.5 h-3.5" /> Personal Details
        </button>
        <button
          onClick={() => setActiveTab('professional')}
          className={`px-4 py-2 rounded-t-lg transition flex items-center gap-1.5 ${
            activeTab === 'professional' ? 'bg-white border-t-2 border-t-brand-600 text-brand-600 shadow-xs' : 'hover:text-slate-800'
          }`}
        >
          <Briefcase className="w-3.5 h-3.5" /> Professional & Org
        </button>
        <button
          onClick={() => setActiveTab('payroll')}
          className={`px-4 py-2 rounded-t-lg transition flex items-center gap-1.5 ${
            activeTab === 'payroll' ? 'bg-white border-t-2 border-t-brand-600 text-brand-600 shadow-xs' : 'hover:text-slate-800'
          }`}
        >
          <DollarSign className="w-3.5 h-3.5" /> Salary & Bank
        </button>
        <button
          onClick={() => setActiveTab('assets')}
          className={`px-4 py-2 rounded-t-lg transition flex items-center gap-1.5 ${
            activeTab === 'assets' ? 'bg-white border-t-2 border-t-brand-600 text-brand-600 shadow-xs' : 'hover:text-slate-800'
          }`}
        >
          <Laptop className="w-3.5 h-3.5" /> IT Assets
        </button>
        <button
          onClick={() => setActiveTab('org')}
          className={`px-4 py-2 rounded-t-lg transition flex items-center gap-1.5 ${
            activeTab === 'org' ? 'bg-white border-t-2 border-t-brand-600 text-brand-600 shadow-xs' : 'hover:text-slate-800'
          }`}
        >
          <Network className="w-3.5 h-3.5" /> Org Chart Tree
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'personal' && (
        <div className="kuber-card p-6 grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          <div>
            <h3 className="font-bold text-slate-800 text-sm mb-3 border-b border-slate-100 pb-2">Personal Details</h3>
            <div className="space-y-2.5">
              <div className="flex justify-between"><span className="text-slate-400">Full Name:</span><span className="font-semibold text-slate-800">{employee.firstName} {employee.lastName}</span></div>
              <div className="flex justify-between"><span className="text-slate-400">Gender:</span><span className="font-semibold text-slate-800">{employee.gender || 'Male'}</span></div>
              <div className="flex justify-between"><span className="text-slate-400">Date of Birth:</span><span className="font-semibold text-slate-800">{employee.dateOfBirth || '1992-05-14'}</span></div>
              <div className="flex justify-between"><span className="text-slate-400">Mobile Phone:</span><span className="font-semibold text-slate-800">{employee.phone}</span></div>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-slate-800 text-sm mb-3 border-b border-slate-100 pb-2">Emergency Contact</h3>
            <div className="space-y-2.5">
              <div className="flex justify-between"><span className="text-slate-400">Contact Person:</span><span className="font-semibold text-slate-800">Sunita Sharma (Spouse)</span></div>
              <div className="flex justify-between"><span className="text-slate-400">Emergency Phone:</span><span className="font-semibold text-slate-800">+91 98989 12345</span></div>
              <div className="flex justify-between"><span className="text-slate-400">Relationship:</span><span className="font-semibold text-slate-800">Spouse</span></div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'payroll' && (
        <div className="kuber-card p-6 grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          <div>
            <h3 className="font-bold text-slate-800 text-sm mb-3 border-b border-slate-100 pb-2">Salary Component Breakdown</h3>
            <div className="space-y-2.5">
              <div className="flex justify-between"><span className="text-slate-500 font-medium">Basic Salary:</span><span className="font-bold text-slate-800">₹{employee.basicSalary?.toLocaleString()}</span></div>
              <div className="flex justify-between"><span className="text-slate-500 font-medium">HRA Component:</span><span className="font-bold text-slate-800">₹{employee.hra?.toLocaleString()}</span></div>
              <div className="flex justify-between"><span className="text-slate-500 font-medium">Special Allowances:</span><span className="font-bold text-slate-800">₹{employee.allowances?.toLocaleString()}</span></div>
              <div className="flex justify-between text-emerald-600 font-bold pt-2 border-t border-slate-100">
                <span>Gross Monthly Earnings:</span>
                <span>₹{((employee.basicSalary || 0) + (employee.hra || 0) + (employee.allowances || 0)).toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-slate-800 text-sm mb-3 border-b border-slate-100 pb-2">Bank & Statutory Compliance</h3>
            <div className="space-y-2.5">
              <div className="flex justify-between"><span className="text-slate-400">Bank Name:</span><span className="font-semibold text-slate-800">{employee.bankName || 'HDFC Bank'}</span></div>
              <div className="flex justify-between"><span className="text-slate-400">Account Number:</span><span className="font-mono font-semibold text-slate-800">{employee.accountNumber || '50100234129845'}</span></div>
              <div className="flex justify-between"><span className="text-slate-400">PAN Number:</span><span className="font-mono font-semibold text-slate-800">{employee.panNumber || 'ABCDE1234F'}</span></div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'org' && (
        <div className="kuber-card p-8 text-center">
          <h3 className="font-bold text-slate-800 text-sm mb-6">Reporting Hierarchy Chart</h3>

          <div className="inline-flex flex-col items-center space-y-6">
            {/* Manager Node */}
            <div className="px-5 py-3 bg-slate-900 text-white rounded-xl shadow-md text-xs">
              <p className="font-bold">{employee.managerName}</p>
              <p className="text-[10px] text-brand-300">Reporting Manager / Director</p>
            </div>

            <div className="w-0.5 h-6 bg-slate-300"></div>

            {/* Current Employee Node */}
            <div className="px-6 py-4 bg-brand-600 text-white rounded-2xl shadow-xl ring-4 ring-brand-100 text-xs">
              <p className="font-bold text-sm">{employee.firstName} {employee.lastName}</p>
              <p className="text-[11px] text-brand-200">{employee.designation}</p>
              <span className="mt-1 px-2 py-0.5 bg-white/20 text-white text-[10px] rounded inline-block font-semibold">
                {employee.employeeId}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

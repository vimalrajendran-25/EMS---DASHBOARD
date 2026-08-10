import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { payrollService, employeeService } from '../services/api';
import { Payroll, Employee } from '../types';
import { DollarSign, FileText, Play, Download, Printer, Eye, X, CheckCircle, Calculator } from 'lucide-react';

export const PayrollPage: React.FC = () => {
  const { user } = useAuth();
  const [payrolls, setPayrolls] = useState<Payroll[]>([]);
  const [selectedPayslip, setSelectedPayslip] = useState<Payroll | null>(null);
  const [showRunModal, setShowRunModal] = useState(false);

  const [targetEmpId, setTargetEmpId] = useState(4);
  const [bonusAmount, setBonusAmount] = useState(5000);
  const [incentiveAmount, setIncentiveAmount] = useState(2000);

  useEffect(() => {
    fetchPayrolls();
  }, [user]);

  const fetchPayrolls = () => {
    payrollService.getAll().then(setPayrolls);
  };

  const handleProcessPayroll = async (e: React.FormEvent) => {
    e.preventDefault();
    await payrollService.processSalary(targetEmpId, 'August 2026', bonusAmount, incentiveAmount, 0);
    setShowRunModal(false);
    fetchPayrolls();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-extrabold text-slate-800 tracking-tight">Payroll Processing System</h1>
          <p className="text-xs text-slate-500 mt-0.5">Automated Net Salary Calculation Engine, Statutory PF/ESI/TDS, & PDF Payslips</p>
        </div>

        <button
          onClick={() => setShowRunModal(true)}
          className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-xl text-xs font-semibold shadow-md shadow-emerald-500/20 flex items-center gap-2"
        >
          <Play className="w-4 h-4 fill-white" /> Execute Monthly Payroll Run
        </button>
      </div>

      {/* Formula Info Banner */}
      <div className="p-4 bg-slate-900 text-white rounded-2xl flex items-center justify-between text-xs shadow-md">
        <div className="flex items-center gap-3">
          <Calculator className="w-5 h-5 text-emerald-400" />
          <div>
            <p className="font-bold text-white tracking-wide">Net Salary Formula Engine:</p>
            <p className="font-mono text-[11px] text-slate-300 mt-0.5">
              Net Salary = Basic + HRA + Special Allowances + Bonus - PF (12%) - ESI - TDS - Loan Deductions
            </p>
          </div>
        </div>
        <span className="px-3 py-1 bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 font-bold rounded-lg">
          Statutory Compliant
        </span>
      </div>

      {/* Payroll Records Table */}
      <div className="kuber-card overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-bold text-slate-800 text-sm">Disbursed Payroll Slips & History</h3>
          <span className="text-xs text-slate-400 font-semibold">{payrolls.length} Records</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                <th className="py-3.5 px-4">Employee</th>
                <th className="py-3.5 px-4">Month / Year</th>
                <th className="py-3.5 px-4">Gross Earnings</th>
                <th className="py-3.5 px-4">Total Deductions</th>
                <th className="py-3.5 px-4">Net Payable Salary</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {payrolls.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50 transition">
                  <td className="py-3 px-4 font-bold text-slate-800">
                    {p.employee?.firstName} {p.employee?.lastName}
                  </td>
                  <td className="py-3 px-4 font-semibold text-slate-600">{p.monthYear}</td>
                  <td className="py-3 px-4 font-semibold text-emerald-600">₹{p.grossEarnings?.toLocaleString()}</td>
                  <td className="py-3 px-4 text-rose-600">₹{p.totalDeductions?.toLocaleString()}</td>
                  <td className="py-3 px-4 font-extrabold text-slate-800 text-sm">₹{p.netSalary?.toLocaleString()}</td>
                  <td className="py-3 px-4">
                    <span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-700 font-bold border border-emerald-200 rounded-full text-[10px]">
                      {p.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => setSelectedPayslip(p)}
                      className="px-3 py-1 bg-brand-50 hover:bg-brand-100 text-brand-700 font-semibold rounded-lg text-[11px] inline-flex items-center gap-1.5"
                    >
                      <Eye className="w-3.5 h-3.5" /> View Payslip
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Interactive Payslip Modal */}
      {selectedPayslip && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6 animate-in zoom-in-95 duration-150 relative">
            <button
              onClick={() => setSelectedPayslip(null)}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:bg-slate-100 rounded-xl"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Payslip Header */}
            <div className="border-b border-slate-200 pb-4 mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-extrabold text-slate-800">EMS PORTAL PVT LTD</h2>
                <p className="text-xs text-slate-500">PAYSLIP FOR THE MONTH OF {selectedPayslip.monthYear.toUpperCase()}</p>
              </div>
              <div className="text-right">
                <span className="px-3 py-1 bg-emerald-100 text-emerald-800 font-bold text-xs rounded-full">CONFIDENTIAL</span>
              </div>
            </div>

            {/* Employee Meta */}
            <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl text-xs mb-4">
              <div>
                <p className="text-slate-400">Employee Name: <strong className="text-slate-800">{selectedPayslip.employee?.firstName} {selectedPayslip.employee?.lastName}</strong></p>
                <p className="text-slate-400 mt-1">Designation: <strong className="text-slate-800">{selectedPayslip.employee?.designation}</strong></p>
                <p className="text-slate-400 mt-1">Department: <strong className="text-slate-800">{selectedPayslip.employee?.department}</strong></p>
              </div>
              <div>
                <p className="text-slate-400">Employee ID: <strong className="text-slate-800">{selectedPayslip.employee?.employeeId}</strong></p>
                <p className="text-slate-400 mt-1">Bank Account: <strong className="text-slate-800">{selectedPayslip.employee?.accountNumber || '50100234129845'}</strong></p>
                <p className="text-slate-400 mt-1">PAN: <strong className="text-slate-800">{selectedPayslip.employee?.panNumber || 'ABCDE1234F'}</strong></p>
              </div>
            </div>

            {/* Earnings vs Deductions Table */}
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <h4 className="font-bold text-slate-800 border-b border-slate-200 pb-1 mb-2">EARNINGS (INR)</h4>
                <div className="space-y-1.5">
                  <div className="flex justify-between"><span className="text-slate-500">Basic Salary:</span><span className="font-semibold">₹{selectedPayslip.basicSalary?.toLocaleString()}</span></div>
                  <div className="flex justify-between"><span className="text-slate-500">HRA:</span><span className="font-semibold">₹{selectedPayslip.hra?.toLocaleString()}</span></div>
                  <div className="flex justify-between"><span className="text-slate-500">Special Allowances:</span><span className="font-semibold">₹{selectedPayslip.allowances?.toLocaleString()}</span></div>
                  <div className="flex justify-between"><span className="text-slate-500">Performance Bonus:</span><span className="font-semibold">₹{selectedPayslip.bonus?.toLocaleString()}</span></div>
                  <div className="flex justify-between font-bold text-emerald-600 pt-2 border-t border-slate-100">
                    <span>Gross Earnings:</span>
                    <span>₹{selectedPayslip.grossEarnings?.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-slate-800 border-b border-slate-200 pb-1 mb-2">DEDUCTIONS (INR)</h4>
                <div className="space-y-1.5">
                  <div className="flex justify-between"><span className="text-slate-500">Provident Fund (PF):</span><span className="font-semibold">₹{selectedPayslip.pfDeduction?.toLocaleString()}</span></div>
                  <div className="flex justify-between"><span className="text-slate-500">Income Tax (TDS):</span><span className="font-semibold">₹{selectedPayslip.tdsDeduction?.toLocaleString()}</span></div>
                  <div className="flex justify-between"><span className="text-slate-500">ESI Component:</span><span className="font-semibold">₹{selectedPayslip.esiDeduction?.toLocaleString()}</span></div>
                  <div className="flex justify-between font-bold text-rose-600 pt-2 border-t border-slate-100">
                    <span>Total Deductions:</span>
                    <span>₹{selectedPayslip.totalDeductions?.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Net Payable Highlight */}
            <div className="mt-6 p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between">
              <div>
                <p className="text-xs text-emerald-800 font-bold uppercase tracking-wider">NET PAYABLE SALARY</p>
                <p className="text-2xl font-extrabold text-emerald-700">₹{selectedPayslip.netSalary?.toLocaleString()}</p>
              </div>
              <button
                onClick={() => window.print()}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-md"
              >
                <Printer className="w-4 h-4" /> Print / Save PDF
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Execute Payroll Modal */}
      {showRunModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-slate-800 text-sm">Run Salary Processing Engine</h3>
              <button onClick={() => setShowRunModal(false)} className="p-1 text-slate-400 hover:bg-slate-100 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleProcessPayroll} className="mt-4 space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Target Employee</label>
                <select
                  value={targetEmpId}
                  onChange={(e) => setTargetEmpId(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                >
                  <option value={4}>Priya Sharma (EMP-1004)</option>
                  <option value={1}>Alexander Wright (EMP-1001)</option>
                  <option value={2}>Sophia Martinez (EMP-1002)</option>
                  <option value={3}>David Chen (EMP-1003)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Bonus Addition (₹)</label>
                  <input
                    type="number"
                    value={bonusAmount}
                    onChange={(e) => setBonusAmount(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Incentive Addition (₹)</label>
                  <input
                    type="number"
                    value={incentiveAmount}
                    onChange={(e) => setIncentiveAmount(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button type="button" onClick={() => setShowRunModal(false)} className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl font-semibold">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold shadow-md">
                  Process Salary Slip
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

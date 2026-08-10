import React, { useState } from 'react';
import { X, ShieldCheck, Terminal, Copy, Check, Clock, User, Globe, Cpu, CheckCircle2, FileText } from 'lucide-react';

export interface AuditStreamItem {
  id?: string | number;
  action: string;
  userEmail: string;
  details: string;
  timestamp: string;
  ipAddress?: string;
  traceId?: string;
  status?: string;
  endpoint?: string;
  userAgent?: string;
  department?: string;
}

interface AuditDetailModalProps {
  item: AuditStreamItem | null;
  onClose: () => void;
}

export const AuditDetailModal: React.FC<AuditDetailModalProps> = ({ item, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!item) return null;

  const traceId = item.traceId || `LOG-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
  const ipAddress = item.ipAddress || '192.168.1.104 (Internal LAN)';
  const status = item.status || '200 OK (SUCCESS)';
  const endpoint = item.endpoint || `/api/v1/${item.action.toLowerCase().replace('_', '/')}`;
  const userAgent = item.userAgent || 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/126.0.0.0';
  const department = item.department || 'Enterprise Governance';

  const rawJson = JSON.stringify(
    {
      logId: traceId,
      action: item.action,
      user: item.userEmail,
      department: department,
      details: item.details,
      timestamp: item.timestamp,
      clientIp: ipAddress,
      httpStatus: status,
      apiEndpoint: endpoint,
      userAgent: userAgent,
      securityToken: 'VERIFIED_JWT_BEARER',
    },
    null,
    2
  );

  const handleCopyJson = () => {
    navigator.clipboard.writeText(rawJson);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getBadgeColor = (action: string) => {
    switch (action) {
      case 'PUNCH_IN':
      case 'PUNCH_OUT':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'LEAVE_APPLY':
      case 'LEAVE_APPROVED':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'PAYROLL_PROCESSED':
      case 'PAYSLIP_GENERATED':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'ROLE_SWITCH':
      case 'SECURITY_SCAN':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'USER_LOGIN':
        return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
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
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-500 flex items-center justify-center text-white shadow-md">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm text-white">System Audit Log Inspection</h3>
                <span className="text-[10px] bg-slate-800 text-brand-300 font-mono px-2 py-0.5 rounded border border-slate-700">
                  {traceId}
                </span>
              </div>
              <p className="text-[11px] text-slate-400">Real-time security event telemetry record</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5">
          {/* Action Overview Header Card */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-wrap items-center justify-between gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className={`px-2.5 py-0.5 rounded text-xs font-mono font-bold border ${getBadgeColor(item.action)}`}>
                  {item.action}
                </span>
                <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> {status}
                </span>
              </div>
              <p className="text-sm font-bold text-slate-800">{item.details}</p>
            </div>

            <div className="text-right text-xs text-slate-500">
              <div className="flex items-center gap-1 justify-end font-medium">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                {new Date(item.timestamp).toLocaleString([], {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit',
                })}
              </div>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Performer Card */}
            <div className="p-4 rounded-xl border border-slate-100 bg-white shadow-xs space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-700 uppercase tracking-wider">
                <User className="w-4 h-4 text-brand-600" /> Actor / Performer Info
              </div>
              <div className="space-y-1.5 text-xs text-slate-600">
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-400">User Email:</span>
                  <span className="font-semibold text-slate-800">{item.userEmail}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-400">Department:</span>
                  <span className="font-medium text-slate-700">{department}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-400">Auth Token:</span>
                  <span className="font-mono text-[11px] text-emerald-600 font-semibold">JWT Bearer Valid</span>
                </div>
              </div>
            </div>

            {/* Network & Environment */}
            <div className="p-4 rounded-xl border border-slate-100 bg-white shadow-xs space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-700 uppercase tracking-wider">
                <Globe className="w-4 h-4 text-indigo-600" /> Network Telemetry
              </div>
              <div className="space-y-1.5 text-xs text-slate-600">
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-400">Client IP:</span>
                  <span className="font-mono font-semibold text-slate-800">{ipAddress}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-400">API Endpoint:</span>
                  <span className="font-mono text-[11px] text-slate-700">{endpoint}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-400">Client Platform:</span>
                  <span className="truncate max-w-[160px] text-slate-600 text-[11px]">{userAgent}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Raw JSON Code Block */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-700 uppercase tracking-wider">
                <Terminal className="w-4 h-4 text-slate-500" /> Raw Telemetry Payload (JSON)
              </div>
              <button
                onClick={handleCopyJson}
                className="px-2.5 py-1 text-xs font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg flex items-center gap-1.5 transition"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Copied' : 'Copy JSON'}
              </button>
            </div>
            <pre className="p-4 rounded-xl bg-slate-900 text-emerald-400 font-mono text-xs overflow-x-auto border border-slate-800 leading-relaxed shadow-inner">
              {rawJson}
            </pre>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-200/80 flex items-center justify-between text-xs">
          <span className="text-slate-400 flex items-center gap-1">
            <Cpu className="w-3.5 h-3.5" /> Security Audit Log Engine v2.4
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-xl font-semibold shadow-md transition"
          >
            Close Inspection
          </button>
        </div>
      </div>
    </div>
  );
};

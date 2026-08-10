import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtext?: string;
  trend?: string;
  isPositive?: boolean;
  icon: LucideIcon;
  iconBgColor?: string;
  iconColor?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtext,
  trend,
  isPositive = true,
  icon: Icon,
  iconBgColor = 'bg-brand-50',
  iconColor = 'text-brand-600',
}) => {
  return (
    <div className="kuber-card p-5 flex items-start justify-between">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">{title}</p>
        <h3 className="text-2xl font-bold text-slate-800">{value}</h3>
        
        {(trend || subtext) && (
          <div className="flex items-center gap-2 mt-2 text-xs">
            {trend && (
              <span className={`px-1.5 py-0.5 rounded font-semibold text-[11px] ${
                isPositive ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
              }`}>
                {trend}
              </span>
            )}
            {subtext && <span className="text-slate-400">{subtext}</span>}
          </div>
        )}
      </div>

      <div className={`w-12 h-12 rounded-xl ${iconBgColor} ${iconColor} flex items-center justify-center shadow-xs`}>
        <Icon className="w-6 h-6" />
      </div>
    </div>
  );
};

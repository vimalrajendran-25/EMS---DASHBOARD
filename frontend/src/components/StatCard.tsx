import React from 'react';
import { LucideIcon, ChevronRight } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtext?: string;
  trend?: string;
  isPositive?: boolean;
  icon: LucideIcon;
  iconBgColor?: string;
  iconColor?: string;
  onClick?: () => void;
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
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`kuber-card p-5 flex items-start justify-between relative group transition-all duration-200 ${
        onClick ? 'cursor-pointer hover:shadow-lg hover:-translate-y-0.5 hover:border-slate-300 dark:hover:border-slate-700' : ''
      }`}
    >
      <div>
        <div className="flex items-center gap-1 mb-1">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">{title}</p>
          {onClick && (
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
          )}
        </div>
        <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100">{value}</h3>

        {(trend || subtext) && (
          <div className="flex items-center gap-2 mt-2 text-xs">
            {trend && (
              <span
                className={`px-1.5 py-0.5 rounded font-semibold text-[11px] ${
                  isPositive
                    ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/50'
                    : 'bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 border border-rose-100 dark:border-rose-900/50'
                }`}
              >
                {trend}
              </span>
            )}
            {subtext && <span className="text-slate-400 dark:text-slate-500">{subtext}</span>}
          </div>
        )}
      </div>

      <div className={`w-12 h-12 rounded-xl ${iconBgColor} dark:bg-slate-800/80 ${iconColor} flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform`}>
        <Icon className="w-6 h-6" />
      </div>
    </div>
  );
};

'use client';
import React from 'react';
import {
  FolderOpen, Clock, DollarSign, AlertTriangle, Globe, TrendingUp, TrendingDown, Minus,
} from 'lucide-react';
import {
  AreaChart, Area, ResponsiveContainer, Tooltip, XAxis,
} from 'recharts';

// Bento grid plan: 6 cards → grid-cols-3 xl:grid-cols-6
// Row 1: hero (spans 2 cols) + 2 regular = 4 cols
// Row 2: 2 regular spanning remaining
// Final: 2-col hero + 4 regular in a 4-col grid (xl: 6-col with varied spans)

const deliveryTrend = [
  { w: 'W1', v: 3 }, { w: 'W2', v: 5 }, { w: 'W3', v: 4 }, { w: 'W4', v: 7 },
  { w: 'W5', v: 5 }, { w: 'W6', v: 8 }, { w: 'W7', v: 6 }, { w: 'W8', v: 9 },
];

const revenueTrend = [
  { m: 'Oct', v: 18400 }, { m: 'Nov', v: 22100 }, { m: 'Dec', v: 19800 },
  { m: 'Jan', v: 27500 }, { m: 'Feb', v: 24200 }, { m: 'Mar', v: 31600 },
];

interface MiniTooltipProps {
  active?: boolean;
  payload?: Array<{ value: number }>;
  label?: string;
}

function MiniTooltip({ active, payload, label }: MiniTooltipProps) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-border rounded-lg px-2 py-1 shadow-card text-xs font-medium text-foreground">
      {label}: {payload[0].value}
    </div>
  );
}

function RevenueTooltip({ active, payload, label }: MiniTooltipProps) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-border rounded-lg px-2 py-1 shadow-card text-xs font-medium text-foreground">
      {label}: ${payload[0].value.toLocaleString()}
    </div>
  );
}

export default function KPIBentoGrid() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4">

      {/* Hero card: Active Projects — spans 2 cols */}
      <div className="col-span-2 row-span-1 bg-[hsl(215,35%,14%)] rounded-2xl p-5 shadow-card flex flex-col gap-3 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, hsl(38,92%,50%) 0%, transparent 70%)', transform: 'translate(30%, -30%)' }} />
        <div className="flex items-center justify-between relative z-10">
          <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center">
            <FolderOpen size={18} className="text-amber-400" />
          </div>
          <span className="text-xs font-medium text-white/50 bg-white/8 px-2 py-0.5 rounded-full">All time</span>
        </div>
        <div className="relative z-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-white/45 mb-1">Active Projects</p>
          <p className="text-4xl font-bold text-white tabular-nums">24</p>
          <p className="text-sm text-white/50 mt-1">
            <span className="text-emerald-400 font-medium">+3</span> started this week
          </p>
        </div>
        <div className="h-16 relative z-10">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={deliveryTrend} margin={{ top: 4, right: 0, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="heroGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="w" hide />
              <Tooltip content={<MiniTooltip />} />
              <Area type="monotone" dataKey="v" stroke="#f59e0b" strokeWidth={2} fill="url(#heroGrad)" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Pending Approvals — warning state */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 shadow-card flex flex-col gap-2 relative overflow-hidden">
        <div className="flex items-center justify-between">
          <div className="w-9 h-9 rounded-xl bg-amber-100 flex items-center justify-center">
            <Clock size={18} className="text-amber-600" />
          </div>
          <div className="flex items-center gap-1 text-amber-600">
            <AlertTriangle size={12} />
            <span className="text-xs font-semibold">Urgent</span>
          </div>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-amber-600/70 mb-1">Pending Approvals</p>
          <p className="text-3xl font-bold text-amber-700 tabular-nums">7</p>
          <p className="text-xs text-amber-600/70 mt-1">3 overdue 48h+</p>
        </div>
      </div>

      {/* Outstanding Revenue */}
      <div className="bg-white rounded-2xl p-5 shadow-card border border-border flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center">
            <DollarSign size={18} className="text-emerald-600" />
          </div>
          <div className="flex items-center gap-1 text-emerald-600">
            <TrendingUp size={12} />
            <span className="text-xs font-semibold">+12%</span>
          </div>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1">Outstanding Revenue</p>
          <p className="text-3xl font-bold text-foreground tabular-nums">$47.2k</p>
          <p className="text-xs text-muted-foreground mt-1">Across 9 invoices</p>
        </div>
      </div>

      {/* Overdue Invoices — danger state */}
      <div className="bg-red-50 border border-red-200 rounded-2xl p-5 shadow-card flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="w-9 h-9 rounded-xl bg-red-100 flex items-center justify-center">
            <AlertTriangle size={18} className="text-red-600" />
          </div>
          <div className="flex items-center gap-1 text-red-600">
            <TrendingDown size={12} />
            <span className="text-xs font-semibold">Action needed</span>
          </div>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-red-600/70 mb-1">Overdue Invoices</p>
          <p className="text-3xl font-bold text-red-700 tabular-nums">4</p>
          <p className="text-xs text-red-600/70 mt-1">$18,400 at risk</p>
        </div>
      </div>

      {/* Published This Month */}
      <div className="bg-white rounded-2xl p-5 shadow-card border border-border flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center">
            <Globe size={18} className="text-blue-600" />
          </div>
          <div className="flex items-center gap-1 text-emerald-600">
            <TrendingUp size={12} />
            <span className="text-xs font-semibold">+2 vs last mo.</span>
          </div>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1">Published This Month</p>
          <p className="text-3xl font-bold text-foreground tabular-nums">8</p>
          <p className="text-xs text-muted-foreground mt-1">Apr 2026</p>
        </div>
      </div>

      {/* Avg Delivery Days — revenue sparkline */}
      <div className="bg-white rounded-2xl p-5 shadow-card border border-border flex flex-col gap-2 relative overflow-hidden">
        <div className="flex items-center justify-between">
          <div className="w-9 h-9 rounded-xl bg-violet-50 flex items-center justify-center">
            <TrendingUp size={18} className="text-violet-600" />
          </div>
          <div className="flex items-center gap-1 text-emerald-600">
            <Minus size={12} />
            <span className="text-xs font-semibold">Stable</span>
          </div>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1">Avg Delivery Days</p>
          <p className="text-3xl font-bold text-foreground tabular-nums">18.4</p>
          <p className="text-xs text-muted-foreground mt-1">-2.1 days vs last quarter</p>
        </div>
        <div className="h-10">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={revenueTrend} margin={{ top: 2, right: 0, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="delivGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#7c3aed" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="m" hide />
              <Tooltip content={<RevenueTooltip />} />
              <Area type="monotone" dataKey="v" stroke="#7c3aed" strokeWidth={1.5} fill="url(#delivGrad)" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
}
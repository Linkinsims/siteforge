'use client';
import React, { useState } from 'react';
import { toast } from 'sonner';
import { CheckCircle2, XCircle, Clock, MessageSquare, AlertTriangle } from 'lucide-react';

interface ApprovalItem {
  id: string;
  projectName: string;
  client: string;
  type: 'Homepage Design' | 'Color Palette' | 'Navigation Layout' | 'Mobile View' | 'Hero Section';
  submittedAt: string;
  overdueHours: number | null;
  version: number;
}

const APPROVALS: ApprovalItem[] = [
  { id: 'appr-001', projectName: 'Noma Studio Portfolio', client: 'Noma Studio', type: 'Homepage Design', submittedAt: '3 days ago', overdueHours: 72, version: 2 },
  { id: 'appr-002', projectName: 'Bloom Organics E-commerce', client: 'Bloom Organics', type: 'Color Palette', submittedAt: '1 day ago', overdueHours: null, version: 1 },
  { id: 'appr-003', projectName: 'Crestview Finance Site', client: 'Crestview Finance', type: 'Navigation Layout', submittedAt: '5 hours ago', overdueHours: null, version: 1 },
  { id: 'appr-004', projectName: 'Lumen Health Landing', client: 'Lumen Health', type: 'Hero Section', submittedAt: '4 days ago', overdueHours: 96, version: 3 },
  { id: 'appr-005', projectName: 'Vantage Capital Micro-site', client: 'Vantage Capital', type: 'Mobile View', submittedAt: '8 hours ago', overdueHours: null, version: 1 },
];

export default function PendingApprovalsPanel() {
  const [items, setItems] = useState(APPROVALS);

  const handleApprove = (id: string, name: string) => {
    setItems((prev) => prev.filter((a) => a.id !== id));
    toast.success(`${name} approved and marked complete`);
  };

  const handleReject = (id: string, name: string) => {
    setItems((prev) => prev.filter((a) => a.id !== id));
    toast.info(`Revision requested for ${name}`);
  };

  return (
    <div className="bg-white rounded-2xl border border-border shadow-card overflow-hidden">
      <div className="px-4 py-3.5 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-semibold text-foreground">Pending Approvals</h3>
          {items.length > 0 && (
            <span className="text-xs font-semibold bg-amber-100 text-amber-700 rounded-full px-2 py-0.5 tabular-nums">
              {items.length}
            </span>
          )}
        </div>
        <button
          onClick={() => toast.info('Opening approvals view…')}
          className="text-xs text-primary font-medium hover:underline"
        >
          View all
        </button>
      </div>

      {items.length === 0 ? (
        <div className="px-4 py-8 text-center">
          <CheckCircle2 size={32} className="text-emerald-400 mx-auto mb-2" />
          <p className="text-sm font-medium text-foreground">All caught up!</p>
          <p className="text-xs text-muted-foreground mt-1">No design approvals waiting</p>
        </div>
      ) : (
        <div className="divide-y divide-border/60">
          {items.map((item) => (
            <div key={item.id} className="px-4 py-3 hover:bg-secondary/30 transition-colors group">
              <div className="flex items-start justify-between gap-2 mb-1.5">
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-foreground truncate">{item.type}</p>
                  <p className="text-[11px] text-muted-foreground truncate">{item.projectName} · v{item.version}</p>
                </div>
                {item.overdueHours && (
                  <div className="flex items-center gap-1 shrink-0">
                    <AlertTriangle size={11} className="text-red-500" />
                    <span className="text-[10px] font-semibold text-red-500">{item.overdueHours}h</span>
                  </div>
                )}
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
                  <Clock size={10} />
                  <span>{item.submittedAt}</span>
                </div>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => toast.info(`Opening feedback for ${item.type}`)}
                    title="View feedback thread"
                    className="w-6 h-6 flex items-center justify-center rounded-md hover:bg-secondary text-muted-foreground hover:text-foreground transition-all"
                  >
                    <MessageSquare size={12} />
                  </button>
                  <button
                    onClick={() => handleReject(item.id, item.type)}
                    title="Request revision"
                    className="w-6 h-6 flex items-center justify-center rounded-md hover:bg-red-50 text-muted-foreground hover:text-red-500 transition-all"
                  >
                    <XCircle size={12} />
                  </button>
                  <button
                    onClick={() => handleApprove(item.id, item.type)}
                    title="Approve design"
                    className="w-6 h-6 flex items-center justify-center rounded-md hover:bg-emerald-50 text-muted-foreground hover:text-emerald-500 transition-all"
                  >
                    <CheckCircle2 size={12} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
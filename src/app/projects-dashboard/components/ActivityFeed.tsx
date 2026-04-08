import React from 'react';
import {
  CheckCircle2, Upload, MessageSquare, Globe, FileText, AlertTriangle, DollarSign,
} from 'lucide-react';
import Icon from '@/components/ui/AppIcon';


interface ActivityItem {
  id: string;
  type: 'approved' | 'upload' | 'comment' | 'published' | 'brief' | 'overdue' | 'payment';
  text: string;
  time: string;
  user: string;
}

const ACTIVITIES: ActivityItem[] = [
  { id: 'act-001', type: 'payment', text: 'Invoice #INV-084 paid by Hartwell Legal', time: '12 min ago', user: 'System' },
  { id: 'act-002', type: 'comment', text: 'Priya M. replied to Bloom Organics feedback thread', time: '1 hour ago', user: 'Priya M.' },
  { id: 'act-003', type: 'upload', text: 'New design v3 uploaded for Lumen Health Landing', time: '2 hours ago', user: 'Tom W.' },
  { id: 'act-004', type: 'approved', text: 'Crestview Finance approved navigation layout', time: '5 hours ago', user: 'Client' },
  { id: 'act-005', type: 'published', text: 'Hartwell Legal Rebrand published to hartwelllegal.com', time: '2 days ago', user: 'Marcus R.' },
  { id: 'act-006', type: 'overdue', text: 'Invoice #INV-079 is 14 days overdue — Ember Events', time: '3 days ago', user: 'System' },
  { id: 'act-007', type: 'brief', text: 'New project brief submitted by Arcadia Realty', time: '1 week ago', user: 'Client' },
];

const ICON_MAP = {
  approved: { icon: CheckCircle2, color: 'text-emerald-500 bg-emerald-50' },
  upload: { icon: Upload, color: 'text-blue-500 bg-blue-50' },
  comment: { icon: MessageSquare, color: 'text-violet-500 bg-violet-50' },
  published: { icon: Globe, color: 'text-emerald-600 bg-emerald-50' },
  brief: { icon: FileText, color: 'text-gray-500 bg-gray-100' },
  overdue: { icon: AlertTriangle, color: 'text-red-500 bg-red-50' },
  payment: { icon: DollarSign, color: 'text-emerald-500 bg-emerald-50' },
};

export default function ActivityFeed() {
  return (
    <div className="bg-white rounded-2xl border border-border shadow-card overflow-hidden">
      <div className="px-4 py-3.5 border-b border-border">
        <h3 className="text-sm font-semibold text-foreground">Recent Activity</h3>
      </div>
      <div className="divide-y divide-border/60">
        {ACTIVITIES.map((act) => {
          const { icon: Icon, color } = ICON_MAP[act.type];
          return (
            <div key={act.id} className="px-4 py-3 flex items-start gap-3 hover:bg-secondary/20 transition-colors">
              <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${color}`}>
                <Icon size={13} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-foreground leading-relaxed">{act.text}</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">{act.time}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
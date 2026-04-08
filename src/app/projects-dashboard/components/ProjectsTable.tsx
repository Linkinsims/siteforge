'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { toast } from 'sonner';
import { ArrowUpDown, ArrowUp, ArrowDown, Search, Pencil, Trash2, ExternalLink, ChevronLeft, ChevronRight, CheckSquare, Square,  } from 'lucide-react';

type SortDir = 'asc' | 'desc' | null;
type SortField = 'name' | 'client' | 'status' | 'pages' | 'dueDate' | 'invoiceStatus' | 'lastActivity';

interface Project {
  id: string;
  name: string;
  client: string;
  clientAvatar: string;
  status: 'Brief' | 'In Progress' | 'Review' | 'Approved' | 'Published' | 'Archived';
  pages: number;
  dueDate: string;
  invoiceStatus: 'Draft' | 'Sent' | 'Partial' | 'Paid' | 'Overdue';
  invoiceAmount: number;
  lastActivity: string;
  designer: string;
  priority: 'High' | 'Medium' | 'Low';
}

const PROJECTS: Project[] = [
  { id: 'proj-001', name: 'Hartwell Legal Rebrand', client: 'Hartwell Legal', clientAvatar: 'HL', status: 'Published', pages: 12, dueDate: '03/15/2026', invoiceStatus: 'Paid', invoiceAmount: 8400, lastActivity: '2 days ago', designer: 'Sofia K.', priority: 'High' },
  { id: 'proj-002', name: 'Noma Studio Portfolio', client: 'Noma Studio', clientAvatar: 'NS', status: 'Review', pages: 7, dueDate: '04/22/2026', invoiceStatus: 'Sent', invoiceAmount: 5200, lastActivity: '4 hours ago', designer: 'Marcus R.', priority: 'High' },
  { id: 'proj-003', name: 'Crestview Finance Site', client: 'Crestview Finance', clientAvatar: 'CF', status: 'In Progress', pages: 9, dueDate: '05/01/2026', invoiceStatus: 'Partial', invoiceAmount: 12000, lastActivity: '1 day ago', designer: 'Priya M.', priority: 'Medium' },
  { id: 'proj-004', name: 'Lumen Health Landing', client: 'Lumen Health', clientAvatar: 'LH', status: 'Approved', pages: 5, dueDate: '04/18/2026', invoiceStatus: 'Overdue', invoiceAmount: 3800, lastActivity: '3 days ago', designer: 'Tom W.', priority: 'High' },
  { id: 'proj-005', name: 'Arcadia Realty Platform', client: 'Arcadia Realty', clientAvatar: 'AR', status: 'Brief', pages: 0, dueDate: '06/10/2026', invoiceStatus: 'Draft', invoiceAmount: 9500, lastActivity: '1 week ago', designer: 'Sofia K.', priority: 'Low' },
  { id: 'proj-006', name: 'Vantage Capital Micro-site', client: 'Vantage Capital', clientAvatar: 'VC', status: 'In Progress', pages: 4, dueDate: '04/30/2026', invoiceStatus: 'Sent', invoiceAmount: 6800, lastActivity: '6 hours ago', designer: 'Marcus R.', priority: 'Medium' },
  { id: 'proj-007', name: 'Bloom Organics E-commerce', client: 'Bloom Organics', clientAvatar: 'BO', status: 'Review', pages: 18, dueDate: '04/25/2026', invoiceStatus: 'Partial', invoiceAmount: 15600, lastActivity: '2 hours ago', designer: 'Priya M.', priority: 'High' },
  { id: 'proj-008', name: 'Meridian Consulting Hub', client: 'Meridian Consulting', clientAvatar: 'MC', status: 'Archived', pages: 6, dueDate: '02/28/2026', invoiceStatus: 'Paid', invoiceAmount: 4200, lastActivity: '3 weeks ago', designer: 'Tom W.', priority: 'Low' },
  { id: 'proj-009', name: 'Solaris Tech Blog', client: 'Solaris Tech', clientAvatar: 'ST', status: 'In Progress', pages: 3, dueDate: '05/15/2026', invoiceStatus: 'Draft', invoiceAmount: 2800, lastActivity: '5 hours ago', designer: 'Sofia K.', priority: 'Medium' },
  { id: 'proj-010', name: 'Ember Events Website', client: 'Ember Events', clientAvatar: 'EE', status: 'Brief', pages: 0, dueDate: '06/30/2026', invoiceStatus: 'Overdue', invoiceAmount: 5500, lastActivity: '2 weeks ago', designer: 'Marcus R.', priority: 'High' },
];

const STATUS_STYLES: Record<Project['status'], string> = {
  Brief: 'bg-gray-100 text-gray-600',
  'In Progress': 'bg-blue-50 text-blue-700',
  Review: 'bg-amber-50 text-amber-700',
  Approved: 'bg-violet-50 text-violet-700',
  Published: 'bg-emerald-50 text-emerald-700',
  Archived: 'bg-gray-100 text-gray-500',
};

const INVOICE_STYLES: Record<Project['invoiceStatus'], string> = {
  Draft: 'bg-gray-100 text-gray-500',
  Sent: 'bg-blue-50 text-blue-600',
  Partial: 'bg-amber-50 text-amber-700',
  Paid: 'bg-emerald-50 text-emerald-700',
  Overdue: 'bg-red-50 text-red-600 font-semibold',
};

const PRIORITY_STYLES: Record<Project['priority'], string> = {
  High: 'bg-red-50 text-red-600',
  Medium: 'bg-amber-50 text-amber-600',
  Low: 'bg-gray-100 text-gray-500',
};

export default function ProjectsTable() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [sortField, setSortField] = useState<SortField | null>(null);
  const [sortDir, setSortDir] = useState<SortDir>(null);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [page, setPage] = useState(1);
  const [perPage] = useState(8);
  const [openActions, setOpenActions] = useState<string | null>(null);

  const STATUS_FILTERS = ['All', 'Brief', 'In Progress', 'Review', 'Approved', 'Published', 'Archived'];

  const filtered = PROJECTS.filter((p) => {
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.client.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'All' || p.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (!sortField || !sortDir) return 0;
    const aVal = a[sortField];
    const bVal = b[sortField];
    const dir = sortDir === 'asc' ? 1 : -1;
    if (typeof aVal === 'string' && typeof bVal === 'string')
      return aVal.localeCompare(bVal) * dir;
    if (typeof aVal === 'number' && typeof bVal === 'number')
      return (aVal - bVal) * dir;
    return 0;
  });

  const totalPages = Math.ceil(sorted.length / perPage);
  const paginated = sorted.slice((page - 1) * perPage, page * perPage);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDir((d) => (d === 'asc' ? 'desc' : d === 'desc' ? null : 'asc'));
      if (sortDir === 'desc') setSortField(null);
    } else {
      setSortField(field);
      setSortDir('asc');
    }
  };

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return <ArrowUpDown size={12} className="text-muted-foreground/50" />;
    if (sortDir === 'asc') return <ArrowUp size={12} className="text-primary" />;
    return <ArrowDown size={12} className="text-primary" />;
  };

  const toggleSelect = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const toggleAll = () => {
    if (selected.size === paginated.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(paginated.map((p) => p.id)));
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-border shadow-card overflow-hidden">
      {/* Table Header */}
      <div className="px-5 py-4 border-b border-border flex items-center justify-between gap-3 flex-wrap">
        <div>
          <h2 className="text-base font-semibold text-foreground">All Projects</h2>
          <p className="text-xs text-muted-foreground mt-0.5">{filtered.length} projects total</p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {/* Status filters */}
          <div className="flex items-center gap-1 flex-wrap">
            {STATUS_FILTERS.map((s) => (
              <button
                key={`filter-${s}`}
                onClick={() => { setStatusFilter(s); setPage(1); }}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-150 ${
                  statusFilter === s
                    ? 'bg-primary text-white' :'bg-secondary text-muted-foreground hover:bg-primary/10 hover:text-primary'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
          {/* Search */}
          <div className="relative">
            <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search…"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              className="pl-8 pr-3 py-1.5 text-xs border border-border rounded-lg bg-secondary outline-none focus:ring-2 focus:ring-primary/15 focus:border-primary/40 w-40 transition-all"
            />
          </div>
        </div>
      </div>

      {/* Bulk action bar */}
      {selected.size > 0 && (
        <div className="px-5 py-2.5 bg-primary/5 border-b border-primary/15 flex items-center gap-3 animate-fade-in">
          <span className="text-sm font-medium text-primary">{selected.size} selected</span>
          <button
            onClick={() => { toast.success(`${selected.size} projects archived`); setSelected(new Set()); }}
            className="px-3 py-1 text-xs font-medium bg-white border border-border rounded-lg hover:bg-secondary transition-all"
          >
            Archive
          </button>
          <button
            onClick={() => { toast.success(`Invoices sent for ${selected.size} projects`); setSelected(new Set()); }}
            className="px-3 py-1 text-xs font-medium bg-white border border-border rounded-lg hover:bg-secondary transition-all"
          >
            Send Invoice
          </button>
          <button
            onClick={() => setSelected(new Set())}
            className="ml-auto text-xs text-muted-foreground hover:text-foreground"
          >
            Clear
          </button>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto scrollbar-thin">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-secondary/40">
              <th className="w-10 px-4 py-3 text-left">
                <button onClick={toggleAll} className="text-muted-foreground hover:text-foreground transition-colors">
                  {selected.size === paginated.length && paginated.length > 0
                    ? <CheckSquare size={15} className="text-primary" />
                    : <Square size={15} />
                  }
                </button>
              </th>
              {[
                { label: 'Project', field: 'name' as SortField },
                { label: 'Client', field: 'client' as SortField },
                { label: 'Status', field: 'status' as SortField },
                { label: 'Priority', field: null },
                { label: 'Pages', field: 'pages' as SortField },
                { label: 'Due Date', field: 'dueDate' as SortField },
                { label: 'Invoice', field: 'invoiceStatus' as SortField },
                { label: 'Amount', field: null },
                { label: 'Designer', field: null },
                { label: 'Last Activity', field: 'lastActivity' as SortField },
                { label: '', field: null },
              ].map((col) => (
                <th
                  key={`col-${col.label || 'actions'}`}
                  className={`px-3 py-3 text-left text-[11px] font-semibold uppercase tracking-widest text-muted-foreground whitespace-nowrap ${
                    col.field ? 'cursor-pointer hover:text-foreground select-none' : ''
                  }`}
                  onClick={() => col.field && handleSort(col.field)}
                >
                  <div className="flex items-center gap-1">
                    {col.label}
                    {col.field && <SortIcon field={col.field} />}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginated.map((proj, idx) => (
              <tr
                key={proj.id}
                className={`border-b border-border/60 transition-colors duration-100 group ${
                  selected.has(proj.id) ? 'bg-primary/4' : idx % 2 === 0 ? 'bg-white' : 'bg-secondary/20'
                } hover:bg-primary/5`}
              >
                <td className="px-4 py-3">
                  <button onClick={() => toggleSelect(proj.id)} className="text-muted-foreground hover:text-primary transition-colors">
                    {selected.has(proj.id)
                      ? <CheckSquare size={15} className="text-primary" />
                      : <Square size={15} />
                    }
                  </button>
                </td>
                <td className="px-3 py-3 font-medium text-foreground whitespace-nowrap max-w-[180px]">
                  <Link href="/website-builder" className="hover:text-primary transition-colors truncate block">
                    {proj.name}
                  </Link>
                </td>
                <td className="px-3 py-3 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-slate-400 to-slate-600 flex items-center justify-center shrink-0">
                      <span className="text-[9px] font-bold text-white">{proj.clientAvatar}</span>
                    </div>
                    <span className="text-sm text-foreground">{proj.client}</span>
                  </div>
                </td>
                <td className="px-3 py-3">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${STATUS_STYLES[proj.status]}`}>
                    {proj.status}
                  </span>
                </td>
                <td className="px-3 py-3">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${PRIORITY_STYLES[proj.priority]}`}>
                    {proj.priority}
                  </span>
                </td>
                <td className="px-3 py-3 text-center tabular-nums text-muted-foreground">
                  {proj.pages > 0 ? proj.pages : <span className="text-muted-foreground/40">—</span>}
                </td>
                <td className="px-3 py-3 tabular-nums text-muted-foreground whitespace-nowrap text-xs">
                  {proj.dueDate}
                </td>
                <td className="px-3 py-3">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs ${INVOICE_STYLES[proj.invoiceStatus]}`}>
                    {proj.invoiceStatus}
                  </span>
                </td>
                <td className="px-3 py-3 tabular-nums text-sm font-medium text-foreground whitespace-nowrap">
                  ${proj.invoiceAmount.toLocaleString()}
                </td>
                <td className="px-3 py-3 text-xs text-muted-foreground whitespace-nowrap">
                  {proj.designer}
                </td>
                <td className="px-3 py-3 text-xs text-muted-foreground whitespace-nowrap">
                  {proj.lastActivity}
                </td>
                <td className="px-3 py-3">
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Link href="/website-builder" title="Open in Builder" className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground transition-all">
                      <ExternalLink size={13} />
                    </Link>
                    <button title="Edit project" onClick={() => toast.info(`Editing ${proj.name}`)} className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground transition-all">
                      <Pencil size={13} />
                    </button>
                    <button title="Delete project — this cannot be undone" onClick={() => toast.error(`Deleted ${proj.name}`)} className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-red-50 text-muted-foreground hover:text-red-500 transition-all">
                      <Trash2 size={13} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="px-5 py-3.5 border-t border-border flex items-center justify-between gap-4 flex-wrap">
        <p className="text-xs text-muted-foreground tabular-nums">
          Showing {(page - 1) * perPage + 1}–{Math.min(page * perPage, sorted.length)} of {sorted.length} projects
        </p>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="w-8 h-8 flex items-center justify-center rounded-lg border border-border text-muted-foreground hover:bg-secondary disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            <ChevronLeft size={14} />
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={`page-${p}`}
              onClick={() => setPage(p)}
              className={`w-8 h-8 flex items-center justify-center rounded-lg text-xs font-medium transition-all ${
                page === p
                  ? 'bg-primary text-white' :'border border-border text-muted-foreground hover:bg-secondary'
              }`}
            >
              {p}
            </button>
          ))}
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="w-8 h-8 flex items-center justify-center rounded-lg border border-border text-muted-foreground hover:bg-secondary disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
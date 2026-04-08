'use client';
import React, { useState } from 'react';
import { Plus, Search, Bell, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';
import { Toaster } from 'sonner';

export default function DashboardHeader() {
  const [search, setSearch] = useState('');

  return (
    <header className="h-16 border-b border-border bg-white/80 backdrop-blur-sm px-6 lg:px-8 xl:px-10 2xl:px-12 flex items-center justify-between shrink-0 sticky top-0 z-20">
      <Toaster position="bottom-right" richColors />
      <div>
        <h1 className="text-xl font-bold text-foreground tracking-tight">Projects Dashboard</h1>
        <p className="text-xs text-muted-foreground mt-0.5">Last updated 2 min ago</p>
      </div>
      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="relative hidden md:block">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search projects…"
            value={search}
            onChange={(e) => setSearch(e?.target?.value)}
            className="pl-9 pr-4 py-2 text-sm border border-border rounded-xl bg-secondary outline-none focus:ring-2 focus:ring-primary/15 focus:border-primary/40 w-52 transition-all"
          />
        </div>

        <button
          onClick={() => toast?.info('Refreshing dashboard data…')}
          className="w-9 h-9 flex items-center justify-center rounded-xl border border-border bg-white hover:bg-secondary transition-all text-muted-foreground hover:text-foreground"
          title="Refresh data"
        >
          <RefreshCw size={15} />
        </button>

        <button className="relative w-9 h-9 flex items-center justify-center rounded-xl border border-border bg-white hover:bg-secondary transition-all text-muted-foreground hover:text-foreground">
          <Bell size={15} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 border border-white" />
        </button>

        <button
          onClick={() => toast?.success('New project dialog opening…')}
          className="flex items-center gap-2 px-4 py-2 bg-[hsl(215,35%,18%)] hover:bg-[hsl(215,35%,24%)] text-white text-sm font-semibold rounded-xl transition-all active:scale-[0.98]"
        >
          <Plus size={15} />
          New Project
        </button>
      </div>
    </header>
  );
}
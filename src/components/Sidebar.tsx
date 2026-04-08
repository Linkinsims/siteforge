'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import AppLogo from '@/components/ui/AppLogo';
import {
  LayoutDashboard,
  FolderOpen,
  Users,
  FileText,
  CreditCard,
  Layers,
  Globe,
  Settings,
  ChevronLeft,
  ChevronRight,
  Bell,
  MessageSquare,
  PanelLeft,
} from 'lucide-react';

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const NAV_GROUPS = [
  {
    label: 'Workspace',
    items: [
      { href: '/projects-dashboard', icon: LayoutDashboard, label: 'Dashboard', badge: null },
      { href: '/projects-dashboard', icon: FolderOpen, label: 'Projects', badge: '12' },
      { href: '/website-builder', icon: PanelLeft, label: 'Site Builder', badge: null },
      { href: '/projects-dashboard', icon: Layers, label: 'Templates', badge: null },
    ],
  },
  {
    label: 'Clients',
    items: [
      { href: '/projects-dashboard', icon: Users, label: 'Clients', badge: null },
      { href: '/projects-dashboard', icon: MessageSquare, label: 'Approvals', badge: '3' },
      { href: '/projects-dashboard', icon: FileText, label: 'Briefs', badge: null },
    ],
  },
  {
    label: 'Finance',
    items: [
      { href: '/projects-dashboard', icon: CreditCard, label: 'Invoices', badge: '2' },
      { href: '/projects-dashboard', icon: Globe, label: 'Published Sites', badge: null },
    ],
  },
];

export default function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={`relative flex flex-col h-full bg-[hsl(215,35%,14%)] text-white transition-all duration-300 ease-in-out shrink-0 ${
        collapsed ? 'w-16' : 'w-60'
      }`}
      style={{ boxShadow: '2px 0 16px 0 rgb(0 0 0 / 0.12)' }}
    >
      <div
        className={`flex items-center h-16 px-4 border-b border-white/10 ${collapsed ? 'justify-center' : 'gap-2.5'}`}
      >
        <AppLogo size={32} className="shrink-0" />
        {!collapsed && (
          <span className="font-semibold text-base tracking-tight text-white">SiteForge</span>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto py-4">
        {NAV_GROUPS.map((group) => (
          <div key={group.label} className="mb-6">
            {!collapsed && (
              <h3 className="px-4 mb-2 text-xs font-semibold uppercase tracking-wider text-white/50">
                {group.label}
              </h3>
            )}
            <ul>
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <li key={item.href + item.label}>
                    <Link
                      href={item.href}
                      className={`flex items-center gap-3 px-4 py-2.5 mx-2 rounded-lg transition-all duration-200 ${
                        isActive
                          ? 'bg-blue-600 text-white'
                          : 'text-white/70 hover:bg-white/10 hover:text-white'
                      }`}
                      title={collapsed ? item.label : undefined}
                    >
                      <Icon size={20} className="shrink-0" />
                      {!collapsed && (
                        <>
                          <span className="flex-1 text-sm font-medium">{item.label}</span>
                          {item.badge && (
                            <span className="px-2 py-0.5 text-xs font-semibold bg-white/20 rounded-full">
                              {item.badge}
                            </span>
                          )}
                        </>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      <div className="p-4 border-t border-white/10">
        <Link
          href="/projects-dashboard"
          className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 text-white/70 hover:bg-white/10 hover:text-white ${
            collapsed ? 'justify-center' : ''
          }`}
          title={collapsed ? 'Settings' : undefined}
        >
          <Settings size={20} className="shrink-0" />
          {!collapsed && <span className="text-sm font-medium">Settings</span>}
        </Link>
      </div>

      <button
        onClick={onToggle}
        className="absolute -right-3 top-20 flex items-center justify-center w-6 h-6 bg-white rounded-full shadow-md text-slate-600 hover:bg-slate-100 transition-colors"
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>
    </aside>
  );
}

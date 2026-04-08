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
      {/* Logo */}
      <div className={`flex items-center h-16 px-4 border-b border-white/10 ${collapsed ? 'justify-center' : 'gap-2.5'}`}>
        <AppLogo size={32} className="shrink-0" />
        {!collapsed && (
          <span className="font-semibold text-base tracking-tight text-white">
            SiteForge
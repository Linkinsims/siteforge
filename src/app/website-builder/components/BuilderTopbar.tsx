'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import AppLogo from '@/components/ui/AppLogo';
import { toast } from 'sonner';
import { Monitor, Tablet, Smartphone, Undo2, Redo2, Save, Globe, Eye, Share2, ChevronDown, LayoutPanelLeft, PanelRight, Loader2, ArrowLeft, History,  } from 'lucide-react';
import type { DeviceMode } from './BuilderShell';
import Icon from '@/components/ui/AppIcon';


interface BuilderTopbarProps {
  device: DeviceMode;
  setDevice: (d: DeviceMode) => void;
  saveState: 'saved' | 'saving' | 'unsaved';
  setSaveState: (s: 'saved' | 'saving' | 'unsaved') => void;
  canUndo: boolean;
  canRedo: boolean;
  onUndo: () => void;
  onRedo: () => void;
  leftCollapsed: boolean;
  rightCollapsed: boolean;
  setLeftCollapsed: (v: boolean) => void;
  setRightCollapsed: (v: boolean) => void;
}

const DEVICE_OPTIONS: { mode: DeviceMode; icon: React.ElementType; label: string; width: string }[] = [
  { mode: 'desktop', icon: Monitor, label: 'Desktop', width: '1440px' },
  { mode: 'tablet', icon: Tablet, label: 'Tablet', width: '768px' },
  { mode: 'mobile', icon: Smartphone, label: 'Mobile', width: '390px' },
];

export default function BuilderTopbar({
  device, setDevice, saveState, setSaveState,
  canUndo, canRedo, onUndo, onRedo,
  leftCollapsed, rightCollapsed, setLeftCollapsed, setRightCollapsed,
}: BuilderTopbarProps) {
  const [publishing, setPublishing] = useState(false);
  const [showPageDropdown, setShowPageDropdown] = useState(false);

  const handleSave = async () => {
    // Backend integration: PUT /api/projects/{id}/pages/{pageId}
    setSaveState('saving');
    await new Promise((r) => setTimeout(r, 900));
    setSaveState('saved');
    toast.success('Page saved successfully');
  };

  const handlePublish = async () => {
    // Backend integration: POST /api/projects/{id}/publish
    setPublishing(true);
    await new Promise((r) => setTimeout(r, 2000));
    setPublishing(false);
    toast.success('Site published to hartwelllegal.com 🎉');
  };

  return (
    <header className="h-14 bg-[hsl(215,35%,14%)] border-b border-white/10 flex items-center gap-3 px-4 shrink-0 z-30">
      {/* Back + Logo */}
      <div className="flex items-center gap-2 mr-2">
        <Link
          href="/projects-dashboard"
          className="w-8 h-8 flex items-center justify-center rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition-all"
          title="Back to Dashboard"
        >
          <ArrowLeft size={16} />
        </Link>
        <AppLogo size={26} />
      </div>

      {/* Project + Page selector */}
      <div className="relative">
        <button
          onClick={() => setShowPageDropdown((v) => !v)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-white/10 transition-all group"
        >
          <div className="text-left">
            <p className="text-xs font-semibold text-white leading-none">Noma Studio Portfolio</p>
            <p className="text-[10px] text-white/45 mt-0.5">Homepage · 7 pages</p>
          </div>
          <ChevronDown size={13} className="text-white/40 group-hover:text-white/70 transition-colors" />
        </button>
        {showPageDropdown && (
          <div className="absolute top-full left-0 mt-1 w-52 bg-white rounded-xl shadow-modal border border-border z-50 py-1 animate-fade-in">
            {['Homepage', 'About Us', 'Services', 'Portfolio', 'Contact', 'Blog', 'Privacy Policy'].map((page, i) => (
              <button
                key={`page-${page}`}
                onClick={() => { toast.info(`Switched to ${page}`); setShowPageDropdown(false); }}
                className={`w-full text-left px-3 py-2 text-sm transition-colors ${i === 0 ? 'bg-primary/5 text-primary font-medium' : 'text-foreground hover:bg-secondary'}`}
              >
                {page}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="h-5 w-px bg-white/15 mx-1" />

      {/* Panel toggles */}
      <div className="flex items-center gap-1">
        <button
          onClick={() => setLeftCollapsed(!leftCollapsed)}
          title="Toggle left panel"
          className={`w-8 h-8 flex items-center justify-center rounded-lg transition-all ${
            leftCollapsed ? 'text-white/35 hover:bg-white/8' : 'bg-white/12 text-white'
          } hover:text-white`}
        >
          <LayoutPanelLeft size={15} />
        </button>
        <button
          onClick={() => setRightCollapsed(!rightCollapsed)}
          title="Toggle right panel"
          className={`w-8 h-8 flex items-center justify-center rounded-lg transition-all ${
            rightCollapsed ? 'text-white/35 hover:bg-white/8' : 'bg-white/12 text-white'
          } hover:text-white`}
        >
          <PanelRight size={15} />
        </button>
      </div>

      <div className="h-5 w-px bg-white/15 mx-1" />

      {/* Undo / Redo */}
      <div className="flex items-center gap-1">
        <button
          onClick={onUndo}
          disabled={!canUndo}
          title="Undo"
          className="w-8 h-8 flex items-center justify-center rounded-lg text-white/50 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        >
          <Undo2 size={15} />
        </button>
        <button
          onClick={onRedo}
          disabled={!canRedo}
          title="Redo"
          className="w-8 h-8 flex items-center justify-center rounded-lg text-white/50 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        >
          <Redo2 size={15} />
        </button>
        <button
          onClick={() => toast.info('Version history opening…')}
          title="Version history"
          className="w-8 h-8 flex items-center justify-center rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition-all"
        >
          <History size={15} />
        </button>
      </div>

      <div className="h-5 w-px bg-white/15 mx-1" />

      {/* Device switcher */}
      <div className="flex items-center bg-white/8 rounded-lg p-0.5 gap-0.5">
        {DEVICE_OPTIONS.map(({ mode, icon: Icon, label, width }) => (
          <button
            key={`device-${mode}`}
            onClick={() => setDevice(mode)}
            title={`${label} (${width})`}
            className={`w-8 h-7 flex items-center justify-center rounded-md transition-all ${
              device === mode
                ? 'bg-white/20 text-white' :'text-white/40 hover:text-white/70'
            }`}
          >
            <Icon size={14} />
          </button>
        ))}
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Save state */}
      <div className="flex items-center gap-1.5">
        {saveState === 'saving' && (
          <div className="flex items-center gap-1.5 text-white/50 text-xs">
            <Loader2 size={12} className="animate-spin" />
            Saving…
          </div>
        )}
        {saveState === 'saved' && (
          <span className="text-xs text-emerald-400 font-medium">Saved ✓</span>
        )}
        {saveState === 'unsaved' && (
          <span className="text-xs text-amber-400 font-medium">Unsaved changes</span>
        )}
      </div>

      <div className="h-5 w-px bg-white/15 mx-1" />

      {/* Action buttons */}
      <div className="flex items-center gap-2">
        <button
          onClick={handleSave}
          disabled={saveState === 'saving' || saveState === 'saved'}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/18 text-white text-xs font-medium rounded-lg transition-all disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <Save size={13} />
          Save
        </button>

        <button
          onClick={() => toast.info('Preview opened in new tab')}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/18 text-white text-xs font-medium rounded-lg transition-all"
        >
          <Eye size={13} />
          Preview
        </button>

        <button
          onClick={() => toast.info('Share link copied to clipboard')}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/18 text-white text-xs font-medium rounded-lg transition-all"
        >
          <Share2 size={13} />
          Share
        </button>

        <button
          onClick={handlePublish}
          disabled={publishing}
          className="flex items-center gap-1.5 px-4 py-1.5 bg-amber-500 hover:bg-amber-400 text-white text-xs font-bold rounded-lg transition-all active:scale-[0.97] disabled:opacity-70"
        >
          {publishing ? (
            <>
              <Loader2 size={13} className="animate-spin" />
              Publishing…
            </>
          ) : (
            <>
              <Globe size={13} />
              Publish
            </>
          )}
        </button>
      </div>
    </header>
  );
}
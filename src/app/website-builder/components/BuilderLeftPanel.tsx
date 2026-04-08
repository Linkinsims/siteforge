'use client';
import React, { useState } from 'react';
import { toast } from 'sonner';
import {
  Layers, Layout, Shapes, Type, Image, Square, Minus, List,
  ChevronRight, GripVertical, Eye, EyeOff, Lock, Unlock, Plus,
  Grid3X3, Star, Zap,
} from 'lucide-react';
import type { LeftTab, CanvasSection } from './BuilderShell';
import Icon from '@/components/ui/AppIcon';


interface BuilderLeftPanelProps {
  tab: LeftTab;
  setTab: (t: LeftTab) => void;
  sections: CanvasSection[];
  selectedSection: string | null;
  setSelectedSection: (id: string | null) => void;
  setSections: (s: CanvasSection[]) => void;
}

const ELEMENT_CATEGORIES = [
  {
    label: 'Layout',
    items: [
      { icon: Grid3X3, label: 'Section' },
      { icon: Layout, label: 'Container' },
      { icon: Minus, label: 'Divider' },
      { icon: Square, label: 'Spacer' },
    ],
  },
  {
    label: 'Content',
    items: [
      { icon: Type, label: 'Heading' },
      { icon: Type, label: 'Paragraph' },
      { icon: Image, label: 'Image' },
      { icon: List, label: 'List' },
    ],
  },
  {
    label: 'Interactive',
    items: [
      { icon: Square, label: 'Button' },
      { icon: Shapes, label: 'Form' },
      { icon: Shapes, label: 'Input Field' },
      { icon: Shapes, label: 'Dropdown' },
    ],
  },
  {
    label: 'Media',
    items: [
      { icon: Image, label: 'Gallery' },
      { icon: Square, label: 'Video Embed' },
      { icon: Grid3X3, label: 'Icon Grid' },
      { icon: Star, label: 'Rating' },
    ],
  },
];

const TEMPLATES = [
  { id: 'tpl-001', name: 'Agency Hero', category: 'Hero', preview: 'bg-gradient-to-r from-slate-800 to-slate-600', badge: 'Popular' },
  { id: 'tpl-002', name: 'SaaS Landing', category: 'Landing', preview: 'bg-gradient-to-r from-blue-600 to-violet-600', badge: null },
  { id: 'tpl-003', name: 'Portfolio Minimal', category: 'Portfolio', preview: 'bg-gradient-to-r from-gray-100 to-gray-200', badge: 'New' },
  { id: 'tpl-004', name: 'Law Firm Classic', category: 'Corporate', preview: 'bg-gradient-to-r from-amber-800 to-amber-600', badge: null },
  { id: 'tpl-005', name: 'E-commerce Splash', category: 'E-commerce', preview: 'bg-gradient-to-r from-rose-500 to-pink-400', badge: 'Popular' },
  { id: 'tpl-006', name: 'Restaurant Elegant', category: 'Hospitality', preview: 'bg-gradient-to-r from-stone-800 to-stone-600', badge: null },
];

const SECTION_TYPE_ICONS: Record<CanvasSection['type'], React.ElementType> = {
  hero: Zap,
  features: Grid3X3,
  testimonial: Star,
  pricing: List,
  cta: Square,
  footer: Layout,
  gallery: Image,
  team: Shapes,
  faq: List,
  contact: Shapes,
};

export default function BuilderLeftPanel({
  tab, setTab, sections, selectedSection, setSelectedSection, setSections,
}: BuilderLeftPanelProps) {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(['Layout', 'Content']));

  const toggleCategory = (label: string) => {
    setExpandedCategories((prev) => {
      const next = new Set(prev);
      next.has(label) ? next.delete(label) : next.add(label);
      return next;
    });
  };

  const toggleVisibility = (id: string) => {
    setSections(sections.map((s) => s.id === id ? { ...s, visible: !s.visible } : s));
  };

  const toggleLock = (id: string) => {
    setSections(sections.map((s) => s.id === id ? { ...s, locked: !s.locked } : s));
  };

  const TABS: { key: LeftTab; label: string; icon: React.ElementType }[] = [
    { key: 'elements', label: 'Elements', icon: Shapes },
    { key: 'layers', label: 'Layers', icon: Layers },
    { key: 'templates', label: 'Templates', icon: Layout },
  ];

  return (
    <div className="h-full bg-white border-r border-border flex flex-col shadow-panel">
      {/* Tab bar */}
      <div className="flex border-b border-border shrink-0">
        {TABS.map(({ key, label, icon: Icon }) => (
          <button
            key={`ltab-${key}`}
            onClick={() => setTab(key)}
            className={`flex-1 flex flex-col items-center gap-1 py-2.5 text-[11px] font-medium transition-all duration-150 border-b-2 ${
              tab === key
                ? 'border-primary text-primary bg-primary/3' :'border-transparent text-muted-foreground hover:text-foreground hover:bg-secondary/50'
            }`}
          >
            <Icon size={15} />
            {label}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-thin">
        {/* ELEMENTS TAB */}
        {tab === 'elements' && (
          <div className="p-3">
            {ELEMENT_CATEGORIES.map((cat) => (
              <div key={`cat-${cat.label}`} className="mb-2">
                <button
                  onClick={() => toggleCategory(cat.label)}
                  className="w-full flex items-center justify-between px-2 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
                >
                  {cat.label}
                  <ChevronRight
                    size={12}
                    className={`transition-transform duration-150 ${expandedCategories.has(cat.label) ? 'rotate-90' : ''}`}
                  />
                </button>
                {expandedCategories.has(cat.label) && (
                  <div className="grid grid-cols-2 gap-1.5 mt-1">
                    {cat.items.map((item) => (
                      <button
                        key={`elem-${cat.label}-${item.label}`}
                        draggable
                        onDragStart={() => toast.info(`Dragging ${item.label} onto canvas`)}
                        onClick={() => toast.info(`Added ${item.label} to canvas`)}
                        className="flex flex-col items-center gap-1.5 p-2.5 rounded-xl border border-border bg-white hover:border-primary/40 hover:bg-primary/3 transition-all duration-150 cursor-grab active:cursor-grabbing group"
                      >
                        <item.icon size={16} className="text-muted-foreground group-hover:text-primary transition-colors" />
                        <span className="text-[10px] font-medium text-muted-foreground group-hover:text-foreground">{item.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* LAYERS TAB */}
        {tab === 'layers' && (
          <div className="p-2">
            <div className="flex items-center justify-between px-2 py-2 mb-1">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">Page Sections</p>
              <button
                onClick={() => toast.info('Add new section')}
                className="w-6 h-6 flex items-center justify-center rounded-md hover:bg-secondary text-muted-foreground hover:text-foreground transition-all"
              >
                <Plus size={13} />
              </button>
            </div>
            <div className="space-y-0.5">
              {sections.map((section) => {
                const Icon = SECTION_TYPE_ICONS[section.type];
                return (
                  <div
                    key={section.id}
                    onClick={() => setSelectedSection(section.id)}
                    className={`flex items-center gap-2 px-2 py-2 rounded-lg cursor-pointer group transition-all duration-100 ${
                      selectedSection === section.id
                        ? 'bg-primary/8 border border-primary/20' :'hover:bg-secondary/60 border border-transparent'
                    } ${!section.visible ? 'opacity-40' : ''}`}
                  >
                    <GripVertical size={12} className="text-muted-foreground/40 drag-handle shrink-0" />
                    <Icon size={13} className={`shrink-0 ${selectedSection === section.id ? 'text-primary' : 'text-muted-foreground'}`} />
                    <span className={`flex-1 text-xs font-medium truncate ${selectedSection === section.id ? 'text-primary' : 'text-foreground'}`}>
                      {section.label}
                    </span>
                    <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={(e) => { e.stopPropagation(); toggleVisibility(section.id); }}
                        title={section.visible ? 'Hide section' : 'Show section'}
                        className="w-5 h-5 flex items-center justify-center rounded text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {section.visible ? <Eye size={11} /> : <EyeOff size={11} />}
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); toggleLock(section.id); }}
                        title={section.locked ? 'Unlock section' : 'Lock section'}
                        className="w-5 h-5 flex items-center justify-center rounded text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {section.locked ? <Lock size={11} /> : <Unlock size={11} />}
                      </button>
                    </div>
                    {section.locked && (
                      <Lock size={10} className="text-muted-foreground/50 shrink-0" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TEMPLATES TAB */}
        {tab === 'templates' && (
          <div className="p-3">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-3 px-1">
              Section Templates
            </p>
            <div className="space-y-2">
              {TEMPLATES.map((tpl) => (
                <div
                  key={tpl.id}
                  className="rounded-xl border border-border overflow-hidden hover:border-primary/40 transition-all duration-150 cursor-pointer group"
                  onClick={() => toast.success(`Applied template: ${tpl.name}`)}
                >
                  <div className={`h-16 ${tpl.preview} relative`}>
                    {tpl.badge && (
                      <span className="absolute top-2 right-2 text-[9px] font-bold bg-white/90 text-foreground px-1.5 py-0.5 rounded-full">
                        {tpl.badge}
                      </span>
                    )}
                  </div>
                  <div className="px-2.5 py-2 flex items-center justify-between bg-white">
                    <div>
                      <p className="text-xs font-semibold text-foreground">{tpl.name}</p>
                      <p className="text-[10px] text-muted-foreground">{tpl.category}</p>
                    </div>
                    <button className="text-[10px] font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                      Apply
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
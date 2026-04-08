'use client';
import React, { useState } from 'react';
import { toast } from 'sonner';
import { Plus, Trash2, ArrowUp, ArrowDown, Copy, GripVertical, Settings2,  } from 'lucide-react';
import type { CanvasSection, DeviceMode } from './BuilderShell';

interface BuilderCanvasProps {
  device: DeviceMode;
  sections: CanvasSection[];
  selectedSection: string | null;
  setSelectedSection: (id: string | null) => void;
  setSections: (s: CanvasSection[]) => void;
}

const DEVICE_WIDTH: Record<DeviceMode, string> = {
  desktop: 'w-full max-w-[1200px]',
  tablet: 'w-[768px]',
  mobile: 'w-[390px]',
};

function HeroSectionPreview({ selected }: { selected: boolean }) {
  return (
    <div
      className="relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #1e2d3d 0%, #2d4a6b 60%, #1e2d3d 100%)',
        minHeight: 320,
      }}
    >
      <div className="absolute inset-0 opacity-10"
        style={{ backgroundImage: 'radial-gradient(circle at 70% 50%, #f59e0b 0%, transparent 60%)' }} />
      <div className="relative z-10 flex flex-col items-center justify-center text-center py-20 px-8">
        <div className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-500/30 rounded-full px-4 py-1.5 mb-6">
          <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
          <span className="text-amber-300 text-xs font-medium">Award-Winning Design Studio</span>
        </div>
        <div className="w-96 h-8 bg-white/90 rounded-lg mb-3 mx-auto" />
        <div className="w-64 h-8 bg-white/60 rounded-lg mb-6 mx-auto" />
        <div className="w-80 h-4 bg-white/25 rounded mb-2 mx-auto" />
        <div className="w-64 h-4 bg-white/20 rounded mb-8 mx-auto" />
        <div className="flex gap-3 justify-center">
          <div className="w-32 h-11 bg-amber-500 rounded-xl" />
          <div className="w-32 h-11 bg-white/15 border border-white/30 rounded-xl" />
        </div>
      </div>
    </div>
  );
}

function FeaturesSectionPreview() {
  return (
    <div className="bg-white py-16 px-8">
      <div className="text-center mb-10">
        <div className="w-48 h-6 bg-gray-200 rounded mx-auto mb-3" />
        <div className="w-80 h-4 bg-gray-100 rounded mx-auto" />
      </div>
      <div className="grid grid-cols-3 gap-6">
        {['feat-a', 'feat-b', 'feat-c'].map((f) => (
          <div key={f} className="flex flex-col items-start gap-3 p-5 rounded-xl border border-gray-100 bg-gray-50/50">
            <div className="w-10 h-10 rounded-xl bg-primary/10" />
            <div className="w-28 h-4 bg-gray-200 rounded" />
            <div className="space-y-1.5 w-full">
              <div className="w-full h-3 bg-gray-100 rounded" />
              <div className="w-4/5 h-3 bg-gray-100 rounded" />
              <div className="w-3/5 h-3 bg-gray-100 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TestimonialSectionPreview() {
  return (
    <div className="bg-gray-50 py-14 px-8">
      <div className="text-center mb-8">
        <div className="w-40 h-5 bg-gray-200 rounded mx-auto mb-2" />
        <div className="w-64 h-4 bg-gray-100 rounded mx-auto" />
      </div>
      <div className="grid grid-cols-2 gap-5 max-w-2xl mx-auto">
        {['test-a', 'test-b'].map((t) => (
          <div key={t} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <div className="flex gap-1 mb-3">
              {['s1','s2','s3','s4','s5'].map((s) => (
                <div key={s} className="w-3 h-3 rounded-sm bg-amber-400" />
              ))}
            </div>
            <div className="space-y-1.5 mb-4">
              <div className="w-full h-3 bg-gray-100 rounded" />
              <div className="w-5/6 h-3 bg-gray-100 rounded" />
              <div className="w-4/6 h-3 bg-gray-100 rounded" />
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-400 to-slate-600" />
              <div>
                <div className="w-20 h-2.5 bg-gray-200 rounded mb-1" />
                <div className="w-16 h-2 bg-gray-100 rounded" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PricingSectionPreview() {
  return (
    <div className="bg-white py-14 px-8">
      <div className="text-center mb-8">
        <div className="w-36 h-6 bg-gray-200 rounded mx-auto mb-3" />
        <div className="w-56 h-4 bg-gray-100 rounded mx-auto" />
      </div>
      <div className="grid grid-cols-3 gap-5 max-w-3xl mx-auto">
        {[
          { key: 'price-starter', accent: false },
          { key: 'price-pro', accent: true },
          { key: 'price-enterprise', accent: false },
        ].map(({ key, accent }) => (
          <div
            key={key}
            className={`rounded-2xl p-5 border ${accent ? 'border-primary bg-primary text-white' : 'border-gray-100 bg-gray-50'}`}
          >
            <div className={`w-20 h-4 rounded mb-2 ${accent ? 'bg-white/30' : 'bg-gray-200'}`} />
            <div className={`w-24 h-8 rounded mb-4 ${accent ? 'bg-white/40' : 'bg-gray-200'}`} />
            <div className="space-y-2 mb-5">
              {['f1','f2','f3','f4'].map((f) => (
                <div key={f} className={`flex items-center gap-2`}>
                  <div className={`w-3 h-3 rounded-full ${accent ? 'bg-amber-400' : 'bg-emerald-400'}`} />
                  <div className={`flex-1 h-2.5 rounded ${accent ? 'bg-white/25' : 'bg-gray-100'}`} />
                </div>
              ))}
            </div>
            <div className={`w-full h-9 rounded-xl ${accent ? 'bg-amber-500' : 'bg-primary/10'}`} />
          </div>
        ))}
      </div>
    </div>
  );
}

function CTASectionPreview() {
  return (
    <div
      className="py-16 px-8 text-center"
      style={{ background: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)' }}
    >
      <div className="w-64 h-7 bg-white/40 rounded mx-auto mb-3" />
      <div className="w-80 h-4 bg-white/30 rounded mx-auto mb-6" />
      <div className="flex gap-3 justify-center">
        <div className="w-36 h-11 bg-white rounded-xl" />
        <div className="w-36 h-11 bg-white/20 border border-white/50 rounded-xl" />
      </div>
    </div>
  );
}

function FooterSectionPreview() {
  return (
    <div className="bg-[#1e2d3d] py-12 px-8">
      <div className="grid grid-cols-4 gap-8 mb-8">
        {['col-a', 'col-b', 'col-c', 'col-d'].map((col) => (
          <div key={col}>
            <div className="w-20 h-3.5 bg-white/30 rounded mb-4" />
            <div className="space-y-2">
              {['l1','l2','l3','l4'].map((l) => (
                <div key={l} className="w-24 h-2.5 bg-white/15 rounded" />
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="border-t border-white/10 pt-5 flex items-center justify-between">
        <div className="w-40 h-2.5 bg-white/20 rounded" />
        <div className="flex gap-3">
          {['s1','s2','s3'].map((s) => (
            <div key={s} className="w-7 h-7 rounded-lg bg-white/10" />
          ))}
        </div>
      </div>
    </div>
  );
}

const SECTION_PREVIEWS: Record<CanvasSection['type'], React.ComponentType<{ selected: boolean }>> = {
  hero: HeroSectionPreview,
  features: ({ selected }) => <FeaturesSectionPreview />,
  testimonial: ({ selected }) => <TestimonialSectionPreview />,
  pricing: ({ selected }) => <PricingSectionPreview />,
  cta: ({ selected }) => <CTASectionPreview />,
  footer: ({ selected }) => <FooterSectionPreview />,
  gallery: ({ selected }) => (
    <div className="bg-white py-12 px-8">
      <div className="w-40 h-6 bg-gray-200 rounded mx-auto mb-6" />
      <div className="grid grid-cols-3 gap-3">
        {['g1','g2','g3','g4','g5','g6'].map((g) => (
          <div key={g} className="h-28 bg-gray-100 rounded-xl" />
        ))}
      </div>
    </div>
  ),
  team: ({ selected }) => (
    <div className="bg-gray-50 py-12 px-8">
      <div className="w-32 h-6 bg-gray-200 rounded mx-auto mb-8" />
      <div className="grid grid-cols-4 gap-5">
        {['t1','t2','t3','t4'].map((t) => (
          <div key={t} className="flex flex-col items-center gap-2">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-slate-300 to-slate-500" />
            <div className="w-20 h-3 bg-gray-200 rounded" />
            <div className="w-16 h-2.5 bg-gray-100 rounded" />
          </div>
        ))}
      </div>
    </div>
  ),
  faq: ({ selected }) => (
    <div className="bg-white py-12 px-8 max-w-2xl mx-auto">
      <div className="w-32 h-6 bg-gray-200 rounded mx-auto mb-8" />
      <div className="space-y-3">
        {['faq1','faq2','faq3','faq4'].map((f) => (
          <div key={f} className="border border-gray-100 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="w-56 h-3.5 bg-gray-200 rounded" />
              <div className="w-4 h-4 rounded bg-gray-100" />
            </div>
            <div className="w-full h-2.5 bg-gray-50 rounded" />
          </div>
        ))}
      </div>
    </div>
  ),
  contact: ({ selected }) => (
    <div className="bg-gray-50 py-12 px-8">
      <div className="max-w-lg mx-auto">
        <div className="w-36 h-6 bg-gray-200 rounded mx-auto mb-8" />
        <div className="space-y-4">
          {['cf1','cf2','cf3'].map((f) => (
            <div key={f} className="bg-white rounded-xl border border-gray-100 h-11" />
          ))}
          <div className="bg-white rounded-xl border border-gray-100 h-24" />
          <div className="bg-primary h-11 rounded-xl" />
        </div>
      </div>
    </div>
  ),
};

export default function BuilderCanvas({
  device, sections, selectedSection, setSelectedSection, setSections,
}: BuilderCanvasProps) {
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);

  const moveSection = (id: string, dir: 'up' | 'down') => {
    const idx = sections.findIndex((s) => s.id === id);
    if (dir === 'up' && idx === 0) return;
    if (dir === 'down' && idx === sections.length - 1) return;
    const next = [...sections];
    const swapIdx = dir === 'up' ? idx - 1 : idx + 1;
    [next[idx], next[swapIdx]] = [next[swapIdx], next[idx]];
    setSections(next);
    toast.info(`Moved ${sections[idx].label} ${dir}`);
  };

  const duplicateSection = (id: string) => {
    const idx = sections.findIndex((s) => s.id === id);
    const section = sections[idx];
    const copy: CanvasSection = {
      ...section,
      id: `${section.id}-copy-${Date.now()}`,
      label: `${section.label} (Copy)`,
      locked: false,
    };
    const next = [...sections];
    next.splice(idx + 1, 0, copy);
    setSections(next);
    toast.success(`Duplicated ${section.label}`);
  };

  const deleteSection = (id: string) => {
    const section = sections.find((s) => s.id === id);
    if (section?.locked) {
      toast.error('This section is locked — unlock it first to delete');
      return;
    }
    setSections(sections.filter((s) => s.id !== id));
    if (selectedSection === id) setSelectedSection(null);
    toast.success(`Deleted ${section?.label}`);
  };

  const addSection = () => {
    toast.info('Choose a section from the Elements panel to add');
  };

  return (
    <div
      className={`${DEVICE_WIDTH[device]} transition-all duration-300 ease-in-out bg-white rounded-xl overflow-hidden shadow-modal`}
      style={{ minHeight: 600 }}
    >
      {/* Canvas top bar */}
      <div className="h-8 bg-[#2a2a2a] flex items-center px-3 gap-1.5 shrink-0">
        {['dot-red','dot-yellow','dot-green'].map((d) => (
          <div key={d} className={`w-2.5 h-2.5 rounded-full ${d === 'dot-red' ? 'bg-red-400' : d === 'dot-yellow' ? 'bg-yellow-400' : 'bg-green-400'}`} />
        ))}
        <div className="flex-1 mx-4">
          <div className="bg-[#3a3a3a] rounded-md h-4 flex items-center justify-center px-3">
            <span className="text-[10px] text-white/40 font-mono">nomastudio.com</span>
          </div>
        </div>
      </div>

      {/* Sections */}
      <div className="relative">
        {sections.filter((s) => s.visible).map((section, idx) => {
          const Preview = SECTION_PREVIEWS[section.type];
          const isSelected = selectedSection === section.id;
          const isHovered = hoveredSection === section.id;

          return (
            <div
              key={section.id}
              className={`relative group transition-all duration-100 ${
                isSelected ? 'ring-2 ring-blue-500 ring-inset z-10' : ''
              }`}
              onClick={() => setSelectedSection(section.id)}
              onMouseEnter={() => setHoveredSection(section.id)}
              onMouseLeave={() => setHoveredSection(null)}
            >
              {/* Section label */}
              {(isSelected || isHovered) && (
                <div className="absolute top-0 left-0 z-20 flex items-center gap-0 pointer-events-none">
                  <div className="bg-blue-500 text-white text-[10px] font-semibold px-2 py-0.5 rounded-br-md">
                    {section.label}
                  </div>
                  {section.locked && (
                    <div className="bg-blue-400 text-white text-[10px] px-1.5 py-0.5">🔒</div>
                  )}
                </div>
              )}

              {/* Section actions toolbar */}
              {(isSelected || isHovered) && (
                <div className="absolute top-0 right-0 z-20 flex items-center gap-0.5 bg-blue-500 rounded-bl-lg px-1 py-0.5">
                  <button
                    onClick={(e) => { e.stopPropagation(); moveSection(section.id, 'up'); }}
                    title="Move up"
                    disabled={idx === 0}
                    className="w-6 h-6 flex items-center justify-center rounded text-white hover:bg-white/20 disabled:opacity-30 transition-all"
                  >
                    <ArrowUp size={11} />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); moveSection(section.id, 'down'); }}
                    title="Move down"
                    disabled={idx === sections.filter(s => s.visible).length - 1}
                    className="w-6 h-6 flex items-center justify-center rounded text-white hover:bg-white/20 disabled:opacity-30 transition-all"
                  >
                    <ArrowDown size={11} />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); duplicateSection(section.id); }}
                    title="Duplicate section"
                    className="w-6 h-6 flex items-center justify-center rounded text-white hover:bg-white/20 transition-all"
                  >
                    <Copy size={11} />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); toast.info(`Editing ${section.label} settings`); }}
                    title="Section settings"
                    className="w-6 h-6 flex items-center justify-center rounded text-white hover:bg-white/20 transition-all"
                  >
                    <Settings2 size={11} />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); deleteSection(section.id); }}
                    title="Delete section"
                    disabled={section.locked}
                    className="w-6 h-6 flex items-center justify-center rounded text-white hover:bg-red-400 disabled:opacity-30 transition-all"
                  >
                    <Trash2 size={11} />
                  </button>
                </div>
              )}

              {/* Drag handle */}
              {(isSelected || isHovered) && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-blue-500 rounded-r-md p-1 cursor-grab active:cursor-grabbing">
                  <GripVertical size={12} className="text-white" />
                </div>
              )}

              <Preview selected={isSelected} />
            </div>
          );
        })}

        {/* Add section button */}
        <div
          className="flex items-center justify-center py-6 border-2 border-dashed border-gray-200 bg-gray-50/50 cursor-pointer hover:border-primary/40 hover:bg-primary/3 transition-all group"
          onClick={addSection}
        >
          <div className="flex items-center gap-2 text-muted-foreground group-hover:text-primary transition-colors">
            <Plus size={16} />
            <span className="text-sm font-medium">Add Section</span>
          </div>
        </div>
      </div>
    </div>
  );
}
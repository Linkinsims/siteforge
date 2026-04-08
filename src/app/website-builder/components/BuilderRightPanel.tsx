'use client';
import React, { useState } from 'react';
import { toast } from 'sonner';
import { AlignLeft, AlignCenter, AlignRight, AlignJustify, Bold, Italic, Underline, Layout, ChevronDown, RotateCcw, Link2, Monitor,  } from 'lucide-react';
import type { RightTab, CanvasSection } from './BuilderShell';
import Icon from '@/components/ui/AppIcon';


interface BuilderRightPanelProps {
  tab: RightTab;
  setTab: (t: RightTab) => void;
  selectedSection: CanvasSection | null;
}

interface ColorSwatchProps {
  color: string;
  label: string;
  selected?: boolean;
  onClick?: () => void;
}

function ColorSwatch({ color, label, selected, onClick }: ColorSwatchProps) {
  return (
    <button
      onClick={onClick}
      title={label}
      className={`w-7 h-7 rounded-lg border-2 transition-all duration-100 ${
        selected ? 'border-primary scale-110' : 'border-transparent hover:border-gray-300'
      }`}
      style={{ backgroundColor: color }}
    />
  );
}

interface SliderFieldProps {
  label: string;
  value: number;
  min: number;
  max: number;
  unit: string;
  onChange: (v: number) => void;
}

function SliderField({ label, value, min, max, unit, onChange }: SliderFieldProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <label className="text-[11px] font-medium text-muted-foreground">{label}</label>
        <div className="flex items-center gap-1">
          <input
            type="number"
            value={value}
            min={min}
            max={max}
            onChange={(e) => onChange(Number(e.target.value))}
            className="w-12 text-[11px] text-right border border-border rounded-md px-1.5 py-0.5 bg-white outline-none focus:ring-1 focus:ring-primary/30 tabular-nums"
          />
          <span className="text-[10px] text-muted-foreground">{unit}</span>
        </div>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-1.5 rounded-full appearance-none bg-secondary accent-primary cursor-pointer"
      />
    </div>
  );
}

const BRAND_COLORS = [
  { color: '#1e2d3d', label: 'Navy Primary' },
  { color: '#f59e0b', label: 'Amber Accent' },
  { color: '#ffffff', label: 'White' },
  { color: '#f8fafc', label: 'Off-White' },
  { color: '#64748b', label: 'Slate' },
  { color: '#0f172a', label: 'Dark Navy' },
  { color: '#fbbf24', label: 'Amber Light' },
  { color: '#e2e8f0', label: 'Border Gray' },
];

const FONT_OPTIONS = ['DM Sans', 'Playfair Display', 'Inter', 'Georgia', 'Merriweather', 'Raleway'];

export default function BuilderRightPanel({ tab, setTab, selectedSection }: BuilderRightPanelProps) {
  const [fontSize, setFontSize] = useState(16);
  const [lineHeight, setLineHeight] = useState(150);
  const [letterSpacing, setLetterSpacing] = useState(0);
  const [paddingTop, setPaddingTop] = useState(80);
  const [paddingBottom, setPaddingBottom] = useState(80);
  const [paddingLeft, setPaddingLeft] = useState(32);
  const [paddingRight, setPaddingRight] = useState(32);
  const [marginTop, setMarginTop] = useState(0);
  const [marginBottom, setMarginBottom] = useState(0);
  const [selectedFont, setSelectedFont] = useState('DM Sans');
  const [selectedBg, setSelectedBg] = useState('#ffffff');
  const [textAlign, setTextAlign] = useState<'left' | 'center' | 'right' | 'justify'>('left');
  const [fontWeight, setFontWeight] = useState<'400' | '500' | '600' | '700'>('400');
  const [borderRadius, setBorderRadius] = useState(0);
  const [opacity, setOpacity] = useState(100);
  const [gap, setGap] = useState(24);
  const [columns, setColumns] = useState(3);
  const [showFontDropdown, setShowFontDropdown] = useState(false);

  const TABS: { key: RightTab; label: string }[] = [
    { key: 'style', label: 'Style' },
    { key: 'layout', label: 'Layout' },
    { key: 'advanced', label: 'Advanced' },
  ];

  if (!selectedSection) {
    return (
      <div className="h-full bg-white border-l border-border flex flex-col items-center justify-center px-6 text-center">
        <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center mb-3">
          <Monitor size={20} className="text-muted-foreground" />
        </div>
        <p className="text-sm font-semibold text-foreground mb-1">No Section Selected</p>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Click any section on the canvas to edit its properties
        </p>
      </div>
    );
  }

  return (
    <div className="h-full bg-white border-l border-border flex flex-col shadow-panel">
      {/* Section identifier */}
      <div className="px-4 py-3 border-b border-border shrink-0">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-foreground">{selectedSection.label}</p>
            <p className="text-[10px] text-muted-foreground font-mono mt-0.5">{selectedSection.id}</p>
          </div>
          <button
            onClick={() => toast.info('Properties reset to defaults')}
            title="Reset section styles"
            className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground transition-all"
          >
            <RotateCcw size={13} />
          </button>
        </div>
      </div>

      {/* Tab bar */}
      <div className="flex border-b border-border shrink-0">
        {TABS.map(({ key, label }) => (
          <button
            key={`rtab-${key}`}
            onClick={() => setTab(key)}
            className={`flex-1 py-2.5 text-xs font-semibold transition-all duration-150 border-b-2 ${
              tab === key
                ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-thin">
        {/* STYLE TAB */}
        {tab === 'style' && (
          <div className="p-4 space-y-5">
            {/* Typography */}
            <div>
              <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground mb-3">
                Typography
              </p>

              {/* Font family */}
              <div className="mb-3">
                <label className="text-[11px] font-medium text-muted-foreground block mb-1.5">Font Family</label>
                <div className="relative">
                  <button
                    onClick={() => setShowFontDropdown((v) => !v)}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-lg border border-border bg-white text-xs font-medium text-foreground hover:border-primary/40 transition-all"
                  >
                    <span style={{ fontFamily: selectedFont }}>{selectedFont}</span>
                    <ChevronDown size={12} className="text-muted-foreground" />
                  </button>
                  {showFontDropdown && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-xl border border-border shadow-modal z-50 py-1 animate-fade-in">
                      {FONT_OPTIONS.map((font) => (
                        <button
                          key={`font-${font}`}
                          onClick={() => { setSelectedFont(font); setShowFontDropdown(false); toast.info(`Font changed to ${font}`); }}
                          className={`w-full text-left px-3 py-2 text-xs transition-colors ${
                            selectedFont === font ? 'bg-primary/5 text-primary font-semibold' : 'text-foreground hover:bg-secondary'
                          }`}
                          style={{ fontFamily: font }}
                        >
                          {font}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Font weight */}
              <div className="mb-3">
                <label className="text-[11px] font-medium text-muted-foreground block mb-1.5">Font Weight</label>
                <div className="grid grid-cols-4 gap-1">
                  {(['400', '500', '600', '700'] as const).map((w) => (
                    <button
                      key={`fw-${w}`}
                      onClick={() => setFontWeight(w)}
                      className={`py-1.5 rounded-lg text-xs transition-all ${
                        fontWeight === w
                          ? 'bg-primary text-white' :'bg-secondary text-muted-foreground hover:bg-primary/10 hover:text-primary'
                      }`}
                      style={{ fontWeight: w }}
                    >
                      {w === '400' ? 'Reg' : w === '500' ? 'Med' : w === '600' ? 'Semi' : 'Bold'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Text align */}
              <div className="mb-3">
                <label className="text-[11px] font-medium text-muted-foreground block mb-1.5">Text Align</label>
                <div className="grid grid-cols-4 gap-1">
                  {[
                    { v: 'left' as const, icon: AlignLeft },
                    { v: 'center' as const, icon: AlignCenter },
                    { v: 'right' as const, icon: AlignRight },
                    { v: 'justify' as const, icon: AlignJustify },
                  ].map(({ v, icon: Icon }) => (
                    <button
                      key={`align-${v}`}
                      onClick={() => setTextAlign(v)}
                      className={`py-1.5 flex items-center justify-center rounded-lg transition-all ${
                        textAlign === v
                          ? 'bg-primary text-white' :'bg-secondary text-muted-foreground hover:bg-primary/10 hover:text-primary'
                      }`}
                    >
                      <Icon size={13} />
                    </button>
                  ))}
                </div>
              </div>

              {/* Font style buttons */}
              <div className="mb-3">
                <label className="text-[11px] font-medium text-muted-foreground block mb-1.5">Style</label>
                <div className="flex gap-1">
                  {[
                    { icon: Bold, label: 'Bold' },
                    { icon: Italic, label: 'Italic' },
                    { icon: Underline, label: 'Underline' },
                  ].map(({ icon: Icon, label }) => (
                    <button
                      key={`style-${label}`}
                      title={label}
                      onClick={() => toast.info(`${label} toggled`)}
                      className="w-8 h-8 flex items-center justify-center rounded-lg bg-secondary text-muted-foreground hover:bg-primary/10 hover:text-primary transition-all"
                    >
                      <Icon size={13} />
                    </button>
                  ))}
                </div>
              </div>

              <SliderField label="Font Size" value={fontSize} min={10} max={96} unit="px" onChange={setFontSize} />
              <div className="mt-3">
                <SliderField label="Line Height" value={lineHeight} min={100} max={200} unit="%" onChange={setLineHeight} />
              </div>
              <div className="mt-3">
                <SliderField label="Letter Spacing" value={letterSpacing} min={-5} max={20} unit="px" onChange={setLetterSpacing} />
              </div>
            </div>

            <hr className="border-border" />

            {/* Background */}
            <div>
              <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground mb-3">
                Background
              </p>
              <label className="text-[11px] font-medium text-muted-foreground block mb-2">Brand Colors</label>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {BRAND_COLORS.map((c) => (
                  <ColorSwatch
                    key={`bg-${c.color}`}
                    color={c.color}
                    label={c.label}
                    selected={selectedBg === c.color}
                    onClick={() => { setSelectedBg(c.color); toast.info(`Background set to ${c.label}`); }}
                  />
                ))}
              </div>
              <div className="flex items-center gap-2">
                <label className="text-[11px] font-medium text-muted-foreground">Custom</label>
                <div className="relative flex items-center gap-2 flex-1">
                  <input
                    type="color"
                    value={selectedBg}
                    onChange={(e) => setSelectedBg(e.target.value)}
                    className="w-8 h-8 rounded-lg border border-border cursor-pointer p-0.5"
                  />
                  <input
                    type="text"
                    value={selectedBg}
                    onChange={(e) => setSelectedBg(e.target.value)}
                    className="flex-1 text-xs font-mono border border-border rounded-lg px-2 py-1.5 bg-white outline-none focus:ring-1 focus:ring-primary/30"
                  />
                </div>
              </div>
            </div>

            <hr className="border-border" />

            {/* Opacity */}
            <div>
              <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground mb-3">
                Visibility
              </p>
              <SliderField label="Opacity" value={opacity} min={0} max={100} unit="%" onChange={setOpacity} />
              <div className="mt-3">
                <SliderField label="Border Radius" value={borderRadius} min={0} max={48} unit="px" onChange={setBorderRadius} />
              </div>
            </div>
          </div>
        )}

        {/* LAYOUT TAB */}
        {tab === 'layout' && (
          <div className="p-4 space-y-5">
            {/* Padding */}
            <div>
              <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground mb-3">
                Padding
              </p>
              <div className="space-y-3">
                <SliderField label="Top" value={paddingTop} min={0} max={200} unit="px" onChange={setPaddingTop} />
                <SliderField label="Bottom" value={paddingBottom} min={0} max={200} unit="px" onChange={setPaddingBottom} />
                <SliderField label="Left" value={paddingLeft} min={0} max={200} unit="px" onChange={setPaddingLeft} />
                <SliderField label="Right" value={paddingRight} min={0} max={200} unit="px" onChange={setPaddingRight} />
              </div>
            </div>

            <hr className="border-border" />

            {/* Margin */}
            <div>
              <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground mb-3">
                Margin
              </p>
              <div className="space-y-3">
                <SliderField label="Top" value={marginTop} min={-100} max={200} unit="px" onChange={setMarginTop} />
                <SliderField label="Bottom" value={marginBottom} min={-100} max={200} unit="px" onChange={setMarginBottom} />
              </div>
            </div>

            <hr className="border-border" />

            {/* Grid layout */}
            <div>
              <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground mb-3">
                Grid Layout
              </p>
              <div className="space-y-3">
                <div>
                  <label className="text-[11px] font-medium text-muted-foreground block mb-1.5">Columns</label>
                  <div className="grid grid-cols-4 gap-1">
                    {[1, 2, 3, 4].map((c) => (
                      <button
                        key={`col-${c}`}
                        onClick={() => { setColumns(c); toast.info(`Grid set to ${c} column${c > 1 ? 's' : ''}`); }}
                        className={`py-1.5 rounded-lg text-xs font-medium transition-all ${
                          columns === c
                            ? 'bg-primary text-white' :'bg-secondary text-muted-foreground hover:bg-primary/10 hover:text-primary'
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
                <SliderField label="Gap" value={gap} min={0} max={80} unit="px" onChange={setGap} />
              </div>
            </div>

            <hr className="border-border" />

            {/* Max width */}
            <div>
              <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground mb-3">
                Container
              </p>
              <div>
                <label className="text-[11px] font-medium text-muted-foreground block mb-1.5">Max Width</label>
                <div className="grid grid-cols-3 gap-1">
                  {['Full', '1280px', '960px'].map((w) => (
                    <button
                      key={`mw-${w}`}
                      onClick={() => toast.info(`Max width set to ${w}`)}
                      className="py-1.5 rounded-lg text-[11px] font-medium bg-secondary text-muted-foreground hover:bg-primary/10 hover:text-primary transition-all"
                    >
                      {w}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ADVANCED TAB */}
        {tab === 'advanced' && (
          <div className="p-4 space-y-5">
            {/* Custom CSS class */}
            <div>
              <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground mb-3">
                CSS & Identity
              </p>
              <div className="mb-3">
                <label className="text-[11px] font-medium text-muted-foreground block mb-1.5">CSS Class</label>
                <input
                  type="text"
                  placeholder="e.g. hero-section dark-theme"
                  defaultValue=""
                  className="w-full px-3 py-2 text-xs font-mono border border-border rounded-lg bg-white outline-none focus:ring-1 focus:ring-primary/30 transition-all"
                />
              </div>
              <div className="mb-3">
                <label className="text-[11px] font-medium text-muted-foreground block mb-1.5">Element ID</label>
                <input
                  type="text"
                  placeholder="e.g. hero, features"
                  defaultValue={selectedSection?.type}
                  className="w-full px-3 py-2 text-xs font-mono border border-border rounded-lg bg-white outline-none focus:ring-1 focus:ring-primary/30 transition-all"
                />
                <p className="mt-1 text-[10px] text-muted-foreground">Used for anchor links — e.g. /page#hero</p>
              </div>
            </div>

            <hr className="border-border" />

            {/* Animations */}
            <div>
              <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground mb-3">
                Scroll Animation
              </p>
              <div className="grid grid-cols-2 gap-1.5">
                {['None', 'Fade In', 'Slide Up', 'Slide Left', 'Zoom In', 'Bounce'].map((anim) => (
                  <button
                    key={`anim-${anim}`}
                    onClick={() => toast.info(`Animation set to ${anim}`)}
                    className={`py-1.5 rounded-lg text-[11px] font-medium transition-all ${
                      anim === 'None' ?'bg-primary text-white' :'bg-secondary text-muted-foreground hover:bg-primary/10 hover:text-primary'
                    }`}
                  >
                    {anim}
                  </button>
                ))}
              </div>
              <div className="mt-3">
                <SliderField label="Animation Delay" value={0} min={0} max={2000} unit="ms" onChange={() => {}} />
              </div>
            </div>

            <hr className="border-border" />

            {/* Visibility rules */}
            <div>
              <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground mb-3">
                Device Visibility
              </p>
              <div className="space-y-2">
                {[
                  { label: 'Show on Desktop', defaultChecked: true },
                  { label: 'Show on Tablet', defaultChecked: true },
                  { label: 'Show on Mobile', defaultChecked: true },
                ].map((item) => (
                  <label key={`vis-${item.label}`} className="flex items-center gap-2.5 cursor-pointer group">
                    <div className="relative">
                      <input
                        type="checkbox"
                        defaultChecked={item.defaultChecked}
                        className="sr-only peer"
                        onChange={() => toast.info(`${item.label} toggled`)}
                      />
                      <div className="w-9 h-5 bg-secondary rounded-full peer-checked:bg-primary transition-colors" />
                      <div className="absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-transform peer-checked:translate-x-4" />
                    </div>
                    <span className="text-xs font-medium text-foreground">{item.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <hr className="border-border" />

            {/* Link */}
            <div>
              <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground mb-3">
                Section Link
              </p>
              <div className="flex items-center gap-2">
                <Link2 size={13} className="text-muted-foreground shrink-0" />
                <input
                  type="text"
                  placeholder="https://..."
                  className="flex-1 px-2.5 py-1.5 text-xs border border-border rounded-lg bg-white outline-none focus:ring-1 focus:ring-primary/30 transition-all"
                />
              </div>
              <p className="mt-1 text-[10px] text-muted-foreground">Make the entire section clickable</p>
            </div>

            {/* Custom CSS */}
            <div>
              <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground mb-3">
                Custom CSS
              </p>
              <textarea
                rows={5}
                placeholder={`/* Custom styles for this section */\n.section {\n  background: linear-gradient(...);\n}`}
                className="w-full px-3 py-2 text-[11px] font-mono border border-border rounded-lg bg-white outline-none focus:ring-1 focus:ring-primary/30 transition-all resize-none"
              />
              <button
                onClick={() => toast.success('Custom CSS applied')}
                className="mt-2 w-full py-1.5 text-xs font-semibold bg-primary/8 text-primary rounded-lg hover:bg-primary/15 transition-all"
              >
                Apply CSS
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
'use client';
import React, { useState } from 'react';
import BuilderTopbar from './BuilderTopbar';
import BuilderLeftPanel from './BuilderLeftPanel';
import BuilderCanvas from './BuilderCanvas';
import BuilderRightPanel from './BuilderRightPanel';
import { Toaster } from 'sonner';

export type DeviceMode = 'desktop' | 'tablet' | 'mobile';
export type LeftTab = 'elements' | 'layers' | 'templates';
export type RightTab = 'style' | 'layout' | 'advanced';

export interface CanvasSection {
  id: string;
  type: 'hero' | 'features' | 'testimonial' | 'pricing' | 'cta' | 'footer' | 'gallery' | 'team' | 'faq' | 'contact';
  label: string;
  visible: boolean;
  locked: boolean;
}

const INITIAL_SECTIONS: CanvasSection[] = [
  { id: 'sec-001', type: 'hero', label: 'Hero Section', visible: true, locked: false },
  { id: 'sec-002', type: 'features', label: 'Features Grid', visible: true, locked: false },
  { id: 'sec-003', type: 'testimonial', label: 'Testimonials', visible: true, locked: false },
  { id: 'sec-004', type: 'pricing', label: 'Pricing Table', visible: true, locked: false },
  { id: 'sec-005', type: 'cta', label: 'Call to Action', visible: true, locked: false },
  { id: 'sec-006', type: 'footer', label: 'Footer', visible: true, locked: true },
];

export default function BuilderShell() {
  const [device, setDevice] = useState<DeviceMode>('desktop');
  const [leftTab, setLeftTab] = useState<LeftTab>('elements');
  const [rightTab, setRightTab] = useState<RightTab>('style');
  const [selectedSection, setSelectedSection] = useState<string | null>('sec-001');
  const [sections, setSections] = useState<CanvasSection[]>(INITIAL_SECTIONS);
  const [leftCollapsed, setLeftCollapsed] = useState(false);
  const [rightCollapsed, setRightCollapsed] = useState(false);
  const [saveState, setSaveState] = useState<'saved' | 'saving' | 'unsaved'>('saved');
  const [history, setHistory] = useState<CanvasSection[][]>([INITIAL_SECTIONS]);
  const [historyIndex, setHistoryIndex] = useState(0);

  const pushHistory = (newSections: CanvasSection[]) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newSections);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
    setSections(newSections);
    setSaveState('unsaved');
  };

  const undo = () => {
    if (historyIndex > 0) {
      setHistoryIndex((i) => i - 1);
      setSections(history[historyIndex - 1]);
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex((i) => i + 1);
      setSections(history[historyIndex + 1]);
    }
  };

  const selectedSectionData = sections.find((s) => s.id === selectedSection) ?? null;

  return (
    <div className="flex flex-col h-screen bg-[#f0f0f0] overflow-hidden" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <Toaster position="bottom-right" richColors />
      <BuilderTopbar
        device={device}
        setDevice={setDevice}
        saveState={saveState}
        setSaveState={setSaveState}
        canUndo={historyIndex > 0}
        canRedo={historyIndex < history.length - 1}
        onUndo={undo}
        onRedo={redo}
        leftCollapsed={leftCollapsed}
        rightCollapsed={rightCollapsed}
        setLeftCollapsed={setLeftCollapsed}
        setRightCollapsed={setRightCollapsed}
      />
      <div className="flex flex-1 overflow-hidden">
        {/* Left Panel */}
        <div
          className={`transition-all duration-300 ease-in-out shrink-0 ${
            leftCollapsed ? 'w-0 overflow-hidden' : 'w-64'
          }`}
        >
          {!leftCollapsed && (
            <BuilderLeftPanel
              tab={leftTab}
              setTab={setLeftTab}
              sections={sections}
              selectedSection={selectedSection}
              setSelectedSection={setSelectedSection}
              setSections={pushHistory}
            />
          )}
        </div>

        {/* Canvas */}
        <div className="flex-1 overflow-auto flex items-start justify-center p-6">
          <BuilderCanvas
            device={device}
            sections={sections}
            selectedSection={selectedSection}
            setSelectedSection={setSelectedSection}
            setSections={pushHistory}
          />
        </div>

        {/* Right Panel */}
        <div
          className={`transition-all duration-300 ease-in-out shrink-0 ${
            rightCollapsed ? 'w-0 overflow-hidden' : 'w-72'
          }`}
        >
          {!rightCollapsed && (
            <BuilderRightPanel
              tab={rightTab}
              setTab={setRightTab}
              selectedSection={selectedSectionData}
            />
          )}
        </div>
      </div>
    </div>
  );
}
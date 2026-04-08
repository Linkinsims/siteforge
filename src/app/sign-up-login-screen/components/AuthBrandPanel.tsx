import React from 'react';
import AppLogo from '@/components/ui/AppLogo';
import { Globe, CheckCircle2, Zap } from 'lucide-react';

const FEATURES = [
  { icon: Zap, text: 'Drag-and-drop website builder with 60+ templates' },
  { icon: CheckCircle2, text: 'Client approval workflows with feedback threads' },
  { icon: Globe, text: 'One-click publishing with custom domain support' },
];

const MOCK_PROJECTS = [
  { name: 'Hartwell Legal', status: 'Published', color: 'bg-emerald-500' },
  { name: 'Noma Studio', status: 'In Review', color: 'bg-amber-500' },
  { name: 'Crestview Finance', status: 'In Progress', color: 'bg-blue-500' },
];

export default function AuthBrandPanel() {
  return (
    <div
      className="hidden lg:flex flex-col w-[52%] xl:w-[55%] relative overflow-hidden"
      style={{
        background: 'linear-gradient(145deg, hsl(215,35%,14%) 0%, hsl(215,35%,22%) 60%, hsl(215,30%,28%) 100%)',
      }}
    >
      {/* Decorative circles */}
      <div className="absolute top-[-120px] right-[-120px] w-[400px] h-[400px] rounded-full border border-white/5" />
      <div className="absolute top-[-60px] right-[-60px] w-[280px] h-[280px] rounded-full border border-white/5" />
      <div className="absolute bottom-[-80px] left-[-80px] w-[350px] h-[350px] rounded-full border border-white/5" />
      {/* Amber accent blob */}
      <div
        className="absolute top-[30%] left-[40%] w-[300px] h-[300px] rounded-full opacity-10"
        style={{ background: 'radial-gradient(circle, hsl(38,92%,50%) 0%, transparent 70%)' }}
      />
      {/* Logo */}
      <div className="relative z-10 p-10">
        <div className="flex items-center gap-3">
          <AppLogo size={36} />
          <span className="font-bold text-xl text-white tracking-tight">SiteForge</span>
        </div>
      </div>
      {/* Main content */}
      <div className="relative z-10 flex-1 flex flex-col justify-center px-10 xl:px-16 pb-10">
        <div className="max-w-md">
          <h1 className="text-4xl xl:text-5xl font-bold text-white leading-[1.15] mb-4">
            Build beautiful sites.
            <br />
            <span className="text-amber-400">Delight every client.</span>
          </h1>
          <p className="text-white/60 text-base mb-10 leading-relaxed">
            The complete platform for web agencies — from first brief to final launch,
            with client collaboration built in.
          </p>

          {/* Features */}
          <ul className="space-y-4 mb-10">
            {FEATURES?.map((feat) => (
              <li key={`feat-${feat?.text?.slice(0, 20)}`} className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-500/15 flex items-center justify-center shrink-0 mt-0.5">
                  <feat.icon size={16} className="text-amber-400" />
                </div>
                <span className="text-white/75 text-sm leading-relaxed">{feat?.text}</span>
              </li>
            ))}
          </ul>

          {/* Mock project cards */}
          <div className="space-y-2.5">
            <p className="text-white/35 text-xs font-medium uppercase tracking-widest mb-3">
              Active Projects
            </p>
            {MOCK_PROJECTS?.map((proj) => (
              <div
                key={`proj-${proj?.name}`}
                className="flex items-center gap-3 bg-white/6 rounded-xl px-4 py-3 border border-white/8 backdrop-blur-sm"
              >
                <div className={`w-2 h-2 rounded-full ${proj?.color} shrink-0`} />
                <span className="text-white/80 text-sm font-medium flex-1">{proj?.name}</span>
                <span className="text-white/40 text-xs">{proj?.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Footer */}
      <div className="relative z-10 px-10 pb-8">
        <p className="text-white/25 text-xs">
          Trusted by 1,200+ agencies worldwide · SOC 2 Type II Certified
        </p>
      </div>
    </div>
  );
}
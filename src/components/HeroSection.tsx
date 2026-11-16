import { ArrowRight, Headphones } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { SmartCaseSimulator } from './SmartCaseSimulator';

interface HeroSectionProps {
  onOpenAuth: (mode?: 'login' | 'register') => void;
  onOpenDashboard: () => void;
}

const HERO_KPIS = [
  {
    label: 'Hybrid Driver System',
    value: '10.2 mm + BA',
    detail: 'Dynamic driver + 5.1 × 2.8 mm balanced armature',
  },
  {
    label: 'Max Music Playtime',
    value: 'Up to 11 hrs',
    detail: 'Bluetooth on, ANC off · 10 min charge = 3 hrs',
  },
  {
    label: 'Wireless Architecture',
    value: 'Bluetooth 5.3',
    detail: 'Dual-radio earbuds & case · Multipoint (2 devices)',
  },
  {
    label: 'Acoustic Bandwidth',
    value: '20 Hz – 40 kHz',
    detail: 'IP55 rated · 5.6 g per earbud · 104 dB SPL',
  },
];

export function HeroSection({ onOpenAuth, onOpenDashboard }: HeroSectionProps) {
  const { user } = useAuth();

  return (
    <section id="overview" className="relative border-b border-white/10 bg-[#0A0A0B]">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left Copy Column */}
          <div className="lg:col-span-6 space-y-6">
            <p className="text-xs font-medium tracking-wider text-zinc-400 uppercase">
              Harman Acoustic Flagship · Model Tour Pro 3 &amp; 3C
            </p>

            <h1
              className="font-display font-extrabold tracking-tight text-white leading-[1.06]"
              style={{ fontSize: 'clamp(2.25rem, 4vw, 3.75rem)', textWrap: 'balance' }}
            >
              Precision sound, controlled right from the case.
            </h1>

            <p className="max-w-xl text-base leading-relaxed text-zinc-300">
              Engineered with a hybrid 10.2 mm dynamic driver and balanced armature, True Adaptive
              ANC, and a touchscreen Smart Charging Case™ that doubles as a universal wireless audio
              transmitter for flights, laptops, and TVs.
            </p>

            <div className="flex flex-wrap items-center gap-5 pt-2">
              <button
                type="button"
                onClick={() => (user ? onOpenDashboard() : onOpenAuth('register'))}
                className="inline-flex items-center gap-2 rounded-lg bg-[#FF5722] px-6 py-3 text-sm font-semibold text-white transition-colors duration-150 hover:bg-[#e64a19] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white cursor-pointer whitespace-nowrap shrink-0 min-h-[44px]"
              >
                <Headphones className="h-4 w-4" />
                <span>{user ? 'Open Audio Studio' : 'Create Profile & Customize'}</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <a
                href="#specs"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-zinc-300 hover:text-white transition-colors py-2 whitespace-nowrap shrink-0"
              >
                <span>View Full Tech Specs</span>
                <ArrowRight className="h-3.5 w-3.5 text-[#FF5722]" />
              </a>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-zinc-400">
              <span>Google Fast Pair (Android 6+)</span>
              <span aria-hidden="true">·</span>
              <span>Microsoft Swift Pair</span>
              <span aria-hidden="true">·</span>
              <span>Auracast™ Ready</span>
            </div>
          </div>

          {/* Right Interactive Hardware Column */}
          <div className="lg:col-span-6">
            <SmartCaseSimulator />
          </div>
        </div>

        {/* Full-Width 4-Column KPI Strip Below Hero Split */}
        <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {HERO_KPIS.map((kpi) => (
            <div key={kpi.label} className="bg-[#141416] p-5">
              <p className="text-xs font-medium text-zinc-400">{kpi.label}</p>
              <p className="mt-1.5 font-mono text-xl font-semibold text-white tabular-nums">
                {kpi.value}
              </p>
              <p className="mt-1 text-xs text-zinc-400 leading-relaxed">{kpi.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

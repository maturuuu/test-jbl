import {
  BatteryCharging,
  Bluetooth,
  Cable,
  Laptop,
  Plane,
  Radio,
  ShieldCheck,
  Smartphone,
  Tablet,
  Tv,
  Volume2,
} from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

type TransmitterSource = 'aux' | 'usbc' | 'usba';

const TRANSMITTER_SOURCES: Record<
  TransmitterSource,
  { label: string; cable: string; targets: string[]; note: string }
> = {
  aux: {
    label: '3.5 mm Aux',
    cable: 'USB-C to 3.5 mm Aux Cable',
    targets: ['In-flight entertainment*', 'Treadmill console'],
    note: '*Some in-flight entertainment systems may require a conversion adapter (not included).',
  },
  usbc: {
    label: 'USB Type-C',
    cable: 'USB-C to USB-C Cable',
    targets: ['Tablet', 'Laptop'],
    note: 'Direct digital audio transmission via the TOUR PRO 3C charging case.',
  },
  usba: {
    label: 'USB Type-A',
    cable: 'USB-C to USB-A Cable',
    targets: ['TV', 'PC / MAC'],
    note: 'Plug-and-play desktop and television audio bridging without extra dongles.',
  },
};

export function FeaturesBento() {
  const { preferences, updatePreferences } = useAuth();
  const [txSource, setTxSource] = useState<TransmitterSource>('aux');
  const [earbudMode, setEarbudMode] = useState<'stereo' | 'mono'>('stereo');

  const activeTx = TRANSMITTER_SOURCES[txSource];

  return (
    <section id="features" className="border-b border-white/10 bg-[#0A0A0B] py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl space-y-3">
          <p className="text-xs font-medium tracking-wider text-[#FF5722] uppercase">
            01. Core Capabilities
          </p>
          <h2
            className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl"
            style={{ textWrap: 'balance' }}
          >
            Built around the Smart Charging Case and hybrid acoustics.
          </h2>
          <p className="text-base text-zinc-400 leading-relaxed">
            Every system inside Tour Pro 3 reduces friction between devices, environments, and
            studio-grade listening.
          </p>
        </div>

        {/* Asymmetric Bento Grid */}
        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Feature 1 (col-span-2): Smart Charging Case & Audio Transmitter */}
          <article className="lg:col-span-2 rounded-2xl border border-white/10 bg-[#141416] p-6 sm:p-8 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-4">
                <span className="text-xs font-medium text-zinc-400">
                  Smart Charging Case™ · Model TOUR PRO 3C
                </span>
                <Radio className="h-5 w-5 text-[#FF5722] shrink-0" />
              </div>

              <h3 className="font-display text-2xl font-bold text-white">
                Touchscreen Case &amp; Universal Audio Transmitter
              </h3>

              <p className="text-sm leading-relaxed text-zinc-300 max-w-2xl">
                Control playback, volume, Ambient Sound, Equalizer presets, Spatial Sound, and lock
                screen wallpapers directly on the case—no phone required. Plug the case into any
                wired audio port via Aux, USB-C, or USB-A to transmit wirelessly to your earbuds.
              </p>
            </div>

            {/* Interactive Audio Transmitter Routing Diagram */}
            <div className="mt-8 pt-6 border-t border-white/10">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <span className="text-xs font-medium text-zinc-400">
                  Interactive Transmitter Cable Routing
                </span>
                <div className="inline-flex rounded-lg border border-white/10 bg-[#0A0A0B] p-1">
                  {(['aux', 'usbc', 'usba'] as const).map((key) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setTxSource(key)}
                      className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                        txSource === key
                          ? 'bg-[#FF5722] text-white'
                          : 'text-zinc-400 hover:text-white'
                      }`}
                    >
                      {TRANSMITTER_SOURCES[key].label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 items-center rounded-xl border border-white/10 bg-[#0A0A0B] p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#1C1C20] text-[#FF5722]">
                    <Cable className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-white">{activeTx.label}</p>
                    <p className="text-[11px] text-zinc-400">{activeTx.cable}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-zinc-400 sm:justify-center">
                  <span className="font-mono text-[#FF5722]">BT 5.3</span>
                  <span aria-hidden="true">→</span>
                  <span className="text-zinc-200 font-medium">TOUR PRO 3C Case</span>
                </div>

                <div className="flex flex-wrap items-center gap-3 sm:justify-end">
                  {txSource === 'aux' && (
                    <>
                      <span className="inline-flex items-center gap-1.5 text-xs text-zinc-200">
                        <Plane className="h-3.5 w-3.5 text-[#FF5722]" /> In-flight
                      </span>
                      <span className="text-zinc-600">·</span>
                      <span className="text-xs text-zinc-200">Treadmill</span>
                    </>
                  )}
                  {txSource === 'usbc' && (
                    <>
                      <span className="inline-flex items-center gap-1.5 text-xs text-zinc-200">
                        <Tablet className="h-3.5 w-3.5 text-[#FF5722]" /> Tablet
                      </span>
                      <span className="text-zinc-600">·</span>
                      <span className="inline-flex items-center gap-1.5 text-xs text-zinc-200">
                        <Laptop className="h-3.5 w-3.5 text-[#FF5722]" /> Laptop
                      </span>
                    </>
                  )}
                  {txSource === 'usba' && (
                    <>
                      <span className="inline-flex items-center gap-1.5 text-xs text-zinc-200">
                        <Tv className="h-3.5 w-3.5 text-[#FF5722]" /> TV
                      </span>
                      <span className="text-zinc-600">·</span>
                      <span className="text-xs text-zinc-200">PC / MAC</span>
                    </>
                  )}
                </div>
              </div>

              <p className="mt-2.5 text-[11px] text-zinc-500">{activeTx.note}</p>
            </div>
          </article>

          {/* Feature 2 (col-span-1): True Adaptive ANC & Silent Now */}
          <article className="rounded-2xl border border-white/10 bg-[#141416] p-6 sm:p-8 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-4">
                <span className="text-xs font-medium text-zinc-400">
                  Noise Control &amp; Focus
                </span>
                <ShieldCheck className="h-5 w-5 text-[#FF5722] shrink-0" />
              </div>

              <h3 className="font-display text-2xl font-bold text-white">True Adaptive ANC</h3>

              <p className="text-sm leading-relaxed text-zinc-300">
                Real-time acoustic calibration blocks cabin roar and city noise, or switch
                instantly to Ambient Aware and TalkThru with a tap. Need pure quiet without audio?
                Hold 5 seconds for <strong className="text-white">Silent Now</strong> (10 hours ANC
                isolation with Bluetooth off).
              </p>
            </div>

            <div className="mt-6 pt-5 border-t border-white/10 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-400">Active Mode</span>
                <span className="font-mono text-white">
                  {preferences.silentNow
                    ? 'Silent Now (ANC Only)'
                    : preferences.ambientMode === 'anc'
                    ? preferences.trueAdaptiveAnc
                      ? 'True Adaptive ANC'
                      : 'Standard ANC'
                    : preferences.ambientMode === 'ambient_aware'
                    ? 'Ambient Aware'
                    : 'TalkThru'}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-1.5">
                {(
                  [
                    { id: 'anc', label: 'ANC' },
                    { id: 'ambient_aware', label: 'Ambient' },
                    { id: 'talkthru', label: 'TalkThru' },
                  ] as const
                ).map((mode) => (
                  <button
                    key={mode.id}
                    type="button"
                    onClick={() =>
                      updatePreferences({ ambientMode: mode.id, silentNow: false })
                    }
                    className={`rounded-lg py-2 text-xs font-medium transition-colors cursor-pointer ${
                      !preferences.silentNow && preferences.ambientMode === mode.id
                        ? 'bg-[#FF5722] text-white'
                        : 'bg-[#0A0A0B] text-zinc-400 hover:text-white border border-white/10'
                    }`}
                  >
                    {mode.label}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={() => updatePreferences({ silentNow: !preferences.silentNow })}
                className={`w-full rounded-lg border py-2 text-xs font-medium transition-colors cursor-pointer ${
                  preferences.silentNow
                    ? 'border-[#FF5722] bg-[#FF5722]/15 text-white'
                    : 'border-white/10 bg-[#0A0A0B] text-zinc-300 hover:text-white'
                }`}
              >
                {preferences.silentNow ? 'Silent Now: Active (10h ANC)' : 'Test Silent Now (Hold 5s)'}
              </button>
            </div>
          </article>

          {/* Feature 3 (col-span-1): Multipoint Connection (Max 2 Devices) */}
          <article className="rounded-2xl border border-white/10 bg-[#141416] p-6 sm:p-8 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-4">
                <span className="text-xs font-medium text-zinc-400">
                  Dual Connect + Sync
                </span>
                <Bluetooth className="h-5 w-5 text-[#FF5722] shrink-0" />
              </div>

              <h3 className="font-display text-2xl font-bold text-white">
                Multipoint Connection (Max 2 Devices)
              </h3>

              <p className="text-sm leading-relaxed text-zinc-300">
                Stay connected to up to 2 Bluetooth 5.3 sources simultaneously—switch effortlessly
                between a laptop meeting and a smartphone call via{' '}
                <span className="font-mono text-zinc-200">Tap × 1 + Hold (5s)</span>. Supports
                Stereo mode (L+R) or single-earbud Mono mode (L/R).
              </p>
            </div>

            <div className="mt-6 pt-5 border-t border-white/10 space-y-4">
              {/* Visual 2-Device Topology */}
              <div className="flex items-center justify-between rounded-xl border border-white/10 bg-[#0A0A0B] px-4 py-3">
                <div className="flex flex-col items-center gap-1">
                  <Smartphone className="h-4 w-4 text-sky-400" />
                  <span className="text-[11px] text-zinc-300">Phone</span>
                </div>
                <span className="font-mono text-[11px] text-[#FF5722]">← BT 5.3 →</span>
                <div className="rounded-md border border-white/15 bg-[#141416] px-2.5 py-1 text-[11px] font-semibold text-white">
                  {earbudMode === 'stereo' ? 'L + R' : 'L / R Mono'}
                </div>
                <span className="font-mono text-[11px] text-[#FF5722]">← BT 5.3 →</span>
                <div className="flex flex-col items-center gap-1">
                  <Tablet className="h-4 w-4 text-sky-400" />
                  <span className="text-[11px] text-zinc-300">Tablet / PC</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setEarbudMode('stereo')}
                  className={`rounded-lg py-2 text-xs font-medium transition-colors cursor-pointer ${
                    earbudMode === 'stereo'
                      ? 'bg-[#FF5722] text-white'
                      : 'bg-[#0A0A0B] text-zinc-400 hover:text-white border border-white/10'
                  }`}
                >
                  Stereo Mode
                </button>
                <button
                  type="button"
                  onClick={() => setEarbudMode('mono')}
                  className={`rounded-lg py-2 text-xs font-medium transition-colors cursor-pointer ${
                    earbudMode === 'mono'
                      ? 'bg-[#FF5722] text-white'
                      : 'bg-[#0A0A0B] text-zinc-400 hover:text-white border border-white/10'
                  }`}
                >
                  Mono Mode
                </button>
              </div>
            </div>
          </article>

          {/* Feature 4 (col-span-2): Hybrid Dual Drivers + Battery Endurance */}
          <article className="lg:col-span-2 rounded-2xl border border-white/10 bg-[#141416] p-6 sm:p-8 flex flex-col justify-between">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-xs font-medium text-zinc-400">
                  <Volume2 className="h-4 w-4 text-[#FF5722]" />
                  <span>Hybrid Dual-Driver Architecture</span>
                </div>
                <h3 className="font-display text-2xl font-bold text-white">
                  10.2 mm Dynamic + Balanced Armature
                </h3>
                <p className="text-sm leading-relaxed text-zinc-300">
                  Each 5.6 g earbud houses a{' '}
                  <strong className="text-white">10.2 mm / 0.402&quot; dynamic driver</strong> for
                  deep, controlled bass paired with a precision{' '}
                  <strong className="text-white">5.1 mm × 2.8 mm balanced armature</strong>{' '}
                  delivering crisp vocals and upper harmonics up to 40 kHz.
                </p>
                <div className="grid grid-cols-2 gap-3 pt-2 font-mono text-xs tabular-nums">
                  <div className="rounded-lg border border-white/10 bg-[#0A0A0B] p-3">
                    <p className="text-zinc-400 text-[11px]">Frequency Response</p>
                    <p className="text-white font-semibold mt-0.5">20 Hz – 40 kHz</p>
                  </div>
                  <div className="rounded-lg border border-white/10 bg-[#0A0A0B] p-3">
                    <p className="text-zinc-400 text-[11px]">Sensitivity / Impedance</p>
                    <p className="text-white font-semibold mt-0.5">104 dB · 32 Ω</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2 text-xs font-medium text-zinc-400">
                  <BatteryCharging className="h-4 w-4 text-[#FF5722]" />
                  <span>Power &amp; Qi Wireless Charging</span>
                </div>
                <h3 className="font-display text-2xl font-bold text-white">
                  Up to 11 Hours Playtime
                </h3>
                <div className="space-y-3 text-xs">
                  <div>
                    <div className="flex justify-between text-zinc-300 mb-1">
                      <span>BT on, ANC off</span>
                      <span className="font-mono text-white tabular-nums">Up to 11 hrs</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden">
                      <div className="h-full w-full bg-[#FF5722] rounded-full" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-zinc-300 mb-1">
                      <span>BT on, ANC on</span>
                      <span className="font-mono text-white tabular-nums">Up to 8 hrs</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden">
                      <div className="h-full w-[73%] bg-[#FF5722]/80 rounded-full" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-zinc-300 mb-1">
                      <span>BT on, True Adaptive ANC on</span>
                      <span className="font-mono text-white tabular-nums">Up to 7 hrs</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden">
                      <div className="h-full w-[64%] bg-[#FF5722]/65 rounded-full" />
                    </div>
                  </div>
                </div>
                <p className="text-xs text-zinc-400 pt-1">
                  10 min charge = 3 hrs playback · 2 hrs full charge (USB-C or Qi-certified pad) ·
                  850 mAh case + 65 mAh earbuds.
                </p>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

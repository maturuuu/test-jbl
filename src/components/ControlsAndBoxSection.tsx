import { Check, FileText, RotateCcw, Smartphone, Sparkles } from 'lucide-react';
import { useState } from 'react';

type GuideTab = 'controls' | 'box' | 'fit' | 'leds';

export function ControlsAndBoxSection() {
  const [activeTab, setActiveTab] = useState<GuideTab>('controls');

  return (
    <section id="guide" className="border-b border-white/10 bg-[#0E0E11] py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl space-y-3">
            <p className="text-xs font-medium tracking-wider text-[#FF5722] uppercase">
              02. Quick Start &amp; Hardware Guide
            </p>
            <h2
              className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl"
              style={{ textWrap: 'balance' }}
            >
              Everything included, from ear tips to gesture controls.
            </h2>
          </div>

          <a
            href="/assets/aistudio/LS_JBL_Tour_Pro_3_QSG_Multilingual_fab6f60d.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-[#141416] px-4 py-2.5 text-xs font-semibold text-zinc-200 hover:border-[#FF5722] hover:text-white transition-colors whitespace-nowrap shrink-0 self-start md:self-auto"
          >
            <FileText className="h-4 w-4 text-[#FF5722]" />
            <span>Open Official QSG (PDF)</span>
          </a>
        </div>

        {/* Segmented Guide Tabs */}
        <div className="mt-8 flex flex-wrap gap-2 border-b border-white/10 pb-4">
          {(
            [
              { id: 'controls', label: 'Earbud Touch Controls' },
              { id: 'box', label: "What's in the Box" },
              { id: 'fit', label: 'Fit & Smart Automation' },
              { id: 'leds', label: 'LED Behaviors & Reset' },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`rounded-lg px-4 py-2 text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0 min-h-[40px] ${
                activeTab === tab.id
                  ? 'bg-[#FF5722] text-white'
                  : 'bg-[#141416] text-zinc-400 hover:text-white border border-white/10'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="mt-8">
          {activeTab === 'controls' && (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-[#141416] p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-lg font-bold text-white">Left Earbud (L)</h3>
                  <span className="font-mono text-xs text-zinc-400">Ambient &amp; Calls</span>
                </div>
                <dl className="divide-y divide-white/10 text-sm">
                  <div className="flex items-center justify-between py-3">
                    <dt className="text-zinc-400 font-mono text-xs">Tap × 1</dt>
                    <dd className="text-zinc-100 font-medium">ANC / Ambient Aware*</dd>
                  </div>
                  <div className="flex items-center justify-between py-3">
                    <dt className="text-zinc-400 font-mono text-xs">Tap × 2</dt>
                    <dd className="text-zinc-100 font-medium">TalkThru* / Answer or End Call</dd>
                  </div>
                  <div className="flex items-center justify-between py-3">
                    <dt className="text-zinc-400 font-mono text-xs">Hold (2s)</dt>
                    <dd className="text-zinc-100 font-medium">
                      Bixby / Siri® / Others · Mic Mute
                    </dd>
                  </div>
                  <div className="flex items-center justify-between py-3">
                    <dt className="text-zinc-400 font-mono text-xs">Hold (5s)</dt>
                    <dd className="text-zinc-100 font-medium">Silent Now On / Off</dd>
                  </div>
                </dl>
              </div>

              <div className="rounded-2xl border border-white/10 bg-[#141416] p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-lg font-bold text-white">Right Earbud (R)</h3>
                  <span className="font-mono text-xs text-zinc-400">Playback &amp; Calls</span>
                </div>
                <dl className="divide-y divide-white/10 text-sm">
                  <div className="flex items-center justify-between py-3">
                    <dt className="text-zinc-400 font-mono text-xs">Tap × 1</dt>
                    <dd className="text-zinc-100 font-medium">Play / Pause</dd>
                  </div>
                  <div className="flex items-center justify-between py-3">
                    <dt className="text-zinc-400 font-mono text-xs">Tap × 2</dt>
                    <dd className="text-zinc-100 font-medium">Next Track / Answer or End Call</dd>
                  </div>
                  <div className="flex items-center justify-between py-3">
                    <dt className="text-zinc-400 font-mono text-xs">Tap × 3</dt>
                    <dd className="text-zinc-100 font-medium">Previous Track</dd>
                  </div>
                  <div className="flex items-center justify-between py-3">
                    <dt className="text-zinc-400 font-mono text-xs">Hold (2s)</dt>
                    <dd className="text-zinc-100 font-medium">
                      Bixby / Siri® / Others · Mic Mute
                    </dd>
                  </div>
                </dl>
              </div>
              <p className="md:col-span-2 text-xs text-zinc-400">
                *Enable advanced gesture customization by connecting your JBL Tour Pro 3 to the JBL
                Headphones app or customizing preferences in the Audio Studio below.
              </p>
            </div>
          )}

          {activeTab === 'box' && (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  title: 'Smart Charging Case™',
                  spec: 'Model TOUR PRO 3C · 850 mAh',
                  desc: 'Touch display case with built-in Bluetooth 5.3 audio transmitter.',
                },
                {
                  title: 'Tour Pro 3 Earbuds',
                  spec: '5.6 g each · IP55 Rated',
                  desc: 'Hybrid 10.2 mm dynamic driver + balanced armature pair (L & R).',
                },
                {
                  title: '5 Ear Tip Sizes',
                  spec: 'XS / S / M / L / XL',
                  desc: 'Assorted silicone tips for optimal acoustic seal and ANC performance.',
                },
                {
                  title: '3 Original Cables',
                  spec: 'USB-C, USB-A, 3.5 mm Aux',
                  desc: 'USB-C to USB-A charging/data, USB-C to USB-C, and USB-C to 3.5 mm Aux.',
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-white/10 bg-[#141416] p-6 space-y-2.5"
                >
                  <p className="font-mono text-[11px] text-[#FF5722]">{item.spec}</p>
                  <h3 className="font-display text-lg font-bold text-white">{item.title}</h3>
                  <p className="text-sm text-zinc-400 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'fit' && (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-[#141416] p-6 space-y-3">
                <Check className="h-5 w-5 text-[#FF5722]" />
                <h3 className="font-display text-lg font-bold text-white">Check My Best Fit</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  Try XS, S, M, L, or XL ear tips, insert and twist slightly to seat the acoustic
                  nozzle, and run the fit test for maximum passive isolation and bass seal.
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-[#141416] p-6 space-y-3">
                <Smartphone className="h-5 w-5 text-[#FF5722]" />
                <h3 className="font-display text-lg font-bold text-white">
                  Auto Play / Pause &amp; Calls
                </h3>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  Ear detection automatically pauses music when you remove an earbud, resumes when
                  reinserted, and can auto-pick up incoming calls when placed on your ear.
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-[#141416] p-6 space-y-3">
                <Sparkles className="h-5 w-5 text-[#FF5722]" />
                <h3 className="font-display text-lg font-bold text-white">
                  Smart Talk &amp; VoiceAware
                </h3>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  Smart Talk pauses playback and activates TalkThru for 5s, 15s, or 20s when it
                  hears your voice, while VoiceAware tunes how much of your own voice you hear on
                  calls.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'leds' && (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-[#141416] p-6 space-y-4">
                <h3 className="font-display text-lg font-bold text-white">
                  LED Status Indicators
                </h3>
                <dl className="divide-y divide-white/10 text-sm">
                  <div className="flex items-center justify-between py-2.5">
                    <dt className="text-zinc-300">Fast blinking blue</dt>
                    <dd className="text-zinc-400">Bluetooth connecting</dd>
                  </div>
                  <div className="flex items-center justify-between py-2.5">
                    <dt className="text-zinc-300">Solid blue</dt>
                    <dd className="text-zinc-400">Bluetooth connected</dd>
                  </div>
                  <div className="flex items-center justify-between py-2.5">
                    <dt className="text-zinc-300">Slow blinking blue</dt>
                    <dd className="text-zinc-400">Bluetooth not connected</dd>
                  </div>
                  <div className="flex items-center justify-between py-2.5">
                    <dt className="text-zinc-300">Blinking red (case)</dt>
                    <dd className="text-zinc-400">Low battery</dd>
                  </div>
                  <div className="flex items-center justify-between py-2.5">
                    <dt className="text-zinc-300">Solid red → Off (case)</dt>
                    <dd className="text-zinc-400">Charging → Fully charged</dd>
                  </div>
                </dl>
              </div>

              <div className="rounded-2xl border border-white/10 bg-[#141416] p-6 space-y-4">
                <div className="flex items-center gap-2">
                  <RotateCcw className="h-4 w-4 text-[#FF5722]" />
                  <h3 className="font-display text-lg font-bold text-white">Manual Setup</h3>
                </div>
                <dl className="divide-y divide-white/10 text-sm">
                  <div className="flex items-center justify-between py-3">
                    <dt className="text-zinc-300">First-Time Wake</dt>
                    <dd className="font-mono text-xs text-zinc-400">
                      Hold case button (2s) or USB-C (2s)
                    </dd>
                  </div>
                  <div className="flex items-center justify-between py-3">
                    <dt className="text-zinc-300">Factory Reset (Earbuds)</dt>
                    <dd className="font-mono text-xs text-zinc-400">Tap × 2 + Hold (5s)</dd>
                  </div>
                  <div className="flex items-center justify-between py-3">
                    <dt className="text-zinc-300">Restart (Charging Case)</dt>
                    <dd className="font-mono text-xs text-zinc-400">Hold case button (10s)</dd>
                  </div>
                  <div className="flex items-center justify-between py-3">
                    <dt className="text-zinc-300">Battery Care</dt>
                    <dd className="text-xs text-zinc-400">
                      Fully charge at least once every 3 months
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

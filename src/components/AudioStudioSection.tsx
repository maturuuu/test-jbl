import {
  CheckCircle2,
  LogOut,
  RotateCcw,
  Save,
  Sliders,
  Sparkles,
  UserCheck,
} from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  CASE_SHORTCUT_LABELS,
  CASE_WALLPAPERS,
  CaseShortcutKey,
  EQ_FREQUENCIES,
  EQ_PRESETS,
  EqPresetId,
  SmartTalkDuration,
  SpatialSoundMode,
} from '../types/tourPro3';

interface AudioStudioSectionProps {
  onOpenAuth: (mode?: 'login' | 'register') => void;
}

type StudioTab = 'equalizer' | 'spatial' | 'case';

export function AudioStudioSection({ onOpenAuth }: AudioStudioSectionProps) {
  const {
    user,
    preferences,
    savedNotice,
    logout,
    updatePreferences,
    saveCurrentPreferences,
    resetPreferences,
  } = useAuth();
  const [studioTab, setStudioTab] = useState<StudioTab>('equalizer');

  const handleSelectPreset = (presetId: Exclude<EqPresetId, 'custom'>) => {
    updatePreferences({
      eqEnabled: true,
      eqPreset: presetId,
      eqBands: [...EQ_PRESETS[presetId].bands],
    });
  };

  const handleBandChange = (index: number, value: number) => {
    const nextBands = [...preferences.eqBands];
    nextBands[index] = value;
    updatePreferences({
      eqEnabled: true,
      eqPreset: 'custom',
      eqBands: nextBands,
    });
  };

  const toggleShortcut = (key: CaseShortcutKey) => {
    const exists = preferences.caseShortcuts.includes(key);
    const next = exists
      ? preferences.caseShortcuts.filter((k) => k !== key)
      : [...preferences.caseShortcuts, key];
    updatePreferences({ caseShortcuts: next });
  };

  // Build smooth SVG polyline points for the 10-band Equalizer curve
  const svgPoints = preferences.eqBands
    .map((db, idx) => {
      const x = 18 + idx * 42;
      const y = 60 - db * 3.5; // -12dB -> 102, 0dB -> 60, +12dB -> 18
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <section id="studio" className="border-b border-white/10 bg-[#0E0E11] py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Top Studio Header */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl space-y-3">
            <p className="text-xs font-medium tracking-wider text-[#FF5722] uppercase">
              04. Personalized Device Studio
            </p>
            <h2
              className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl"
              style={{ textWrap: 'balance' }}
            >
              Tune your Equalizer, Spatial Sound, and Case shortcuts.
            </h2>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Sign in or register a free account to bind custom 10-band EQ curves, VoiceAware
              sidetone, and Smart Charging Case™ preferences to your Tour Pro 3 profile.
            </p>
          </div>

          {/* Account Status Card */}
          <div className="rounded-xl border border-white/10 bg-[#141416] p-4 sm:min-w-[320px]">
            {user ? (
              <div className="flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 text-xs font-semibold text-white">
                    <UserCheck className="h-4 w-4 text-[#FF5722] shrink-0" />
                    <span className="truncate">{user.name}</span>
                  </div>
                  <p className="mt-0.5 truncate font-mono text-[11px] text-zinc-400">
                    {user.email} · {user.deviceSerial}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={logout}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-[#0A0A0B] px-3 py-2 text-xs font-medium text-zinc-300 hover:text-white transition-colors cursor-pointer whitespace-nowrap shrink-0"
                >
                  <LogOut className="h-3.5 w-3.5" />
                  <span>Sign Out</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold text-white">Guest Preview Mode</p>
                  <p className="text-[11px] text-zinc-400">
                    Create an account to save device profiles.
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => onOpenAuth('login')}
                    className="rounded-lg border border-white/15 bg-[#0A0A0B] px-3 py-2 text-xs font-medium text-zinc-200 hover:text-white transition-colors cursor-pointer"
                  >
                    Sign In
                  </button>
                  <button
                    type="button"
                    onClick={() => onOpenAuth('register')}
                    className="rounded-lg bg-[#FF5722] px-3 py-2 text-xs font-semibold text-white hover:bg-[#e64a19] transition-colors cursor-pointer"
                  >
                    Register
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Interactive Dashboard Shell */}
        <div className="mt-10 rounded-2xl border border-white/10 bg-[#141416] p-5 sm:p-8">
          {/* Studio Sub-Navigation + Save/Reset Bar */}
          <div className="flex flex-col gap-4 border-b border-white/10 pb-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap gap-2">
              {(
                [
                  { id: 'equalizer', label: '10-Band Equalizer' },
                  { id: 'spatial', label: 'Spatial, Voice & Automation' },
                  { id: 'case', label: 'Smart Charging Case™' },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setStudioTab(tab.id)}
                  className={`rounded-lg px-4 py-2 text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0 min-h-[40px] ${
                    studioTab === tab.id
                      ? 'bg-[#FF5722] text-white'
                      : 'bg-[#0A0A0B] text-zinc-400 hover:text-white border border-white/10'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {savedNotice && (
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-400">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>{savedNotice}</span>
                </span>
              )}

              <button
                type="button"
                onClick={resetPreferences}
                className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-[#0A0A0B] px-3.5 py-2 text-xs font-medium text-zinc-300 hover:text-white transition-colors cursor-pointer min-h-[40px]"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Reset</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  if (!user) {
                    onOpenAuth('register');
                  } else {
                    saveCurrentPreferences();
                  }
                }}
                className="inline-flex items-center gap-1.5 rounded-lg bg-[#FF5722] px-4 py-2 text-xs font-semibold text-white hover:bg-[#e64a19] transition-colors cursor-pointer min-h-[40px]"
              >
                <Save className="h-3.5 w-3.5" />
                <span>{user ? 'Save Preferences' : 'Save to Account'}</span>
              </button>
            </div>
          </div>

          {/* Tab 1: 10-Band Equalizer */}
          {studioTab === 'equalizer' && (
            <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12">
              {/* EQ Curve & Sliders */}
              <div className="lg:col-span-7 space-y-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sliders className="h-4 w-4 text-[#FF5722]" />
                    <h3 className="font-display text-lg font-bold text-white">
                      Acoustic Response Curve
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => updatePreferences({ eqEnabled: !preferences.eqEnabled })}
                    className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors cursor-pointer ${
                      preferences.eqEnabled
                        ? 'bg-[#FF5722]/20 text-[#FF5722] border border-[#FF5722]/40'
                        : 'bg-white/5 text-zinc-400 border border-white/10'
                    }`}
                  >
                    {preferences.eqEnabled ? 'EQ Active' : 'EQ Bypassed'}
                  </button>
                </div>

                {/* Frequency Curve SVG */}
                <div className="rounded-xl border border-white/10 bg-[#0A0A0B] p-4">
                  <svg
                    viewBox="0 0 414 120"
                    className="w-full h-32 overflow-visible"
                    aria-label="10-band equalizer curve"
                  >
                    {/* Reference Grid Lines */}
                    <line x1="10" y1="20" x2="404" y2="20" stroke="rgba(255,255,255,0.06)" />
                    <line
                      x1="10"
                      y1="60"
                      x2="404"
                      y2="60"
                      stroke="rgba(255,255,255,0.14)"
                      strokeDasharray="3 3"
                    />
                    <line x1="10" y1="100" x2="404" y2="100" stroke="rgba(255,255,255,0.06)" />

                    {/* EQ Curve */}
                    <polyline
                      fill="none"
                      stroke={preferences.eqEnabled ? '#FF5722' : '#52525b'}
                      strokeWidth="2.5"
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      points={svgPoints}
                    />

                    {/* Band Nodes */}
                    {preferences.eqBands.map((db, idx) => {
                      const cx = 18 + idx * 42;
                      const cy = 60 - db * 3.5;
                      return (
                        <g key={EQ_FREQUENCIES[idx]}>
                          <circle
                            cx={cx}
                            cy={cy}
                            r="4"
                            fill={preferences.eqEnabled ? '#FF5722' : '#71717a'}
                            stroke="#0A0A0B"
                            strokeWidth="1.5"
                          />
                        </g>
                      );
                    })}
                  </svg>

                  {/* 10 Interactive Vertical Range Controls */}
                  <div className="mt-4 grid grid-cols-5 gap-3 sm:grid-cols-10">
                    {EQ_FREQUENCIES.map((freq, idx) => (
                      <div key={freq} className="flex flex-col items-center gap-1.5">
                        <span className="font-mono text-[10px] text-zinc-300 tabular-nums">
                          {preferences.eqBands[idx] > 0
                            ? `+${preferences.eqBands[idx]}`
                            : preferences.eqBands[idx]}
                        </span>
                        <input
                          type="range"
                          min={-12}
                          max={12}
                          step={1}
                          value={preferences.eqBands[idx]}
                          onChange={(e) => handleBandChange(idx, Number(e.target.value))}
                          aria-label={`${freq} Hz gain`}
                          className="jbl-slider w-full"
                        />
                        <span className="font-mono text-[10px] text-zinc-500">{freq}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Preset Selector */}
              <div className="lg:col-span-5 space-y-4">
                <h3 className="font-display text-lg font-bold text-white">Signature Presets</h3>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-2">
                  {(Object.keys(EQ_PRESETS) as Exclude<EqPresetId, 'custom'>[]).map((id) => {
                    const preset = EQ_PRESETS[id];
                    const active = preferences.eqPreset === id;
                    return (
                      <button
                        key={id}
                        type="button"
                        onClick={() => handleSelectPreset(id)}
                        className={`rounded-xl border p-3.5 text-left transition-colors cursor-pointer ${
                          active
                            ? 'border-[#FF5722] bg-[#FF5722]/15 text-white'
                            : 'border-white/10 bg-[#0A0A0B] text-zinc-300 hover:border-white/25'
                        }`}
                      >
                        <p className="font-display text-sm font-bold">{preset.label}</p>
                        <p className="mt-1 text-[11px] text-zinc-400 line-clamp-2">
                          {preset.description}
                        </p>
                      </button>
                    );
                  })}
                </div>
                {preferences.eqPreset === 'custom' && (
                  <p className="text-xs text-[#FF5722]">
                    Custom curve active — save preferences to keep this profile.
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Tab 2: Spatial Sound, VoiceAware & Smart Automation */}
          {studioTab === 'spatial' && (
            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Spatial Sound */}
              <div className="rounded-xl border border-white/10 bg-[#0A0A0B] p-6 space-y-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-[#FF5722]" />
                    <h3 className="font-display text-lg font-bold text-white">JBL Spatial Sound</h3>
                  </div>
                  <span className="font-mono text-xs text-zinc-400 uppercase">
                    {preferences.spatialSound}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                  {(
                    [
                      { id: 'off', label: 'Off' },
                      { id: 'music', label: 'Music' },
                      { id: 'movie', label: 'Movie' },
                      { id: 'gaming', label: 'Gaming' },
                    ] as { id: SpatialSoundMode; label: string }[]
                  ).map((mode) => (
                    <button
                      key={mode.id}
                      type="button"
                      onClick={() => updatePreferences({ spatialSound: mode.id })}
                      className={`rounded-lg py-2.5 text-xs font-semibold transition-colors cursor-pointer ${
                        preferences.spatialSound === mode.id
                          ? 'bg-[#FF5722] text-white'
                          : 'bg-[#141416] text-zinc-400 hover:text-white border border-white/10'
                      }`}
                    >
                      {mode.label}
                    </button>
                  ))}
                </div>

                <div className="space-y-3 pt-2 border-t border-white/10">
                  <label className="flex items-center justify-between text-sm text-zinc-200 cursor-pointer">
                    <span>Head Tracking (Spatial Audio)</span>
                    <input
                      type="checkbox"
                      checked={preferences.headTracking}
                      onChange={(e) => updatePreferences({ headTracking: e.target.checked })}
                      className="h-4 w-4 accent-[#FF5722]"
                    />
                  </label>
                  <label className="flex items-center justify-between text-sm text-zinc-200 cursor-pointer">
                    <span>Sound Level Optimizer</span>
                    <input
                      type="checkbox"
                      checked={preferences.soundLevelOptimizer}
                      onChange={(e) =>
                        updatePreferences({ soundLevelOptimizer: e.target.checked })
                      }
                      className="h-4 w-4 accent-[#FF5722]"
                    />
                  </label>
                </div>
              </div>

              {/* VoiceAware & Smart Talk */}
              <div className="rounded-xl border border-white/10 bg-[#0A0A0B] p-6 space-y-5">
                <h3 className="font-display text-lg font-bold text-white">
                  VoiceAware &amp; Smart Automation
                </h3>

                <div className="space-y-2.5">
                  <div className="flex items-center justify-between text-xs text-zinc-300">
                    <span>VoiceAware Sidetone</span>
                    <span className="font-mono uppercase text-[#FF5722]">
                      {preferences.voiceAwareEnabled ? preferences.voiceAwareLevel : 'Off'}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {(['low', 'mid', 'high'] as const).map((lvl) => (
                      <button
                        key={lvl}
                        type="button"
                        onClick={() =>
                          updatePreferences({ voiceAwareEnabled: true, voiceAwareLevel: lvl })
                        }
                        className={`rounded-lg py-2 text-xs font-medium capitalize transition-colors cursor-pointer ${
                          preferences.voiceAwareEnabled && preferences.voiceAwareLevel === lvl
                            ? 'bg-[#FF5722] text-white'
                            : 'bg-[#141416] text-zinc-400 hover:text-white border border-white/10'
                        }`}
                      >
                        {lvl}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2.5 pt-2 border-t border-white/10">
                  <div className="flex items-center justify-between text-xs text-zinc-300">
                    <span>Smart Talk Auto-Pause Timer</span>
                    <span className="font-mono text-[#FF5722]">
                      {preferences.smartTalkEnabled ? `${preferences.smartTalkDuration}s` : 'Off'}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {([5, 15, 20] as SmartTalkDuration[]).map((sec) => (
                      <button
                        key={sec}
                        type="button"
                        onClick={() =>
                          updatePreferences({ smartTalkEnabled: true, smartTalkDuration: sec })
                        }
                        className={`rounded-lg py-2 text-xs font-mono transition-colors cursor-pointer ${
                          preferences.smartTalkEnabled && preferences.smartTalkDuration === sec
                            ? 'bg-[#FF5722] text-white'
                            : 'bg-[#141416] text-zinc-400 hover:text-white border border-white/10'
                        }`}
                      >
                        {sec}s
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3 pt-2 border-t border-white/10 text-sm">
                  <label className="flex items-center justify-between text-zinc-200 cursor-pointer">
                    <span>Auto Play &amp; Pause</span>
                    <input
                      type="checkbox"
                      checked={preferences.autoPlayPause}
                      onChange={(e) => updatePreferences({ autoPlayPause: e.target.checked })}
                      className="h-4 w-4 accent-[#FF5722]"
                    />
                  </label>
                  <label className="flex items-center justify-between text-zinc-200 cursor-pointer">
                    <span>Auto Pick Up Call</span>
                    <input
                      type="checkbox"
                      checked={preferences.autoPickUpCall}
                      onChange={(e) => updatePreferences({ autoPickUpCall: e.target.checked })}
                      className="h-4 w-4 accent-[#FF5722]"
                    />
                  </label>
                  <label className="flex items-center justify-between text-zinc-200 cursor-pointer">
                    <span>Private Call Mode</span>
                    <input
                      type="checkbox"
                      checked={preferences.privateCallMode}
                      onChange={(e) => updatePreferences({ privateCallMode: e.target.checked })}
                      className="h-4 w-4 accent-[#FF5722]"
                    />
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Smart Charging Case Settings */}
          {studioTab === 'case' && (
            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="rounded-xl border border-white/10 bg-[#0A0A0B] p-6 space-y-6">
                <h3 className="font-display text-lg font-bold text-white">
                  Display &amp; Lock Screen Wallpaper
                </h3>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-zinc-300">
                    <span>Case Screen Brightness</span>
                    <span className="font-mono text-[#FF5722] tabular-nums">
                      {preferences.caseBrightness}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min={30}
                    max={100}
                    step={5}
                    value={preferences.caseBrightness}
                    onChange={(e) =>
                      updatePreferences({ caseBrightness: Number(e.target.value) })
                    }
                    aria-label="Smart Charging Case display brightness"
                    className="jbl-slider w-full"
                  />
                  <div className="flex justify-between text-[11px] text-zinc-500">
                    <span>Low</span>
                    <span>Mid</span>
                    <span>High</span>
                  </div>
                </div>

                <div className="space-y-2.5">
                  <p className="text-xs font-medium text-zinc-300">Lock Screen Wallpaper</p>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {CASE_WALLPAPERS.map((wp) => {
                      const active = preferences.caseWallpaper === wp.id;
                      return (
                        <button
                          key={wp.id}
                          type="button"
                          onClick={() => updatePreferences({ caseWallpaper: wp.id })}
                          className={`rounded-xl border p-2 text-left transition-colors cursor-pointer ${
                            active
                              ? 'border-[#FF5722] bg-white/5'
                              : 'border-white/10 hover:border-white/25'
                          }`}
                        >
                          <div
                            className="h-12 w-full rounded-lg border border-white/10"
                            style={{ backgroundImage: wp.gradient }}
                          />
                          <p className="mt-1.5 truncate text-[11px] font-medium text-zinc-200">
                            {wp.label}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-3 pt-2 border-t border-white/10 text-sm">
                  <label className="flex items-center justify-between text-zinc-200 cursor-pointer">
                    <span>Message Notification</span>
                    <input
                      type="checkbox"
                      checked={preferences.messageNotification}
                      onChange={(e) =>
                        updatePreferences({ messageNotification: e.target.checked })
                      }
                      className="h-4 w-4 accent-[#FF5722]"
                    />
                  </label>
                  <label className="flex items-center justify-between text-zinc-200 cursor-pointer">
                    <span>Message Preview on Case</span>
                    <input
                      type="checkbox"
                      checked={preferences.messagePreview}
                      onChange={(e) => updatePreferences({ messagePreview: e.target.checked })}
                      className="h-4 w-4 accent-[#FF5722]"
                    />
                  </label>
                </div>
              </div>

              {/* Feature Shortcuts */}
              <div className="rounded-xl border border-white/10 bg-[#0A0A0B] p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-lg font-bold text-white">Feature Shortcuts</h3>
                  <span className="font-mono text-xs text-zinc-400 tabular-nums">
                    {preferences.caseShortcuts.length} / {CASE_SHORTCUT_LABELS.length} active
                  </span>
                </div>
                <p className="text-xs text-zinc-400">
                  Select which controls appear on your TOUR PRO 3C Smart Charging Case™ swipe deck.
                </p>

                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {CASE_SHORTCUT_LABELS.map((item) => {
                    const enabled = preferences.caseShortcuts.includes(item.key);
                    return (
                      <label
                        key={item.key}
                        className="flex items-center justify-between rounded-lg border border-white/10 bg-[#141416] px-3 py-2.5 text-xs text-zinc-200 cursor-pointer hover:border-white/25"
                      >
                        <span>{item.label}</span>
                        <input
                          type="checkbox"
                          checked={enabled}
                          onChange={() => toggleShortcut(item.key)}
                          className="h-4 w-4 accent-[#FF5722]"
                        />
                      </label>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

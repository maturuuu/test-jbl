import {
  ChevronLeft,
  ChevronRight,
  Lock,
  Pause,
  Play,
  SkipBack,
  SkipForward,
  Unlock,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  AmbientControlMode,
  CASE_WALLPAPERS,
  EQ_PRESETS,
  EqPresetId,
  SpatialSoundMode,
} from '../types/tourPro3';

type ScreenId = 'lock' | 'media' | 'volume' | 'ambient' | 'eq' | 'spatial';

const SCREENS: { id: ScreenId; title: string }[] = [
  { id: 'lock', title: 'Lock Screen' },
  { id: 'media', title: 'Media Control' },
  { id: 'volume', title: 'Volume' },
  { id: 'ambient', title: 'Ambient Sound' },
  { id: 'eq', title: 'Equalizer' },
  { id: 'spatial', title: 'Spatial Sound' },
];

const EQ_ORDER: Exclude<EqPresetId, 'custom'>[] = [
  'studio',
  'jazz',
  'vocal',
  'bass',
  'club',
  'extreme_bass',
];

const SPATIAL_MODES: { id: SpatialSoundMode; label: string }[] = [
  { id: 'music', label: 'Music' },
  { id: 'movie', label: 'Movie' },
  { id: 'gaming', label: 'Gaming' },
  { id: 'off', label: 'Off' },
];

export function SmartCaseSimulator() {
  const { preferences, updatePreferences } = useAuth();
  const [screenIndex, setScreenIndex] = useState(3); // Start on Ambient Sound / live control
  const [isLocked, setIsLocked] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [trackIndex, setTrackIndex] = useState(0);

  const tracks = [
    { title: 'Passover', artist: 'Joy Division · Closer' },
    { title: 'Harmonic Drift', artist: 'Harman Reference · 24-bit' },
    { title: 'Night Commute', artist: 'Acoustic Session · Studio' },
  ];

  const currentScreen = SCREENS[screenIndex];
  const wallpaper =
    CASE_WALLPAPERS.find((w) => w.id === preferences.caseWallpaper) ?? CASE_WALLPAPERS[0];

  const prevScreen = () => {
    if (isLocked) return;
    setScreenIndex((i) => (i - 1 + SCREENS.length) % SCREENS.length);
  };

  const nextScreen = () => {
    if (isLocked) return;
    setScreenIndex((i) => (i + 1) % SCREENS.length);
  };

  const cycleEq = (dir: -1 | 1) => {
    const currentIdx = EQ_ORDER.indexOf(
      preferences.eqPreset === 'custom' ? 'studio' : preferences.eqPreset
    );
    const nextIdx = (currentIdx + dir + EQ_ORDER.length) % EQ_ORDER.length;
    const nextPreset = EQ_ORDER[nextIdx];
    updatePreferences({
      eqEnabled: true,
      eqPreset: nextPreset,
      eqBands: [...EQ_PRESETS[nextPreset].bands],
    });
  };

  const setAmbientMode = (mode: AmbientControlMode) => {
    updatePreferences({
      ambientMode: mode,
      silentNow: false,
    });
  };

  const brightnessOpacity = Math.max(0.45, preferences.caseBrightness / 100);

  return (
    <div className="relative flex flex-col items-center justify-center">
      {/* Subtle hardware plinth */}
      <div className="w-full max-w-[420px] rounded-2xl border border-white/10 bg-[#141416] p-6 sm:p-7">
        {/* Top Hardware Pair Header */}
        <div className="flex items-center justify-between text-xs text-zinc-400 mb-5">
          <span className="font-mono tracking-tight text-zinc-300">
            TOUR PRO 3C · SMART CHARGING CASE™
          </span>
          <button
            type="button"
            onClick={() => {
              setIsLocked((l) => !l);
              if (isLocked) setScreenIndex(1);
            }}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-300 hover:text-white transition-colors cursor-pointer whitespace-nowrap shrink-0"
            title="Simulate Press x 1 hardware button"
          >
            {isLocked ? (
              <>
                <Lock className="h-3.5 w-3.5 text-[#FF5722]" />
                <span>Unlock</span>
              </>
            ) : (
              <>
                <Unlock className="h-3.5 w-3.5 text-zinc-400" />
                <span>Lock</span>
              </>
            )}
          </button>
        </div>

        {/* Physical Case Body */}
        <div className="mx-auto w-full max-w-[300px] rounded-[34px] border border-white/15 bg-gradient-to-b from-[#232328] to-[#111114] p-4 shadow-2xl">
          {/* Lid Seam */}
          <div className="mx-auto mb-3 h-1 w-24 rounded-full bg-white/10" />

          {/* Touch Display Bezel */}
          <div
            className="relative overflow-hidden rounded-2xl border border-white/15 bg-[#050507] aspect-[4/3] p-3 flex flex-col justify-between transition-opacity duration-200"
            style={{
              opacity: brightnessOpacity,
              backgroundImage: isLocked || currentScreen.id === 'lock' ? wallpaper.gradient : undefined,
            }}
          >
            {/* Status Bar (exact QSG page 10/18 telemetry layout) */}
            <div className="flex items-center justify-between font-mono text-[10px] text-zinc-300 tabular-nums">
              <div className="flex items-center gap-1.5">
                <span className="text-[#FF5722] font-semibold">BT</span>
                <span>L 100%</span>
                <span>R 100%</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span>75%</span>
                <span>16:52</span>
              </div>
            </div>

            {/* Screen Body */}
            <div className="flex-1 flex flex-col items-center justify-center py-2">
              {isLocked || currentScreen.id === 'lock' ? (
                <div className="w-full flex flex-col items-center gap-3">
                  <div className="flex items-center justify-center gap-3 font-mono text-[11px] tabular-nums">
                    <div className="flex h-10 w-10 flex-col items-center justify-center rounded-full border border-white/25 bg-black/50 text-white">
                      <span className="text-[9px] text-zinc-400">L</span>
                      <span>100%</span>
                    </div>
                    <div className="flex h-10 w-10 flex-col items-center justify-center rounded-full border border-white/25 bg-black/50 text-white">
                      <span className="text-[9px] text-zinc-400">R</span>
                      <span>100%</span>
                    </div>
                    <div className="flex h-10 w-10 flex-col items-center justify-center rounded-full border border-white/25 bg-black/50 text-white">
                      <span className="text-[9px] text-zinc-400">Case</span>
                      <span>75%</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setIsLocked(false);
                      setScreenIndex(1);
                    }}
                    className="flex items-center gap-2 rounded-full border border-white/20 bg-black/60 px-3 py-1 text-[11px] font-medium text-white hover:border-[#FF5722] transition-colors cursor-pointer"
                  >
                    <ChevronRight className="h-3.5 w-3.5 text-[#FF5722]" />
                    <span>Tap to unlock</span>
                  </button>
                </div>
              ) : currentScreen.id === 'media' ? (
                <div className="w-full text-center space-y-2.5">
                  <div className="px-2">
                    <p className="truncate text-xs font-semibold text-white">
                      {tracks[trackIndex].title}
                    </p>
                    <p className="truncate text-[10px] text-zinc-400">
                      {tracks[trackIndex].artist}
                    </p>
                  </div>
                  <div className="flex items-center justify-center gap-4">
                    <button
                      type="button"
                      onClick={() =>
                        setTrackIndex((i) => (i - 1 + tracks.length) % tracks.length)
                      }
                      aria-label="Previous track"
                      className="rounded-full p-1.5 text-zinc-300 hover:bg-white/10 hover:text-white cursor-pointer"
                    >
                      <SkipBack className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsPlaying((p) => !p)}
                      aria-label={isPlaying ? 'Pause' : 'Play'}
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-black hover:bg-emerald-400 transition-colors cursor-pointer"
                    >
                      {isPlaying ? (
                        <Pause className="h-4 w-4" />
                      ) : (
                        <Play className="h-4 w-4 ml-0.5" />
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => setTrackIndex((i) => (i + 1) % tracks.length)}
                      aria-label="Next track"
                      className="rounded-full p-1.5 text-zinc-300 hover:bg-white/10 hover:text-white cursor-pointer"
                    >
                      <SkipForward className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ) : currentScreen.id === 'volume' ? (
                <div className="w-full flex items-center justify-center gap-4">
                  <button
                    type="button"
                    onClick={() =>
                      updatePreferences({ volume: Math.max(0, preferences.volume - 1) })
                    }
                    aria-label="Decrease volume"
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-zinc-200 hover:bg-white/20 cursor-pointer"
                  >
                    <VolumeX className="h-4 w-4" />
                  </button>
                  <span className="font-mono text-2xl font-bold text-white tabular-nums w-10 text-center">
                    {preferences.volume}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      updatePreferences({ volume: Math.min(16, preferences.volume + 1) })
                    }
                    aria-label="Increase volume"
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-zinc-200 hover:bg-white/20 cursor-pointer"
                  >
                    <Volume2 className="h-4 w-4" />
                  </button>
                </div>
              ) : currentScreen.id === 'ambient' ? (
                <div className="w-full space-y-2.5">
                  <div className="flex items-center justify-between px-1">
                    <span className="text-[10px] font-semibold tracking-wider text-zinc-300 uppercase">
                      Ambient Sound
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        updatePreferences({
                          trueAdaptiveAnc: !preferences.trueAdaptiveAnc,
                        })
                      }
                      className={`h-4 w-7 rounded-full p-0.5 transition-colors cursor-pointer ${
                        preferences.trueAdaptiveAnc ? 'bg-[#FF5722]' : 'bg-zinc-700'
                      }`}
                      aria-label="Toggle True Adaptive ANC"
                    >
                      <div
                        className={`h-3 w-3 rounded-full bg-white transition-transform ${
                          preferences.trueAdaptiveAnc ? 'translate-x-3' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>
                  <div className="grid grid-cols-3 gap-1.5 px-1">
                    {(
                      [
                        { id: 'anc', label: 'ANC' },
                        { id: 'ambient_aware', label: 'Ambient' },
                        { id: 'talkthru', label: 'TalkThru' },
                      ] as const
                    ).map((item) => {
                      const active = preferences.ambientMode === item.id;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setAmbientMode(item.id)}
                          className={`rounded-lg py-2 text-[10px] font-semibold transition-colors cursor-pointer ${
                            active
                              ? 'bg-[#FF5722] text-white'
                              : 'bg-white/10 text-zinc-300 hover:bg-white/15'
                          }`}
                        >
                          {item.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ) : currentScreen.id === 'eq' ? (
                <div className="w-full space-y-2">
                  <div className="flex items-center justify-between px-1">
                    <span className="text-[10px] font-semibold tracking-wider text-zinc-300 uppercase">
                      Equalizer
                    </span>
                    <button
                      type="button"
                      onClick={() => updatePreferences({ eqEnabled: !preferences.eqEnabled })}
                      className={`h-4 w-7 rounded-full p-0.5 transition-colors cursor-pointer ${
                        preferences.eqEnabled ? 'bg-[#FF5722]' : 'bg-zinc-700'
                      }`}
                      aria-label="Toggle Equalizer"
                    >
                      <div
                        className={`h-3 w-3 rounded-full bg-white transition-transform ${
                          preferences.eqEnabled ? 'translate-x-3' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>
                  <div className="flex items-center justify-between px-1">
                    <button
                      type="button"
                      onClick={() => cycleEq(-1)}
                      aria-label="Previous EQ preset"
                      className="rounded-md bg-white/10 p-1.5 text-zinc-200 hover:bg-white/20 cursor-pointer"
                    >
                      <ChevronLeft className="h-3.5 w-3.5" />
                    </button>
                    <span className="font-display text-sm font-bold tracking-wide text-white uppercase">
                      {preferences.eqPreset === 'custom'
                        ? 'Custom'
                        : EQ_PRESETS[preferences.eqPreset].label}
                    </span>
                    <button
                      type="button"
                      onClick={() => cycleEq(1)}
                      aria-label="Next EQ preset"
                      className="rounded-md bg-white/10 p-1.5 text-zinc-200 hover:bg-white/20 cursor-pointer"
                    >
                      <ChevronRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="w-full space-y-2">
                  <div className="text-center text-[10px] font-semibold tracking-wider text-zinc-300 uppercase">
                    Spatial Sound
                  </div>
                  <div className="grid grid-cols-4 gap-1 px-1">
                    {SPATIAL_MODES.map((m) => {
                      const active = preferences.spatialSound === m.id;
                      return (
                        <button
                          key={m.id}
                          type="button"
                          onClick={() => updatePreferences({ spatialSound: m.id })}
                          className={`rounded-md py-1.5 text-[10px] font-medium transition-colors cursor-pointer ${
                            active
                              ? 'bg-[#FF5722] text-white'
                              : 'bg-white/10 text-zinc-300 hover:bg-white/15'
                          }`}
                        >
                          {m.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Pagination Dots */}
            <div className="flex items-center justify-center gap-1 pt-1">
              {SCREENS.map((s, idx) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => {
                    setIsLocked(false);
                    setScreenIndex(idx);
                  }}
                  aria-label={`View ${s.title} screen`}
                  className={`h-1.5 rounded-full transition-all cursor-pointer ${
                    idx === screenIndex && !isLocked
                      ? 'w-3.5 bg-[#FF5722]'
                      : 'w-1.5 bg-white/25 hover:bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Case Front JBL Wordmark */}
          <div className="mt-3 flex items-center justify-between px-1">
            <span className="font-display text-xs font-extrabold tracking-widest text-zinc-300">
              JBL
            </span>
            <span className="font-mono text-[10px] text-zinc-500">
              {isLocked ? 'Locked' : currentScreen.title}
            </span>
          </div>
        </div>

        {/* Interactive Swipe / Button Navigation Bar */}
        <div className="mt-5 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={prevScreen}
            disabled={isLocked}
            className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-[#1C1C20] px-3 py-2 text-xs font-medium text-zinc-200 hover:bg-white/10 disabled:opacity-40 transition-colors cursor-pointer min-h-[40px]"
          >
            <ChevronLeft className="h-3.5 w-3.5" />
            <span>Swipe Left</span>
          </button>

          <button
            type="button"
            onClick={nextScreen}
            disabled={isLocked}
            className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-[#1C1C20] px-3 py-2 text-xs font-medium text-zinc-200 hover:bg-white/10 disabled:opacity-40 transition-colors cursor-pointer min-h-[40px]"
          >
            <span>Swipe Right</span>
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Dual Earbud Pair Status Strip */}
        <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-zinc-400">
          <span>Hybrid Dual Drivers · 10.2 mm + BA</span>
          <span className="font-mono text-zinc-300 tabular-nums">BT 5.3</span>
        </div>
      </div>
    </div>
  );
}

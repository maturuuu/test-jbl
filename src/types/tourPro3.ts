export type EqPresetId =
  | 'studio'
  | 'jazz'
  | 'vocal'
  | 'bass'
  | 'club'
  | 'extreme_bass'
  | 'custom';

export type SpatialSoundMode = 'off' | 'music' | 'movie' | 'gaming';

export type AmbientControlMode = 'anc' | 'ambient_aware' | 'talkthru';

export type SmartTalkDuration = 5 | 15 | 20;

export type CaseWallpaperId = 'skyline' | 'obsidian' | 'amber_wave' | 'aurora';

export type CaseShortcutKey =
  | 'ambient_sound'
  | 'spatial_sound'
  | 'timer'
  | 'voice_aware'
  | 'auto_play_pause'
  | 'notification'
  | 'flashlight'
  | 'silent_now'
  | 'find_my_buds';

export interface DevicePreferences {
  eqEnabled: boolean;
  eqPreset: EqPresetId;
  eqBands: number[]; // 10 bands: 32, 64, 125, 250, 500, 1k, 2k, 4k, 8k, 16k (-12 to +12 dB)
  spatialSound: SpatialSoundMode;
  headTracking: boolean;
  ambientMode: AmbientControlMode;
  trueAdaptiveAnc: boolean;
  silentNow: boolean;
  soundLevelOptimizer: boolean;
  voiceAwareLevel: 'low' | 'mid' | 'high';
  voiceAwareEnabled: boolean;
  privateCallMode: boolean;
  smartTalkEnabled: boolean;
  smartTalkDuration: SmartTalkDuration;
  autoPlayPause: boolean;
  autoPickUpCall: boolean;
  multipointEnabled: boolean;
  caseBrightness: number; // 20 to 100
  caseWallpaper: CaseWallpaperId;
  messageNotification: boolean;
  messagePreview: boolean;
  caseShortcuts: CaseShortcutKey[];
  volume: number; // 0 to 16 (matching QSG p.10 screen)
  updatedAt: string;
}

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  deviceSerial: string;
}

export const EQ_FREQUENCIES = ['32', '64', '125', '250', '500', '1k', '2k', '4k', '8k', '16k'] as const;

export const EQ_PRESETS: Record<
  Exclude<EqPresetId, 'custom'>,
  { label: string; description: string; bands: number[] }
> = {
  studio: {
    label: 'Studio',
    description: 'Reference flat monitoring curve tuned for dual-driver accuracy.',
    bands: [0, 0, 1, 0, 0, 1, 2, 2, 1, 0],
  },
  jazz: {
    label: 'Jazz',
    description: 'Warm upright bass with articulate brass and cymbal shimmer.',
    bands: [3, 2, 0, -3, -4, -1, 3, 4, 3, 2],
  },
  vocal: {
    label: 'Vocal',
    description: 'Focused 1kHz–4kHz presence for podcasts, dialogue, and lead vocals.',
    bands: [-3, -2, -1, 1, 3, 5, 4, 3, 1, 0],
  },
  bass: {
    label: 'Bass',
    description: 'Elevated 10.2 mm dynamic low-end punch without mid-range bleed.',
    bands: [6, 5, 3, 1, 0, 0, 1, 2, 1, 0],
  },
  club: {
    label: 'Club',
    description: 'U-shaped live venue energy for electronic and dance sets.',
    bands: [5, 4, 2, -1, -2, 0, 2, 4, 5, 4],
  },
  extreme_bass: {
    label: 'Extreme Bass',
    description: 'Maximum sub-bass excursion down to 20 Hz.',
    bands: [9, 8, 6, 3, 0, -1, 0, 2, 2, 1],
  },
};

export const CASE_WALLPAPERS: {
  id: CaseWallpaperId;
  label: string;
  gradient: string;
}[] = [
  {
    id: 'skyline',
    label: 'City Dusk',
    gradient: 'linear-gradient(135deg, #2b2118 0%, #7c3a1d 55%, #16181f 100%)',
  },
  {
    id: 'obsidian',
    label: 'Obsidian Matte',
    gradient: 'linear-gradient(145deg, #18181b 0%, #09090b 65%, #27272a 100%)',
  },
  {
    id: 'amber_wave',
    label: 'JBL Vermilion',
    gradient: 'linear-gradient(135deg, #431407 0%, #c2410c 50%, #0a0a0b 100%)',
  },
  {
    id: 'aurora',
    label: 'Nordic Slate',
    gradient: 'linear-gradient(135deg, #1e293b 0%, #0f172a 55%, #334155 100%)',
  },
];

export const CASE_SHORTCUT_LABELS: { key: CaseShortcutKey; label: string }[] = [
  { key: 'ambient_sound', label: 'Ambient Sound Control' },
  { key: 'spatial_sound', label: 'Spatial Sound' },
  { key: 'timer', label: 'Timer' },
  { key: 'voice_aware', label: 'VoiceAware' },
  { key: 'auto_play_pause', label: 'Auto Play & Pause' },
  { key: 'notification', label: 'Notification' },
  { key: 'flashlight', label: 'Flashlight' },
  { key: 'silent_now', label: 'SilentNow' },
  { key: 'find_my_buds', label: 'Find My Buds' },
];

export const DEFAULT_DEVICE_PREFERENCES: DevicePreferences = {
  eqEnabled: true,
  eqPreset: 'studio',
  eqBands: [...EQ_PRESETS.studio.bands],
  spatialSound: 'music',
  headTracking: false,
  ambientMode: 'anc',
  trueAdaptiveAnc: true,
  silentNow: false,
  soundLevelOptimizer: true,
  voiceAwareLevel: 'mid',
  voiceAwareEnabled: true,
  privateCallMode: false,
  smartTalkEnabled: true,
  smartTalkDuration: 15,
  autoPlayPause: true,
  autoPickUpCall: false,
  multipointEnabled: true,
  caseBrightness: 70,
  caseWallpaper: 'skyline',
  messageNotification: true,
  messagePreview: true,
  caseShortcuts: [
    'ambient_sound',
    'spatial_sound',
    'timer',
    'voice_aware',
    'auto_play_pause',
    'notification',
    'flashlight',
    'silent_now',
    'find_my_buds',
  ],
  volume: 16,
  updatedAt: new Date().toISOString(),
};

export interface TechSpecItem {
  label: string;
  value: string;
  category: 'Acoustics & Drivers' | 'Battery & Playtime' | 'Bluetooth & Connectivity' | 'Physical & Build';
  highlight?: boolean;
}

export const QSG_TECH_SPECS: TechSpecItem[] = [
  {
    label: 'Model (Earbud)',
    value: 'TOUR PRO 3',
    category: 'Physical & Build',
  },
  {
    label: 'Model (Charging Case)',
    value: 'TOUR PRO 3C',
    category: 'Physical & Build',
  },
  {
    label: 'Driver Size',
    value: '10.2 mm / 0.402" Dynamic Driver + 5.1 mm x 2.8 mm Balanced Armature',
    category: 'Acoustics & Drivers',
    highlight: true,
  },
  {
    label: 'Frequency Response',
    value: '20 Hz – 40 kHz',
    category: 'Acoustics & Drivers',
    highlight: true,
  },
  {
    label: 'Impedance',
    value: '32 ohm',
    category: 'Acoustics & Drivers',
  },
  {
    label: 'Sensitivity',
    value: '104 dB SPL @ 1 kHz',
    category: 'Acoustics & Drivers',
  },
  {
    label: 'Maximum SPL',
    value: '95 dB',
    category: 'Acoustics & Drivers',
  },
  {
    label: 'Microphone Sensitivity',
    value: '-38 dBV/Pa @ 1 kHz',
    category: 'Acoustics & Drivers',
  },
  {
    label: 'Music Playtime (BT on, ANC off)',
    value: 'Up to 11 hrs',
    category: 'Battery & Playtime',
    highlight: true,
  },
  {
    label: 'Music Playtime (BT on, ANC on)',
    value: 'Up to 8 hrs',
    category: 'Battery & Playtime',
  },
  {
    label: 'Music Playtime (BT on, True Adaptive ANC on)',
    value: 'Up to 7 hrs',
    category: 'Battery & Playtime',
  },
  {
    label: 'Talk Time (ANC off)',
    value: 'Up to 5.5 hrs',
    category: 'Battery & Playtime',
  },
  {
    label: 'Talk Time (ANC on)',
    value: 'Up to 5.2 hrs',
    category: 'Battery & Playtime',
  },
  {
    label: 'Charging Time',
    value: '2 hrs from empty (10 min = 3 hrs playback)',
    category: 'Battery & Playtime',
  },
  {
    label: 'Power Supply',
    value: '5V ⎓ 1A (2.5W min – 5.0W max)',
    category: 'Battery & Playtime',
  },
  {
    label: 'Earbud Battery Type',
    value: 'Lithium-ion battery (65 mAh / 3.85 V)',
    category: 'Battery & Playtime',
  },
  {
    label: 'Charging Case Battery Type',
    value: 'Lithium-ion battery (850 mAh / 3.8 V)',
    category: 'Battery & Playtime',
  },
  {
    label: 'Bluetooth Version (Earbud)',
    value: '5.3',
    category: 'Bluetooth & Connectivity',
    highlight: true,
  },
  {
    label: 'Bluetooth Version (Charging Case)',
    value: '5.3',
    category: 'Bluetooth & Connectivity',
    highlight: true,
  },
  {
    label: 'Bluetooth Profile Version',
    value: 'A2DP V1.4, AVRCP V1.6.2, HFP V1.8',
    category: 'Bluetooth & Connectivity',
  },
  {
    label: 'Bluetooth Transmitter Frequency Range',
    value: '2.4 GHz – 2.4835 GHz',
    category: 'Bluetooth & Connectivity',
  },
  {
    label: 'Bluetooth Transmitter Power (Earbud)',
    value: '<13 dBm (EIRP)',
    category: 'Bluetooth & Connectivity',
  },
  {
    label: 'Bluetooth Transmitter Power (Charging Case)',
    value: '<10 dBm (EIRP)',
    category: 'Bluetooth & Connectivity',
  },
  {
    label: 'Bluetooth Transmitter Modulation (Earbud)',
    value: 'GFSK, π/4-DQPSK, 8DPSK',
    category: 'Bluetooth & Connectivity',
  },
  {
    label: 'Bluetooth Transmitter Modulation (Charging Case)',
    value: 'GFSK',
    category: 'Bluetooth & Connectivity',
  },
  {
    label: 'Earbud Weight',
    value: '5.6 g per pc (11.2 g combined) / 0.01235 lbs per pc',
    category: 'Physical & Build',
  },
  {
    label: 'Charging Case Weight',
    value: '71.8 g / 0.158 lbs',
    category: 'Physical & Build',
  },
  {
    label: 'Ingress Protection Rating',
    value: 'IP55 (Earbuds)',
    category: 'Physical & Build',
    highlight: true,
  },
  {
    label: 'Maximum Operation Temperature',
    value: '45 °C',
    category: 'Physical & Build',
  },
];

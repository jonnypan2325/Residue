'use client';

export type Mode = 'focus' | 'calm' | 'creative' | 'social';

interface Props {
  currentMode: Mode;
  onModeChange: (mode: Mode) => void;
}

const MODES: {
  id: Mode;
  label: string;
  icon: string;
  desc: string;
  cue: string;
  activeClass: string;
  iconClass: string;
}[] = [
  {
    id: 'focus',
    label: 'Focus',
    icon: '🎯',
    desc: 'Deep work & studying',
    cue: 'Quieter, lower, steady texture',
    activeClass: 'border-cyan-400/70 bg-cyan-500/15 shadow-cyan-500/20',
    iconClass: 'bg-cyan-400/15 text-cyan-200',
  },
  {
    id: 'calm',
    label: 'Calm',
    icon: '🧘',
    desc: 'Relaxation & meditation',
    cue: 'Soft, warm, slow ambience',
    activeClass: 'border-emerald-400/70 bg-emerald-500/15 shadow-emerald-500/20',
    iconClass: 'bg-emerald-400/15 text-emerald-200',
  },
  {
    id: 'creative',
    label: 'Creative',
    icon: '🎨',
    desc: 'Brainstorming & ideation',
    cue: 'Brighter, lightly animated space',
    activeClass: 'border-fuchsia-400/70 bg-fuchsia-500/15 shadow-fuchsia-500/20',
    iconClass: 'bg-fuchsia-400/15 text-fuchsia-200',
  },
  {
    id: 'social',
    label: 'Social',
    icon: '💬',
    desc: 'Group work & discussion',
    cue: 'Fuller, warmer cafe energy',
    activeClass: 'border-amber-400/70 bg-amber-500/15 shadow-amber-500/20',
    iconClass: 'bg-amber-400/15 text-amber-200',
  },
];

export default function ModeSelector({ currentMode, onModeChange }: Props) {
  const activeMode = MODES.find((mode) => mode.id === currentMode) ?? MODES[0];

  return (
    <div className="rounded-2xl border border-white/10 bg-gray-950/60 p-4 shadow-2xl shadow-black/20 backdrop-blur-md">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gray-500">
            Sound Mode
          </p>
          <h2 className="mt-1 text-xl font-semibold text-white">
            Choose how Residue tunes the room
          </h2>
          <p className="mt-1 text-sm text-gray-400">
            Modes change the workspace look and EQ the curated sample beds.
          </p>
        </div>
        <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-300">
          Active: <span className="font-medium text-white">{activeMode.label}</span>
        </div>
      </div>

      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
        {MODES.map((mode) => {
          const isActive = currentMode === mode.id;

          return (
            <button
              key={mode.id}
              type="button"
              onClick={() => onModeChange(mode.id)}
              className={`group relative overflow-hidden rounded-xl border-2 p-3 text-left transition-all duration-300 ${
                isActive
                  ? `${mode.activeClass} shadow-lg scale-[1.01]`
                  : 'border-transparent bg-gray-800/50 hover:border-gray-700 hover:bg-gray-800/80'
              }`}
            >
              {isActive && (
                <span className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-white/10 blur-2xl motion-safe:animate-pulse" />
              )}
              <span
                className={`relative inline-flex h-10 w-10 items-center justify-center rounded-lg text-2xl transition-transform duration-300 ${
                  isActive ? `${mode.iconClass} motion-safe:scale-110` : 'bg-gray-950/60'
                }`}
              >
                {mode.icon}
              </span>
              <p className={`relative mt-3 text-sm font-semibold ${isActive ? 'text-white' : 'text-gray-300'}`}>
                {mode.label}
              </p>
              <p className="relative text-xs text-gray-500">{mode.desc}</p>
              <p className={`relative mt-2 text-[11px] ${isActive ? 'text-gray-200' : 'text-gray-500'}`}>
                {mode.cue}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}

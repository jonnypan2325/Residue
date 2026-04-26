export type AudioBedId = 'brown-noise' | 'white-noise' | 'rain' | 'cafe' | 'binaural';
export type Mode = 'focus' | 'calm' | 'creative' | 'social';

export interface AudioBed {
  id: AudioBedId;
  label: string;
  desc: string;
  url: string;
  sourceTitle: string;
  sourceUrl: string;
  license: string;
  duration: string;
}

export interface ModeAudioPreset {
  volume: number;
  targetDb: number;
  playbackRate: number;
  lowGain: number;
  midGain: number;
  highGain: number;
  filterType: BiquadFilterType;
  filterFrequency: number;
  filterQ: number;
  pan: number;
}

export const AUDIO_BEDS: AudioBed[] = [
  {
    id: 'brown-noise',
    label: 'Brown Noise',
    desc: 'Deep low-frequency masking',
    url: '/audio/beds/brown-noise.mp3',
    sourceTitle: 'Generated brown noise',
    sourceUrl: 'local://ffmpeg-anoisesrc-brown',
    license: 'Generated locally for Residue',
    duration: '3:00',
  },
  {
    id: 'white-noise',
    label: 'White Noise',
    desc: 'Bright full-spectrum masking',
    url: '/audio/beds/white-noise.mp3',
    sourceTitle: 'White Noise',
    sourceUrl: 'https://bigsoundbank.com/sound-1037-bruit-blanc.html',
    license: 'CC0 public domain',
    duration: '5:00',
  },
  {
    id: 'rain',
    label: 'Rain',
    desc: 'Generated steady rain ambience',
    url: '/audio/beds/rain-elevenlabs.mp3',
    sourceTitle: 'ElevenLabs rain ambience',
    sourceUrl: 'local://elevenlabs-generated',
    license: 'Generated for this app',
    duration: '2:12',
  },
  {
    id: 'cafe',
    label: 'Cafe',
    desc: 'Generated coffee shop ambience',
    url: '/audio/beds/cafe-elevenlabs.mp3',
    sourceTitle: 'ElevenLabs cafe ambience',
    sourceUrl: 'local://elevenlabs-generated',
    license: 'Generated for this app',
    duration: '2:12',
  },
  {
    id: 'binaural',
    label: 'Binaural',
    desc: '10 Hz alpha beat tone',
    url: '/audio/beds/binaural-alpha.mp3',
    sourceTitle: 'Generated alpha binaural beat',
    sourceUrl: 'local://ffmpeg-sine-200-210',
    license: 'Generated locally for Residue',
    duration: '3:00',
  },
];

export const MODE_AUDIO_PRESETS: Record<Mode, ModeAudioPreset> = {
  focus: {
    volume: 0.22,
    targetDb: 42,
    playbackRate: 0.96,
    lowGain: 5,
    midGain: -1,
    highGain: -5,
    filterType: 'lowpass',
    filterFrequency: 1800,
    filterQ: 0.45,
    pan: -0.08,
  },
  calm: {
    volume: 0.26,
    targetDb: 45,
    playbackRate: 0.98,
    lowGain: 2,
    midGain: -2,
    highGain: -4,
    filterType: 'lowpass',
    filterFrequency: 1400,
    filterQ: 0.35,
    pan: 0,
  },
  creative: {
    volume: 0.34,
    targetDb: 51,
    playbackRate: 1.01,
    lowGain: -1,
    midGain: 5,
    highGain: 1,
    filterType: 'bandpass',
    filterFrequency: 1100,
    filterQ: 0.65,
    pan: 0.08,
  },
  social: {
    volume: 0.44,
    targetDb: 58,
    playbackRate: 1.03,
    lowGain: -2,
    midGain: 2,
    highGain: 5,
    filterType: 'highpass',
    filterFrequency: 180,
    filterQ: 0.35,
    pan: 0.12,
  },
};

export function isAudioBedId(id: string): id is AudioBedId {
  return AUDIO_BEDS.some((bed) => bed.id === id);
}

export function getAudioBed(id: AudioBedId): AudioBed {
  return AUDIO_BEDS.find((bed) => bed.id === id) ?? AUDIO_BEDS[0];
}

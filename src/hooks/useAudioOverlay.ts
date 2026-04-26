'use client';

import { useState, useCallback, useEffect, useRef } from 'react';

type SoundType = 'brown-noise' | 'pink-noise' | 'white-noise' | 'rain' | 'cafe' | 'binaural' | 'ai-generated';
type Mode = 'focus' | 'calm' | 'creative' | 'social';

const MODE_AUDIO_PRESETS: Record<Mode, {
  volume: number;
  targetDb: number;
  pitchFactor: number;
  filterType: BiquadFilterType;
  filterFrequency: number;
  filterQ: number;
}> = {
  focus: {
    volume: 0.2,
    targetDb: 42,
    pitchFactor: 0.88,
    filterType: 'lowpass',
    filterFrequency: 850,
    filterQ: 0.6,
  },
  calm: {
    volume: 0.24,
    targetDb: 45,
    pitchFactor: 0.82,
    filterType: 'lowpass',
    filterFrequency: 650,
    filterQ: 0.4,
  },
  creative: {
    volume: 0.32,
    targetDb: 51,
    pitchFactor: 1.08,
    filterType: 'bandpass',
    filterFrequency: 1250,
    filterQ: 0.9,
  },
  social: {
    volume: 0.42,
    targetDb: 58,
    pitchFactor: 1.18,
    filterType: 'highpass',
    filterFrequency: 280,
    filterQ: 0.5,
  },
};

interface OverlayState {
  isPlaying: boolean;
  soundType: SoundType;
  volume: number;
  targetDb: number;
  aiGenerating: boolean;
  aiPrompt: string | null;
}

function createNoiseBuffer(
  ctx: AudioContext,
  type: SoundType,
  mode: Mode
): AudioBuffer {
  const sampleRate = ctx.sampleRate;
  const duration = 4;
  const length = sampleRate * duration;
  const buffer = ctx.createBuffer(2, length, sampleRate);
  const { pitchFactor } = MODE_AUDIO_PRESETS[mode];

  for (let channel = 0; channel < 2; channel++) {
    const data = buffer.getChannelData(channel);

    switch (type) {
      case 'brown-noise': {
        let last = 0;
        for (let i = 0; i < length; i++) {
          const white = Math.random() * 2 - 1;
          last = (last + 0.02 * white) / 1.02;
          data[i] = last * 3.5;
        }
        break;
      }
      case 'pink-noise': {
        let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
        for (let i = 0; i < length; i++) {
          const white = Math.random() * 2 - 1;
          b0 = 0.99886 * b0 + white * 0.0555179;
          b1 = 0.99332 * b1 + white * 0.0750759;
          b2 = 0.96900 * b2 + white * 0.1538520;
          b3 = 0.86650 * b3 + white * 0.3104856;
          b4 = 0.55000 * b4 + white * 0.5329522;
          b5 = -0.7616 * b5 - white * 0.0168980;
          data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.11;
          b6 = white * 0.115926;
        }
        break;
      }
      case 'white-noise': {
        for (let i = 0; i < length; i++) {
          data[i] = Math.random() * 2 - 1;
        }
        break;
      }
      case 'rain': {
        for (let i = 0; i < length; i++) {
          const white = Math.random() * 2 - 1;
          const envelope = Math.random() < 0.001 * pitchFactor ? 0.8 : 0.1;
          data[i] = white * envelope;
        }
        let b = 0;
        for (let i = 0; i < length; i++) {
          b = (0.985 - pitchFactor * 0.015) * b + data[i] * 0.03;
          data[i] = b * 5;
        }
        break;
      }
      case 'cafe': {
        let roomTone = 0;
        let hiss = 0;
        const stereoOffset = channel === 0 ? 0 : 0.37;
        const chatterVoices = [
          { freq: 165, mod: 0.9, phase: 0.2 + stereoOffset },
          { freq: 230, mod: 1.3, phase: 1.6 + stereoOffset },
          { freq: 420, mod: 0.7, phase: 2.8 + stereoOffset },
          { freq: 760, mod: 1.1, phase: 4.1 + stereoOffset },
        ];

        for (let i = 0; i < length; i++) {
          const t = i / sampleRate;
          const white = Math.random() * 2 - 1;

          roomTone = (roomTone + 0.018 * white) / 1.018;
          hiss = 0.92 * hiss + 0.08 * white;

          const chatter = chatterVoices.reduce((sum, voice) => {
            const phraseEnvelope =
              0.35 + 0.65 * Math.max(0, Math.sin(2 * Math.PI * voice.mod * t + voice.phase));
            const syllableEnvelope =
              0.55 + 0.45 * Math.sin(2 * Math.PI * (voice.mod * 5.7) * t + voice.phase * 1.7);
            return (
              sum +
              Math.sin(2 * Math.PI * voice.freq * pitchFactor * t + voice.phase) *
                phraseEnvelope *
                syllableEnvelope
            );
          }, 0) * 0.035;

          const espressoSteam =
            Math.max(0, Math.sin(2 * Math.PI * 0.18 * t + stereoOffset)) * hiss * 0.05;

          const cupClink =
            Math.exp(-((t % 1.9) * 18)) *
            Math.sin(2 * Math.PI * (1800 + channel * 260) * t) *
            (Math.sin(2 * Math.PI * 0.31 * t + 1.1) > 0.96 ? 0.12 : 0);

          data[i] = roomTone * 0.9 + chatter + espressoSteam + cupClink;
        }
        break;
      }
      case 'binaural': {
        const baseFreq = 200 * pitchFactor;
        const beatFreq = 10 * pitchFactor;
        const leftFreq = baseFreq;
        const rightFreq = baseFreq + beatFreq;
        const freq = channel === 0 ? leftFreq : rightFreq;
        for (let i = 0; i < length; i++) {
          data[i] = Math.sin(2 * Math.PI * freq * i / sampleRate) * 0.3;
        }
        break;
      }
      default: {
        for (let i = 0; i < length; i++) {
          data[i] = Math.random() * 2 - 1;
        }
      }
    }
  }

  return buffer;
}

export function useAudioOverlay() {
  const [overlayState, setOverlayState] = useState<OverlayState>({
    isPlaying: false,
    soundType: 'brown-noise',
    volume: MODE_AUDIO_PRESETS.focus.volume,
    targetDb: MODE_AUDIO_PRESETS.focus.targetDb,
    aiGenerating: false,
    aiPrompt: null,
  });

  const ctxRef = useRef<AudioContext | null>(null);
  const sourceRef = useRef<AudioBufferSourceNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const audioElRef = useRef<HTMLAudioElement | null>(null);
  const mediaSourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const filterRef = useRef<BiquadFilterNode | null>(null);
  const volumeRef = useRef(overlayState.volume);

  useEffect(() => {
    volumeRef.current = overlayState.volume;
  }, [overlayState.volume]);

  const stopOverlay = useCallback(() => {
    if (sourceRef.current) {
      try { sourceRef.current.stop(); } catch { /* already stopped */ }
    }
    if (audioElRef.current) {
      audioElRef.current.pause();
      audioElRef.current.src = '';
      audioElRef.current = null;
    }
    if (mediaSourceRef.current) {
      mediaSourceRef.current = null;
    }
    if (ctxRef.current) {
      ctxRef.current.close();
    }
    sourceRef.current = null;
    ctxRef.current = null;
    gainRef.current = null;
    filterRef.current = null;
    setOverlayState((prev) => ({ ...prev, isPlaying: false, aiGenerating: false }));
  }, []);

  const startOverlay = useCallback((
    soundType: SoundType,
    volume: number,
    targetDb: number,
    mode: Mode = 'focus'
  ) => {
    stopOverlay();

    if (soundType === 'ai-generated') {
      // AI generation handled by generateAiBed
      setOverlayState({ isPlaying: false, soundType, volume, targetDb, aiGenerating: false, aiPrompt: null });
      return;
    }

    const ctx = new AudioContext();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();
    const preset = MODE_AUDIO_PRESETS[mode];

    filter.type = preset.filterType;
    filter.frequency.value = preset.filterFrequency;
    filter.Q.value = preset.filterQ;
    gain.gain.value = volume;
    gain.connect(ctx.destination);

    const buffer = createNoiseBuffer(ctx, soundType, mode);
    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.loop = true;
    source.connect(filter);
    filter.connect(gain);
    source.start();

    ctxRef.current = ctx;
    sourceRef.current = source;
    gainRef.current = gain;
    filterRef.current = filter;

    setOverlayState({ isPlaying: true, soundType, volume, targetDb, aiGenerating: false, aiPrompt: null });
  }, [stopOverlay]);

  const generateAiBed = useCallback(async (
    mode: string,
    profile?: { eqGains: number[]; targetDb: number },
    userId: string = 'anon',
  ) => {
    stopOverlay();
    setOverlayState((prev) => ({ ...prev, soundType: 'ai-generated', aiGenerating: true, aiPrompt: null }));

    const defaultProfile = profile || {
      eqGains: [0.3, 0.5, 0.6, 0.4, 0.3, 0.2, 0.1],
      targetDb: 50,
    };

    try {
      const res = await fetch('/api/beds/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          profile: defaultProfile,
          mode,
          count: 1,
        }),
      });

      const data = await res.json();

      if (data.status === 'generated' && data.beds?.length > 0) {
        const bedUrl = data.beds[0].url;
        const prompt = data.beds[0].prompt;

        // Play the generated MP3
        const ctx = new AudioContext();
        const gain = ctx.createGain();
        gain.gain.value = volumeRef.current;
        gain.connect(ctx.destination);

        const audio = new Audio(bedUrl);
        audio.loop = true;
        audio.crossOrigin = 'anonymous';
        const mediaSource = ctx.createMediaElementSource(audio);
        mediaSource.connect(gain);

        ctxRef.current = ctx;
        gainRef.current = gain;
        audioElRef.current = audio;
        mediaSourceRef.current = mediaSource;

        await audio.play();

        setOverlayState((prev) => ({
          ...prev,
          isPlaying: true,
          soundType: 'ai-generated',
          targetDb: defaultProfile.targetDb,
          aiGenerating: false,
          aiPrompt: prompt,
        }));
      } else if (data.status === 'cached' && data.bedUrl) {
        const ctx = new AudioContext();
        const gain = ctx.createGain();
        gain.gain.value = volumeRef.current;
        gain.connect(ctx.destination);

        const audio = new Audio(data.bedUrl);
        audio.loop = true;
        audio.crossOrigin = 'anonymous';
        const mediaSource = ctx.createMediaElementSource(audio);
        mediaSource.connect(gain);

        ctxRef.current = ctx;
        gainRef.current = gain;
        audioElRef.current = audio;
        mediaSourceRef.current = mediaSource;

        await audio.play();

        setOverlayState((prev) => ({
          ...prev,
          isPlaying: true,
          soundType: 'ai-generated',
          targetDb: defaultProfile.targetDb,
          aiGenerating: false,
          aiPrompt: 'Using cached personalized bed',
        }));
      } else {
        // No API key or generation failed — show prompts
        setOverlayState((prev) => ({
          ...prev,
          aiGenerating: false,
          aiPrompt: data.samplePrompt || data.message || 'Generation unavailable',
        }));
      }
    } catch (error) {
      // Clean up resources allocated before audio.play() failed
      if (ctxRef.current) {
        try { ctxRef.current.close(); } catch { /* ignore */ }
      }
      if (audioElRef.current) {
        audioElRef.current.pause();
        audioElRef.current.src = '';
        audioElRef.current = null;
      }
      ctxRef.current = null;
      gainRef.current = null;
      mediaSourceRef.current = null;
      const msg = error instanceof Error ? error.message : 'Generation failed';
      setOverlayState((prev) => ({
        ...prev,
        aiGenerating: false,
        aiPrompt: `Error: ${msg}`,
      }));
    }
  }, [stopOverlay]);

  const setVolume = useCallback((volume: number) => {
    if (gainRef.current) {
      gainRef.current.gain.value = volume;
    }
    setOverlayState((prev) => ({ ...prev, volume }));
  }, []);

  const applyModePreset = useCallback((mode: Mode) => {
    const preset = MODE_AUDIO_PRESETS[mode];
    volumeRef.current = preset.volume;

    if (overlayState.isPlaying && overlayState.soundType !== 'ai-generated') {
      startOverlay(overlayState.soundType, preset.volume, preset.targetDb, mode);
      return;
    }

    if (gainRef.current) {
      gainRef.current.gain.value = preset.volume;
    }

    setOverlayState((prev) => ({
      ...prev,
      volume: preset.volume,
      targetDb: preset.targetDb,
    }));
  }, [overlayState.isPlaying, overlayState.soundType, startOverlay]);

  const setSoundType = useCallback((soundType: SoundType) => {
    if (overlayState.isPlaying) {
      startOverlay(soundType, overlayState.volume, overlayState.targetDb);
    } else {
      setOverlayState((prev) => ({ ...prev, soundType }));
    }
  }, [overlayState.isPlaying, overlayState.volume, overlayState.targetDb, startOverlay]);

  return {
    overlayState,
    startOverlay,
    stopOverlay,
    setVolume,
    setSoundType,
    applyModePreset,
    generateAiBed,
  };
}

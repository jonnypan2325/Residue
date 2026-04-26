'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import {
  getAudioBed,
  isAudioBedId,
  MODE_AUDIO_PRESETS,
  type AudioBedId,
  type Mode,
} from '@/data/audioBeds';

type SoundType = AudioBedId | 'ai-generated';

interface OverlayState {
  isPlaying: boolean;
  soundType: SoundType;
  volume: number;
  targetDb: number;
  aiGenerating: boolean;
  aiPrompt: string | null;
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
  const lowEqRef = useRef<BiquadFilterNode | null>(null);
  const midEqRef = useRef<BiquadFilterNode | null>(null);
  const highEqRef = useRef<BiquadFilterNode | null>(null);
  const pannerRef = useRef<StereoPannerNode | null>(null);
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
    lowEqRef.current = null;
    midEqRef.current = null;
    highEqRef.current = null;
    pannerRef.current = null;
    setOverlayState((prev) => ({ ...prev, isPlaying: false, aiGenerating: false }));
  }, []);

  const applyAudioPreset = useCallback((mode: Mode, volume: number) => {
    const preset = MODE_AUDIO_PRESETS[mode];

    if (audioElRef.current) {
      audioElRef.current.playbackRate = preset.playbackRate;
    }
    if (gainRef.current) {
      gainRef.current.gain.value = volume;
    }
    if (lowEqRef.current) {
      lowEqRef.current.gain.value = preset.lowGain;
    }
    if (midEqRef.current) {
      midEqRef.current.gain.value = preset.midGain;
    }
    if (highEqRef.current) {
      highEqRef.current.gain.value = preset.highGain;
    }
    if (filterRef.current) {
      filterRef.current.type = preset.filterType;
      filterRef.current.frequency.value = preset.filterFrequency;
      filterRef.current.Q.value = preset.filterQ;
    }
    if (pannerRef.current) {
      pannerRef.current.pan.value = preset.pan;
    }
  }, []);

  const startOverlay = useCallback(async (
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

    const bedId = isAudioBedId(soundType) ? soundType : 'brown-noise';
    const bed = getAudioBed(bedId);

    try {
      const ctx = new AudioContext();
      const audio = new Audio(bed.url);
      audio.loop = true;
      audio.preload = 'auto';

      const mediaSource = ctx.createMediaElementSource(audio);
      const lowEq = ctx.createBiquadFilter();
      const midEq = ctx.createBiquadFilter();
      const highEq = ctx.createBiquadFilter();
      const filter = ctx.createBiquadFilter();
      const panner = ctx.createStereoPanner();
      const gain = ctx.createGain();

      lowEq.type = 'lowshelf';
      lowEq.frequency.value = 220;
      midEq.type = 'peaking';
      midEq.frequency.value = 1000;
      midEq.Q.value = 0.8;
      highEq.type = 'highshelf';
      highEq.frequency.value = 3600;

      mediaSource.connect(lowEq);
      lowEq.connect(midEq);
      midEq.connect(highEq);
      highEq.connect(filter);
      filter.connect(panner);
      panner.connect(gain);
      gain.connect(ctx.destination);

      ctxRef.current = ctx;
      audioElRef.current = audio;
      mediaSourceRef.current = mediaSource;
      lowEqRef.current = lowEq;
      midEqRef.current = midEq;
      highEqRef.current = highEq;
      filterRef.current = filter;
      pannerRef.current = panner;
      gainRef.current = gain;
      volumeRef.current = volume;

      applyAudioPreset(mode, volume);
      await audio.play();

      setOverlayState({
        isPlaying: true,
        soundType: bedId,
        volume,
        targetDb,
        aiGenerating: false,
        aiPrompt: null,
      });
    } catch (error) {
      if (ctxRef.current) {
        try { ctxRef.current.close(); } catch { /* ignore */ }
      }
      if (audioElRef.current) {
        audioElRef.current.pause();
        audioElRef.current.src = '';
      }
      ctxRef.current = null;
      audioElRef.current = null;
      mediaSourceRef.current = null;
      gainRef.current = null;
      lowEqRef.current = null;
      midEqRef.current = null;
      highEqRef.current = null;
      filterRef.current = null;
      pannerRef.current = null;

      const msg = error instanceof Error ? error.message : 'Playback failed';
      setOverlayState((prev) => ({
        ...prev,
        soundType: bedId,
        aiGenerating: false,
        aiPrompt: `Error: ${msg}`,
      }));
    }
  }, [applyAudioPreset, stopOverlay]);

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
      lowEqRef.current = null;
      midEqRef.current = null;
      highEqRef.current = null;
      filterRef.current = null;
      pannerRef.current = null;
      const msg = error instanceof Error ? error.message : 'Generation failed';
      setOverlayState((prev) => ({
        ...prev,
        aiGenerating: false,
        aiPrompt: `Error: ${msg}`,
      }));
    }
  }, [stopOverlay]);

  const setVolume = useCallback((volume: number) => {
    volumeRef.current = volume;
    if (gainRef.current) {
      gainRef.current.gain.value = volume;
    }
    setOverlayState((prev) => ({ ...prev, volume }));
  }, []);

  const applyModePreset = useCallback((mode: Mode) => {
    const preset = MODE_AUDIO_PRESETS[mode];
    volumeRef.current = preset.volume;

    if (overlayState.isPlaying && overlayState.soundType !== 'ai-generated') {
      applyAudioPreset(mode, preset.volume);
    }

    setOverlayState((prev) => ({
      ...prev,
      volume: preset.volume,
      targetDb: preset.targetDb,
    }));
  }, [applyAudioPreset, overlayState.isPlaying, overlayState.soundType]);

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

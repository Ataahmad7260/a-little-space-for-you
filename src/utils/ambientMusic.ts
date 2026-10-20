/**
 * Gentle Ambient Piano & Celesta Soundscape Generator
 * Uses Web Audio API for zero-dependency, pure, reliable, soothing soundscapes.
 * Can also stream custom audio if a URL is provided.
 */

class AmbientSoundscapeEngine {
  private audioCtx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private masterGain: GainNode | null = null;
  private timerId: number | null = null;
  private customAudio: HTMLAudioElement | null = null;

  // Gentle, warm chord progressions (Frequencies in Hz: Eb3, G3, Bb3, D4, F4, G4, etc.)
  private chordProgressions = [
    // Eb maj9: Eb, G, Bb, D, F
    [155.56, 196.00, 233.08, 293.66, 349.23, 392.00],
    // Ab maj7: Ab, C, Eb, G, Bb
    [103.83, 130.81, 155.56, 196.00, 233.08, 261.63],
    // Cm9: C, Eb, G, Bb, D
    [130.81, 155.56, 196.00, 233.08, 293.66],
    // Bb sus4 add9: Bb, Eb, F, C
    [116.54, 155.56, 174.61, 261.63, 349.23]
  ];

  private currentChordIndex = 0;

  private initContext() {
    if (!this.audioCtx) {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.audioCtx = new AudioCtxClass();
      this.masterGain = this.audioCtx.createGain();
      this.masterGain.gain.setValueAtTime(0.001, this.audioCtx.currentTime);

      // Low-pass filter to give that warm, tape-saturated, dreamy bedroom piano warmth
      const lowpass = this.audioCtx.createBiquadFilter();
      lowpass.type = 'lowpass';
      lowpass.frequency.setValueAtTime(850, this.audioCtx.currentTime);
      lowpass.Q.setValueAtTime(1.0, this.audioCtx.currentTime);

      this.masterGain.connect(lowpass);
      lowpass.connect(this.audioCtx.destination);
    }

    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  // Play a soft, organic piano chime note
  private playPianoNote(freq: number, velocity: number = 0.35, duration: number = 3.5) {
    if (!this.audioCtx || !this.masterGain) return;
    const now = this.audioCtx.currentTime;

    // Dual oscillator for rich piano timbre (fundamental sine + soft harmonic triangle)
    const osc1 = this.audioCtx.createOscillator();
    const osc2 = this.audioCtx.createOscillator();
    const noteGain = this.audioCtx.createGain();

    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(freq, now);

    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(freq * 2.002, now); // slight detune for lush chorus

    // Piano-like envelope: soft fast attack, gentle natural exponential decay
    noteGain.gain.setValueAtTime(0.0001, now);
    noteGain.gain.linearRampToValueAtTime(velocity * 0.18, now + 0.08);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc1.connect(noteGain);
    osc2.connect(noteGain);
    noteGain.connect(this.masterGain);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + duration);
    osc2.stop(now + duration);
  }

  // Celesta / Music Box high twinkle
  private playCelestaNote(freq: number) {
    if (!this.audioCtx || !this.masterGain) return;
    const now = this.audioCtx.currentTime;

    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq * 2, now);

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(0.04, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.2);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 2.5);
  }

  private stepHarmonics() {
    if (!this.isPlaying) return;

    const chord = this.chordProgressions[this.currentChordIndex];
    this.currentChordIndex = (this.currentChordIndex + 1) % this.chordProgressions.length;

    // Pick 3-4 notes from chord to play with subtle humanized timing
    const selectedNotes = [...chord].sort(() => 0.5 - Math.random()).slice(0, 3);
    selectedNotes.forEach((freq, idx) => {
      setTimeout(() => {
        if (this.isPlaying) {
          this.playPianoNote(freq, 0.25 + Math.random() * 0.15, 3.8 + Math.random());
        }
      }, idx * 450 + Math.random() * 100);
    });

    // Occasional dreamy celesta twinkle
    if (Math.random() > 0.4) {
      setTimeout(() => {
        if (this.isPlaying) {
          const highNote = chord[Math.floor(Math.random() * chord.length)];
          this.playCelestaNote(highNote * 2);
        }
      }, 1600 + Math.random() * 800);
    }

    // Schedule next chord progression smoothly
    const nextInterval = 4200 + Math.random() * 1000;
    this.timerId = window.setTimeout(() => this.stepHarmonics(), nextInterval);
  }

  public play(customUrl?: string) {
    if (this.isPlaying) return;
    this.isPlaying = true;

    if (customUrl && customUrl.trim() !== "") {
      if (!this.customAudio) {
        this.customAudio = new Audio(customUrl);
        this.customAudio.loop = true;
      }
      this.customAudio.play().catch(() => {
        // Fallback to synthesized ambient piano
        this.startSynth();
      });
      return;
    }

    this.startSynth();
  }

  private startSynth() {
    this.initContext();
    if (!this.masterGain || !this.audioCtx) return;

    // Smooth fade in
    this.masterGain.gain.setValueAtTime(0.0001, this.audioCtx.currentTime);
    this.masterGain.gain.linearRampToValueAtTime(0.3, this.audioCtx.currentTime + 2.5);

    this.stepHarmonics();
  }

  public pause() {
    this.isPlaying = false;
    if (this.timerId !== null) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }

    if (this.customAudio) {
      this.customAudio.pause();
    }

    if (this.audioCtx && this.masterGain) {
      // Smooth fade out
      this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, this.audioCtx.currentTime);
      this.masterGain.gain.linearRampToValueAtTime(0.0001, this.audioCtx.currentTime + 0.8);
    }
  }

  public toggle(customUrl?: string): boolean {
    if (this.isPlaying) {
      this.pause();
      return false;
    } else {
      this.play(customUrl);
      return true;
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }
}

export const ambientMusic = new AmbientSoundscapeEngine();

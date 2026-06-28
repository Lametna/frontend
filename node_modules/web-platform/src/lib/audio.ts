/**
 * Lametna Global Audio Engine
 * Preloads and manages generic sound effects for a premium UI experience.
 */

type SoundEffect = 'click' | 'success' | 'error' | 'victory' | 'defeat' | 'notification' | 'join' | 'leave';

class AudioEngine {
  private sounds: Map<SoundEffect, HTMLAudioElement> = new Map();
  private isMuted: boolean = false;
  private masterVolume: number = 0.5;

  constructor() {
    // We expect these files to exist in public/assets/sounds/
    this.preload('click', '/assets/sounds/click.mp3');
    this.preload('success', '/assets/sounds/success.mp3');
    this.preload('error', '/assets/sounds/error.mp3');
    this.preload('victory', '/assets/sounds/victory.mp3');
    this.preload('defeat', '/assets/sounds/defeat.mp3');
    this.preload('notification', '/assets/sounds/notification.mp3');
    this.preload('join', '/assets/sounds/join.mp3');
    this.preload('leave', '/assets/sounds/leave.mp3');

    const savedMute = localStorage.getItem('lametna_muted');
    if (savedMute) this.isMuted = savedMute === 'true';
    
    const savedVol = localStorage.getItem('lametna_volume');
    if (savedVol) this.masterVolume = parseFloat(savedVol);
  }

  private preload(name: SoundEffect, path: string) {
    if (typeof window !== 'undefined') {
      const audio = new Audio(path);
      audio.preload = 'auto';
      this.sounds.set(name, audio);
    }
  }

  public play(name: SoundEffect) {
    if (this.isMuted) return;
    
    const sound = this.sounds.get(name);
    if (sound) {
      // Clone node to allow rapid overlapping plays (e.g. clicking fast)
      const clone = sound.cloneNode() as HTMLAudioElement;
      clone.volume = this.masterVolume;
      clone.play().catch(e => {
        // Autoplay policy prevention is normal on first load
        console.debug(`[AudioEngine] Blocked from playing ${name}:`, e);
      });
    }
  }

  public toggleMute() {
    this.isMuted = !this.isMuted;
    localStorage.setItem('lametna_muted', this.isMuted.toString());
    return this.isMuted;
  }

  public setVolume(vol: number) {
    this.masterVolume = Math.max(0, Math.min(1, vol));
    localStorage.setItem('lametna_volume', this.masterVolume.toString());
  }

  public getVolume() { return this.masterVolume; }
  public getIsMuted() { return this.isMuted; }
}

export const audioManager = new AudioEngine();

import { BaseService } from './base';

export class AudioService extends BaseService {
  private context: AudioContext | null = null;
  private volume: number = 1.0;
  private muted: boolean = false;

  constructor() {
    super('AudioService');
  }

  public init(): void {
    if (!this.context && typeof window !== 'undefined') {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContextClass) {
        this.context = new AudioContextClass();
      }
    }
  }

  public setVolume(volume: number): void {
    this.volume = Math.max(0, Math.min(1, volume));
    this.events.publish('audio.volume_changed', { volume: this.volume });
  }

  public toggleMute(): boolean {
    this.muted = !this.muted;
    this.events.publish('audio.mute_changed', { muted: this.muted });
    return this.muted;
  }

  public async playSound(url: string): Promise<void> {
    if (this.muted || !this.context) return;
    
    try {
      const response = await fetch(url);
      const arrayBuffer = await response.arrayBuffer();
      const audioBuffer = await this.context.decodeAudioData(arrayBuffer);
      
      const source = this.context.createBufferSource();
      source.buffer = audioBuffer;
      
      const gainNode = this.context.createGain();
      gainNode.gain.value = this.volume;
      
      source.connect(gainNode);
      gainNode.connect(this.context.destination);
      
      source.start();
    } catch (e) {
      this.logger.error('Failed to play sound', e);
    }
  }
}

export const audioService = new AudioService();

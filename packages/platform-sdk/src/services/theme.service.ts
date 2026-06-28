import { BaseService } from './base';
import { platformConfig } from '../config';

export class ThemeService extends BaseService {
  private currentMode: 'light' | 'dark' | 'system';

  constructor() {
    super('ThemeService');
    this.currentMode = platformConfig.get('theme').defaultMode;
  }

  public setMode(mode: 'light' | 'dark' | 'system'): void {
    this.currentMode = mode;
    this.applyTheme(mode);
    this.events.publish('theme.changed', { mode });
  }

  public getMode(): 'light' | 'dark' | 'system' {
    return this.currentMode;
  }

  private applyTheme(mode: 'light' | 'dark' | 'system'): void {
    if (typeof window === 'undefined') return;
    
    const root = window.document.documentElement;
    const isDark = mode === 'dark' || (mode === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }

  public async getThemes(): Promise<any[]> {
    const response = await this.api.get<any[]>('/themes');
    return response.data;
  }
}

export const themeService = new ThemeService();

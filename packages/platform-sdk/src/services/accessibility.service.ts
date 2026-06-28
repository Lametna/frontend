import { BaseService } from './base';
import { platformConfig } from '../config';

export class AccessibilityService extends BaseService {
  constructor() {
    super('AccessibilityService');
  }

  public isReducedMotion(): boolean {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  public announce(message: string, priority: 'polite' | 'assertive' = 'polite'): void {
    this.events.publish('a11y.announce', { message, priority });
  }

  public enableHighContrast(enable: boolean): void {
    if (typeof window === 'undefined') return;
    const root = window.document.documentElement;
    if (enable) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }
  }
}

export const accessibilityService = new AccessibilityService();

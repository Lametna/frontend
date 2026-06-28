import { BaseService } from './base';
import { Language } from '../types';
import { platformConfig } from '../config';

export class LocalizationService extends BaseService {
  private currentLanguage: string;
  private translations: Record<string, Record<string, string>> = {};

  constructor() {
    super('LocalizationService');
    this.currentLanguage = platformConfig.get('locale').defaultLanguage;
  }

  public async setLanguage(langCode: string): Promise<void> {
    if (!platformConfig.get('locale').supportedLanguages.includes(langCode)) {
      this.logger.warn(`Language ${langCode} is not supported. Returning to default.`);
      return;
    }
    
    this.currentLanguage = langCode;
    
    // In a real implementation, we would load translations here
    // this.translations[langCode] = await this.api.get(`/translations/${langCode}`);
    
    this.events.publish('locale.changed', { language: langCode });
  }

  public getLanguage(): string {
    return this.currentLanguage;
  }

  public translate(key: string, params?: Record<string, string | number>): string {
    const langDict = this.translations[this.currentLanguage];
    if (!langDict || !langDict[key]) {
      return key; // Fallback to key
    }

    let result = langDict[key];
    if (params) {
      for (const [k, v] of Object.entries(params)) {
        result = result.replace(`{{${k}}}`, String(v));
      }
    }
    return result;
  }

  public getSupportedLanguages(): Language[] {
    return [
      { code: 'en', name: 'English', dir: 'ltr' },
      { code: 'ar', name: 'Arabic', dir: 'rtl' }
    ];
  }
}

export const localizationService = new LocalizationService();

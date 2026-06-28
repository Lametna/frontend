export interface PlatformConfig {
  env: 'development' | 'staging' | 'production' | 'test';
  version: string;
  api: {
    baseUrl: string;
    timeout: number;
    retries: number;
  };
  socket: {
    url: string;
    autoConnect: boolean;
    reconnectionAttempts: number;
    reconnectionDelay: number;
  };
  features: Record<string, boolean>;
  theme: {
    defaultMode: 'light' | 'dark' | 'system';
  };
  locale: {
    defaultLanguage: string;
    supportedLanguages: string[];
  };
}

const defaultConfig: PlatformConfig = {
  env: 'development',
  version: '1.0.0',
  api: {
    baseUrl: '/api/v1',
    timeout: 10000,
    retries: 3,
  },
  socket: {
    url: '',
    autoConnect: false,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
  },
  features: {},
  theme: {
    defaultMode: 'system',
  },
  locale: {
    defaultLanguage: 'en',
    supportedLanguages: ['en', 'ar'],
  },
};

export class ConfigManager {
  private config: PlatformConfig;

  constructor(initialConfig: Partial<PlatformConfig> = {}) {
    this.config = this.mergeConfig(defaultConfig, initialConfig);
  }

  public get<K extends keyof PlatformConfig>(key: K): PlatformConfig[K] {
    return this.config[key];
  }

  public set<K extends keyof PlatformConfig>(key: K, value: Partial<PlatformConfig[K]> | PlatformConfig[K]): void {
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      this.config[key] = { ...this.config[key], ...value } as PlatformConfig[K];
    } else {
      this.config[key] = value as PlatformConfig[K];
    }
  }

  public getAll(): PlatformConfig {
    return { ...this.config };
  }

  public update(newConfig: Partial<PlatformConfig>): void {
    this.config = this.mergeConfig(this.config, newConfig);
  }

  private mergeConfig(base: PlatformConfig, update: Partial<PlatformConfig>): PlatformConfig {
    const merged = { ...base };
    for (const key in update) {
      if (Object.prototype.hasOwnProperty.call(update, key)) {
        const k = key as keyof PlatformConfig;
        const updateValue = update[k];
        if (
          typeof updateValue === 'object' &&
          updateValue !== null &&
          !Array.isArray(updateValue) &&
          typeof base[k] === 'object'
        ) {
          merged[k] = { ...base[k], ...updateValue } as any;
        } else {
          merged[k] = updateValue as any;
        }
      }
    }
    return merged;
  }
}

export const platformConfig = new ConfigManager();

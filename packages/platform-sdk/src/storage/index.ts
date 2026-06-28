export interface StorageProvider {
  get<T>(key: string): T | null;
  set<T>(key: string, value: T, ttl?: number): void;
  remove(key: string): void;
  clear(): void;
}

interface StorageItem<T> {
  value: T;
  expiry?: number;
}

export class MemoryStorage implements StorageProvider {
  private store: Map<string, StorageItem<any>> = new Map();

  get<T>(key: string): T | null {
    const item = this.store.get(key);
    if (!item) return null;
    if (item.expiry && Date.now() > item.expiry) {
      this.store.delete(key);
      return null;
    }
    return item.value as T;
  }

  set<T>(key: string, value: T, ttl?: number): void {
    const item: StorageItem<T> = { value };
    if (ttl) {
      item.expiry = Date.now() + ttl;
    }
    this.store.set(key, item);
  }

  remove(key: string): void {
    this.store.delete(key);
  }

  clear(): void {
    this.store.clear();
  }
}

export class BrowserStorage implements StorageProvider {
  private storage: Storage;
  private memoryFallback: MemoryStorage;

  constructor(type: 'local' | 'session') {
    this.memoryFallback = new MemoryStorage();
    try {
      this.storage = type === 'local' ? window.localStorage : window.sessionStorage;
      // Test availability
      const testKey = '__test__';
      this.storage.setItem(testKey, testKey);
      this.storage.removeItem(testKey);
    } catch (e) {
      console.warn(`Browser ${type} storage is not available, falling back to memory storage.`);
      this.storage = null as any;
    }
  }

  get<T>(key: string): T | null {
    if (!this.storage) return this.memoryFallback.get<T>(key);
    
    const raw = this.storage.getItem(key);
    if (!raw) return null;
    
    try {
      const item: StorageItem<T> = JSON.parse(raw);
      if (item.expiry && Date.now() > item.expiry) {
        this.storage.removeItem(key);
        return null;
      }
      return item.value;
    } catch (e) {
      return null;
    }
  }

  set<T>(key: string, value: T, ttl?: number): void {
    if (!this.storage) return this.memoryFallback.set(key, value, ttl);

    const item: StorageItem<T> = { value };
    if (ttl) {
      item.expiry = Date.now() + ttl;
    }
    
    try {
      this.storage.setItem(key, JSON.stringify(item));
    } catch (e) {
      console.warn(`Failed to set item in browser storage for key ${key}`, e);
    }
  }

  remove(key: string): void {
    if (!this.storage) return this.memoryFallback.remove(key);
    this.storage.removeItem(key);
  }

  clear(): void {
    if (!this.storage) return this.memoryFallback.clear();
    this.storage.clear();
  }
}

export class StorageService {
  public readonly local: StorageProvider;
  public readonly session: StorageProvider;
  public readonly memory: StorageProvider;

  constructor() {
    this.local = new BrowserStorage('local');
    this.session = new BrowserStorage('session');
    this.memory = new MemoryStorage();
  }
}

export const platformStorage = new StorageService();

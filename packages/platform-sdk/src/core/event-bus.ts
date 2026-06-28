export type EventCallback<T = any> = (payload: T, eventName: string) => void;

export interface EventOptions {
  priority?: number;
  once?: boolean;
}

interface Listener {
  callback: EventCallback;
  priority: number;
  once: boolean;
}

export class EventBus {
  private listeners: Map<string, Listener[]> = new Map();

  /**
   * Subscribe to an event.
   * Supports wildcards like 'user.*'
   */
  public subscribe<T = any>(event: string, callback: EventCallback<T>, options: EventOptions = {}): void {
    const { priority = 0, once = false } = options;
    const listener: Listener = { callback, priority, once };

    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }

    const eventListeners = this.listeners.get(event)!;
    eventListeners.push(listener);
    // Sort descending by priority
    eventListeners.sort((a, b) => b.priority - a.priority);
  }

  /**
   * Subscribe to an event exactly once.
   */
  public once<T = any>(event: string, callback: EventCallback<T>, priority: number = 0): void {
    this.subscribe(event, callback, { once: true, priority });
  }

  /**
   * Unsubscribe from an event.
   */
  public unsubscribe<T = any>(event: string, callback: EventCallback<T>): void {
    if (!this.listeners.has(event)) return;

    const eventListeners = this.listeners.get(event)!;
    const index = eventListeners.findIndex(l => l.callback === callback);
    
    if (index !== -1) {
      eventListeners.splice(index, 1);
    }

    if (eventListeners.length === 0) {
      this.listeners.delete(event);
    }
  }

  /**
   * Publish an event.
   * Automatically resolves wildcard listeners.
   */
  public publish<T = any>(event: string, payload: T): void {
    const matchingEvents = this.getMatchingEvents(event);
    
    for (const match of matchingEvents) {
      const eventListeners = this.listeners.get(match);
      if (!eventListeners) continue;

      // Iterate backwards to safely remove 'once' listeners during iteration
      for (let i = eventListeners.length - 1; i >= 0; i--) {
        const listener = eventListeners[i];
        
        try {
          listener.callback(payload, event);
        } catch (error) {
          console.error(`Error in event listener for ${event}:`, error);
        }

        if (listener.once) {
          eventListeners.splice(i, 1);
        }
      }

      if (eventListeners.length === 0) {
        this.listeners.delete(match);
      }
    }
  }

  private getMatchingEvents(event: string): string[] {
    const matches: string[] = [event];
    const parts = event.split('.');
    
    // Generate wildcards: 'user.login' -> 'user.*', '*.*'
    if (parts.length > 1) {
      for (let i = 1; i <= parts.length; i++) {
        const wildcard = [...parts.slice(0, parts.length - i), '*'].join('.');
        matches.push(wildcard);
      }
    }
    matches.push('*'); // Global wildcard

    return matches.filter(match => this.listeners.has(match));
  }

  /**
   * Clear all listeners
   */
  public clear(): void {
    this.listeners.clear();
  }
}

export const platformEventBus = new EventBus();

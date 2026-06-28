/**
 * Lametna WebSocket Client
 * Connects to Django Channels for real-time state synchronization.
 */

type MessageHandler = (data: any) => void;

class WebSocketClient {
  private socket: WebSocket | null = null;
  private url: string;
  private handlers: Map<string, MessageHandler[]> = new Map();
  private reconnectAttempts = 0;
  private maxReconnect = 5;

  constructor(url: string) {
    this.url = url;
  }

  connect() {
    const token = localStorage.getItem('access_token');
    const wsUrl = `${this.url}?token=${token}`;
    
    this.socket = new WebSocket(wsUrl);

    this.socket.onopen = () => {
      console.log(`[WebSocket] Connected to ${this.url}`);
      this.reconnectAttempts = 0;
    };

    this.socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        const type = data.type;
        const listeners = this.handlers.get(type) || [];
        listeners.forEach(fn => fn(data.payload));
      } catch (err) {
        console.error('[WebSocket] Parse Error:', err);
      }
    };

    this.socket.onclose = () => {
      console.warn(`[WebSocket] Disconnected from ${this.url}`);
      this.attemptReconnect();
    };
  }

  private attemptReconnect() {
    if (this.reconnectAttempts < this.maxReconnect) {
      this.reconnectAttempts++;
      setTimeout(() => this.connect(), 1000 * this.reconnectAttempts);
    }
  }

  subscribe(type: string, handler: MessageHandler) {
    if (!this.handlers.has(type)) {
      this.handlers.set(type, []);
    }
    this.handlers.get(type)?.push(handler);
  }

  unsubscribe(type: string, handler: MessageHandler) {
    const listeners = this.handlers.get(type);
    if (listeners) {
      this.handlers.set(type, listeners.filter(h => h !== handler));
    }
  }

  send(type: string, payload: any) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify({ type, payload }));
    } else {
      console.error('[WebSocket] Cannot send, not connected.');
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }
  }
}

// Singletons for global channels
const WS_BASE_URL = import.meta.env.VITE_WS_BASE_URL || 'ws://localhost:8000/ws';

export const globalWs = new WebSocketClient(`${WS_BASE_URL}/global/`);
export const matchWs = new WebSocketClient(`${WS_BASE_URL}/match/`);
export const partyWs = new WebSocketClient(`${WS_BASE_URL}/party/`);

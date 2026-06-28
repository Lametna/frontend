import { io, Socket, SocketOptions, ManagerOptions } from 'socket.io-client';
import { platformConfig } from '../config';
import { platformStorage } from '../storage';
import { platformEventBus } from '../core/event-bus';
import { SocketError } from '../core/errors';

export class SocketClient {
  private socket: Socket | null = null;
  private isConnecting = false;

  public connect(options?: Partial<ManagerOptions & SocketOptions>) {
    if (this.socket?.connected || this.isConnecting) return;

    this.isConnecting = true;
    const url = platformConfig.get('socket').url || window.location.origin;
    const token = platformStorage.local.get<string>('auth_token');

    this.socket = io(url, {
      autoConnect: false,
      reconnectionAttempts: platformConfig.get('socket').reconnectionAttempts,
      reconnectionDelay: platformConfig.get('socket').reconnectionDelay,
      auth: {
        token,
      },
      ...options,
    });

    this.setupListeners();
    this.socket.connect();
  }

  private setupListeners() {
    if (!this.socket) return;

    this.socket.on('connect', () => {
      this.isConnecting = false;
      platformEventBus.publish('socket.connected', { id: this.socket?.id });
    });

    this.socket.on('disconnect', (reason) => {
      platformEventBus.publish('socket.disconnected', { reason });
    });

    this.socket.on('connect_error', (error) => {
      this.isConnecting = false;
      platformEventBus.publish('socket.error', new SocketError(error.message));
    });

    // Universal message listener bridging to EventBus
    this.socket.onAny((event, ...args) => {
      platformEventBus.publish(`socket.message.${event}`, args[0]);
    });
  }

  public disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  public emit(event: string, data: any, callback?: Function) {
    if (!this.socket || !this.socket.connected) {
      // Could implement offline queuing for socket here
      console.warn('Socket not connected. Message not sent:', event);
      return;
    }

    if (callback) {
      this.socket.emit(event, data, callback);
    } else {
      this.socket.emit(event, data);
    }
  }

  public subscribe(event: string, callback: (...args: any[]) => void) {
    if (!this.socket) {
      throw new SocketError('Socket is not initialized');
    }
    this.socket.on(event, callback);
  }

  public unsubscribe(event: string, callback?: (...args: any[]) => void) {
    if (!this.socket) return;
    if (callback) {
      this.socket.off(event, callback);
    } else {
      this.socket.off(event);
    }
  }
}

export const platformSocket = new SocketClient();

import axios, { AxiosInstance, AxiosRequestConfig, AxiosError, InternalAxiosRequestConfig } from 'axios';
import { platformConfig } from '../config';
import { platformStorage } from '../storage';
import { ApiError, NetworkError, AuthenticationError } from '../core/errors';
import { platformEventBus } from '../core/event-bus';
import { ApiResponse } from '../types';

export interface ApiClientOptions {
  baseURL?: string;
  timeout?: number;
  headers?: Record<string, string>;
}

export class ApiClient {
  private client: AxiosInstance;
  private isOffline = !navigator.onLine;
  private offlineQueue: Array<{ config: AxiosRequestConfig; resolve: Function; reject: Function }> = [];

  constructor(options: ApiClientOptions = {}) {
    this.client = axios.create({
      baseURL: options.baseURL || platformConfig.get('api').baseUrl,
      timeout: options.timeout || platformConfig.get('api').timeout,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    this.setupInterceptors();
    this.setupOfflineHandling();
  }

  private setupInterceptors() {
    this.client.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const token = platformStorage.local.get<string>('auth_token');
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    this.client.interceptors.response.use(
      (response) => {
        // Assume all our responses follow ApiResponse format, or just return data directly
        return response.data;
      },
      async (error: AxiosError) => {
        const originalRequest = error.config;

        if (!error.response && this.isOffline && originalRequest) {
          // Network error or offline
          return this.enqueueOfflineRequest(originalRequest);
        }

        if (error.response?.status === 401) {
          platformEventBus.publish('auth.unauthorized', { error });
          throw new AuthenticationError('Session expired');
        }

        if (error.response) {
          const status = error.response.status;
          const data: any = error.response.data;
          throw new ApiError(data?.error?.message || error.message, status, data?.error?.details);
        }

        throw new NetworkError(error.message);
      }
    );
  }

  private setupOfflineHandling() {
    window.addEventListener('online', () => {
      this.isOffline = false;
      this.processOfflineQueue();
      platformEventBus.publish('network.online', {});
    });

    window.addEventListener('offline', () => {
      this.isOffline = true;
      platformEventBus.publish('network.offline', {});
    });
  }

  private enqueueOfflineRequest(config: AxiosRequestConfig) {
    return new Promise((resolve, reject) => {
      this.offlineQueue.push({ config, resolve, reject });
    });
  }

  private async processOfflineQueue() {
    while (this.offlineQueue.length > 0) {
      const request = this.offlineQueue.shift();
      if (request) {
        try {
          const result = await this.client(request.config);
          request.resolve(result);
        } catch (error) {
          request.reject(error);
        }
      }
    }
  }

  public async get<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    return this.client.get(url, config);
  }

  public async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    return this.client.post(url, data, config);
  }

  public async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    return this.client.put(url, data, config);
  }

  public async patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    return this.client.patch(url, data, config);
  }

  public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    return this.client.delete(url, config);
  }
}

export const platformApi = new ApiClient();

export interface ApiResponse<T = any> {
  data: T;
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
  };
}

export interface ApiErrorResponse {
  error: {
    code: string;
    message: string;
    details?: any;
  };
}

export interface SocketMessage<T = any> {
  event: string;
  payload: T;
  timestamp: string;
}

export interface Error {
  code: string;
  message: string;
  stack?: string;
}

export interface Event<T = any> {
  type: string;
  payload: T;
  timestamp: number;
}

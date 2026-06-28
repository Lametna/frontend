export class BaseError extends Error {
  public readonly code: string;
  public readonly details?: any;

  constructor(message: string, code: string, details?: any) {
    super(message);
    this.name = this.constructor.name;
    this.code = code;
    this.details = details;
    Object.setPrototypeOf(this, new.target.prototype); // Restore prototype chain
  }
}

export class ApplicationError extends BaseError {
  constructor(message: string, details?: any) {
    super(message, 'APP_ERROR', details);
  }
}

export class ApiError extends BaseError {
  public readonly status: number;

  constructor(message: string, status: number, details?: any) {
    super(message, 'API_ERROR', details);
    this.status = status;
  }
}

export class SocketError extends BaseError {
  constructor(message: string, details?: any) {
    super(message, 'SOCKET_ERROR', details);
  }
}

export class ValidationError extends BaseError {
  constructor(message: string, details?: any) {
    super(message, 'VALIDATION_ERROR', details);
  }
}

export class AuthenticationError extends BaseError {
  constructor(message: string = 'Not authenticated') {
    super(message, 'AUTH_ERROR');
  }
}

export class PermissionError extends BaseError {
  constructor(message: string = 'Permission denied') {
    super(message, 'PERMISSION_ERROR');
  }
}

export class NetworkError extends BaseError {
  constructor(message: string = 'Network error occurred') {
    super(message, 'NETWORK_ERROR');
  }
}

type ErrorHandler = (error: Error) => void;

export class GlobalErrorHandler {
  private handlers: ErrorHandler[] = [];

  public register(handler: ErrorHandler): void {
    this.handlers.push(handler);
  }

  public unregister(handler: ErrorHandler): void {
    this.handlers = this.handlers.filter(h => h !== handler);
  }

  public handleError(error: unknown): void {
    const normalizedError = error instanceof Error ? error : new BaseError(String(error), 'UNKNOWN_ERROR');
    
    if (this.handlers.length === 0) {
      console.error('[Unhandled Error]', normalizedError);
      return;
    }

    this.handlers.forEach(handler => {
      try {
        handler(normalizedError);
      } catch (handlerError) {
        console.error('Error in error handler:', handlerError);
      }
    });
  }
}

export const globalErrorHandler = new GlobalErrorHandler();

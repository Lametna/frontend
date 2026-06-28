export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
  NONE = 4
}

export interface LoggerOptions {
  level?: LogLevel;
  prefix?: string;
  enableTimestamps?: boolean;
}

export class Logger {
  private level: LogLevel;
  private prefix: string;
  private enableTimestamps: boolean;

  constructor(options: LoggerOptions = {}) {
    this.level = options.level ?? LogLevel.INFO;
    this.prefix = options.prefix ? `[${options.prefix}] ` : '';
    this.enableTimestamps = options.enableTimestamps ?? true;
  }

  public setLevel(level: LogLevel): void {
    this.level = level;
  }

  private formatMessage(message: string): string {
    const timestamp = this.enableTimestamps ? `[${new Date().toISOString()}] ` : '';
    return `${timestamp}${this.prefix}${message}`;
  }

  public debug(message: string, ...args: any[]): void {
    if (this.level <= LogLevel.DEBUG) {
      console.debug(this.formatMessage(message), ...args);
    }
  }

  public info(message: string, ...args: any[]): void {
    if (this.level <= LogLevel.INFO) {
      console.info(this.formatMessage(message), ...args);
    }
  }

  public warn(message: string, ...args: any[]): void {
    if (this.level <= LogLevel.WARN) {
      console.warn(this.formatMessage(message), ...args);
    }
  }

  public error(message: string, error?: unknown, ...args: any[]): void {
    if (this.level <= LogLevel.ERROR) {
      console.error(this.formatMessage(message), error, ...args);
    }
  }

  public clone(prefix: string): Logger {
    return new Logger({
      level: this.level,
      prefix: this.prefix ? `${this.prefix.trim()}][${prefix}` : prefix,
      enableTimestamps: this.enableTimestamps
    });
  }
}

// Global default logger
export const logger = new Logger({
  level: process.env.NODE_ENV === 'production' ? LogLevel.ERROR : LogLevel.DEBUG,
  prefix: 'PlatformSDK'
});

import { BaseService } from './base';

export class TelemetryService extends BaseService {
  constructor() {
    super('TelemetryService');
  }

  public recordPerformance(metricName: string, durationMs: number): void {
    this.logger.debug(`Performance: ${metricName} took ${durationMs}ms`);
    // Optional: send to backend if slow
  }

  public recordError(error: Error, context?: any): void {
    this.api.post('/telemetry/errors', { 
      message: error.message, 
      stack: error.stack, 
      context 
    }).catch(() => {});
  }
}

export const telemetryService = new TelemetryService();

import { platformApi, ApiClient } from '../api';
import { platformSocket, SocketClient } from '../socket';
import { platformEventBus, EventBus } from '../core/event-bus';
import { logger, Logger } from '../core/logging';

export abstract class BaseService {
  protected api: ApiClient = platformApi;
  protected socket: SocketClient = platformSocket;
  protected events: EventBus = platformEventBus;
  protected logger: Logger;

  constructor(serviceName: string) {
    this.logger = logger.clone(serviceName);
  }
}

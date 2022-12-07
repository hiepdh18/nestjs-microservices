import { Transport } from '@nestjs/microservices';
import { queues } from './common/constant/constants';
import { RABBIT_URL } from './common/constant/envConstants';

export class ConfigService {
  private readonly envConfig: { [key: string]: any } = null;

  constructor() {
    this.envConfig = {};

    this.envConfig.authService = {
      options: {
        urls: [RABBIT_URL],
        queue: queues.authQueue,
        queueOptions: {
          durable: false,
        },
      },
      transport: Transport.RMQ,
    };
    this.envConfig.userService = {
      options: {
        urls: [RABBIT_URL],
        queue: queues.userQueue,
        queueOptions: {
          durable: false,
        },
      },
      transport: Transport.RMQ,
    };
  }

  get(key: string): any {
    return this.envConfig[key];
  }
}

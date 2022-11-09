import { Transport } from '@nestjs/microservices';
import { queues, rabbitURL } from '../../common/constant/constants';

export class ConfigService {
  private readonly envConfig: { [key: string]: any } = null;

  constructor() {
    this.envConfig = {};

    this.envConfig.authService = {
      options: {
        urls: [rabbitURL],
        queue: queues.authQueue,
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

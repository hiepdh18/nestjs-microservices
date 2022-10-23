import { Transport } from '@nestjs/microservices';
import { queues, rabbitURL } from 'src/common/constant/constants';

export class ConfigService {
  private readonly envConfig: { [key: string]: any } = null;

  constructor() {
    this.envConfig = {};

    this.envConfig.userService = {
      options: {
        urls: [rabbitURL],
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

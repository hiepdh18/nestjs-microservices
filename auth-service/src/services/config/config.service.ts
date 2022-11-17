import { Transport } from '@nestjs/microservices';
import { RABBIT_URL } from 'src/common/constant/envConstants';
import { queues } from '../../common/constant/constants';

export class ConfigService {
  private readonly envConfig: { [key: string]: any } = null;

  constructor() {
    this.envConfig = {};

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

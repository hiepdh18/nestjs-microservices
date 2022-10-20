import { Transport } from '@nestjs/microservices';

export class ConfigService {
  private readonly envConfig: { [key: string]: any } = null;

  constructor() {
    this.envConfig = {};
    this.envConfig.userService = {
      options: {
        client: {
          clientId: 'user',
          brokers: ['localhost:9091', 'localhost:9092', 'localhost:9093'],
        },
        consumer: {
          groupId: 'user-consumer',
        },
      },
      transport: Transport.KAFKA,
    };

    // this.envConfig.userService = {
    //   options: {
    //     urls: ['amqp://localhost:5672'],
    //     queue: 'user_queue',
    //     queueOptions: {
    //       durable: false,
    //     },
    //   },
    //   transport: Transport.RMQ,
    // };
  }

  get(key: string): any {
    return this.envConfig[key];
  }
}

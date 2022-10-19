import { Transport } from '@nestjs/microservices';

export class ConfigService {
  private readonly envConfig: { [key: string]: any } = null;

  constructor() {
    this.envConfig = {};
    // this.envConfig.userService = {
    //   options: {
    //     client: {
    //       clientId: 'user',
    //       brokers: ['localhost:9092'],
    //     },
    //     consumer: {
    //       groupId: 'user-consumer',
    //     },
    //   },
    //   transport: Transport.KAFKA,
    // };
    // this.envConfig.authService = {
    //   options: {
    //     client: {
    //       clientId: 'auth',
    //       brokers: ['localhost:9092'],
    //     },
    //     consumer: {
    //       groupId: 'auth-consumer',
    //     },
    //   },
    //   transport: Transport.KAFKA,
    // };

    this.envConfig.authService = {
      options: {
        urls: ['amqp://localhost:5672'],
        queue: 'auth_queue',
        queueOptions: {
          durable: false,
        },
      },
      transport: Transport.RMQ,
    };
    this.envConfig.userService = {
      options: {
        urls: ['amqp://localhost:5672'],
        queue: 'user_queue',
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

import { Transport } from '@nestjs/microservices';

export class ConfigService {
  private readonly envConfig: { [key: string]: any } = null;

  constructor() {
    this.envConfig = {
      // port: process.env.USER_SERVICE_PORT,
    };
    // this.envConfig.baseUri = process.env.BASE_URI;
    // this.envConfig.gatewayPort = process.env.API_GATEWAY_PORT;
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
  }

  get(key: string): any {
    return this.envConfig[key];
  }
}

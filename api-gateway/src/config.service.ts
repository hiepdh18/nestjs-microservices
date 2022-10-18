import { Transport } from '@nestjs/microservices';

export class ConfigService {
  private readonly envConfig: { [key: string]: any } = null;

  constructor() {
    this.envConfig = {
      // port: process.env.USER_SERVICE_PORT,
    };
    // this.envConfig.baseUri = process.env.BASE_URI;
    // this.envConfig.gatewayPort = process.env.API_GATEWAY_PORT;
    this.envConfig.userService = {
      options: {
        client: {
          brokers: ['localhost:9092'],
        },
        consumer: {
          groupId: 'user-consumer',
        },
      },
      transport: Transport.KAFKA,
    };
  }

  get(key: string): any {
    return this.envConfig[key];
  }
}
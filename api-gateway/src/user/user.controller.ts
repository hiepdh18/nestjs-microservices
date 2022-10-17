import { Body, Controller, Get, Post } from '@nestjs/common';
import { Client, ClientKafka, Transport } from '@nestjs/microservices';

@Controller('user')
export class UserController {
  @Client({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'user',
        brokers: ['localhost:9092'],
      },
      consumer: {
        groupId: 'user-consumer',
      },
    },
  })
  client: ClientKafka;

  async onModuleInit() {
    this.client.subscribeToResponseOf('create.user');
    this.client.subscribeToResponseOf('get.user.list');

    await this.client.connect();
  }

  @Post('/')
  async createUser(@Body() user) {
    return await this.client.send('create.user', user);
  }

  @Get('/')
  getList() {
    return this.client.send('get.user.list', '');
  }
}

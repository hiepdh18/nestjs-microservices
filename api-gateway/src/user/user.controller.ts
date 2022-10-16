import { Body, Controller, Get, Post } from '@nestjs/common';
import { Client, ClientKafka, Transport } from '@nestjs/microservices';
import { IUser } from './interfaces/user.interface';

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
  createUser(@Body() user: any) {
    console.log(user);
    const test = this.client.send('create.user', user);
    return test;
  }

  @Get('/')
  getList() {
    return this.client.send('get.user.list', '');
  }
}

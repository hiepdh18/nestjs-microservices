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
    this.client.subscribeToResponseOf('add.new.user');
    this.client.subscribeToResponseOf('get.user.list');

    await this.client.connect();
  }

  @Post('/')
  createUser(@Body() user: IUser) {
    console.log(user);
    return this.client.send('add.new.user', user);
  }

  @Get('/')
  getList() {
    return this.client.send('get.user.list', '');
  }
}

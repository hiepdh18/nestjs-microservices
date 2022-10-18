import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { Client, ClientKafka, Transport } from '@nestjs/microservices';

@Controller('user')
export class UserController {

  constructor(
    
    @Inject('USER_SERVICE') private client: ClientKafka,
  ) { }

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

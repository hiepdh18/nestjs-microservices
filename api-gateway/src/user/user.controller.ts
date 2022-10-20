import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Controller('user')
export class UserController {
  constructor(
    @Inject('USER_SERVICE') private readonly userService: ClientKafka,
  ) {}

  async onModuleInit() {
    this.userService.subscribeToResponseOf('create.user');
    this.userService.subscribeToResponseOf('get.users');

    await this.userService.connect();
  }

  @Post('/')
  async createUser(@Body() user) {
    return await this.userService.send('create.user', user);
  }

  @Get('/')
  getList() {
    return this.userService.send('get.users', '');
  }
}

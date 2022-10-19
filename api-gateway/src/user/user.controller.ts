import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ClientRMQ } from '@nestjs/microservices';

@Controller('user')
export class UserController {
  constructor(
    @Inject('USER_SERVICE') private readonly userService: ClientRMQ,
  ) {}

  @Post('/')
  async createUser(@Body() user) {
    return await this.userService.send('create.user', user);
  }

  @Get('/')
  getList() {
    return this.userService.send('get.users', '');
  }
}

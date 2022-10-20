import { Body, Controller, Get, Inject, Patch, Post } from '@nestjs/common';
import { ClientRMQ } from '@nestjs/microservices';
import { IUser } from './interfaces/user.interface';

@Controller('user')
export class UserController {
  constructor(
    @Inject('USER_SERVICE') private readonly userService: ClientRMQ,
  ) {}

  @Post('/')
  async createUser(@Body() user: IUser) {
    return await this.userService.send('create.user', user);
  }

  @Patch('/')
  async updateUser(@Body() user: IUser) {
    return await this.userService.send('update.user', user);
  }

  @Get('/')
  getList() {
    return this.userService.send('get.users', '');
  }
}

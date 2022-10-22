import { Body, Controller, Get, Inject, Patch, Post } from '@nestjs/common';
import { ClientRMQ } from '@nestjs/microservices';
import { services } from 'src/common/constant/constants';
import { IUpdateUser } from './interfaces/updateUser.interface';
import { IUser } from './interfaces/user.interface';

@Controller('user')
export class UserController {
  constructor(
    @Inject(services.userService) private readonly userService: ClientRMQ,
  ) {}

  @Post('/')
  async createUser(@Body() user: IUser) {
    return await this.userService.send('create.user', user);
  }

  @Patch('/')
  async updateUser(@Body() data: IUpdateUser) {
    return await this.userService.send('update.user', data);
  }

  @Get('/')
  getList() {
    return this.userService.send('get.users', '');
  }
}

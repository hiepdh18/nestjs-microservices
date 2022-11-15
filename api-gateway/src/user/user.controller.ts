import { Body, Controller, Get, Inject, Patch, Post } from '@nestjs/common';
import { ClientRMQ } from '@nestjs/microservices';
import { timeout } from 'rxjs';
import { services } from './../common/constant/constants';
import { UpdateUserDto } from './dtos/updateUser.dto';
import { UserDto } from './dtos/user.dto';

@Controller('user')
export class UserController {
  constructor(
    @Inject(services.userService) private readonly userService: ClientRMQ,
  ) {}

  @Post('/')
  async createUser(@Body() user: UserDto) {
    return await this.userService.send('create.user', user).pipe(timeout(5000));
  }

  @Patch('/')
  async updateUser(@Body() data: UpdateUserDto) {
    return await this.userService.send('update.user', data).pipe(timeout(5000));
  }

  @Get('/')
  getList() {
    return this.userService.send('get.users', '').pipe(timeout(5000));
  }
}

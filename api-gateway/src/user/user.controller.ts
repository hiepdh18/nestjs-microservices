import { AuthGuard } from './../guards/authguard';
import {
  Body,
  Controller,
  Get,
  Inject,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ClientRMQ } from '@nestjs/microservices';
// import { AuthGuard } from '@nestjs/passport';
// import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';
import { timeout } from 'rxjs';
import { services } from './../common/constant/constants';
import { UpdateUserDto } from './dtos/updateUser.dto';
import { UserDto } from './dtos/user.dto';

@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(
    @Inject(services.userService) private readonly userService: ClientRMQ,
    @Inject(services.authService) private readonly authService: ClientRMQ,
  ) {}

  @Post('/')
  async createUser(@Body() user: UserDto) {
    return await this.userService.send('create_user', user).pipe(timeout(5000));
  }

  @Patch('/')
  async updateUser(@Body() data: UpdateUserDto) {
    return await this.userService.send('update_user', data).pipe(timeout(5000));
  }

  @Get('/')
  async getList() {
    return await this.userService.send('get_users', '').pipe(timeout(5000));
  }

  @UseGuards(AuthGuard)
  @Get('/greet')
  greet(): string | Promise<string> {
    return `Greetings authenticated user`;
  }
  @Get('/test')
  async test(): Promise<any> {
    const res = await this.authService
      .send({ role: 'auth', cmd: 'check' }, { jwt: 'hello' })
      .pipe();
    // const res = await lastValueFrom(
    //   this.authService
    //     .send({ role: 'auth', cmd: 'check' }, { jwt: 'hello' })
    //     .pipe(),
    // );

    console.log(`🔥🔥🔥 => UserController => test => res`, res);
    return res;
  }
}

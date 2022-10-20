import { ILogin } from './interfaces/login.interface';
import { ClientKafka } from '@nestjs/microservices';
import { Body, Controller, Inject, Post, OnModuleInit } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(@Inject('AUTH_SERVICE') private authService: ClientKafka) {}

  async onModuleInit() {
    this.authService.subscribeToResponseOf('login.password');

    await this.authService.connect();
  }

  @Post('/password-login')
  async passwordLogin(@Body() body: ILogin) {
    return await this.authService.send('login.password', body);
  }
}

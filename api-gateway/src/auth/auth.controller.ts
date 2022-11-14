import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientRMQ } from '@nestjs/microservices';
import { services } from '../common/constant/constants';
import { ILogin } from './interfaces/login.interface';

@Controller('auth')
export class AuthController {
  constructor(@Inject(services.authService) private authService: ClientRMQ) {}

  @Post('/login')
  async login(@Body() body: ILogin) {
    return await this.authService.send('login', body);
  }
}

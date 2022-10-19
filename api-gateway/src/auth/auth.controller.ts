import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientRMQ } from '@nestjs/microservices';
import { ILogin } from './interfaces/login.interface';

@Controller('auth')
export class AuthController {
  constructor(@Inject('AUTH_SERVICE') private authService: ClientRMQ) {}

  @Post('/password-login')
  async passwordLogin(@Body() body: ILogin) {
    return await this.authService.send('login.password', body);
  }
}

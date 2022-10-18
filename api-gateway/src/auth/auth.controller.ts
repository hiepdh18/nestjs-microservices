import { ClientKafka } from '@nestjs/microservices';
import { Body, Controller, Inject, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(@Inject('AUTH_SERVICE') private authService: ClientKafka) {}

  async onModuleInit() {
    this.authService.subscribeToResponseOf('login.password');

    await this.authService.connect();
  }

  @Post('/password-login')
  async passwordLogin(@Body() body) {
    return await this.authService.send('login.password', {
      email: body.email,
      password: body.password,
    });
  }
}

import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ILogin } from './interfaces/login.interface';
import { AuthService } from './services/auth.service';

@Controller('auth')
export class AppController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern('login')
  async login(@Payload() data: ILogin) {
    return await this.authService.login(data);
  }
}

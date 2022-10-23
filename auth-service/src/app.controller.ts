import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ILogin } from './interfaces/login.interface';
import { AuthService } from './services/auth.service';

@Controller('auth')
export class AppController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern('login.password')
  async passwordLogin(@Payload() data: ILogin) {
    return await this.authService.passwordLogin(data);
  }
}

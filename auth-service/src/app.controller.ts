import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { LoginDto } from './dtos/longin.dto';
import { ILogin } from './interfaces/login.interface';
import { AuthService } from './services/auth.service';

@Controller('auth')
export class AppController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern('login')
  async login(@Payload() data: LoginDto) {
    return await this.authService.login(data);
  }
}

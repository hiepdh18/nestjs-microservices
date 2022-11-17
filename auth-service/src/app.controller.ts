import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { BackendLogger } from './common/logger/backend-logger';
import { LoginDto } from './dtos/longin.dto';
import { AuthService } from './services/auth.service';

@Controller('auth')
export class AppController {
  private readonly logger = new BackendLogger(AppController.name);
  constructor(private readonly authService: AuthService) {}

  @MessagePattern({ role: 'auth', cmd: 'login' })
  async login(@Payload() data: LoginDto) {
    return await this.authService.login(data);
  }

  @MessagePattern({ role: 'auth', cmd: 'check' })
  async checkJWT(@Payload() data: any) {
    try {
      return await this.authService.validateToken(data.jwt);
    } catch (e) {
      this.logger.log(e);
      return false;
    }
  }
}

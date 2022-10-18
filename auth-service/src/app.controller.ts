import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AuthService } from './services/auth.service';

@Controller('auth')
export class AppController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern('login.password')
  async passwordLogin(@Payload() message) {
    return { name: 'hiep' };
  }
}

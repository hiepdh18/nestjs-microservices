import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AuthService } from './services/auth.service';

@Controller('auth')
export class AppController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern('login.password')
  async passwordLogin(@Payload() body) {
    // const user = { name: 'hiep' };
    const user = await this.authService.findUser(body);
    console.log(`🔥🔥🔥 => AppController => passwordLogin => user`, user);

    return user;
  }
}

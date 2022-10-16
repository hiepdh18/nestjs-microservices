import { Controller } from '@nestjs/common';
import {
  MessagePattern,
  Payload,
  KafkaContext,
  Ctx,
} from '@nestjs/microservices';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @MessagePattern('auth.login')
  getUsers() {
    return this.authService.testAuth();
  }

  @MessagePattern('add.new.user')
  addUser(@Payload() message: any, @Ctx() context: KafkaContext) {
    console.log(message);
    console.log(context);
    return 'this.userService.addUser(message.value)';
  }
}

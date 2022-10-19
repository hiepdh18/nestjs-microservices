import { Controller } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserService } from './services/user.service';

@Controller('user')
export class AppController {
  constructor(private userService: UserService) {}

  @MessagePattern('create.user')
  async createUser(
    @Payload() message: CreateUserDto,
    @Ctx() context: RmqContext,
  ) {
    return await this.userService.createUser(message);
  }

  @MessagePattern('get.users')
  async getUsers() {
    return await this.userService.findAllUser();
  }

  @MessagePattern('get.user')
  async getUser(@Payload() opts) {
    return await this.userService.findOneUser(opts);
  }
}

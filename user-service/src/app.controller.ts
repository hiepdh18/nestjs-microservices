import { Controller, OnModuleInit } from '@nestjs/common';
import {
  Ctx,
  KafkaContext,
  MessagePattern,
  Payload,
} from '@nestjs/microservices';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserService } from './services/user.service';

@Controller('user')
export class AppController {
  constructor(private userService: UserService) {}

  @MessagePattern('create.user')
  async createUser(
    @Payload() message: CreateUserDto,
    @Ctx() context: KafkaContext,
  ) {
    const res = await this.userService.createUser(message);
    console.log(res);

    return JSON.stringify(res);
  }

  @MessagePattern('get.users')
  async getUsers() {
    return await this.userService.findAllUser();
  }

  @MessagePattern('get.user')
  async getUser(@Payload() message) {
    console.log(`🔥🔥🔥 => AppController => getUser => message`, message);
    return JSON.stringify({ name: 'hiep' });
    // return await this.userService.findOneUser(message);
  }
}

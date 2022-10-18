import { Controller, Get } from '@nestjs/common';
import { Ctx, KafkaContext, MessagePattern, Payload } from '@nestjs/microservices';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserReturnDto } from './dtos/user-return.dto';
import { UserService } from './services/user.service';

@Controller('user')
export class AppController {
  constructor(private userService: UserService) { }

  @MessagePattern('get.user.list')
  getUsers() {
    return this.userService.getList();
  }

  @MessagePattern('create.user')
  async createUser(@Payload() message: CreateUserDto, @Ctx() context: KafkaContext) {
    return await this.userService.createUser(message);
  }
}

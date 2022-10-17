import { CreateUserDto } from './dtos/create-user.dto';
import { Controller } from '@nestjs/common';
import {
  Ctx,
  KafkaContext,
  MessagePattern,
  Payload,
} from '@nestjs/microservices';
import { IKafkaMessage } from 'src/interfaces/kafka-message.interface';
import { IUser } from './interfaces/user.interface';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @MessagePattern('get.user.list')
  getUsers() {
    return this.userService.getList();
  }

  @MessagePattern('create.user')
  async createUser(@Payload() message: CreateUserDto, @Ctx() context: KafkaContext) {
    const a = await this.userService.createUser(message);
    console.log('test', a)
    return a;
  }
}

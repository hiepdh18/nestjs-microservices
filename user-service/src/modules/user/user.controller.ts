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
  addUser(@Payload() message: CreateUserDto, @Ctx() context: KafkaContext) {
    console.log(message);
    console.log(context);
    return this.userService.createUser(message);
  }
}

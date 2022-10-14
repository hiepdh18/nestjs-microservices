import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { IKafkaMessage } from 'src/interfaces/kafka-message.interface';
import { IUser } from './interfaces/user.interface';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) { }

  @MessagePattern('get.user.list')
  getUsers() {
    return this.userService.getList();
  }

  @MessagePattern('add.new.user')
  addUser(@Payload() message: IKafkaMessage<IUser>) {
    console.log(message.value)
    return this.userService.addUser(message.value);
  }
}

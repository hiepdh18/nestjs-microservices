import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { IKafkaMessage } from 'src/interfaces/kafka-message.interface';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) { }

  @MessagePattern('get.user.list')
  getUsers() {
    return this.userService.getList();
  }

  @MessagePattern('add.new.user')
  addUser(@Payload() message: IKafkaMessage<any>) {
    console.log(message.value)
    return this.userService.addUser(message.value);
  }
}

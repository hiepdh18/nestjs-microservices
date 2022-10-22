import { Controller } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserReturnDto } from './dtos/user-return.dto';
import { IUpdateUser } from './interfaces/updateUser.interface';
import { UserService } from './services/user.service';

@Controller('user')
export class AppController {
  constructor(private userService: UserService) {}

  @MessagePattern('create.user')
  async createUser(
    @Payload() message: CreateUserDto,
    @Ctx() context: RmqContext,
  ) {
    console.log(`🔥🔥🔥 => AppController => message`, message);
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

  @MessagePattern('update.user')
  async updateUser(
    @Payload() data: IUpdateUser,
    // @Ctx() context: RmqContext,
  ): Promise<UserReturnDto> {
    console.log(`🔥🔥🔥 => AppController => data`, data);
    const { id, user } = data;
    return await this.userService.updateUser(id, user);
  }
}

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

  @MessagePattern('create_user')
  async createUser(@Payload() message: CreateUserDto) {
    return await this.userService.createUser(message);
  }

  @MessagePattern('get_users')
  async getUsers() {
    return await this.userService.findAllUser();
  }

  @MessagePattern('get_user')
  async getUser(@Payload() opts) {
    return await this.userService.findOneUser(opts);
  }

  @MessagePattern('get_user_by_email')
  async getUserByEmail(@Payload() email) {
    return await this.userService.findOneUser({ email });
  }

  @MessagePattern('update_user')
  async updateUser(
    @Payload() data: IUpdateUser,
    // @Ctx() context: RmqContext,
  ): Promise<UserReturnDto> {
    const { id, user } = data;
    return await this.userService.updateUser(id, user);
  }
}

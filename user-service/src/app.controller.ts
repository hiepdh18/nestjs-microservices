import { Controller } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { BackendLogger } from './common/logger/backend-logger';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserReturnDto } from './dtos/user-return.dto';
import { UserService } from './services/user.service';

@Controller('user')
export class AppController {
  private readonly logger = new BackendLogger(AppController.name);

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
    @Payload() data,
    @Ctx() context: RmqContext,
  ): Promise<UserReturnDto> {
    return await this.userService.updateUser(data);
  }
}

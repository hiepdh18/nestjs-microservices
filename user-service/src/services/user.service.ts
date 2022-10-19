import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/dtos/create-user.dto';
import { UserReturnDto } from 'src/dtos/user-return.dto';
import { UserRepository } from 'src/repositories/user.repository';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    // @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    // private readonly userRepository: UserRepository,
    @Inject('AUTH_SERVICE') private client: ClientKafka,
  ) {
    console.log(`🔥🔥🔥 => UserService => userRepository`, userRepository);
  }

  async onModuleInit() {
    this.client.subscribeToResponseOf('auth.login');

    await this.client.connect();
  }

  async createUser(user: CreateUserDto): Promise<UserReturnDto> {
    try {
      const newUser = await this.userRepository.create(user);
      const res = await this.userRepository.save(newUser);

      return new UserReturnDto(res);
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAllUser(): Promise<UserReturnDto[]> {
    try {
      const users = await this.userRepository.find({
        select: ['email', 'name'],
      });
      return users.map((user) => new UserReturnDto(user));
    } catch (error) {
      throw new Error(error);
    }
  }

  async findOneUser(opts): Promise<UserReturnDto> {
    try {
      const user = await this.userRepository.findOne(opts);
      return new UserReturnDto(user);
    } catch (error) {}
  }
}

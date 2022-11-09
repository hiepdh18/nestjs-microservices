import { Inject, Injectable } from '@nestjs/common';
import { ClientRMQ } from '@nestjs/microservices';
import { services } from '../common/constant/constants';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UserReturnDto } from '../dtos/user-return.dto';
import { UserRepository } from '../repositories/user.repository';
import { DataSource } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly dataSource: DataSource,
    @Inject(services.authService) private authService: ClientRMQ,
  ) {}

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
        select: ['email', 'name', 'id'],
      });
      return users.map((user) => new UserReturnDto(user));
    } catch (error) {
      throw new Error(error);
    }
  }

  async findOneUser(opts): Promise<UserReturnDto> {
    try {
      const user = await this.userRepository.findOneBy(opts);
      console.log(`🔥🔥🔥 => UserService => findOneUser => user`, user);
      return new UserReturnDto(user);
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateUser(id: string, opts: any): Promise<UserReturnDto> {
    if (!id) throw new Error();
    const user = await this.userRepository.findOneBy({ id });
    const newUser = await this.userRepository.save({ ...user, ...opts });

    // const user = await this.userRepository.findOneBy({ id: data.id });
    return new UserReturnDto(newUser);
  }
}

import { IUpdateUser } from './../../../api-gateway/src/user/interfaces/updateUser.interface';
import { Inject, Injectable } from '@nestjs/common';
import { ClientRMQ } from '@nestjs/microservices';
import { CreateUserDto } from 'src/dtos/create-user.dto';
import { UserReturnDto } from 'src/dtos/user-return.dto';
import { User } from 'src/entities/user.entity';
import { UserRepository } from 'src/repositories/user.repository';
import { DataSource } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly dataSource: DataSource,
    @Inject('AUTH_SERVICE') private authService: ClientRMQ,
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
      return new UserReturnDto(user);
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateUser(id: string, opts: any): Promise<UserReturnDto> {
    if (!id) throw new Error();
    // const user = await this.userRepository.findOneBy({ id });
    // const newUser = this.userRepository.save({ ...user, ...opts });

    // const user = await this.userRepository.findOneBy({ id: data.id });
    return new UserReturnDto({});
  }
}

import { Inject, Injectable } from '@nestjs/common';
import { ClientRMQ, RpcException } from '@nestjs/microservices';
import { DataSource } from 'typeorm';
import { services } from '../common/constant/constants';
import { UserReturnDto } from '../dtos/user-return.dto';
import { IUser } from '../interfaces/user.interface';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly dataSource: DataSource,
    @Inject(services.authService) private authService: ClientRMQ,
  ) {}

  async createUser(user: IUser): Promise<UserReturnDto> {
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
    if (!id) throw new RpcException({ code: 422, message: 'id is required' });
    const user = await this.userRepository.findOneBy({ id });
    if (!user)
      throw new RpcException({ status: 422, message: 'User does not exist!' });
    const newUser = await this.userRepository.save({ ...user, ...opts });

    // const user = await this.userRepository.findOneBy({ id: data.id });
    return new UserReturnDto(newUser);
  }
}

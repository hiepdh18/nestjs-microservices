import { Inject, Injectable } from '@nestjs/common';
import { Client, ClientKafka, Transport } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from 'src/dtos/create-user.dto';
import { UserReturnDto } from 'src/dtos/user-return.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @Inject('AUTH_SERVICE') private client: ClientKafka,
  ) { }

  async onModuleInit() {
    this.client.subscribeToResponseOf('auth.login');

    await this.client.connect();
  }

  async createUser(user: CreateUserDto): Promise<any> {
    try {
      const newUser = await this.userRepository.create(user);
      const res = await this.userRepository.save(newUser);

      return JSON.stringify(new UserReturnDto(res));
    } catch (error) {
      throw new Error(error)
    }
  }

  getList() {
    return this.client.send('auth.login', '');
  }
}

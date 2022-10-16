import { CreateUserDto } from './dtos/create-user.dto';
import { Injectable } from '@nestjs/common';
import { Client, ClientKafka, Transport } from '@nestjs/microservices';
import { IUser } from './interfaces/user.interface';
import { UserReturnDto } from './dtos/user-return.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  users: Array<IUser>;
  @Client({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'auth',
        brokers: ['localhost:9092'],
      },
      consumer: {
        groupId: 'auth-consumer',
      },
    },
  })
  client: ClientKafka;

  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {
    this.users = [];
  }

  async onModuleInit() {
    this.client.subscribeToResponseOf('auth.login');

    await this.client.connect();
  }

  async createUser(user: CreateUserDto): Promise<UserReturnDto> {
    console.log(user);
    const newUser = await this.userRepository.create(user);
    const res = await this.userRepository.save(newUser);

    return new UserReturnDto(res);
  }

  getList() {
    return this.client.send('auth.login', '');
  }
}

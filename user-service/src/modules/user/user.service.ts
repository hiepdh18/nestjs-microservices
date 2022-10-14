import { Injectable } from '@nestjs/common';
import { Client, ClientKafka, Transport } from '@nestjs/microservices';
import { IUser } from './interfaces/user.interface';

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

  constructor() {
    this.users = [];
  }

  async onModuleInit() {
    this.client.subscribeToResponseOf('auth.login');

    await this.client.connect();
  }

  addUser(user: IUser): IUser {
    this.users.push(user);
    return this.users[this.users.length - 1];
  }

  getList() {
    return this.client.send('auth.login', '');
  }
}

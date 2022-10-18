import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class AuthService {
  constructor(@Inject('USER_SERVICE') private userService: ClientKafka) {}

  async validateUser(payload: any): Promise<any> {
    try {
      const user = await this.userService.send('get.user', {
        email: payload.email.toLowerCase(),
      });

      if (!user) {
        throw new Error('');
      }
      return user;
    } catch (error) {
      throw new Error(error);
    }
  }
  // async onModuleInit() {
  //   this.client.subscribeToResponseOf('auth.login');

  //   await this.client.connect();
  // }

  // async createUser(user: CreateUserDto): Promise<UserReturnDto> {
  //   try {
  //     const newUser = await this.userRepository.create(user);
  //     const res = await this.userRepository.save(newUser);

  //     return new UserReturnDto(res);
  //   } catch (error) {
  //     throw new Error(error);
  //   }
  // }

  // async findAllUser(): Promise<UserReturnDto[]> {
  //   try {
  //     const users = await this.userRepository.find({
  //       select: ['email', 'name'],
  //     });
  //     return users.map((user) => new UserReturnDto(user));
  //   } catch (error) {
  //     throw new Error(error);
  //   }
  // }
}

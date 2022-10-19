import { Inject, Injectable } from '@nestjs/common';
import { ClientRMQ } from '@nestjs/microservices';

@Injectable()
export class AuthService {
  constructor(@Inject('USER_SERVICE') private userService: ClientRMQ) {}

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

  async findUser(opts) {
    return await this.userService.send('get.user', opts);
  }
}

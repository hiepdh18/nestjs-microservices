import axios from 'axios';
import { Inject, Injectable } from '@nestjs/common';
import { ClientRMQ } from '@nestjs/microservices';
import { TokenDTO } from 'src/dtos/token.dto';
import { ILogin } from 'src/interfaces/login.interface';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_SERVICE') private userService: ClientRMQ, // private readonly httpService: HttpService,
  ) {}

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

  async passwordLogin(login: ILogin): Promise<TokenDTO> {
    const { email, password } = login;
    const options = {
      grant_type: 'password',
      username: email,
      password: password,
      client_id: process.env.AUTH0_CLIENT_ID,
      client_secret: process.env.AUTH0_CLIENT_SECRET,
      audience: process.env.AUTH0_AUDIENCE,
      scope: 'offline_access',
    };

    const res = await axios.post(
      `${process.env.AUTH0_DOMAIN}/oauth/token`,
      options,
    );
    console.log(`🔥🔥🔥 => AuthService => passwordLogin => res`, res);
    return new TokenDTO(res);
  }
}

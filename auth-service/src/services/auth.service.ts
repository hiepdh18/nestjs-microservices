import axios from 'axios';
import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { ClientRMQ } from '@nestjs/microservices';
import { TokenDTO } from 'src/dtos/token.dto';
import { ILogin } from 'src/interfaces/login.interface';
import { HttpService } from '@nestjs/axios';
import { catchError, lastValueFrom, map } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly httpService: HttpService,
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

  // async passwordLogin(login: ILogin): Promise<TokenDTO> {
  async passwordLogin(login: ILogin): Promise<any> {
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

    // const token = this.httpService
    //   .post(`${process.env.AUTH0_DOMAIN}/oauth/token`, options)
    //   .pipe(
    //     catchError(() => {
    //       throw new ForbiddenException('API not available');
    //     }),
    //   );

    const res = this.httpService.get('https://catfact.ninja/fact').pipe();
    const test = await lastValueFrom(res);
    console.log(`🔥🔥🔥 => AuthService => passwordLogin => res`, test.data);
    return test.data;
    // return new TokenDTO(test.data);
  }
}

import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { ClientRMQ, RpcException } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { services } from '../common/constant/constants';
import { BackendLogger } from '../common/logger/backend-logger';
import { isEmpty } from '../common/utils/util';
import { TokenDTO } from '../dtos/token.dto';
import { ILogin } from '../interfaces/login.interface';

@Injectable()
export class AuthService {
  private readonly logger = new BackendLogger(AuthService.name);
  constructor(
    private readonly httpService: HttpService,
    @Inject(services.userService) private userService: ClientRMQ, // private readonly httpService: HttpService,
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

  async login(login: ILogin): Promise<TokenDTO> {
    const { email, password } = login;
    const user = await lastValueFrom(
      this.userService.send('get.user.by.email', email).pipe(),
    );
    console.log(`🔥🔥🔥 => AuthService => login => user`, user);
    if (isEmpty(user))
      throw new RpcException({ status: 422, message: 'Invalid credentials.' });
    const options = {
      grant_type: 'password',
      username: email,
      password: password,
      client_id: process.env.AUTH0_CLIENT_ID,
      client_secret: process.env.AUTH0_CLIENT_SECRET,
      audience: process.env.AUTH0_AUDIENCE,
      scope: 'offline_access',
    };

    // const res = await lastValueFrom(
    //   this.httpService
    //     .post(`https://owle.us.auth0.com/oauth/token`, {
    //       client_id: 'vbl9JP3XcoAOQxGxYmn0zCFEu39ZwHog',
    //       client_secret:
    //         'CbpVot0GWjuLFdLkm2YcTm1DkHnFghz3YJx0obs2Q4zIKbNO7vKI2GOPi15D7nOj',
    //       audience: 'https://owle.us.auth0.com/api/v2/',
    //       grant_type: 'client_credentials',
    //     })
    //     .pipe(),
    // );
    const res = await lastValueFrom(
      this.httpService
        .post(`${process.env.AUTH0_DOMAIN}/oauth/token`, options)
        .pipe(),
    );

    return new TokenDTO(res.data);
  }
}

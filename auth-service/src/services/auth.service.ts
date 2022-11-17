import { AUTH0 } from './../common/constant/envConstants';
import { LoginDto } from './../dtos/longin.dto';
import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { ClientRMQ, RpcException } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { services } from '../common/constant/constants';
import { BackendLogger } from '../common/logger/backend-logger';
import { isEmpty } from '../common/utils/util';
import { TokenDTO } from '../dtos/token.dto';

@Injectable()
export class AuthService {
  private readonly logger = new BackendLogger(AuthService.name);
  constructor(
    private readonly httpService: HttpService,
    @Inject(services.userService) private userService: ClientRMQ, // private readonly httpService: HttpService,
  ) {}

  async validateUser(payload: {
    username: string;
    password: string;
  }): Promise<any> {
    try {
      const user = await this.userService.send('get.user', {
        username: payload.username.toLowerCase(),
      });

      if (!user) {
        throw new RpcException({ status: 422, message: 'Invalid username' });
      }
      return user;
    } catch (error) {
      // this.logger.error(error);
      throw new RpcException({ status: 500, message: 'Internal server error' });
    }
  }

  async login(login: LoginDto): Promise<TokenDTO> {
    const { email, password } = login;
    const user = await lastValueFrom(
      this.userService.send('get.user.by.email', email).pipe(),
    );
    if (isEmpty(user))
      throw new RpcException({ status: 422, message: 'Invalid credentials' });
    const options = {
      grant_type: 'password',
      username: email,
      password: password,
      client_id: AUTH0.CLIENT_ID,
      client_secret: AUTH0.CLIENT_SECRET,
      audience: AUTH0.AUDIENCE,
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
      this.httpService.post(`${AUTH0.DOMAIN}/oauth/token`, options).pipe(),
    );
    return new TokenDTO(res.data);
  }

  validateToken(jwt: string) {
    return false;
  }
}

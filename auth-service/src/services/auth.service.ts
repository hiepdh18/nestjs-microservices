import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { ClientRMQ, RpcException } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { services } from '../common/constant/constants';
import { BackendLogger } from '../common/logger/backend-logger';
import { isEmpty } from '../common/utils/util';
import { TokenDTO } from '../dtos/token.dto';
import { AUTH0 } from './../common/constant/envConstants';
import { LoginDto } from './../dtos/longin.dto';
import { RegisterDto } from './../dtos/register.dto';
import * as jwt from 'jsonwebtoken';
import * as jwksClient from 'jwks-rsa';

@Injectable()
export class AuthService {
  private readonly logger = new BackendLogger(AuthService.name);
  constructor(
    private readonly httpService: HttpService,
    @Inject(services.userService) private userService: ClientRMQ, // private readonly httpService: HttpService,
  ) {}

  async getToken(): Promise<string> {
    const options = {
      grant_type: 'client_credentials',
      client_id: AUTH0.CLIENT_ID,
      client_secret: AUTH0.CLIENT_SECRET,
      audience: AUTH0.AUDIENCE,
      // env_client_id: 'QJL930vdvCuRBS7cy0ckZRy3r7zjRbPC',
      // env_client_secret:
      //   '-DBrnKc5Ib7mrK1xGZuK0ciBEXlMI-JHvdhX0P98H2__q3TTVpQEvIYgSN-775l7',
      // realm: 'cellar',
    };
    const { data } = await lastValueFrom(
      this.httpService.post(`${AUTH0.DOMAIN}/oauth/token`, options).pipe(),
    );
    return `${data.token_type} ${data.access_token}`;
  }

  async register(data: RegisterDto): Promise<any> {
    const user = await lastValueFrom(
      this.userService
        .send(`get_user_by_email`, {
          email: data.email,
        })
        .pipe(),
    );
    if (!isEmpty(user))
      throw new RpcException({ status: 422, message: 'Email already exist' });
    const token = await this.getToken();
    const res = await lastValueFrom(
      this.httpService
        .post(
          `${AUTH0.DOMAIN}/api/v2/users`,
          {
            connection: AUTH0.REAM,
            email: data.email,
            password: data.password,
            user_metadata: {},
            email_verified: false,
            app_metadata: {},
          },
          {
            headers: {
              Authorization: token,
              'Content-Type': 'application/json',
            },
          },
        )
        .pipe(),
    );
    console.log(`🔥🔥🔥 => AuthService => register => res`, res);
    // if (res) this.userService.send(`create_user`, data);
    // return res;
    return 'hello';
  }

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
      this.userService.send('get_user_by_email', email).pipe(),
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

    const res = await lastValueFrom(
      this.httpService.post(`${AUTH0.DOMAIN}oauth/token`, options).pipe(),
    );
    return new TokenDTO(res.data);
  }

  async validateToken(token: string, url: string): Promise<any> {
    try {
      const client = jwksClient({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 15,
        jwksUri: `${AUTH0.DOMAIN}.well-known/jwks.json`,
      });
      const decodedToken = jwt.decode(token, { complete: true });
      const kid = decodedToken.header.kid;
      const key = await client.getSigningKey(kid);
      const options = {
        audience: AUTH0.AUDIENCE,
        issuer: AUTH0.ISSUER,
      };
      return jwt.verify(token, key.getPublicKey(), options);
    } catch (error) {}
  }
}

import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ClientProxyFactory } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { services } from './common/constant/constants';
import { AuthService } from './services/auth.service';
import { ConfigService } from './services/config/config.service';
import { JwtModule } from '@nestjs/jwt';
import * as jwks from 'jwks-rsa';
import { JwtService } from './services/jwt.service';

@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: () => ({
        timeout: 5000,
        maxRedirects: 5,
      }),
    }),
    JwtModule.register({
      secret: jwks
        .expressJwtSecret({
          cache: true,
          rateLimit: true,
          jwksRequestsPerMinute: 15,
          jwksUri: 'https://trulet.au.auth0.com/.well-known/jwks.json',
        })
        .toString(),
      signOptions: {
        algorithm: 'RS256',
      },
    }),
  ],
  controllers: [AppController],
  providers: [
    AuthService,
    ConfigService,
    JwtService,
    {
      provide: services.userService,
      useFactory: (configService: ConfigService) => {
        const userServiceOptions = configService.get('userService');
        return ClientProxyFactory.create(userServiceOptions);
      },
      inject: [ConfigService],
    },
  ],
})
export class AppModule {}

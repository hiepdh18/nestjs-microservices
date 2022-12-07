import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ClientProxyFactory } from '@nestjs/microservices';
import * as jwks from 'jwks-rsa';
import { AppController } from './app.controller';
import { services } from './common/constant/constants';
import { AuthService } from './services/auth.service';
import { ConfigService } from './services/config/config.service';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: () => ({
        timeout: 5000,
        maxRedirects: 5,
      }),
    }),
    JwtModule.register({
      secret: '',
    }),
  ],
  controllers: [AppController],
  providers: [
    JwtStrategy,
    AuthService,
    ConfigService,
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

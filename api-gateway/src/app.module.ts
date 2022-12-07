import { JwtStrategy } from './auth/strategy/jwt.strategy';

import { Module } from '@nestjs/common';
import { ClientProxyFactory } from '@nestjs/microservices';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth/auth.controller';
import { services } from './common/constant/constants';
import { ConfigService } from './config.service';
import { UserController } from './user/user.controller';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
  controllers: [UserController, AuthController],
  providers: [
    JwtStrategy,
    ConfigService,
    {
      provide: services.userService,
      useFactory: (configService: ConfigService) => {
        const userServiceOptions = configService.get('userService');
        return ClientProxyFactory.create(userServiceOptions);
      },
      inject: [ConfigService],
    },
    {
      provide: services.authService,
      useFactory: (configService: ConfigService) => {
        const authServiceOptions = configService.get('authService');
        return ClientProxyFactory.create(authServiceOptions);
      },
      inject: [ConfigService],
    },
  ],
})
export class AppModule {}

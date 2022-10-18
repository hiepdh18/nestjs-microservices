import { Module } from '@nestjs/common';
import { UserController } from './user/user.controller';
import { AuthController } from './auth/auth.controller';
import { ClientProxyFactory, ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigService } from './config.service';

@Module({
  imports: [
  ],
  controllers: [UserController, AuthController],
  providers: [
    ConfigService,
    {
      provide: 'USER_SERVICE',
      useFactory: (configService: ConfigService) => {
        const userServiceOptions = configService.get('userService');
        return ClientProxyFactory.create(userServiceOptions);
      },
      inject: [ConfigService],
    },
  ],
})
export class AppModule { }

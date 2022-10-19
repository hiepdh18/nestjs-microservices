import { Module } from '@nestjs/common';
import { ClientProxyFactory } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AuthService } from './services/auth.service';
import { ConfigService } from './services/config/config.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    AuthService,
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
export class AppModule {}

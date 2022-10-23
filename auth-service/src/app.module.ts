import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ClientProxyFactory } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { services } from './common/constant/constants';
import { AuthService } from './services/auth.service';
import { ConfigService } from './services/config/config.service';

@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: () => ({
        timeout: 5000,
        maxRedirects: 5,
      }),
    }),
  ],
  controllers: [AppController],
  providers: [
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

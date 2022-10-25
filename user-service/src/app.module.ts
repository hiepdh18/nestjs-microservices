import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientProxyFactory } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from 'src/repositories/user.repository';

import { AppController } from './app.controller';
import { services } from './common/constant/constants';
import config from './configs/typeorm.config';
import { User } from './entities/user.entity';
import { ConfigService } from './services/config/config.service';
import { UserService } from './services/user.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(config),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [AppController],
  providers: [
    UserRepository,
    UserService,
    ConfigService,
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

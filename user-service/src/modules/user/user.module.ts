import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    // ClientsModule.register([
    //   {
    //     name: 'HERO_SERVICE',
    //     transport: Transport.KAFKA,
    //     options: {
    //       client: {
    //         clientId: 'hero',
    //         brokers: ['localhost:9092'],
    //       },
    //       consumer: {
    //         groupId: 'hero-consumer'
    //       }
    //     }
    //   },
    // ]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule { }

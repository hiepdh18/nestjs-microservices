import { Module } from '@nestjs/common';
import { UserController } from './user/user.controller';
import { AuthController } from './auth/auth.controller';

@Module({
  imports: [],
  controllers: [UserController, AuthController],
})
export class AppModule {}

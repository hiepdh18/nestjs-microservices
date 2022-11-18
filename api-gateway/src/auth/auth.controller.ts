import { Body, Controller, Inject, Post, Put } from '@nestjs/common';
import { ClientRMQ } from '@nestjs/microservices';
import { services } from '../common/constant/constants';
import { LoginDto } from './dtos/longin.dto';
import { RegisterDto } from './dtos/register.dto';

@Controller('auth')
export class AuthController {
  constructor(@Inject(services.authService) private authService: ClientRMQ) {}

  @Post('register')
  private async register(@Body() body: RegisterDto): Promise<any> {
    return await this.authService.send('register', body);
  }

  @Put('login')
  private async login(@Body() body: LoginDto): Promise<any> {
    return await this.authService.send('login', body);
  }
}

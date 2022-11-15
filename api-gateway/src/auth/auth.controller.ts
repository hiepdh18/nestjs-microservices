import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientRMQ } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { services } from '../common/constant/constants';
import { LoginDto } from './dtos/longin.dto';

@Controller('auth')
export class AuthController {
  constructor(@Inject(services.authService) private authService: ClientRMQ) {}

  @Post('/login')
  async login(@Body() body: LoginDto) {
    return await this.authService.send('login', body);
  }
}

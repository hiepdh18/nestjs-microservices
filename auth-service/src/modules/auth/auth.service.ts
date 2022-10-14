import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  testAuth() {
    return 'test auth';
  }
}

import { CanActivate, ExecutionContext, Inject } from '@nestjs/common';
import { ClientRMQ } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { services } from './../common/constant/constants';
import { BackendLogger } from './../common/logger/backend-logger';

export class AuthGuard implements CanActivate {
  private readonly logger = new BackendLogger(AuthGuard.name);
  constructor(@Inject(services.authService) private authService: ClientRMQ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    this.logger.log('Auth Guard');
    const req = context.switchToHttp().getRequest();

    try {
      // const res = await this.authService
      //   .send(
      //     { role: 'auth', cmd: 'check' },
      //     { jwt: req.headers['authorization']?.split(' ')[1] },
      //   )
      //   .pipe(timeout(5000));
      const res = await lastValueFrom(
        this.authService
          .send('checkJwt', {
            jwt: req.headers['authorization']?.split(' ')[1],
            url: req.originalUrl,
          })
          .pipe(),
      );
      console.log(`🔥🔥🔥 => AuthGuard => canActivate => res`, res);
      return res;
    } catch (err) {
      console.log(`🔥🔥🔥 => AuthGuard => canActivate => err`, err);
      return false;
    }
  }
}

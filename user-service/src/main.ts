import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { queues } from './common/constant/constants';
import { RABBIT_URL } from './common/constant/envConstants';
import { AllExceptionFilter } from './common/filters/exception.filter';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [RABBIT_URL],
        queue: queues.userQueue,
        queueOptions: {
          durable: false,
        },
      },
    },
  );
  app.useGlobalFilters(new AllExceptionFilter());
  app.listen();
}
bootstrap();

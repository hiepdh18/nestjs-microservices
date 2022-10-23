import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { queues, rabbitURL } from './common/constant/constants';
import { AllExceptionFilter } from './common/filters/exception.filter';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [rabbitURL],
        queue: queues.authQueue,
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

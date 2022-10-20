import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: ['localhost:9091', 'localhost:9092', 'localhost:9093'],
        },
        consumer: {
          groupId: 'user-consumer',
        },
      },

      // transport: Transport.RMQ,
      // options: {
      //   urls: ['amqp://localhost:5672'],
      //   queue: 'user_queue',
      //   queueOptions: {
      //     durable: false,
      //   },
      // },
    },
  );

  app.listen();
}
bootstrap();

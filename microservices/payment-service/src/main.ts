import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { microserviceOptions } from './configs/microservice-connection.config';

const logger = new Logger('PaymentMicroservice');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice(microserviceOptions);
  app.startAllMicroservices();

  await app.listen(3004);

  console.log(`Application is running on: https://localhost:3004 payment-service`);
}
bootstrap();
